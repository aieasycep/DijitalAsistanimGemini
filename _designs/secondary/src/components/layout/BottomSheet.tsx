import { type ReactNode, useEffect } from 'react'

interface BottomSheetProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  title?: string
  height?: string | number
}

export default function BottomSheet({ isOpen, onClose, children, title, height = 'auto' }: BottomSheetProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end" style={{ borderRadius: 48, overflow: 'hidden' }}>
      <div
        className="absolute inset-0 backdrop-overlay"
        onClick={onClose}
      />
      <div
        className="relative flex flex-col"
        style={{
          background: '#FFFFFF',
          borderRadius: '24px 24px 0 0',
          maxHeight: typeof height === 'number' ? height : '85%',
          animation: 'slideUp 0.3s cubic-bezier(0.32, 0.72, 0, 1) forwards',
          boxShadow: '0 -4px 40px rgba(15,15,26,0.18)',
        }}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div style={{ width: 36, height: 4, borderRadius: 2, background: '#E8E8F0' }} />
        </div>

        {title && (
          <div className="px-5 pb-3 pt-1" style={{ borderBottom: '1px solid #F2F2F8' }}>
            <h3 style={{ fontSize: 17, fontWeight: 600, color: '#0F0F1A', letterSpacing: '-0.02em' }}>{title}</h3>
          </div>
        )}

        <div className="overflow-y-auto" style={{ paddingBottom: 32 }}>
          {children}
        </div>
      </div>
    </div>
  )
}
