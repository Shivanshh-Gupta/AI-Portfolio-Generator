"use client"

export default function Customizer({ theme, setTheme }) {
  return (
    <div className="mb-4">
      <label className="block mb-1 font-medium">Theme</label>
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        className="border px-3 py-2 rounded"
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  )
}
