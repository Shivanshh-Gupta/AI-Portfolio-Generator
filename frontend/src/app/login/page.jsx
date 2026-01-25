"use client"

import GoogleAuthButton from "@/components/GoogleAuthButton"
import { useFormik } from "formik"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import * as Yup from "yup"

const Login = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
<<<<<<< HEAD
  const [isVisible, setIsVisible] = useState(false)

  React.useEffect(() => {
    setIsVisible(true)
  }, [])
=======
>>>>>>> 8704c0d2b0435dd392d86958e1c5065b0c1bc970

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  })

  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true)
      setError("")
      try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || "Login failed")
        }

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

  // ✅ GOOGLE LOGIN HANDLER (IMPORTANT)
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google"
  }

  return (
<<<<<<< HEAD
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-950 px-4 py-8 relative overflow-hidden">

      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-20 w-[500px] h-[500px] bg-gray-500/15 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gray-400/20 rounded-full blur-3xl animate-float-slow"></div>
      </div>

      <div className={`w-full max-w-md relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="bg-gradient-to-br from-white/95 via-white/90 to-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 p-8 md:p-10 hover:shadow-gray-500/20 transition-all duration-500">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-900 rounded-2xl flex items-center justify-center shadow-lg shadow-gray-500/50 animate-pulse-slow">
                <span className="text-3xl">🔐</span>
              </div>
            </div>
            <h1 className="text-4xl font-extrabold mb-3">
              <span className="bg-gradient-to-r from-gray-700 via-gray-800 to-black bg-clip-text text-transparent animate-gradient bg-300%">
                Welcome Back
              </span>
            </h1>
            <p className="text-gray-600 text-sm">
              Sign in to{" "}
              <span className="font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                NextgenFolio AI
              </span>
            </p>
            <p className="mt-3 text-sm text-gray-500">
              Don&apos;t have an account?{" "}
              <a href="/signup" className="text-gray-700 font-semibold hover:text-black transition-colors hover:underline">
                Sign up
              </a>
            </p>
          </div>

          {/* 🔥 GOOGLE SIGN IN */}
          <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <GoogleAuthButton
              label="Sign in with Google"
              onClick={handleGoogleLogin}
            />
          </div>

          {/* Divider */}
          <div className="flex items-center my-6 text-xs text-gray-400 uppercase animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
            <span className="px-4 font-semibold">or</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm animate-shake">
              <div className="flex items-center gap-2">
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={loginForm.handleSubmit} className="space-y-5">

            {/* Email */}
            <div className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                📧 Email address
              </label>
              <input
                type="email"
                name="email"
                onChange={loginForm.handleChange}
                onBlur={loginForm.handleBlur}
                value={loginForm.values.email}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-gray-500 focus:ring-4 focus:ring-gray-500/20 focus:outline-none transition-all duration-300 bg-white/50 hover:bg-white"
              />
              {loginForm.touched.email && loginForm.errors.email && (
                <p className="text-xs text-red-500 mt-2 flex items-center gap-1 animate-fade-in">
                  <span>❌</span>
                  <span>{loginForm.errors.email}</span>
                </p>
              )}
            </div>

            {/* Password */}
            <div className="animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                🔒 Password
              </label>
              <input
                type="password"
                name="password"
                onChange={loginForm.handleChange}
                onBlur={loginForm.handleBlur}
                value={loginForm.values.password}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-gray-500 focus:ring-4 focus:ring-gray-500/20 focus:outline-none transition-all duration-300 bg-white/50 hover:bg-white"
              />
              {loginForm.touched.password && loginForm.errors.password && (
                <p className="text-xs text-red-500 mt-2 flex items-center gap-1 animate-fade-in">
                  <span>❌</span>
                  <span>{loginForm.errors.password}</span>
                </p>
              )}
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-gray-700 via-gray-800 to-black text-white font-bold text-lg hover:from-gray-600 hover:via-gray-700 hover:to-gray-900 transition-all duration-300 transform hover:scale-[1.02] shadow-xl shadow-gray-500/50 hover:shadow-2xl hover:shadow-gray-500/60 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none animate-fade-in-up"
              style={{ animationDelay: '500ms' }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <span className="animate-spin text-xl">⚙️</span>
                  <span className="animate-pulse">Signing in...</span>
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <span>🚀</span>
                  <span>Sign in</span>
                </span>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center animate-fade-in-up" style={{ animationDelay: '600ms' }}>
            <a href="/" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
              ← Back to Home
            </a>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }

        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-30px) translateX(-15px); }
        }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-15px) translateX(20px); }
        }

        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
        }

        .animate-gradient {
          background-size: 300% 300%;
          animation: gradient 6s ease infinite;
        }

        .bg-300\\% {
          background-size: 300% 300%;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
=======
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-slate-900 to-slate-800 px-4">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8">

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Sign in to{" "}
            <span className="text-blue-600">NextgenFolio AI</span>
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <a href="/signup" className="text-blue-600 font-medium hover:underline">
              Sign up
            </a>
          </p>
        </div>

        {/* 🔥 GOOGLE SIGN IN */}
        <GoogleAuthButton
          label="Sign in with Google"
          onClick={handleGoogleLogin}
        />

        {/* Divider */}
        <div className="flex items-center my-4 text-xs text-gray-400 uppercase">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="px-3">or</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={loginForm.handleSubmit} className="space-y-4">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              name="email"
              onChange={loginForm.handleChange}
              onBlur={loginForm.handleBlur}
              value={loginForm.values.email}
              placeholder="you@example.com"
              className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {loginForm.touched.email && loginForm.errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {loginForm.errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={loginForm.handleChange}
              onBlur={loginForm.handleBlur}
              value={loginForm.values.password}
              placeholder="••••••••"
              className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {loginForm.touched.password && loginForm.errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {loginForm.errors.password}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-500 transition disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
>>>>>>> 8704c0d2b0435dd392d86958e1c5065b0c1bc970
    </main>
  )
}

export default Login
