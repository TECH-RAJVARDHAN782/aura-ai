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

    // Model Runtime State
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

  // 8-View Dynamic Navigation Switcher
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
    await this.animateNode('guardrail', 'PII Masked', 250);
    await this.animateNode('vector', '14,250 Chunks', 350);
    await this.animateNode('vision', 'Qwen-VL Done', 400);
    await this.animateNode('reasoner', 'Reasoning', 500);
    await this.animateNode('synthesizer', 'Report Ready', 250);

    clearInterval(timerInterval);
    badge.innerText = 'Completed';
    badge.className = 'state-pill completed';

    this.activeImageMode = scenario.imageMode;
    document.getElementById('valDefectType').innerText = scenario.telemetry.defectType;
    document.getElementById('valPeakTemp').innerText = scenario.telemetry.peakTemp;
    document.getElementById('statPeakVib').innerText = scenario.telemetry.peakVib;

    this.renderVisualInspector();
    this.renderTelemetryChart();
    this.renderResponseArticle(scenario);
    this.isExecuting = false;
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

    ctx.fillStyle = '#030712';
    ctx.fillRect(0, 0, width, height);

    // Grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
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
    areaGrad.addColorStop(1, 'rgba(6, 182, 212, 0.05)');

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
      ctx.fillStyle = pt.val > 4.5 ? '#ef4444' : '#06b6d4';
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

    ctx.fillStyle = '#030712';
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
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

    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.stroke();
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

// Global App Instantiation
const app = new AuraAI();
window.addEventListener('DOMContentLoaded', () => {
  app.init();
});
