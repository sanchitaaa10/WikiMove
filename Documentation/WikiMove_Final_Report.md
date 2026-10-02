# Comprehensive Final Project Report
## Project WikiMove – Migrating a Company Knowledge Base to a New Platform
### Complete Academic Software Engineering & Project Management Portfolio

**Document Identifier:** WM-REP-FINAL-1.0  
**Project Name:** WikiMove  
**Course:** Software Engineering & Project Management  
**Academic Degree:** Bachelor of Technology / Master of Science in Computer Science & Engineering  
**Academic Term:** Final Submission 2026  
**Student Name:** [Student Name / ID Placeholder]  
**Faculty Evaluator:** [Course Instructor / Professor Placeholder]  
**Institution:** [Department of Computer Science & Engineering / University Placeholder]  
**Date of Submission:** Academic Term 2026  
**Evaluation Status:** Master Academic Submission Document  

---

### Abstract & Executive Summary

Over 11 years of continuous agile software engineering, an enterprise software organization accumulated **14,000 internal wiki pages**. Because no formal lifecycle governance or content custody was established, the documentation repository decayed: an internal audit revealed that approximately **50% of the entire knowledge base (7,000 pages) was outdated, redundant, or orphaned**. Simultaneously, an immovable operational boundary emerged: **the legacy platform software licence expires in 9 months (~39 weeks)**.

The Chief Technology Officer (CTO) mandated **Project WikiMove** to transition valuable technical documentation to a modern knowledge platform, permanently decommission obsolete material, and establish mandatory content custody. The project constraints were uniquely demanding: only a single part-time Technical Writer (**3 person-days per week**) was dedicated to lead the effort, while **12 engineering teams** contributed **1 person-day per week each**, establishing a fixed weekly capacity ceiling of **15 person-days per week**.

This comprehensive final report presents the complete software engineering and project management deliverables for WikiMove. Grounded in empirical mathematical modeling:
1. **Total Effort:** Triage ($14,000 / 40 = 350\text{ p-d}$) + Migration ($7,000 / 25 = 280\text{ p-d}$) = **630 person-days**.
2. **Project Duration:** $630 / 15 = \mathbf{42.0\text{ weeks}}$.
3. **Licence Overrun Conflict:** 42 weeks required vs. 39 weeks available = **+3.0 weeks schedule deficit**, resolved through proactive management contingencies.
4. **Risk Profile:** R2 (Teams do not review, $E=4.2$) ranked #1; R1 (Licence expiration, $E=3.6$) ranked #2; R3 (Broken links, $E=1.6$) ranked #3; R4 (No owner, $E=0.5$) ranked #4.

The project encompasses a complete IEEE 830 SRS, BRD, UML models (7 diagrams), 6 responsive UI mockups, testing plans, RMMM frameworks, and a sustainable post-migration governance architecture.

---

### Table of Contents
1. Problem Statement & Operational Genesis
2. Project Objectives & Academic Boundaries
3. Existing Situation vs. Proposed System
4. Business Requirements Document (BRD) Summary
5. IEEE 830 Software Requirements Specification (SRS) Summary
6. Functional & Non-Functional Requirements Architecture
7. UML System Modeling (7 Core Diagrams)
8. Simple Logical System Architecture
9. UI Design & Prototype Specification (6 Screens)
10. Project Management Plan & Work Breakdown Structure (WBS)
11. Mathematical Estimation & Schedule Analysis
12. Gantt Chart & Milestone Schedule (42 vs. 39 Weeks)
13. Critical Path Method (CPM) Analysis
14. Testing & Quality Assurance Documentation (BVA, Decision Tables, DRE, Defect Density)
15. Quantitative Risk Management & RMMM Plans
16. Post-Migration Governance Framework
17. Project Closure & Handover State
18. Lessons Learned & Academic Post-Mortem
19. Conclusion
20. References & Appendices

---

### 1. Problem Statement & Operational Genesis

In fast-paced software organizations, documentation often lags behind production code. Over 11 years, the company's internal wiki suffered from classic documentation entropy:
- **14,000 Unstructured Pages:** Accumulation of sprint notes, obsolete API drafts, duplicates, and personal checklists.
- **50% Decay Factor:** 7,000 pages contained obsolete configurations, invalid credentials, dead URLs, and deprecated architectures.
- **Departed Custodians:** Engineers transitioned or left the firm, leaving thousands of pages orphaned without designated maintenance.
- **The Licence Imposition:** The legacy platform licence expires in 9 months (~39 weeks), rendering renewal financially and strategically unviable.
- **Resource Starvation:** Engineering teams had zero dedicated time; project ownership defaulted to a single part-time technical writer (3 p-d/wk) and an enforced 1 p-d/wk per squad across 12 teams.

---

### 2. Project Objectives & Academic Boundaries

#### 2.1 Project Objectives
1. **OBJ-01:** Full inventory and triage of all 14,000 legacy wiki pages.
2. **OBJ-02:** Quality-gated migration of exactly 7,000 kept pages (50% retention).
3. **OBJ-03:** Enforce a strict "Zero Orphan Policy" binding every kept page to an active named owner.
4. **OBJ-04:** Ensure 0.0% broken internal links (NFR-01) and sub-second search discoverability (NFR-02).
5. **OBJ-05:** Resolve the 3-week schedule gap between baseline duration (42 weeks) and licence expiration (39 weeks).
6. **OBJ-06:** Establish an automated 90-day periodic revalidation cycle to prevent future decay.

#### 2.2 Academic Scope Boundary
Consistent with teacher instructions for Software Engineering and Project Management:
- **No production backend, cloud microservices, or database engines are deployed.**
- **No Python scripts or runtime dependencies are utilized.**
- **The UI is implemented as a lightweight, static prototype using pure HTML, CSS, and minimal JavaScript.**
- **All documentation is provided in professional, editable DOCX and PDF formats.**

---

### 3. Existing Situation vs. Proposed System

| Dimension | Legacy Situation | WikiMove Proposed Solution |
| :--- | :--- | :--- |
| **Total Scope** | 14,000 unmanaged legacy pages | 14,000 pages triaged; 7,000 clean pages migrated |
| **Content Accuracy** | ~50% outdated, misleading, or redundant | 100% verified, production-aligned documentation |
| **Page Custody** | Thousands of orphaned pages | Mandatory named human owner bound to every page |
| **Governance** | Unmanaged growth, zero periodic reviews | Automated 90-day periodic recertification |
| **Licence Deadline** | Expiring in 9 months (~39 weeks) | Structured offboarding within available window |
| **Search & Links** | Broken relative URLs, unindexed tags | 100% rewritten URLs, certified search indexing |

---

### 4. BRD Summary

The Business Requirements Document (`WikiMove_BRD`) baselines 12 key business requirements (BR-01 to BR-12) and 8 strict business rules:
- **BRUL-01 (Orphan Prohibition):** No page can migrate without an active, validated named content owner.
- **BRUL-04 & BRUL-05 (Velocity Benchmarks):** Triage fixed at 40 pages/person-day; migration fixed at 25 pages/person-day.
- **BRUL-06 & BRUL-07 (Capacity & Retention):** 50% retention (7,000 pages); weekly capacity capped at 15 person-days/week.

---

### 5. IEEE 830 SRS Summary

The Software Requirements Specification (`WikiMove_SRS`) defines 15 functional requirements (FR-01 to FR-15) and 10 non-functional requirements (NFR-01 to NFR-10). It provides bidirectional traceability through an IEEE-compliant Requirements Traceability Matrix (RTM) linking all functional specifications to verification test cases.

---

### 6. Functional & Non-Functional Requirements Architecture

- **Functional Scope (FR-01..FR-15):** Page inventory ingestion, review UI, Keep/Archive/Delete classification engine, named owner binding, migration batch planning (25 p/d), link validation crawler, search discoverability tester, 42-week schedule tracking, risk exposure ranking, and 90-day governance rules.
- **Key NFRs:**
  - `NFR-01 (Link Integrity):` 0.0% broken internal links across 7,000 migrated pages.
  - `NFR-02 (Search Performance):` Search query response latency < 1.0 second.
  - `NFR-04 (Usability):` Mean review duration < 12 minutes/page (supporting 40 p/d triage quota).
  - `NFR-08 (Auditability):` 100% captured event history for all triage and owner changes.

---

### 7. UML System Modeling (7 Core Diagrams)

The proposed WikiMove platform is formally specified across 7 vector UML and system diagrams:

1. **System Context Diagram (`Context_Diagram.svg`):** Establishes external actors (CTO, Technical Writer, 12 Engineering Teams, QA) interacting with the WikiMove system boundary between legacy and target platforms.
2. **Use Case Diagram (`Use_Case_Diagram.svg`):** Maps 6 actors to 11 functional use cases (View Dashboard, Review Page, Classify Page, Keep/Archive/Delete, Assign Owner, Plan Migration, Track Risks, etc.).
3. **Class Diagram (`Class_Diagram.svg`):** Models core entity structures including `WikiPage`, `TriageDecision`, `Owner`, `EngineeringTeam`, `MigrationBatch`, `ValidationResult`, `RiskItem`, and `ProjectSchedule`.
4. **Sequence Diagram (`Sequence_Diagram.svg`):** Illustrates the message interchange across Reviewer, UI, TriageManager, Catalog, and Target Platform for triage and migration.
5. **Activity Diagram (`Activity_Diagram.svg`):** Specifies decision logic, condition branching (current? historical value? owner assigned?), and batch queues.
6. **State Machine Diagram (`State_Diagram.svg`):** Tracks page lifecycle states from `Discovered` to `UnderReview`, `Deleted`, `Archived`, `OwnerAssigned`, `Migrated`, `Validated`, and `ActiveGoverned`.
7. **Logical Architecture Diagram (`Architecture_Diagram.svg`):** Presents a 4-tier layered architectural model separating UI prototypes, management services, data models, and external platforms.

---

### 8. Simple Logical System Architecture

```text
┌────────────────────────────────────────────────────────────────────────┐
│ 1. PRESENTATION LAYER: Responsive Static Prototype (6 HTML/CSS Screens) │
│ [Screen 1: Dashboard] [Screen 2: Triage] [Screen 3: Review]            │
│ [Screen 4: Migration] [Screen 5: Ownership] [Screen 6: Risks & Status] │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ HTTP / DOM Events
┌───────────────────────────────────▼────────────────────────────────────┐
│ 2. APPLICATION MANAGEMENT LAYER (Proposed Workflow Specifications)    │
│ • Inventory & Triage (40 p/d)    • Ownership Custody Registry         │
│ • Migration Batching (25 p/d)     • Schedule & Risk Guard (42 vs 39 Wk)│
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Data Abstraction
┌───────────────────────────────────▼────────────────────────────────────┐
│ 3. DATA & TRACEABILITY MODEL LAYER (Proposed Schemas)                  │
│ • 14,000 Legacy Page Records     • RTM Traceability Schema             │
│ • Triage & Decision Audit Logs    • Defect Density & DRE Logs          │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Integration Interface
┌───────────────────────────────────▼────────────────────────────────────┐
│ 4. EXTERNAL ENTERPRISE PLATFORMS                                       │
│ • Legacy Wiki Platform (Exp: ~39 Wks) • Target Knowledge Platform     │
└────────────────────────────────────────────────────────────────────────┘
```

---

### 9. UI Design & Prototype Specification (6 Screens)

The user interface is designed as an accessible, clean academic prototype using HTML5, CSS3, and minimal JavaScript:
- **Screen 1 — Executive Dashboard (`dashboard.html`):** Metrics for 14,000 total, 5,600 reviewed, 7,000 target kept, 7,000 outdated, progress bars, licence timer, and top risk card.
- **Screen 2 — Page Triage Queue (`triage.html`):** Data table showing Page ID, title, team, last updated date, suggested action, and simulated Keep, Archive, and Delete buttons.
- **Screen 3 — Detailed Page Review (`review.html`):** Split-view content preview, revision history, reviewer notes, and mandatory named owner dropdown.
- **Screen 4 — Migration Dashboard (`migration.html`):** 7,000 kept pages progress bar (2,100 completed, 420 validation pending, 4,460 queued), batch breakdown table.
- **Screen 5 — Content Ownership Management (`ownership.html`):** Registry of active content custodians, next review dates, and orphan escalation alerts.
- **Screen 6 — Risks & Project Status (`risks.html`):** Quantitative risk table (R1-R4), exposure ranking, and mathematical schedule gap analysis table.

---

### 10. Project Management Plan & WBS

The project is decomposed into 9 distinct phases spanning 42 weeks:
- Phase 1: Initiation (Weeks 1–2)
- Phase 2: Requirements & Architecture (Weeks 3–4)
- Phase 3: Wiki Inventory (Weeks 5–6)
- Phase 4: Content Triage (Weeks 7–22)
- Phase 5: Migration Preparation (Weeks 20–22)
- Phase 6: Content Migration (Weeks 23–36)
- Phase 7: Testing & QA Validation (Weeks 34–38)
- Phase 8: Ownership & Governance (Weeks 37–40)
- Phase 9: Closure & Handover (Weeks 41–42)

---

### 11. Mathematical Estimation & Schedule Analysis

Every project parameter is derived from empirical case-study formulas:

$$\text{Total Pages } (N) = 14,000$$
$$\text{Outdated Ratio} = 50\% \implies \text{Kept Pages } (N_{kept}) = 14,000 \times 50\% = \mathbf{7,000\text{ pages}}$$
$$\text{Triage Effort } (E_{triage}) = \frac{14,000}{40\text{ p/d}} = \mathbf{350\text{ person-days}}$$
$$\text{Migration Effort } (E_{migration}) = \frac{7,000}{25\text{ p/d}} = \mathbf{280\text{ person-days}}$$
$$\text{Total Effort } (E_{total}) = 350 + 280 = \mathbf{630\text{ person-days}}$$
$$\text{Weekly Capacity } (C) = 3\text{ (TW)} + 12\text{ (12 Teams } \times 1\text{)} = \mathbf{15\text{ person-days / week}}$$
$$\text{Estimated Duration } (D) = \frac{630}{15} = \mathbf{42.0\text{ weeks}}$$
$$\text{Licence Expiry Period } (T_{licence}) = 9\text{ months} \times 4.333\text{ wks/mo} = \mathbf{39.0\text{ weeks}}$$
$$\text{Schedule Gap } (\Delta T) = 42.0 - 39.0 = \mathbf{+3.0\text{ weeks (Schedule Overrun Deficit)}}$$

---

### 12. Gantt Chart & Milestone Schedule (42 vs. 39 Weeks)

The Gantt schedule explicitly marks the conflict at Week 39, where the legacy licence expires while baseline activities extend through Week 42.

---

### 13. Critical Path Method (CPM) Analysis

$$\text{Critical Path: Requirements } \rightarrow \text{ Inventory } \rightarrow \text{ Triage (16 wks) } \rightarrow \text{ Migration (14 wks) } \rightarrow \text{ Testing } \rightarrow \text{ Closure}$$

Total Critical Path length = **42.0 weeks** (Zero Float). To mitigate the 3-week overrun, three management contingencies are established:
1. Commercial 30-day bridging licence extension through Week 43.
2. Capacity compression increasing TW allocation from 3 to 5 p-d/week.
3. Phased cutover prioritizing top 5,000 core pages before Week 39.

---

### 14. Testing & Quality Assurance Documentation

- **Functional Test Cases:** 15 comprehensive test cases (`TC-01` to `TC-15`) documented with `Status = Planned` and `Actual Result = To be executed during implementation`.
- **Boundary Value Analysis (BVA):** Evaluates boundaries for inventory (0, 1, 14000, 14001), triage rate (40 p/d), batch size (500 pg), and search latency (< 1.0s).
- **Decision Tables:** Complete triage decision rules and migration QA certification rules.
- **Defect Removal Efficiency (DRE):** $\text{DRE} = \frac{E}{E + D} \times 100$ (Target benchmark: $\ge 95.0\%$).
- **Defect Density:** Normalized metric per 1,000 tested pages (Target ceiling: $\le 8.0\text{ defects / KPages}$).

---

### 15. Quantitative Risk Management & RMMM Plans

Risk Exposure formula $E = P \times I$ applied to all 4 case study risks:

1. **Risk 2 (Teams do not review pages):** $P=0.6, I=7 \implies \mathbf{E=4.2}$ (**Rank 1 — Highest Risk**). Mitigated via CTO executive mandate, 1 p-d/wk sprint tracking, and TW pre-filtering.
2. **Risk 1 (Licence expires before completion):** $P=0.4, I=9 \implies \mathbf{E=3.6}$ (**Rank 2 — High Risk**). Mitigated via 30-day bridging licence, critical path tracking, and core page staging.
3. **Risk 3 (Broken links after migration):** $P=0.4, I=4 \implies \mathbf{E=1.6}$ (**Rank 3 — Moderate Risk**). Mitigated via automated regex URL rewrite tables and crawler verification.
4. **Risk 4 (No owner after migration):** $P=0.5, I=1 \implies \mathbf{E=0.5}$ (**Rank 4 — Low Risk**). Mitigated via system-enforced Zero Orphan Policy and 90-day review cycles.

---

### 16. Post-Migration Governance Framework

To permanently eliminate knowledge entropy, WikiMove establishes a 5-pillar governance model:
1. **Mandatory Named Custodian:** 100% of pages mapped to active employees.
2. **Automated 90-Day Periodic Review:** Automated prompts requiring owner recertification.
3. **14-Day Escalation SLA:** Unrevalidated pages escalate to domain Engineering Leads.
4. **Semi-Annual Archive Sweep:** Inactive pages retired to cold storage.
5. **Quarterly Broken Link Audits:** Scheduled background crawlers verify all intra-wiki and external links.

---

### 17. Project Closure & Handover State

- **Planned Closure State:** All 14,000 legacy pages triaged; 7,000 kept pages migrated and verified; legacy wiki platform decommissioned; target platform live under active governance.
- **Handover Package:** Wiki inventory registry, URL rewrite map, ownership directory, and QA crawler scripts transferred to the permanent technical writing team.

---

### 18. Lessons Learned & Academic Post-Mortem

1. **Documentation Requires Formal Ownership:** Without named custody, technical knowledge bases inevitably decay into unmaintainable repositories.
2. **Mathematical Estimation Exposes Latent Conflicts:** Calculating effort against fixed capacity early revealed the 3-week schedule deficit, allowing proactive risk mitigation rather than reactive crisis management.
3. **Cross-Team Governance Requires Executive Backing:** Relying on voluntary engineering team review fails; institutionalizing review quotas in sprint capacity is critical.

---

### 19. Conclusion

Project WikiMove provides an academically rigorous, mathematically consistent, and professional software engineering and project management portfolio. By addressing legacy content decay through structured triage, quality-gated migration, quantitative risk management, and long-term governance, the proposed system ensures that the organization successfully offboards its legacy platform and establishes a sustainable enterprise knowledge repository.

---

### 20. References & Appendices
- IEEE Std 830-1998: IEEE Recommended Practice for Software Requirements Specifications.
- Pressman, R. S., & Maxim, B. R.: Software Engineering: A Practitioner's Approach.
- Project Management Institute (PMI): A Guide to the Project Management Body of Knowledge (PMBOK Guide).
- Project Deliverables Directory: `Documentation/`, `Diagrams/`, `UI/`.
