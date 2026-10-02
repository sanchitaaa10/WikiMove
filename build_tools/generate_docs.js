const fs = require('fs');
const path = require('path');
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  AlignmentType,
  ShadingType
} = require('docx');
const PDFDocument = require('pdfkit');

const BASE_DIR = path.resolve(__dirname, '..');
const DOCS_DIR = path.join(BASE_DIR, 'Documentation');

const DOC_FILES = [
  { md: 'WikiMove_BRD.md', docx: 'WikiMove_BRD.docx', pdf: 'WikiMove_BRD.pdf', title: 'Business Requirements Document (BRD)' },
  { md: 'WikiMove_SRS.md', docx: 'WikiMove_SRS.docx', pdf: 'WikiMove_SRS.pdf', title: 'Software Requirements Specification (SRS)' },
  { md: 'WikiMove_Project_Management.md', docx: 'WikiMove_Project_Management.docx', pdf: 'WikiMove_Project_Management.pdf', title: 'Project Management Plan & Estimation' },
  { md: 'WikiMove_Testing_QA.md', docx: 'WikiMove_Testing_QA.docx', pdf: 'WikiMove_Testing_QA.pdf', title: 'Testing & Quality Assurance Plan' },
  { md: 'WikiMove_Risk_Management.md', docx: 'WikiMove_Risk_Management.docx', pdf: 'WikiMove_Risk_Management.pdf', title: 'Risk Management Plan & RMMM' },
  { md: 'WikiMove_Final_Report.md', docx: 'WikiMove_Final_Report.docx', pdf: 'WikiMove_Final_Report.pdf', title: 'Comprehensive Final Project Report' }
];

// Helper to parse markdown inline formatting into TextRun objects
function parseInlineToRuns(text, isHeader = false) {
  // Replace checklist symbols
  text = text.replace(/\[x\]/g, '☑').replace(/\[ \]/g, '☐');
  // Clean markdown links [label](url) -> label (url)
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1 ($2)');

  const tokens = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/g);
  const runs = [];

  for (const token of tokens) {
    if (!token) continue;
    if (token.startsWith('**') && token.endsWith('**') && token.length >= 4) {
      runs.push(new TextRun({
        text: token.slice(2, -2),
        bold: true,
        color: isHeader ? '0F172A' : '1E293B'
      }));
    } else if (token.startsWith('*') && token.endsWith('*') && token.length >= 2) {
      runs.push(new TextRun({
        text: token.slice(1, -1),
        italics: true,
        color: '334155'
      }));
    } else if (token.startsWith('`') && token.endsWith('`') && token.length >= 2) {
      runs.push(new TextRun({
        text: token.slice(1, -1),
        font: 'Consolas',
        color: '0969DA',
        shading: { type: ShadingType.CLEAR, fill: 'F1F5F9' }
      }));
    } else {
      runs.push(new TextRun({
        text: token,
        color: isHeader ? '0F172A' : '334155',
        bold: isHeader
      }));
    }
  }
  return runs;
}

// Convert table lines into a docx Table
function buildDocxTable(tableLines) {
  const rows = [];
  for (const line of tableLines) {
    const trimmed = line.trim();
    if (!trimmed.startsWith('|')) continue;
    const parts = trimmed.split('|').slice(1, -1).map(p => p.trim());
    if (parts.every(p => /^:?-+:?$/.test(p))) continue; // skip divider line
    rows.push(parts);
  }

  if (rows.length === 0) return null;

  const docxRows = rows.map((rowCells, rIdx) => {
    const isHeader = (rIdx === 0);
    return new TableRow({
      tableHeader: isHeader,
      children: rowCells.map(cellText => {
        return new TableCell({
          shading: isHeader ? { type: ShadingType.CLEAR, fill: 'F1F5F9' } : undefined,
          borders: {
            top: { style: BorderStyle.SINGLE, size: 4, color: 'E2E8F0' },
            bottom: { style: BorderStyle.SINGLE, size: 4, color: 'E2E8F0' },
            left: { style: BorderStyle.SINGLE, size: 4, color: 'E2E8F0' },
            right: { style: BorderStyle.SINGLE, size: 4, color: 'E2E8F0' }
          },
          margins: { top: 120, bottom: 120, left: 160, right: 160 },
          children: [
            new Paragraph({
              children: parseInlineToRuns(cellText, isHeader),
              spacing: { after: 0, line: 240 }
            })
          ]
        });
      })
    });
  });

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: docxRows
  });
}

// Generate Microsoft Word (.docx) from Markdown text
async function generateDocx(mdContent, outputPath, docTitle) {
  const lines = mdContent.split(/\r?\n/);
  const docElements = [];

  let inCodeBlock = false;
  let inTable = false;
  let tableLines = [];

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    // Code fence
    if (trimmed.startsWith('```')) {
      if (inCodeBlock) {
        inCodeBlock = false;
      } else {
        if (inTable) {
          const tbl = buildDocxTable(tableLines);
          if (tbl) docElements.push(tbl);
          inTable = false;
          tableLines = [];
        }
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      docElements.push(new Paragraph({
        children: [
          new TextRun({
            text: rawLine,
            font: 'Consolas',
            size: 18,
            color: '334155'
          })
        ],
        shading: { type: ShadingType.CLEAR, fill: 'F8FAFC' },
        spacing: { after: 40, line: 240 }
      }));
      continue;
    }

    // Table rows
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      inTable = true;
      tableLines.push(trimmed);
      continue;
    } else if (inTable) {
      const tbl = buildDocxTable(tableLines);
      if (tbl) docElements.push(tbl);
      inTable = false;
      tableLines = [];
    }

    if (!trimmed) {
      continue;
    }

    // Horizontal Divider
    if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
      docElements.push(new Paragraph({
        children: [],
        border: {
          bottom: { style: BorderStyle.SINGLE, size: 8, color: 'CBD5E1' }
        },
        spacing: { before: 120, after: 160 }
      }));
      continue;
    }

    // Headings
    if (trimmed.startsWith('# ')) {
      docElements.push(new Paragraph({
        text: trimmed.slice(2).trim(),
        heading: HeadingLevel.TITLE,
        spacing: { before: 360, after: 140 }
      }));
    } else if (trimmed.startsWith('## ')) {
      docElements.push(new Paragraph({
        text: trimmed.slice(3).trim(),
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 280, after: 120 }
      }));
    } else if (trimmed.startsWith('### ')) {
      docElements.push(new Paragraph({
        text: trimmed.slice(4).trim(),
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 100 }
      }));
    } else if (trimmed.startsWith('#### ')) {
      docElements.push(new Paragraph({
        text: trimmed.slice(5).trim(),
        heading: HeadingLevel.HEADING_3,
        spacing: { before: 160, after: 80 }
      }));
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      docElements.push(new Paragraph({
        children: [
          new TextRun({ text: '•  ', bold: true, color: '2563EB' }),
          ...parseInlineToRuns(trimmed.slice(2).trim())
        ],
        indent: { left: 360, hanging: 240 },
        spacing: { after: 80, line: 260 }
      }));
    } else if (/^\d+\.\s+/.test(trimmed)) {
      const match = trimmed.match(/^(\d+\.)\s+(.*)$/);
      docElements.push(new Paragraph({
        children: [
          new TextRun({ text: match[1] + '  ', bold: true, color: '2563EB' }),
          ...parseInlineToRuns(match[2].trim())
        ],
        indent: { left: 400, hanging: 280 },
        spacing: { after: 80, line: 260 }
      }));
    } else if (trimmed.startsWith('> ')) {
      docElements.push(new Paragraph({
        children: parseInlineToRuns(trimmed.slice(2).trim()),
        border: {
          left: { style: BorderStyle.SINGLE, size: 24, color: '2563EB' }
        },
        indent: { left: 240 },
        spacing: { before: 80, after: 120, line: 260 }
      }));
    } else {
      docElements.push(new Paragraph({
        children: parseInlineToRuns(trimmed),
        spacing: { after: 120, line: 260 }
      }));
    }
  }

  if (inTable && tableLines.length > 0) {
    const tbl = buildDocxTable(tableLines);
    if (tbl) docElements.push(tbl);
  }

  const doc = new Document({
    styles: {
      default: {
        document: {
          run: { font: 'Calibri', size: 22, color: '1E293B' },
          paragraph: { spacing: { line: 276, after: 140 } }
        }
      }
    },
    sections: [{
      properties: {
        page: {
          margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
        }
      },
      children: docElements
    }]
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(outputPath, buffer);
  console.log(`[DOCX OK] ${outputPath} (${buffer.length} bytes)`);
}

// Generate PDF from Markdown text using PDFKit
function generatePdf(mdContent, outputPath, docTitle) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: 'A4',
      margin: 50,
      bufferPages: true,
      info: {
        Title: docTitle,
        Author: 'WikiMove Academic Team',
        Subject: 'Software Engineering & Project Management Submission'
      }
    });

    const stream = fs.createWriteStream(outputPath);
    doc.pipe(stream);

    // Title Header
    doc.fillColor('#1E3A8A').fontSize(20).font('Helvetica-Bold').text(docTitle, { align: 'left' });
    doc.moveDown(0.3);
    doc.fillColor('#64748B').fontSize(10).font('Helvetica').text('WikiMove – Migrating a Company Knowledge Base to a New Platform | Academic Portfolio 2026');
    doc.moveDown(0.6);
    doc.strokeColor('#CBD5E1').lineWidth(1).moveTo(50, doc.y).lineTo(545, doc.y).stroke();
    doc.moveDown(1);

    const lines = mdContent.split(/\r?\n/);
    let inCode = false;
    let inTable = false;
    let tableLines = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();

      if (trimmed.startsWith('```')) {
        if (inCode) {
          inCode = false;
          doc.moveDown(0.5);
        } else {
          inCode = true;
          doc.moveDown(0.5);
        }
        continue;
      }

      if (inCode) {
        doc.fillColor('#334155').fontSize(9).font('Courier').text(line, { indent: 15 });
        continue;
      }

      // Check Table
      if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
        inTable = true;
        tableLines.push(trimmed);
        continue;
      } else if (inTable) {
        renderPdfTable(doc, tableLines);
        inTable = false;
        tableLines = [];
      }

      if (!trimmed) {
        doc.moveDown(0.3);
        continue;
      }

      if (trimmed === '---' || trimmed === '***') {
        doc.moveDown(0.5);
        doc.strokeColor('#E2E8F0').lineWidth(0.8).moveTo(50, doc.y).lineTo(545, doc.y).stroke();
        doc.moveDown(0.5);
        continue;
      }

      // Clean inline marks for plain PDF rendering
      let cleanText = trimmed
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .replace(/\*(.*?)\*/g, '$1')
        .replace(/`([^`]+)`/g, '$1')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1 ($2)')
        .replace(/\[x\]/g, '☑')
        .replace(/\[ \]/g, '☐');

      if (trimmed.startsWith('# ')) {
        doc.addPage();
        doc.fillColor('#0F172A').fontSize(16).font('Helvetica-Bold').text(cleanText.slice(2), { paragraphGap: 6 });
      } else if (trimmed.startsWith('## ')) {
        doc.moveDown(0.6);
        doc.fillColor('#1E3A8A').fontSize(13).font('Helvetica-Bold').text(cleanText.slice(3), { paragraphGap: 4 });
      } else if (trimmed.startsWith('### ')) {
        doc.moveDown(0.4);
        doc.fillColor('#2563EB').fontSize(11).font('Helvetica-Bold').text(cleanText.slice(4), { paragraphGap: 3 });
      } else if (trimmed.startsWith('#### ')) {
        doc.moveDown(0.3);
        doc.fillColor('#334155').fontSize(10).font('Helvetica-Bold').text(cleanText.slice(5), { paragraphGap: 2 });
      } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        doc.fillColor('#1E293B').fontSize(9.5).font('Helvetica').text('•  ' + cleanText.slice(2), { indent: 15, paragraphGap: 3 });
      } else if (/^\d+\.\s+/.test(trimmed)) {
        doc.fillColor('#1E293B').fontSize(9.5).font('Helvetica').text(cleanText, { indent: 15, paragraphGap: 3 });
      } else if (trimmed.startsWith('> ')) {
        doc.fillColor('#475569').fontSize(9.5).font('Helvetica-Oblique').text(cleanText.slice(2), { indent: 15, paragraphGap: 4 });
      } else {
        doc.fillColor('#1E293B').fontSize(9.5).font('Helvetica').text(cleanText, { paragraphGap: 4, lineGap: 2 });
      }
    }

    if (inTable && tableLines.length > 0) {
      renderPdfTable(doc, tableLines);
    }

    // Page numbers
    const totalPages = doc.bufferedPageRange().count;
    for (let i = 0; i < totalPages; i++) {
      doc.switchToPage(i);
      doc.fillColor('#94A3B8').fontSize(8).font('Helvetica').text(
        `WikiMove – Academic Project | Page ${i + 1} of ${totalPages}`,
        50,
        780,
        { align: 'center', width: 495 }
      );
    }

    doc.end();
    stream.on('finish', () => {
      console.log(`[PDF OK] ${outputPath} (${fs.statSync(outputPath).size} bytes)`);
      resolve();
    });
    stream.on('error', reject);
  });
}

// Simple Table renderer for PDFKit
function renderPdfTable(doc, tableLines) {
  const rows = [];
  for (const line of tableLines) {
    const trimmed = line.trim();
    if (!trimmed.startsWith('|')) continue;
    const parts = trimmed.split('|').slice(1, -1).map(p => p.trim());
    if (parts.every(p => /^:?-+:?$/.test(p))) continue;
    rows.push(parts);
  }
  if (rows.length === 0) return;

  doc.moveDown(0.4);
  const startX = 50;
  const colCount = rows[0].length;
  const colWidth = 495 / colCount;

  for (let rIdx = 0; rIdx < rows.length; rIdx++) {
    const row = rows[rIdx];
    const isHeader = (rIdx === 0);

    // Page break guard
    if (doc.y > 720) {
      doc.addPage();
    }

    const rowY = doc.y;
    let maxCellHeight = 16;

    for (let cIdx = 0; cIdx < row.length; cIdx++) {
      const cellText = row[cIdx].replace(/\*\*(.*?)\*\*/g, '$1').replace(/`([^`]+)`/g, '$1');
      doc.fontSize(isHeader ? 8.5 : 8)
         .font(isHeader ? 'Helvetica-Bold' : 'Helvetica')
         .fillColor(isHeader ? '#0F172A' : '#334155');

      const textHeight = doc.heightOfString(cellText, { width: colWidth - 8 });
      if (textHeight + 6 > maxCellHeight) {
        maxCellHeight = textHeight + 6;
      }
    }

    // Render cells in row
    for (let cIdx = 0; cIdx < row.length; cIdx++) {
      const cellX = startX + (cIdx * colWidth);
      const cellText = row[cIdx].replace(/\*\*(.*?)\*\*/g, '$1').replace(/`([^`]+)`/g, '$1');
      
      if (isHeader) {
        doc.rect(cellX, rowY, colWidth, maxCellHeight).fillAndStroke('#F1F5F9', '#CBD5E1');
      } else {
        doc.rect(cellX, rowY, colWidth, maxCellHeight).stroke('#E2E8F0');
      }

      doc.fillColor(isHeader ? '#0F172A' : '#334155')
         .fontSize(isHeader ? 8.5 : 8)
         .font(isHeader ? 'Helvetica-Bold' : 'Helvetica')
         .text(cellText, cellX + 4, rowY + 3, { width: colWidth - 8 });
    }

    doc.y = rowY + maxCellHeight;
  }
  doc.moveDown(0.6);
}

// Master execution
async function main() {
  console.log('=== Starting WikiMove DOCX & PDF Generation (Pure Node.js) ===\n');

  for (const item of DOC_FILES) {
    const mdPath = path.join(DOCS_DIR, item.md);
    const docxPath = path.join(DOCS_DIR, item.docx);
    const pdfPath = path.join(DOCS_DIR, item.pdf);

    if (!fs.existsSync(mdPath)) {
      console.error(`[SKIP] Missing source markdown: ${mdPath}`);
      continue;
    }

    const mdContent = fs.readFileSync(mdPath, 'utf8');

    console.log(`Processing: ${item.title}...`);
    await generateDocx(mdContent, docxPath, item.title);
    await generatePdf(mdContent, pdfPath, item.title);
    console.log(`Finished: ${item.docx} & ${item.pdf}\n`);
  }

  console.log('=== All Major Documents Successfully Generated in DOCX & PDF! ===');
}

main().catch(err => {
  console.error('Fatal generation error:', err);
  process.exit(1);
});
