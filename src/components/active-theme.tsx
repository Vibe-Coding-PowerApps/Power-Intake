import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

const DEFAULT_THEME = 'default'

interface ThemeContextType {
  activeTheme: string
  setActiveTheme: (theme: string) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ActiveThemeProvider({ children, initialTheme }: { children: ReactNode, initialTheme?: string }) {
  const [activeTheme, setActiveTheme] = useState(initialTheme || DEFAULT_THEME)

  useEffect(() => {
    // Persist selection (use a distinct key to avoid colliding with next-themes)
    try {
      localStorage.setItem('active-theme', activeTheme)
    } catch (e) {
      /* ignore */
    }
  }, [activeTheme])

  // On mount, restore stored theme if available
  useEffect(() => {
    try {
      const stored = localStorage.getItem('active-theme')
      if (stored) setActiveTheme(stored)
    } catch (e) {
      /* ignore */
    }
  }, [])

  return (
    <ThemeContext.Provider value={{ activeTheme, setActiveTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useThemeConfig() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useThemeConfig must be used within ActiveThemeProvider')
  return context
}
