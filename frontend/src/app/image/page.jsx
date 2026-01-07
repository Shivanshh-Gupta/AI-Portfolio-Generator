"use client"

import { useState } from "react"
import PortfolioPreview from "@/components/PortfolioPreview"
import { htmlThemes } from "@/config/htmlThemes"
import { portfolioTemplates } from "@/config/portfolioTemplates"
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
  const [generationMode, setGenerationMode] = useState("new")
  const [selectedTemplate, setSelectedTemplate] = useState("modern")
  const [showTemplates, setShowTemplates] = useState(false)

  const handleUpload = async () => {
    if (!selectedImage) return alert("Select PDF first")

    setIsLoading(true)
    const formData = new FormData()
    formData.append("avatar", selectedImage)

    try {
      const res = await fetch("http://localhost:5000/file/profile", {
        method: "POST",
        body: formData,
        headers: {
          "X-Generation-Mode": generationMode,
          "X-Template": selectedTemplate,
          ...(generationMode === "update" && portfolioHtml && { "X-Existing-HTML": portfolioHtml }),
        },
      })
      const data = await res.json()
      setPortfolioHtml(data.html)
      setGenerationMode("new")
      setShowTemplates(false)
    } catch {
      alert("Generation failed")
    } finally {
      setIsLoading(false)
    }
  }

  const applyTemplate = async (templateName) => {
    if (!portfolioHtml) return

    setIsLoading(true)
    setShowTemplates(false)

    try {
      const res = await fetch("http://localhost:5000/file/apply-template", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          html: portfolioHtml,
          template: templateName,
        }),
      })

      if (!res.ok) throw new Error("Template application failed")

      const data = await res.json()
      setPortfolioHtml(data.html)
      setSelectedTemplate(templateName)
    } catch (error) {
      alert("Failed to apply template: " + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const downloadHTML = () => {
    if (!portfolioHtml) return

    const themeCSS = htmlThemes[theme] || htmlThemes.light

    let finalHTML = portfolioHtml

    finalHTML = finalHTML.replace(/<style>[\s\S]*?<\/style>/g, "")

    const themeStyle = `<style>
:root {
  ${themeCSS}
}

/* Override all colors with theme variables */
html, body {
  background: var(--bg-color) !important;
  color: var(--text-color) !important;
}

* {
  color: var(--text-color) !important;
}

h1, h2, h3, h4, h5, h6 {
  color: var(--primary-color) !important;
}

a {
  color: var(--primary-color) !important;
}

button, .btn, [role="button"] {
  background-color: var(--primary-color) !important;
  color: var(--bg-color) !important;
  border-color: var(--primary-color) !important;
}

/* Card & section backgrounds */
.card, section, article, [class*="container"] {
  background: var(--bg-color) !important;
  color: var(--text-color) !important;
  border-color: var(--primary-color) !important;
}
</style>`

    if (finalHTML.includes("</head>")) {
      finalHTML = finalHTML.replace("</head>", `${themeStyle}</head>`)
    } else if (finalHTML.includes("<body>")) {
      finalHTML = finalHTML.replace("<body>", `<head>${themeStyle}</head><body>`)
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
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 px-4 py-16 text-white">
      
      {/* Header Section */}
      <div className="max-w-6xl mx-auto mb-16">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Portfolio Generator
          </h1>
          <p className="text-gray-300 text-lg">Transform your resume into a stunning portfolio website</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        
        {/* Left Column - Upload Section */}
        <div className="md:col-span-1">
          <div className="sticky top-8 space-y-6">
            {/* File Upload Card */}
            <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-8 backdrop-blur-sm hover:border-blue-400/60 transition">
              <div className="text-center">
                <div className="mb-4 text-4xl">📄</div>
                <h2 className="text-xl font-bold mb-2">Upload Resume</h2>
                <p className="text-gray-300 text-sm mb-6">PDF format only</p>
                
                <label className="relative block cursor-pointer">
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setSelectedImage(e.target.files[0])}
                    className="hidden"
                  />
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 rounded-xl font-semibold transition transform hover:scale-105">
                    Choose File
                  </div>
                </label>

                {selectedImage && (
                  <p className="text-green-400 text-sm mt-3 truncate">✓ {selectedImage.name}</p>
                )}
              </div>
            </div>

            {/* Template Selector */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 border border-slate-600/30 rounded-2xl p-6 backdrop-blur-sm">
              <p className="text-sm font-semibold text-gray-300 mb-4">Portfolio Template</p>
              <button
                onClick={() => setShowTemplates(!showTemplates)}
                className="w-full py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-semibold transition text-left flex items-center justify-between"
              >
                <span>{portfolioTemplates[selectedTemplate]?.name || "Modern"}</span>
                <span className="text-xl">{showTemplates ? "▼" : "▶"}</span>
              </button>

              {showTemplates && (
                <div className="mt-4 space-y-2 max-h-60 overflow-y-auto">
                  {Object.entries(portfolioTemplates).map(([key, template]) => (
                    <button
                      key={key}
                      onClick={() => {
                        setSelectedTemplate(key)
                        if (portfolioHtml) applyTemplate(key)
                      }}
                      disabled={isLoading}
                      className={`w-full p-4 rounded-lg text-left transition ${
                        selectedTemplate === key
                          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                          : "bg-slate-700 hover:bg-slate-600 text-gray-200"
                      } disabled:opacity-50`}
                    >
                      <div className="font-semibold">{template.name}</div>
                      <div className="text-xs text-gray-300 mt-1">{template.description}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mode Selection */}
            {portfolioHtml && (
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 border border-slate-600/30 rounded-2xl p-6 backdrop-blur-sm">
                <p className="text-sm font-semibold text-gray-300 mb-4">Generation Mode</p>
                <div className="space-y-3">
                  <button
                    onClick={() => setGenerationMode("new")}
                    className={`w-full py-3 rounded-xl font-semibold transition transform hover:scale-105 ${
                      generationMode === "new"
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/50"
                        : "bg-slate-700 text-gray-300 hover:bg-slate-600"
                    }`}
                  >
                    ✨ New Design
                  </button>
                  <button
                    onClick={() => setGenerationMode("update")}
                    className={`w-full py-3 rounded-xl font-semibold transition transform hover:scale-105 ${
                      generationMode === "update"
                        ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/50"
                        : "bg-slate-700 text-gray-300 hover:bg-slate-600"
                    }`}
                  >
                    🎨 Update Design
                  </button>
                </div>
              </div>
            )}

            {/* Generate Button */}
            <button
              onClick={handleUpload}
              disabled={isLoading || !selectedImage}
              className={`w-full py-4 rounded-xl font-bold text-lg transition transform hover:scale-105 ${
                isLoading || !selectedImage
                  ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-lg shadow-green-500/50"
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⚙️</span>
                  Generating...
                </span>
              ) : (
                `${generationMode === "update" ? "🎨 Update" : "✨ Generate"} Portfolio`
              )}
            </button>

            {/* Theme Selector */}
            {portfolioHtml && (
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 border border-slate-600/30 rounded-2xl p-6 backdrop-blur-sm">
                <p className="text-sm font-semibold text-gray-300 mb-4">Choose Theme</p>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-blue-400 transition"
                >
                  <option value="light">🌞 Light</option>
                  <option value="dark">🌙 Dark</option>
                  <option value="valentine">💖 Valentine</option>
                  <option value="halloween">🎃 Halloween</option>
                  <option value="sunset">🌅 Sunset</option>
                </select>
              </div>
            )}

            {/* Download Button */}
            {portfolioHtml && (
              <button
                onClick={downloadHTML}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-bold text-lg transition transform hover:scale-105 shadow-lg shadow-emerald-500/50"
              >
                ⬇️ Download HTML
              </button>
            )}
          </div>
        </div>

        {/* Right Column - Preview */}
        {portfolioHtml && (
          <div className="md:col-span-2">
            <div className="bg-slate-800/30 border border-slate-600/30 rounded-2xl overflow-hidden backdrop-blur-sm shadow-2xl">
              <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 px-6 py-4 border-b border-slate-600/30">
                <p className="font-semibold text-gray-200">📱 Live Preview ({theme})</p>
              </div>
              <div className="overflow-hidden rounded-b-2xl">
                <PortfolioPreview html={portfolioHtml} theme={theme} key={theme} />
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
