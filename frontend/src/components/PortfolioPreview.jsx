import { useState, useEffect } from "react"
import { htmlThemes } from "@/config/htmlThemes"

export default function PortfolioPreview({ html, theme }) {
  const [previewUrl, setPreviewUrl] = useState(null)

  useEffect(() => {
    if (!html) return

    // Get theme CSS — always inject LAST so it overrides base styles
    const themeCSS = htmlThemes[theme] || htmlThemes.dark

    // Wrap theme CSS in a <style> tag with high-specificity comment
    const themeStyle = `<style id="theme-override">
/* === Theme Override: ${theme} === */
${themeCSS}
</style>`

    let finalHTML = html

    // Inject theme style just before </head> so it overrides everything
    if (finalHTML.includes("</head>")) {
      finalHTML = finalHTML.replace("</head>", `${themeStyle}\n</head>`)
    } else if (finalHTML.includes("</Head>")) {
      finalHTML = finalHTML.replace("</Head>", `${themeStyle}\n</Head>`)
    } else if (finalHTML.includes("<body")) {
      // Insert before <body ...>
      finalHTML = finalHTML.replace(/<body/i, `<head>${themeStyle}</head>\n<body`)
    } else {
      finalHTML = themeStyle + finalHTML
    }

    // Create Blob URL
    const blob = new Blob([finalHTML], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    setPreviewUrl(url)

    // Cleanup previous blob URL
    return () => URL.revokeObjectURL(url)
  }, [html, theme])

  if (!previewUrl) {
    return (
      <div style={{
        width: "100%",
        minHeight: "600px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#64748b",
        fontSize: "0.9rem",
        background: "rgba(255,255,255,0.02)"
      }}>
        Loading preview...
      </div>
    )
  }

  return (
    <iframe
      src={previewUrl}
      style={{ width: "100%", minHeight: "85vh", border: "none", display: "block" }}
      title="Portfolio Preview"
    />
  )
}
