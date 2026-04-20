"use client"

import GoogleAuthButton from "@/components/GoogleAuthButton"
import { useFormik } from "formik"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import * as Yup from "yup"

const Login = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
  })

  const loginForm = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true); setError("")
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        })
        const data = await response.json()
        if (!response.ok) throw new Error(data.message || "Login failed")
        localStorage.setItem("token", data.token)
        localStorage.setItem("user", JSON.stringify(data.user))
        router.push("/image")
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    },
  })

  const handleGoogleLogin = () => { window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google` }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', sans-serif; background: #050b18; color: #e2e8f0; }

        .auth-page { min-height: 100vh; display: flex; background: #050b18; position: relative; overflow: hidden; }
        .auth-glow-1 { position: fixed; top: -200px; left: -200px; width: 600px; height: 600px; border-radius: 50%; background: radial-gradient(circle, rgba(0,217,255,0.06) 0%, transparent 70%); pointer-events: none; }
        .auth-glow-2 { position: fixed; bottom: -150px; right: -150px; width: 500px; height: 500px; border-radius: 50%; background: radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%); pointer-events: none; }

        .auth-left { display: none; flex: 1; flex-direction: column; justify-content: space-between; padding: 3rem; background: linear-gradient(135deg, #0a1628 0%, #0d1f3c 100%); border-right: 1px solid rgba(255,255,255,0.05); position: relative; overflow: hidden; }
        @media (min-width: 900px) { .auth-left { display: flex; } }
        .auth-left::before { content: ''; position: absolute; top: 20%; left: 50%; transform: translateX(-50%); width: 400px; height: 400px; background: radial-gradient(circle, rgba(0,217,255,0.06) 0%, transparent 70%); pointer-events: none; }
        .left-logo { font-size: 1.2rem; font-weight: 800; color: #e2e8f0; text-decoration: none; }
        .left-logo span { color: #00d9ff; }
        .left-body { position: relative; z-index: 1; }
        .left-tag { display: inline-flex; align-items: center; gap: 0.4rem; padding: 5px 12px; border-radius: 100px; border: 1px solid rgba(0,217,255,0.2); background: rgba(0,217,255,0.06); color: #00d9ff; font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 1.5rem; }
        .left-heading { font-size: 2.5rem; font-weight: 900; color: #e2e8f0; line-height: 1.15; letter-spacing: -1px; margin-bottom: 1rem; }
        .left-heading span { color: #00d9ff; }
        .left-sub { color: #64748b; font-size: 0.95rem; line-height: 1.7; max-width: 340px; }
        .left-features { display: flex; flex-direction: column; gap: 0.75rem; margin-top: 2.5rem; }
        .left-feature { display: flex; align-items: center; gap: 0.75rem; color: #94a3b8; font-size: 0.875rem; }
        .left-feature-dot { width: 6px; height: 6px; border-radius: 50%; background: #00d9ff; flex-shrink: 0; }
        .left-footer { color: #334155; font-size: 0.78rem; }

        .auth-right { flex: 0 0 100%; max-width: 100%; display: flex; align-items: center; justify-content: center; padding: 2rem 1.5rem; }
        @media (min-width: 900px) { .auth-right { flex: 0 0 480px; max-width: 480px; padding: 2rem 3.5rem; } }

        .auth-card { width: 100%; max-width: 420px; animation: fadeUp 0.5s ease both; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }

        .auth-header { margin-bottom: 2rem; }
        .auth-logo-mark { width: 44px; height: 44px; border-radius: 12px; background: rgba(0,217,255,0.1); border: 1px solid rgba(0,217,255,0.2); display: flex; align-items: center; justify-content: center; color: #00d9ff; margin-bottom: 1.5rem; }
        .auth-title { font-size: 1.75rem; font-weight: 800; color: #e2e8f0; letter-spacing: -0.5px; margin-bottom: 0.35rem; }
        .auth-sub { color: #64748b; font-size: 0.875rem; }
        .auth-sub a { color: #00d9ff; text-decoration: none; font-weight: 600; }
        .auth-sub a:hover { text-decoration: underline; }

        .google-btn { width: 100%; padding: 11px 16px; border-radius: 10px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.09); color: #e2e8f0; font-size: 0.875rem; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 0.6rem; cursor: pointer; transition: all 0.2s; }
        .google-btn:hover { background: rgba(255,255,255,0.07); border-color: rgba(255,255,255,0.15); }

        .divider { display: flex; align-items: center; gap: 0.75rem; margin: 1.25rem 0; }
        .divider-line { flex: 1; height: 1px; background: rgba(255,255,255,0.07); }
        .divider-text { color: #334155; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }

        .auth-error { padding: 10px 14px; border-radius: 8px; background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.2); color: #fca5a5; font-size: 0.82rem; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem; }

        .form-group { margin-bottom: 1rem; }
        .form-label { display: block; color: #94a3b8; font-size: 0.8rem; font-weight: 600; margin-bottom: 0.4rem; letter-spacing: 0.3px; }
        .form-input { width: 100%; padding: 11px 14px; border-radius: 10px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.09); color: #e2e8f0; font-size: 0.9rem; font-family: 'Inter', sans-serif; outline: none; transition: all 0.2s; }
        .form-input::placeholder { color: #334155; }
        .form-input:focus { border-color: rgba(0,217,255,0.4); background: rgba(0,217,255,0.03); box-shadow: 0 0 0 3px rgba(0,217,255,0.08); }
        .form-input:hover:not(:focus) { border-color: rgba(255,255,255,0.14); }
        .form-error { color: #f87171; font-size: 0.75rem; margin-top: 0.3rem; }

        .form-row-end { display: flex; justify-content: flex-end; margin-top: -0.5rem; margin-bottom: 0.5rem; }
        .forgot-link { color: #64748b; font-size: 0.78rem; text-decoration: none; transition: color 0.2s; }
        .forgot-link:hover { color: #00d9ff; }

        .submit-btn { width: 100%; padding: 12px; border-radius: 10px; border: none; background: #00d9ff; color: #050b18; font-size: 0.9rem; font-weight: 700; cursor: pointer; box-shadow: 0 0 24px rgba(0,217,255,0.3); transition: all 0.2s; margin-top: 0.5rem; display: flex; align-items: center; justify-content: center; gap: 0.5rem; }
        .submit-btn:hover { background: #33e1ff; transform: translateY(-1px); box-shadow: 0 0 36px rgba(0,217,255,0.45); }
        .submit-btn:disabled { opacity: 0.55; cursor: not-allowed; transform: none; }

        .spinner { width: 16px; height: 16px; border-radius: 50%; border: 2px solid rgba(5,11,24,0.3); border-top-color: #050b18; animation: spin 0.7s linear infinite; flex-shrink: 0; }
        @keyframes spin { to { transform: rotate(360deg); } }

        .auth-back { text-align: center; margin-top: 1.5rem; }
        .auth-back a { color: #334155; font-size: 0.8rem; text-decoration: none; transition: color 0.2s; }
        .auth-back a:hover { color: #64748b; }
      `}</style>

      <div className="auth-page">
        <div className="auth-glow-1" />
        <div className="auth-glow-2" />

        {/* LEFT PANEL */}
        <div className="auth-left">
          <Link href="/" className="left-logo">NextgenFolio<span> AI</span></Link>
          <div className="left-body">
            <div className="left-tag">
              <span style={{width:6,height:6,borderRadius:'50%',background:'#00d9ff',display:'inline-block'}}/>
              Welcome back
            </div>
            <h2 className="left-heading">Your portfolios<br />are waiting<span>.</span></h2>
            <p className="left-sub">Sign back in to access your saved portfolios, apply new themes, and share your work.</p>
            <div className="left-features">
              {['Access all your saved portfolios', 'Switch themes instantly', 'Share with a public link', 'Download anytime'].map((f, i) => (
                <div className="left-feature" key={i}>
                  <span className="left-feature-dot" />{f}
                </div>
              ))}
            </div>
          </div>
          <div className="left-footer">© {new Date().getFullYear()} NextgenFolio AI</div>
        </div>

        {/* RIGHT PANEL */}
        <div className="auth-right">
          <div className="auth-card">
            <div className="auth-header">
              <div className="auth-logo-mark">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
              </div>
              <h1 className="auth-title">Welcome back</h1>
              <p className="auth-sub">
                No account? <a href="/signup">Sign up free</a>
              </p>
            </div>

            <button className="google-btn" onClick={handleGoogleLogin}>
              <svg width="16" height="16" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Continue with Google
            </button>

            <div className="divider">
              <div className="divider-line" />
              <span className="divider-text">or</span>
              <div className="divider-line" />
            </div>

            {error && (
              <div className="auth-error">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                {error}
              </div>
            )}

            <form onSubmit={loginForm.handleSubmit}>
              <div className="form-group">
                <label className="form-label">Email address</label>
                <input className="form-input" type="email" name="email" placeholder="you@example.com"
                  onChange={loginForm.handleChange} onBlur={loginForm.handleBlur} value={loginForm.values.email} />
                {loginForm.touched.email && loginForm.errors.email && <div className="form-error">{loginForm.errors.email}</div>}
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <input className="form-input" type="password" name="password" placeholder="••••••••"
                  onChange={loginForm.handleChange} onBlur={loginForm.handleBlur} value={loginForm.values.password} />
                {loginForm.touched.password && loginForm.errors.password && <div className="form-error">{loginForm.errors.password}</div>}
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? <><span className="spinner" />Signing in...</> : <>
                  Sign in
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                </>}
              </button>
            </form>

            <div className="auth-back"><Link href="/">← Back to home</Link></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
