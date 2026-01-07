export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 backdrop-blur bg-black/60 border-b border-gray-800">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          
          {/* Logo */}
          <div className="text-xl font-bold tracking-wide">
            NextgenFolio<span className="text-gray-400"> AI</span>
          </div>

          {/* Links */}
          <div className="hidden md:flex items-center gap-8 text-gray-300">
            <a href="/" className="hover:text-white transition">Home</a>
            <a href="#features" className="hover:text-white transition">Features</a>
          </div>

          {/* Auth buttons */}
          <div className="flex items-center gap-3">
            <a
              href="/login"
              className="px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-800 transition"
            >
              Login
            </a>
            <a
              href="/signup"
              className="px-5 py-2 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition"
            >
              Get Started
            </a>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 py-28 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
          NextgenFolio AI
        </h1>

        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-12">
          Convert your resume into a{" "}
          <span className="text-white font-semibold">
            premium developer portfolio
          </span>{" "}
          using AI. Upload your CV, choose a theme, and export a ready-to-use
          website.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <a
            href="/signup"
            className="px-8 py-4 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition"
          >
            Get Started Free
          </a>

          <a
            href="/login"
            className="px-8 py-4 rounded-xl border border-gray-500 text-white hover:bg-gray-800 transition"
          >
            Login
          </a>
        </div>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-8"
      >
        {[
          {
            title: "Upload Resume",
            desc: "Upload your PDF resume and let AI understand your profile.",
          },
          {
            title: "Choose Theme",
            desc: "Light, Dark, Valentine, Halloween & more themes.",
          },
          {
            title: "Download HTML",
            desc: "Export a complete portfolio website instantly.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-gray-900/80 border border-gray-700 rounded-2xl p-8 text-center backdrop-blur"
          >
            <h3 className="text-xl font-semibold mb-3 text-white">
              {item.title}
            </h3>
            <p className="text-gray-400">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-800 py-6 text-center text-gray-500">
        © {new Date().getFullYear()} NextgenFolio AI
      </footer>
    </main>
  )
}
