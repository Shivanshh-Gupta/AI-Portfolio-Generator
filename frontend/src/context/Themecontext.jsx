"use client"
import themes from "@/config/theme"
import { createContext, useContext, useState } from "react"

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("minimal")
  const [font, setFont] = useState("font-sans")

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        styles: themes[theme],
        font,
        setFont,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
