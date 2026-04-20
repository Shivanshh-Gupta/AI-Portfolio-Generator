export const htmlThemes = {
  // ── Classic ──────────────────────────────────────────────────
  light: `
:root {
  --bg-color: #ffffff;
  --bg-secondary: #f1f5f9;
  --bg-card: rgba(241, 245, 249, 0.9);
  --text-color: #111827;
  --text-muted: #6b7280;
  --primary-color: #2563eb;
  --primary-glow: rgba(37, 99, 235, 0.25);
  --border-color: rgba(37, 99, 235, 0.2);
  --nav-bg: rgba(255, 255, 255, 0.92);
}
body { background: #ffffff !important; color: #111827 !important; }
nav { background: rgba(255,255,255,0.92) !important; border-bottom: 1px solid rgba(37,99,235,0.15) !important; }
section:nth-child(even) { background: #f1f5f9 !important; }
footer { background: #f8fafc !important; border-top: 1px solid rgba(37,99,235,0.15) !important; }
.card { background: rgba(241,245,249,0.9) !important; border-color: rgba(37,99,235,0.15) !important; }
.skill-tag { background: rgba(241,245,249,0.9) !important; }
.contact-item { background: rgba(241,245,249,0.9) !important; }
.btn-primary { color: #ffffff !important; }
.btn-primary:hover { color: #2563eb !important; }
`,

  dark: `
:root {
  --bg-color: #0a192f;
  --bg-secondary: #0d2137;
  --bg-card: rgba(13, 33, 55, 0.85);
  --text-color: #ccd6f6;
  --text-muted: #8892b0;
  --primary-color: #00d9ff;
  --primary-glow: rgba(0, 217, 255, 0.25);
  --border-color: rgba(0, 217, 255, 0.18);
  --nav-bg: rgba(10, 25, 47, 0.92);
}
`,

  // ── Professional ─────────────────────────────────────────────
  corporate: `
:root {
  --bg-color: #f8fafc;
  --bg-secondary: #f1f5f9;
  --bg-card: rgba(255, 255, 255, 0.95);
  --text-color: #1e293b;
  --text-muted: #64748b;
  --primary-color: #0f172a;
  --primary-glow: rgba(15, 23, 42, 0.15);
  --border-color: rgba(15, 23, 42, 0.15);
  --nav-bg: rgba(248, 250, 252, 0.95);
}
body { background: #f8fafc !important; color: #1e293b !important; }
nav { background: rgba(248,250,252,0.95) !important; }
section:nth-child(even) { background: #f1f5f9 !important; }
footer { background: #f8fafc !important; }
.card { background: rgba(255,255,255,0.95) !important; }
.skill-tag { background: rgba(241,245,249,0.9) !important; color: #0f172a !important; }
.contact-item { background: rgba(255,255,255,0.95) !important; }
.btn-primary { color: #ffffff !important; background: #0f172a !important; }
`,

  navy: `
:root {
  --bg-color: #0f172a;
  --bg-secondary: #1e293b;
  --bg-card: rgba(30, 41, 59, 0.85);
  --text-color: #e2e8f0;
  --text-muted: #94a3b8;
  --primary-color: #3b82f6;
  --primary-glow: rgba(59, 130, 246, 0.25);
  --border-color: rgba(59, 130, 246, 0.2);
  --nav-bg: rgba(15, 23, 42, 0.95);
}
body { background: #0f172a !important; color: #e2e8f0 !important; }
section:nth-child(even) { background: #1e293b !important; }
footer { background: #0f172a !important; }
`,

  slate: `
:root {
  --bg-color: #1e293b;
  --bg-secondary: #334155;
  --bg-card: rgba(51, 65, 85, 0.85);
  --text-color: #f1f5f9;
  --text-muted: #94a3b8;
  --primary-color: #64748b;
  --primary-glow: rgba(100, 116, 139, 0.25);
  --border-color: rgba(100, 116, 139, 0.3);
  --nav-bg: rgba(30, 41, 59, 0.95);
}
body { background: #1e293b !important; color: #f1f5f9 !important; }
section:nth-child(even) { background: #334155 !important; }
footer { background: #1e293b !important; }
`,

  // ── Tech ─────────────────────────────────────────────────────
  cyberpunk: `
:root {
  --bg-color: #18181b;
  --bg-secondary: #09090b;
  --bg-card: rgba(24, 24, 27, 0.9);
  --text-color: #fafafa;
  --text-muted: #a1a1aa;
  --primary-color: #a855f7;
  --primary-glow: rgba(168, 85, 247, 0.35);
  --border-color: rgba(168, 85, 247, 0.3);
  --nav-bg: rgba(9, 9, 11, 0.95);
}
body { background: #18181b !important; color: #fafafa !important; }
section:nth-child(even) { background: #09090b !important; }
footer { background: #18181b !important; }
`,

  neon: `
:root {
  --bg-color: #0a0a0a;
  --bg-secondary: #111111;
  --bg-card: rgba(17, 17, 17, 0.9);
  --text-color: #fafafa;
  --text-muted: #a1a1aa;
  --primary-color: #22d3ee;
  --primary-glow: rgba(34, 211, 238, 0.35);
  --border-color: rgba(34, 211, 238, 0.25);
  --nav-bg: rgba(0, 0, 0, 0.95);
}
body { background: #0a0a0a !important; color: #fafafa !important; }
section:nth-child(even) { background: #111111 !important; }
footer { background: #0a0a0a !important; }
`,

  matrix: `
:root {
  --bg-color: #010a01;
  --bg-secondary: #001a00;
  --bg-card: rgba(0, 26, 0, 0.9);
  --text-color: #00ff41;
  --text-muted: #00bb30;
  --primary-color: #39ff14;
  --primary-glow: rgba(57, 255, 20, 0.3);
  --border-color: rgba(57, 255, 20, 0.25);
  --nav-bg: rgba(1, 10, 1, 0.97);
}
body { background: #010a01 !important; color: #00ff41 !important; font-family: 'Courier New', monospace !important; }
section:nth-child(even) { background: #001a00 !important; }
footer { background: #010a01 !important; }
h1,h2,h3,h4 { color: #39ff14 !important; }
`,

  // ── Vibrant ──────────────────────────────────────────────────
  sunset: `
:root {
  --bg-color: #1a0a00;
  --bg-secondary: #2d1200;
  --bg-card: rgba(45, 18, 0, 0.85);
  --text-color: #fff7ed;
  --text-muted: #fed7aa;
  --primary-color: #fb923c;
  --primary-glow: rgba(251, 146, 60, 0.35);
  --border-color: rgba(251, 146, 60, 0.25);
  --nav-bg: rgba(26, 10, 0, 0.95);
}
body { background: #1a0a00 !important; color: #fff7ed !important; }
section:nth-child(even) { background: #2d1200 !important; }
footer { background: #1a0a00 !important; }
`,

  ocean: `
:root {
  --bg-color: #001f3f;
  --bg-secondary: #00294d;
  --bg-card: rgba(0, 41, 77, 0.85);
  --text-color: #e0f7fa;
  --text-muted: #80deea;
  --primary-color: #06b6d4;
  --primary-glow: rgba(6, 182, 212, 0.3);
  --border-color: rgba(6, 182, 212, 0.25);
  --nav-bg: rgba(0, 31, 63, 0.95);
}
body { background: #001f3f !important; color: #e0f7fa !important; }
section:nth-child(even) { background: #00294d !important; }
footer { background: #001f3f !important; }
`,

  forest: `
:root {
  --bg-color: #052e16;
  --bg-secondary: #064e3b;
  --bg-card: rgba(6, 78, 59, 0.85);
  --text-color: #d1fae5;
  --text-muted: #6ee7b7;
  --primary-color: #22c55e;
  --primary-glow: rgba(34, 197, 94, 0.3);
  --border-color: rgba(34, 197, 94, 0.25);
  --nav-bg: rgba(5, 46, 22, 0.95);
}
body { background: #052e16 !important; color: #d1fae5 !important; }
section:nth-child(even) { background: #064e3b !important; }
footer { background: #052e16 !important; }
`,

  // ── Elegant ──────────────────────────────────────────────────
  gold: `
:root {
  --bg-color: #1a1200;
  --bg-secondary: #2d1f00;
  --bg-card: rgba(45, 31, 0, 0.85);
  --text-color: #fef3c7;
  --text-muted: #fde68a;
  --primary-color: #f59e0b;
  --primary-glow: rgba(245, 158, 11, 0.35);
  --border-color: rgba(245, 158, 11, 0.25);
  --nav-bg: rgba(26, 18, 0, 0.95);
}
body { background: #1a1200 !important; color: #fef3c7 !important; }
section:nth-child(even) { background: #2d1f00 !important; }
footer { background: #1a1200 !important; }
h1,h2 { text-shadow: 0 0 20px rgba(245,158,11,0.4); }
`,

  platinum: `
:root {
  --bg-color: #f9fafb;
  --bg-secondary: #f3f4f6;
  --bg-card: rgba(255, 255, 255, 0.95);
  --text-color: #374151;
  --text-muted: #6b7280;
  --primary-color: #6b7280;
  --primary-glow: rgba(107, 114, 128, 0.2);
  --border-color: rgba(107, 114, 128, 0.2);
  --nav-bg: rgba(249, 250, 251, 0.95);
}
body { background: #f9fafb !important; color: #374151 !important; }
nav { background: rgba(249,250,251,0.95) !important; }
section:nth-child(even) { background: #f3f4f6 !important; }
footer { background: #f9fafb !important; }
.card { background: rgba(255,255,255,0.95) !important; }
.btn-primary { color: #ffffff !important; }
`,

  emerald: `
:root {
  --bg-color: #022c22;
  --bg-secondary: #064e3b;
  --bg-card: rgba(6, 78, 59, 0.85);
  --text-color: #d1fae5;
  --text-muted: #6ee7b7;
  --primary-color: #10b981;
  --primary-glow: rgba(16, 185, 129, 0.3);
  --border-color: rgba(16, 185, 129, 0.25);
  --nav-bg: rgba(2, 44, 34, 0.95);
}
body { background: #022c22 !important; color: #d1fae5 !important; }
section:nth-child(even) { background: #064e3b !important; }
footer { background: #022c22 !important; }
`,

  // ── Artistic ─────────────────────────────────────────────────
  valentine: `
:root {
  --bg-color: #1a0010;
  --bg-secondary: #2d0020;
  --bg-card: rgba(45, 0, 32, 0.85);
  --text-color: #ffe4f0;
  --text-muted: #fca5cb;
  --primary-color: #ec4899;
  --primary-glow: rgba(236, 72, 153, 0.35);
  --border-color: rgba(236, 72, 153, 0.25);
  --nav-bg: rgba(26, 0, 16, 0.95);
}
body { background: #1a0010 !important; color: #ffe4f0 !important; }
section:nth-child(even) { background: #2d0020 !important; }
footer { background: #1a0010 !important; }
`,

  lavender: `
:root {
  --bg-color: #1a0a2e;
  --bg-secondary: #2d1050;
  --bg-card: rgba(45, 16, 80, 0.85);
  --text-color: #f3e8ff;
  --text-muted: #d8b4fe;
  --primary-color: #a855f7;
  --primary-glow: rgba(168, 85, 247, 0.35);
  --border-color: rgba(168, 85, 247, 0.25);
  --nav-bg: rgba(26, 10, 46, 0.95);
}
body { background: #1a0a2e !important; color: #f3e8ff !important; }
section:nth-child(even) { background: #2d1050 !important; }
footer { background: #1a0a2e !important; }
`,

  coral: `
:root {
  --bg-color: #1a0505;
  --bg-secondary: #2d0d0d;
  --bg-card: rgba(45, 13, 13, 0.85);
  --text-color: #fff5f5;
  --text-muted: #fca5a5;
  --primary-color: #ff6b6b;
  --primary-glow: rgba(255, 107, 107, 0.35);
  --border-color: rgba(255, 107, 107, 0.25);
  --nav-bg: rgba(26, 5, 5, 0.95);
}
body { background: #1a0505 !important; color: #fff5f5 !important; }
section:nth-child(even) { background: #2d0d0d !important; }
footer { background: #1a0505 !important; }
`,

  mint: `
:root {
  --bg-color: #001a17;
  --bg-secondary: #00292a;
  --bg-card: rgba(0, 41, 42, 0.85);
  --text-color: #f0fdfa;
  --text-muted: #99f6e4;
  --primary-color: #14b8a6;
  --primary-glow: rgba(20, 184, 166, 0.3);
  --border-color: rgba(20, 184, 166, 0.25);
  --nav-bg: rgba(0, 26, 23, 0.95);
}
body { background: #001a17 !important; color: #f0fdfa !important; }
section:nth-child(even) { background: #00292a !important; }
footer { background: #001a17 !important; }
`,

  // ── Bold ─────────────────────────────────────────────────────
  midnight: `
:root {
  --bg-color: #0d0d1a;
  --bg-secondary: #1a1a3e;
  --bg-card: rgba(26, 26, 62, 0.85);
  --text-color: #e0e7ff;
  --text-muted: #a5b4fc;
  --primary-color: #818cf8;
  --primary-glow: rgba(129, 140, 248, 0.35);
  --border-color: rgba(129, 140, 248, 0.25);
  --nav-bg: rgba(13, 13, 26, 0.97);
}
body { background: #0d0d1a !important; color: #e0e7ff !important; }
section:nth-child(even) { background: #1a1a3e !important; }
footer { background: #0d0d1a !important; }
`,

  ruby: `
:root {
  --bg-color: #1a0000;
  --bg-secondary: #2d0000;
  --bg-card: rgba(45, 0, 0, 0.85);
  --text-color: #fef2f2;
  --text-muted: #fca5a5;
  --primary-color: #ef4444;
  --primary-glow: rgba(239, 68, 68, 0.35);
  --border-color: rgba(239, 68, 68, 0.25);
  --nav-bg: rgba(26, 0, 0, 0.97);
}
body { background: #1a0000 !important; color: #fef2f2 !important; }
section:nth-child(even) { background: #2d0000 !important; }
footer { background: #1a0000 !important; }
`,

  monochrome: `
:root {
  --bg-color: #000000;
  --bg-secondary: #111111;
  --bg-card: rgba(17, 17, 17, 0.9);
  --text-color: #f5f5f5;
  --text-muted: #a3a3a3;
  --primary-color: #e5e5e5;
  --primary-glow: rgba(229, 229, 229, 0.2);
  --border-color: rgba(229, 229, 229, 0.15);
  --nav-bg: rgba(0, 0, 0, 0.97);
}
body { background: #000000 !important; color: #f5f5f5 !important; }
section:nth-child(even) { background: #111111 !important; }
footer { background: #000000 !important; }
`,
}
