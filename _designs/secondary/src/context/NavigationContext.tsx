import { createContext, useContext, useState, type ReactNode } from 'react'
import type { ScreenName } from '../types'

interface NavState {
  screen: ScreenName
  params?: Record<string, unknown>
  history: ScreenName[]
}

interface NavigationContextValue {
  current: NavState
  navigate: (screen: ScreenName, params?: Record<string, unknown>) => void
  goBack: () => void
  canGoBack: boolean
}

const NavigationContext = createContext<NavigationContextValue | null>(null)

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<NavState>({
    screen: 'splash',
    history: [],
  })

  function navigate(screen: ScreenName, params?: Record<string, unknown>) {
    setState(prev => ({
      screen,
      params,
      history: [...prev.history, prev.screen],
    }))
  }

  function goBack() {
    setState(prev => {
      const history = [...prev.history]
      const last = history.pop()
      return {
        screen: last ?? 'today',
        params: undefined,
        history,
      }
    })
  }

  return (
    <NavigationContext.Provider
      value={{
        current: state,
        navigate,
        goBack,
        canGoBack: state.history.length > 0,
      }}
    >
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const ctx = useContext(NavigationContext)
  if (!ctx) throw new Error('useNavigation must be used within NavigationProvider')
  return ctx
}
