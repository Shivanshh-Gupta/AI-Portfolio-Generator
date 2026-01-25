"use client"

export default function GoogleAuthButton({ label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition font-medium"
    >
      <svg className="w-5 h-5" viewBox="0 0 48 48">
<<<<<<< HEAD
        <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.5l6.7-6.7C35.5 2.5 30.1 0 24 0 14.6 0 6.6 5.4 2.7 13.3l7.8 6.1C12.4 13.2 17.7 9.5 24 9.5z" />
        <path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-2.8-.4-4.1H24v7.8h12.7c-.6 3-2.3 5.5-4.9 7.2l7.5 5.8c4.4-4.1 7-10.1 7-16.7z" />
        <path fill="#FBBC05" d="M10.5 28.4c-.5-1.4-.8-2.8-.8-4.4s.3-3 .8-4.4l-7.8-6.1C.9 17 .9 31 .9 31z" />
        <path fill="#34A853" d="M24 48c6.1 0 11.3-2 15.1-5.5l-7.5-5.8c-2.1 1.4-4.8 2.3-7.6 2.3-6.3 0-11.6-3.7-13.5-8.9l-7.8 6.1C6.6 42.6 14.6 48 24 48z" />
=======
        <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.5l6.7-6.7C35.5 2.5 30.1 0 24 0 14.6 0 6.6 5.4 2.7 13.3l7.8 6.1C12.4 13.2 17.7 9.5 24 9.5z"/>
        <path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-2.8-.4-4.1H24v7.8h12.7c-.6 3-2.3 5.5-4.9 7.2l7.5 5.8c4.4-4.1 7-10.1 7-16.7z"/>
        <path fill="#FBBC05" d="M10.5 28.4c-.5-1.4-.8-2.8-.8-4.4s.3-3 .8-4.4l-7.8-6.1C.9 17 .9 31 .9 31z"/>
        <path fill="#34A853" d="M24 48c6.1 0 11.3-2 15.1-5.5l-7.5-5.8c-2.1 1.4-4.8 2.3-7.6 2.3-6.3 0-11.6-3.7-13.5-8.9l-7.8 6.1C6.6 42.6 14.6 48 24 48z"/>
>>>>>>> 8704c0d2b0435dd392d86958e1c5065b0c1bc970
      </svg>
      {label}
    </button>
  )
}
