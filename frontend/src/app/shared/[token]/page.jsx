"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import PortfolioPreview from "@/components/PortfolioPreview"
import Link from "next/link"

export default function SharedPortfolioPage() {
  const params = useParams()
  const token = params.token
  const [portfolio, setPortfolio] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!token) return
    const fetch_ = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/portfolio/shared/${token}`)
        if (!res.ok) throw new Error("Portfolio not found or no longer public")
        setPortfolio(await res.json())
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetch_()
  }, [token])

  const CSS = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
    *,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
    body{font-family:'Inter',sans-serif;background:#050b18;color:#e2e8f0;min-height:100vh;}
    :root{--cyan:#00d9ff;--cyan-dim:rgba(0,217,255,0.08);--cyan-glow:rgba(0,217,255,0.25);--bg:#050b18;--bg2:#0a1628;--border:rgba(255,255,255,0.07);--border-cyan:rgba(0,217,255,0.18);--text:#e2e8f0;--muted:#64748b;--muted2:#94a3b8;}
    @keyframes spin{to{transform:rotate(360deg);}}
    @keyframes fadeUp{from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:translateY(0);}}
    @keyframes pulse{0%,100%{opacity:0.6;transform:scale(1);}50%{opacity:1;transform:scale(1.05);}}
  `

  if (isLoading) {
    return (
      <>
        <style>{CSS}</style>
        <div style={{ minHeight: "100vh", background: "#050b18", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ width: 48, height: 48, border: "3px solid rgba(0,217,255,0.15)", borderTopColor: "#00d9ff", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 1rem" }} />
            <div style={{ color: "#64748b", fontSize: "0.875rem", fontWeight: 600 }}>Loading portfolio...</div>
          </div>
        </div>
      </>
    )
  }

  if (error || !portfolio) {
    return (
      <>
        <style>{CSS}</style>
        <div style={{ minHeight: "100vh", background: "#050b18", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
          <div style={{ textAlign: "center", maxWidth: 420 }}>
            {/* Icon */}
            <div style={{ width: 64, height: 64, borderRadius: 16, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#f87171" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            </div>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#e2e8f0", marginBottom: "0.5rem", letterSpacing: "-0.5px" }}>Portfolio not found</h1>
            <p style={{ color: "#64748b", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "2rem" }}>This portfolio doesn&apos;t exist or is no longer public.</p>
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "10px 24px", borderRadius: 10, background: "#00d9ff", color: "#050b18", fontWeight: 700, fontSize: "0.875rem", textDecoration: "none", boxShadow: "0 0 20px rgba(0,217,255,0.3)" }}>
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
              Back to home
            </Link>
          </div>
        </div>
      </>
    )
  }

  const date = new Date(portfolio.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })

  return (
    <>
      <style>{CSS}</style>

      <div style={{ minHeight: "100vh", background: "#050b18" }}>

        {/* TOP NAV */}
        <nav style={{ position: "sticky", top: 0, zIndex: 100, height: 60, padding: "0 5%", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(5,11,24,0.9)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <Link href="/" style={{ fontSize: "1.1rem", fontWeight: 800, color: "#e2e8f0", textDecoration: "none" }}>
            NextgenFolio<span style={{ color: "#00d9ff" }}> AI</span>
          </Link>
          <Link href="/signup" style={{ padding: "7px 18px", borderRadius: 8, background: "#00d9ff", color: "#050b18", fontSize: "0.82rem", fontWeight: 700, textDecoration: "none", boxShadow: "0 0 16px rgba(0,217,255,0.3)" }}>
            Create your own →
          </Link>
        </nav>

        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "2rem 1.5rem", animation: "fadeUp 0.5s ease both" }}>

          {/* INFO CARD */}
          <div style={{ background: "#0a1628", border: "1px solid rgba(0,217,255,0.18)", borderRadius: 16, padding: "1.5rem 2rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
            <div>
              {/* Title */}
              <h1 style={{ fontSize: "clamp(1.2rem, 3vw, 1.75rem)", fontWeight: 800, color: "#e2e8f0", letterSpacing: "-0.5px", marginBottom: "0.4rem" }}>
                {portfolio.title}
              </h1>
              {portfolio.description && (
                <p style={{ color: "#64748b", fontSize: "0.875rem", marginBottom: "0.75rem" }}>{portfolio.description}</p>
              )}
              {/* Meta tags */}
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
                <span style={{ padding: "3px 10px", borderRadius: 100, background: "rgba(0,217,255,0.08)", border: "1px solid rgba(0,217,255,0.18)", color: "#00d9ff", fontSize: "0.72rem", fontWeight: 700 }}>
                  {portfolio.template || "modern"}
                </span>
                <span style={{ padding: "3px 10px", borderRadius: 100, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: "#94a3b8", fontSize: "0.72rem", fontWeight: 600 }}>
                  {portfolio.theme || "dark"} theme
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", padding: "3px 10px", borderRadius: 100, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: "#94a3b8", fontSize: "0.72rem", fontWeight: 600 }}>
                  <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                  {portfolio.shareCount || 0} views
                </span>
                <span style={{ color: "#475569", fontSize: "0.72rem" }}>Created {date}</span>
              </div>
            </div>

            {/* CTA */}
            <Link href="/signup" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "10px 22px", borderRadius: 10, background: "#00d9ff", color: "#050b18", fontWeight: 700, fontSize: "0.85rem", textDecoration: "none", boxShadow: "0 0 20px rgba(0,217,255,0.3)", flexShrink: 0, whiteSpace: "nowrap" }}>
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              Create yours free
            </Link>
          </div>

          {/* PREVIEW WRAPPER */}
          <div style={{ background: "#0a1628", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, overflow: "hidden" }}>
            {/* Browser bar */}
            <div style={{ padding: "0.7rem 1rem", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.02)" }}>
              <div style={{ display: "flex", gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.12)" }} />
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(0,217,255,0.3)" }} />
              </div>
              <div style={{ fontSize: "0.72rem", fontWeight: 600, color: "#475569", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                Live preview
              </div>
              <div style={{ width: 60 }} />
            </div>

            {/* The actual portfolio */}
            <PortfolioPreview html={portfolio.content} theme={portfolio.theme || "dark"} />
          </div>

          {/* FOOTER */}
          <div style={{ textAlign: "center", marginTop: "2rem", paddingBottom: "2rem" }}>
            <p style={{ color: "#334155", fontSize: "0.78rem", marginBottom: "0.75rem" }}>
              Built with NextgenFolio AI — turn your resume into a stunning portfolio
            </p>
            <Link href="/signup" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "9px 20px", borderRadius: 8, border: "1px solid rgba(0,217,255,0.2)", background: "rgba(0,217,255,0.06)", color: "#00d9ff", fontSize: "0.8rem", fontWeight: 700, textDecoration: "none", transition: "all 0.2s" }}>
              Generate your own portfolio →
            </Link>
          </div>

        </div>
      </div>
    </>
  )
}
