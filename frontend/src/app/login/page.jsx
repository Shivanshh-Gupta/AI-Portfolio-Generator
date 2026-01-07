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
    </main>
  )
}

export default Login
