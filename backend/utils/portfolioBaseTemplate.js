/**
 * Premium base CSS template for AI-generated portfolios.
 * Injected into the AI prompt so the model only fills content, not CSS.
 * Uses CSS variables so the theme switcher works.
 */
const PORTFOLIO_BASE_CSS = `
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

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

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; }

  body {
    font-family: 'Inter', sans-serif;
    background: var(--bg-color);
    color: var(--text-color);
    line-height: 1.7;
    overflow-x: hidden;
  }

  /* ── NAV ── */
  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
    background: var(--nav-bg);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border-color);
    padding: 0 5%;
    height: 70px;
    display: flex; align-items: center; justify-content: space-between;
    transition: background 0.3s;
  }
  .nav-logo {
    font-size: 1.4rem; font-weight: 800;
    color: var(--text-color); text-decoration: none;
  }
  .nav-logo span { color: var(--primary-color); }
  .nav-links { display: flex; gap: 2rem; list-style: none; }
  .nav-links a {
    color: var(--text-muted); text-decoration: none;
    font-size: 0.9rem; font-weight: 500;
    transition: color 0.3s;
    position: relative;
  }
  .nav-links a::after {
    content: ''; position: absolute; bottom: -4px; left: 0;
    width: 0; height: 2px;
    background: var(--primary-color);
    transition: width 0.3s;
  }
  .nav-links a:hover { color: var(--primary-color); }
  .nav-links a:hover::after { width: 100%; }
  .nav-toggle { display: none; background: none; border: none; color: var(--text-color); font-size: 1.5rem; cursor: pointer; }

  /* ── HERO ── */
  #hero {
    min-height: 100vh;
    display: flex; align-items: center;
    padding: 100px 5% 60px;
    background: var(--bg-color);
    position: relative; overflow: hidden;
  }
  #hero::before {
    content: '';
    position: absolute; top: -30%; left: 50%; transform: translateX(-50%);
    width: 800px; height: 800px;
    background: radial-gradient(circle, var(--primary-glow) 0%, transparent 70%);
    pointer-events: none;
    animation: pulse-glow 6s ease-in-out infinite;
  }
  .hero-content { position: relative; z-index: 1; max-width: 700px; }
  .hero-greeting { color: var(--primary-color); font-size: 1rem; font-weight: 600; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 1rem; }
  .hero-name {
    font-size: clamp(2.8rem, 6vw, 5rem);
    font-weight: 900; line-height: 1.1;
    color: var(--text-color);
    margin-bottom: 0.5rem;
  }
  .hero-title {
    font-size: clamp(1.2rem, 3vw, 1.8rem);
    color: var(--primary-color);
    font-weight: 600; margin-bottom: 1.5rem;
  }
  .hero-bio { color: var(--text-muted); font-size: 1.05rem; max-width: 550px; margin-bottom: 2.5rem; }
  .hero-buttons { display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 2.5rem; }
  .btn-primary {
    padding: 14px 32px; border-radius: 8px;
    background: var(--primary-color); color: #0a192f;
    font-weight: 700; font-size: 0.95rem;
    text-decoration: none; border: 2px solid var(--primary-color);
    transition: all 0.3s; cursor: pointer;
    box-shadow: 0 0 20px var(--primary-glow);
  }
  .btn-primary:hover { background: transparent; color: var(--primary-color); transform: translateY(-3px); box-shadow: 0 0 30px var(--primary-glow); }
  .btn-outline {
    padding: 14px 32px; border-radius: 8px;
    background: transparent; color: var(--primary-color);
    font-weight: 700; font-size: 0.95rem;
    text-decoration: none; border: 2px solid var(--primary-color);
    transition: all 0.3s; cursor: pointer;
  }
  .btn-outline:hover { background: var(--primary-color); color: #0a192f; transform: translateY(-3px); box-shadow: 0 0 20px var(--primary-glow); }
  .hero-socials { display: flex; gap: 1rem; }
  .social-link {
    width: 42px; height: 42px; border-radius: 50%;
    border: 1px solid var(--border-color);
    display: flex; align-items: center; justify-content: center;
    color: var(--text-muted); text-decoration: none;
    transition: all 0.3s;
  }
  .social-link:hover { border-color: var(--primary-color); color: var(--primary-color); box-shadow: 0 0 12px var(--primary-glow); transform: translateY(-3px); }
  .hero-photo {
    width: 320px; height: 320px; border-radius: 50%;
    object-fit: cover;
    border: 3px solid var(--primary-color);
    box-shadow: 0 0 40px var(--primary-glow), 0 0 80px rgba(0,217,255,0.1);
    position: absolute; right: 10%; top: 50%; transform: translateY(-50%);
    animation: float 6s ease-in-out infinite;
  }

  /* ── SECTIONS ── */
  section { padding: 90px 5%; }
  section:nth-child(even) { background: var(--bg-secondary); }
  .section-title {
    font-size: clamp(1.6rem, 3vw, 2.2rem);
    font-weight: 800; margin-bottom: 0.5rem;
    color: var(--text-color);
  }
  .section-title span { color: var(--primary-color); }
  .section-line {
    width: 60px; height: 3px;
    background: var(--primary-color);
    border-radius: 2px; margin-bottom: 3rem;
    box-shadow: 0 0 10px var(--primary-glow);
  }

  /* ── CARDS ── */
  .card {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 12px; padding: 2rem;
    backdrop-filter: blur(10px);
    transition: all 0.3s;
    margin-bottom: 1.5rem;
  }
  .card:hover { transform: translateY(-6px); box-shadow: 0 12px 40px var(--primary-glow); border-color: var(--primary-color); }
  .card-title { font-size: 1.15rem; font-weight: 700; color: var(--text-color); margin-bottom: 0.3rem; }
  .card-subtitle { color: var(--primary-color); font-size: 0.9rem; font-weight: 600; margin-bottom: 0.5rem; }
  .card-meta { color: var(--text-muted); font-size: 0.85rem; margin-bottom: 0.8rem; }
  .card p { color: var(--text-muted); font-size: 0.95rem; }

  /* ── SKILLS GRID ── */
  .skills-grid { display: flex; flex-wrap: wrap; gap: 0.75rem; }
  .skill-tag {
    padding: 8px 18px; border-radius: 20px;
    background: var(--bg-card); border: 1px solid var(--border-color);
    color: var(--primary-color); font-size: 0.85rem; font-weight: 600;
    transition: all 0.3s; cursor: default;
  }
  .skill-tag:hover { background: var(--primary-color); color: #0a192f; box-shadow: 0 0 12px var(--primary-glow); transform: translateY(-2px); }

  /* ── PROJECTS GRID ── */
  .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; }

  /* ── TIMELINE ── */
  .timeline { position: relative; padding-left: 2rem; }
  .timeline::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 2px; background: var(--border-color); }
  .timeline-item { position: relative; margin-bottom: 2.5rem; }
  .timeline-item::before {
    content: ''; position: absolute; left: -2.4rem; top: 6px;
    width: 12px; height: 12px; border-radius: 50%;
    background: var(--primary-color);
    box-shadow: 0 0 10px var(--primary-glow);
  }

  /* ── CONTACT ── */
  .contact-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; }
  .contact-item {
    background: var(--bg-card); border: 1px solid var(--border-color);
    border-radius: 10px; padding: 1.5rem; text-align: center;
    transition: all 0.3s;
  }
  .contact-item:hover { border-color: var(--primary-color); box-shadow: 0 0 20px var(--primary-glow); transform: translateY(-4px); }
  .contact-label { color: var(--text-muted); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.5rem; }
  .contact-value { color: var(--text-color); font-weight: 600; font-size: 0.95rem; word-break: break-all; }
  .contact-value a { color: var(--primary-color); text-decoration: none; }

  /* ── FOOTER ── */
  footer {
    text-align: center; padding: 2.5rem 5%;
    background: var(--bg-color);
    border-top: 1px solid var(--border-color);
    color: var(--text-muted); font-size: 0.9rem;
  }
  footer a { color: var(--primary-color); text-decoration: none; }

  /* ── ANIMATIONS ── */
  @keyframes float { 0%,100%{transform:translateY(-50%) translateX(0)} 50%{transform:translateY(calc(-50% - 15px)) translateX(0)} }
  @keyframes pulse-glow { 0%,100%{opacity:0.5;transform:translateX(-50%) scale(1)} 50%{opacity:1;transform:translateX(-50%) scale(1.1)} }
  @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
  .reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.6s ease, transform 0.6s ease; }
  .reveal.visible { opacity: 1; transform: translateY(0); }

  /* ── RESPONSIVE ── */
  @media (max-width: 768px) {
    .nav-links { display: none; flex-direction: column; position: absolute; top: 70px; left: 0; right: 0; background: var(--nav-bg); padding: 1rem 5%; border-bottom: 1px solid var(--border-color); }
    .nav-links.open { display: flex; }
    .nav-toggle { display: block; }
    #hero { padding-top: 120px; text-align: center; }
    .hero-buttons { justify-content: center; }
    .hero-socials { justify-content: center; }
    .hero-photo { position: static; transform: none; width: 200px; height: 200px; margin: 2rem auto 0; display: block; animation: none; }
  }

  @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation: none !important; transition: none !important; } }
</style>`;

module.exports = { PORTFOLIO_BASE_CSS };
