const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8088;
const BASE_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.md': 'text/markdown; charset=UTF-8',
  '.txt': 'text/plain'
};

const server = http.createServer((req, res) => {
  let reqUrl = decodeURI(req.url.split('?')[0]);
  if (reqUrl === '/' || reqUrl === '/index.html') {
    reqUrl = '/UI/index.html';
  }

  let filePath = path.join(BASE_DIR, reqUrl);

  // Security check to avoid directory traversal
  if (!filePath.startsWith(BASE_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }

  const serveFile = (targetPath) => {
    const ext = path.extname(targetPath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    });
    fs.createReadStream(targetPath).pipe(res);
  };

  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isFile()) {
      return serveFile(filePath);
    }

    // Try fallback inside UI directory
    const uiPath = path.join(BASE_DIR, 'UI', reqUrl);
    fs.stat(uiPath, (uiErr, uiStats) => {
      if (!uiErr && uiStats.isFile()) {
        return serveFile(uiPath);
      }

      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end(`404 Not Found: ${reqUrl}`);
    });
  });
});

server.listen(PORT, () => {
  console.log(`WikiMove HTTP Server running at http://localhost:${PORT}/`);
  console.log(`Portal Home: http://localhost:${PORT}/UI/index.html`);
  console.log(`Dashboard:   http://localhost:${PORT}/UI/dashboard.html`);
});
