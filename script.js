// WikiMove – Client-Side Reactive Data Store & Interactive Controllers
// Pure Vanilla JavaScript (Zero External Dependencies, 100% Academic Standard Compliant)

(function () {
  'use strict';

  const STORAGE_KEY = 'wikimove_store_v2';

  // --- 1. DEFAULT DATA SEEDING ---
  const INITIAL_DATA = {
    pages: [
      {
        id: 'WP-01042',
        title: 'Payment Gateway v2 API Specs',
        team: 'Team 1 - Payments Core',
        updated: '2026-08-14 (2 mos ago)',
        status: 'Pending',
        suggested: 'Keep',
        author: 'Jane Doe (Departed 2024)',
        wordCount: 1420,
        linksCount: 14,
        deadLinks: 0,
        assignedOwner: 'Alex Rivera (Tech Lead - Payments)',
        comments: 'Content is 100% current and in production use. Replaced legacy author with active Tech Lead Alex Rivera. Ready for migration batching.',
        content: `<h4>1. Overview & Architecture</h4>
<p>This document specifies the RESTful endpoints, idempotency headers, payload encryption (AES-256-GCM), and webhooks required for integrating third-party payment gateways (Stripe, Adyen, Razorpay).</p>
<h4>2. Authentication & Webhook Signatures</h4>
<p>All requests require an <code>X-Signature-SHA256</code> header HMAC signed with the merchant private key. Token TTL is fixed at 900 seconds with automatic token refreshing.</p>
<div style="background: var(--bg-secondary); padding: 12px; border-radius: var(--radius-sm); border-left: 3px solid var(--primary-color); font-family: monospace; font-size: 12px; margin-bottom: 14px;">
POST /api/v2/payments/charge<br>
Headers: Authorization: Bearer {JWT}, Idempotency-Key: {UUID}
</div>
<h4>3. Error Codes</h4>
<p>Standardized RFC 7807 problem details are returned for HTTP 400, 401, 403, and 500 error scenarios.</p>`,
        revisions: 28,
        url: 'https://legacy-wiki.internal/wiki/payments/v2-spec'
      },
      {
        id: 'WP-00819',
        title: 'Jenkins CI/CD Build Cluster v1 Setup',
        team: 'Team 3 - DevOps & Infra',
        updated: '2018-04-12 (8 yrs ago)',
        status: 'Pending',
        suggested: 'Delete',
        author: 'Mike Vance (Departed)',
        wordCount: 650,
        linksCount: 8,
        deadLinks: 5,
        assignedOwner: '',
        comments: 'Superseded by modern GitHub Actions runners and ArgoCD. Delete to reduce migration clutter.',
        content: `<h4>1. Legacy Jenkins Master Installation</h4>
<p>Deprecated guide detailing manual installation of Jenkins 1.6 on Amazon Linux EC2 instances with Oracle JDK 8.</p>
<div style="background: #fef2f2; padding: 10px; border-left: 3px solid var(--danger-color); font-size: 12px;">
WARNING: Contains dead internal server references (build-slave-01.internal.ec2) and deprecated security plugins.
</div>`,
        revisions: 12,
        url: 'https://legacy-wiki.internal/wiki/infra/jenkins-cluster-setup'
      },
      {
        id: 'WP-03412',
        title: 'OAuth2 Architecture & Token Claims',
        team: 'Team 2 - Auth & Identity',
        updated: '2026-05-20 (5 mos ago)',
        status: 'Pending',
        suggested: 'Keep',
        author: 'John Smith (Departed)',
        wordCount: 2100,
        linksCount: 22,
        deadLinks: 0,
        assignedOwner: 'Priya Patel (Staff Architect)',
        comments: 'Crucial identity architecture specification. Priya Patel assigned as active engineering custodian.',
        content: `<h4>1. Authorization Server Specs</h4>
<p>Standardized OAuth 2.0 and OpenID Connect authorization flows. Details PKCE verification code flow for SPA applications and JWT claims specifications.</p>
<h4>2. Token Revocation & Refresh Lifecycles</h4>
<p>Refresh token rotation policies with strict single-use entropy validation to prevent replay exploits.</p>`,
        revisions: 45,
        url: 'https://legacy-wiki.internal/wiki/auth/oauth2-specs'
      },
      {
        id: 'WP-09214',
        title: 'Q3 2017 Team Lunch Roster & Notes',
        team: 'Team 5 - Mobile Apps',
        updated: '2017-09-02 (9 yrs ago)',
        status: 'Pending',
        suggested: 'Delete',
        author: 'Sam Taylor',
        wordCount: 180,
        linksCount: 0,
        deadLinks: 0,
        assignedOwner: '',
        comments: 'Obsolete social notes with zero engineering relevance. Definite delete.',
        content: `<h4>Q3 2017 Team Outing Logistics</h4>
<p>Historical lunch schedule and cafeteria catering contact details from 2017. Outdated information.</p>`,
        revisions: 4,
        url: 'https://legacy-wiki.internal/wiki/mobile/lunch-roster-2017'
      },
      {
        id: 'WP-04771',
        title: 'Post-Mortem: Incident INC-2021-08-04',
        team: 'Team 4 - Search Platform',
        updated: '2021-08-06 (5 yrs ago)',
        status: 'Pending',
        suggested: 'Archive',
        author: 'Elena Rostova',
        wordCount: 3400,
        linksCount: 19,
        deadLinks: 2,
        assignedOwner: 'Marcus Chen (Senior Backend Engineer)',
        comments: 'Historical post-mortem required for SOC2 and ISO compliance audit retention. Retain in cold archive.',
        content: `<h4>1. Incident Summary & Root Cause</h4>
<p>45-minute outage on primary search cluster caused by unthrottled bulk re-indexing query starving memory pools.</p>
<h4>2. Corrective Action Items</h4>
<p>Rate limiting implemented at API gateway layer. Auto-remediation circuit breakers verified.</p>`,
        revisions: 9,
        url: 'https://legacy-wiki.internal/wiki/search/incident-2021-08-04'
      },
      {
        id: 'WP-11204',
        title: 'Microservices Topology Map 2026',
        team: 'Team 1 - Payments Core',
        updated: '2026-09-10 (1 mo ago)',
        status: 'Pending',
        suggested: 'Keep',
        author: 'Alex Rivera (Tech Lead - Payments)',
        wordCount: 1850,
        linksCount: 31,
        deadLinks: 0,
        assignedOwner: 'Alex Rivera (Tech Lead - Payments)',
        comments: 'Comprehensive multi-region service mesh diagram and routing topology. Active core document.',
        content: `<h4>1. Service Mesh Topology</h4>
<p>Maps 38 production microservices communicating via Envoy sidecars and gRPC across AWS us-east-1 and us-west-2 clusters.</p>
<h4>2. Circuit Breaker Parameters</h4>
<p>Defines timeout budgets, fallback endpoints, and distributed tracing span configurations.</p>`,
        revisions: 32,
        url: 'https://legacy-wiki.internal/wiki/payments/topology-map-2026'
      },
      {
        id: 'WP-06118',
        title: 'Kafka Streaming Topic Conventions',
        team: 'Team 3 - Data Platform',
        updated: '2026-07-22 (2 mos ago)',
        status: 'Pending',
        suggested: 'Keep',
        author: 'David Miller (Departed)',
        wordCount: 1290,
        linksCount: 11,
        deadLinks: 0,
        assignedOwner: 'Marcus Chen (Senior Backend Engineer)',
        comments: 'Streaming event schemas and partition sizing guidelines. Crucial for data platform engineers.',
        content: `<h4>1. Topic Naming Conventions</h4>
<p>Schema: <code>&lt;env&gt;.&lt;domain&gt;.&lt;entity&gt;.&lt;event_type&gt;.v&lt;version&gt;</code> with Avro schema registry integration.</p>
<h4>2. Partition Sizing & Retention Policies</h4>
<p>Default 7-day retention with compact cleanup policies for state store topics.</p>`,
        revisions: 19,
        url: 'https://legacy-wiki.internal/wiki/data/kafka-topic-conventions'
      },
      {
        id: 'WP-02550',
        title: 'Legacy Database Migration Scripts 2020',
        team: 'Team 3 - Data Platform',
        updated: '2020-02-14 (6 yrs ago)',
        status: 'Pending',
        suggested: 'Archive',
        author: 'Unknown',
        wordCount: 410,
        linksCount: 3,
        deadLinks: 2,
        assignedOwner: '',
        comments: 'Historical migration scripts from MySQL to PostgreSQL. Keep in archive for schema lineage.',
        content: `<h4>MySQL 5.7 to PostgreSQL 12 DDL Dumps</h4>
<p>Contains archived Python & Bash scripts used for data migration in Q1 2020.</p>`,
        revisions: 6,
        url: 'https://legacy-wiki.internal/wiki/data/db-migration-2020'
      },
      {
        id: 'WP-07823',
        title: 'iOS Swift Design Tokens & UI Kit',
        team: 'Team 5 - Mobile Apps',
        updated: '2026-06-11 (4 mos ago)',
        status: 'Pending',
        suggested: 'Keep',
        author: 'Sarah Jenkins (Lead Mobile Engineer)',
        wordCount: 1650,
        linksCount: 15,
        deadLinks: 0,
        assignedOwner: 'Sarah Jenkins (Lead Mobile Engineer)',
        comments: 'Primary design system tokens for iOS mobile clients. Frequently accessed by frontend designers.',
        content: `<h4>1. Color Tokens & Semantic Palettes</h4>
<p>Defines light/dark mode dynamic colors, typography scales, corner radii, and elevation shadows for SwiftUI components.</p>`,
        revisions: 24,
        url: 'https://legacy-wiki.internal/wiki/mobile/ios-design-tokens'
      },
      {
        id: 'WP-05331',
        title: 'Kubernetes Ingress & SSL Cert Automation',
        team: 'Team 3 - DevOps & Infra',
        updated: '2026-04-18 (5 mos ago)',
        status: 'Pending',
        suggested: 'Keep',
        author: 'David Kim (DevOps Lead)',
        wordCount: 1980,
        linksCount: 18,
        deadLinks: 0,
        assignedOwner: 'David Kim (DevOps Lead)',
        comments: 'Live cert-manager documentation and Let\'s Encrypt cluster issuer configs.',
        content: `<h4>Cert-Manager Cluster Configuration</h4>
<p>Automated ACME HTTP01 and DNS01 validation specs, wildcard certificate issuers, and alerting hooks.</p>`,
        revisions: 17,
        url: 'https://legacy-wiki.internal/wiki/infra/k8s-ingress-ssl'
      },
      {
        id: 'WP-08102',
        title: '2019 Office WiFi Password & Printer IP',
        team: 'Team 6 - IT Operations',
        updated: '2019-01-10 (7 yrs ago)',
        status: 'Pending',
        suggested: 'Delete',
        author: 'IT Helpdesk',
        wordCount: 95,
        linksCount: 0,
        deadLinks: 0,
        assignedOwner: '',
        comments: 'Deprecated plain-text office credentials. Delete immediately.',
        content: `<h4>Office Network Access 2019</h4>
<p>Old static WPA2 passphrase for building 3 guest WiFi. Superseded by 802.1X WPA3 Enterprise authentication.</p>`,
        revisions: 2,
        url: 'https://legacy-wiki.internal/wiki/it/wifi-printer-2019'
      },
      {
        id: 'WP-10499',
        title: 'Algolia to Elasticsearch Search Migration Plan',
        team: 'Team 4 - Search Platform',
        updated: '2026-03-30 (6 mos ago)',
        status: 'Pending',
        suggested: 'Archive',
        author: 'Elena Rostova',
        wordCount: 2200,
        linksCount: 14,
        deadLinks: 1,
        assignedOwner: 'Marcus Chen (Senior Backend Engineer)',
        comments: 'Executed search migration architecture proposal. Retain as design historical reference.',
        content: `<h4>Search Infrastructure Migration Blueprint</h4>
<p>Detailed performance benchmarks, analyzer configurations, and sharding strategies evaluated during migration.</p>`,
        revisions: 15,
        url: 'https://legacy-wiki.internal/wiki/search/algolia-es-plan'
      }
    ],
    batches: [
      {
        id: 'BATCH-01',
        name: 'Payments Core & Billing Guides',
        pages: 500,
        team: 'Team 1 + TW',
        status: 'Certified',
        linkIntegrity: '100% Valid (0 Broken)',
        progress: 100
      },
      {
        id: 'BATCH-02',
        name: 'Auth, OAuth2 & IAM Security',
        pages: 600,
        team: 'Team 2 + TW',
        status: 'Certified',
        linkIntegrity: '100% Valid (0 Broken)',
        progress: 100
      },
      {
        id: 'BATCH-03',
        name: 'Data Engineering & ETL Pipelines',
        pages: 1000,
        team: 'Team 3 + TW',
        status: 'Certified',
        linkIntegrity: '99.8% Valid (2 Redirected)',
        progress: 100
      },
      {
        id: 'BATCH-04',
        name: 'Search & Recommendation Engine',
        pages: 800,
        team: 'Team 4 + TW',
        status: 'Validation Pending',
        linkIntegrity: 'Testing in Progress (420 pg)',
        progress: 52
      },
      {
        id: 'BATCH-05',
        name: 'Mobile SDKs & Frontend Components',
        pages: 1200,
        team: 'Team 5, 6',
        status: 'Queued',
        linkIntegrity: 'Pending Pre-Migration Scan',
        progress: 0
      }
    ],
    ownership: [
      {
        title: 'Payment Gateway v2 API Specs',
        team: 'Team 1 - Payments Core',
        legacyOwner: 'Jane Doe (Departed)',
        assignedOwner: 'Alex Rivera (Tech Lead - Payments)',
        nextReview: '2026-11-15 (in 44 days)',
        status: 'Active Custody'
      },
      {
        title: 'OAuth2 Architecture & Token Claims',
        team: 'Team 2 - Auth & Identity',
        legacyOwner: 'John Smith (Departed)',
        assignedOwner: 'Priya Patel (Staff Architect)',
        nextReview: '2026-11-20 (in 49 days)',
        status: 'Active Custody'
      },
      {
        title: 'Microservices Topology Map 2026',
        team: 'Team 1 - Payments Core',
        legacyOwner: 'Unassigned',
        assignedOwner: 'Alex Rivera (Tech Lead - Payments)',
        nextReview: '2026-12-10 (in 69 days)',
        status: 'Active Custody'
      },
      {
        title: 'Kafka Streaming Topic Conventions',
        team: 'Team 3 - Data Platform',
        legacyOwner: 'David Miller (Departed)',
        assignedOwner: 'Marcus Chen (Senior Backend Engineer)',
        nextReview: '2026-10-18 (in 16 days)',
        status: 'Review Due Soon'
      },
      {
        title: 'Legacy Database Migration Scripts 2020',
        team: 'Team 3 - Data Platform',
        legacyOwner: 'Unknown',
        assignedOwner: 'Unassigned',
        nextReview: 'Overdue',
        status: 'Orphan Alert (R4)'
      },
      {
        title: 'iOS Swift Design Tokens & UI Kit',
        team: 'Team 5 - Mobile Apps',
        legacyOwner: 'Alex Wood (Departed)',
        assignedOwner: 'Sarah Jenkins (Lead Mobile Engineer)',
        nextReview: '2026-11-28 (in 57 days)',
        status: 'Active Custody'
      },
      {
        title: 'Kubernetes Ingress & SSL Cert Automation',
        team: 'Team 3 - DevOps & Infra',
        legacyOwner: 'Chris Brown',
        assignedOwner: 'David Kim (DevOps Lead)',
        nextReview: '2026-12-05 (in 64 days)',
        status: 'Active Custody'
      }
    ],
    risks: [
      {
        id: 'R2',
        title: 'Teams do not review pages',
        p: 0.6,
        i: 7,
        owner: 'CTO & Eng Leads',
        strategy: 'Enforce mandatory 1 p-d/week quota per team in sprint planning; weekly burndown audits.'
      },
      {
        id: 'R1',
        title: 'Licence expires before project completion',
        p: 0.4,
        i: 9,
        owner: 'Project Manager',
        strategy: 'Negotiate 1-month licence extension; prioritize 7,000 kept pages; parallelize migration.'
      },
      {
        id: 'R3',
        title: 'Broken links after migration',
        p: 0.4,
        i: 4,
        owner: 'Technical Writer',
        strategy: 'Automated URL rewrite mapping; regex link checker; legacy 301 redirection table.'
      },
      {
        id: 'R4',
        title: 'No owner after migration',
        p: 0.5,
        i: 1,
        owner: 'Governance Custodian',
        strategy: 'System blocks migration unless a named custodian is assigned; 90-day review notifications.'
      }
    ],
    capacity: 15.0
  };

  // --- 2. DATA STORE HELPERS ---
  function getStore() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {
      console.warn('LocalStorage error, falling back to initial data', e);
    }
    const fresh = JSON.parse(JSON.stringify(INITIAL_DATA));
    saveStore(fresh);
    return fresh;
  }

  function saveStore(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }

  function resetStore() {
    localStorage.removeItem(STORAGE_KEY);
    const fresh = getStore();
    showToast('Demo data restored to pristine case study baseline!', 'info');
    return fresh;
  }

  // --- 3. TOAST NOTIFICATION SYSTEM ---
  let toastEl = null;
  let toastTimer = null;

  function showToast(message, type = 'info') {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'toast-msg';
      document.body.appendChild(toastEl);
    }

    clearTimeout(toastTimer);
    toastEl.className = `toast-msg toast-${type} show`;

    const iconMap = {
      success: '✓',
      warning: '⚠️',
      danger: '✕',
      info: 'ℹ️'
    };

    toastEl.innerHTML = `<span style="font-size: 15px;">${iconMap[type] || 'ℹ️'}</span> <span>${message}</span>`;

    toastTimer = setTimeout(() => {
      toastEl.classList.remove('show');
    }, 3200);
  }

  // --- 4. MODAL DIALOG SYSTEM ---
  let modalBackdrop = null;

  function createModalContainer() {
    if (modalBackdrop) return modalBackdrop;
    modalBackdrop = document.createElement('div');
    modalBackdrop.className = 'modal-backdrop';
    modalBackdrop.innerHTML = `
      <div class="modal-container" role="dialog" aria-modal="true">
        <div class="modal-header">
          <h3 id="modal-title">Modal Title</h3>
          <button class="modal-close" aria-label="Close modal">&times;</button>
        </div>
        <div class="modal-body" id="modal-body"></div>
        <div class="modal-footer" id="modal-footer"></div>
      </div>
    `;
    document.body.appendChild(modalBackdrop);

    // Event listeners to close
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
    modalBackdrop.querySelector('.modal-close').addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
        closeModal();
      }
    });

    return modalBackdrop;
  }

  function openModal({ title, bodyHtml, confirmText = 'Save', cancelText = 'Cancel', onConfirm = null }) {
    const modal = createModalContainer();
    modal.querySelector('#modal-title').innerHTML = title;
    modal.querySelector('#modal-body').innerHTML = bodyHtml;

    const footer = modal.querySelector('#modal-footer');
    footer.innerHTML = `
      <button class="btn btn-secondary modal-cancel-btn">${cancelText}</button>
      <button class="btn btn-primary modal-confirm-btn">${confirmText}</button>
    `;

    footer.querySelector('.modal-cancel-btn').onclick = closeModal;
    const confirmBtn = footer.querySelector('.modal-confirm-btn');

    confirmBtn.onclick = () => {
      if (onConfirm) {
        const result = onConfirm(modal.querySelector('#modal-body'));
        if (result !== false) {
          closeModal();
        }
      } else {
        closeModal();
      }
    };

    modal.classList.add('active');
  }

  function closeModal() {
    if (modalBackdrop) {
      modalBackdrop.classList.remove('active');
    }
  }

  // --- 5. SIDEBAR INJECTIONS ---
  function setupSidebar() {
    const footer = document.querySelector('.sidebar-footer');
    if (footer && !footer.querySelector('.reset-demo-btn')) {
      const resetBtn = document.createElement('button');
      resetBtn.className = 'reset-demo-btn';
      resetBtn.innerHTML = '<span>↺</span> Reset Demo Data';
      resetBtn.title = 'Reset all prototype data and metrics back to initial case study state';
      resetBtn.onclick = () => {
        if (confirm('Reset prototype data back to the primary case study baseline?')) {
          resetStore();
          setTimeout(() => location.reload(), 400);
        }
      };
      footer.appendChild(resetBtn);
    }
  }

  // --- 6. SCREEN CONTROLLERS ---

  // 6.1 PAGE TRIAGE CONTROLLER (triage.html)
  function initTriageController() {
    const tableBody = document.getElementById('triage-table-body');
    if (!tableBody) return;

    const searchInput = document.getElementById('triage-search');
    const teamFilter = document.getElementById('triage-team-filter');
    const statusFilter = document.getElementById('triage-status-filter');
    const resetBtn = document.getElementById('btn-reset-filters');
    const batchTriageBtn = document.getElementById('btn-batch-triage');
    const addPageBtn = document.getElementById('btn-add-page');
    const counterEl = document.getElementById('triage-counter');

    // Parse URL parameter if coming from dashboard
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('status') && statusFilter) {
      statusFilter.value = urlParams.get('status');
    }

    function renderTable() {
      const store = getStore();
      const query = (searchInput ? searchInput.value : '').toLowerCase().trim();
      const team = teamFilter ? teamFilter.value : 'All';
      const status = statusFilter ? statusFilter.value : 'All';

      const filtered = store.pages.filter(p => {
        const matchesQuery = !query ||
          p.title.toLowerCase().includes(query) ||
          p.id.toLowerCase().includes(query) ||
          p.team.toLowerCase().includes(query);

        const matchesTeam = (team === 'All') || p.team === team;
        const matchesStatus = (status === 'All') || p.status === status;

        return matchesQuery && matchesTeam && matchesStatus;
      });

      if (counterEl) {
        const pendingCount = store.pages.filter(p => p.status === 'Pending').length;
        const keptCount = store.pages.filter(p => p.status === 'Kept').length;
        const archivedCount = store.pages.filter(p => p.status === 'Archived').length;
        const deletedCount = store.pages.filter(p => p.status === 'Deleted').length;
        counterEl.innerHTML = `Showing <strong>${filtered.length} of ${store.pages.length} Pages</strong> (Kept: ${keptCount}, Pending: ${pendingCount})`;
      }

      if (filtered.length === 0) {
        tableBody.innerHTML = `
          <tr>
            <td colspan="7">
              <div class="empty-state">
                <span class="empty-state-icon">🔍</span>
                <h4>No Matching Wiki Pages Found</h4>
                <p>Try clearing your search query or selecting "All Pages" in the status dropdown.</p>
                <button class="btn btn-secondary btn-sm" id="empty-reset-btn">Reset All Filters</button>
              </div>
            </td>
          </tr>
        `;
        const emptyResetBtn = document.getElementById('empty-reset-btn');
        if (emptyResetBtn) {
          emptyResetBtn.onclick = () => {
            if (searchInput) searchInput.value = '';
            if (teamFilter) teamFilter.value = 'All';
            if (statusFilter) statusFilter.value = 'All';
            renderTable();
          };
        }
        return;
      }

      tableBody.innerHTML = filtered.map(page => {
        let statusBadge = '<span class="badge badge-blue">Pending</span>';
        if (page.status === 'Kept') statusBadge = '<span class="badge badge-green">Kept</span>';
        else if (page.status === 'Archived') statusBadge = '<span class="badge badge-amber">Archived</span>';
        else if (page.status === 'Deleted') statusBadge = '<span class="badge badge-red">Deleted</span>';

        let suggestedBadge = '<span class="badge badge-green">Keep</span>';
        if (page.suggested === 'Archive') suggestedBadge = '<span class="badge badge-amber">Archive</span>';
        else if (page.suggested === 'Delete') suggestedBadge = '<span class="badge badge-red">Delete</span>';

        return `
          <tr data-id="${page.id}">
            <td><a href="review.html?pageId=${page.id}" style="color: var(--primary-color); font-weight: 700; text-decoration: none;"><code>${page.id}</code></a></td>
            <td>
              <a href="review.html?pageId=${page.id}" style="color: var(--text-main); font-weight: 600; text-decoration: none;" title="Click to inspect this page">
                ${page.title}
              </a>
            </td>
            <td>${page.team}</td>
            <td style="color: var(--text-muted); font-size: 12px;">${page.updated}</td>
            <td>${statusBadge}</td>
            <td>${suggestedBadge}</td>
            <td style="text-align: center;">
              <div class="btn-group" style="justify-content: center;">
                <button class="btn btn-keep btn-sm" data-action="Keep" data-id="${page.id}" title="Classify as KEEP (Ready for migration)">Keep</button>
                <button class="btn btn-archive btn-sm" data-action="Archive" data-id="${page.id}" title="Classify as ARCHIVE (Compliance retention)">Archive</button>
                <button class="btn btn-delete btn-sm" data-action="Delete" data-id="${page.id}" title="Classify as DELETE (Outdated / Redundant)">Delete</button>
                <a href="review.html?pageId=${page.id}" class="btn btn-secondary btn-sm" title="Detailed inspection and owner assignment">Inspect</a>
              </div>
            </td>
          </tr>
        `;
      }).join('');

      // Attach row action listeners
      tableBody.querySelectorAll('button[data-action]').forEach(btn => {
        btn.onclick = (e) => {
          e.stopPropagation();
          const action = btn.dataset.action;
          const pageId = btn.dataset.id;
          handleTriageAction(pageId, action);
        };
      });
    }

    function handleTriageAction(pageId, action) {
      const store = getStore();
      const page = store.pages.find(p => p.id === pageId);
      if (!page) return;

      const targetStatus = action === 'Keep' ? 'Kept' : (action === 'Archive' ? 'Archived' : 'Deleted');
      page.status = targetStatus;

      // If kept and without owner, assign Tech Writer or default custodian to prevent R4 orphan decay
      if (action === 'Keep' && !page.assignedOwner) {
        page.assignedOwner = 'Technical Writer Custodian';
      }

      // Sync with ownership registry if Kept
      if (action === 'Keep') {
        const existingOwn = store.ownership.find(o => o.title === page.title);
        if (existingOwn) {
          existingOwn.assignedOwner = page.assignedOwner || 'Alex Rivera (Tech Lead - Payments)';
          existingOwn.status = 'Active Custody';
        } else {
          store.ownership.unshift({
            title: page.title,
            team: page.team,
            legacyOwner: page.author || 'Legacy Author',
            assignedOwner: page.assignedOwner || 'Technical Writer Custodian',
            nextReview: '2026-12-15 (in 74 days)',
            status: 'Active Custody'
          });
        }
      }

      saveStore(store);
      renderTable();

      const typeMap = { Keep: 'success', Archive: 'warning', Delete: 'danger' };
      showToast(`Page ${pageId} classified as [${action.toUpperCase()}]!`, typeMap[action] || 'info');
    }

    // Filter listeners
    if (searchInput) searchInput.addEventListener('input', renderTable);
    if (teamFilter) teamFilter.addEventListener('change', renderTable);
    if (statusFilter) statusFilter.addEventListener('change', renderTable);

    if (resetBtn) {
      resetBtn.onclick = () => {
        if (searchInput) searchInput.value = '';
        if (teamFilter) teamFilter.value = 'All';
        if (statusFilter) statusFilter.value = 'All';
        renderTable();
        showToast('Filters cleared', 'info');
      };
    }

    // Batch Triage All Visible Button
    if (batchTriageBtn) {
      batchTriageBtn.onclick = () => {
        const store = getStore();
        const pendingVisible = store.pages.filter(p => {
          const query = (searchInput ? searchInput.value : '').toLowerCase().trim();
          const team = teamFilter ? teamFilter.value : 'All';
          const matchesQuery = !query || p.title.toLowerCase().includes(query) || p.id.toLowerCase().includes(query);
          const matchesTeam = (team === 'All') || p.team === team;
          return p.status === 'Pending' && matchesQuery && matchesTeam;
        });

        if (pendingVisible.length === 0) {
          showToast('No pending pages currently visible to triage.', 'warning');
          return;
        }

        if (confirm(`Triage all ${pendingVisible.length} visible pending pages using their AI-suggested actions?`)) {
          pendingVisible.forEach(page => {
            const targetStatus = page.suggested === 'Keep' ? 'Kept' : (page.suggested === 'Archive' ? 'Archived' : 'Deleted');
            page.status = targetStatus;
            if (targetStatus === 'Kept' && !page.assignedOwner) {
              page.assignedOwner = 'Technical Writer Custodian';
            }
          });
          saveStore(store);
          renderTable();
          showToast(`Successfully triaged ${pendingVisible.length} pages!`, 'success');
        }
      };
    }

    // Add New Page Button & Modal
    if (addPageBtn) {
      addPageBtn.onclick = () => {
        const store = getStore();
        const nextNum = 12000 + Math.floor(Math.random() * 8999);
        const newId = `WP-${nextNum}`;

        const formHtml = `
          <div class="form-group">
            <label class="form-label">Page ID</label>
            <input type="text" id="modal-page-id" class="form-control" value="${newId}" readonly style="background: var(--bg-secondary);">
          </div>
          <div class="form-group">
            <label class="form-label">Page Title <span style="color: var(--danger-color);">*</span></label>
            <input type="text" id="modal-page-title" class="form-control" placeholder="e.g., Redis Cache Eviction & TTL Policies" required>
          </div>
          <div class="form-group">
            <label class="form-label">Engineering Team</label>
            <select id="modal-page-team" class="form-control">
              <option value="Team 1 - Payments Core">Team 1 - Payments Core</option>
              <option value="Team 2 - Auth & Identity">Team 2 - Auth & Identity</option>
              <option value="Team 3 - Data Platform">Team 3 - Data Platform</option>
              <option value="Team 3 - DevOps & Infra">Team 3 - DevOps & Infra</option>
              <option value="Team 4 - Search Platform">Team 4 - Search Platform</option>
              <option value="Team 5 - Mobile Apps">Team 5 - Mobile Apps</option>
              <option value="Team 6 - IT Operations">Team 6 - IT Operations</option>
            </select>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            <div class="form-group">
              <label class="form-label">Suggested Action</label>
              <select id="modal-page-suggested" class="form-control">
                <option value="Keep">Keep (50% target)</option>
                <option value="Archive">Archive (Compliance)</option>
                <option value="Delete">Delete (Outdated)</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Estimated Word Count</label>
              <input type="number" id="modal-page-words" class="form-control" value="850">
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Initial Summary / Content</label>
            <textarea id="modal-page-content" class="form-control" rows="3" placeholder="Brief technical summary of this wiki document..."></textarea>
          </div>
        `;

        openModal({
          title: '➕ Add New Wiki Page to Inventory',
          bodyHtml: formHtml,
          confirmText: 'Add Page to Queue',
          onConfirm: (modalBody) => {
            const titleInput = modalBody.querySelector('#modal-page-title');
            const title = titleInput.value.trim();
            if (!title) {
              alert('Please enter a valid page title.');
              titleInput.focus();
              return false;
            }

            const team = modalBody.querySelector('#modal-page-team').value;
            const suggested = modalBody.querySelector('#modal-page-suggested').value;
            const words = parseInt(modalBody.querySelector('#modal-page-words').value, 10) || 500;
            const contentText = modalBody.querySelector('#modal-page-content').value.trim() || `Technical specification for ${title}.`;

            const newPage = {
              id: newId,
              title: title,
              team: team,
              updated: 'Just now (New)',
              status: 'Pending',
              suggested: suggested,
              author: 'Current User',
              wordCount: words,
              linksCount: 4,
              deadLinks: 0,
              assignedOwner: suggested === 'Keep' ? 'Alex Rivera (Tech Lead - Payments)' : '',
              comments: 'Newly logged documentation item for triage review.',
              content: `<h4>1. Overview</h4><p>${contentText}</p>`,
              revisions: 1,
              url: `https://legacy-wiki.internal/wiki/docs/${newId.toLowerCase()}`
            };

            const freshStore = getStore();
            freshStore.pages.unshift(newPage);
            saveStore(freshStore);

            renderTable();
            showToast(`Page ${newId} successfully added to triage queue!`, 'success');
            return true;
          }
        });
      };
    }

    renderTable();
  }

  // 6.2 PAGE REVIEW CONTROLLER (review.html)
  function initReviewController() {
    const pageSelect = document.getElementById('review-page-select');
    if (!pageSelect) return;

    const titleEl = document.getElementById('preview-page-title');
    const urlEl = document.getElementById('preview-page-url');
    const wordsEl = document.getElementById('preview-page-words');
    const linksEl = document.getElementById('preview-page-links');
    const contentEl = document.getElementById('preview-page-content');
    const teamEl = document.getElementById('review-team');
    const legacyOwnerEl = document.getElementById('review-legacy-owner');
    const newOwnerSelect = document.getElementById('review-new-owner');
    const commentsEl = document.getElementById('review-comments');
    const statusBadge = document.getElementById('review-status-badge');
    const auditEl = document.getElementById('preview-audit-trail');

    const btnKeep = document.getElementById('btn-review-keep');
    const btnArchive = document.getElementById('btn-review-archive');
    const btnDelete = document.getElementById('btn-review-delete');

    const store = getStore();
    const urlParams = new URLSearchParams(window.location.search);
    let activePageId = urlParams.get('pageId') || (store.pages[0] ? store.pages[0].id : null);

    // Populate the dropdown
    function populateDropdown() {
      const currentStore = getStore();
      pageSelect.innerHTML = currentStore.pages.map(p => {
        const symbol = p.status === 'Kept' ? '✓' : (p.status === 'Archived' ? '📁' : (p.status === 'Deleted' ? '🗑️' : '⏳'));
        const selected = p.id === activePageId ? 'selected' : '';
        return `<option value="${p.id}" ${selected}>[${symbol} ${p.status.toUpperCase()}] ${p.id} – ${p.title}</option>`;
      }).join('');
    }

    function loadPage(pageId) {
      const currentStore = getStore();
      const page = currentStore.pages.find(p => p.id === pageId) || currentStore.pages[0];
      if (!page) return;

      activePageId = page.id;
      populateDropdown();

      if (titleEl) titleEl.textContent = page.title;
      if (urlEl) urlEl.textContent = page.url || `https://legacy-wiki.internal/wiki/docs/${page.id}`;
      if (wordsEl) wordsEl.textContent = `${page.wordCount.toLocaleString()} words`;
      if (linksEl) linksEl.textContent = `${page.linksCount} (${page.deadLinks} dead)`;
      if (contentEl) contentEl.innerHTML = page.content;
      if (teamEl) teamEl.value = page.team;
      if (legacyOwnerEl) legacyOwnerEl.value = page.author || 'Unassigned / Unknown';

      if (newOwnerSelect) {
        if (page.assignedOwner) {
          // If option exists, select it, else add it
          let found = false;
          for (let opt of newOwnerSelect.options) {
            if (opt.value === page.assignedOwner) {
              opt.selected = true;
              found = true;
              break;
            }
          }
          if (!found) {
            const newOpt = document.createElement('option');
            newOpt.value = page.assignedOwner;
            newOpt.textContent = page.assignedOwner;
            newOpt.selected = true;
            newOwnerSelect.appendChild(newOpt);
          }
        }
      }

      if (commentsEl) commentsEl.value = page.comments || '';

      if (statusBadge) {
        let badgeClass = 'badge badge-blue';
        if (page.status === 'Kept') badgeClass = 'badge badge-green';
        else if (page.status === 'Archived') badgeClass = 'badge badge-amber';
        else if (page.status === 'Deleted') badgeClass = 'badge badge-red';
        statusBadge.className = badgeClass;
        statusBadge.textContent = page.status;
      }

      if (auditEl) {
        auditEl.innerHTML = `
          <p>• Page ID: <strong>${page.id}</strong></p>
          <p>• Last Modified: ${page.updated}</p>
          <p>• Total Revisions: ${page.revisions || 12} revisions</p>
          <p>• Linked from: ${Math.floor(page.linksCount * 1.3) + 2} other wiki pages</p>
        `;
      }
    }

    pageSelect.addEventListener('change', () => {
      loadPage(pageSelect.value);
    });

    function saveDecision(decisionStatus, actionName) {
      const currentStore = getStore();
      const page = currentStore.pages.find(p => p.id === activePageId);
      if (!page) return;

      const newOwner = newOwnerSelect ? newOwnerSelect.value : '';
      const comments = commentsEl ? commentsEl.value.trim() : '';

      // Validate named owner for KEEP (Mandatory rule to prevent orphan decay R4)
      if (decisionStatus === 'Kept' && (!newOwner || newOwner.includes('Unassigned'))) {
        showToast('Rule Violation (R4): An active named owner must be designated for KEEP!', 'danger');
        if (newOwnerSelect) newOwnerSelect.focus();
        return;
      }

      page.status = decisionStatus;
      page.comments = comments;
      if (decisionStatus === 'Kept') {
        page.assignedOwner = newOwner;

        // Update ownership registry
        const existingOwn = currentStore.ownership.find(o => o.title === page.title);
        if (existingOwn) {
          existingOwn.assignedOwner = newOwner;
          existingOwn.status = 'Active Custody';
        } else {
          currentStore.ownership.unshift({
            title: page.title,
            team: page.team,
            legacyOwner: page.author,
            assignedOwner: newOwner,
            nextReview: '2026-11-25 (in 54 days)',
            status: 'Active Custody'
          });
        }
      }

      saveStore(currentStore);
      loadPage(activePageId);

      const typeMap = { Kept: 'success', Archived: 'warning', Deleted: 'danger' };
      showToast(`Review Saved: [${page.id}] marked as ${decisionStatus.toUpperCase()}`, typeMap[decisionStatus] || 'info');

      // Prompt next pending
      const nextPending = currentStore.pages.find(p => p.status === 'Pending' && p.id !== activePageId);
      if (nextPending) {
        setTimeout(() => {
          if (confirm(`Review saved! Would you like to inspect the next pending page (${nextPending.id} – ${nextPending.title})?`)) {
            loadPage(nextPending.id);
          }
        }, 600);
      }
    }

    if (btnKeep) btnKeep.onclick = () => saveDecision('Kept', 'Keep');
    if (btnArchive) btnArchive.onclick = () => saveDecision('Archived', 'Archive');
    if (btnDelete) {
      btnDelete.onclick = () => {
        if (confirm('Permanently delete this page from migration queue?')) {
          saveDecision('Deleted', 'Delete');
        }
      };
    }

    loadPage(activePageId);
  }

  // 6.3 MIGRATION STATUS CONTROLLER (migration.html)
  function initMigrationController() {
    const tableBody = document.getElementById('batches-table-body');
    if (!tableBody) return;

    const searchInput = document.getElementById('batch-search');
    const statusFilter = document.getElementById('batch-status-filter');
    const resetBtn = document.getElementById('btn-reset-batch-filters');
    const createBatchBtn = document.getElementById('btn-create-batch');
    const counterEl = document.getElementById('batch-counter');

    // Metrics elements
    const totalPagesEl = document.getElementById('mig-total-pages');
    const migratedPagesEl = document.getElementById('mig-migrated-pages');
    const pendingValEl = document.getElementById('mig-pending-val');
    const pendingBatchEl = document.getElementById('mig-pending-batch');
    const failedEl = document.getElementById('mig-failed');
    const progressPercentEl = document.getElementById('mig-progress-percent');
    const progressBarEl = document.getElementById('mig-progress-bar');
    const progressLabelEl = document.getElementById('mig-progress-label');
    const progressRatioEl = document.getElementById('mig-progress-ratio');

    function updateMetrics() {
      const store = getStore();
      const targetKept = 7000;

      let certifiedPages = 0;
      let validatingPages = 0;
      let queuedPages = 0;

      store.batches.forEach(b => {
        if (b.status === 'Certified') certifiedPages += b.pages;
        else if (b.status === 'Validation Pending') validatingPages += Math.floor(b.pages * (b.progress / 100));
        else queuedPages += b.pages;
      });

      const totalMigrated = certifiedPages;
      const progressPercent = Math.min(100, ((totalMigrated / targetKept) * 100)).toFixed(1);

      if (totalPagesEl) totalPagesEl.textContent = targetKept.toLocaleString();
      if (migratedPagesEl) migratedPagesEl.textContent = totalMigrated.toLocaleString();
      if (pendingValEl) pendingValEl.textContent = validatingPages.toLocaleString();
      if (pendingBatchEl) pendingBatchEl.textContent = (targetKept - totalMigrated - validatingPages).toLocaleString();

      if (progressPercentEl) progressPercentEl.textContent = `${progressPercent}% Completed`;
      if (progressBarEl) progressBarEl.style.width = `${progressPercent}%`;
      if (progressLabelEl) progressLabelEl.textContent = `Migrated Content Progress (${totalMigrated.toLocaleString()} / 7,000 Pages)`;
      if (progressRatioEl) progressRatioEl.textContent = `${totalMigrated.toLocaleString()} of 7,000 Pages`;
    }

    function renderBatches() {
      const store = getStore();
      const query = (searchInput ? searchInput.value : '').toLowerCase().trim();
      const status = statusFilter ? statusFilter.value : 'All';

      const filtered = store.batches.filter(b => {
        const matchesQuery = !query || b.name.toLowerCase().includes(query) || b.id.toLowerCase().includes(query);
        const matchesStatus = (status === 'All') || b.status === status;
        return matchesQuery && matchesStatus;
      });

      if (counterEl) {
        counterEl.innerHTML = `Showing <strong>${filtered.length} of ${store.batches.length} Batches</strong>`;
      }

      if (filtered.length === 0) {
        tableBody.innerHTML = `
          <tr>
            <td colspan="8">
              <div class="empty-state">
                <span class="empty-state-icon">📦</span>
                <h4>No Migration Batches Match Criteria</h4>
                <p>Try searching with another keyword or reset filters.</p>
              </div>
            </td>
          </tr>
        `;
        return;
      }

      tableBody.innerHTML = filtered.map(b => {
        let badgeClass = 'badge badge-blue';
        let barClass = '';
        if (b.status === 'Certified') {
          badgeClass = 'badge badge-green';
          barClass = 'progress-bar-success';
        } else if (b.status === 'Validation Pending') {
          badgeClass = 'badge badge-amber';
          barClass = 'progress-bar-warning';
        }

        const nextActionLabel = b.status === 'Queued' ? '▶ Start Validation' : (b.status === 'Validation Pending' ? '✓ Certify Batch' : 'Verified');
        const nextActionDisabled = b.status === 'Certified' ? 'disabled style="opacity: 0.6; cursor: default;"' : '';

        return `
          <tr data-id="${b.id}">
            <td><code>${b.id}</code></td>
            <td><strong>${b.name}</strong></td>
            <td>${b.pages.toLocaleString()} pages</td>
            <td>${b.team}</td>
            <td><span class="${badgeClass}">${b.status}</span></td>
            <td>${b.linkIntegrity}</td>
            <td>
              <div class="progress-container" style="width: 110px; margin: 0;">
                <div class="progress-bar ${barClass}" style="width: ${b.progress}%;"></div>
              </div>
              <span style="font-size: 11px; color: var(--text-muted);">${b.progress}%</span>
            </td>
            <td style="text-align: center;">
              <div class="btn-group" style="justify-content: center;">
                <button class="btn btn-primary btn-sm advance-batch-btn" data-id="${b.id}" ${nextActionDisabled}>${nextActionLabel}</button>
                <button class="btn btn-secondary btn-sm scan-links-btn" data-id="${b.id}">Run Link Scan</button>
              </div>
            </td>
          </tr>
        `;
      }).join('');

      // Advance Action
      tableBody.querySelectorAll('.advance-batch-btn').forEach(btn => {
        btn.onclick = () => {
          const batchId = btn.dataset.id;
          const currentStore = getStore();
          const batch = currentStore.batches.find(b => b.id === batchId);
          if (!batch || batch.status === 'Certified') return;

          if (batch.status === 'Queued') {
            batch.status = 'Validation Pending';
            batch.progress = 55;
            batch.linkIntegrity = 'Validation in Progress (8 Broken Redirected)';
            showToast(`Batch [${batchId}] moved to Validation Pending!`, 'warning');
          } else if (batch.status === 'Validation Pending') {
            batch.status = 'Certified';
            batch.progress = 100;
            batch.linkIntegrity = '100% Valid (0 Broken)';
            showToast(`Batch [${batchId}] certified on target platform!`, 'success');
          }

          saveStore(currentStore);
          renderBatches();
          updateMetrics();
        };
      });

      // Link Scan Action
      tableBody.querySelectorAll('.scan-links-btn').forEach(btn => {
        btn.onclick = () => {
          const batchId = btn.dataset.id;
          showToast(`Running automated regex hyperlink & 301 redirection scan for ${batchId}...`, 'info');
          setTimeout(() => {
            showToast(`Link scan passed for ${batchId}: 100% hyperlink integrity (NFR-01 satisfied)!`, 'success');
          }, 800);
        };
      });
    }

    if (searchInput) searchInput.addEventListener('input', renderBatches);
    if (statusFilter) statusFilter.addEventListener('change', renderBatches);

    if (resetBtn) {
      resetBtn.onclick = () => {
        if (searchInput) searchInput.value = '';
        if (statusFilter) statusFilter.value = 'All';
        renderBatches();
        showToast('Filters cleared', 'info');
      };
    }

    if (createBatchBtn) {
      createBatchBtn.onclick = () => {
        const store = getStore();
        const nextNum = store.batches.length + 1;
        const newBatchId = `BATCH-${nextNum < 10 ? '0' + nextNum : nextNum}`;

        const formHtml = `
          <div class="form-group">
            <label class="form-label">Batch ID</label>
            <input type="text" class="form-control" value="${newBatchId}" readonly style="background: var(--bg-secondary);">
          </div>
          <div class="form-group">
            <label class="form-label">Batch Name / Domain Scope <span style="color: var(--danger-color);">*</span></label>
            <input type="text" id="modal-batch-name" class="form-control" placeholder="e.g., Security & Compliance Runbooks" required>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            <div class="form-group">
              <label class="form-label">Target Pages</label>
              <input type="number" id="modal-batch-pages" class="form-control" value="650" min="50" step="50">
            </div>
            <div class="form-group">
              <label class="form-label">Execution Team</label>
              <input type="text" id="modal-batch-team" class="form-control" value="Team 2 + TW">
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Initial Validation Status</label>
            <select id="modal-batch-status" class="form-control">
              <option value="Queued">Queued (Sprint Pipeline)</option>
              <option value="Validation Pending">Validation Pending</option>
              <option value="Certified">Certified</option>
            </select>
          </div>
        `;

        openModal({
          title: '📦 Create New Migration Batch',
          bodyHtml: formHtml,
          confirmText: 'Create Batch',
          onConfirm: (modalBody) => {
            const nameInput = modalBody.querySelector('#modal-batch-name');
            const name = nameInput.value.trim();
            if (!name) {
              alert('Please enter a batch name.');
              nameInput.focus();
              return false;
            }

            const pages = parseInt(modalBody.querySelector('#modal-batch-pages').value, 10) || 500;
            const team = modalBody.querySelector('#modal-batch-team').value.trim() || 'Engineering Team + TW';
            const status = modalBody.querySelector('#modal-batch-status').value;

            let progress = 0;
            let linkIntegrity = 'Pending Pre-Migration Scan';
            if (status === 'Validation Pending') {
              progress = 45;
              linkIntegrity = 'Testing in Progress';
            } else if (status === 'Certified') {
              progress = 100;
              linkIntegrity = '100% Valid (0 Broken)';
            }

            const newBatch = {
              id: newBatchId,
              name: name,
              pages: pages,
              team: team,
              status: status,
              linkIntegrity: linkIntegrity,
              progress: progress
            };

            const freshStore = getStore();
            freshStore.batches.push(newBatch);
            saveStore(freshStore);

            renderBatches();
            updateMetrics();
            showToast(`New migration batch [${newBatchId}] created!`, 'success');
            return true;
          }
        });
      };
    }

    renderBatches();
    updateMetrics();
  }

  // 6.4 OWNERSHIP MANAGEMENT CONTROLLER (ownership.html)
  function initOwnershipController() {
    const tableBody = document.getElementById('ownership-table-body');
    if (!tableBody) return;

    const searchInput = document.getElementById('ownership-search');
    const statusFilter = document.getElementById('ownership-status-filter');
    const teamFilter = document.getElementById('ownership-team-filter');
    const resetBtn = document.getElementById('btn-reset-own-filters');
    const bulkReassignBtn = document.getElementById('btn-bulk-reassign');
    const addCustodyBtn = document.getElementById('btn-add-custody');
    const counterEl = document.getElementById('ownership-counter');

    // Metrics
    const migratedCountEl = document.getElementById('own-migrated-count');
    const assignedCountEl = document.getElementById('own-assigned-count');
    const orphanCountEl = document.getElementById('own-orphan-count');
    const coverageSubEl = document.getElementById('own-coverage-sub');

    function updateMetrics() {
      const store = getStore();
      const total = store.ownership.length;
      const orphans = store.ownership.filter(o => o.status.includes('Orphan') || !o.assignedOwner || o.assignedOwner === 'Unassigned').length;
      const assigned = total - orphans;
      const coverage = total > 0 ? ((assigned / total) * 100).toFixed(1) : 100;

      if (assignedCountEl) assignedCountEl.textContent = assigned.toLocaleString();
      if (orphanCountEl) orphanCountEl.textContent = orphans.toLocaleString();
      if (coverageSubEl) coverageSubEl.textContent = `${coverage}% Custody Coverage`;
    }

    function renderOwnership() {
      const store = getStore();
      const query = (searchInput ? searchInput.value : '').toLowerCase().trim();
      const status = statusFilter ? statusFilter.value : 'All';
      const team = teamFilter ? teamFilter.value : 'All';

      const filtered = store.ownership.filter(o => {
        const matchesQuery = !query ||
          o.title.toLowerCase().includes(query) ||
          o.assignedOwner.toLowerCase().includes(query) ||
          o.legacyOwner.toLowerCase().includes(query);

        const matchesStatus = (status === 'All') || o.status === status;
        const matchesTeam = (team === 'All') || o.team === team;

        return matchesQuery && matchesStatus && matchesTeam;
      });

      if (counterEl) {
        counterEl.innerHTML = `Showing <strong>${filtered.length} of ${store.ownership.length} Records</strong>`;
      }

      if (filtered.length === 0) {
        tableBody.innerHTML = `
          <tr>
            <td colspan="7">
              <div class="empty-state">
                <span class="empty-state-icon">👥</span>
                <h4>No Matching Ownership Records</h4>
                <p>Try clearing your search query or reset filters.</p>
              </div>
            </td>
          </tr>
        `;
        return;
      }

      tableBody.innerHTML = filtered.map(o => {
        let badgeClass = 'badge badge-green';
        if (o.status === 'Review Due Soon') badgeClass = 'badge badge-amber';
        else if (o.status.includes('Orphan')) badgeClass = 'badge badge-red';

        const isOrphan = o.assignedOwner === 'Unassigned' || o.status.includes('Orphan');
        const ownerDisplay = isOrphan ? `<span style="color: var(--danger-color); font-weight: 700;">Unassigned</span>` : `<strong>${o.assignedOwner}</strong>`;
        const actionLabel = isOrphan ? 'Assign Now' : 'Edit Owner';
        const actionBtnClass = isOrphan ? 'btn-danger' : 'btn-primary';

        return `
          <tr>
            <td><strong>${o.title}</strong></td>
            <td>${o.team}</td>
            <td><span style="color: var(--text-muted);">${o.legacyOwner}</span></td>
            <td>${ownerDisplay}</td>
            <td>${o.nextReview}</td>
            <td><span class="${badgeClass}">${o.status}</span></td>
            <td style="text-align: center;">
              <button class="btn btn-sm ${actionBtnClass} edit-owner-btn" data-title="${encodeURIComponent(o.title)}">${actionLabel}</button>
            </td>
          </tr>
        `;
      }).join('');

      // Attach edit owner handlers
      tableBody.querySelectorAll('.edit-owner-btn').forEach(btn => {
        btn.onclick = () => {
          const rawTitle = decodeURIComponent(btn.dataset.title);
          openEditOwnerModal(rawTitle);
        };
      });
    }

    function openEditOwnerModal(pageTitle) {
      const store = getStore();
      const record = store.ownership.find(o => o.title === pageTitle);
      if (!record) return;

      const owners = [
        'Alex Rivera (Tech Lead - Payments)',
        'Marcus Chen (Senior Backend Engineer)',
        'Priya Patel (Staff Architect)',
        'Sarah Jenkins (Lead Mobile Engineer)',
        'David Kim (DevOps Lead)',
        'Technical Writer Custodian'
      ];

      const formHtml = `
        <div class="form-group">
          <label class="form-label">Wiki Page</label>
          <input type="text" class="form-control" value="${record.title}" readonly style="background: var(--bg-secondary);">
        </div>
        <div class="form-group">
          <label class="form-label">Engineering Team</label>
          <input type="text" class="form-control" value="${record.team}" readonly style="background: var(--bg-secondary);">
        </div>
        <div class="form-group">
          <label class="form-label">Current Assigned Owner</label>
          <select id="modal-own-assigned" class="form-control">
            ${owners.map(name => `<option value="${name}" ${record.assignedOwner === name ? 'selected' : ''}>${name}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Next Periodic Review Date (90-Day Schedule)</label>
          <input type="text" id="modal-own-date" class="form-control" value="2026-12-15 (in 74 days)">
        </div>
        <div class="form-group">
          <label class="form-label">Ownership Status</label>
          <select id="modal-own-status" class="form-control">
            <option value="Active Custody" ${record.status === 'Active Custody' ? 'selected' : ''}>Active Custody</option>
            <option value="Review Due Soon" ${record.status === 'Review Due Soon' ? 'selected' : ''}>Review Due Soon</option>
            <option value="Orphan Alert (R4)" ${record.status.includes('Orphan') ? 'selected' : ''}>Orphan Alert (R4)</option>
          </select>
        </div>
      `;

      openModal({
        title: `👤 Assign Content Custodian for "${record.title}"`,
        bodyHtml: formHtml,
        confirmText: 'Save Assignment',
        onConfirm: (modalBody) => {
          const newOwner = modalBody.querySelector('#modal-own-assigned').value;
          const nextDate = modalBody.querySelector('#modal-own-date').value.trim() || '2026-12-15 (in 74 days)';
          const newStatus = modalBody.querySelector('#modal-own-status').value;

          record.assignedOwner = newOwner;
          record.nextReview = nextDate;
          record.status = newStatus === 'Orphan Alert (R4)' ? 'Active Custody' : newStatus;

          saveStore(store);
          renderOwnership();
          updateMetrics();
          showToast(`Owner updated: ${record.title} assigned to ${newOwner}!`, 'success');
          return true;
        }
      });
    }

    if (searchInput) searchInput.addEventListener('input', renderOwnership);
    if (statusFilter) statusFilter.addEventListener('change', renderOwnership);
    if (teamFilter) teamFilter.addEventListener('change', renderOwnership);

    if (resetBtn) {
      resetBtn.onclick = () => {
        if (searchInput) searchInput.value = '';
        if (statusFilter) statusFilter.value = 'All';
        if (teamFilter) teamFilter.value = 'All';
        renderOwnership();
        showToast('Filters cleared', 'info');
      };
    }

    // Bulk Reassign Orphans
    if (bulkReassignBtn) {
      bulkReassignBtn.onclick = () => {
        const store = getStore();
        const orphans = store.ownership.filter(o => o.status.includes('Orphan') || !o.assignedOwner || o.assignedOwner === 'Unassigned');

        if (orphans.length === 0) {
          showToast('Zero unassigned orphans found! All pages have designated owners.', 'info');
          return;
        }

        if (confirm(`Reassign all ${orphans.length} orphan pages to "Technical Writer Custodian" to clear Orphan Alert (R4)?`)) {
          orphans.forEach(o => {
            o.assignedOwner = 'Technical Writer Custodian';
            o.status = 'Active Custody';
            o.nextReview = '2026-12-30 (in 89 days)';
          });

          saveStore(store);
          renderOwnership();
          updateMetrics();
          showToast(`Successfully assigned all orphans to Technical Writer!`, 'success');
        }
      };
    }

    // Add Custody Record
    if (addCustodyBtn) {
      addCustodyBtn.onclick = () => {
        const formHtml = `
          <div class="form-group">
            <label class="form-label">Wiki Page Title <span style="color: var(--danger-color);">*</span></label>
            <input type="text" id="modal-custody-title" class="form-control" placeholder="e.g., GraphQL Schema Federation Guide" required>
          </div>
          <div class="form-group">
            <label class="form-label">Engineering Team</label>
            <select id="modal-custody-team" class="form-control">
              <option value="Team 1 - Payments Core">Team 1 - Payments Core</option>
              <option value="Team 2 - Auth & Identity">Team 2 - Auth & Identity</option>
              <option value="Team 3 - Data Platform">Team 3 - Data Platform</option>
              <option value="Team 4 - Search Platform">Team 4 - Search Platform</option>
              <option value="Team 5 - Mobile Apps">Team 5 - Mobile Apps</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Assigned Custodian (Named Owner)</label>
            <input type="text" id="modal-custody-owner" class="form-control" value="Priya Patel (Staff Architect)">
          </div>
          <div class="form-group">
            <label class="form-label">Next Revalidation Date</label>
            <input type="text" id="modal-custody-date" class="form-control" value="2026-12-15 (in 74 days)">
          </div>
        `;

        openModal({
          title: '➕ Register Content Ownership Record',
          bodyHtml: formHtml,
          confirmText: 'Register Record',
          onConfirm: (modalBody) => {
            const titleInput = modalBody.querySelector('#modal-custody-title');
            const title = titleInput.value.trim();
            if (!title) {
              alert('Please enter a wiki page title.');
              titleInput.focus();
              return false;
            }

            const team = modalBody.querySelector('#modal-custody-team').value;
            const owner = modalBody.querySelector('#modal-custody-owner').value.trim() || 'Technical Writer Custodian';
            const date = modalBody.querySelector('#modal-custody-date').value.trim() || '2026-12-15';

            const freshStore = getStore();
            freshStore.ownership.unshift({
              title: title,
              team: team,
              legacyOwner: 'Newly Created',
              assignedOwner: owner,
              nextReview: date,
              status: 'Active Custody'
            });

            saveStore(freshStore);
            renderOwnership();
            updateMetrics();
            showToast(`Ownership registered for "${title}"!`, 'success');
            return true;
          }
        });
      };
    }

    renderOwnership();
    updateMetrics();
  }

  // 6.5 RISKS & SCHEDULE SIMULATOR CONTROLLER (risks.html)
  function initRisksController() {
    const tableBody = document.getElementById('risks-table-body');
    if (!tableBody) return;

    const searchInput = document.getElementById('risk-search');
    const severityFilter = document.getElementById('risk-severity-filter');
    const resetBtn = document.getElementById('btn-reset-risk-filters');
    const addRiskBtn = document.getElementById('btn-add-risk');

    // Simulator elements
    const slider = document.getElementById('capacity-slider');
    const capDisplay = document.getElementById('capacity-display');
    const tableCap = document.getElementById('sim-table-capacity');
    const tableDuration = document.getElementById('sim-table-duration');
    const tableGap = document.getElementById('sim-table-gap');
    const overrunRow = document.getElementById('sim-overrun-row');
    const scheduleBadge = document.getElementById('schedule-badge');
    const capResetBtn = document.getElementById('btn-cap-reset');
    const capBoostBtn = document.getElementById('btn-cap-boost');

    function renderRisks() {
      const store = getStore();
      const query = (searchInput ? searchInput.value : '').toLowerCase().trim();
      const severity = severityFilter ? severityFilter.value : 'All';

      // Sort by exposure descending
      store.risks.sort((a, b) => (b.p * b.i) - (a.p * a.i));

      const filtered = store.risks.filter(r => {
        const exposure = r.p * r.i;
        const matchesQuery = !query || r.title.toLowerCase().includes(query) || r.id.toLowerCase().includes(query) || r.owner.toLowerCase().includes(query);
        let matchesSev = true;
        if (severity === 'High') matchesSev = exposure >= 3.0;
        else if (severity === 'Medium') matchesSev = exposure >= 1.0 && exposure < 3.0;
        else if (severity === 'Low') matchesSev = exposure < 1.0;
        return matchesQuery && matchesSev;
      });

      if (filtered.length === 0) {
        tableBody.innerHTML = `
          <tr>
            <td colspan="9">
              <div class="empty-state">
                <span class="empty-state-icon">⚠️</span>
                <h4>No Risks Match Criteria</h4>
                <p>Try clearing your search query or reset filters.</p>
              </div>
            </td>
          </tr>
        `;
        return;
      }

      tableBody.innerHTML = filtered.map((r, index) => {
        const exposure = (r.p * r.i).toFixed(1);
        let rowStyle = '';
        let rankColor = 'var(--text-main)';
        let expColor = 'var(--text-main)';

        if (exposure >= 3.5) {
          rowStyle = 'background: #fff5f5;';
          rankColor = 'var(--danger-color)';
          expColor = 'var(--danger-color)';
        } else if (exposure >= 2.0) {
          rowStyle = 'background: #fffdf5;';
          rankColor = 'var(--warning-color)';
          expColor = 'var(--warning-color)';
        }

        return `
          <tr style="${rowStyle}" data-id="${r.id}">
            <td><strong style="color: ${rankColor}; font-size: 15px;">${index + 1}</strong></td>
            <td><code>${r.id}</code></td>
            <td><strong>${r.title}</strong></td>
            <td>
              <div style="display: flex; align-items: center; gap: 6px;">
                <input type="number" class="form-control prob-input" data-id="${r.id}" value="${r.p}" min="0.1" max="1.0" step="0.1" style="width: 70px; padding: 4px 6px; font-weight: 700;">
              </div>
            </td>
            <td>
              <div style="display: flex; align-items: center; gap: 6px;">
                <input type="number" class="form-control impact-input" data-id="${r.id}" value="${r.i}" min="1" max="10" step="1" style="width: 60px; padding: 4px 6px; font-weight: 700;">
              </div>
            </td>
            <td><strong style="color: ${expColor}; font-size: 16px;">${exposure}</strong></td>
            <td>${r.owner}</td>
            <td style="font-size: 12px; max-width: 280px;">${r.strategy}</td>
            <td style="text-align: center;">
              <button class="btn btn-secondary btn-sm edit-strategy-btn" data-id="${r.id}">Edit</button>
            </td>
          </tr>
        `;
      }).join('');

      // Input changes for P and I
      tableBody.querySelectorAll('.prob-input, .impact-input').forEach(input => {
        input.onchange = () => {
          const riskId = input.dataset.id;
          const currentStore = getStore();
          const risk = currentStore.risks.find(r => r.id === riskId);
          if (!risk) return;

          const row = input.closest('tr');
          const probVal = parseFloat(row.querySelector('.prob-input').value) || 0.1;
          const impactVal = parseInt(row.querySelector('.impact-input').value, 10) || 1;

          risk.p = Math.max(0.1, Math.min(1.0, probVal));
          risk.i = Math.max(1, Math.min(10, impactVal));

          saveStore(currentStore);
          renderRisks();
          showToast(`Risk ${riskId} exposure updated: E = ${(risk.p * risk.i).toFixed(1)}!`, 'info');
        };
      });

      // Edit Strategy Modal
      tableBody.querySelectorAll('.edit-strategy-btn').forEach(btn => {
        btn.onclick = () => {
          const riskId = btn.dataset.id;
          const currentStore = getStore();
          const risk = currentStore.risks.find(r => r.id === riskId);
          if (!risk) return;

          const formHtml = `
            <div class="form-group">
              <label class="form-label">Risk Description</label>
              <input type="text" id="modal-risk-title" class="form-control" value="${risk.title}">
            </div>
            <div class="form-group">
              <label class="form-label">Risk Owner</label>
              <input type="text" id="modal-risk-owner" class="form-control" value="${risk.owner}">
            </div>
            <div class="form-group">
              <label class="form-label">Primary Mitigation Strategy</label>
              <textarea id="modal-risk-strategy" class="form-control" rows="3">${risk.strategy}</textarea>
            </div>
          `;

          openModal({
            title: `🛡️ Update Risk [${riskId}] Parameters`,
            bodyHtml: formHtml,
            confirmText: 'Save Strategy',
            onConfirm: (modalBody) => {
              risk.title = modalBody.querySelector('#modal-risk-title').value.trim();
              risk.owner = modalBody.querySelector('#modal-risk-owner').value.trim();
              risk.strategy = modalBody.querySelector('#modal-risk-strategy').value.trim();

              saveStore(currentStore);
              renderRisks();
              showToast(`Mitigation strategy updated for ${riskId}!`, 'success');
              return true;
            }
          });
        };
      });
    }

    function updateSimulation(capacity) {
      const totalEffort = 630; // 350 triage + 280 migration
      const licenceWindow = 39.0;
      const duration = (totalEffort / capacity).toFixed(1);
      const gap = (duration - licenceWindow).toFixed(1);

      if (capDisplay) capDisplay.textContent = capacity.toFixed(1);
      if (tableCap) tableCap.textContent = `${capacity.toFixed(1)} person-days / week`;
      if (tableDuration) tableDuration.textContent = `${duration} weeks`;

      if (gap > 0) {
        if (tableGap) tableGap.innerHTML = `<span style="color: var(--danger-color);">+${gap} weeks schedule deficit (Overrun)</span>`;
        if (overrunRow) {
          overrunRow.style.background = '#fef2f2';
          overrunRow.style.color = '#991b1b';
        }
        if (scheduleBadge) {
          scheduleBadge.className = 'badge badge-amber';
          scheduleBadge.textContent = `Deficit: +${gap} Wks Overrun`;
        }
      } else {
        const buffer = Math.abs(gap).toFixed(1);
        if (tableGap) tableGap.innerHTML = `<span style="color: var(--success-color);">On Schedule! (${buffer} weeks safety buffer)</span>`;
        if (overrunRow) {
          overrunRow.style.background = '#f0fdf4';
          overrunRow.style.color = '#166534';
        }
        if (scheduleBadge) {
          scheduleBadge.className = 'badge badge-green';
          scheduleBadge.textContent = `On Schedule (${duration} Wks)`;
        }
      }
    }

    if (slider) {
      slider.oninput = () => {
        const cap = parseFloat(slider.value);
        updateSimulation(cap);
      };
    }

    if (capResetBtn) {
      capResetBtn.onclick = () => {
        if (slider) slider.value = 15;
        updateSimulation(15);
        showToast('Reset to case study baseline capacity (15 p-d/week)', 'info');
      };
    }

    if (capBoostBtn) {
      capBoostBtn.onclick = () => {
        if (slider) slider.value = 17;
        updateSimulation(17);
        showToast('Capacity increased to 17 p-d/week: Project duration shortened to 37.1 weeks (Overrun resolved)!', 'success');
      };
    }

    if (searchInput) searchInput.addEventListener('input', renderRisks);
    if (severityFilter) severityFilter.addEventListener('change', renderRisks);

    if (resetBtn) {
      resetBtn.onclick = () => {
        if (searchInput) searchInput.value = '';
        if (severityFilter) severityFilter.value = 'All';
        renderRisks();
        showToast('Filters cleared', 'info');
      };
    }

    if (addRiskBtn) {
      addRiskBtn.onclick = () => {
        const store = getStore();
        const nextId = `R${store.risks.length + 1}`;

        const formHtml = `
          <div class="form-group">
            <label class="form-label">Risk ID</label>
            <input type="text" class="form-control" value="${nextId}" readonly style="background: var(--bg-secondary);">
          </div>
          <div class="form-group">
            <label class="form-label">Risk Description <span style="color: var(--danger-color);">*</span></label>
            <input type="text" id="modal-risk-new-title" class="form-control" placeholder="e.g., Legacy wiki macro compatibility failure" required>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            <div class="form-group">
              <label class="form-label">Probability (0.1 - 1.0)</label>
              <input type="number" id="modal-risk-new-p" class="form-control" value="0.5" min="0.1" max="1.0" step="0.1">
            </div>
            <div class="form-group">
              <label class="form-label">Impact (1 - 10)</label>
              <input type="number" id="modal-risk-new-i" class="form-control" value="5" min="1" max="10" step="1">
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Risk Owner</label>
            <input type="text" id="modal-risk-new-owner" class="form-control" value="Technical Writer & QA Lead">
          </div>
          <div class="form-group">
            <label class="form-label">Mitigation & Contingency Strategy</label>
            <textarea id="modal-risk-new-strategy" class="form-control" rows="2" placeholder="Actionable contingency steps..."></textarea>
          </div>
        `;

        openModal({
          title: '➕ Register Custom Project Risk',
          bodyHtml: formHtml,
          confirmText: 'Add Risk',
          onConfirm: (modalBody) => {
            const titleInput = modalBody.querySelector('#modal-risk-new-title');
            const title = titleInput.value.trim();
            if (!title) {
              alert('Please enter a risk description.');
              titleInput.focus();
              return false;
            }

            const p = parseFloat(modalBody.querySelector('#modal-risk-new-p').value) || 0.4;
            const i = parseInt(modalBody.querySelector('#modal-risk-new-i').value, 10) || 5;
            const owner = modalBody.querySelector('#modal-risk-new-owner').value.trim() || 'Project Manager';
            const strategy = modalBody.querySelector('#modal-risk-new-strategy').value.trim() || 'Automated pre-flight checks and audit validations.';

            const freshStore = getStore();
            freshStore.risks.push({
              id: nextId,
              title: title,
              p: p,
              i: i,
              owner: owner,
              strategy: strategy
            });

            saveStore(freshStore);
            renderRisks();
            showToast(`Risk [${nextId}] added with exposure E = ${(p * i).toFixed(1)}!`, 'success');
            return true;
          }
        });
      };
    }

    renderRisks();
    updateSimulation(15.0);
  }

  // 6.6 DASHBOARD CONTROLLER (dashboard.html)
  function initDashboardController() {
    const dashTriagedEl = document.getElementById('dash-triaged-pages');
    if (!dashTriagedEl) return;

    const store = getStore();

    // Calculate dynamic values
    const baselineTriaged = 5600;
    const triagedInDemo = store.pages.filter(p => p.status !== 'Pending').length;
    const totalTriaged = baselineTriaged + (triagedInDemo * 15); // scaled for presentation
    const totalInventory = 14000;
    const targetKept = 7000;

    // Migrated pages from batches
    let totalMigrated = 0;
    store.batches.forEach(b => {
      if (b.status === 'Certified') totalMigrated += b.pages;
    });

    const triageProgress = Math.min(100, ((totalTriaged / totalInventory) * 100)).toFixed(1);
    const migrationProgress = Math.min(100, ((totalMigrated / targetKept) * 100)).toFixed(1);

    const triagedDisplayEl = document.getElementById('dash-triaged-pages');
    const triageBarEl = document.getElementById('dash-triage-progress-bar');
    const triageTextEl = document.getElementById('dash-triage-progress-text');
    const triageLabelEl = document.getElementById('dash-triage-label');

    const migrationBarEl = document.getElementById('dash-migration-progress-bar');
    const migrationTextEl = document.getElementById('dash-migration-progress-text');
    const migrationLabelEl = document.getElementById('dash-migration-label');

    if (triagedDisplayEl) triagedDisplayEl.textContent = totalTriaged.toLocaleString();
    if (triageBarEl) triageBarEl.style.width = `${triageProgress}%`;
    if (triageTextEl) triageTextEl.textContent = `${triageProgress}%`;
    if (triageLabelEl) triageLabelEl.textContent = `Overall Triage Progress (${totalTriaged.toLocaleString()} / 14,000)`;

    if (migrationBarEl) migrationBarEl.style.width = `${migrationProgress}%`;
    if (migrationTextEl) migrationTextEl.textContent = `${migrationProgress}%`;
    if (migrationLabelEl) migrationLabelEl.textContent = `Kept Page Migration Progress (${totalMigrated.toLocaleString()} / 7,000)`;
  }

  // --- 7. DOM CONTENT LOADED ENTRY POINT ---
  document.addEventListener('DOMContentLoaded', () => {
    setupSidebar();

    // Initialize page-specific controllers
    initTriageController();
    initReviewController();
    initMigrationController();
    initOwnershipController();
    initRisksController();
    initDashboardController();
  });

})();
