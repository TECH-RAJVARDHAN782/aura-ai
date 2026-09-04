# Aura AI — Sovereign On-Premise Agentic AI Workbench

> **Problem Statement ID: SIH26117** — Sovereign On-Premise Agentic AI Workbench using Open-Weight Multimodal LLMs for Confidential Industrial Work.

![Aura AI Banner](https://img.shields.gradient.is/Aura-AI-Sovereign-Industrial-AI)
[![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/rajvardhanshinde782)
[![SIH Hackathon](https://img.shields.io/badge/SIH-Hackathon_2026-blue?style=for-the-badge)](https://sih.gov.in)

---

## 🌟 Key Features

1. **⚡ Open-Weight LLM Control & Quantization Tuning**:
   - Model switching between `Llama-3.3-70B`, `Qwen2.5-VL-72B`, `DeepSeek-R1-70B`, and `Mistral-NeMo-12B`.
   - Real-time VRAM allocation estimation & GGUF quantization mode selection (`Q4_K_M`, `AWQ`, `Q8_0`, `FP16`).
   - Local REST API connector (Ollama / LM Studio binding).

2. **📁 In-Memory BGE Vector RAG & Document Vault**:
   - Client-side ingestion of confidential PDF, CSV, TXT files, and thermal photos.
   - BGE character-gram vector indexing with exact citational evidence extraction.

3. **📷 Multimodal Canvas Visual & Thermal Defect Inspector**:
   - Canvas equipment schematics (*Pump 102*, *Flange V88*, *Boiler B-3*) with toggleable thermal heatmaps and AI defect bounding boxes.
   - Support for drag & drop custom user images.

4. **📈 Real-Time SCADA IoT Telemetry Feed**:
   - Live streaming sensor ticker with ISO 10816 threshold breach detection.

5. **🧠 LangGraph Multi-Agent Pipeline & DeepSeek CoT**:
   - Step pipeline trace (`Security Policy` → `Vector RAG` → `Vision Scan` → `Reasoning` → `SOP Builder`).
   - Collapsible DeepSeek `<think>` Chain-of-Thought reasoning blocks.

6. **🛡️ RBAC Personas & 1-Click Sovereign Exporter**:
   - Role-Based Access Control (**Plant Engineer**, **Safety Auditor**, **Sovereign Admin**).
   - 1-click Markdown diagnostic report & JSON security audit export.

---

## 🚀 Local Development Setup

```bash
# Clone the repository
git clone https://github.com/TECH-RAJVARDHAN782/aura-ai.git

# Navigate to project directory
cd aura-ai

# Serve locally
npx serve .
```

Open `http://localhost:3000` in your browser.

---

## 🌐 Deployment

Deployed on Vercel: [https://vercel.com/rajvardhanshinde782](https://vercel.com/rajvardhanshinde782)

---
*Created for Smart India Hackathon (SIH 2026)*
