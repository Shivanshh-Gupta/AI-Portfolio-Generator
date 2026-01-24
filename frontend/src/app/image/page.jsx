"use client"

import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import PortfolioPreview from "@/components/PortfolioPreview"
import { htmlThemes } from "@/config/htmlThemes"
import { portfolioTemplates } from "@/config/portfolioTemplates"

export default function ImagePage() {
  return (
    <ImageUploadComponent />
  )
}

function ImageUploadComponent() {
  const searchParams = useSearchParams()
  const dropdownRef = useRef(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [portfolioHtml, setPortfolioHtml] = useState(null)
  const [theme, setTheme] = useState("light")
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
  const [currentSharePortfolio, setCurrentSharePortfolio] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  // Profile section states
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [showAccountModal, setShowAccountModal] = useState(false)

  // Handle Google OAuth callback
  useEffect(() => {
    const token = searchParams.get('token')
    const user = searchParams.get('user')

    if (token && user) {
      localStorage.setItem('token', token)
      localStorage.setItem('user', user)
      // Clean URL
      window.history.replaceState({}, '', '/image')
    }

    // Load user info
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser)
        setUserName(userData.name || "")
        setUserEmail(userData.email || "")
      } catch (err) {
        console.log("Invalid user data")
      }
    }


  }, [searchParams])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false)
      }
    }

    if (showProfileDropdown) {
      // Use 'click' instead of 'mousedown' to allow menu item onClick handlers to execute first
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [showProfileDropdown])

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
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          ...(generationMode === "update" && portfolioHtml && { "X-Existing-HTML": portfolioHtml }),
        },
      })

      const data = await res.json()

      if (!res.ok || !data.html) {
        throw new Error(data.error || "Failed to generate portfolio")
      }

      setPortfolioHtml(data.html)
      setGenerationMode("new")
      setShowTemplates(false)
    } catch (err) {
      console.error(err)
      alert(err.message || "Generation failed")
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
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
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

    // DON'T remove existing styles - keep the professional styling!
    // Just add theme CSS variables at the beginning

    const themeStyle = `<style>
/* Theme: ${theme} */
${themeCSS}
</style>`

    // Inject theme at the very beginning of head or document
    if (finalHTML.includes("<head>")) {
      finalHTML = finalHTML.replace("<head>", `<head>\n${themeStyle}`)
    } else if (finalHTML.includes("<!DOCTYPE html>")) {
      finalHTML = finalHTML.replace("<!DOCTYPE html>", `<!DOCTYPE html>\n${themeStyle}`)
    } else {
      finalHTML = themeStyle + finalHTML
    }

    const blob = new Blob([finalHTML], { type: "text/html" })
    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = `portfolio-${theme}-${Date.now()}.html`
    a.click()

    URL.revokeObjectURL(url)
  }

  const savePortfolio = async () => {
    if (!portfolioHtml || !saveTitle.trim()) {
      alert("Please enter a title for your portfolio")
      return
    }

    try {
      const res = await fetch("http://localhost:5000/api/portfolio/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title: saveTitle,
          description: saveDescription,
          content: portfolioHtml,
          theme: theme,
          template: selectedTemplate
        }),
      })

      const data = await res.json()

      if (res.ok) {
        alert("Portfolio saved successfully!")
        setShowSaveModal(false)
        setSaveTitle("")
        setSaveDescription("")
        setCurrentPortfolioId(data.portfolio._id)
        fetchPortfolios()
      } else {
        alert(data.message || "Failed to save portfolio")
      }
    } catch (error) {
      alert("Failed to save portfolio")
      console.error(error)
    }
  }

  const fetchPortfolios = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/portfolio/user", {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      })

      if (res.ok) {
        const data = await res.json()
        setSavedPortfolios(data)
      }
    } catch (error) {
      console.error("Failed to fetch portfolios:", error)
    }
  }

  const loadPortfolio = (portfolio) => {
    setPortfolioHtml(portfolio.content)
    setTheme(portfolio.theme || "light")
    setSelectedTemplate(portfolio.template || "modern")
    setCurrentPortfolioId(portfolio._id)
    setShowPortfoliosList(false)
  }

  const deletePortfolio = async (id) => {
    if (!confirm("Are you sure you want to delete this portfolio?")) return

    try {
      const res = await fetch(`http://localhost:5000/api/portfolio/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      })

      if (res.ok) {
        alert("Portfolio deleted successfully")
        fetchPortfolios()
        if (currentPortfolioId === id) {
          setCurrentPortfolioId(null)
        }
      } else {
        alert("Failed to delete portfolio")
      }
    } catch (error) {
      alert("Failed to delete portfolio")
      console.error(error)
    }
  }

  const sharePortfolio = async (portfolioId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/portfolio/share/${portfolioId}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      })

      const data = await res.json()

      if (res.ok) {
        const fullShareUrl = `${window.location.origin}/shared/${data.shareToken}`
        setShareUrl(fullShareUrl)
        setCurrentSharePortfolio(portfolioId)
        setShowShareModal(true)
        fetchPortfolios()
      } else {
        alert(data.message || "Failed to share portfolio")
      }
    } catch (error) {
      alert("Failed to share portfolio")
      console.error(error)
    }
  }

  const unsharePortfolio = async (portfolioId) => {
    if (!confirm("Are you sure you want to make this portfolio private?")) return

    try {
      const res = await fetch(`http://localhost:5000/api/portfolio/unshare/${portfolioId}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      })

      if (res.ok) {
        alert("Portfolio is now private")
        fetchPortfolios()
      } else {
        alert("Failed to unshare portfolio")
      }
    } catch (error) {
      alert("Failed to unshare portfolio")
      console.error(error)
    }
  }

  const copyShareLink = () => {
    navigator.clipboard.writeText(shareUrl)
    alert("Share link copied to clipboard!")
  }

  const shareCurrentPortfolio = () => {
    if (currentPortfolioId) {
      sharePortfolio(currentPortfolioId)
    } else {
      alert("Please save the portfolio first before sharing")
    }
  }

  // Load portfolios on mount and trigger animations
  useEffect(() => {
    fetchPortfolios()
    setIsVisible(true)
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 px-4 py-16 text-white relative overflow-hidden">

      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-20 w-[500px] h-[500px] bg-gray-500/15 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gray-400/20 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-40 right-1/4 w-72 h-72 bg-white/15 rounded-full blur-3xl animate-float"></div>
        {/* Additional animated particles */}
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-gray-300/15 rounded-full blur-2xl animate-bounce"></div>
        <div className="absolute top-1/3 right-1/3 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-pulse-slow"></div>
      </div>

      {/* Header Section */}
      <div className={`max-w-6xl mx-auto mb-16 relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Profile Button - Top Right */}
        {userName && (
          <div className="absolute top-0 right-0 z-20" ref={dropdownRef}>
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2.5 rounded-full hover:bg-white/20 transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-400 to-gray-600 flex items-center justify-center font-bold text-white">
                {userName.charAt(0).toUpperCase()}
              </div>
              <span className="text-white font-semibold">{userName}</span>
              <span className={`text-white/70 text-sm transition-transform duration-300 ${showProfileDropdown ? 'rotate-180' : ''}`}>▼</span>
            </button>

            {/* Profile Dropdown */}
            {showProfileDropdown && (
              <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl overflow-hidden animate-scale-in">
                {/* User Info Header */}
                <div className="bg-gradient-to-r from-gray-800 to-black p-4 text-white">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center font-bold text-lg">
                      {userName.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-lg">{userName}</div>
                      <div className="text-sm opacity-90 truncate">{userEmail}</div>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-2">
                  {/* Logout */}
                  <button
                    onClick={() => {
                      localStorage.clear()
                      window.location.href = '/'
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors text-red-600 group"
                  >
                    <span className="text-xl group-hover:scale-110 transition-transform">🚪</span>
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="text-center">
          {/* Glowing orb behind title */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl animate-pulse-slow"></div>

          <div className="relative">
            <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-white via-gray-300 to-gray-400 bg-clip-text text-transparent mb-4 animate-gradient bg-300%">
              Portfolio Generator
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
              Transform your resume into a <span className="text-transparent bg-gradient-to-r from-white to-gray-300 bg-clip-text font-bold">stunning portfolio website</span> with AI magic ✨
            </p>
          </div>
        </div>
      </div>

      <div className={`max-w-6xl mx-auto grid md:grid-cols-3 gap-8 relative z-10 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

        {/* Left Column - Upload Section */}
        <div className="md:col-span-1">
          <div className="sticky top-8 space-y-6">
            {/* File Upload Card */}
            <div className="group bg-gradient-to-br from-gray-800/60 via-gray-700/50 to-gray-900/60 border border-gray-500/30 rounded-2xl p-8 backdrop-blur-xl hover:border-gray-400/60 transition-all duration-500 hover:shadow-2xl hover:shadow-gray-500/30 hover:scale-[1.02] animate-scale-in relative overflow-hidden">
              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 animate-shimmer"></div>
              </div>
              <div className="text-center relative z-10">
                <div className="mb-4 text-5xl group-hover:scale-110 group-hover:animate-bounce transition-transform duration-500">📄</div>
                <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Upload Resume</h2>
                <p className="text-gray-300 text-sm mb-6">PDF format only • Max 10MB</p>

                <label className="relative block cursor-pointer">
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setSelectedImage(e.target.files[0])}
                    className="hidden"
                  />
                  <div className="bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 text-white py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-gray-500/50 relative overflow-hidden group">
                    <span className="relative z-10">Choose File</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </label>

                {selectedImage && (
                  <div className="mt-4 p-3 bg-white/10 border border-white/30 rounded-lg animate-scale-in">
                    <p className="text-white text-sm font-semibold truncate flex items-center justify-center gap-2">
                      <span className="animate-heartbeat">✓</span>
                      <span>{selectedImage.name}</span>
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Template Selector */}
            <div className="bg-gradient-to-br from-slate-800/60 to-slate-700/60 border border-slate-500/30 rounded-2xl p-6 backdrop-blur-xl hover:border-slate-400/50 transition-all duration-500 hover:shadow-xl hover:shadow-slate-500/20 animate-slide-in-left" style={{ animationDelay: '100ms' }}>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🎨</span>
                <p className="text-sm font-bold text-gray-200">Portfolio Template</p>
              </div>
              <button
                onClick={() => setShowTemplates(!showTemplates)}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white font-semibold transition-all duration-300 text-left flex items-center justify-between group hover:shadow-lg"
              >
                <span className="group-hover:text-gray-300 transition-colors">{portfolioTemplates[selectedTemplate]?.name || "Modern"}</span>
                <span className={`text-xl transition-transform duration-300 ${showTemplates ? 'rotate-180' : ''}`}>▼</span>
              </button>

              {showTemplates && (
                <div className="mt-4 space-y-2 max-h-60 overflow-y-auto custom-scrollbar animate-slide-up">
                  {Object.entries(portfolioTemplates).map(([key, template]) => (
                    <button
                      key={key}
                      onClick={() => {
                        setSelectedTemplate(key)
                        if (portfolioHtml) applyTemplate(key)
                      }}
                      disabled={isLoading}
                      className={`w-full p-4 rounded-lg text-left transition-all duration-300 transform hover:scale-[1.02] ${selectedTemplate === key
                        ? "bg-gradient-to-r from-gray-600 to-gray-800 text-white shadow-lg shadow-gray-500/30"
                        : "bg-slate-700/80 hover:bg-slate-600 text-gray-200 hover:shadow-md"
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      <div className="font-bold">{template.name}</div>
                      <div className="text-xs text-gray-300 mt-1">{template.description}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mode Selection */}
            {portfolioHtml && (
              <div className="bg-gradient-to-br from-slate-800/60 to-slate-700/60 border border-slate-500/30 rounded-2xl p-6 backdrop-blur-xl hover:border-slate-400/50 transition-all duration-500 hover:shadow-xl animate-slide-in-right" style={{ animationDelay: '200ms' }}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">⚙️</span>
                  <p className="text-sm font-bold text-gray-200">Generation Mode</p>
                </div>
                <div className="space-y-3">
                  <button
                    onClick={() => setGenerationMode("new")}
                    className={`w-full py-3 px-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 ${generationMode === "new"
                      ? "bg-gradient-to-r from-gray-600 to-gray-800 text-white shadow-lg shadow-gray-500/50"
                      : "bg-slate-700/80 text-gray-300 hover:bg-slate-600 hover:shadow-md"
                      }`}
                  >
                    ✨ New Design
                  </button>
                  <button
                    onClick={() => setGenerationMode("update")}
                    className={`w-full py-3 px-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 ${generationMode === "update"
                      ? "bg-gradient-to-r from-gray-700 to-black text-white shadow-lg shadow-gray-500/50"
                      : "bg-slate-700/80 text-gray-300 hover:bg-slate-600 hover:shadow-md"
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
              className={`w-full py-5 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 animate-scale-in relative overflow-hidden ${isLoading || !selectedImage
                ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 text-white hover:from-gray-500 hover:via-gray-600 hover:to-gray-700 shadow-xl shadow-gray-500/50 hover:shadow-2xl hover:shadow-gray-500/60 animate-glow"
                }`}
              style={{ animationDelay: '300ms' }}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-3">
                  <span className="animate-rotate text-2xl">⚙️</span>
                  <span className="animate-pulse">Generating Magic...</span>
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-bounce">{generationMode === "update" ? "🎨" : "✨"}</span>
                  <span>{generationMode === "update" ? "Update" : "Generate"} Portfolio</span>
                </span>
              )}
            </button>

            {/* Theme Selector */}
            {portfolioHtml && (
              <div className="bg-gradient-to-br from-slate-800/60 to-slate-700/60 border border-slate-500/30 rounded-2xl p-6 backdrop-blur-xl hover:border-slate-400/50 transition-all duration-500 hover:shadow-xl animate-slide-in-left" style={{ animationDelay: '400ms' }}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">🌈</span>
                  <p className="text-sm font-bold text-gray-200">Choose Theme</p>
                </div>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="w-full bg-gradient-to-r from-slate-700 to-slate-600 border border-slate-500 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all duration-300 font-semibold cursor-pointer hover:from-slate-600 hover:to-slate-500"
                >
                  <optgroup label="Classic">
                    <option value="light">🌞 Light</option>
                    <option value="dark">🌙 Dark</option>
                  </optgroup>

                  <optgroup label="Romantic & Soft">
                    <option value="valentine">💖 Valentine</option>
                    <option value="rose">🌹 Rose</option>
                    <option value="lavender">💜 Lavender</option>
                  </optgroup>

                  <optgroup label="Vibrant & Energetic">
                    <option value="sunset">🌅 Sunset</option>
                    <option value="ocean">🌊 Ocean</option>
                    <option value="forest">🌲 Forest</option>
                  </optgroup>

                  <optgroup label="Professional & Corporate">
                    <option value="corporate">💼 Corporate</option>
                    <option value="navy">⚓ Navy</option>
                    <option value="slate">🏢 Slate</option>
                  </optgroup>

                  <optgroup label="Modern & Tech">
                    <option value="cyberpunk">🤖 Cyberpunk</option>
                    <option value="neon">⚡ Neon</option>
                    <option value="matrix">💻 Matrix</option>
                  </optgroup>

                  <optgroup label="Seasonal">
                    <option value="halloween">🎃 Halloween</option>
                    <option value="christmas">🎄 Christmas</option>
                    <option value="spring">🌸 Spring</option>
                  </optgroup>

                  <optgroup label="Elegant & Luxury">
                    <option value="gold">✨ Gold</option>
                    <option value="platinum">💎 Platinum</option>
                    <option value="emerald">💚 Emerald</option>
                  </optgroup>

                  <optgroup label="Creative & Artistic">
                    <option value="sunset_purple">🌇 Sunset Purple</option>
                    <option value="mint">🍃 Mint</option>
                    <option value="coral">🪸 Coral</option>
                  </optgroup>

                  <optgroup label="Minimalist">
                    <option value="monochrome">⚫ Monochrome</option>
                    <option value="cream">☕ Cream</option>
                  </optgroup>

                  <optgroup label="Bold & Dramatic">
                    <option value="midnight">🌃 Midnight</option>
                    <option value="ruby">💎 Ruby</option>
                    <option value="sapphire">💠 Sapphire</option>
                  </optgroup>
                </select>
              </div>
            )}

            {/* Download Button */}
            {portfolioHtml && (
              <button
                onClick={downloadHTML}
                className="w-full py-5 rounded-xl bg-gradient-to-r from-gray-700 via-gray-800 to-black hover:from-gray-600 hover:via-gray-700 hover:to-gray-900 text-white font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl shadow-gray-500/50 hover:shadow-2xl hover:shadow-gray-500/60 animate-slide-in-right relative overflow-hidden group"
                style={{ animationDelay: '500ms' }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black to-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="flex items-center justify-center gap-2 relative z-10">
                  <span className="group-hover:animate-bounce">⬇️</span>
                  <span>Download HTML</span>
                </span>
              </button>
            )}

            {/* Save Portfolio Button */}
            {portfolioHtml && (
              <button
                onClick={() => setShowSaveModal(true)}
                className="w-full py-5 rounded-xl bg-gradient-to-r from-gray-600 via-gray-700 to-gray-900 hover:from-gray-500 hover:via-gray-600 hover:to-gray-800 text-white font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl shadow-gray-500/50 hover:shadow-2xl hover:shadow-gray-500/60 animate-slide-in-left relative overflow-hidden group"
                style={{ animationDelay: '600ms' }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="flex items-center justify-center gap-2 relative z-10">
                  <span className="group-hover:animate-heartbeat">💾</span>
                  <span>Save Portfolio</span>
                </span>
              </button>
            )}

            {/* Share Current Portfolio Button */}
            {portfolioHtml && currentPortfolioId && (
              <button
                onClick={shareCurrentPortfolio}
                className="w-full py-5 rounded-xl bg-gradient-to-r from-gray-500 via-gray-600 to-gray-800 hover:from-gray-400 hover:via-gray-500 hover:to-gray-700 text-white font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl shadow-gray-500/50 hover:shadow-2xl hover:shadow-gray-500/60 animate-slide-in-right relative overflow-hidden group"
                style={{ animationDelay: '700ms' }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="flex items-center justify-center gap-2 relative z-10">
                  <span className="group-hover:animate-bounce">🔗</span>
                  <span>Share Portfolio</span>
                </span>
              </button>
            )}

            {/* My Portfolios Button */}
            <button
              onClick={() => setShowPortfoliosList(!showPortfoliosList)}
              className="w-full py-5 rounded-xl bg-gradient-to-r from-gray-700 via-gray-800 to-black hover:from-gray-600 hover:via-gray-700 hover:to-gray-900 text-white font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl shadow-gray-500/50 hover:shadow-2xl hover:shadow-gray-500/60 animate-slide-in-left relative overflow-hidden group"
              style={{ animationDelay: '800ms' }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black to-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="flex items-center justify-center gap-2 relative z-10">
                <span className="group-hover:animate-bounce">📂</span>
                <span>My Portfolios ({savedPortfolios.length})</span>
              </span>
            </button>
          </div>
        </div>

        {/* Right Column - Preview */}
        {portfolioHtml && (
          <div className={`md:col-span-2 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-gradient-to-br from-slate-800/40 to-slate-700/40 border border-gray-500/30 rounded-2xl overflow-hidden backdrop-blur-xl shadow-2xl hover:shadow-gray-500/20 transition-all duration-500 hover:border-gray-400/50">
              <div className="bg-gradient-to-r from-gray-800/30 via-gray-700/20 to-gray-900/30 px-6 py-5 border-b border-gray-500/30 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-lg text-white flex items-center gap-2">
                    <span className="text-2xl">📱</span>
                    <span>Live Preview</span>
                    <span className="text-sm font-normal px-3 py-1 bg-gray-500/30 rounded-full border border-gray-400/30">{theme}</span>
                  </p>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-400 animate-pulse"></div>
                    <div className="w-3 h-3 rounded-full bg-gray-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-3 h-3 rounded-full bg-gray-600 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
              <div className="overflow-hidden rounded-b-2xl">
                <PortfolioPreview html={portfolioHtml} theme={theme} key={theme} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Save Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-gray-500/30 rounded-2xl p-8 max-w-md w-full shadow-2xl animate-scale-in">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              💾 Save Portfolio
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Title *</label>
                <input
                  type="text"
                  value={saveTitle}
                  onChange={(e) => setSaveTitle(e.target.value)}
                  placeholder="My Awesome Portfolio"
                  className="w-full bg-slate-700 border border-slate-600 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-gray-400 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Description (Optional)</label>
                <textarea
                  value={saveDescription}
                  onChange={(e) => setSaveDescription(e.target.value)}
                  placeholder="A brief description of this portfolio..."
                  rows={3}
                  className="w-full bg-slate-700 border border-slate-600 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-gray-400 transition resize-none"
                />
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowSaveModal(false)
                    setSaveTitle("")
                    setSaveDescription("")
                  }}
                  className="flex-1 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-semibold transition transform hover:scale-105"
                >
                  Cancel
                </button>
                <button
                  onClick={savePortfolio}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-500 hover:to-gray-700 text-white font-semibold transition transform hover:scale-105 shadow-lg shadow-gray-500/30 hover:shadow-xl hover:shadow-gray-500/50"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-gray-500/30 rounded-2xl p-8 max-w-md w-full shadow-2xl animate-scale-in">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              🔗 Share Portfolio
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Share Link</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={shareUrl}
                    readOnly
                    className="flex-1 bg-slate-700 border border-slate-600 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-gray-400 transition"
                  />
                  <button
                    onClick={copyShareLink}
                    className="px-4 py-3 rounded-xl bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-500 hover:to-gray-700 text-white font-semibold transition transform hover:scale-105 shadow-lg shadow-gray-500/30 hover:shadow-xl hover:shadow-gray-500/50 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative z-10 group-hover:animate-bounce">📋 Copy</span>
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-2">Anyone with this link can view your portfolio</p>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowShareModal(false)
                    setShareUrl("")
                  }}
                  className="flex-1 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-semibold transition transform hover:scale-105"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Portfolios List Modal */}
      {showPortfoliosList && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-gray-500/30 rounded-2xl p-8 max-w-3xl w-full max-h-[80vh] overflow-hidden shadow-2xl flex flex-col animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                📂 My Portfolios
              </h2>
              <button
                onClick={() => setShowPortfoliosList(false)}
                className="text-gray-400 hover:text-white text-2xl transition"
              >
                ✕
              </button>
            </div>

            <div className="overflow-y-auto flex-1 space-y-3">
              {savedPortfolios.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <p className="text-4xl mb-4">📭</p>
                  <p>No saved portfolios yet</p>
                  <p className="text-sm mt-2">Generate and save your first portfolio!</p>
                </div>
              ) : (
                savedPortfolios.map((portfolio, index) => (
                  <div
                    key={portfolio._id}
                    className={`bg-slate-700/50 border rounded-xl p-5 hover:border-gray-400/50 transition hover:scale-[1.02] hover:shadow-lg hover:shadow-gray-500/20 animate-fade-in-scale ${currentPortfolioId === portfolio._id ? "border-gray-400 animate-glow" : "border-slate-600/30"
                      }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-white mb-1">{portfolio.title}</h3>
                        {portfolio.description && (
                          <p className="text-gray-400 text-sm mb-2">{portfolio.description}</p>
                        )}
                        <div className="flex gap-3 text-xs text-gray-500 flex-wrap">
                          <span>🎨 {portfolio.template || "modern"}</span>
                          <span>🌈 {portfolio.theme || "light"}</span>
                          <span>📅 {new Date(portfolio.createdAt).toLocaleDateString()}</span>
                          {portfolio.isPublic && (
                            <span className="text-gray-300 font-semibold">🔗 Public ({portfolio.shareCount || 0} views)</span>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2 flex-wrap">
                        <button
                          onClick={() => loadPortfolio(portfolio)}
                          className="px-4 py-2 rounded-lg bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-500 hover:to-gray-700 text-white text-sm font-semibold transition transform hover:scale-105 shadow-md hover:shadow-lg"
                        >
                          Load
                        </button>
                        {portfolio.isPublic ? (
                          <button
                            onClick={() => unsharePortfolio(portfolio._id)}
                            className="px-4 py-2 rounded-lg bg-gray-600/80 hover:bg-gray-700 text-white text-sm font-semibold transition transform hover:scale-105 shadow-md hover:shadow-lg"
                          >
                            🔒 Unshare
                          </button>
                        ) : (
                          <button
                            onClick={() => sharePortfolio(portfolio._id)}
                            className="px-4 py-2 rounded-lg bg-gray-500/80 hover:bg-gray-600 text-white text-sm font-semibold transition transform hover:scale-105 shadow-md hover:shadow-lg"
                          >
                            🔗 Share
                          </button>
                        )}
                        <button
                          onClick={() => deletePortfolio(portfolio._id)}
                          className="px-4 py-2 rounded-lg bg-gray-700/80 hover:bg-gray-800 text-white text-sm font-semibold transition transform hover:scale-105 hover:animate-shake shadow-md hover:shadow-lg"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

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
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.05); }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
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

        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* NEW ANIMATIONS */
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(107, 114, 128, 0.4),
                        0 0 40px rgba(107, 114, 128, 0.2);
          }
          50% {
            box-shadow: 0 0 30px rgba(107, 114, 128, 0.6),
                        0 0 60px rgba(107, 114, 128, 0.3);
          }
        }

        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          10%, 30% { transform: scale(1.1); }
          20%, 40% { transform: scale(1); }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-scale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
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
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }

        .animate-slide-down {
          animation: slide-down 0.3s ease-out forwards;
        }

        .animate-shimmer {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }

        .animate-bounce {
          animation: bounce 2s ease-in-out infinite;
        }

        .animate-rotate {
          animation: rotate 2s linear infinite;
        }

        .animate-scale-in {
          animation: scale-in 0.5s ease-out forwards;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.6s ease-out forwards;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.6s ease-out forwards;
        }

        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }

        .animate-heartbeat {
          animation: heartbeat 1.5s ease-in-out infinite;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }

        .animate-fade-in-scale {
          animation: fade-in-scale 0.4s ease-out forwards;
        }

        /* Custom Scrollbar */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(51, 65, 85, 0.3);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #6b7280, #374151);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #4b5563, #1f2937);
        }

        /* Theme Selector Dropdown Styling */
        select option {
          background-color: #334155 !important;
          color: white !important;
          padding: 10px !important;
          font-weight: 600 !important;
        }

        select optgroup {
          background-color: #1e293b !important;
          color: #9ca3af !important;
          font-weight: 700 !important;
          padding: 8px !important;
        }

        select option:hover {
          background-color: #475569 !important;
        }

        select option:checked {
          background-color: #4b5563 !important;
          color: white !important;
        }
      `}</style>


      {/* Change Password Modal */}
      {showPasswordModal && (
        <ChangePasswordModal
          onClose={() => setShowPasswordModal(false)}
        />
      )}

      {/* Account Management Modal */}
      {showAccountModal && (
        <AccountManagementModal
          userName={userName}
          userEmail={userEmail}
          onClose={() => setShowAccountModal(false)}
          onUpdate={(newName, newEmail) => {
            setUserName(newName)
            setUserEmail(newEmail)
          }}
        />
      )}
    </main>
  )
}



// Account Management Modal Component
const AccountManagementModal = ({ userName, userEmail, onClose, onUpdate }) => {
  const [name, setName] = useState(userName)
  const [email, setEmail] = useState(userEmail)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!name.trim()) {
      setError('Name is required')
      return
    }

    if (!email.trim() || !email.includes('@')) {
      setError('Valid email is required')
      return
    }

    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const res = await fetch('http://localhost:5000/api/user/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, email })
      })

      const data = await res.json()

      if (res.ok) {
        // Update local storage
        const userData = { name, email }
        localStorage.setItem('user', JSON.stringify(userData))

        // Update parent component state
        onUpdate(name, email)

        setSuccess('Profile updated successfully!')
        setTimeout(() => {
          onClose()
        }, 1500)
      } else {
        setError(data.message || 'Failed to update profile')
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      setError('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 animate-fade-in" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-scale-in" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">👤 My Account</h2>
          <button className="text-gray-400 hover:text-gray-600 text-2xl" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            {error && <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl">{error}</div>}
            {success && <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-xl">{success}</div>}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter your name"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-gray-500 focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-gray-500 focus:outline-none transition"
              />
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>📅</span>
                <span>Member since: {new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3 p-6 border-t border-gray-200">
            <button type="button" className="flex-1 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold transition" onClick={onClose}>Cancel</button>
            <button type="submit" className="flex-1 py-3 rounded-xl bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-500 hover:to-gray-700 text-white font-semibold transition shadow-lg" disabled={loading}>
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Change Password Modal Component
const ChangePasswordModal = ({ onClose }) => {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match')
      return
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }

    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const res = await fetch('http://localhost:5000/api/user/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ currentPassword, newPassword })
      })

      const data = await res.json()

      if (res.ok) {
        alert('Password changed successfully!')
        onClose()
      } else {
        setError(data.message || 'Failed to change password')
      }
    } catch (error) {
      console.error('Error changing password:', error)
      setError('Failed to change password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 animate-fade-in" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-scale-in" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">🔐 Change Password</h2>
          <button className="text-gray-400 hover:text-gray-600 text-2xl" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            {error && <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl">{error}</div>}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                placeholder="Enter current password"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-gray-500 focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                placeholder="Enter new password"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-gray-500 focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm new password"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-gray-500 focus:outline-none transition"
              />
            </div>
          </div>

          <div className="flex gap-3 p-6 border-t border-gray-200">
            <button type="button" className="flex-1 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold transition" onClick={onClose}>Cancel</button>
            <button type="submit" className="flex-1 py-3 rounded-xl bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-500 hover:to-gray-700 text-white font-semibold transition shadow-lg" disabled={loading}>
              {loading ? 'Changing...' : 'Change Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}


