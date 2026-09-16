import type { ReactElement } from 'react'
import { useNavigation } from '../../context/NavigationContext'
import type { ScreenName } from '../../types'

interface Tab {
  id: ScreenName
  label: string
  icon: (active: boolean) => ReactElement
}

const tabs: Tab[] = [
  {
    id: 'today',
    label: 'Bugün',
    icon: (active) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L3 9v13h6v-5h6v5h6V9L12 2z" stroke={active ? '#5B5CE2' : '#A0A0B2'} strokeWidth={active ? 2.2 : 1.8} strokeLinejoin="round" fill={active ? 'rgba(91,92,226,0.12)' : 'none'}/>
      </svg>
    ),
  },
  {
    id: 'flow',
    label: 'Akış',
    icon: (active) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M4 6h16M4 10h10M4 14h12M4 18h8" stroke={active ? '#5B5CE2' : '#A0A0B2'} strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round"/>
        {active && <circle cx="20" cy="18" r="3" fill="#5B5CE2"/>}
      </svg>
    ),
  },
  {
    id: 'plan',
    label: 'Plan',
    icon: (active) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="17" rx="3" stroke={active ? '#5B5CE2' : '#A0A0B2'} strokeWidth={active ? 2.2 : 1.8} fill={active ? 'rgba(91,92,226,0.08)' : 'none'}/>
        <path d="M16 2v4M8 2v4M3 9h18" stroke={active ? '#5B5CE2' : '#A0A0B2'} strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round"/>
        <circle cx="8" cy="14" r="1.2" fill={active ? '#5B5CE2' : '#A0A0B2'}/>
        <circle cx="12" cy="14" r="1.2" fill={active ? '#5B5CE2' : '#A0A0B2'}/>
        <circle cx="8" cy="18" r="1.2" fill={active ? '#5B5CE2' : '#A0A0B2'}/>
      </svg>
    ),
  },
  {
    id: 'assistant',
    label: 'Asistan',
    icon: (active) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke={active ? '#5B5CE2' : '#A0A0B2'} strokeWidth={active ? 2.2 : 1.8} fill={active ? 'rgba(91,92,226,0.08)' : 'none'}/>
        <path d="M8 12h2l2-4 2 8 2-4h2" stroke={active ? '#5B5CE2' : '#A0A0B2'} strokeWidth={active ? 2 : 1.8} strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

export default function BottomNav() {
  const { current, navigate } = useNavigation()
  const mainScreens: ScreenName[] = ['today', 'flow', 'plan', 'assistant']
  const activeTab = mainScreens.includes(current.screen) ? current.screen : null

  return (
    <div
      className="flex-shrink-0 flex items-center"
      style={{
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(232,232,240,0.8)',
        paddingBottom: 24,
        paddingTop: 8,
        height: 82,
      }}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id
        return (
          <button
            key={tab.id}
            className="flex-1 flex flex-col items-center gap-1 transition-opacity"
            style={{ opacity: 1, background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0' }}
            onClick={() => navigate(tab.id)}
          >
            <div style={{ transition: 'transform 0.2s ease', transform: isActive ? 'scale(1.05)' : 'scale(1)' }}>
              {tab.icon(isActive)}
            </div>
            <span
              className="text-xs"
              style={{
                fontWeight: isActive ? 600 : 500,
                color: isActive ? '#5B5CE2' : '#A0A0B2',
                fontSize: 10,
                letterSpacing: '0.01em',
              }}
            >
              {tab.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
