"use client"

import { useState, useEffect } from "react"
import { htmlThemes } from "@/config/htmlThemes"

export default function PortfolioPreview({ html, theme }) {
  console.log("PortfolioPreview received HTML:", html ? html.substring(0, 100) + "..." : "EMPTY/NULL")
  const [previewUrl, setPreviewUrl] = useState(null)

  useEffect(() => {
    if (!html) return

    // Get theme CSS
    const themeCSS = htmlThemes[theme] || htmlThemes.light

    // Create complete HTML with theme injected
    let finalHTML = html

    // DON'T remove existing style tags - they contain important styling!
    // Just add theme CSS variables

    const themeStyle = `<style>
${themeCSS}
</style>`

    if (finalHTML.includes("</head>")) {
      finalHTML = finalHTML.replace("</head>", `${themeStyle}</head>`)
    } else if (finalHTML.includes("<body>")) {
      finalHTML = finalHTML.replace("<body>", `<head>${themeStyle}</head><body>`)
    } else {
      finalHTML = themeStyle + finalHTML
    }

    // Create Blob URL
    const blob = new Blob([finalHTML], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    setPreviewUrl(url)

    // Cleanup
    return () => URL.revokeObjectURL(url)
  }, [html, theme])

  if (!previewUrl) return <div className="w-full h-screen bg-white flex items-center justify-center text-gray-400">Loading preview...</div>

  return (
    <iframe
      src={previewUrl}
      className="w-full h-screen border-0 bg-white"
      title="Portfolio Preview"
    />
  )
}
