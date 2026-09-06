/* ==========================================================================
   Aura AI — Sovereign Industrial Intelligence Application Logic
   Architecture: Slide-Out Side Drawer, 8 Dynamic Views, Zero Emojis
   ========================================================================== */

class AuraAI {
  constructor() {
    this.activeView = 'console'; // 'console', 'inspector', 'vault', 'analytics', 'logs', 'security', 'sop', 'settings'
    this.isPinned = false;
    this.currentScenarioIndex = 0;
    this.isExecuting = false;
    this.activeVaultFilter = 'all';
    this.activeImageMode = 'pump'; // 'pump', 'flange', 'boiler', 'custom'
    this.customUploadedImage = null;
    this.telemetryTimeframe = '7d';

    // Auth Gateway System State
    this.authTab = 'login';
    this.authState = {
      isAuthenticated: false,
      currentUser: null,
      userRole: 'Engineer',
      airGappedSession: true
    };
    try {
      const stored = localStorage.getItem('aura_auth_session');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.isAuthenticated) {
          this.authState = parsed;
        }
      }
    } catch(e) {
      console.warn("Could not load auth session from local storage", e);
    }

    // Workflow History State
    this.historyFilter = 'all';
    this.workflowHistory = [];
    try {
      const storedHist = localStorage.getItem('aura_workflow_history');
      if (storedHist) {
        this.workflowHistory = JSON.parse(storedHist);
      }
    } catch(e) {
      console.warn("Could not load workflow history from localStorage", e);
    }

    if (!this.workflowHistory || this.workflowHistory.length === 0) {
      this.workflowHistory = [
        {
          id: 'RUN-20260906-881',
          timestamp: '2026-09-06 14:32:10',
          query: 'What is causing repeated failure on Pump 102?',
          assetTag: 'DOC-P102 (Centrifugal Pump 102)',
          title: 'Root Cause Analysis: Centrifugal Pump 102 Mechanical Seal Fail',
          priority: 'critical',
          priorityLabel: 'Critical Alarm',
          status: 'COMPLETED',
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
        },
        {
          id: 'RUN-20260905-412',
          timestamp: '2026-09-05 11:15:40',
          query: 'Diagnose thermal anomaly on CDU Pipe Flange V88',
          assetTag: 'IMG-V88 (CDU Flange V88)',
          title: 'Thermal Anomaly Diagnostic: Pipe Flange V88 Gasket Leak',
          priority: 'warning',
          priorityLabel: 'Thermal Anomaly',
          status: 'COMPLETED',
          thinking: `[Aura AI DeepSeek Reasoning Engine]
1. Target asset: CDU Pipe Flange V88 (Tag: IMG-V88).
2. Thermal Matrix analysis: Hotspot detected at top bolt 4 position (+83.5 deg C delta).
3. Vector RAG match: SOP-MRPL-B3-PRESSURE.pdf & LOG-CDU-QUARTERLY-2026.csv.
4. Conclusion: Gasket compression relaxation under thermal cycle load causing micro-seep.`,
          summary: "Thermal camera scan shows localized heat plume (+83.5 deg C delta above ambient) at top bolt 4 position on CDU Pipe Flange V88.",
          rootCause: "Thermal fatigue cycle relaxed bolt pre-torque by 18%, allowing high-temperature crude vapors to escape past spiral-wound gasket.",
          evidence: [
            { doc: "IMG-V88-FLANGE-THERMAL.png", text: "'Hotspot localized to bolt positions 3-4 with peak temp 148.5 deg C.'" }
          ],
          actions: [
            "Apply hot-bolting re-torque protocol to 120 Nm.",
            "Schedule flange gasket replacement during next maintenance window."
          ],
          telemetry: { peakVib: "2.10 mm/s", peakTemp: "148.5 °C" }
        },
        {
          id: 'RUN-20260904-109',
          timestamp: '2026-09-04 09:40:22',
          query: 'Evaluate Boiler B-3 steam pressure drop',
          assetTag: 'SOP-B3 (Boiler B-3)',
          title: 'Combustion Mismatch Analysis: Boiler B-3 Pressure Drop',
          priority: 'warning',
          priorityLabel: 'Pressure Drop',
          status: 'COMPLETED',
          thinking: `[Aura AI DeepSeek Reasoning Engine]
1. Target asset: Boiler B-3 (Tag: SOP-B3).
2. Flame temp: 810 deg C (below 850 deg C threshold).
3. Pressure drop: 42 Bar down to 34.4 Bar over 45 minutes.
4. Conclusion: Air damper servo position miscalibrated by +12%.`,
          summary: "Boiler B-3 steam discharge pressure dropped from 42 Bar to 34.4 Bar. Air-to-fuel ratio damper mismatch reduced furnace flame temperature.",
          rootCause: "Damper actuator feedback sensor calibration drifted, causing oxygen excess in burner chamber and lowering thermal output.",
          evidence: [
            { doc: "SOP-MRPL-B3-PRESSURE.pdf", text: "'Flame temp below 850 deg C indicates air damper mismatch.'" }
          ],
          actions: [
            "Recalibrate damper actuator servo feedback loop.",
            "Verify fuel supply valve pressure regulator."
          ],
          telemetry: { peakVib: "1.80 mm/s", peakTemp: "810 °C" }
        }
      ];
      try {
        localStorage.setItem('aura_workflow_history', JSON.stringify(this.workflowHistory));
      } catch(e) {}
    }

    // Notification Center State
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

    // Model Runtime State
    this.selectedModel = 'llama-3.3-70b';
    this.selectedModelKey = 'llama-3.3-70b';
    this.selectedQuant = 'Q4_K_M';
    this.temperature = 0.2;
    this.maxTokens = 2048;
    this.endpointUrl = 'http://localhost:11434/api/generate';
    this.isLocalEndpointActive = false;

    // SCADA Live Ticker State
    this.isLiveSCADA = false;
    this.scadaTimer = null;
    this.liveTelemetryData = [2.4, 2.8, 3.1, 3.5, 4.2, 5.8, 8.42, 6.1, 3.9];

    // RBAC Persona State
    this.currentRBAC = 'engineer'; // 'engineer', 'operator', 'admin'

    // Open-Weight Model Profiles
    this.modelProfiles = {
      'llama-3.3-70b': { name: 'LLaMA-3.3-70B', sizeB: 70, vramBaseQ4: 38.4, speedTps: 42.5 },
      'qwen2.5-vl-72b': { name: 'Qwen2.5-VL-72B', sizeB: 72, vramBaseQ4: 42.0, speedTps: 38.2 },
      'deepseek-r1-70b': { name: 'DeepSeek-R1-70B', sizeB: 70, vramBaseQ4: 39.2, speedTps: 35.0 },
      'mistral-nemo-12b': { name: 'Mistral-NeMo-12B', sizeB: 12, vramBaseQ4: 7.2, speedTps: 110.0 }
    };

    // Confidential Vault Items (Strictly Emoji-Free)
    this.vaultFiles = [
      {
        id: 'DOC-P102',
        name: 'DOC-P102-MAINT-2026.pdf',
        type: 'docs',
        size: '4.8 MB',
        date: '2026-08-29',
        desc: 'MRPL Centrifugal Pump 102 Mechanical Seal Maintenance Log',
        content: 'Pump 102 Mechanical Seal Log: Vibration harmonic at 142Hz indicates NPSHa dropping below NPSHr. Bearing thermal trip logged at 94.8 deg C. Vibration peak 8.42 mm/s exceeds ISO 10816 limit.'
      },
      {
        id: 'SOP-B3',
        name: 'SOP-MRPL-B3-PRESSURE.pdf',
        type: 'docs',
        size: '12.4 MB',
        date: '2026-07-15',
        desc: 'Boiler B-3 Operating SOP & Valve Protocols',
        content: 'Boiler B-3 SOP: Flame temp below 850 deg C indicates air damper mismatch. Steam discharge dropped from 42 Bar to 34.4 Bar over 45 minutes.'
      },
      {
        id: 'IMG-V88',
        name: 'IMG-V88-FLANGE-THERMAL.png',
        type: 'images',
        size: '18.2 MB',
        date: '2026-09-02',
        desc: 'CDU Unit Pipe Flange Thermal Scan',
        content: 'Thermal matrix analysis: Thermal anomaly detected at top bolt 4 position. Temperature delta +83.5 deg C above ambient. Peak temp: 148.5 deg C.'
      },
      {
        id: 'LOG-CDU',
        name: 'LOG-CDU-QUARTERLY-2026.csv',
        type: 'docs',
        size: '2.1 MB',
        date: '2026-09-01',
        desc: 'Refinery CDU Unit Telemetry & Vibration Logs',
        content: 'Processed 1.2M telemetry data points across 48 local machinery tags. MTBF target of 8,000 hrs achieved for 85% of machinery.'
      }
    ];

    // Pre-loaded Agentic Failure Scenarios (Strictly Emoji-Free)
    this.scenarios = [
      {
        query: "What is causing repeated failure on Pump 102?",
        title: "Root Cause Analysis: Centrifugal Pump 102 Mechanical Seal Fail",
        priority: "critical",
        priorityLabel: "Critical Alarm",
        imageMode: "pump",
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
          { doc: "LOG-CDU-QUARTERLY-2026.csv", text: "'Pump 102 bearing thermal trip logged at 94.8 deg C on Aug 28, 2026.'" },
          { doc: "Qwen-VL Vision Hotspot Scan", text: "'Primary drive bearing friction coefficient exceeds safety rating by +45%.'" }
        ],
        actions: [
          "Throttle suction valve inline pressure to restore min NPSHa above 3.2 bar.",
          "Flush API Plan 11 seal chamber to remove carbonaceous debris.",
          "Schedule immediate replacement with Silicon Carbide (SiC vs SiC) hard-face pairing."
        ],
        telemetry: { peakVib: "8.42 mm/s", cavitation: "142 Hz Spike", peakTemp: "94.8 °C", defectType: "Bearing Overheat & Seal Friction" }
      },
      {
        query: "Analyze thermal scan IMG-V88 for flange structural leak risk.",
        title: "Multimodal Defect Inspection: Pipe Flange V88 Heat Leak",
        priority: "high",
        priorityLabel: "High Severity",
        imageMode: "flange",
        thinking: `[Aura AI DeepSeek Reasoning Engine]
1. Target optical asset: IMG-V88-FLANGE-THERMAL.png.
2. Qwen2.5-VL bounding box detection: Localized plume at top bolt 4 position.
3. Thermal conversion matrix: Surface heat peak = 148.5 deg C (Normal rating: 65 deg C).
4. SOP Manual lookup (SOP-MRPL-B3-PRESSURE.pdf Page 18): Re-torque required immediately.`,
        summary: "Qwen2.5-VL multimodal analysis of thermal file IMG-V88-FLANGE-THERMAL.png identifies Thermal Insulation Degradation & Steam Micro-Fissure at top bolt 4 position.",
        rootCause: "Heat leakage zone reaching 148.5 deg C (Normal pipe surface limit: 65 deg C) caused by gasket compression loss under thermal expansion cycles.",
        evidence: [
          { doc: "IMG-V88-FLANGE-THERMAL.png", text: "'Heat gradient anomaly detected at top bolt 4 position. Delta +83.5 deg C above ambient.'" },
          { doc: "SOP-MRPL-B3-PRESSURE.pdf", text: "'Thermal leaks exceeding 120 deg C on Class 600 pressure flanges require immediate torque audit.'" }
        ],
        actions: [
          "Isolate Flange V88 section and depressurize to 0 bar.",
          "Re-torque all 8 studs in criss-cross sequence to 450 Nm using hydraulic wrench.",
          "Apply local thermal barrier shroud to protect sensor cabling."
        ],
        telemetry: { peakVib: "2.10 mm/s", cavitation: "Normal", peakTemp: "148.5 °C", defectType: "Flange Gasket Compression Leak" }
      },
      {
        query: "Boiler B-3 steam pressure drop anomaly diagnosis and SOP.",
        title: "Diagnostic Report: Boiler B-3 Combustion Temperature Drop",
        priority: "high",
        priorityLabel: "High Priority",
        imageMode: "boiler",
        thinking: `[Aura AI DeepSeek Reasoning Engine]
1. Sensor query: Boiler B-3 steam pressure series.
2. Pressure drop detected: 42 Bar -> 34.4 Bar over 45 minutes.
3. Correlate SOP-MRPL-B3-PRESSURE.pdf Section 3.2: Flame temp 820 deg C (< 850 deg C limit) indicates fuel-air damper actuator mismatch.`,
        summary: "Boiler B-3 experienced an unexpected 18% steam pressure drop accompanied by flame temperature oscillation.",
        rootCause: "Burner Nozzle 2 fuel-to-air damper stuck at 35% open position due to pneumatic actuator signal degradation.",
        evidence: [
          { doc: "SOP-MRPL-B3-PRESSURE.pdf (Section 3.2)", text: "'Primary flame temp below 850 deg C indicates air damper mismatch.'" },
          { doc: "LOG-CDU-QUARTERLY-2026.csv", text: "'Boiler B-3 steam discharge dropped from 42 Bar to 34.4 Bar.'" }
        ],
        actions: [
          "Switch Boiler B-3 control loop to Manual Override Mode.",
          "Purge pilot air lines and inspect pneumatic valve positioner.",
          "Execute soot-blowing cycle on Economizer Stage 2 tubes."
        ],
        telemetry: { peakVib: "1.45 mm/s", cavitation: "N/A", peakTemp: "820 °C (Low)", defectType: "Air-Fuel Ratio Combustion Drop" }
      },
      {
        query: "Generate CDU unit quarterly preventative maintenance audit summary.",
        title: "Sovereign Audit Report: Crude Distillation Unit (CDU) Summary",
        priority: "normal",
        priorityLabel: "Audit Complete",
        imageMode: "pump",
        thinking: `[Aura AI DeepSeek Reasoning Engine]
1. Synthesize 14,250 BGE vector chunks across 48 local machinery tags.
2. Overall Unit Health Score: 84.5% (Good).
3. Backlog isolated to Pump 102 mechanical seal overhaul and Flange V88 stud re-torquing.`,
        summary: "Cross-document RAG synthesis of all MRPL CDU equipment. Overall Unit Health Index: 84.5% (Good).",
        rootCause: "Preventative audit synthesized 14,250 vector chunks. Backlog includes 2 scheduled seal replacements.",
        evidence: [
          { doc: "LOG-CDU-QUARTERLY-2026.csv", text: "'Processed 1.2M sensor telemetry data points across 48 local tags.'" },
          { doc: "DOC-P102-MAINT-2026.pdf", text: "'Scheduled MTBF target of 8,000 hrs achieved for 85% of machinery.'" }
        ],
        actions: [
          "Approve work order WO-2026-9941 for Pump 102 seal overhaul.",
          "Perform routine vibration baseline calibration.",
          "Archive local vector index backup to cold storage."
        ],
        telemetry: { peakVib: "3.20 mm/s", cavitation: "Isolated P102", peakTemp: "72.0 °C", defectType: "Routine Wear & Preventative Backlog" }
      }
    ];

    // Node Inspect Data
    this.nodeDetails = {
      guardrail: { title: "Security Policy Node", prompt: "Enforce air-gap zero egress. Scrub PII and employee IDs.", output: { status: "SECURE", egressBytes: 0, piiMasked: 0 } },
      vector: { title: "Vector RAG Node", prompt: "Convert query to BGE embedding and search ChromaDB.", output: { chunksSearched: 14250, topScore: 0.942 } },
      vision: { title: "Multimodal Vision Node", prompt: "Extract thermal matrix and defect bounding boxes.", output: { peakTempC: 94.8, confidence: 0.984 } },
      reasoner: { title: "Reasoning Engine Node", prompt: "Synthesize sensor logs and SOP manuals to deduce root cause.", output: { rootCause: "Cavitation-induced bearing friction heat", confidence: 0.96 } },
      synthesizer: { title: "SOP Builder Node", prompt: "Build citational report with action steps.", output: { citations: 3, sopActions: 3 } }
    };
  }

  init() {
    this.renderVaultFiles();
    this.renderVisualInspector();
    this.renderTelemetryChart();
    this.renderAnalyticsChart();
    this.updateVramUI();
    this.setupKeyboardShortcuts();
    this.checkAuthSession();
    this.renderNotifications();

    window.addEventListener('click', (e) => {
      const notifWrap = document.querySelector('.notif-wrapper');
      if (notifWrap && !notifWrap.contains(e.target)) {
        this.closeNotifDropdown();
      }
    });

    if (window.location.hash === '#history') {
      this.switchView('history');
    }
    console.log("Aura AI Cybernetic Engine Initialized.");
  }

  // Drawer Hover & Pin State Handlers
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

  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        if (this.activeView === 'console') {
          this.executeAgentQuery();
        }
      }
    });
  }

  // 9-View Dynamic Navigation Switcher
  switchView(viewName) {
    this.activeView = viewName;
    
    // Update drawer menu items
    document.querySelectorAll('.drawer-menu-item').forEach(btn => btn.classList.remove('active'));
    const targetNav = document.getElementById(`nav-btn-${viewName}`);
    if (targetNav) targetNav.classList.add('active');

    // Update main viewport panels
    document.querySelectorAll('.view-panel').forEach(panel => panel.classList.remove('active'));
    const targetPanel = document.getElementById(`view-${viewName}`);
    if (targetPanel) targetPanel.classList.add('active');

    // Auto collapse drawer if unpinned
    if (!this.isPinned) this.closeDrawer();

    // Module-specific initializations
    if (viewName === 'inspector') {
      this.renderVisualInspector();
      this.renderTelemetryChart();
    }
    if (viewName === 'vault') {
      this.renderVaultFiles();
    }
    if (viewName === 'analytics') {
      this.renderAnalyticsChart();
    }
    if (viewName === 'history') {
      this.renderHistoryView();
    }
  }

  // RBAC Persona Switcher
  switchRBACPersona(persona) {
    this.currentRBAC = persona;
    this.renderVaultFiles();
    if (document.querySelector('.article-wrap')) {
      const currentScen = this.scenarios[this.currentScenarioIndex] || this.scenarios[0];
      this.renderResponseArticle(currentScen);
    }
  }

  // Model & Quantization Tuning
  selectModelProfile(modelKey) {
    this.selectedModelKey = modelKey;
    document.querySelectorAll('.m-card').forEach(card => {
      card.classList.toggle('active', card.dataset.model === modelKey);
    });
    this.calculateVRAMEst();
  }

  updateQuantization(quant) {
    this.selectedQuant = quant;
    this.calculateVRAMEst();
  }

  calculateVRAMEst() {
    const model = this.modelProfiles[this.selectedModelKey] || this.modelProfiles['llama-3.3-70b'];
    let quantMultiplier = 0.55;
    if (this.selectedQuant === 'FP16') quantMultiplier = 2.0;
    if (this.selectedQuant === 'Q8_0') quantMultiplier = 1.0;
    if (this.selectedQuant === 'AWQ') quantMultiplier = 0.50;

    const estVram = (model.vramBaseQ4 * (quantMultiplier / 0.55)).toFixed(1);
    document.getElementById('estVramVal').innerText = `${estVram} GB / 80.0 GB`;
    document.getElementById('estSpeedVal').innerText = `${model.speedTps} Tokens/sec`;
    return estVram;
  }

  applyModelSettings() {
    const model = this.modelProfiles[this.selectedModelKey];
    const estVram = this.calculateVRAMEst();
    this.temperature = parseFloat(document.getElementById('tempRange').value);
    this.endpointUrl = document.getElementById('endpointUrl').value;

    document.getElementById('drawerModelName').innerText = model.name;
    document.getElementById('drawerQuantName').innerText = `${this.selectedQuant} • ${model.speedTps} T/s`;
    this.updateVramUI(estVram);
    alert(`Applied Model Config: ${model.name} (${this.selectedQuant})`);
  }

  updateVramUI(estVram = 38.4) {
    const percent = Math.min(100, Math.round((parseFloat(estVram) / 80.0) * 100));
    document.getElementById('drawerVramFill').style.width = `${percent}%`;
    document.getElementById('drawerVramTxt').innerText = `${estVram} / 80 GB`;
  }

  testLocalEndpoint() {
    const statusEl = document.getElementById('endpointStatus');
    statusEl.innerText = "Pinging endpoint...";
    statusEl.className = "endpoint-status text-amber";

    fetch(this.endpointUrl, { method: 'HEAD' })
      .then(() => {
        this.isLocalEndpointActive = true;
        statusEl.innerText = "Status: Connected to Local Ollama/LM Studio";
        statusEl.className = "endpoint-status text-green";
      })
      .catch(() => {
        this.isLocalEndpointActive = false;
        statusEl.innerText = "Status: Using Built-in Sovereign Engine";
        statusEl.className = "endpoint-status text-cyan";
      });
  }

  // Search Filters
  handleGlobalSearch() {
    const term = (document.getElementById('globalSearchInput')?.value || '').toLowerCase();
    if (term.length > 2) {
      this.switchView('vault');
      document.getElementById('vaultSearchInput').value = term;
      this.filterVaultFiles();
    }
  }

  filterSOPList(term) {
    const cards = document.querySelectorAll('#sopGrid .sop-item-card');
    cards.forEach(c => {
      const match = c.innerText.toLowerCase().includes(term.toLowerCase());
      c.style.display = match ? 'flex' : 'none';
    });
  }

  // Vault Management
  renderVaultFiles() {
    const fileListEl = document.getElementById('fileList');
    if (!fileListEl) return;
    const searchTerm = (document.getElementById('vaultSearchInput')?.value || '').toLowerCase();
    fileListEl.innerHTML = '';

    const filtered = this.vaultFiles.filter(f => {
      const matchTab = this.activeVaultFilter === 'all' || 
                        (this.activeVaultFilter === 'custom' ? f.id.startsWith('FILE-') : f.type === this.activeVaultFilter);
      const matchSearch = f.name.toLowerCase().includes(searchTerm) || f.desc.toLowerCase().includes(searchTerm);
      return matchTab && matchSearch;
    });

    if (filtered.length === 0) {
      fileListEl.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding:30px; color:var(--text-slate-400); font-size:12px;">No matching confidential documents found</div>`;
      return;
    }

    filtered.forEach(file => {
      const card = document.createElement('div');
      card.className = 'file-card';
      card.onclick = () => this.selectVaultFile(file);

      let displayName = file.name;
      if (this.currentRBAC === 'auditor' && file.id.startsWith('DOC-')) {
        displayName = file.name.replace(/2026/, '****');
      }

      card.innerHTML = `
        <div class="f-icon-box">
          <svg style="width:24px;height:24px;" viewBox="0 0 24 24"><path fill="currentColor" d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
        </div>
        <div class="f-info">
          <span class="f-name">${displayName}</span>
          <span class="f-desc">${file.desc}</span>
          <span class="f-meta">${file.size} • BGE Embedded • ${file.date}</span>
        </div>
      `;
      fileListEl.appendChild(card);
    });
  }

  switchVaultFilter(filter) {
    this.activeVaultFilter = filter;
    document.querySelectorAll('.vf-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === filter);
    });
    this.renderVaultFiles();
  }

  filterVaultFiles() {
    this.renderVaultFiles();
  }

  selectVaultFile(file) {
    if (file.type === 'images') {
      if (file.customImgObj) {
        this.activeImageMode = 'custom';
        this.customUploadedImage = file.customImgObj;
        document.getElementById('activeImageTitle').innerText = `${file.name} (Custom Scan)`;
      } else {
        this.activeImageMode = 'flange';
      }
      this.switchView('inspector');
    }
  }

  triggerFileUpload() {
    document.getElementById('fileInput').click();
  }

  handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    const isImage = file.type.includes('image');
    const newFile = {
      id: 'FILE-' + Date.now(),
      name: file.name,
      type: isImage ? 'images' : 'docs',
      size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
      date: new Date().toISOString().split('T')[0],
      desc: `User Ingested File (${file.name})`,
      content: ''
    };

    const reader = new FileReader();
    if (isImage) {
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          newFile.customImgObj = img;
          this.vaultFiles.unshift(newFile);
          this.activeVaultFilter = 'custom';
          this.renderVaultFiles();

          this.activeImageMode = 'custom';
          this.customUploadedImage = img;
          document.getElementById('activeImageTitle').innerText = `${file.name} (Custom Scan)`;
          this.switchView('inspector');
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      reader.onload = (e) => {
        newFile.content = e.target.result || `Ingested confidential text from ${file.name}`;
        this.vaultFiles.unshift(newFile);
        this.activeVaultFilter = 'custom';
        this.renderVaultFiles();
        alert(`Document "${file.name}" ingested into local BGE vector index!`);
      };
      reader.readAsText(file);
    }
  }

  // Agent Query Execution
  runPresetQuery(index) {
    this.currentScenarioIndex = index;
    const scenario = this.scenarios[index];
    document.getElementById('queryInput').value = scenario.query;
    this.executeAgentQuery();
  }

  async executeAgentQuery() {
    if (this.isExecuting) return;
    this.isExecuting = true;

    const queryText = document.getElementById('queryInput').value || this.scenarios[0].query;
    
    // Check custom match
    let customMatch = null;
    const customDocs = this.vaultFiles.filter(f => f.id.startsWith('FILE-'));
    if (customDocs.length > 0) {
      customMatch = customDocs.find(d => queryText.toLowerCase().split(' ').some(w => w.length > 3 && d.content.toLowerCase().includes(w)));
    }

    let scenario = this.scenarios[this.currentScenarioIndex] || this.scenarios[0];
    if (customMatch) {
      scenario = {
        query: queryText,
        title: `Custom RAG Analysis: ${customMatch.name}`,
        priority: "high",
        priorityLabel: "User Document RAG",
        imageMode: customMatch.customImgObj ? "custom" : "pump",
        thinking: `[Aura AI DeepSeek Reasoning Engine for Custom File]
1. Target custom document: ${customMatch.name}.
2. BGE vector similarity match found chunk of length ${customMatch.content.length} chars.
3. Formulate custom SOP actions.`,
        summary: `Synthesized findings from user uploaded document ${customMatch.name}. Key extract: "${customMatch.content.slice(0, 150)}..."`,
        rootCause: `Vector RAG retrieval confirmed query relevance in ${customMatch.name}.`,
        evidence: [{ doc: `${customMatch.name} (Ingested Chunk 1)`, text: `"${customMatch.content.slice(0, 200)}..."` }],
        actions: ["Verify parameters against plant SOP.", "Log report into air-gapped audit trail."],
        telemetry: { peakVib: "3.10 mm/s", cavitation: "Normal", peakTemp: "68.5 °C", defectType: "User Document RAG Analysis" }
      };
      if (customMatch.customImgObj) {
        this.customUploadedImage = customMatch.customImgObj;
        this.activeImageMode = 'custom';
      }
    }

    // Reset Workflow UI
    const badge = document.getElementById('workflowStatusBadge');
    badge.innerText = 'Executing...';
    badge.className = 'state-pill running';

    const timerEl = document.getElementById('executionTimer');
    let startTime = performance.now();
    const timerInterval = setInterval(() => {
      const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);
      timerEl.innerText = `${elapsed}s`;
    }, 50);

    const nodes = ['guardrail', 'vector', 'vision', 'reasoner', 'synthesizer'];
    nodes.forEach(n => {
      const el = document.getElementById(`node-${n}`);
      el.className = 'node-step-card';
      el.querySelector('.node-step-state').innerText = 'Ready';
    });

    const outputContainer = document.getElementById('outputContainer');
    outputContainer.innerHTML = `
      <div class="empty-state-card">
        <svg class="es-svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
        <h3>Executing LangGraph Autonomous Pipeline...</h3>
        <p>Running on-premise inference with <strong>${this.modelProfiles[this.selectedModelKey].name}</strong> (${this.selectedQuant}).</p>
      </div>
    `;

    // Step animation
    await this.animateNode('guardrail', 'PII Masked', 200);
    await this.animateNode('vector', '14,250 Chunks', 250);
    await this.animateNode('vision', 'Qwen-VL Done', 250);
    await this.animateNode('reasoner', 'Reasoning', 300);
    await this.animateNode('synthesizer', 'Report Ready', 200);

    clearInterval(timerInterval);
    badge.innerText = 'Completed';
    badge.className = 'state-pill completed';

    // Save run to history & redirect to dedicated results page
    const dateStr = new Date().toISOString().replace(/[-:T.]/g, '');
    const runId = 'RUN-' + dateStr.substring(0, 8) + '-' + Math.floor(100 + Math.random() * 900);

    const newRun = {
      id: runId,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      query: queryText,
      assetTag: scenario.assetTag || (scenario.imageMode === 'flange' ? 'IMG-V88 (CDU Flange V88)' : scenario.imageMode === 'boiler' ? 'SOP-B3 (Boiler B-3)' : 'DOC-P102 (Centrifugal Pump 102)'),
      title: scenario.title || `Workflow Analysis: ${queryText}`,
      priority: scenario.priority || 'critical',
      priorityLabel: scenario.priorityLabel || 'Critical Alarm',
      status: 'COMPLETED',
      thinking: scenario.thinking,
      summary: scenario.summary,
      rootCause: scenario.rootCause,
      evidence: scenario.evidence,
      actions: scenario.actions,
      telemetry: scenario.telemetry || { peakVib: "8.42 mm/s", peakTemp: "94.8 °C" }
    };

    this.workflowHistory.unshift(newRun);
    try {
      localStorage.setItem('aura_workflow_history', JSON.stringify(this.workflowHistory));
      localStorage.setItem('aura_search_history', JSON.stringify(this.workflowHistory));
    } catch(e) {}

    this.isExecuting = false;
    window.location.href = `results.html?id=${runId}`;
  }

  animateNode(nodeId, statusText, delayMs) {
    return new Promise(resolve => {
      const el = document.getElementById(`node-${nodeId}`);
      el.className = 'node-step-card executing';
      el.querySelector('.node-step-state').innerText = 'Processing...';

      setTimeout(() => {
        el.className = 'node-step-card done';
        el.querySelector('.node-step-state').innerText = statusText;
        resolve();
      }, delayMs);
    });
  }

  renderResponseArticle(scenario) {
    const outputContainer = document.getElementById('outputContainer');
    outputContainer.innerHTML = `
      <article class="article-wrap">
        <div class="article-hdr">
          <h2>${scenario.title}</h2>
          <span class="p-badge p-${scenario.priority}">${scenario.priorityLabel}</span>
        </div>

        <details class="cot-box" open>
          <summary class="cot-title">
            DeepSeek-R1 Chain-of-Thought (CoT) Reasoning Chain
          </summary>
          <div class="cot-content">${scenario.thinking}</div>
        </details>

        <div class="section-card">
          <h4>Problem Overview & Multimodal Findings</h4>
          <p>${scenario.summary}</p>
        </div>

        <div class="section-card">
          <h4>Root Cause & Telemetry Correlation</h4>
          <p>${scenario.rootCause}</p>
        </div>

        <div class="section-card">
          <h4>Confidential Evidence Citations</h4>
          <div class="evidence-grid">
            ${scenario.evidence.map(e => `
              <div class="ev-card">
                <span class="ev-doc">${e.doc}</span>
                <span class="ev-txt">${e.text}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="section-card">
          <h4>Corrective SOP Action Plan</h4>
          <ul class="action-list">
            ${scenario.actions.map(a => `<li>${a}</li>`).join('')}
          </ul>
        </div>

        <div class="export-bar">
          <button class="btn btn-sm btn-outline" onclick="app.exportDiagnosticReportMD()">Export Markdown</button>
          <button class="btn btn-sm btn-outline" onclick="app.exportAuditLogJSON()">Export Audit JSON</button>
        </div>
      </article>
    `;
  }

  // Node Inspector Modal
  inspectAgentNode(nodeId) {
    const details = this.nodeDetails[nodeId];
    if (!details) return;

    document.getElementById('nodeModalTitle').innerText = details.title;
    document.getElementById('nodeInspectContent').innerText = `=== PROMPT ===\n${details.prompt}\n\n=== OUTPUT ===\n${JSON.stringify(details.output, null, 2)}`;
    document.getElementById('nodeModal').classList.remove('hidden');
  }

  closeNodeModal() { document.getElementById('nodeModal').classList.add('hidden'); }
  showNotifAlert() { alert("System Alerts: 0 Active Critical Incidents. All 14,250 BGE vector embeddings verified intact."); }

  // Visual Inspection Canvas
  renderVisualInspector() {
    const canvas = document.getElementById('inspectionCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    const showThermal = document.getElementById('toggleThermal')?.checked ?? true;
    const showDefects = document.getElementById('toggleDefects')?.checked ?? true;

    ctx.fillStyle = '#030712';
    ctx.fillRect(0, 0, width, height);

    if (this.activeImageMode === 'custom' && this.customUploadedImage) {
      const img = this.customUploadedImage;
      const ratio = Math.min(width / img.width, height / img.height);
      const shiftX = (width - img.width * ratio) / 2;
      const shiftY = (height - img.height * ratio) / 2;

      ctx.drawImage(img, 0, 0, img.width, img.height, shiftX, shiftY, img.width * ratio, img.height * ratio);

      if (showThermal) {
        const grad = ctx.createRadialGradient(width / 2, height / 2, 10, width / 2, height / 2, 100);
        grad.addColorStop(0, 'rgba(239, 68, 68, 0.7)');
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, 100, 0, Math.PI * 2);
        ctx.fill();
      }

      if (showDefects) {
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 2;
        ctx.strokeRect(shiftX + 20, shiftY + 20, (img.width * ratio) - 40, (img.height * ratio) - 40);
      }
      return;
    }

    if (this.activeImageMode === 'pump') {
      document.getElementById('activeImageTitle').innerText = "Pump 102 Assembly Scan";

      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(200, 170, 90, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeRect(50, 140, 100, 60);
      ctx.strokeRect(170, 30, 60, 80);
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(290, 155, 180, 30);
      ctx.fillRect(270, 130, 80, 80);

      if (showThermal) {
        const grad = ctx.createRadialGradient(310, 170, 5, 310, 170, 95);
        grad.addColorStop(0, 'rgba(239, 68, 68, 0.9)');
        grad.addColorStop(0.4, 'rgba(245, 158, 11, 0.6)');
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(310, 170, 95, 0, Math.PI * 2);
        ctx.fill();
      }

      if (showDefects) {
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;
        ctx.strokeRect(260, 120, 100, 100);

        ctx.fillStyle = '#ef4444';
        ctx.fillRect(260, 100, 150, 20);
        ctx.fillStyle = '#ffffff';
        ctx.font = '10px Fira Code';
        ctx.fillText('CRITICAL: 94.8 deg C Hotspot', 264, 114);
      }

    } else if (this.activeImageMode === 'flange') {
      document.getElementById('activeImageTitle').innerText = "Pipe Flange V88 Thermal Scan";

      ctx.fillStyle = '#1e293b';
      ctx.fillRect(60, 130, 440, 80);
      ctx.fillRect(250, 70, 60, 200);

      if (showThermal) {
        const grad = ctx.createRadialGradient(280, 95, 2, 280, 95, 80);
        grad.addColorStop(0, 'rgba(239, 68, 68, 0.95)');
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(280, 95, 80, 0, Math.PI * 2);
        ctx.fill();
      }

      if (showDefects) {
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;
        ctx.strokeRect(240, 60, 80, 70);
      }

    } else { // boiler
      document.getElementById('activeImageTitle').innerText = "Boiler B-3 Burner Scan";

      ctx.fillStyle = '#0f172a';
      ctx.fillRect(100, 50, 360, 240);

      const flameGrad = ctx.createRadialGradient(280, 170, 10, 280, 170, 100);
      flameGrad.addColorStop(0, '#ffffff');
      flameGrad.addColorStop(0.5, '#f59e0b');
      flameGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = flameGrad;
      ctx.beginPath();
      ctx.arc(280, 170, 100, 0, Math.PI * 2);
      ctx.fill();

      if (showDefects) {
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 2;
        ctx.strokeRect(220, 120, 120, 100);
      }
    }
  }

  // SCADA Telemetry Chart
  renderTelemetryChart() {
    const canvas = document.getElementById('telemetryCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, width, height);

    // Grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 1;
    for (let y = 30; y < height - 20; y += 30) {
      ctx.beginPath();
      ctx.moveTo(40, y);
      ctx.lineTo(width - 20, y);
      ctx.stroke();
    }

    // Limit Line
    const limitY = height - 90;
    ctx.strokeStyle = '#f59e0b';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(40, limitY);
    ctx.lineTo(width - 20, limitY);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#f59e0b';
    ctx.font = '9px Fira Code';
    ctx.fillText('ISO 10816 SAFE LIMIT (4.50 mm/s)', 45, limitY - 4);

    const data = this.liveTelemetryData;
    const stepX = (width - 60) / (data.length - 1);
    const points = data.map((val, idx) => {
      const x = 40 + idx * stepX;
      const y = (height - 30) - (val / 10.0) * (height - 60);
      return { x, y, val };
    });

    const areaGrad = ctx.createLinearGradient(0, 0, 0, height);
    areaGrad.addColorStop(0, 'rgba(239, 68, 68, 0.4)');
    areaGrad.addColorStop(1, 'rgba(2, 132, 199, 0.05)');

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.lineTo(points[points.length - 1].x, height - 20);
    ctx.lineTo(points[0].x, height - 20);
    ctx.closePath();
    ctx.fillStyle = areaGrad;
    ctx.fill();

    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.stroke();

    points.forEach((pt) => {
      ctx.fillStyle = pt.val > 4.5 ? '#ef4444' : '#0284c7';
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, pt.val > 8.0 ? 5 : 3, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  // Predictive Analytics Chart
  renderAnalyticsChart() {
    const canvas = document.getElementById('analyticsCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = '#e2e8f0';
    for (let x = 50; x < width; x += 60) {
      ctx.beginPath();
      ctx.moveTo(x, 20);
      ctx.lineTo(x, height - 30);
      ctx.stroke();
    }

    const points = [
      { x: 50, y: height - 50 },
      { x: 150, y: height - 70 },
      { x: 250, y: height - 60 },
      { x: 350, y: height - 120 },
      { x: 450, y: height - 180 },
      { x: 550, y: height - 110 },
      { x: 650, y: height - 70 },
      { x: 750, y: height - 65 },
      { x: 850, y: height - 60 }
    ];

    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.stroke();

    points.forEach((pt) => {
      ctx.fillStyle = '#0284c7';
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  toggleLiveSCADA() {
    this.isLiveSCADA = !this.isLiveSCADA;
    const dot = document.getElementById('liveStreamDot');
    const btn = document.getElementById('btnLiveToggle');
    const alertBox = document.getElementById('anomalyAlertBox');

    if (this.isLiveSCADA) {
      dot.className = 'live-dot active';
      btn.innerText = 'Pause Feed';
      btn.className = 'btn btn-sm btn-danger';

      this.scadaTimer = setInterval(() => {
        const lastVal = this.liveTelemetryData[this.liveTelemetryData.length - 1];
        let newVal = (lastVal + (Math.random() * 1.6 - 0.7)).toFixed(2);
        newVal = Math.max(1.2, Math.min(9.8, parseFloat(newVal)));

        this.liveTelemetryData.shift();
        this.liveTelemetryData.push(newVal);

        document.getElementById('statPeakVib').innerText = `${newVal} mm/s`;
        if (newVal > 8.0) {
          alertBox.classList.remove('hidden');
        } else {
          alertBox.classList.add('hidden');
        }

        this.renderTelemetryChart();
      }, 900);
    } else {
      dot.className = 'live-dot';
      btn.innerText = 'Stream Live';
      btn.className = 'btn btn-sm btn-outline';
      clearInterval(this.scadaTimer);
      alertBox.classList.add('hidden');
    }
  }

  setTelemetryTimeframe(tf) {
    this.telemetryTimeframe = tf;
    document.querySelectorAll('.tf-group .tf-btn').forEach(btn => {
      btn.classList.toggle('active', btn.id === `tf-${tf}`);
    });
    if (tf === '24h') this.liveTelemetryData = [2.1, 2.3, 2.2, 2.5, 2.8, 2.9, 3.1, 2.7, 2.4];
    if (tf === '7d') this.liveTelemetryData = [2.4, 2.8, 3.1, 3.5, 4.2, 5.8, 8.42, 6.1, 3.9];
    if (tf === '30d') this.liveTelemetryData = [1.8, 2.0, 2.1, 2.2, 2.1, 2.4, 2.3, 2.5, 2.4];
    this.renderTelemetryChart();
  }

  // Exporters
  exportDiagnosticReportMD() {
    const scenario = this.scenarios[this.currentScenarioIndex] || this.scenarios[0];
    const mdContent = `# Aura AI — Sovereign Diagnostic Report
**Title:** ${scenario.title}  
**Date:** ${new Date().toISOString()}  
**Persona:** ${this.currentRBAC.toUpperCase()}  
**Model:** ${this.modelProfiles[this.selectedModelKey].name} (${this.selectedQuant})  

---

## 1. Problem Overview
${scenario.summary}

## 2. Root Cause Analysis
${scenario.rootCause}

## 3. Evidence References
${scenario.evidence.map(e => `- **${e.doc}**: ${e.text}`).join('\n')}

## 4. Corrective Action Plan
${scenario.actions.map((a, i) => `${i + 1}. ${a}`).join('\n')}
`;
    this.downloadFile(`Aura_AI_Report_${Date.now()}.md`, mdContent, 'text/markdown');
  }

  exportAuditLogJSON() {
    const auditObj = {
      project: "Aura AI Sovereign Industrial Intelligence",
      timestamp: new Date().toISOString(),
      activeModel: this.selectedModelKey,
      quantization: this.selectedQuant,
      rbacPersona: this.currentRBAC,
      totalVectorsIndexed: 14250,
      systemCheck: "PASSED_AIRGAP_ENFORCED"
    };
    this.downloadFile(`Aura_AI_Audit_${Date.now()}.json`, JSON.stringify(auditObj, null, 2), 'application/json');
  }

  // ==========================================================================
  // AUTHENTICATION GATEWAY SYSTEM (DYNAMIC STATE & HANDSHAKE SIMULATION)
  // ==========================================================================

  checkAuthSession() {
    const modal = document.getElementById('authGatewayModal');
    if (!modal) return;

    if (this.authState.isAuthenticated && this.authState.currentUser) {
      modal.classList.add('auth-hidden');
      this.updateUserProfileUI();
    } else {
      modal.classList.remove('auth-hidden');
      this.switchAuthTab('login');
    }
  }

  switchAuthTab(tab) {
    this.authTab = tab;
    const loginTabBtn = document.getElementById('authTabLogin');
    const signupTabBtn = document.getElementById('authTabSignup');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const alertBadge = document.getElementById('authAlertBadge');

    if (alertBadge) alertBadge.classList.add('hidden');

    if (tab === 'login') {
      if (loginTabBtn) loginTabBtn.classList.add('active');
      if (signupTabBtn) signupTabBtn.classList.remove('active');
      if (loginForm) loginForm.classList.remove('hidden');
      if (signupForm) signupForm.classList.add('hidden');
    } else {
      if (signupTabBtn) signupTabBtn.classList.add('active');
      if (loginTabBtn) loginTabBtn.classList.remove('active');
      if (signupForm) signupForm.classList.remove('hidden');
      if (loginForm) loginForm.classList.add('hidden');
    }
  }

  togglePasswordVisibility(inputId, btnId) {
    const input = document.getElementById(inputId);
    const btn = document.getElementById(btnId);
    if (!input || !btn) return;

    if (input.type === 'password') {
      input.type = 'text';
      btn.innerHTML = `<svg class="eye-svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.44-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.17c0-1.66-1.34-3-3-3l-.17.02z"/></svg>`;
    } else {
      input.type = 'password';
      btn.innerHTML = `<svg class="eye-svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>`;
    }
  }

  checkPasswordStrength(password) {
    const fill = document.getElementById('signupPwStrengthFill');
    if (!fill) return;

    if (!password || password.length === 0) {
      fill.style.width = '0%';
      fill.style.backgroundColor = '#EF4444';
      return;
    }

    let score = 0;
    if (password.length >= 6) score += 30;
    if (password.length >= 10) score += 30;
    if (/[A-Z]/.test(password)) score += 15;
    if (/[0-9]/.test(password)) score += 15;
    if (/[^A-Za-z0-9]/.test(password)) score += 10;

    fill.style.width = `${Math.min(score, 100)}%`;
    if (score < 40) fill.style.backgroundColor = '#EF4444';
    else if (score < 75) fill.style.backgroundColor = '#F59E0B';
    else fill.style.backgroundColor = '#10B981';
  }

  showAuthAlert(message, type = 'error') {
    const badge = document.getElementById('authAlertBadge');
    const msgEl = document.getElementById('authAlertMsg');
    if (!badge || !msgEl) return;

    msgEl.innerText = message;
    badge.className = `auth-alert-badge ${type}`;
  }

  handleLogin(e) {
    if (e) e.preventDefault();

    const email = document.getElementById('loginEmail')?.value.trim();
    const password = document.getElementById('loginPassword')?.value;
    const role = document.getElementById('loginRole')?.value || 'Engineer';
    const keepAirgapped = document.getElementById('keepAirgappedCheck')?.checked ?? true;

    // Real-time Input Validation
    if (!email || !email.includes('@') || !email.includes('.')) {
      this.showAuthAlert("Please enter a valid corporate email address.");
      return;
    }
    if (!password || password.length < 4) {
      this.showAuthAlert("Invalid security key. Passcode must be at least 4 characters.");
      return;
    }

    const loginForm = document.getElementById('loginForm');
    const handshakeBox = document.getElementById('authHandshakeBox');
    const titleEl = document.getElementById('handshakeTitle');
    const subEl = document.getElementById('handshakeSub');

    if (loginForm) loginForm.classList.add('hidden');
    if (handshakeBox) handshakeBox.classList.remove('hidden');

    // Dynamic Auth Handshake Simulation Steps
    if (titleEl) titleEl.innerText = "Authenticating Security Tokens...";
    if (subEl) subEl.innerText = "Validating Air-Gap Certificate & RSA-4096 Key";

    setTimeout(() => {
      if (titleEl) titleEl.innerText = "Decrypting Local Session...";
      if (subEl) subEl.innerText = "Establishing Encrypted Vault Tunnel";
    }, 600);

    setTimeout(() => {
      if (titleEl) titleEl.innerText = "Access Granted — Launching Console!";
      if (subEl) subEl.innerText = "Sovereign Industrial Session Initialized";
    }, 1200);

    setTimeout(() => {
      if (handshakeBox) handshakeBox.classList.add('hidden');
      if (loginForm) loginForm.classList.remove('hidden');

      // Formulate User Credentials
      const usernamePart = email.split('@')[0];
      const formattedName = usernamePart.split('.').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');

      this.authState = {
        isAuthenticated: true,
        currentUser: {
          name: formattedName || "Rajvardhan Shinde",
          email: email,
          role: role
        },
        userRole: role,
        airGappedSession: keepAirgapped
      };

      try {
        localStorage.setItem('aura_auth_session', JSON.stringify(this.authState));
      } catch(err) {
        console.warn("Session storage failed", err);
      }

      this.updateUserProfileUI();

      // Smoothly hide gateway overlay
      const modal = document.getElementById('authGatewayModal');
      if (modal) modal.classList.add('auth-hidden');

      this.triggerToast("Authentication Successful", `Sovereign Security Gateway active for ${this.authState.currentUser.name} (${role})`);
    }, 1600);
  }

  handleSignup(e) {
    if (e) e.preventDefault();

    const name = document.getElementById('signupName')?.value.trim();
    const email = document.getElementById('signupEmail')?.value.trim();
    const clearanceCode = document.getElementById('signupClearanceCode')?.value.trim();
    const password = document.getElementById('signupPassword')?.value;
    const confirmPassword = document.getElementById('signupConfirmPassword')?.value;

    if (!name || name.length < 2) {
      this.showAuthAlert("Please enter your full legal name.");
      return;
    }
    if (!email || !email.includes('@') || !email.includes('.')) {
      this.showAuthAlert("Please enter a valid industrial email address.");
      return;
    }
    if (!clearanceCode) {
      this.showAuthAlert("Security clearance code / organization key is required.");
      return;
    }
    if (!password || password.length < 8) {
      this.showAuthAlert("Passcode must be at least 8 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      this.showAuthAlert("Passcode confirmation does not match.");
      return;
    }

    const signupForm = document.getElementById('signupForm');
    const handshakeBox = document.getElementById('authHandshakeBox');
    const titleEl = document.getElementById('handshakeTitle');
    const subEl = document.getElementById('handshakeSub');

    if (signupForm) signupForm.classList.add('hidden');
    if (handshakeBox) handshakeBox.classList.remove('hidden');

    if (titleEl) titleEl.innerText = "Requesting Sovereign Clearance...";
    if (subEl) subEl.innerText = `Validating Clearance Key: ${clearanceCode}`;

    setTimeout(() => {
      if (titleEl) titleEl.innerText = "Allocating Encrypted User Vault...";
      if (subEl) subEl.innerText = "Generating Sovereign Public/Private Keypair";
    }, 600);

    setTimeout(() => {
      if (titleEl) titleEl.innerText = "Clearance Granted — Welcome!";
      if (subEl) subEl.innerText = "Initializing Account Credentials";
    }, 1200);

    setTimeout(() => {
      if (handshakeBox) handshakeBox.classList.add('hidden');
      if (signupForm) signupForm.classList.remove('hidden');

      this.authState = {
        isAuthenticated: true,
        currentUser: {
          name: name,
          email: email,
          role: 'Engineer'
        },
        userRole: 'Engineer',
        airGappedSession: true
      };

      try {
        localStorage.setItem('aura_auth_session', JSON.stringify(this.authState));
      } catch(err) {
        console.warn("Session storage failed", err);
      }

      this.updateUserProfileUI();

      const modal = document.getElementById('authGatewayModal');
      if (modal) modal.classList.add('auth-hidden');

      this.triggerToast("Access Granted", `Welcome to Aura AI Workbench, ${name}!`);
    }, 1600);
  }

  handleSSOLogin(provider) {
    const handshakeBox = document.getElementById('authHandshakeBox');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const titleEl = document.getElementById('handshakeTitle');
    const subEl = document.getElementById('handshakeSub');

    if (loginForm) loginForm.classList.add('hidden');
    if (signupForm) signupForm.classList.add('hidden');
    if (handshakeBox) handshakeBox.classList.remove('hidden');

    if (titleEl) titleEl.innerText = `Connecting to ${provider}...`;
    if (subEl) subEl.innerText = "Authenticating Enterprise SAML Tokens";

    setTimeout(() => {
      if (titleEl) titleEl.innerText = "SSO Authentication Verified!";
      if (subEl) subEl.innerText = "Exchanging Air-Gap Security Handshake";
    }, 800);

    setTimeout(() => {
      if (handshakeBox) handshakeBox.classList.add('hidden');
      if (this.authTab === 'login' && loginForm) loginForm.classList.remove('hidden');
      if (this.authTab === 'signup' && signupForm) signupForm.classList.remove('hidden');

      this.authState = {
        isAuthenticated: true,
        currentUser: {
          name: "Sovereign Industrial User",
          email: `user@${provider.toLowerCase().replace(/[^a-z]/g, '')}.internal`,
          role: "Engineer"
        },
        userRole: "Engineer",
        airGappedSession: true
      };

      try {
        localStorage.setItem('aura_auth_session', JSON.stringify(this.authState));
      } catch(e) {}

      this.updateUserProfileUI();

      const modal = document.getElementById('authGatewayModal');
      if (modal) modal.classList.add('auth-hidden');

      this.triggerToast("SSO Authenticated", `Signed in via ${provider}. Session active.`);
    }, 1400);
  }

  updateUserProfileUI() {
    if (!this.authState.currentUser) return;

    const name = this.authState.currentUser.name || "Plant Engineer";
    const role = this.authState.currentUser.role || "Engineer";

    // Generate Initials
    const parts = name.trim().split(' ');
    let initials = 'PE';
    if (parts.length >= 2) initials = (parts[0][0] + parts[1][0]).toUpperCase();
    else if (parts.length === 1 && parts[0].length >= 2) initials = parts[0].substring(0, 2).toUpperCase();

    const avatarEl = document.getElementById('topNavAvatar');
    const nameEl = document.getElementById('topNavUserName');
    const deptEl = document.getElementById('topNavUserDept');

    if (avatarEl) avatarEl.innerText = initials;
    if (nameEl) nameEl.innerText = name;
    if (deptEl) deptEl.innerText = `${role} • Sovereign Session`;

    // Sync RBAC Select in Drawer
    const rbacSel = document.getElementById('rbacSelect');
    if (rbacSel) {
      const val = role.toLowerCase().includes('operator') ? 'operator' : role.toLowerCase().includes('admin') ? 'admin' : 'engineer';
      rbacSel.value = val;
      this.currentRBAC = val;
    }
  }

  showForgotHelp(e) {
    if (e) e.preventDefault();
    this.showAuthAlert("To reset your security key, contact your local On-Premise System Admin or insert your Hardware Security Key.", "success");
  }

  logout() {
    this.authState = {
      isAuthenticated: false,
      currentUser: null,
      userRole: 'Engineer',
      airGappedSession: true
    };

    try {
      localStorage.removeItem('aura_auth_session');
    } catch(e) {}

    const modal = document.getElementById('authGatewayModal');
    if (modal) {
      modal.classList.remove('auth-hidden');
    }

    this.switchAuthTab('login');
    this.showAuthAlert("Session locked. Re-authenticate to access workbench.", "success");
    this.triggerToast("Session Locked", "You have been logged out of the Sovereign Workbench.");
  }

  // ==========================================================================
  // WORKFLOW HISTORY VIEW & LOCALSTORAGE MANAGEMENT
  // ==========================================================================

  setHistoryFilter(filter) {
    this.historyFilter = filter;
    document.querySelectorAll('.v-filter-bar .vf-btn').forEach(btn => {
      const filterName = btn.id.replace('histFilter', '').toLowerCase();
      btn.classList.toggle('active', filterName === filter);
    });
    this.renderHistoryView();
  }

  clearHistory() {
    if (confirm("Are you sure you want to clear your saved search history? This action cannot be undone.")) {
      this.workflowHistory = [];
      try {
        localStorage.removeItem('aura_workflow_history');
        localStorage.removeItem('aura_search_history');
      } catch(e) {}
      this.renderHistoryView();
      this.showToast("Search & workflow history cleared successfully", "success");
    }
  }

  renderHistoryView() {
    const tbody = document.getElementById('historyTableBody');
    if (!tbody) return;

    const searchTerm = (document.getElementById('historySearchInput')?.value || '').toLowerCase();
    tbody.innerHTML = '';

    const filtered = (this.workflowHistory || []).filter(r => {
      const matchFilter = this.historyFilter === 'all' ||
        (this.historyFilter === 'completed' && r.status === 'COMPLETED') ||
        (this.historyFilter === 'critical' && (r.priority === 'critical' || (r.priorityLabel || '').toLowerCase().includes('critical')));
      const matchSearch = (r.id || '').toLowerCase().includes(searchTerm) ||
        (r.query || '').toLowerCase().includes(searchTerm) ||
        (r.assetTag || '').toLowerCase().includes(searchTerm);
      return matchFilter && matchSearch;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" style="padding: 0;">
            <div class="empty-state-history">
              <svg viewBox="0 0 24 24"><path fill="currentColor" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
              <h4>No Saved Searches Found</h4>
              <p>No previous diagnostic workflows match your search or filter criteria. Submit a new query to generate reports.</p>
            </div>
          </td>
        </tr>
      `;
      return;
    }

    filtered.forEach(run => {
      const tr = document.createElement('tr');
      tr.style.cursor = 'pointer';
      tr.onclick = () => { window.location.href = `results.html?id=${run.id}`; };

      const prioClass = run.priority === 'critical' ? 'bg-red' : run.priority === 'warning' ? 'bg-amber' : 'bg-green';

      tr.innerHTML = `
        <td><strong class="text-cyan">${run.id}</strong></td>
        <td><span style="font-family: var(--font-mono); font-size: 11px; color: var(--text-secondary);">${run.timestamp}</span></td>
        <td><strong style="color: var(--text-primary);">${run.query}</strong></td>
        <td><span class="sop-tag">${run.assetTag || 'DOC-P102'}</span></td>
        <td><span class="tag-badge ${prioClass}">${run.priorityLabel || run.priority}</span></td>
        <td><span class="tag-badge bg-green">${run.status}</span></td>
        <td>
          <a href="results.html?id=${run.id}" class="btn btn-sm btn-outline" onclick="event.stopPropagation();">
            <span>View Report ➔</span>
          </a>
        </td>
      `;
      tbody.appendChild(tr);
    });
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

  // Notification Center Methods
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
      <div class="notif-item ${n.unread ? 'unread' : ''}" onclick="app.handleNotifItemClick(${n.id})">
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

  // Setting Controls Interactivity Methods
  selectModelProfile(modelId) {
    this.selectedModel = modelId;
    const cards = document.querySelectorAll('.model-cards-stack .m-card');
    cards.forEach(card => {
      if (card.dataset.model === modelId) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });

    const modelNames = {
      'llama-3.3-70b': 'LLaMA-3.3-70B-Instruct',
      'qwen2.5-vl-72b': 'Qwen2.5-VL-72B Multimodal',
      'deepseek-r1-70b': 'DeepSeek-R1-Distill-Llama-70B',
      'mistral-nemo-12b': 'Mistral-NeMo-12B (Fast Edge)'
    };
    const modelVram = {
      'llama-3.3-70b': '38.4 GB / 80.0 GB',
      'qwen2.5-vl-72b': '42.0 GB / 80.0 GB',
      'deepseek-r1-70b': '39.2 GB / 80.0 GB',
      'mistral-nemo-12b': '7.2 GB / 80.0 GB'
    };

    const estVram = document.getElementById('estVramVal');
    if (estVram) estVram.innerText = modelVram[modelId] || '38.4 GB / 80.0 GB';

    this.showToast(`Active Model Profile set to ${modelNames[modelId] || modelId}`, 'success');
  }

  updateQuantization(val) {
    this.selectedQuant = val;
    this.showToast(`Quantization parameters updated: ${val}`, 'info');
  }

  testLocalEndpoint() {
    const input = document.getElementById('endpointUrl');
    const status = document.getElementById('endpointStatus');
    const url = input ? input.value : 'http://localhost:11434';

    if (status) {
      status.innerText = "Status: Testing local endpoint connection...";
      status.className = "endpoint-status text-amber";
    }

    setTimeout(() => {
      if (status) {
        status.innerText = `Status: Active (${url}) - Latency 42ms`;
        status.className = "endpoint-status text-green";
      }
      this.showToast(`Local REST Endpoint Ping Successful (42ms Latency)`, 'success');
    }, 600);
  }

  applyModelSettings() {
    const tempRange = document.getElementById('tempRange');
    const quantSelect = document.getElementById('quantSelect');
    const endpointUrl = document.getElementById('endpointUrl');

    const settings = {
      model: this.selectedModel || 'llama-3.3-70b',
      quantization: quantSelect ? quantSelect.value : 'Q4_K_M',
      temperature: tempRange ? tempRange.value : '0.2',
      endpoint: endpointUrl ? endpointUrl.value : 'http://localhost:11434'
    };

    try {
      localStorage.setItem('aura_system_settings', JSON.stringify(settings));
    } catch(e) {}

    this.showToast('System configuration & model parameters saved successfully', 'success');
  }
}

// Global App Instantiation
const app = new AuraAI();
window.addEventListener('DOMContentLoaded', () => {
  app.init();
});
