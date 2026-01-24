'use client';

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white">

            {/* NAVBAR */}
            <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10 shadow-lg">
                <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                    {/* Logo with gradient */}
                    <a href="/" className="text-2xl font-bold tracking-wide bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                        NextgenFolio<span className="text-gray-400"> AI</span>
                    </a>

                    {/* Links */}
                    <div className="hidden md:flex items-center gap-8 text-gray-300">
                        <a href="/" className="hover:text-white transition-all duration-300 hover:scale-110">Home</a>
                        <a href="/#how-it-works" className="hover:text-white transition-all duration-300 hover:scale-110">How it Works</a>
                        <a href="/#features" className="hover:text-white transition-all duration-300 hover:scale-110">Features</a>
                        <a href="/terms" className="text-white">Terms</a>
                    </div>

                    {/* Auth buttons */}
                    <div className="flex items-center gap-3">
                        <a
                            href="/login"
                            className="px-5 py-2.5 rounded-lg border border-purple-500/50 text-gray-300 hover:bg-purple-500/20 hover:border-purple-400 transition-all duration-300 hover:scale-105"
                        >
                            Login
                        </a>
                        <a
                            href="/signup"
                            className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-500 hover:to-pink-500 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50"
                        >
                            Get Started
                        </a>
                    </div>
                </nav>
            </header>

            {/* CONTENT */}
            <div className="max-w-4xl mx-auto px-6 py-16">

                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                        Terms & Conditions
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                </div>

                {/* Terms Content */}
                <div className="space-y-8 text-gray-300">

                    {/* Section 1 */}
                    <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-purple-500/30 transition-all duration-300">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <span className="text-3xl">📜</span>
                            1. Acceptance of Terms
                        </h2>
                        <p className="leading-relaxed">
                            By accessing and using NextgenFolio AI, you accept and agree to be bound by the terms and provision of this agreement.
                            If you do not agree to these terms, please do not use our service. We reserve the right to modify these terms at any time,
                            and such modifications shall be effective immediately upon posting.
                        </p>
                    </section>

                    {/* Section 2 */}
                    <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-purple-500/30 transition-all duration-300">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <span className="text-3xl">🔒</span>
                            2. Privacy & Data Usage
                        </h2>
                        <p className="leading-relaxed mb-4">
                            Your privacy is important to us. When you upload your resume to NextgenFolio AI:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>We use AI to analyze and extract information from your resume</li>
                            <li>Your data is processed securely and is not shared with third parties</li>
                            <li>We may store your portfolio data to provide you with access to your generated portfolios</li>
                            <li>You retain all rights to your original content and generated portfolios</li>
                            <li>You can request deletion of your data at any time</li>
                        </ul>
                    </section>

                    {/* Section 3 */}
                    <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-purple-500/30 transition-all duration-300">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <span className="text-3xl">✅</span>
                            3. User Responsibilities
                        </h2>
                        <p className="leading-relaxed mb-4">
                            As a user of NextgenFolio AI, you agree to:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Provide accurate and truthful information in your resume</li>
                            <li>Not upload malicious files or content that violates any laws</li>
                            <li>Not attempt to reverse engineer or exploit our AI systems</li>
                            <li>Use the generated portfolios in accordance with applicable laws</li>
                            <li>Not use our service for any illegal or unauthorized purpose</li>
                        </ul>
                    </section>

                    {/* Section 4 */}
                    <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-purple-500/30 transition-all duration-300">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <span className="text-3xl">💼</span>
                            4. Service Usage & Limitations
                        </h2>
                        <p className="leading-relaxed mb-4">
                            NextgenFolio AI provides portfolio generation services with the following terms:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>The service is provided "as is" without warranties of any kind</li>
                            <li>We do not guarantee 100% accuracy in AI-generated content</li>
                            <li>Users should review and verify all generated portfolio content</li>
                            <li>We reserve the right to limit usage to prevent abuse</li>
                            <li>Service availability may vary and is not guaranteed 24/7</li>
                        </ul>
                    </section>

                    {/* Section 5 */}
                    <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-purple-500/30 transition-all duration-300">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <span className="text-3xl">©️</span>
                            5. Intellectual Property
                        </h2>
                        <p className="leading-relaxed">
                            All content, features, and functionality of NextgenFolio AI, including but not limited to text, graphics, logos,
                            and software, are owned by NextgenFolio AI and are protected by international copyright, trademark, and other
                            intellectual property laws. The portfolios generated using our service belong to you, but you acknowledge that
                            the underlying AI technology and templates are our proprietary property.
                        </p>
                    </section>

                    {/* Section 6 */}
                    <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-purple-500/30 transition-all duration-300">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <span className="text-3xl">⚖️</span>
                            6. Limitation of Liability
                        </h2>
                        <p className="leading-relaxed">
                            NextgenFolio AI shall not be liable for any indirect, incidental, special, consequential, or punitive damages
                            resulting from your use or inability to use the service. This includes, but is not limited to, damages for loss
                            of profits, data, or other intangible losses, even if we have been advised of the possibility of such damages.
                        </p>
                    </section>

                    {/* Section 7 */}
                    <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-purple-500/30 transition-all duration-300">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <span className="text-3xl">🔄</span>
                            7. Modifications to Service
                        </h2>
                        <p className="leading-relaxed">
                            We reserve the right to modify, suspend, or discontinue any part of our service at any time without prior notice.
                            We may also update our themes, features, and AI capabilities to improve user experience. Users will be notified
                            of significant changes through email or in-app notifications.
                        </p>
                    </section>

                    {/* Section 8 */}
                    <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-purple-500/30 transition-all duration-300">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <span className="text-3xl">📧</span>
                            8. Contact Information
                        </h2>
                        <p className="leading-relaxed mb-4">
                            If you have any questions about these Terms & Conditions, please contact us:
                        </p>
                        <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6 space-y-2">
                            <p className="flex items-center gap-2">
                                <span className="text-purple-400">📧 Email:</span>
                                <a href="mailto:support@nextgenfolio.ai" className="text-purple-300 hover:text-purple-200 transition-colors">
                                    support@nextgenfolio.ai
                                </a>
                            </p>
                            <p className="flex items-center gap-2">
                                <span className="text-purple-400">🌐 Website:</span>
                                <a href="/" className="text-purple-300 hover:text-purple-200 transition-colors">
                                    www.nextgenfolio.ai
                                </a>
                            </p>
                        </div>
                    </section>

                </div>

                {/* Back to Home Button */}
                <div className="mt-16 text-center">
                    <a
                        href="/"
                        className="inline-block px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg hover:from-purple-500 hover:to-pink-500 transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50"
                    >
                        ← Back to Home
                    </a>
                </div>

            </div>

            {/* FOOTER */}
            <footer className="border-t border-white/10 py-8 text-center text-gray-400 backdrop-blur-sm mt-20">
                <p className="mb-2">© {new Date().getFullYear()} NextgenFolio AI - Crafted with 💜</p>
                <p className="text-sm text-gray-500">Transform your career with AI-powered portfolios</p>
            </footer>

        </main>
    );
}
