"use client"

import GoogleAuthButton from "@/components/GoogleAuthButton"
import { useFormik } from "formik"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import * as Yup from "yup"

const Signup = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm your password"),
  })

  const signupForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true)
      setError("")
      try {
        const response = await fetch("http://localhost:5000/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            password: values.password,
          }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || "Signup failed")
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

  // ✅ GOOGLE SIGN-UP HANDLER
  const handleGoogleSignup = () => {
    window.location.href = "http://localhost:5000/api/auth/google"
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-slate-900 to-slate-800 px-4">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8">

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Create your{" "}
            <span className="text-blue-600">NextgenFolio</span>
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 font-medium hover:underline">
              Sign in
            </a>
          </p>
        </div>

        {/* 🔥 GOOGLE SIGN UP */}
        <GoogleAuthButton
          label="Sign up with Google"
          onClick={handleGoogleSignup}
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
        <form onSubmit={signupForm.handleSubmit} className="space-y-4">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              onChange={signupForm.handleChange}
              onBlur={signupForm.handleBlur}
              value={signupForm.values.name}
              placeholder="Your name"
              className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {signupForm.touched.name && signupForm.errors.name && (
              <p className="text-xs text-red-500 mt-1">
                {signupForm.errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              name="email"
              onChange={signupForm.handleChange}
              onBlur={signupForm.handleBlur}
              value={signupForm.values.email}
              placeholder="you@example.com"
              className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {signupForm.touched.email && signupForm.errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {signupForm.errors.email}
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
              onChange={signupForm.handleChange}
              onBlur={signupForm.handleBlur}
              value={signupForm.values.password}
              placeholder="••••••••"
              className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {signupForm.touched.password && signupForm.errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {signupForm.errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              onChange={signupForm.handleChange}
              onBlur={signupForm.handleBlur}
              value={signupForm.values.confirmPassword}
              placeholder="••••••••"
              className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {signupForm.touched.confirmPassword &&
              signupForm.errors.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">
                  {signupForm.errors.confirmPassword}
                </p>
              )}
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-500 transition disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>
      </div>
    </main>
  )
}

export default Signup
