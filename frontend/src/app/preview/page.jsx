"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import PortfolioPreview from "@/components/PortfolioPreview"

function PreviewContent() {
  const searchParams = useSearchParams()
  const html = decodeURIComponent(searchParams.get("html") || "")
  const theme = searchParams.get("theme") || "light"

  return (
    <div className="min-h-screen">
      <PortfolioPreview html={html} theme={theme} />
    </div>
  )
}

export default function PreviewPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading preview...</div>}>
      <PreviewContent />
    </Suspense>
  )
}

