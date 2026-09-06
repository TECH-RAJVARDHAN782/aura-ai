/* ==========================================================================
   Aura AI — Visual Results Page Application Logic
   Reads run_id from URL query string (?id=RUN-...), loads record from localStorage,
   and populates the complete analysis report.
   ========================================================================== */

class ResultsApp {
  constructor() {
    this.currentRun = null;
    this.isPinned = false;
    this.notifications = [
      {
        id: 1,
        title: "Critical Alarm: Pump 102 Bearing Failure",
        sub: "Vibration threshold exceeded (8.42 mm/s). Diagnostic report generated.",
        time: "10 mins ago",
        type: "critical",
        unread: true,
        runId: "RUN-20260906-881"
      },
      {
        id: 2,
        title: "SOP Draft Saved",
        sub: "Mechanical Seal Emergency Flushing SOP-MRPL-P102 updated to Rev 4.2.",
        time: "45 mins ago",
        type: "info",
        unread: true
      },
      {
        id: 3,
        title: "SCADA Telemetry Drift Resolved",
        sub: "Boiler B-3 pressure transmitter re-calibrated successfully.",
        time: "2 hours ago",
        type: "success",
        unread: true
      }
    ];
  }

  init() {
    this.loadRunData();
    this.setupDrawer();
    this.renderNotifications();

    window.addEventListener('click', (e) => {
      const notifWrap = document.querySelector('.notif-wrapper');
      if (notifWrap && !notifWrap.contains(e.target)) {
        this.closeNotifDropdown();
      }
    });

    console.log("Aura AI Results Engine Initialized.");
  }

  toggleNotifDropdown(e) {
    if (e) e.stopPropagation();
    const dropdown = document.getElementById('notifDropdownMenu');
    if (!dropdown) return;
    const isShown = dropdown.classList.contains('show');
    if (isShown) {
      dropdown.classList.remove('show');
    } else {
      this.renderNotifications();
      dropdown.classList.add('show');
    }
  }

  closeNotifDropdown() {
    const dropdown = document.getElementById('notifDropdownMenu');
    if (dropdown) dropdown.classList.remove('show');
  }

  markAllNotifsRead(e) {
    if (e) e.stopPropagation();
    this.notifications.forEach(n => n.unread = false);
    this.renderNotifications();
    this.showToast("All notifications marked as read", "success");
  }

  renderNotifications() {
    const container = document.getElementById('notifListContainer');
    const badgeNum = document.getElementById('notifBadgeNum');
    const unreadPill = document.getElementById('notifUnreadPill');
    if (!container) return;

    const unreadCount = this.notifications.filter(n => n.unread).length;
    if (badgeNum) {
      if (unreadCount > 0) {
        badgeNum.innerText = unreadCount;
        badgeNum.style.display = 'flex';
      } else {
        badgeNum.style.display = 'none';
      }
    }
    if (unreadPill) {
      unreadPill.innerText = unreadCount > 0 ? `${unreadCount} New` : `0 Unread`;
    }

    if (this.notifications.length === 0) {
      container.innerHTML = `<div style="padding: 20px; text-align: center; color: var(--text-secondary); font-size: 12px;">No notifications</div>`;
      return;
    }

    const iconMap = {
      critical: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>`,
      warning: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>`,
      info: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M11 15h2v2h-2zm0-8h2v6h-2zm1-5C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>`,
      success: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>`
    };

    container.innerHTML = this.notifications.map(n => `
      <div class="notif-item ${n.unread ? 'unread' : ''}" onclick="resultsApp.handleNotifItemClick(${n.id})">
        <div class="notif-icon-box ${n.type}">
          ${iconMap[n.type] || iconMap.info}
        </div>
        <div class="notif-body">
          <span class="notif-title">${n.title}</span>
          <span class="notif-sub">${n.sub}</span>
          <span class="notif-time">${n.time}</span>
        </div>
      </div>
    `).join('');
  }

  handleNotifItemClick(id) {
    const notif = this.notifications.find(n => n.id === id);
    if (notif) {
      notif.unread = false;
      this.renderNotifications();
      if (notif.runId) {
        this.closeNotifDropdown();
        window.location.href = `results.html?id=${notif.runId}`;
      }
    }
  }

  showToast(msg, type = 'info') {
    let toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'toastContainer';
      toastContainer.className = 'toast-container';
      document.body.appendChild(toastContainer);
    }
    const toast = document.createElement('div');
    toast.className = `toast-item toast-${type}`;
    toast.innerText = msg;
    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  loadRunData() {
    const urlParams = new URLSearchParams(window.location.search);
    const runId = urlParams.get('id') || 'RUN-20260906-882';

    let history = [];
    try {
      const stored = localStorage.getItem('aura_workflow_history');
      if (stored) {
        history = JSON.parse(stored);
      }
    } catch(e) {
      console.warn("Could not read workflow history from localStorage", e);
    }

    // Match runId or fallback to first history item or mock default
    let matchedRun = history.find(r => r.id === runId);

    if (!matchedRun && history.length > 0) {
      matchedRun = history[0];
    }

    if (!matchedRun) {
      matchedRun = {
        id: runId,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        query: "What is causing repeated failure on Pump 102?",
        assetTag: "DOC-P102 (Centrifugal Pump 102)",
        title: "Root Cause Analysis: Centrifugal Pump 102 Mechanical Seal Fail",
        priority: "critical",
        priorityLabel: "Critical Alarm",
        status: "COMPLETED",
        thinking: `[Aura AI DeepSeek Reasoning Engine]
1. Target asset: Centrifugal Pump 102 (Tag: DOC-P102).
2. Correlate vector embeddings: Matched DOC-P102-MAINT-2026.pdf & LOG-CDU-QUARTERLY-2026.csv (Cosine 0.942).
3. Telemetry anomaly: 142 Hz harmonic spike with peak vibration at 8.42 mm/s (ISO 10816 safe limit: 4.50 mm/s).
4. Vision model (Qwen-VL) thermal scan: Thermal hotspot detected on primary drive bearing (94.8 deg C).
5. Conclusion: NPSHa drop causing impeller cavitation and axial shaft friction wear.`,
        summary: "Pump 102 has suffered 3 unscheduled trips over 90 days. Multi-agent diagnostic reasoning identifies Mechanical Seal Thermal Failure & Severe Bearing Friction (Peak 94.8 deg C) triggered by Suction Line Cavitation.",
        rootCause: "Vibration telemetry reveals a high-frequency harmonic at 142 Hz (Peak 8.42 mm/s) matching suction recirculation. The axial shaft deflection generated friction heat up to 94.8 deg C, vaporizing graphite seal faces.",
        evidence: [
          { doc: "DOC-P102-MAINT-2026.pdf (Page 4)", text: "'Vibration harmonic at 142Hz indicates NPSHa dropping below NPSHr during high thermal load.'" },
          { doc: "LOG-CDU-QUARTERLY-2026.csv", text: "'Pump 102 bearing thermal trip logged at 94.8 deg C on Aug 28, 2026.'" }
        ],
        actions: [
          "Inspect suction strainer for 45% partial blockage causing NPSHa drop.",
          "Replace mechanical seal cartridge with SiC-on-SiC thermal face replacement.",
          "Recalibrate baseline vibration sensor tags in SCADA system."
        ],
        telemetry: { peakVib: "8.42 mm/s", peakTemp: "94.8 °C" }
      };
    }

    this.currentRun = matchedRun;
    this.renderRunToDOM(matchedRun);
  }

  renderRunToDOM(run) {
    const runIdBreadcrumb = document.getElementById('runIdBreadcrumb');
    const resRunIdTag = document.getElementById('resRunIdTag');
    const resTitle = document.getElementById('resTitle');
    const resPriorityBadge = document.getElementById('resPriorityBadge');
    const resStatusBadge = document.getElementById('resStatusBadge');
    const resQueryTxt = document.getElementById('resQueryTxt');
    const resAssetTag = document.getElementById('resAssetTag');
    const resTimestamp = document.getElementById('resTimestamp');
    const resTelemetryPeak = document.getElementById('resTelemetryPeak');
    const resCoTText = document.getElementById('resCoTText');
    const resSummaryTxt = document.getElementById('resSummaryTxt');
    const resRootCauseTxt = document.getElementById('resRootCauseTxt');
    const resEvidenceGrid = document.getElementById('resEvidenceGrid');
    const resActionsList = document.getElementById('resActionsList');

    if (runIdBreadcrumb) runIdBreadcrumb.innerText = run.id;
    if (resRunIdTag) resRunIdTag.innerText = run.id;
    if (resTitle) resTitle.innerText = run.title || run.query;
    if (resQueryTxt) resQueryTxt.innerText = run.query;
    if (resAssetTag) resAssetTag.innerText = run.assetTag || "DOC-P102";
    if (resTimestamp) resTimestamp.innerText = run.timestamp;

    if (resTelemetryPeak) {
      const vib = run.telemetry?.peakVib || "8.42 mm/s";
      const temp = run.telemetry?.peakTemp || "94.8 °C";
      resTelemetryPeak.innerText = `${vib} (${temp})`;
    }

    if (resPriorityBadge) {
      const prio = (run.priority || 'critical').toLowerCase();
      resPriorityBadge.className = `p-badge ${prio === 'critical' ? 'p-critical' : prio === 'warning' ? 'p-high' : 'p-normal'}`;
      resPriorityBadge.innerText = run.priorityLabel || (prio === 'critical' ? 'CRITICAL ALARM' : prio === 'warning' ? 'WARNING' : 'NORMAL');
    }

    if (resStatusBadge) {
      resStatusBadge.innerText = run.status || 'COMPLETED';
    }

    if (resCoTText) {
      resCoTText.innerText = run.thinking || run.reasoningOutput || "DeepSeek-R1 Chain-of-Thought logs verified.";
    }

    if (resSummaryTxt) resSummaryTxt.innerText = run.summary;
    if (resRootCauseTxt) resRootCauseTxt.innerText = run.rootCause;

    if (resEvidenceGrid && run.evidence) {
      resEvidenceGrid.innerHTML = run.evidence.map(ev => `
        <div class="ev-card">
          <span class="ev-doc">${ev.doc}</span>
          <span class="ev-txt">${ev.text}</span>
        </div>
      `).join('');
    }

    if (resActionsList && run.actions) {
      resActionsList.innerHTML = run.actions.map(act => `<li>${act}</li>`).join('');
    }
  }

  toggleCoT() {
    const content = document.getElementById('resCoTText');
    const arrow = document.getElementById('cotArrow');
    if (!content || !arrow) return;

    if (content.style.display === 'none') {
      content.style.display = 'block';
      arrow.innerText = '▲ [COLLAPSE]';
    } else {
      content.style.display = 'none';
      arrow.innerText = '▼ [EXPAND]';
    }
  }

  // Navigation & Drawer Handlers
  openDrawer() {
    const drawer = document.getElementById('sideDrawer');
    if (drawer) drawer.classList.add('open');
  }

  closeDrawer() {
    if (!this.isPinned) {
      const drawer = document.getElementById('sideDrawer');
      if (drawer) drawer.classList.remove('open');
    }
  }

  handleDrawerMouseLeave() {
    this.closeDrawer();
  }

  togglePin() {
    this.isPinned = !this.isPinned;
    const drawer = document.getElementById('sideDrawer');
    const pinBtn = document.getElementById('pinToggleBtn');
    if (this.isPinned) {
      drawer.classList.add('pinned', 'open');
      document.body.classList.add('drawer-pinned');
      pinBtn.classList.add('pinned');
    } else {
      drawer.classList.remove('pinned');
      document.body.classList.remove('drawer-pinned');
      pinBtn.classList.remove('pinned');
    }
  }

  setupDrawer() {
    // Sync top user profile if stored
    try {
      const auth = localStorage.getItem('aura_auth_session');
      if (auth) {
        const parsed = JSON.parse(auth);
        if (parsed && parsed.currentUser) {
          const name = parsed.currentUser.name || "Rajvardhan Shinde";
          const role = parsed.currentUser.role || "Engineer";
          const avatarEl = document.getElementById('topNavAvatar');
          const nameEl = document.getElementById('topNavUserName');
          const deptEl = document.getElementById('topNavUserDept');
          if (nameEl) nameEl.innerText = name;
          if (deptEl) deptEl.innerText = `${role} • Sovereign Session`;
          if (avatarEl) {
            const parts = name.trim().split(' ');
            avatarEl.innerText = parts.length >= 2 ? (parts[0][0] + parts[1][0]).toUpperCase() : 'RS';
          }
        }
      }
    } catch(e) {}
  }

  // Export handlers
  exportMarkdown() {
    if (!this.currentRun) return;
    const run = this.currentRun;
    const md = `# Aura AI — Sovereign Diagnostic Report (${run.id})
**Target Asset:** ${run.assetTag}
**Timestamp:** ${run.timestamp}
**Priority:** ${run.priorityLabel || run.priority}
**Query:** ${run.query}

---

## 1. Diagnostic Summary
${run.summary}

## 2. Root Cause Analysis
${run.rootCause}

## 3. Evidence References
${(run.evidence || []).map(e => `- **${e.doc}**: ${e.text}`).join('\n')}

## 4. Corrective Action Plan
${(run.actions || []).map((a, i) => `${i + 1}. ${a}`).join('\n')}
`;
    this.downloadFile(`Aura_AI_Report_${run.id}.md`, md, 'text/markdown');
  }

  exportJSON() {
    if (!this.currentRun) return;
    this.downloadFile(`Aura_AI_Audit_${this.currentRun.id}.json`, JSON.stringify(this.currentRun, null, 2), 'application/json');
  }

  downloadFile(filename, content, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

const resultsApp = new ResultsApp();
window.addEventListener('DOMContentLoaded', () => {
  resultsApp.init();
});
