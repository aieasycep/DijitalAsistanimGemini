import { createContext, useContext, useState, ReactNode } from 'react'

export type ThemeMode = 'system' | 'light' | 'dark'

interface ThemeContextValue {
  mode: ThemeMode
  isDark: boolean
  setMode: (m: ThemeMode) => void
  t: {
    bg: string; surface: string; surface2: string; border: string
    text: string; textSec: string; textMuted: string
    primary: string; primarySoft: string
    critical: string; criticalSoft: string
    success: string; successSoft: string
    warning: string; warningSoft: string
  }
}

const light = {
  bg: '#F8F8FC', surface: '#FFFFFF', surface2: '#F1F1F8', border: '#E8E8F0',
  text: '#0F0F1A', textSec: '#6B6B80', textMuted: '#A0A0B2',
  primary: '#5B5CE2', primarySoft: '#EEEEFF',
  critical: '#C0251B', criticalSoft: '#FFEEED',
  success: '#1A7A33', successSoft: '#E8F8EE',
  warning: '#8C5200', warningSoft: '#FFF4E0',
}
const dark = {
  bg: '#0F0F1A', surface: '#1E1E2E', surface2: '#2A2A3C', border: '#3A3A50',
  text: '#EAEAF8', textSec: '#9090B8', textMuted: '#6060A0',
  primary: '#7B7CF4', primarySoft: '#2A2A4A',
  critical: '#FF6B6B', criticalSoft: '#3A1A1A',
  success: '#4CD47A', successSoft: '#0A2A1A',
  warning: '#FFAA44', warningSoft: '#2A1A00',
}

const ThemeContext = createContext<ThemeContextValue>({
  mode: 'light', isDark: false, setMode: () => {},
  t: light,
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('light')
  const systemDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches
  const isDark = mode === 'dark' || (mode === 'system' && systemDark)
  const t = isDark ? dark : light
  return (
    <ThemeContext.Provider value={{ mode, isDark, setMode, t }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
