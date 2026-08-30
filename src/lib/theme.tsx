import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react"

export type Theme = "light" | "dark"

const STORAGE = "sgi-theme"

function readTheme(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE)
    if (stored === "dark" || stored === "light") return stored
  } catch {
    /* ignore */
  }
  return "light"
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme)
  document.documentElement.style.colorScheme = theme
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute("content", theme === "dark" ? "#0B0E13" : "#F3EEE4")
}

const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({
  theme: "light",
  toggle: () => {},
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() =>
    typeof document !== "undefined" ? (document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light") : "light",
  )

  useEffect(() => {
    const next = readTheme()
    setTheme(next)
    applyTheme(next)
  }, [])

  const value = useMemo(
    () => ({
      theme,
      toggle: () => {
        const next: Theme = theme === "dark" ? "light" : "dark"
        setTheme(next)
        try {
          localStorage.setItem(STORAGE, next)
        } catch {
          /* ignore */
        }
        applyTheme(next)
      },
    }),
    [theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}
