"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import PortfolioPreview from "@/components/PortfolioPreview"

export default function SharedPortfolioPage() {
    const params = useParams()
    const token = params.token
    const [portfolio, setPortfolio] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchSharedPortfolio = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/portfolio/shared/${token}`)

                if (!res.ok) {
                    throw new Error("Portfolio not found or not public")
                }

                const data = await res.json()
                setPortfolio(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setIsLoading(false)
            }
        }

        if (token) {
            fetchSharedPortfolio()
        }
    }, [token])

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4 animate-bounce">📄</div>
                    <p className="text-white text-xl font-semibold">Loading portfolio...</p>
                </div>
            </div>
        )
    }

    if (error || !portfolio) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center px-4">
                <div className="text-center max-w-md">
                    <div className="text-6xl mb-4">😔</div>
                    <h1 className="text-3xl font-bold text-white mb-4">Portfolio Not Found</h1>
                    <p className="text-gray-300 mb-6">
                        This portfolio doesn't exist or is no longer public.
                    </p>
                    <a
                        href="/"
                        className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold transition transform hover:scale-105"
                    >
                        Go to Home
                    </a>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 px-4 py-8">
            {/* Header */}
            <div className="max-w-6xl mx-auto mb-8">
                <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-6 backdrop-blur-sm">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                                {portfolio.title}
                            </h1>
                            {portfolio.description && (
                                <p className="text-gray-300 text-lg">{portfolio.description}</p>
                            )}
                            <div className="flex gap-4 mt-3 text-sm text-gray-400">
                                <span>🎨 {portfolio.template || "modern"}</span>
                                <span>🌈 {portfolio.theme || "light"}</span>
                                <span>👁️ {portfolio.shareCount || 0} views</span>
                            </div>
                        </div>
                        <a
                            href="/"
                            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold transition transform hover:scale-105 whitespace-nowrap"
                        >
                            Create Your Own
                        </a>
                    </div>
                </div>
            </div>

            {/* Portfolio Preview */}
            <div className="max-w-6xl mx-auto">
                <div className="bg-slate-800/30 border border-slate-600/30 rounded-2xl overflow-hidden backdrop-blur-sm shadow-2xl">
                    <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 px-6 py-4 border-b border-slate-600/30">
                        <p className="font-semibold text-gray-200">📱 Portfolio Preview</p>
                    </div>
                    <div className="overflow-hidden rounded-b-2xl">
                        <PortfolioPreview html={portfolio.content} theme={portfolio.theme || "light"} />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="max-w-6xl mx-auto mt-8 text-center">
                <p className="text-gray-400 text-sm">
                    Powered by AI Portfolio Generator 🚀
                </p>
            </div>
        </div>
    )
}
