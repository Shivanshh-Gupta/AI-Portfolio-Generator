'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const sections = [
  {
    id: 'acceptance',
    title: 'Acceptance of Terms',
    icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
    content: `By accessing and using NextgenFolio AI, you accept and agree to be bound by these terms and conditions. If you do not agree to these terms, please do not use our service. We reserve the right to modify these terms at any time, and such modifications shall be effective immediately upon posting.`,
  },
  {
    id: 'privacy',
    title: 'Privacy & Data Usage',
    icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>,
    content: `Your privacy is important to us. When you upload your resume to NextgenFolio AI:`,
    bullets: [
      'We use AI to analyze and extract information from your resume',
      'Your resume data is processed to generate your portfolio',
      'We do not sell or share your personal information with third parties',
      'You retain full ownership of your data and generated portfolios',
    ],
  },
  {
    id: 'ai-content',
    title: 'AI-Generated Content',
    icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2"/></svg>,
    content: `Our service uses artificial intelligence to generate portfolio content. Please be aware that:`,
    bullets: [
      'AI-generated content may occasionally contain inaccuracies',
      'You are responsible for reviewing and verifying all generated content',
      'We do not guarantee the accuracy of AI-generated portfolios',
      'The quality of output depends on the information provided in your resume',
    ],
  },
  {
    id: 'usage',
    title: 'Acceptable Use',
    icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>,
    content: `You agree to use NextgenFolio AI only for lawful purposes. You must not:`,
    bullets: [
      'Upload content that infringes on any third-party intellectual property rights',
      'Attempt to reverse engineer or copy our AI systems',
      'Use the service to generate misleading or fraudulent content',
      'Attempt to gain unauthorized access to our systems or other users\' accounts',
    ],
  },
  {
    id: 'ip',
    title: 'Intellectual Property',
    icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"/></svg>,
    content: `The NextgenFolio AI platform, including its design, code, and AI models, is the intellectual property of NextgenFolio AI. The portfolios you generate using our service belong to you. However, we may use anonymized data and outputs to improve our AI systems.`,
  },
  {
    id: 'limitation',
    title: 'Limitation of Liability',
    icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>,
    content: `NextgenFolio AI is provided "as is" without any warranties. We shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the service. Our total liability shall not exceed the amount you paid for the service in the 12 months prior to the claim.`,
  },
  {
    id: 'termination',
    title: 'Termination',
    icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/></svg>,
    content: `We reserve the right to suspend or terminate your account at any time if you violate these terms. Upon termination, your right to use the service ceases immediately. You may delete your account at any time from your account settings.`,
  },
  {
    id: 'contact',
    title: 'Contact',
    icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>,
    content: `If you have any questions about these Terms & Conditions, please contact us. We aim to respond to all inquiries within 48 hours.`,
  },
];

export default function TermsPage() {
  const [active, setActive] = useState('acceptance');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Inter', sans-serif; background: #050b18; color: #e2e8f0; overflow-x: hidden; }

        :root {
          --cyan: #00d9ff;
          --cyan-dim: rgba(0,217,255,0.1);
          --cyan-glow: rgba(0,217,255,0.25);
          --bg: #050b18;
          --bg2: #0a1628;
          --border: rgba(255,255,255,0.07);
          --text: #e2e8f0;
          --muted: #64748b;
        }

        /* NAV */
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          padding: 0 5%; height: 68px;
          display: flex; align-items: center; justify-content: space-between;
          transition: all 0.4s ease;
        }
        .nav.scrolled { background: rgba(5,11,24,0.9); backdrop-filter: blur(20px); border-bottom: 1px solid var(--border); }
        .nav-logo { font-size: 1.2rem; font-weight: 800; color: var(--text); text-decoration: none; }
        .nav-logo span { color: var(--cyan); }
        .nav-links-row { display: flex; align-items: center; gap: 2rem; list-style: none; }
        .nav-links-row a { color: var(--muted); text-decoration: none; font-size: 0.875rem; font-weight: 500; transition: color 0.2s; }
        .nav-links-row a:hover, .nav-links-row a.active { color: var(--text); }
        .nav-actions { display: flex; gap: 0.75rem; align-items: center; }
        .btn-ghost { padding: 8px 18px; border-radius: 8px; border: 1px solid var(--border); color: var(--text); background: transparent; font-size: 0.85rem; font-weight: 500; text-decoration: none; transition: all 0.2s; }
        .btn-ghost:hover { border-color: rgba(255,255,255,0.2); background: rgba(255,255,255,0.05); }
        .btn-cta { padding: 8px 20px; border-radius: 8px; background: var(--cyan); color: #050b18; font-size: 0.85rem; font-weight: 700; text-decoration: none; transition: all 0.2s; box-shadow: 0 0 16px var(--cyan-glow); }
        .btn-cta:hover { background: #33e1ff; transform: translateY(-1px); }

        /* PAGE */
        .page-wrap { max-width: 1100px; margin: 0 auto; padding: 120px 5% 80px; }

        /* HEADER */
        .page-header { text-align: center; margin-bottom: 4rem; }
        .page-tag { display: inline-flex; align-items: center; gap: 0.4rem; padding: 5px 14px; border-radius: 100px; border: 1px solid rgba(0,217,255,0.2); background: rgba(0,217,255,0.06); color: var(--cyan); font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 1.25rem; }
        .page-title { font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 900; color: var(--text); letter-spacing: -1.5px; line-height: 1.1; margin-bottom: 1rem; }
        .page-title span { color: var(--cyan); }
        .page-date { color: var(--muted); font-size: 0.85rem; display: flex; align-items: center; justify-content: center; gap: 0.4rem; }
        .page-date svg { color: var(--cyan); }

        /* LAYOUT */
        .terms-layout { display: grid; grid-template-columns: 220px 1fr; gap: 2.5rem; align-items: start; }

        /* SIDEBAR */
        .sidebar { position: sticky; top: 90px; }
        .sidebar-label { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: var(--muted); margin-bottom: 0.75rem; padding-left: 0.75rem; }
        .sidebar-nav { display: flex; flex-direction: column; gap: 2px; }
        .sidebar-item {
          display: flex; align-items: center; gap: 0.6rem;
          padding: 8px 12px; border-radius: 8px;
          color: var(--muted); font-size: 0.835rem; font-weight: 500;
          text-decoration: none; cursor: pointer;
          border: 1px solid transparent;
          transition: all 0.2s; background: none;
          text-align: left; width: 100%;
        }
        .sidebar-item:hover { color: var(--text); background: rgba(255,255,255,0.04); }
        .sidebar-item.active { color: var(--cyan); background: var(--cyan-dim); border-color: rgba(0,217,255,0.15); }
        .sidebar-item svg { flex-shrink: 0; opacity: 0.7; }
        .sidebar-item.active svg { opacity: 1; }

        /* CONTENT */
        .terms-content { display: flex; flex-direction: column; gap: 1.5rem; }
        .term-card {
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 16px; padding: 2rem;
          transition: border-color 0.3s;
          scroll-margin-top: 90px;
        }
        .term-card:hover { border-color: rgba(0,217,255,0.15); }
        .term-card.active-section { border-color: rgba(0,217,255,0.25); box-shadow: 0 0 0 1px rgba(0,217,255,0.08), 0 8px 32px rgba(0,0,0,0.3); }
        .term-head { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.25rem; }
        .term-icon { width: 36px; height: 36px; border-radius: 9px; background: var(--cyan-dim); border: 1px solid rgba(0,217,255,0.15); display: flex; align-items: center; justify-content: center; color: var(--cyan); flex-shrink: 0; }
        .term-title { font-size: 1rem; font-weight: 700; color: var(--text); }
        .term-body { color: var(--muted); font-size: 0.9rem; line-height: 1.75; }
        .term-bullets { margin-top: 0.9rem; display: flex; flex-direction: column; gap: 0.5rem; }
        .term-bullet { display: flex; align-items: flex-start; gap: 0.6rem; color: var(--muted); font-size: 0.875rem; line-height: 1.6; }
        .term-bullet::before { content: ''; width: 5px; height: 5px; border-radius: 50%; background: var(--cyan); flex-shrink: 0; margin-top: 0.55rem; }

        /* FOOTER */
        .terms-footer { margin-top: 3rem; padding-top: 2rem; border-top: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; flex-wrap: gap; color: var(--muted); font-size: 0.82rem; gap: 1rem; }
        .terms-footer a { color: var(--cyan); text-decoration: none; font-weight: 500; }
        .terms-footer a:hover { text-decoration: underline; }

        @media (max-width: 768px) {
          .terms-layout { grid-template-columns: 1fr; }
          .sidebar { position: static; }
          .nav-links-row { display: none; }
        }
      `}</style>

      {/* NAV */}
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <Link href="/" className="nav-logo">NextgenFolio<span> AI</span></Link>
        <ul className="nav-links-row">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/#how-it-works">How it works</Link></li>
          <li><Link href="/#features">Features</Link></li>
          <li><Link href="/terms" className="active">Terms</Link></li>
        </ul>
        <div className="nav-actions">
          <Link href="/login" className="btn-ghost">Log in</Link>
          <Link href="/signup" className="btn-cta">Get started</Link>
        </div>
      </nav>

      <div className="page-wrap">
        {/* HEADER */}
        <div className="page-header">
          <div className="page-tag">Legal</div>
          <h1 className="page-title">Terms <span>&</span> Conditions</h1>
          <p className="page-date">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            Last updated: April 9, 2026
          </p>
        </div>

        {/* LAYOUT */}
        <div className="terms-layout">
          {/* SIDEBAR */}
          <aside className="sidebar">
            <div className="sidebar-label">Contents</div>
            <nav className="sidebar-nav">
              {sections.map(s => (
                <button
                  key={s.id}
                  className={`sidebar-item${active === s.id ? ' active' : ''}`}
                  onClick={() => {
                    setActive(s.id);
                    document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  {s.icon}
                  {s.title}
                </button>
              ))}
            </nav>
          </aside>

          {/* CONTENT */}
          <div className="terms-content">
            {sections.map(s => (
              <div
                key={s.id}
                id={s.id}
                className={`term-card${active === s.id ? ' active-section' : ''}`}
                onClick={() => setActive(s.id)}
              >
                <div className="term-head">
                  <div className="term-icon">{s.icon}</div>
                  <div className="term-title">{s.title}</div>
                </div>
                <div className="term-body">
                  {s.content}
                  {s.bullets && (
                    <div className="term-bullets">
                      {s.bullets.map((b, i) => (
                        <div className="term-bullet" key={i}>{b}</div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            <div className="terms-footer">
              <span>© {new Date().getFullYear()} NextgenFolio AI. All rights reserved.</span>
              <Link href="/">← Back to home</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
