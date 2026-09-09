import { createContext, useContext, useMemo, useState, type ReactNode } from "react"

export type Theme = "light" | "dark"

const STORAGE = "sgi-theme"

type ThemeContextValue = {
  theme: Theme
  toggle: () => void
}

function readTheme(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE)
    if (stored === "dark" || stored === "light") return stored
  } catch {
    /* storage can be unavailable in privacy modes */
  }
  return "light"
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme)
  document.documentElement.style.colorScheme = theme
  const meta = document.querySelector('meta[name="theme-color"]')
  meta?.setAttribute("content", theme === "dark" ? "#0B0E13" : "#F3EEE4")
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  toggle: () => {},
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => readTheme())

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      toggle: () => {
        setTheme((current) => {
          const next: Theme = current === "dark" ? "light" : "dark"
          try {
            localStorage.setItem(STORAGE, next)
          } catch {
            /* non-fatal */
          }
          applyTheme(next)
          return next
        })
      },
    }),
    [theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}
