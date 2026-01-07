"use client"

import { useSearchParams } from "next/navigation"
import PortfolioPreview from "@/components/PortfolioPreview"

export default function PreviewPage() {
  const searchParams = useSearchParams()
  const html = decodeURIComponent(searchParams.get("html") || "")
  const theme = searchParams.get("theme") || "light"

  return (
    <div className="min-h-screen">
      <PortfolioPreview html={html} theme={theme} />
    </div>
  )
}
