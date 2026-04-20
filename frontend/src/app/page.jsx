'use client';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState({});
  const sectionRefs = useRef({});

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) setVisible(v => ({ ...v, [e.target.id]: true }));
      }),
      { threshold: 0.15 }
    );
    Object.values(sectionRefs.current).forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const ref = (id) => (el) => { sectionRefs.current[id] = el; };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }

        body {
          font-family: 'Inter', sans-serif;
          background: #050b18;
          color: #e2e8f0;
          overflow-x: hidden;
        }

        :root {
          --cyan: #00d9ff;
          --cyan-dim: rgba(0,217,255,0.12);
          --cyan-glow: rgba(0,217,255,0.3);
          --purple: #7c3aed;
          --purple-dim: rgba(124,58,237,0.15);
          --bg: #050b18;
          --bg2: #0a1628;
          --border: rgba(255,255,255,0.07);
          --text: #e2e8f0;
          --muted: #64748b;
        }

        /* ── NOISE TEXTURE OVERLAY ── */
        body::before {
          content: '';
          position: fixed; inset: 0; z-index: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none; opacity: 0.4;
        }

        /* ── NAV ── */
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          padding: 0 5%;
          height: 68px;
          display: flex; align-items: center; justify-content: space-between;
          transition: all 0.4s ease;
        }
        .nav.scrolled {
          background: rgba(5,11,24,0.88);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border);
          box-shadow: 0 4px 30px rgba(0,0,0,0.3);
        }
        .nav-logo {
          font-size: 1.25rem; font-weight: 800; letter-spacing: -0.5px;
          color: var(--text); text-decoration: none;
          display: flex; align-items: center; gap: 0.5rem;
        }
        .nav-logo .dot { color: var(--cyan); }
        .nav-links { display: flex; align-items: center; gap: 2.5rem; list-style: none; }
        .nav-links a {
          color: var(--muted); text-decoration: none;
          font-size: 0.875rem; font-weight: 500;
          transition: color 0.2s;
        }
        .nav-links a:hover { color: var(--text); }
        .nav-actions { display: flex; gap: 0.75rem; align-items: center; }
        .btn-ghost {
          padding: 8px 20px; border-radius: 8px;
          border: 1px solid var(--border);
          color: var(--text); background: transparent;
          font-size: 0.875rem; font-weight: 500;
          text-decoration: none; cursor: pointer;
          transition: all 0.2s;
        }
        .btn-ghost:hover { border-color: rgba(255,255,255,0.2); background: rgba(255,255,255,0.05); }
        .btn-cta {
          padding: 8px 22px; border-radius: 8px;
          background: var(--cyan); color: #050b18;
          font-size: 0.875rem; font-weight: 700;
          text-decoration: none; cursor: pointer;
          border: none; transition: all 0.2s;
          box-shadow: 0 0 20px var(--cyan-glow);
        }
        .btn-cta:hover { background: #33e1ff; box-shadow: 0 0 30px rgba(0,217,255,0.5); transform: translateY(-1px); }

        /* ── HERO ── */
        .hero {
          min-height: 100vh;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          text-align: center;
          padding: 120px 5% 80px;
          position: relative;
        }
        .hero-glow {
          position: absolute; top: 10%; left: 50%; transform: translateX(-50%);
          width: 900px; height: 500px;
          background: radial-gradient(ellipse at center, rgba(0,217,255,0.08) 0%, rgba(124,58,237,0.06) 40%, transparent 70%);
          pointer-events: none;
        }
        .hero-badge {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 6px 16px; border-radius: 100px;
          border: 1px solid rgba(0,217,255,0.25);
          background: rgba(0,217,255,0.06);
          color: var(--cyan); font-size: 0.8rem; font-weight: 600;
          letter-spacing: 0.5px; text-transform: uppercase;
          margin-bottom: 2rem;
          animation: fadeUp 0.8s ease both;
        }
        .hero-badge .pulse {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--cyan);
          animation: pulse 2s ease infinite;
        }
        .hero-title {
          font-size: clamp(3rem, 8vw, 6.5rem);
          font-weight: 900; line-height: 1.0;
          letter-spacing: -2px;
          color: var(--text);
          margin-bottom: 1.5rem;
          animation: fadeUp 0.8s 0.1s ease both;
        }
        .hero-title .gradient-text {
          background: linear-gradient(135deg, #00d9ff 0%, #7c3aed 50%, #00d9ff 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientShift 4s ease infinite;
        }
        .hero-sub {
          font-size: clamp(1rem, 2vw, 1.2rem);
          color: var(--muted); max-width: 560px;
          line-height: 1.8; margin-bottom: 2.5rem;
          animation: fadeUp 0.8s 0.2s ease both;
        }
        .hero-sub strong { color: var(--text); font-weight: 600; }
        .hero-actions {
          display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center;
          margin-bottom: 4rem;
          animation: fadeUp 0.8s 0.3s ease both;
        }
        .btn-hero-primary {
          padding: 14px 32px; border-radius: 10px;
          background: var(--cyan); color: #050b18;
          font-size: 0.95rem; font-weight: 700;
          text-decoration: none; border: none;
          display: flex; align-items: center; gap: 0.5rem;
          box-shadow: 0 0 30px var(--cyan-glow), 0 4px 15px rgba(0,0,0,0.3);
          transition: all 0.25s;
        }
        .btn-hero-primary:hover { transform: translateY(-3px); box-shadow: 0 0 50px rgba(0,217,255,0.5), 0 8px 25px rgba(0,0,0,0.4); }
        .btn-hero-secondary {
          padding: 14px 32px; border-radius: 10px;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.12);
          color: var(--text); font-size: 0.95rem; font-weight: 600;
          text-decoration: none;
          display: flex; align-items: center; gap: 0.5rem;
          transition: all 0.25s; backdrop-filter: blur(10px);
        }
        .btn-hero-secondary:hover { border-color: rgba(255,255,255,0.25); background: rgba(255,255,255,0.04); transform: translateY(-2px); }
        .hero-meta {
          display: flex; gap: 2rem; justify-content: center; flex-wrap: wrap;
          animation: fadeUp 0.8s 0.4s ease both;
        }
        .meta-item { display: flex; align-items: center; gap: 0.5rem; color: var(--muted); font-size: 0.85rem; }
        .meta-item svg { color: var(--cyan); flex-shrink: 0; }

        /* ── TRUSTED ── */
        .trusted {
          padding: 2rem 5%;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          background: rgba(255,255,255,0.015);
          text-align: center;
        }
        .trusted p { color: var(--muted); font-size: 0.78rem; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 1.5rem; }
        .trusted-stats { display: flex; justify-content: center; gap: 4rem; flex-wrap: wrap; }
        .stat-item { text-align: center; }
        .stat-num { font-size: 1.75rem; font-weight: 800; color: var(--text); line-height: 1; }
        .stat-num span { color: var(--cyan); }
        .stat-label { font-size: 0.78rem; color: var(--muted); margin-top: 0.25rem; }

        /* ── SECTION BASE ── */
        .section { padding: 100px 5%; position: relative; z-index: 1; }
        .section-tag {
          display: inline-flex; align-items: center; gap: 0.4rem;
          color: var(--cyan); font-size: 0.78rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 2px;
          margin-bottom: 1rem;
        }
        .section-tag::before { content: ''; width: 20px; height: 2px; background: var(--cyan); border-radius: 2px; }
        .section-heading {
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          font-weight: 800; color: var(--text);
          letter-spacing: -1px; line-height: 1.15;
          margin-bottom: 1rem;
        }
        .section-sub { color: var(--muted); font-size: 1rem; max-width: 480px; line-height: 1.7; }
        .reveal { opacity: 0; transform: translateY(28px); transition: all 0.65s ease; }
        .reveal.show { opacity: 1; transform: translateY(0); }

        /* ── HOW IT WORKS ── */
        .steps { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem; margin-top: 3.5rem; }
        .step-card {
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 16px; padding: 2rem 1.75rem;
          position: relative; overflow: hidden;
          transition: all 0.3s;
        }
        .step-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, var(--cyan), transparent);
          opacity: 0; transition: opacity 0.3s;
        }
        .step-card:hover { border-color: rgba(0,217,255,0.2); transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.3); }
        .step-card:hover::before { opacity: 1; }
        .step-num {
          font-size: 0.72rem; font-weight: 700;
          color: var(--cyan); letter-spacing: 2px;
          text-transform: uppercase; margin-bottom: 1.25rem;
        }
        .step-icon {
          width: 44px; height: 44px; border-radius: 10px;
          background: var(--cyan-dim); border: 1px solid rgba(0,217,255,0.15);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 1.25rem; color: var(--cyan);
        }
        .step-title { font-size: 1rem; font-weight: 700; color: var(--text); margin-bottom: 0.5rem; }
        .step-desc { font-size: 0.875rem; color: var(--muted); line-height: 1.6; }

        /* ── CONNECTOR ── */
        .steps-wrapper { position: relative; }
        .steps-wrapper::before {
          content: '';
          position: absolute; top: 50%; left: 10%; right: 10%;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--cyan-dim), transparent);
          pointer-events: none;
        }

        /* ── FEATURES ── */
        .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-top: 3.5rem; }
        .feature-card {
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 16px; padding: 2rem;
          transition: all 0.3s; position: relative; overflow: hidden;
        }
        .feature-card::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, var(--cyan-dim), transparent);
          opacity: 0; transition: opacity 0.3s; border-radius: inherit;
          pointer-events: none;
        }
        .feature-card:hover { border-color: rgba(0,217,255,0.2); transform: translateY(-4px); box-shadow: 0 16px 48px rgba(0,0,0,0.3); }
        .feature-card:hover::after { opacity: 1; }
        .feature-icon {
          width: 48px; height: 48px; border-radius: 12px;
          background: var(--cyan-dim); border: 1px solid rgba(0,217,255,0.15);
          display: flex; align-items: center; justify-content: center;
          color: var(--cyan); margin-bottom: 1.25rem;
        }
        .feature-title { font-size: 1.05rem; font-weight: 700; color: var(--text); margin-bottom: 0.5rem; }
        .feature-desc { font-size: 0.875rem; color: var(--muted); line-height: 1.65; }

        /* ── CTA ── */
        .cta-section {
          margin: 0 5% 80px;
          border-radius: 24px;
          background: linear-gradient(135deg, #0a1628 0%, #0d1f3c 100%);
          border: 1px solid rgba(0,217,255,0.12);
          padding: 80px 10%;
          text-align: center; position: relative; overflow: hidden;
        }
        .cta-section::before {
          content: '';
          position: absolute; top: -50%; left: 50%; transform: translateX(-50%);
          width: 600px; height: 400px;
          background: radial-gradient(ellipse, rgba(0,217,255,0.07) 0%, transparent 70%);
          pointer-events: none;
        }
        .cta-title { font-size: clamp(1.8rem, 4vw, 3rem); font-weight: 800; color: var(--text); margin-bottom: 1rem; letter-spacing: -1px; }
        .cta-sub { color: var(--muted); font-size: 1.05rem; max-width: 440px; margin: 0 auto 2.5rem; line-height: 1.7; }

        /* ── FOOTER ── */
        footer {
          border-top: 1px solid var(--border);
          padding: 2.5rem 5%;
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 1rem;
          color: var(--muted); font-size: 0.82rem;
        }
        footer a { color: var(--muted); text-decoration: none; transition: color 0.2s; }
        footer a:hover { color: var(--text); }
        .footer-links { display: flex; gap: 1.5rem; }

        /* ── ANIMATIONS ── */
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.8)} }
        @keyframes gradientShift { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }

        @media (max-width: 768px) {
          .nav-links { display: none; }
          .hero-title { letter-spacing: -1px; }
          .trusted-stats { gap: 2rem; }
          footer { justify-content: center; text-align: center; }
        }
      `}</style>

      {/* NAV */}
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <Link href="/" className="nav-logo">
          NextgenFolio<span className="dot"> AI</span>
        </Link>
        <ul className="nav-links">
          <li><a href="#how-it-works">How it works</a></li>
          <li><a href="#features">Features</a></li>
          <li><Link href="/terms">Terms</Link></li>
        </ul>
        <div className="nav-actions">
          <Link href="/login" className="btn-ghost">Log in</Link>
          <Link href="/signup" className="btn-cta">Get started</Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-glow" />
        <div className="hero-badge">
          <span className="pulse" />
          AI-Powered Portfolio Generator
        </div>
        <h1 className="hero-title">
          Your resume,<br />
          <span className="gradient-text">transformed.</span>
        </h1>
        <p className="hero-sub">
          Upload your CV and get a <strong>stunning personal portfolio website</strong> in under 5 minutes. Beautiful themes, ready to deploy.
        </p>
        <div className="hero-actions">
          <Link href="/signup" className="btn-hero-primary">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            Start for free
          </Link>
          <Link href="/login" className="btn-hero-secondary">
            Sign in
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
          </Link>
        </div>
        <div className="hero-meta">
          {[
            { icon: <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>, text: 'No credit card required' },
            { icon: <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>, text: 'Ready in under 5 minutes' },
            { icon: <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>, text: '25+ beautiful themes' },
          ].map((m, i) => (
            <div className="meta-item" key={i}>
              {m.icon}{m.text}
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <div className="trusted">
        <p>Trusted by developers worldwide</p>
        <div className="trusted-stats">
          {[['10K', '+ Portfolios created'], ['99', '% Satisfaction rate'], ['5', ' Min average time'], ['25', '+ Themes available']].map(([num, label], i) => (
            <div className="stat-item" key={i}>
              <div className="stat-num"><span>{num}</span>{label.split(' ')[0]}</div>
              <div className="stat-label">{label.split(' ').slice(1).join(' ')}</div>
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section className="section" id="how-it-works">
        <div
          className={`reveal${visible['hiw'] ? ' show' : ''}`}
          id="hiw" ref={ref('hiw')}
        >
          <div className="section-tag">Process</div>
          <h2 className="section-heading">Four steps to your portfolio</h2>
          <p className="section-sub">From resume to deployed website in minutes. No coding required.</p>
        </div>
        <div className="steps steps-wrapper">
          {[
            {
              num: '01', title: 'Upload Resume', desc: 'Drop your PDF resume or CV. Our parser extracts all your data instantly.',
              icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            },
            {
              num: '02', title: 'AI Analysis', desc: 'Our AI reads your experience, skills, and projects with precision.',
              icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2"/></svg>
            },
            {
              num: '03', title: 'Choose Theme', desc: 'Pick from 25+ curated themes — dark, light, creative, corporate, and more.',
              icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/></svg>
            },
            {
              num: '04', title: 'Export & Deploy', desc: 'Download a complete HTML file ready to upload anywhere. Yours forever.',
              icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
            },
          ].map((s, i) => (
            <div className={`step-card reveal${visible[`step${i}`] ? ' show' : ''}`} id={`step${i}`} ref={ref(`step${i}`)} key={i} style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="step-num">{s.num}</div>
              <div className="step-icon">{s.icon}</div>
              <div className="step-title">{s.title}</div>
              <div className="step-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="section" id="features">
        <div className={`reveal${visible['feat'] ? ' show' : ''}`} id="feat" ref={ref('feat')}>
          <div className="section-tag">Features</div>
          <h2 className="section-heading">Everything you need</h2>
          <p className="section-sub">Built for developers and designers who want a portfolio that stands out.</p>
        </div>
        <div className="features-grid">
          {[
            {
              title: 'AI Content Extraction', desc: 'Automatically pulls your skills, experience, education and projects from any PDF resume format.',
              icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            },
            {
              title: '25+ Premium Themes', desc: 'From dark cyberpunk to clean minimal — every theme is handcrafted and looks great on all screens.',
              icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/></svg>
            },
            {
              title: 'One-Click Download', desc: 'Get a fully self-contained HTML file. Host it on GitHub Pages, Netlify, or any static host for free.',
              icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
            },
            {
              title: 'Live Theme Preview', desc: 'Switch between themes instantly and see exactly how your portfolio will look before downloading.',
              icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
            },
            {
              title: 'Photo Detection', desc: 'If your resume includes a profile photo URL, it\'s automatically displayed in your hero section.',
              icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            },
            {
              title: 'Save & Share', desc: 'Save multiple portfolios, share them with a unique link, and revisit them anytime from your dashboard.',
              icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
            },
          ].map((f, i) => (
            <div
              className={`feature-card reveal${visible[`feat${i}`] ? ' show' : ''}`}
              id={`feat${i}`} ref={ref(`feat${i}`)} key={i}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="feature-icon">{f.icon}</div>
              <div className="feature-title">{f.title}</div>
              <div className="feature-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className={`cta-section reveal${visible['cta'] ? ' show' : ''}`} id="cta" ref={ref('cta')}>
        <h2 className="cta-title">Ready to stand out?</h2>
        <p className="cta-sub">Join thousands of developers who turned their resumes into stunning portfolios in minutes.</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/signup" className="btn-hero-primary" style={{ fontSize: '0.95rem', padding: '13px 30px' }}>
            Create my portfolio
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <span>© {new Date().getFullYear()} NextgenFolio AI</span>
        <div className="footer-links">
          <Link href="/terms">Terms</Link>
          <Link href="/login">Login</Link>
          <Link href="/signup">Sign up</Link>
        </div>
      </footer>
    </>
  );
}
