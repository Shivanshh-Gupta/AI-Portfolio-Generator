"use client"
import { useEffect, useRef } from "react"
import { htmlThemes } from "@/config/htmlThemes"

export default function PortfolioPreview({ html, theme }) {
  const iframeRef = useRef(null)

  useEffect(() => {
    if (!iframeRef.current || !html) return

    const iframe = iframeRef.current
    const doc = iframe.contentDocument

    // 1️⃣ Write raw HTML first
    doc.open()
    doc.write(html)
    doc.close()

    // 2️⃣ Inject theme CSS AFTER html is loaded (IMPORTANT)
    const style = doc.createElement("style")
    style.innerHTML = `
${htmlThemes[theme] || htmlThemes.light}

/* FORCE THEME */
html, body {
  background: var(--bg-color) !important;
  color: var(--text-color) !important;
}

* {
  background-color: transparent !important;
  color: var(--text-color) !important;
}

/* Headings */
h1, h2, h3, h4, h5, h6 {
  color: var(--primary-color) !important;
}

/* Buttons & Links */
a, button {
  color: var(--primary-color) !important;
  border-color: var(--primary-color) !important;
}
`
    doc.head.appendChild(style)   // 🔥 LAST CSS WINS
  }, [html, theme])

  return (
    <iframe
      ref={iframeRef}
      className="w-full h-[80vh] border rounded-lg bg-white"
    />
  )
}
