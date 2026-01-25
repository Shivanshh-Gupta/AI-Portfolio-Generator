'use client';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white overflow-hidden relative">

      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gray-500/15 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gray-400/20 rounded-full blur-3xl animate-float-slow"></div>
      </div>

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10 shadow-lg">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo with gradient */}
          <div className="text-2xl font-bold tracking-wide bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
            NextgenFolio<span className="text-gray-400"> AI</span>
          </div>

          {/* Links */}
          <div className="hidden md:flex items-center gap-8 text-gray-300">
            <a href="/" className="hover:text-white transition-all duration-300 hover:scale-110">Home</a>
            <a href="#how-it-works" className="hover:text-white transition-all duration-300 hover:scale-110">How it Works</a>
            <a href="#features" className="hover:text-white transition-all duration-300 hover:scale-110">Features</a>
            <a href="/terms" className="hover:text-white transition-all duration-300 hover:scale-110">Terms</a>
          </div>

          {/* Auth buttons */}
          <div className="flex items-center gap-3">
            <a
              href="/login"
              className="px-5 py-2.5 rounded-lg border border-gray-500/50 text-gray-300 hover:bg-gray-500/20 hover:border-gray-400 transition-all duration-300 hover:scale-105"
            >
              Login
            </a>
            <a
              href="/signup"
              className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-gray-700 to-gray-900 text-white font-semibold hover:from-gray-600 hover:to-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gray-500/50"
            >
              Get Started
            </a>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section className={`max-w-6xl mx-auto px-6 py-28 text-center relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

        {/* Glowing orb behind title */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl animate-pulse-slow"></div>

        <div className="relative z-10">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold mb-8 tracking-tight">
            <span className="bg-gradient-to-r from-white via-gray-300 to-gray-400 bg-clip-text text-transparent animate-gradient bg-300% inline-block">
              NextgenFolio AI
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-in-up">
            Convert your resume into a{" "}
            <span className="text-transparent bg-gradient-to-r from-white to-gray-300 bg-clip-text font-bold">
              premium developer portfolio
            </span>{" "}
            using AI. Upload your CV, choose a theme, and export a ready-to-use
            website in seconds.
          </p>

          <div className="flex justify-center gap-6 flex-wrap animate-fade-in-up-delayed">
            <a
              href="/signup"
              className="group px-10 py-5 rounded-2xl bg-gradient-to-r from-gray-700 to-gray-900 text-white font-bold text-lg hover:from-gray-600 hover:to-gray-800 transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-gray-500/50 relative overflow-hidden"
            >
              <span className="relative z-10">Get Started Free</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>

            <a
              href="/login"
              className="px-10 py-5 rounded-2xl border-2 border-gray-500/50 text-white font-bold text-lg hover:bg-gray-500/20 hover:border-gray-400 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
            >
              Login
            </a>
          </div>

          {/* Floating stats/badges */}
          <div className="mt-20 flex justify-center gap-8 flex-wrap">
            <div className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 animate-float">
              <span className="text-gray-300 font-semibold">⚡ Lightning Fast</span>
            </div>
            <div className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 animate-float-delayed">
              <span className="text-gray-300 font-semibold">🎨 Beautiful Themes</span>
            </div>
            <div className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 animate-float-slow">
              <span className="text-white font-semibold">🤖 AI Powered</span>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          How it Works
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            {
              step: "1",
              title: "Upload Resume",
              desc: "Upload your PDF resume or CV",
              icon: "📤",
              color: "from-gray-600 to-gray-800"
            },
            {
              step: "2",
              title: "AI Analysis",
              desc: "AI extracts and analyzes your data",
              icon: "🤖",
              color: "from-gray-500 to-gray-700"
            },
            {
              step: "3",
              title: "Choose Theme",
              desc: "Select from beautiful themes",
              icon: "🎨",
              color: "from-gray-700 to-black"
            },
            {
              step: "4",
              title: "Download",
              desc: "Get your portfolio website",
              icon: "✨",
              color: "from-gray-600 to-gray-800"
            }
          ].map((item, i) => (
            <div key={i} className="relative">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300 hover:border-gray-400/50 animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}>
                <div className={`w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center text-white font-bold`}>
                  {item.step}
                </div>
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
              {i < 3 && (
                <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-gray-400 text-2xl z-20">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-8 relative z-10"
      >
        {[
          {
            title: "📄 Upload Resume",
            desc: "Upload your PDF resume and let AI understand your profile instantly.",
            gradient: "from-gray-700/20 to-gray-900/20",
            border: "border-gray-500/30",
            icon: "📄"
          },
          {
            title: "🎨 Choose Theme",
            desc: "Light, Dark, Valentine, Halloween & more stunning themes.",
            gradient: "from-gray-600/20 to-gray-800/20",
            border: "border-gray-500/30",
            icon: "🎨"
          },
          {
            title: "⬇️ Download HTML",
            desc: "Export a complete portfolio website instantly, ready to deploy.",
            gradient: "from-gray-700/20 to-gray-900/20",
            border: "border-gray-500/30",
            icon: "⬇️"
          },
        ].map((item, i) => (
          <div
            key={i}
            className={`group bg-gradient-to-br ${item.gradient} border ${item.border} rounded-3xl p-8 text-center backdrop-blur-xl hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-gray-500/30 cursor-pointer animate-fade-in-up`}
            style={{ animationDelay: `${i * 150}ms` }}
          >
            <div className="text-5xl mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
              {item.icon}
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
              {item.title}
            </h3>
            <p className="text-gray-300 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* TESTIMONIAL / STATS SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Why Choose NextgenFolio AI?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { number: "10K+", label: "Portfolios Created" },
            { number: "99%", label: "Satisfaction Rate" },
            { number: "5 Min", label: "Average Time" }
          ].map((stat, i) => (
            <div
              key={i}
              className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-gray-500/50 transition-all duration-300 hover:scale-105 animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-gray-400 text-lg">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-8 text-center text-gray-400 backdrop-blur-sm relative z-10">
        <p className="mb-2">© {new Date().getFullYear()} NextgenFolio AI - Crafted with 💜</p>
        <p className="text-sm text-gray-500">Transform your career with AI-powered portfolios</p>
      </footer>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

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

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
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

        .animate-gradient {
          background-size: 300% 300%;
          animation: gradient 6s ease infinite;
        }

        .bg-300% {
          background-size: 300% 300%;
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

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-fade-in-up-delayed {
          animation: fade-in-up 0.8s ease-out 0.3s forwards;
          opacity: 0;
        }
      `}</style>
    </main>
  )
}
