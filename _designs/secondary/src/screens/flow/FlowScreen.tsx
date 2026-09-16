import { useState } from 'react'
import Chip from '../../components/ui/Chip'
import SourceTag from '../../components/special/SourceTag'
import { useNavigation } from '../../context/NavigationContext'
import { useTheme } from '../../context/ThemeContext'
import { mockEmails, mockMeetings, mockLifeItems } from '../../data/mock'
import type { Priority } from '../../types'

const filters = ['Tümü', 'Önemli', 'Mail', 'Takvim', 'Takip', 'Kişisel']

interface FeedItem {
  id: string
  type: 'email' | 'meeting' | 'deadline' | 'life'
  icon: string
  iconBg: string
  title: string
  summary: string
  source: string
  time: string
  priority: Priority
  action: string
}

const allItems: FeedItem[] = [
  {
    id: '1', type: 'email', icon: '✉️', iconBg: '#FFEEED',
    title: 'Ahmet Yılmaz — Revize teklif',
    summary: 'Bugün 17:00\'ye kadar revize teklif bekliyor.',
    source: 'Gmail · 08:42', time: '08:42', priority: 'critical', action: 'Yanıtla',
  },
  {
    id: '2', type: 'meeting', icon: '📅', iconBg: '#EEEEFF',
    title: 'Müşteri Toplantısı — 14:30',
    summary: 'Mehmet Kaya ile Google Meet. 18 dakika kaldı.',
    source: 'Google Calendar', time: '14:30', priority: 'upcoming', action: 'Hazırlan',
  },
  {
    id: '3', type: 'deadline', icon: '⏰', iconBg: '#FFF4E0',
    title: 'Başvuru Son Tarihi',
    summary: 'Başvuru bugün 17:00\'de kapanıyor.',
    source: 'Gmail · Kariyer · Dün', time: '17:00', priority: 'deadline', action: 'Takvime Ekle',
  },
  {
    id: '4', type: 'life', icon: '📦', iconBg: '#E8F8EE',
    title: 'Trendyol Siparişi Geliyor',
    summary: 'Sipariş #TY884521 bugün 14:00–18:00 arasında teslim.',
    source: 'Gmail · Trendyol', time: 'Bugün', priority: 'info', action: 'Takip Et',
  },
  {
    id: '5', type: 'email', icon: '✉️', iconBg: '#FFF4E0',
    title: 'Mehmet Kaya — Teklif değerlendirme',
    summary: 'Fiyat revizyonu istiyor, bugün akşam cevap bekliyor.',
    source: 'Gmail · 10:20', time: '10:20', priority: 'critical', action: 'Görüntüle',
  },
  {
    id: '6', type: 'life', icon: '⚡', iconBg: '#FFF4E0',
    title: 'Elektrik Faturası',
    summary: '1.842 TL — Son ödeme 10 Eylül.',
    source: 'Gmail · Fatura', time: '10 Eylül', priority: 'upcoming', action: 'Ödeme Yap',
  },
  {
    id: '7', type: 'email', icon: '✉️', iconBg: '#E5F2FF',
    title: 'Ayşe Demir — Sunum paylaşımı',
    summary: 'Hazırladığı sunum dosyasını paylaştı, görüş istiyor.',
    source: 'Gmail · 09:15', time: '09:15', priority: 'info', action: 'Görüntüle',
  },
  {
    id: '8', type: 'life', icon: '🔐', iconBg: '#FFEEED',
    title: 'Güvenlik Uyarısı',
    summary: 'Google hesabında yeni giriş algılandı. Chrome · İstanbul.',
    source: 'Gmail · Google', time: 'Az önce', priority: 'critical', action: 'İncele',
  },
]

const priorityOrder: Record<Priority, number> = { critical: 0, deadline: 1, upcoming: 2, info: 3, success: 4 }

export default function FlowScreen() {
  const { t } = useTheme()
  const { navigate } = useNavigation()
  const [filter, setFilter] = useState('Tümü')

  const filtered = allItems
    .filter(item => {
      if (filter === 'Tümü') return true
      if (filter === 'Önemli') return item.priority === 'critical' || item.priority === 'deadline'
      if (filter === 'Mail') return item.type === 'email'
      if (filter === 'Takvim') return item.type === 'meeting'
      if (filter === 'Takip') return item.type === 'deadline'
      if (filter === 'Kişisel') return item.type === 'life'
      return true
    })
    .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])

  const badgeColors: Record<Priority, { bg: string; color: string }> = {
    critical: { bg: '#FFEEED', color: '#C0251B' },
    upcoming: { bg: '#FFF4E0', color: '#8C5200' },
    deadline: { bg: '#F0ECFF', color: '#5B21B6' },
    info: { bg: '#E5F2FF', color: '#0051A8' },
    success: { bg: '#E8F8EE', color: '#1A7A33' },
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: t.bg }}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-2 pb-3 flex-shrink-0">
        <h1 style={{ fontSize: 26, fontWeight: 700, color: t.text, letterSpacing: '-0.03em' }}>Akış</h1>
        <div className="flex items-center gap-2">
          <button onClick={() => navigate('mail-intelligence')} style={{ background: '#EEEEFF', border: 'none', borderRadius: 10, padding: '7px 12px', fontSize: 12, fontWeight: 600, color: '#5B5CE2', cursor: 'pointer' }}>
            Mail Özeti
          </button>
          <button onClick={() => navigate('profile')} className="flex items-center justify-center rounded-full" style={{ width: 32, height: 32, background: 'linear-gradient(135deg, #5B5CE2 0%, #4647C7 100%)', border: 'none', cursor: 'pointer' }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Y</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 px-5 pb-3 flex-shrink-0 overflow-x-auto">
        {filters.map(f => (
          <Chip key={f} label={f} selected={filter === f} onClick={() => setFilter(f)} />
        ))}
      </div>

      {/* Feed */}
      <div className="flex-1 mobile-scroll px-5 pb-4">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filtered.map((item, i) => {
            const bc = badgeColors[item.priority]
            return (
              <div
                key={item.id}
                className="card-press animate-fade-in"
                onClick={() => {
                  if (item.type === 'email') navigate('email-detail')
                  else if (item.type === 'meeting') navigate('meeting-prep')
                }}
                style={{
                  background: t.surface,
                  borderRadius: 16,
                  padding: 14,
                  boxShadow: '0 1px 4px rgba(15,15,26,0.06)',
                  animationDelay: `${i * 40}ms`,
                  opacity: 0,
                }}
              >
                <div className="flex items-start gap-3">
                  <div style={{
                    width: 40, height: 40, borderRadius: 12,
                    background: item.iconBg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 18, flexShrink: 0,
                  }}>
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p style={{ fontSize: 14, fontWeight: 600, color: t.text, letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                        {item.title}
                      </p>
                      <span style={{ fontSize: 10, color: t.textMuted, whiteSpace: 'nowrap', marginTop: 1 }}>{item.time}</span>
                    </div>
                    <p style={{ fontSize: 13, color: t.textSec, lineHeight: 1.4, marginBottom: 8 }}>{item.summary}</p>
                    <div className="flex items-center justify-between">
                      <SourceTag source={item.source} />
                      <button
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          fontSize: 11, fontWeight: 600,
                          color: bc.color,
                          background: bc.bg,
                          border: 'none', borderRadius: 8,
                          padding: '5px 10px', cursor: 'pointer',
                        }}
                      >
                        {item.action}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
