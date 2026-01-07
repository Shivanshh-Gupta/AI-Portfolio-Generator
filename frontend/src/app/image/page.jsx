"use client"

import { useState } from "react"
import PortfolioPreview from "@/components/PortfolioPreview"
import { htmlThemes } from "@/config/htmlThemes"
import AuthGuard from "@/components/AuthGuard"

export default function ImagePage() {
  return (
    <AuthGuard>
      <ImageUploadComponent />
    </AuthGuard>
  )
}

function ImageUploadComponent() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [portfolioHtml, setPortfolioHtml] = useState(null)
  const [theme, setTheme] = useState("light")

  const handleUpload = async () => {
    if (!selectedImage) return alert("Select PDF first")

    setIsLoading(true)
    const formData = new FormData()
    formData.append("avatar", selectedImage)

    try {
      const res = await fetch("http://localhost:5000/file/profile", {
        method: "POST",
        body: formData,
      })
      const data = await res.json()
      setPortfolioHtml(data.html)
    } catch {
      alert("Generation failed")
    } finally {
      setIsLoading(false)
    }
  }

  const downloadHTML = () => {
  if (!portfolioHtml) return

  const themeCSS = htmlThemes[theme] || htmlThemes.light

  // Inject theme CSS at END of <head>
  let finalHTML = portfolioHtml

  const themeStyle = `
<style>
${themeCSS}

/* FORCE THEME */
html, body {
  background: var(--bg-color) !important;
  color: var(--text-color) !important;
}

* {
  background-color: transparent !important;
  color: var(--text-color) !important;
}

h1, h2, h3, h4, h5, h6 {
  color: var(--primary-color) !important;
}

a, button {
  color: var(--primary-color) !important;
  border-color: var(--primary-color) !important;
}
</style>
`

  if (finalHTML.includes("</head>")) {
    finalHTML = finalHTML.replace("</head>", `${themeStyle}</head>`)
  } else {
    finalHTML = themeStyle + finalHTML
  }

  const blob = new Blob([finalHTML], { type: "text/html" })
  const url = URL.createObjectURL(blob)

  const a = document.createElement("a")
  a.href = url
  a.download = `portfolio-${theme}.html`
  a.click()

  URL.revokeObjectURL(url)
}

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-slate-800 px-6 py-14 text-white">

      <div className="max-w-xl mx-auto bg-white/95 text-gray-900 rounded-2xl shadow-2xl p-8 space-y-6">

        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setSelectedImage(e.target.files[0])}
        />

        <button
          onClick={handleUpload}
          disabled={isLoading}
          className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold"
        >
          {isLoading ? "Generating..." : "Generate Portfolio"}
        </button>

        {portfolioHtml && (
          <>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full rounded-lg border px-4 py-3"
            >
              <option value="light">🌞 Light</option>
              <option value="dark">🌙 Dark</option>
              <option value="valentine">💖 Valentine</option>
              <option value="halloween">🎃 Halloween</option>
              <option value="sunset">🌅 Sunset</option>
            </select>

            <button
              onClick={downloadHTML}
              className="w-full py-3 rounded-lg bg-emerald-600 text-white font-semibold"
            >
              Download HTML
            </button>
          </>
        )}
      </div>

      {portfolioHtml && (
        <div className="mt-20 max-w-6xl mx-auto bg-white rounded-xl overflow-hidden">
          <PortfolioPreview html={portfolioHtml} theme={theme} />
        </div>
      )}
    </main>
  )
}
