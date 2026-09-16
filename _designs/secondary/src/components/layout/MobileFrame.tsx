import type { ReactNode } from 'react'

interface MobileFrameProps {
  children: ReactNode
}

export default function MobileFrame({ children }: MobileFrameProps) {
  return (
    <div className="min-h-screen flex items-center justify-center py-8" style={{ background: 'linear-gradient(135deg, #DDDDF0 0%, #C8C8E8 100%)' }}>
      <div
        className="relative flex flex-col overflow-hidden"
        style={{
          width: 393,
          height: 852,
          borderRadius: 48,
          background: '#F8F8FC',
          boxShadow: '0 32px 80px rgba(15,15,26,0.28), 0 0 0 1px rgba(255,255,255,0.5), inset 0 0 0 1px rgba(0,0,0,0.08)',
        }}
      >
        {/* Status bar */}
        <div className="flex items-center justify-between px-6 pt-4 pb-1 flex-shrink-0" style={{ height: 44 }}>
          <span className="text-xs font-semibold" style={{ color: '#0F0F1A', letterSpacing: '-0.02em' }}>9:41</span>
          <div className="absolute left-1/2 -translate-x-1/2 w-28 h-6 rounded-full" style={{ background: '#0F0F1A' }} />
          <div className="flex items-center gap-1">
            <SignalIcon />
            <WifiIcon />
            <BatteryIcon />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {children}
        </div>
      </div>
    </div>
  )
}

function SignalIcon() {
  return (
    <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
      <rect x="0" y="6" width="3" height="6" rx="1" fill="#0F0F1A"/>
      <rect x="4.5" y="4" width="3" height="8" rx="1" fill="#0F0F1A"/>
      <rect x="9" y="2" width="3" height="10" rx="1" fill="#0F0F1A"/>
      <rect x="13.5" y="0" width="3" height="12" rx="1" fill="#0F0F1A"/>
    </svg>
  )
}

function WifiIcon() {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
      <path d="M8 9.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" fill="#0F0F1A"/>
      <path d="M4.5 7C5.8 5.7 6.8 5 8 5s2.2.7 3.5 2" stroke="#0F0F1A" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M1.5 4C3.3 2.2 5.5 1 8 1s4.7 1.2 6.5 3" stroke="#0F0F1A" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    </svg>
  )
}

function BatteryIcon() {
  return (
    <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
      <rect x="0.5" y="0.5" width="20" height="11" rx="3.5" stroke="#0F0F1A" strokeOpacity="0.35"/>
      <rect x="2" y="2" width="16" height="8" rx="2" fill="#0F0F1A"/>
      <path d="M22 4v4a2 2 0 000-4z" fill="#0F0F1A" fillOpacity="0.4"/>
    </svg>
  )
}
