<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CAFÉ AROMA — CYBER-ARTISAN PROTOCOL v1.2</title>
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Share+Tech+Mono&family=Rajdhani:wght@300;400;600;700&display=swap" rel="stylesheet">
<style>
  :root {
    --cyan: #00f3ff;
    --red: #ff0055;
    --gold: #ffd700;
    --green: #00ff88;
    --bg: #03040a;
    --bg2: #070a12;
    --panel: rgba(0,243,255,0.03);
    --border: rgba(0,243,255,0.2);
    --text: #c8eeff;
    --muted: #4a7a8a;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Rajdhani', sans-serif;
    font-size: 16px;
    line-height: 1.7;
    overflow-x: hidden;
    cursor: crosshair;
  }

  /* ─── SCANLINE OVERLAY ─── */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0,0,0,0.08) 2px,
      rgba(0,0,0,0.08) 4px
    );
    pointer-events: none;
    z-index: 9999;
    animation: scanroll 8s linear infinite;
  }

  @keyframes scanroll {
    0%   { background-position: 0 0; }
    100% { background-position: 0 100vh; }
  }

  /* ─── GRID BACKGROUND ─── */
  body::after {
    content: '';
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(rgba(0,243,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,243,255,0.03) 1px, transparent 1px);
    background-size: 40px 40px;
    pointer-events: none;
    z-index: 0;
  }

  /* ─── LAYOUT ─── */
  .container {
    max-width: 960px;
    margin: 0 auto;
    padding: 40px 24px 80px;
    position: relative;
    z-index: 1;
  }

  /* ─── HERO ─── */
  .hero {
    text-align: center;
    padding: 60px 0 40px;
    position: relative;
  }

  .hero-badge {
    display: inline-block;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.7rem;
    color: var(--green);
    background: rgba(0,255,136,0.08);
    border: 1px solid rgba(0,255,136,0.3);
    padding: 4px 14px;
    letter-spacing: 3px;
    margin-bottom: 20px;
    animation: pulse-badge 2s ease-in-out infinite;
  }

  @keyframes pulse-badge {
    0%,100% { box-shadow: 0 0 6px rgba(0,255,136,0.3); }
    50%      { box-shadow: 0 0 18px rgba(0,255,136,0.7), 0 0 35px rgba(0,255,136,0.2); }
  }

  .hero-title {
    font-family: 'Orbitron', monospace;
    font-size: clamp(2rem, 6vw, 4.5rem);
    font-weight: 900;
    letter-spacing: 6px;
    text-transform: uppercase;
    line-height: 1.1;
    animation: glitch-title 6s infinite;
    position: relative;
  }

  .hero-title .line1 { color: var(--cyan); display: block; }
  .hero-title .line2 {
    color: transparent;
    -webkit-text-stroke: 1px var(--red);
    display: block;
    font-size: 0.4em;
    letter-spacing: 12px;
    margin-top: 8px;
    animation: flicker 4s ease-in-out infinite;
  }

  @keyframes glitch-title {
    0%,90%,100% { text-shadow: 0 0 20px var(--cyan), 0 0 40px rgba(0,243,255,0.4); transform: translate(0); }
    91%          { text-shadow: -3px 0 var(--red), 3px 0 var(--cyan); transform: translate(-2px, 0); }
    93%          { text-shadow: 3px 0 var(--red), -3px 0 var(--cyan); transform: translate(2px, 0); }
    95%          { text-shadow: 0 0 20px var(--cyan); transform: translate(0); }
  }

  @keyframes flicker {
    0%,19%,21%,23%,25%,54%,56%,100% { opacity: 1; }
    20%,22%,24%,55% { opacity: 0.3; }
  }

  .hero-sub {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.8rem;
    color: var(--muted);
    letter-spacing: 4px;
    margin-top: 16px;
    animation: blink-cursor 1s step-end infinite;
  }

  @keyframes blink-cursor {
    0%,100% { opacity: 1; }
    50%      { opacity: 0.4; }
  }

  /* ─── STATUS BAR ─── */
  .status-bar {
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
    justify-content: center;
    margin: 30px 0 50px;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.75rem;
  }

  .status-item {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--muted);
    letter-spacing: 2px;
  }

  .status-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    animation: pulse-dot 1.5s ease-in-out infinite;
  }

  .dot-green  { background: var(--green);  box-shadow: 0 0 8px var(--green); }
  .dot-cyan   { background: var(--cyan);   box-shadow: 0 0 8px var(--cyan); animation-delay: 0.3s; }
  .dot-red    { background: var(--red);    box-shadow: 0 0 8px var(--red); animation-delay: 0.6s; }

  @keyframes pulse-dot {
    0%,100% { opacity: 1; transform: scale(1); }
    50%      { opacity: 0.4; transform: scale(0.7); }
  }

  /* ─── DIVIDER ─── */
  .divider {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 40px 0 24px;
    font-family: 'Orbitron', monospace;
    font-size: 0.65rem;
    letter-spacing: 4px;
    color: var(--muted);
  }

  .divider::before, .divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--border));
  }

  .divider::after {
    background: linear-gradient(90deg, var(--border), transparent);
  }

  .divider-icon { color: var(--cyan); }

  /* ─── PANELS ─── */
  .panel {
    background: var(--panel);
    border: 1px solid var(--border);
    border-radius: 2px;
    padding: 28px 32px;
    margin-bottom: 20px;
    position: relative;
    transition: border-color 0.3s, box-shadow 0.3s;
    animation: panel-in 0.6s ease both;
  }

  @keyframes panel-in {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .panel:hover {
    border-color: rgba(0,243,255,0.5);
    box-shadow: 0 0 30px rgba(0,243,255,0.07), inset 0 0 30px rgba(0,243,255,0.02);
  }

  /* Corner accents */
  .panel::before, .panel::after {
    content: '';
    position: absolute;
    width: 12px; height: 12px;
  }

  .panel::before {
    top: -1px; left: -1px;
    border-top: 2px solid var(--cyan);
    border-left: 2px solid var(--cyan);
  }

  .panel::after {
    bottom: -1px; right: -1px;
    border-bottom: 2px solid var(--cyan);
    border-right: 2px solid var(--cyan);
  }

  .panel-red::before, .panel-red::after { border-color: var(--red); }
  .panel-red { border-color: rgba(255,0,85,0.15); }
  .panel-red:hover { border-color: rgba(255,0,85,0.4); box-shadow: 0 0 30px rgba(255,0,85,0.07); }

  .panel-gold::before, .panel-gold::after { border-color: var(--gold); }
  .panel-gold { border-color: rgba(255,215,0,0.15); }
  .panel-gold:hover { border-color: rgba(255,215,0,0.4); box-shadow: 0 0 30px rgba(255,215,0,0.07); }

  /* ─── SECTION HEADING ─── */
  .section-heading {
    font-family: 'Orbitron', monospace;
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 5px;
    text-transform: uppercase;
    color: var(--cyan);
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .section-heading .icon { font-size: 1.1rem; }
  .section-heading .tag {
    font-size: 0.6rem;
    color: var(--muted);
    background: rgba(0,243,255,0.06);
    border: 1px solid rgba(0,243,255,0.15);
    padding: 2px 8px;
    margin-left: auto;
  }

  .section-heading-red  { color: var(--red); }
  .section-heading-gold { color: var(--gold); }

  /* ─── FEATURE GRID ─── */
  .feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    margin-top: 8px;
  }

  .feature-item {
    background: rgba(0,243,255,0.03);
    border: 1px solid rgba(0,243,255,0.1);
    padding: 16px 18px;
    border-radius: 2px;
    transition: all 0.25s;
    cursor: default;
  }

  .feature-item:hover {
    background: rgba(0,243,255,0.07);
    border-color: var(--cyan);
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0,243,255,0.1);
  }

  .feature-label {
    font-family: 'Orbitron', monospace;
    font-size: 0.65rem;
    letter-spacing: 3px;
    color: var(--cyan);
    display: block;
    margin-bottom: 6px;
  }

  .feature-desc {
    font-size: 0.85rem;
    color: var(--muted);
    line-height: 1.5;
  }

  /* ─── RED FEATURE ITEMS ─── */
  .feature-item-red {
    background: rgba(255,0,85,0.03);
    border-color: rgba(255,0,85,0.1);
  }
  .feature-item-red:hover {
    background: rgba(255,0,85,0.07);
    border-color: var(--red);
    box-shadow: 0 8px 20px rgba(255,0,85,0.1);
  }
  .feature-item-red .feature-label { color: var(--red); }

  /* ─── TECH GRID ─── */
  .tech-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 12px;
  }

  .tech-item {
    display: flex;
    align-items: center;
    gap: 14px;
    background: rgba(255,215,0,0.03);
    border: 1px solid rgba(255,215,0,0.1);
    padding: 14px 16px;
    transition: all 0.25s;
    cursor: default;
  }

  .tech-item:hover {
    background: rgba(255,215,0,0.07);
    border-color: var(--gold);
    box-shadow: 0 0 16px rgba(255,215,0,0.1);
  }

  .tech-icon {
    font-size: 1.4rem;
    flex-shrink: 0;
  }

  .tech-label {
    font-family: 'Orbitron', monospace;
    font-size: 0.6rem;
    letter-spacing: 2px;
    color: var(--gold);
    display: block;
  }

  .tech-val {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.8rem;
    color: var(--text);
  }

  /* ─── FLOW DIAGRAM ─── */
  .flow-diagram {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.8rem;
    overflow-x: auto;
    padding: 20px 0;
  }

  .flow-row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0;
    margin-bottom: 8px;
    animation: flow-slide 0.5s ease both;
  }

  @keyframes flow-slide {
    from { opacity: 0; transform: translateX(-20px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  .flow-node {
    padding: 8px 16px;
    border: 1px solid;
    font-size: 0.75rem;
    letter-spacing: 1px;
    white-space: nowrap;
    transition: all 0.3s;
    cursor: default;
    position: relative;
  }

  .flow-node:hover { filter: brightness(1.4); transform: scale(1.04); }

  .node-cyan  { border-color: var(--cyan); color: var(--cyan); background: rgba(0,243,255,0.06); }
  .node-red   { border-color: var(--red);  color: var(--red);  background: rgba(255,0,85,0.06); }
  .node-green { border-color: var(--green);color: var(--green);background: rgba(0,255,136,0.06);}
  .node-gold  { border-color: var(--gold); color: var(--gold); background: rgba(255,215,0,0.06);}

  .flow-arrow {
    color: var(--muted);
    padding: 0 8px;
    font-size: 0.8rem;
    white-space: nowrap;
  }

  .flow-label {
    font-size: 0.6rem;
    color: var(--muted);
    letter-spacing: 2px;
    padding: 0 6px;
  }

  /* ─── CODE BLOCK ─── */
  .code-block {
    background: #020306;
    border: 1px solid rgba(0,243,255,0.15);
    border-left: 3px solid var(--cyan);
    padding: 20px 24px;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.82rem;
    color: var(--text);
    line-height: 1.9;
    margin-top: 8px;
    position: relative;
    overflow: hidden;
  }

  .code-block::before {
    content: 'BASH';
    position: absolute;
    top: 8px; right: 12px;
    font-size: 0.6rem;
    color: var(--muted);
    letter-spacing: 3px;
  }

  .cmd-prefix { color: var(--red); user-select: none; }
  .cmd-comment { color: var(--muted); font-style: italic; }
  .cmd-keyword { color: var(--cyan); }
  .cmd-val     { color: var(--green); }

  /* Typing animation on code lines */
  .code-line {
    display: flex;
    overflow: hidden;
    white-space: nowrap;
    animation: typing 0.5s steps(40, end) both;
  }

  .code-line:nth-child(1)  { animation-delay: 0.1s; }
  .code-line:nth-child(2)  { animation-delay: 0.3s; }
  .code-line:nth-child(3)  { animation-delay: 0.5s; }
  .code-line:nth-child(4)  { animation-delay: 0.7s; }
  .code-line:nth-child(5)  { animation-delay: 0.9s; }
  .code-line:nth-child(6)  { animation-delay: 1.1s; }
  .code-line:nth-child(7)  { animation-delay: 1.3s; }
  .code-line:nth-child(8)  { animation-delay: 1.5s; }

  @keyframes typing {
    from { max-width: 0; opacity: 0; }
    to   { max-width: 100%; opacity: 1; }
  }

  /* ─── TABLE LEGEND ─── */
  .legend {
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
    margin-top: 16px;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.75rem;
    letter-spacing: 2px;
  }

  .legend-dot {
    width: 14px; height: 14px;
    border-radius: 50%;
    animation: legend-pulse 2s ease-in-out infinite;
  }

  .legend-dot-red  { background: var(--red);  box-shadow: 0 0 10px var(--red); }
  .legend-dot-cyan { background: var(--cyan); box-shadow: 0 0 10px var(--cyan); animation-delay: 1s; }

  @keyframes legend-pulse {
    0%,100% { transform: scale(1); opacity: 1; }
    50%      { transform: scale(1.3); opacity: 0.7; }
  }

  /* ─── FOOTER ─── */
  .footer {
    text-align: center;
    margin-top: 60px;
    padding-top: 30px;
    border-top: 1px solid var(--border);
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.72rem;
    letter-spacing: 3px;
    color: var(--muted);
  }

  .footer .access {
    color: var(--green);
    font-family: 'Orbitron', monospace;
    font-size: 1.1rem;
    letter-spacing: 8px;
    display: block;
    margin-bottom: 12px;
    animation: access-glow 3s ease-in-out infinite;
  }

  @keyframes access-glow {
    0%,100% { text-shadow: 0 0 10px var(--green), 0 0 25px rgba(0,255,136,0.3); }
    50%      { text-shadow: 0 0 25px var(--green), 0 0 60px rgba(0,255,136,0.5), 0 0 80px rgba(0,255,136,0.2); }
  }

  /* ─── SCROLL INDICATOR ─── */
  .scan-line-anim {
    position: fixed;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--cyan), transparent);
    animation: scan-x 4s linear infinite;
    z-index: 9998;
    opacity: 0.6;
  }

  @keyframes scan-x {
    0%   { transform: translateX(-100%); }
    100% { transform: translateX(100vw); }
  }

  /* ─── RESPONSIVE ─── */
  @media (max-width: 600px) {
    .panel { padding: 20px; }
    .feature-grid { grid-template-columns: 1fr; }
    .tech-grid { grid-template-columns: 1fr 1fr; }
  }
</style>
</head>
<body>

<div class="scan-line-anim"></div>

<div class="container">

  <!-- ══════════ HERO ══════════ -->
  <div class="hero">
    <div class="hero-badge">▶ SYSTEM ONLINE // V1.2</div>
    <h1 class="hero-title">
      <span class="line1">CAFÉ AROMA</span>
      <span class="line2">CYBER-ARTISAN PROTOCOL</span>
    </h1>
    <p class="hero-sub">// NEON-GRID OPTIMIZED ENVIRONMENT LOADED _</p>
  </div>

  <!-- Status Bar -->
  <div class="status-bar">
    <div class="status-item">
      <span class="status-dot dot-green"></span>STATUS: ONLINE
    </div>
    <div class="status-item">
      <span class="status-dot dot-cyan"></span>ENV: NEON-GRID
    </div>
    <div class="status-item">
      <span class="status-dot dot-red"></span>DB: CONNECTED
    </div>
    <div class="status-item">
      <span class="status-dot dot-green"></span>PROTOCOL: ACTIVE
    </div>
  </div>

  <!-- ══════════ SYSTEM OVERVIEW ══════════ -->
  <div class="divider"><span class="divider-icon">⚡</span>SYSTEM OVERVIEW<span class="divider-icon">⚡</span></div>

  <div class="panel" style="animation-delay:0.1s">
    <div class="section-heading">
      <span class="icon">🕹️</span>CUSTOMER HUD
      <span class="tag">FRONT-END MODULE</span>
    </div>
    <div class="feature-grid">
      <div class="feature-item">
        <span class="feature-label">NEON MENU</span>
        <span class="feature-desc">Rapid filtering with zero-latency category switching.</span>
      </div>
      <div class="feature-item">
        <span class="feature-label">CYBER-CART</span>
        <span class="feature-desc">Floating, state-of-the-art order relay system.</span>
      </div>
      <div class="feature-item">
        <span class="feature-label">TACTICAL BOOKING</span>
        <span class="feature-desc">Visual table selection integrated with the main ordering pipeline.</span>
      </div>
    </div>
  </div>

  <div class="panel panel-red" style="animation-delay:0.2s">
    <div class="section-heading section-heading-red">
      <span class="icon">🛡️</span>OPERATOR COMMAND
      <span class="tag" style="color:var(--red);background:rgba(255,0,85,0.06);border-color:rgba(255,0,85,0.2);">ADMIN MODULE</span>
    </div>
    <div class="feature-grid">
      <div class="feature-item feature-item-red">
        <span class="feature-label">HUD OVERLAY</span>
        <span class="feature-desc">Full-screen interface with scanline effects &amp; CRT flicker.</span>
      </div>
      <div class="feature-item feature-item-red">
        <span class="feature-label">LIVE FLOOR GRID</span>
        <span class="feature-desc">Real-time spatial map of the arena with live table states.</span>
      </div>
      <div class="feature-item feature-item-red">
        <span class="feature-label">DATA RELAY</span>
        <span class="feature-desc">Live telemetry for Revenue, Orders &amp; Terminal status.</span>
      </div>
    </div>
    <div class="legend">
      <div class="legend-item">
        <div class="legend-dot legend-dot-red"></div>
        <span style="color:var(--red);">HOSTILE // OCCUPIED</span>
      </div>
      <div class="legend-item">
        <div class="legend-dot legend-dot-cyan"></div>
        <span style="color:var(--cyan);">IDLE // AVAILABLE</span>
      </div>
    </div>
  </div>

  <!-- ══════════ TECH SPECS ══════════ -->
  <div class="divider"><span class="divider-icon">🛠️</span>TECH SPECS<span class="divider-icon">🛠️</span></div>

  <div class="panel panel-gold" style="animation-delay:0.3s">
    <div class="section-heading section-heading-gold">
      <span class="icon">⚙️</span>HARDWARE &amp; SOFTWARE
      <span class="tag" style="color:var(--gold);background:rgba(255,215,0,0.06);border-color:rgba(255,215,0,0.2);">CORE STACK</span>
    </div>
    <div class="tech-grid">
      <div class="tech-item">
        <span class="tech-icon">🟢</span>
        <div>
          <span class="tech-label">CORE ENGINE</span>
          <span class="tech-val">Node.js v18+</span>
        </div>
      </div>
      <div class="tech-item">
        <span class="tech-icon">🔵</span>
        <div>
          <span class="tech-label">DATA STORAGE</span>
          <span class="tech-val">MySQL 8.0</span>
        </div>
      </div>
      <div class="tech-item">
        <span class="tech-icon">🟡</span>
        <div>
          <span class="tech-label">INTERFACE</span>
          <span class="tech-val">Vanilla CSS3</span>
        </div>
      </div>
      <div class="tech-item">
        <span class="tech-icon">⚡</span>
        <div>
          <span class="tech-label">LOGIC LAYER</span>
          <span class="tech-val">ES6+ / Async</span>
        </div>
      </div>
    </div>
  </div>

  <!-- ══════════ FLOW DIAGRAM ══════════ -->
  <div class="divider"><span class="divider-icon">🔄</span>SYSTEM TELEMETRY<span class="divider-icon">🔄</span></div>

  <div class="panel" style="animation-delay:0.4s">
    <div class="section-heading">
      <span class="icon">📡</span>THE FLOW
      <span class="tag">SYNC: 60HZ</span>
    </div>
    <div class="flow-diagram">
      <div class="flow-row" style="animation-delay:0.1s">
        <div class="flow-node node-cyan">CUSTOMER</div>
        <div class="flow-arrow">──[ INTERACT ]──▶</div>
        <div class="flow-node node-cyan">CAFÉ UI PORTAL</div>
      </div>
      <div class="flow-row" style="animation-delay:0.25s">
        <div style="width:120px;"></div>
        <div class="flow-arrow" style="color:var(--cyan);">┌──[ DIRECT ORDER ]──▶</div>
        <div class="flow-node node-green">NEON CART</div>
        <div class="flow-arrow">──▶</div>
        <div class="flow-node node-red">MYSQL CORE</div>
      </div>
      <div class="flow-row" style="animation-delay:0.4s">
        <div style="width:120px;"></div>
        <div class="flow-arrow" style="color:var(--cyan);">└──[ BOOKING ]──▶</div>
        <div class="flow-node node-green">FLOOR MAP</div>
        <div class="flow-arrow">──▶</div>
        <div class="flow-node node-red" style="visibility:hidden;">MYSQL CORE</div>
      </div>
      <div class="flow-row" style="animation-delay:0.55s; margin-top:8px;">
        <div style="flex:1;border-top:1px solid rgba(255,0,85,0.3);margin:10px 0;"></div>
      </div>
      <div class="flow-row" style="animation-delay:0.65s">
        <div class="flow-node node-red">MYSQL CORE</div>
        <div class="flow-arrow">──[ SYNC ]──▶</div>
        <div class="flow-node node-cyan" style="border-color:var(--cyan);box-shadow:0 0 20px rgba(0,243,255,0.2);">ADMIN HUD</div>
        <div class="flow-arrow">──[ RENDER ]──▶</div>
        <div class="flow-node node-gold">MAP GRAPH</div>
      </div>
    </div>
  </div>

  <!-- ══════════ DEPLOY ══════════ -->
  <div class="divider"><span class="divider-icon">🚀</span>DEPLOY PROTOCOL<span class="divider-icon">🚀</span></div>

  <div class="panel" style="animation-delay:0.5s">
    <div class="section-heading">
      <span class="icon">💻</span>BOOT SEQUENCE
      <span class="tag">BASH // TERMINAL</span>
    </div>
    <div class="code-block">
      <div class="code-line"><span class="cmd-comment"># ── ACTIVATE ENVIRONMENT ──────────────────────────</span></div>
      <div class="code-line"><span class="cmd-prefix">$ </span><span class="cmd-keyword">git clone</span> <span class="cmd-val">https://github.com/sarthakmohitesm/cafe.git</span></div>
      <div class="code-line"><span class="cmd-prefix">$ </span><span class="cmd-keyword">cd</span> <span class="cmd-val">cafe</span></div>
      <div class="code-line">&nbsp;</div>
      <div class="code-line"><span class="cmd-comment"># ── INSTALL MODULES ───────────────────────────────</span></div>
      <div class="code-line"><span class="cmd-prefix">$ </span><span class="cmd-keyword">npm</span> <span class="cmd-val">install</span></div>
      <div class="code-line">&nbsp;</div>
      <div class="code-line"><span class="cmd-comment"># ── INITIAL BOOT ──────────────────────────────────</span></div>
      <div class="code-line"><span class="cmd-prefix">$ </span><span class="cmd-keyword">npm</span> <span class="cmd-val">start</span></div>
    </div>
  </div>

  <!-- ══════════ FOOTER ══════════ -->
  <div class="footer">
    <span class="access">[ ACCESS GRANTED ]</span>
    <span>DEVELOPED BY // ANTIGRAVITY AI SUB-PROTOCOL</span><br>
    <span style="margin-top:8px;display:block;">CAFÉ AROMA CYBER-ARTISAN PROTOCOL // V1.2 // ALL SYSTEMS NOMINAL</span>
  </div>

</div>
</body>
</html>