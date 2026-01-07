"use client"

import { useEffect, useRef } from "react"
import { htmlThemes } from "@/config/htmlThemes"

export default function PortfolioPreview({ html, theme }) {
  const iframeRef = useRef(null)

  useEffect(() => {
    if (!iframeRef.current || !html) return

    const iframe = iframeRef.current
    const doc = iframe.contentDocument || iframe.contentWindow.document

    // Get theme CSS
    const themeCSS = htmlThemes[theme] || htmlThemes.light

    // Create complete HTML with theme injected
    let finalHTML = html

    // Remove existing style tags to prevent conflicts
    finalHTML = finalHTML.replace(/<style>[\s\S]*?<\/style>/g, "")

    const themeStyle = `<style>
${themeCSS}

/* Force theme on all elements */
html, body {
  background: var(--bg-color) !important;
  color: var(--text-color) !important;
  margin: 0;
  padding: 0;
  font-family: inherit;
}

* {
  color: var(--text-color) !important;
}

h1, h2, h3, h4, h5, h6 {
  color: var(--primary-color) !important;
}

a, [role="link"] {
  color: var(--primary-color) !important;
}

button, .btn, [role="button"], input[type="submit"], input[type="button"] {
  background-color: var(--primary-color) !important;
  color: var(--bg-color) !important;
  border-color: var(--primary-color) !important;
}

button:hover, .btn:hover {
  opacity: 0.9 !important;
}

section, article, .card, .container, div[class*="section"] {
  background: var(--bg-color) !important;
  color: var(--text-color) !important;
}

hr, .divider {
  border-color: var(--primary-color) !important;
}

input, textarea, select {
  background: var(--bg-color) !important;
  color: var(--text-color) !important;
  border-color: var(--primary-color) !important;
}

code, pre {
  background: var(--primary-color) !important;
  color: var(--bg-color) !important;
}
</style>`

    if (finalHTML.includes("</head>")) {
      finalHTML = finalHTML.replace("</head>", `${themeStyle}</head>`)
    } else if (finalHTML.includes("<body>")) {
      finalHTML = finalHTML.replace("<body>", `<head>${themeStyle}</head><body>`)
    } else {
      finalHTML = themeStyle + finalHTML
    }

    // Write to iframe
    doc.open()
    doc.write(finalHTML)
    doc.close()
  }, [html, theme])

  return (
    <iframe
      ref={iframeRef}
      className="w-full h-screen border-0"
      title="Portfolio Preview"
      sandbox="allow-same-origin"
    />
  )
}
