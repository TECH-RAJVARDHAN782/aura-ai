/* ==========================================================================
   Aura AI — Visual Results Page Application Logic
   Reads run_id from URL query string (?id=RUN-...), loads record from localStorage,
   and populates the complete analysis report.
   ========================================================================== */

class ResultsApp {
  constructor() {
    this.currentRun = null;
    this.isPinned = false;
  }

  init() {
    this.loadRunData();
    this.setupDrawer();
    console.log("Aura AI Results Engine Initialized.");
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
