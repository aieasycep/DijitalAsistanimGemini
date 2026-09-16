import type { ReactElement } from 'react'
import { useNavigation } from '../../context/NavigationContext'
import type { ScreenName } from '../../types'

interface PageHeaderProps {
  title?: string
  showBack?: boolean
  showAvatar?: boolean
  rightElement?: ReactElement
  onAvatarClick?: () => void
  transparent?: boolean
}

export default function PageHeader({
  title,
  showBack = false,
  showAvatar = false,
  rightElement,
  onAvatarClick,
  transparent = false,
}: PageHeaderProps) {
  const { goBack, navigate } = useNavigation()

  return (
    <div
      className="flex items-center px-5 py-3 flex-shrink-0"
      style={{
        background: transparent ? 'transparent' : 'rgba(248,248,252,0.95)',
        backdropFilter: transparent ? 'none' : 'blur(12px)',
        borderBottom: transparent ? 'none' : '1px solid rgba(232,232,240,0.6)',
        minHeight: 52,
      }}
    >
      {showBack && (
        <button
          onClick={goBack}
          className="flex items-center justify-center mr-2 -ml-1"
          style={{ width: 36, height: 36, borderRadius: 18, background: 'rgba(241,241,248,0.8)', border: 'none', cursor: 'pointer' }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M11 4L6 9l5 5" stroke="#0F0F1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

      {title && (
        <h1
          className="flex-1"
          style={{ fontSize: 17, fontWeight: 600, color: '#0F0F1A', letterSpacing: '-0.02em' }}
        >
          {title}
        </h1>
      )}
      {!title && <div className="flex-1" />}

      {rightElement}

      {showAvatar && (
        <button
          onClick={onAvatarClick ?? (() => navigate('profile' as ScreenName))}
          className="flex items-center justify-center rounded-full ml-2"
          style={{
            width: 32,
            height: 32,
            background: 'linear-gradient(135deg, #5B5CE2 0%, #4647C7 100%)',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 600, color: '#fff', letterSpacing: '-0.02em' }}>Y</span>
        </button>
      )}
    </div>
  )
}
