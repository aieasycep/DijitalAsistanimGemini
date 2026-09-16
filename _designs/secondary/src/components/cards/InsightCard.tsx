import { useState } from 'react'
import Badge from '../ui/Badge'
import SourceTag from '../special/SourceTag'
import BottomSheet from '../layout/BottomSheet'
import type { InsightItem } from '../../types'

interface InsightCardProps {
  item: InsightItem
  onAction?: (action: string, item: InsightItem) => void
  animationDelay?: number
}

export default function InsightCard({ item, onAction, animationDelay = 0 }: InsightCardProps) {
  const [showWhy, setShowWhy] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [feedback, setFeedback] = useState<'helpful' | 'not-important' | null>(null)

  if (dismissed) return null

  return (
    <>
      <div
        className="animate-fade-in"
        style={{
          background: '#fff',
          borderRadius: 16,
          padding: 16,
          boxShadow: '0 1px 4px rgba(15,15,26,0.06), 0 2px 12px rgba(15,15,26,0.04)',
          animationDelay: `${animationDelay}ms`,
          opacity: 0,
        }}
      >
        {/* Top row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <Badge priority={item.priority} />
          <span style={{ fontSize: 11, color: '#A0A0B2', fontWeight: 500 }}>{item.time}</span>
        </div>

        {/* Title */}
        <p style={{ fontSize: 15, fontWeight: 500, color: '#0F0F1A', lineHeight: 1.45, letterSpacing: '-0.01em', marginBottom: 10 }}>
          {item.title}
        </p>

        {/* Source */}
        <div className="mb-3">
          <SourceTag source={item.source} />
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: '#F2F2F8', marginBottom: 12 }} />

        {/* Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          {item.actions.map((action) => (
            <button
              key={action}
              onClick={() => {
                if (action === 'Tamamlandı') setDismissed(true)
                else onAction?.(action, item)
              }}
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: action === 'Tamamlandı' ? '#1A7A33' : '#5B5CE2',
                background: action === 'Tamamlandı' ? '#E8F8EE' : '#EEEEFF',
                border: 'none',
                borderRadius: 8,
                padding: '6px 12px',
                cursor: 'pointer',
                letterSpacing: '-0.01em',
                transition: 'opacity 0.15s',
              }}
            >
              {action}
            </button>
          ))}
          {item.whyImportant && (
            <button
              onClick={() => setShowWhy(true)}
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: '#A0A0B2',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                marginLeft: 'auto',
                padding: '6px 0',
              }}
            >
              Neden önemli?
            </button>
          )}
          <div style={{ display: 'flex', gap: 4, marginLeft: item.whyImportant ? 0 : 'auto' }}>
            <button
              onClick={() => setFeedback(feedback === 'helpful' ? null : 'helpful')}
              title="Doğru"
              style={{
                fontSize: 14, background: feedback === 'helpful' ? '#E8F8EE' : 'transparent',
                border: 'none', borderRadius: 6, padding: '4px 6px', cursor: 'pointer',
                transition: 'background 0.15s',
                opacity: feedback === 'not-important' ? 0.3 : 1,
              }}
            >👍</button>
            <button
              onClick={() => { setFeedback('not-important'); setTimeout(() => setDismissed(true), 600) }}
              title="Önemli değil"
              style={{
                fontSize: 14, background: feedback === 'not-important' ? '#FFEEED' : 'transparent',
                border: 'none', borderRadius: 6, padding: '4px 6px', cursor: 'pointer',
                transition: 'background 0.15s',
                opacity: feedback === 'helpful' ? 0.3 : 1,
              }}
            >👎</button>
          </div>
        </div>
      </div>

      <BottomSheet isOpen={showWhy} onClose={() => setShowWhy(false)} title="Neden önemli?">
        <div className="px-5 py-4">
          <p style={{ fontSize: 15, color: '#0F0F1A', lineHeight: 1.55 }}>{item.whyImportant}</p>
          <div style={{ height: 16 }} />
          <button
            onClick={() => { setShowWhy(false); setDismissed(true) }}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: 12,
              background: '#F1F1F8',
              border: 'none',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 600,
              color: '#6B6B80',
            }}
          >
            Önemli değil
          </button>
        </div>
      </BottomSheet>
    </>
  )
}
