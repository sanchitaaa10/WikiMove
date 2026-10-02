# Testing & Quality Assurance Plan
## Project WikiMove – Migrating a Company Knowledge Base to a New Platform

**Document Identifier:** WM-QA-1.0  
**Project Name:** WikiMove  
**Course:** Software Engineering & Project Management  
**Academic Term:** Final Academic Submission  
**Student Name:** [Student Name / ID Placeholder]  
**Institution:** [Department of Computer Science & Engineering / University Placeholder]  
**Date:** Academic Term 2026  
**Status:** Approved for Academic Submission  

---

### Table of Contents
1. Executive Summary & QA Objectives
2. Testing Scope & Strategy
3. Functional Test Cases (TC-01 through TC-15)
4. Boundary Value Analysis (BVA) Specification
5. Decision Tables (Page Triage &amp; Migration Validation)
6. Defect Removal Efficiency (DRE) Formulation
7. Defect Density Formulation &amp; Analysis
8. Test Completion &amp; Certification Criteria

---

### 1. Executive Summary & QA Objectives

This Testing and Quality Assurance document establishes the verification and validation framework for **Project WikiMove**. Because WikiMove is an academic software engineering proposed system, this document defines planned test specifications, test cases, boundary value analysis models, decision tables, and quality metrics.

*Academic Testing Notice:* In strict compliance with academic instructions, no fake executed test results are presented. All test cases are documented with:
- **Status:** `Planned`
- **Actual Result:** `To be executed during implementation`

The primary QA objectives are:
1. Validate 100% correct triage classification of legacy pages.
2. Certify that zero broken internal links exist across migrated pages (NFR-01).
3. Ensure search index discoverability for all 7,000 kept pages (NFR-02).
4. Verify mandatory content ownership binding (Zero Orphan Policy).

---

### 2. Testing Scope & Strategy

#### 2.1 Testing Scope
- **In-Scope:** Page inventory indexing, triage state transitions, mandatory owner validation, migration batch progression, URL rewrite verification, link crawling, search indexing, and 90-day governance reminder triggers.
- **Out-of-Scope:** Stress testing external commercial cloud vendors, live load testing corporate network gateways, automated natural language translation quality.

#### 2.2 Testing Levels
- **Component Verification:** Validation of data models, regex link parsers, and metadata schemas.
- **Integration Verification:** Interaction between inventory catalog, triage decision engine, and owner registry.
- **System Verification:** End-to-end evaluation of page lifecycle from discovery to validated migration.
- **User Acceptance Verification (UAT):** Review workflow trials with sample engineering team members.

---

### 3. Functional Test Cases

| Test ID | Requirement ID | Test Title | Test Procedure | Expected Result | Status | Actual Result |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-01** | FR-01 | Ingest Legacy 14k Inventory | Import legacy dump of 14,000 pages with metadata. | 14,000 pages indexed with correct creation and modified dates. | Planned | To be executed during implementation |
| **TC-02** | FR-02 | Page Review Content Display | Select page `WP-01042` and open inspection screen. | Renders HTML/Markdown preview, legacy URL, author, and revision history. | Planned | To be executed during implementation |
| **TC-03** | FR-03 | Triage Action Selection | Select `Keep`, `Archive`, or `Delete` and submit note. | State transition recorded with reviewer timestamp. | Planned | To be executed during implementation |
| **TC-04** | FR-04 | Keep Page Workflow &amp; 50% Cap | Mark page as `KEEP` and verify batch placement. | Transitions to `KeptPendingMigration`; cumulative kept tracks ~7,000. | Planned | To be executed during implementation |
| **TC-05** | FR-05 | Archive Page Workflow | Mark page as `ARCHIVE` with retention note. | Generates read-only archival stub; removes from migration queue. | Planned | To be executed during implementation |
| **TC-06** | FR-06 | Delete Page Grace Period | Mark page as `DELETE`. | Applies 14-day soft-delete grace window before purge. | Planned | To be executed during implementation |
| **TC-07** | FR-07 | Zero Orphan Owner Enforcement | Attempt to migrate kept page without assigning owner. | System blocks migration and displays mandatory owner error. | Planned | To be executed during implementation |
| **TC-08** | FR-08 | Migration Batch Scheduling | Group 500 kept pages into `BATCH-01`. | Batch allocated at 25 pages/person-day velocity benchmark. | Planned | To be executed during implementation |
| **TC-09** | FR-09 | Migration Status Transition | Execute migration on `BATCH-01`. | Status updates from `Queued` to `Migrated` and `Validation Pending`. | Planned | To be executed during implementation |
| **TC-10** | FR-10 | Link Integrity Crawler (NFR-01) | Crawl 100 internal intra-wiki links in migrated batch. | All rewritten URLs resolve to HTTP 200 (0.0% broken links). | Planned | To be executed during implementation |
| **TC-11** | FR-11 | Search Discovery QA (NFR-02) | Query top 20 domain keywords against target platform. | All relevant migrated pages return within top 5 search hits (< 1.0s). | Planned | To be executed during implementation |
| **TC-12** | FR-12 | Schedule Gap Calculation | Check progress burn-down against 39-week licence. | System correctly alerts +3.0 week schedule overrun conflict. | Planned | To be executed during implementation |
| **TC-13** | FR-13 | Risk Exposure Ranking | Compute risk exposure $E = P \times I$ for R1..R4. | R2 ranked #1 ($E=4.2$), R1 ranked #2 ($E=3.6$), R3 #3, R4 #4. | Planned | To be executed during implementation |
| **TC-14** | FR-14 | Management Reporting View | Generate executive summary on Screen 1 Dashboard. | Displays 14k total, 7k kept, 350 p-d triage, 280 p-d migration. | Planned | To be executed during implementation |
| **TC-15** | FR-15 | 90-Day Governance Reminder | Simulate 91 days elapsed since last review. | System triggers owner revalidation prompt and flags in Screen 5. | Planned | To be executed during implementation |

---

### 4. Boundary Value Analysis (BVA)

Boundary Value Analysis tests critical edge conditions at input and capacity thresholds:

| Parameter / Dimension | Valid Range | Min Boundary | Just Above Min | Nominal | Just Below Max | Max Boundary | Out of Bounds |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Page Inventory Ingestion** | 1 to 14,000 | 1 | 2 | 7,000 | 13,999 | 14,000 | 0, 14,001 |
| **Daily Triage Quota** | 1 to 40 p/d | 1 | 2 | 20 | 39 | 40 | 0, 41 |
| **Migration Batch Size** | 1 to 500 pg | 1 | 2 | 250 | 499 | 500 | 0, 501 |
| **Search Response Latency** | 0 to 1.00s | 0.01s | 0.10s | 0.50s | 0.99s | 1.00s (Limit) | > 1.00s (NFR Fail) |
| **Link Integrity Ratio** | 0.0% broken | 0.0% (Pass) | 0.1% | 0.0% | 0.0% | 0.0% | > 0.0% Broken |

---

### 5. Decision Tables

#### 5.1 Page Triage Decision Table
Guides reviewers in classifying legacy content:

| Conditions | Rule 1 | Rule 2 | Rule 3 | Rule 4 | Rule 5 |
| :--- | :---: | :---: | :---: | :---: | :---: |
| Is content technically current and accurate? | Y | Y | N | N | N |
| Does content have active business relevance? | Y | Y | N | N | N |
| Is named content owner available? | Y | N | — | — | — |
| Is content required for compliance / legal audit? | — | — | Y | N | N |
| Is content empty, duplicate, or transient notes? | N | N | N | Y | N |
| **Actions** | | | | | |
| **Action: KEEP (Queue for Migration)** | **X** | | | | |
| **Action: Escalate for Owner Designation** | | **X** | | | |
| **Action: ARCHIVE (Cold Storage Snapshot)** | | | **X** | | |
| **Action: DELETE (14-Day Grace Window)** | | | | **X** | |
| **Action: Flag for Technical Writer Triage** | | | | | **X** |

#### 5.2 Migration QA Certification Decision Table
Validates migrated pages before production sign-off:

| Conditions | Rule 1 | Rule 2 | Rule 3 | Rule 4 |
| :--- | :---: | :---: | :---: | :---: |
| HTML / Markdown parsed without syntax error? | Y | Y | Y | N |
| All intra-wiki hyperlinks resolve to HTTP 200? | Y | N | Y | — |
| Page discoverable in target search index? | Y | Y | N | — |
| Named content owner verified in directory? | Y | Y | Y | — |
| **Actions** | | | | |
| **Action: Certify Page on New Platform** | **X** | | | |
| **Action: Log Link Defect &amp; Remap URL** | | **X** | | |
| **Action: Trigger Search Re-Indexing** | | | **X** | |
| **Action: Reject Batch &amp; Flag Parsing Defect** | | | | **X** |

---

### 6. Defect Removal Efficiency (DRE)

#### 6.1 Mathematical Formulation
Defect Removal Efficiency measures the efficacy of quality verification activities in identifying and eliminating defects prior to final production cutover:

$$\text{DRE} = \frac{E}{E + D} \times 100$$

Where:
- $E = \text{Number of defects discovered and resolved before release (pre-cutover QA)}$
- $D = \text{Number of defects discovered after release (post-cutover by end users)}$

#### 6.2 Planned Quality Measurement Approach
- In the WikiMove migration pipeline, $E$ encompasses broken hyperlinks, search indexing failures, and unassigned owner defects identified by automated crawlers during Phase 7 testing.
- Target project goal: Achieve $\mathbf{\text{DRE} \ge 95.0\%}$ before legacy platform shutdown.

*Illustrative Example — Planned Quality Benchmark Model:*  
If pre-release crawlers detect and fix 190 broken links ($E = 190$) and end users report 10 missing page redirects post-migration ($D = 10$):
$$\text{DRE} = \frac{190}{190 + 10} \times 100 = \frac{190}{200} \times 100 = \mathbf{95.0\%}$$

---

### 7. Defect Density

#### 7.1 Mathematical Formulation
Defect Density measures the normalized frequency of defects per unit size of tested content:

$$\text{Defect Density} = \frac{\text{Total Number of Valid Defects Discovered}}{\text{Total Volume of Tested Content}}$$

#### 7.2 Measurement Approach
In WikiMove, content size is measured in units of 1,000 migrated pages (KPages):

$$\text{Defect Density} = \frac{\text{Valid QA Defects}}{\text{Total Kept Pages Migrated (in KPages)}}$$

*Illustrative Example — Planned Quality Benchmark Model:*  
For the total migrated scope of 7,000 kept pages (7.0 KPages), if QA testing uncovers a total of 35 defects across link crawling, search indexing, and formatting:
$$\text{Defect Density} = \frac{35\text{ defects}}{7.0\text{ KPages}} = \mathbf{5.0\text{ defects / 1,000 pages (0.005 defects/page)}}$$

Target ceiling: $\mathbf{\le 8.0\text{ defects per 1,000 pages}}$ prior to final sign-off.

---

### 8. Test Completion & Certification Criteria

A migration batch is certified for production cutover when:
1. 100% of planned functional test cases (`TC-01` through `TC-15`) execute successfully.
2. 0.0% broken internal hyperlinks remain within the migrated scope (NFR-01).
3. 100% of migrated pages return in search index queries within < 1.0 second (NFR-02).
4. 100% of migrated pages have a confirmed named owner (Zero Orphan Policy).
5. Defect Removal Efficiency (DRE) meets or exceeds the 95.0% threshold.
