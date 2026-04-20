"use client"

import { useState, useEffect, useRef, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import PortfolioPreview from "@/components/PortfolioPreview"
import { htmlThemes } from "@/config/htmlThemes"
import { portfolioTemplates } from "@/config/portfolioTemplates"
import Link from "next/link"

export default function ImagePage() {
  return (
    <Suspense fallback={null}>
      <ImageUploadComponent />
    </Suspense>
  )
}

/* ─── ICONS ─────────────────────────────────────────── */
const Icon = {
  upload: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>,
  template: <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/></svg>,
  theme: <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/></svg>,
  dl: <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>,
  save: <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/></svg>,
  share: <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>,
  folder: <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"/></svg>,
  spark: <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>,
  refresh: <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>,
  chevron: (open) => <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" style={{transform: open?'rotate(180deg)':'none',transition:'transform 0.2s'}}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>,
  check: <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#00d9ff" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>,
  close: <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>,
  eye: <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>,
  trash: <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>,
  logout: <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>,
  copy: <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>,
  lock: <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>,
}

/* ─── CSS ─────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
html{scroll-behavior:smooth;}
body{font-family:'Inter',sans-serif;background:#050b18;color:#e2e8f0;overflow-x:hidden;}

:root{
  --cyan:#00d9ff; --cyan-dim:rgba(0,217,255,0.08); --cyan-glow:rgba(0,217,255,0.25);
  --bg:#050b18; --bg2:#0a1628; --bg3:rgba(10,22,40,0.8);
  --border:rgba(255,255,255,0.07); --border-cyan:rgba(0,217,255,0.18);
  --text:#e2e8f0; --muted:#64748b; --muted2:#94a3b8;
}

/* NAV */
.app-nav{
  position:fixed;top:0;left:0;right:0;z-index:100;
  height:60px;padding:0 2rem;
  display:flex;align-items:center;justify-content:space-between;
  background:rgba(5,11,24,0.9);backdrop-filter:blur(16px);
  border-bottom:1px solid var(--border);
}
.app-nav-logo{font-size:1.1rem;font-weight:800;color:var(--text);text-decoration:none;}
.app-nav-logo span{color:var(--cyan);}
.nav-user{display:flex;align-items:center;gap:0.5rem;position:relative;}
.user-btn{
  display:flex;align-items:center;gap:0.6rem;
  padding:5px 12px 5px 5px;border-radius:100px;
  background:rgba(255,255,255,0.04);border:1px solid var(--border);
  cursor:pointer;transition:all 0.2s;
}
.user-btn:hover{border-color:rgba(255,255,255,0.14);background:rgba(255,255,255,0.07);}
.avatar{
  width:28px;height:28px;border-radius:50%;
  background:linear-gradient(135deg,var(--cyan),#7c3aed);
  display:flex;align-items:center;justify-content:center;
  font-size:0.75rem;font-weight:700;color:#050b18;flex-shrink:0;
}
.user-name{font-size:0.82rem;font-weight:600;color:var(--text);}
.user-dropdown{
  position:absolute;top:calc(100% + 8px);right:0;
  width:230px;background:#0d1f3c;border:1px solid var(--border-cyan);
  border-radius:12px;overflow:hidden;
  box-shadow:0 16px 48px rgba(0,0,0,0.5);
  animation:dropIn 0.15s ease both;
}
@keyframes dropIn{from{opacity:0;transform:translateY(-8px);}to{opacity:1;transform:translateY(0);}}
.dropdown-header{padding:12px 14px;border-bottom:1px solid var(--border);}
.dropdown-header .d-name{font-size:0.85rem;font-weight:700;color:var(--text);}
.dropdown-header .d-email{font-size:0.75rem;color:var(--muted);margin-top:2px;word-break:break-all;}
.dropdown-item{
  width:100%;padding:10px 14px;border:none;
  background:transparent;cursor:pointer;
  display:flex;align-items:center;gap:0.6rem;
  font-size:0.82rem;font-weight:500;
  transition:all 0.15s;text-align:left;
}
.dropdown-item:hover{background:rgba(255,255,255,0.04);}
.dropdown-item.danger{color:#f87171;}
.dropdown-item.danger:hover{background:rgba(239,68,68,0.08);}

/* PAGE LAYOUT */
.app-wrap{
  min-height:100vh;
  padding-top:60px;
  display:grid;
  grid-template-columns:300px 1fr;
  grid-template-rows:auto;
}
@media(max-width:900px){.app-wrap{grid-template-columns:1fr;}}

/* SIDEBAR */
.sidebar{
  height:calc(100vh - 60px);
  position:sticky;top:60px;
  overflow-y:auto;
  border-right:1px solid var(--border);
  padding:1.5rem 1rem;
  display:flex;flex-direction:column;gap:0.75rem;
  background:rgba(5,11,24,0.6);
}
.sidebar::-webkit-scrollbar{width:4px;}
.sidebar::-webkit-scrollbar-track{background:transparent;}
.sidebar::-webkit-scrollbar-thumb{background:var(--border-cyan);border-radius:2px;}

/* PANEL CARDS */
.panel{background:var(--bg2);border:1px solid var(--border);border-radius:12px;overflow:hidden;transition:border-color 0.2s;}
.panel:hover{border-color:var(--border-cyan);}
.panel-head{padding:0.9rem 1rem;display:flex;align-items:center;gap:0.5rem;border-bottom:1px solid var(--border);}
.panel-label{font-size:0.75rem;font-weight:700;color:var(--muted2);text-transform:uppercase;letter-spacing:0.5px;}
.panel-icon{color:var(--cyan);display:flex;}
.panel-body{padding:0.9rem;}

/* UPLOAD ZONE */
.upload-zone{
  border:1.5px dashed var(--border-cyan);border-radius:10px;padding:1.5rem 1rem;
  text-align:center;cursor:pointer;transition:all 0.2s;
  background:var(--cyan-dim);position:relative;overflow:hidden;
}
.upload-zone:hover{border-color:var(--cyan);background:rgba(0,217,255,0.12);}
.upload-zone input{position:absolute;inset:0;opacity:0;cursor:pointer;}
.upload-icon{width:36px;height:36px;border-radius:8px;background:rgba(0,217,255,0.12);border:1px solid var(--border-cyan);display:flex;align-items:center;justify-content:center;margin:0 auto 0.6rem;color:var(--cyan);}
.upload-title{font-size:0.85rem;font-weight:600;color:var(--text);margin-bottom:0.25rem;}
.upload-sub{font-size:0.72rem;color:var(--muted);}
.file-badge{
  margin-top:0.75rem;padding:6px 10px;border-radius:6px;
  background:rgba(0,217,255,0.08);border:1px solid var(--border-cyan);
  display:flex;align-items:center;gap:0.4rem;
  font-size:0.75rem;color:var(--cyan);font-weight:600;text-align:left;
}
.file-badge svg{flex-shrink:0;}

/* SIDEBAR BUTTONS */
.sidebar-btn{
  width:100%;padding:10px 14px;border-radius:10px;border:none;
  font-size:0.83rem;font-weight:600;cursor:pointer;
  display:flex;align-items:center;justify-content:center;gap:0.5rem;
  transition:all 0.2s;
}
.sidebar-btn.primary{background:var(--cyan);color:#050b18;box-shadow:0 0 18px var(--cyan-glow);}
.sidebar-btn.primary:hover{background:#33e1ff;transform:translateY(-1px);box-shadow:0 0 28px rgba(0,217,255,0.4);}
.sidebar-btn.primary:disabled{opacity:0.4;cursor:not-allowed;transform:none;}
.sidebar-btn.outline{background:transparent;border:1px solid var(--border-cyan);color:var(--cyan);}
.sidebar-btn.outline:hover{background:var(--cyan-dim);}
.sidebar-btn.ghost{background:rgba(255,255,255,0.03);border:1px solid var(--border);color:var(--muted2);}
.sidebar-btn.ghost:hover{border-color:var(--border-cyan);color:var(--text);}

/* SELECT */
.styled-select{
  width:100%;padding:9px 12px;border-radius:8px;
  background:rgba(255,255,255,0.04);border:1px solid var(--border);
  color:var(--text);font-size:0.82rem;font-family:'Inter',sans-serif;
  outline:none;cursor:pointer;transition:border-color 0.2s;
  -webkit-appearance:none;
}
.styled-select:focus{border-color:var(--border-cyan);}
.styled-select option,.styled-select optgroup{background:#0a1628;color:#e2e8f0;}

/* TEMPLATE LIST */
.template-list{display:flex;flex-direction:column;gap:4px;max-height:200px;overflow-y:auto;margin-top:0.5rem;}
.template-list::-webkit-scrollbar{width:3px;}
.template-list::-webkit-scrollbar-thumb{background:var(--border-cyan);border-radius:2px;}
.tpl-item{
  width:100%;padding:8px 10px;border-radius:7px;border:none;
  cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:0.5rem;
  background:rgba(255,255,255,0.02);transition:all 0.15s;text-align:left;
}
.tpl-item:hover,.tpl-item.active{background:var(--cyan-dim);border:1px solid var(--border-cyan);}
.tpl-item .tpl-name{font-size:0.8rem;font-weight:600;color:var(--text);}
.tpl-item .tpl-desc{font-size:0.7rem;color:var(--muted);margin-top:1px;}

/* MODE TOGGLE */
.mode-row{display:grid;grid-template-columns:1fr 1fr;gap:6px;}
.mode-btn{
  padding:8px 6px;border-radius:8px;border:1px solid var(--border);
  background:transparent;color:var(--muted2);font-size:0.75rem;font-weight:600;
  cursor:pointer;transition:all 0.2s;display:flex;align-items:center;justify-content:center;gap:0.3rem;
}
.mode-btn.active{border-color:var(--cyan);background:var(--cyan-dim);color:var(--cyan);}
.mode-btn:hover:not(.active){border-color:var(--border-cyan);color:var(--text);}

/* MAIN AREA */
.main-area{padding:1.5rem;display:flex;flex-direction:column;gap:1rem;}

/* EMPTY STATE */
.empty-state{
  flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;
  text-align:center;padding:4rem 2rem;
  border:1.5px dashed var(--border);border-radius:16px;
  background:rgba(255,255,255,0.015);
}
.empty-icon{width:56px;height:56px;border-radius:14px;background:var(--cyan-dim);border:1px solid var(--border-cyan);display:flex;align-items:center;justify-content:center;color:var(--cyan);margin:0 auto 1.25rem;}
.empty-title{font-size:1.1rem;font-weight:700;color:var(--text);margin-bottom:0.4rem;}
.empty-sub{font-size:0.85rem;color:var(--muted);line-height:1.6;max-width:320px;}
.empty-steps{display:flex;gap:1.5rem;margin-top:2rem;flex-wrap:wrap;justify-content:center;}
.empty-step{display:flex;align-items:center;gap:0.4rem;font-size:0.78rem;color:var(--muted2);}
.step-num{width:20px;height:20px;border-radius:50%;background:var(--cyan-dim);border:1px solid var(--border-cyan);color:var(--cyan);font-size:0.7rem;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;}

/* PREVIEW AREA */
.preview-wrap{background:var(--bg2);border:1px solid var(--border);border-radius:14px;overflow:hidden;}
.preview-topbar{
  padding:0.75rem 1rem;border-bottom:1px solid var(--border);
  display:flex;align-items:center;justify-content:space-between;
  background:rgba(255,255,255,0.02);
}
.browser-dots{display:flex;gap:5px;align-items:center;}
.browser-dot{width:10px;height:10px;border-radius:50%;}
.preview-label{font-size:0.75rem;font-weight:600;color:var(--muted);display:flex;align-items:center;gap:0.4rem;}
.preview-label span{color:var(--cyan);}
.preview-actions{display:flex;gap:0.4rem;}
.preview-action{
  padding:5px 10px;border-radius:6px;border:1px solid var(--border);
  background:transparent;color:var(--muted2);font-size:0.72rem;font-weight:600;
  cursor:pointer;transition:all 0.2s;display:flex;align-items:center;gap:0.3rem;
}
.preview-action:hover{border-color:var(--border-cyan);color:var(--cyan);}
.preview-action.cyan{background:var(--cyan);color:#050b18;border-color:var(--cyan);}
.preview-action.cyan:hover{background:#33e1ff;}

/* SPINNER */
.spinner{width:15px;height:15px;border-radius:50%;border:2px solid rgba(5,11,24,0.3);border-top-color:#050b18;animation:spin 0.6s linear infinite;}
@keyframes spin{to{transform:rotate(360deg);}}
.spinner-white{width:14px;height:14px;border-radius:50%;border:2px solid rgba(255,255,255,0.15);border-top-color:var(--muted2);animation:spin 0.6s linear infinite;}

/* MODALS */
.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.75);backdrop-filter:blur(6px);z-index:999;display:flex;align-items:center;justify-content:center;padding:1rem;animation:fadeIn 0.15s ease;}
@keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
.modal{background:#0d1f3c;border:1px solid var(--border-cyan);border-radius:16px;width:100%;max-width:480px;box-shadow:0 24px 64px rgba(0,0,0,0.6);animation:scaleIn 0.15s ease both;}
@keyframes scaleIn{from{opacity:0;transform:scale(0.96);}to{opacity:1;transform:scale(1);}}
.modal-head{padding:1.25rem 1.5rem;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;}
.modal-title{font-size:1rem;font-weight:700;color:var(--text);}
.modal-close{background:none;border:none;color:var(--muted);cursor:pointer;padding:4px;border-radius:4px;display:flex;transition:color 0.15s;}
.modal-close:hover{color:var(--text);}
.modal-body{padding:1.25rem 1.5rem;display:flex;flex-direction:column;gap:0.9rem;}
.modal-footer{padding:1rem 1.5rem;border-top:1px solid var(--border);display:flex;gap:0.6rem;}
.modal-label{font-size:0.78rem;font-weight:600;color:var(--muted2);margin-bottom:0.35rem;}
.modal-input{
  width:100%;padding:9px 12px;border-radius:8px;
  background:rgba(255,255,255,0.04);border:1px solid var(--border);
  color:var(--text);font-size:0.85rem;font-family:'Inter',sans-serif;
  outline:none;transition:border-color 0.2s;
}
.modal-input:focus{border-color:var(--border-cyan);}
.modal-input::placeholder{color:var(--muted);}
.modal-btn{
  flex:1;padding:9px;border-radius:8px;border:none;
  font-size:0.85rem;font-weight:600;cursor:pointer;transition:all 0.2s;
}
.modal-btn.primary{background:var(--cyan);color:#050b18;box-shadow:0 0 16px var(--cyan-glow);}
.modal-btn.primary:hover{background:#33e1ff;}
.modal-btn.ghost{background:rgba(255,255,255,0.04);color:var(--muted2);border:1px solid var(--border);}
.modal-btn.ghost:hover{border-color:var(--border-cyan);color:var(--text);}

/* PORTFOLIOS MODAL */
.portfolios-modal{max-width:720px;max-height:80vh;display:flex;flex-direction:column;}
.portfolios-list{overflow-y:auto;flex:1;display:flex;flex-direction:column;gap:0.6rem;padding:1rem 1.5rem;}
.portfolios-list::-webkit-scrollbar{width:4px;}
.portfolios-list::-webkit-scrollbar-thumb{background:var(--border-cyan);border-radius:2px;}
.p-card{background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:10px;padding:1rem;display:flex;align-items:flex-start;justify-content:space-between;gap:1rem;transition:border-color 0.2s;}
.p-card:hover,.p-card.active{border-color:var(--border-cyan);}
.p-card-info{flex:1;min-width:0;}
.p-card-title{font-size:0.875rem;font-weight:700;color:var(--text);margin-bottom:0.2rem;}
.p-card-desc{font-size:0.75rem;color:var(--muted);margin-bottom:0.5rem;}
.p-card-meta{display:flex;gap:0.75rem;flex-wrap:wrap;}
.p-tag{font-size:0.68rem;color:var(--muted2);background:rgba(255,255,255,0.04);padding:2px 7px;border-radius:4px;}
.p-actions{display:flex;gap:0.4rem;flex-shrink:0;}
.p-btn{
  padding:5px 10px;border-radius:6px;border:1px solid var(--border);
  background:transparent;color:var(--muted2);font-size:0.72rem;font-weight:600;
  cursor:pointer;transition:all 0.2s;display:flex;align-items:center;gap:0.3rem;
}
.p-btn:hover{border-color:var(--border-cyan);color:var(--cyan);}
.p-btn.danger:hover{border-color:rgba(239,68,68,0.4);color:#f87171;}

/* SHARE INPUT */
.share-input-row{display:flex;gap:0.5rem;}
.share-url{flex:1;padding:9px 12px;background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:8px;color:var(--muted2);font-size:0.78rem;font-family:'Inter',sans-serif;outline:none;}

/* LOADING OVERLAY */
.loading-over{position:absolute;inset:0;background:rgba(5,11,24,0.85);backdrop-filter:blur(4px);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0.75rem;border-radius:inherit;}
.loading-spinner{width:36px;height:36px;border-radius:50%;border:3px solid rgba(0,217,255,0.15);border-top-color:var(--cyan);animation:spin 0.8s linear infinite;}
.loading-text{font-size:0.85rem;font-weight:600;color:var(--muted2);}

@keyframes fadeUp{from{opacity:0;transform:translateY(12px);}to{opacity:1;transform:translateY(0);}}
`

/* ─── MAIN COMPONENT ─────────────────────────────────── */
function ImageUploadComponent() {
  const searchParams = useSearchParams()
  const dropdownRef = useRef(null)

  const [selectedImage, setSelectedImage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isApplyingTemplate, setIsApplyingTemplate] = useState(false)
  const [loadingMsg, setLoadingMsg] = useState("Generating...")
  const [portfolioHtml, setPortfolioHtml] = useState(null)
  const [theme, setTheme] = useState("dark")
  const [generationMode, setGenerationMode] = useState("new")
  const [selectedTemplate, setSelectedTemplate] = useState("modern")
  const [showTemplates, setShowTemplates] = useState(false)
  const [showSaveModal, setShowSaveModal] = useState(false)
  const [saveTitle, setSaveTitle] = useState("")
  const [saveDescription, setSaveDescription] = useState("")
  const [savedPortfolios, setSavedPortfolios] = useState([])
  const [showPortfoliosList, setShowPortfoliosList] = useState(false)
  const [currentPortfolioId, setCurrentPortfolioId] = useState(null)
  const [showShareModal, setShowShareModal] = useState(false)
  const [shareUrl, setShareUrl] = useState("")
  const [copied, setCopied] = useState(false)

  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [showAccountModal, setShowAccountModal] = useState(false)

  useEffect(() => {
    const token = searchParams.get("token")
    const user = searchParams.get("user")
    if (token && user) {
      localStorage.setItem("token", token)
      localStorage.setItem("user", user)
      window.history.replaceState({}, "", "/image")
    }
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        const u = JSON.parse(storedUser)
        setUserName(u.name || "")
        setUserEmail(u.email || "")
      } catch (_) {}
    }
  }, [searchParams])

  useEffect(() => {
    const close = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setShowProfileDropdown(false)
    }
    if (showProfileDropdown) document.addEventListener("click", close)
    return () => document.removeEventListener("click", close)
  }, [showProfileDropdown])

  useEffect(() => { fetchPortfolios() }, [])

  const handleUpload = async () => {
    if (!selectedImage) return alert("Select a PDF first")
    setIsLoading(true)
    setLoadingMsg(generationMode === "update" ? "Updating portfolio..." : "Generating portfolio...")
    const formData = new FormData()
    formData.append("avatar", selectedImage)
    try {
      const res = await fetch("http://localhost:5000/file/profile", {
        method: "POST",
        body: formData,
        headers: {
          "X-Generation-Mode": generationMode,
          "X-Template": selectedTemplate,
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          ...(generationMode === "update" && portfolioHtml && { "X-Existing-HTML": portfolioHtml }),
        },
      })
      const data = await res.json()
      if (!res.ok || !data.html) throw new Error(data.error || "Failed to generate portfolio")
      setPortfolioHtml(data.html)
      setGenerationMode("new")
      setShowTemplates(false)
    } catch (err) {
      alert(err.message || "Generation failed")
    } finally {
      setIsLoading(false)
      setLoadingMsg("Generating...")
    }
  }

  const applyTemplate = async (templateName) => {
    if (!portfolioHtml) return
    setIsApplyingTemplate(true)
    setLoadingMsg("Applying template... (AI is redesigning your portfolio)")
    setShowTemplates(false)
    try {
      const res = await fetch("http://localhost:5000/file/apply-template", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` },
        body: JSON.stringify({ html: portfolioHtml, template: templateName }),
      })
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}))
        throw new Error(errData.error || `Server error ${res.status}`)
      }
      const data = await res.json()
      if (!data.html) throw new Error("No HTML returned from server")
      setPortfolioHtml(data.html)
      setSelectedTemplate(templateName)
    } catch (err) {
      alert("Failed to apply template: " + err.message)
    } finally {
      setIsApplyingTemplate(false)
      setLoadingMsg("Generating...")
    }
  }

  const downloadHTML = () => {
    if (!portfolioHtml) return
    const themeCSS = htmlThemes[theme] || htmlThemes.dark
    let finalHTML = portfolioHtml
    const themeStyle = `<style id="theme-override">\n/* Applied Theme: ${theme} */\n${themeCSS}\n</style>`
    if (finalHTML.includes("</head>")) finalHTML = finalHTML.replace("</head>", `${themeStyle}\n</head>`)
    else if (finalHTML.includes("</Head>")) finalHTML = finalHTML.replace("</Head>", `${themeStyle}\n</Head>`)
    else if (finalHTML.includes("<body")) finalHTML = finalHTML.replace(/<body/i, `<head>${themeStyle}</head>\n<body`)
    else finalHTML = themeStyle + finalHTML
    const a = Object.assign(document.createElement("a"), { href: URL.createObjectURL(new Blob([finalHTML], { type: "text/html" })), download: `portfolio-${theme}-${Date.now()}.html` })
    a.click()
    URL.revokeObjectURL(a.href)
  }

  const savePortfolio = async () => {
    if (!portfolioHtml || !saveTitle.trim()) return alert("Please enter a title")
    try {
      const res = await fetch("http://localhost:5000/api/portfolio/save", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` },
        body: JSON.stringify({ title: saveTitle, description: saveDescription, content: portfolioHtml, theme, template: selectedTemplate }),
      })
      const data = await res.json()
      if (res.ok) {
        setShowSaveModal(false); setSaveTitle(""); setSaveDescription("")
        setCurrentPortfolioId(data.portfolio._id); fetchPortfolios()
      } else { alert(data.message || "Failed to save") }
    } catch (_) { alert("Failed to save portfolio") }
  }

  const fetchPortfolios = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/portfolio/user", { headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` } })
      if (res.ok) setSavedPortfolios(await res.json())
    } catch (_) {}
  }

  const loadPortfolio = (p) => {
    setPortfolioHtml(p.content); setTheme(p.theme || "dark")
    setSelectedTemplate(p.template || "modern"); setCurrentPortfolioId(p._id)
    setShowPortfoliosList(false)
  }

  const deletePortfolio = async (id) => {
    if (!confirm("Delete this portfolio?")) return
    const re = await fetch(`http://localhost:5000/api/portfolio/delete/${id}`, { method: "DELETE", headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` } })
    if (re.ok) { fetchPortfolios(); if (currentPortfolioId === id) setCurrentPortfolioId(null) }
    else alert("Failed to delete")
  }

  const sharePortfolio = async (id) => {
    const re = await fetch(`http://localhost:5000/api/portfolio/share/${id}`, { method: "POST", headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` } })
    const data = await re.json()
    if (re.ok) { setShareUrl(`${window.location.origin}/shared/${data.shareToken}`); setShowShareModal(true); fetchPortfolios() }
    else alert(data.message || "Failed to share")
  }

  const unsharePortfolio = async (id) => {
    if (!confirm("Make this portfolio private?")) return
    const re = await fetch(`http://localhost:5000/api/portfolio/unshare/${id}`, { method: "POST", headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` } })
    if (re.ok) { alert("Portfolio is now private"); fetchPortfolios() }
  }

  const copyShareLink = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true); setTimeout(() => setCopied(false), 2000)
  }

  const themeGroups = [
    { label: "Classic", opts: [["dark","🌙 Dark"],["light","🌞 Light"]] },
    { label: "Professional", opts: [["corporate","💼 Corporate"],["navy","⚓ Navy"],["slate","🏢 Slate"]] },
    { label: "Tech", opts: [["cyberpunk","⚡ Cyberpunk"],["neon","🔷 Neon"],["matrix","💻 Matrix"]] },
    { label: "Vibrant", opts: [["sunset","🌅 Sunset"],["ocean","🌊 Ocean"],["forest","🌲 Forest"]] },
    { label: "Elegant", opts: [["gold","✨ Gold"],["platinum","💎 Platinum"],["emerald","💚 Emerald"]] },
    { label: "Artistic", opts: [["valentine","💖 Valentine"],["lavender","💜 Lavender"],["coral","🪸 Coral"],["mint","🍃 Mint"]] },
    { label: "Bold", opts: [["midnight","🌃 Midnight"],["ruby","🔴 Ruby"],["monochrome","⚫ Mono"]] },
  ]

  return (
    <>
      <style>{CSS}</style>

      {/* NAV */}
      <nav className="app-nav">
        <Link href="/" className="app-nav-logo">NextgenFolio<span> AI</span></Link>
        {userName && (
          <div className="nav-user" ref={dropdownRef}>
            <button className="user-btn" onClick={() => setShowProfileDropdown(v => !v)}>
              <div className="avatar">{userName.charAt(0).toUpperCase()}</div>
              <span className="user-name">{userName}</span>
              {Icon.chevron(showProfileDropdown)}
            </button>
            {showProfileDropdown && (
              <div className="user-dropdown">
                <div className="dropdown-header">
                  <div className="d-name">{userName}</div>
                  <div className="d-email">{userEmail}</div>
                </div>
                <button className="dropdown-item danger" onClick={() => { localStorage.clear(); window.location.href = "/" }}>
                  {Icon.logout} Sign out
                </button>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* LAYOUT */}
      <div className="app-wrap">

        {/* SIDEBAR */}
        <aside className="sidebar">

          {/* UPLOAD */}
          <div className="panel">
            <div className="panel-head">
              <span className="panel-icon">{Icon.upload}</span>
              <span className="panel-label">Resume</span>
            </div>
            <div className="panel-body">
              <div className="upload-zone">
                <input type="file" accept="application/pdf" onChange={e => setSelectedImage(e.target.files[0])} />
                <div className="upload-icon">{Icon.upload}</div>
                <div className="upload-title">Drop your PDF here</div>
                <div className="upload-sub">PDF only · Max 10MB</div>
              </div>
              {selectedImage && (
                <div className="file-badge">
                  {Icon.check}
                  <span style={{overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{selectedImage.name}</span>
                </div>
              )}
            </div>
          </div>

          {/* TEMPLATE */}
          <div className="panel">
            <div className="panel-head">
              <span className="panel-icon">{Icon.template}</span>
              <span className="panel-label">Template</span>
            </div>
            <div className="panel-body">
              <button className="sidebar-btn ghost" style={{justifyContent:'space-between',padding:'8px 10px'}} onClick={() => setShowTemplates(v => !v)}>
                <span style={{color:'var(--text)',fontSize:'0.8rem',fontWeight:600}}>{portfolioTemplates[selectedTemplate]?.name || "Modern"}</span>
                {Icon.chevron(showTemplates)}
              </button>
              {showTemplates && (
                <div className="template-list" style={{marginTop:'0.5rem'}}>
                  {Object.entries(portfolioTemplates).map(([k, t]) => (
                    <button key={k} className={`tpl-item${selectedTemplate === k ? ' active' : ''}`} disabled={isLoading}
                      onClick={() => { setSelectedTemplate(k); setShowTemplates(false); }}>
                      <div>
                        <div className="tpl-name">{t.name}</div>
                        <div className="tpl-desc">{t.description}</div>
                      </div>
                      {selectedTemplate === k && Icon.check}
                    </button>
                  ))}
                </div>
              )}
              {portfolioHtml && (
                <button
                  className="sidebar-btn outline"
                  style={{marginTop:'0.6rem',fontSize:'0.78rem'}}
                  disabled={isLoading || isApplyingTemplate}
                  onClick={() => applyTemplate(selectedTemplate)}
                >
                  {isApplyingTemplate ? <><span className="spinner-white"/>Applying...</> : <>{Icon.refresh} Apply Template</>}
                </button>
              )}
            </div>
          </div>

          {/* MODE (only if portfolio exists) */}
          {portfolioHtml && (
            <div className="panel">
              <div className="panel-head">
                <span className="panel-icon">{Icon.refresh}</span>
                <span className="panel-label">Mode</span>
              </div>
              <div className="panel-body">
                <div className="mode-row">
                  <button className={`mode-btn${generationMode === 'new' ? ' active' : ''}`} onClick={() => setGenerationMode("new")}>
                    {Icon.spark} New
                  </button>
                  <button className={`mode-btn${generationMode === 'update' ? ' active' : ''}`} onClick={() => setGenerationMode("update")}>
                    {Icon.refresh} Update
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* GENERATE */}
          <button className="sidebar-btn primary" onClick={handleUpload} disabled={isLoading || isApplyingTemplate || !selectedImage}>
            {isLoading ? <><span className="spinner"/>{loadingMsg}</> : <>{Icon.spark}{generationMode === 'update' ? 'Update Portfolio' : 'Generate Portfolio'}</>}
          </button>

          {/* THEME (only if portfolio exists) */}
          {portfolioHtml && (
            <div className="panel">
              <div className="panel-head">
                <span className="panel-icon">{Icon.theme}</span>
                <span className="panel-label">Theme</span>
              </div>
              <div className="panel-body">
                <select className="styled-select" value={theme} onChange={e => setTheme(e.target.value)}>
                  {themeGroups.map(g => (
                    <optgroup key={g.label} label={g.label}>
                      {g.opts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                    </optgroup>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* ACTIONS */}
          {portfolioHtml && (
            <>
              <button className="sidebar-btn outline" onClick={downloadHTML}>{Icon.dl} Download HTML</button>
              <button className="sidebar-btn ghost" onClick={() => setShowSaveModal(true)}>{Icon.save} Save Portfolio</button>
              {currentPortfolioId && (
                <button className="sidebar-btn ghost" onClick={() => sharePortfolio(currentPortfolioId)}>{Icon.share} Share Portfolio</button>
              )}
            </>
          )}

          <button className="sidebar-btn ghost" onClick={() => { fetchPortfolios(); setShowPortfoliosList(true) }}>
            {Icon.folder} My Portfolios {savedPortfolios.length > 0 && `(${savedPortfolios.length})`}
          </button>

        </aside>

        {/* MAIN / PREVIEW */}
        <main className="main-area">
          {!portfolioHtml ? (
            <div className="empty-state">
              <div className="empty-icon">{Icon.spark}</div>
              <div className="empty-title">Your portfolio preview will appear here</div>
              <p className="empty-sub">Upload your PDF resume and click Generate Portfolio to get started. Choose a template and theme to customize.</p>
              <div className="empty-steps">
                {['Upload PDF', 'Choose template', 'Click Generate', 'Pick a theme'].map((s, i) => (
                  <div className="empty-step" key={i}><span className="step-num">{i+1}</span>{s}</div>
                ))}
              </div>
            </div>
          ) : (
            <div className="preview-wrap">
              <div className="preview-topbar">
                <div className="browser-dots">
                  <div className="browser-dot" style={{background:'rgba(255,255,255,0.12)'}}/> 
                  <div className="browser-dot" style={{background:'rgba(255,255,255,0.08)'}}/> 
                  <div className="browser-dot" style={{background:'rgba(0,217,255,0.3)'}}/>
                </div>
                <div className="preview-label">
                  Live Preview · theme: <span>{theme}</span>
                </div>
                <div className="preview-actions">
                  <button className="preview-action" onClick={() => setShowSaveModal(true)}>{Icon.save} Save</button>
                  <button className="preview-action cyan" onClick={downloadHTML}>{Icon.dl} Download</button>
                </div>
              </div>
              <div style={{position:'relative'}}>
                {(isLoading || isApplyingTemplate) && (
                  <div className="loading-over">
                    <div className="loading-spinner"/>
                    <div className="loading-text">{loadingMsg}</div>
                  </div>
                )}
                <PortfolioPreview html={portfolioHtml} theme={theme} />
              </div>
            </div>
          )}
        </main>
      </div>

      {/* SAVE MODAL */}
      {showSaveModal && (
        <div className="modal-overlay" onClick={() => setShowSaveModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-head">
              <div className="modal-title">{Icon.save} Save Portfolio</div>
              <button className="modal-close" onClick={() => setShowSaveModal(false)}>{Icon.close}</button>
            </div>
            <div className="modal-body">
              <div><div className="modal-label">Title *</div><input className="modal-input" value={saveTitle} onChange={e => setSaveTitle(e.target.value)} placeholder="My Portfolio" /></div>
              <div><div className="modal-label">Description (optional)</div><textarea className="modal-input" value={saveDescription} onChange={e => setSaveDescription(e.target.value)} placeholder="A brief description..." rows={3} style={{resize:'none'}}/></div>
            </div>
            <div className="modal-footer">
              <button className="modal-btn ghost" onClick={() => setShowSaveModal(false)}>Cancel</button>
              <button className="modal-btn primary" onClick={savePortfolio}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* SHARE MODAL */}
      {showShareModal && (
        <div className="modal-overlay" onClick={() => setShowShareModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-head">
              <div className="modal-title">{Icon.share} Share Portfolio</div>
              <button className="modal-close" onClick={() => setShowShareModal(false)}>{Icon.close}</button>
            </div>
            <div className="modal-body">
              <div><div className="modal-label">Public link</div>
                <div className="share-input-row">
                  <input className="share-url" value={shareUrl} readOnly />
                  <button className="preview-action" style={{flexShrink:0}} onClick={copyShareLink}>{Icon.copy} {copied ? "Copied!" : "Copy"}</button>
                </div>
                <div style={{fontSize:'0.72rem',color:'var(--muted)',marginTop:'0.4rem'}}>Anyone with this link can view your portfolio.</div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="modal-btn ghost" onClick={() => setShowShareModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* PORTFOLIOS MODAL */}
      {showPortfoliosList && (
        <div className="modal-overlay" onClick={() => setShowPortfoliosList(false)}>
          <div className="modal portfolios-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-head">
              <div className="modal-title">{Icon.folder} My Portfolios ({savedPortfolios.length})</div>
              <button className="modal-close" onClick={() => setShowPortfoliosList(false)}>{Icon.close}</button>
            </div>
            <div className="portfolios-list">
              {savedPortfolios.length === 0 ? (
                <div style={{textAlign:'center',padding:'3rem',color:'var(--muted)'}}>
                  <div style={{fontSize:'2rem',marginBottom:'0.5rem'}}>📭</div>
                  <div style={{fontWeight:600,color:'var(--muted2)',marginBottom:'0.3rem'}}>No saved portfolios yet</div>
                  <div style={{fontSize:'0.78rem'}}>Generate and save your first portfolio!</div>
                </div>
              ) : savedPortfolios.map(p => (
                <div key={p._id} className={`p-card${currentPortfolioId === p._id ? ' active' : ''}`}>
                  <div className="p-card-info">
                    <div className="p-card-title">{p.title}</div>
                    {p.description && <div className="p-card-desc">{p.description}</div>}
                    <div className="p-card-meta">
                      <span className="p-tag">{p.template || "modern"}</span>
                      <span className="p-tag">{p.theme || "dark"}</span>
                      <span className="p-tag">{new Date(p.createdAt).toLocaleDateString()}</span>
                      {p.isPublic && <span className="p-tag" style={{color:'var(--cyan)'}}>🔗 Public</span>}
                    </div>
                  </div>
                  <div className="p-actions">
                    <button className="p-btn" onClick={() => loadPortfolio(p)}>{Icon.eye} Load</button>
                    {p.isPublic
                      ? <button className="p-btn" onClick={() => unsharePortfolio(p._id)}>{Icon.lock} Unshare</button>
                      : <button className="p-btn" onClick={() => sharePortfolio(p._id)}>{Icon.share} Share</button>}
                    <button className="p-btn danger" onClick={() => deletePortfolio(p._id)}>{Icon.trash}</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ACCOUNT MODAL */}
      {showAccountModal && (
        <AccountManagementModal userName={userName} userEmail={userEmail}
          onClose={() => setShowAccountModal(false)}
          onUpdate={(n, e) => { setUserName(n); setUserEmail(e) }} />
      )}
    </>
  )
}

/* ─── ACCOUNT MODAL ──────────────────────────────────── */
const AccountManagementModal = ({ userName, userEmail, onClose, onUpdate }) => {
  const [name, setName] = useState(userName)
  const [email, setEmail] = useState(userEmail)
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState({ type: "", text: "" })

  const handleSubmit = async (e) => {
    e.preventDefault(); setMsg({ type: "", text: "" })
    if (!name.trim()) return setMsg({ type: "err", text: "Name is required" })
    if (!email.trim() || !email.includes("@")) return setMsg({ type: "err", text: "Valid email is required" })
    setLoading(true)
    try {
      const re = await fetch("http://localhost:5000/api/user/update-profile", {
        method: "PUT", headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` },
        body: JSON.stringify({ name, email })
      })
      const data = await re.json()
      if (re.ok) {
        localStorage.setItem("user", JSON.stringify({ name, email }))
        onUpdate(name, email); setMsg({ type: "ok", text: "Profile updated!" })
        setTimeout(onClose, 1200)
      } else { setMsg({ type: "err", text: data.message || "Failed to update" }) }
    } catch (_) { setMsg({ type: "err", text: "Failed to update profile" }) }
    finally { setLoading(false) }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-head">
          <div className="modal-title">My Account</div>
          <button className="modal-close" onClick={onClose}><svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {msg.text && <div style={{padding:'8px 12px',borderRadius:8,fontSize:'0.8rem',background:msg.type==='ok'?'rgba(34,197,94,0.08)':'rgba(239,68,68,0.08)',border:`1px solid ${msg.type==='ok'?'rgba(34,197,94,0.2)':'rgba(239,68,68,0.2)'}`,color:msg.type==='ok'?'#86efac':'#fca5a5'}}>{msg.text}</div>}
            <div><div className="modal-label">Full name</div><input className="modal-input" value={name} onChange={e => setName(e.target.value)} /></div>
            <div><div className="modal-label">Email</div><input className="modal-input" type="email" value={email} onChange={e => setEmail(e.target.value)} /></div>
          </div>
          <div className="modal-footer">
            <button type="button" className="modal-btn ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="modal-btn primary" disabled={loading}>{loading ? "Saving..." : "Save changes"}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
