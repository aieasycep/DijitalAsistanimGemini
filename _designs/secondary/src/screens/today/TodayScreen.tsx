import { useState } from 'react'
import InsightCard from '../../components/cards/InsightCard'
import BottomSheet from '../../components/layout/BottomSheet'
import SmartReminderSheet from '../../components/ui/SmartReminderSheet'
import { useNavigation } from '../../context/NavigationContext'
import { useTheme } from '../../context/ThemeContext'
import { mockInsights, mockLifeItems, mockMeetings } from '../../data/mock'

type LifeDetailSheet = { icon: string; title: string; detail: string; extra: string[] } | null

export default function TodayScreen() {
  const { navigate } = useNavigation()
  const { t } = useTheme()
  const [reminderCtx, setReminderCtx] = useState<string | null>(null)
  const [lifeDetail, setLifeDetail] = useState<LifeDetailSheet>(null)
  const pendingApprovals = 3

  function openLifeDetail(item: typeof mockLifeItems[0]) {
    if (item.type === 'payment') { setReminderCtx(`Ödeme: ${item.title}`); return }
    const extras: Record<string, string[]> = {
      cargo: ['Kargo No: TY4821930', 'Tahmini teslim: Bugün 14:00–18:00', 'Teslim yeri: Kapıya teslim', 'Son konum: İstanbul Dağıtım Merkezi'],
      flight: ['Uçuş: TK2412', 'Kalkış: Yarın 09:15 · Terminal 1', 'Varış: Antalya 10:30', 'Koltuk: 14A · Pencere', 'Check-in: Açık'],
      reservation: ['Rezervasyon No: R-48291', 'Tarih: 7 Eylül · 20:00', 'Kişi: 2', 'Adres: Nişantaşı, İstanbul'],
      subscription: ['Plan: Premium', 'Yenileme: 12 Eylül 2025', 'Ücret: 79 TL/ay', 'Kart: ····4821'],
      security: ['Kaynak: Google Hesap', 'Tarih: 4 Eylül 22:14', 'Konum: İstanbul, TR', 'İşlem: Şifre değişikliği girişimi'],
    }
    setLifeDetail({ icon: item.icon, title: item.title, detail: item.detail, extra: extras[item.type] ?? [] })
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: t.bg }}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-2 pb-0 flex-shrink-0">
        <div>
          <p style={{ fontSize: 13, color: t.textMuted, fontWeight: 500, marginBottom: 1 }}>
            Cumartesi, 5 Eylül
          </p>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: t.text, letterSpacing: '-0.03em', lineHeight: 1.2 }}>
            Günaydın, Yunus
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('approval-center')}
            style={{ position: 'relative', width: 36, height: 36, borderRadius: 18, background: '#FFF4E0', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <span style={{ fontSize: 16 }}>⭐</span>
            {pendingApprovals > 0 && (
              <span style={{ position: 'absolute', top: -2, right: -2, width: 16, height: 16, borderRadius: 8, background: '#FF3B30', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 800, color: '#fff' }}>
                {pendingApprovals}
              </span>
            )}
          </button>
          <button
            onClick={() => navigate('search')}
            style={{ width: 36, height: 36, borderRadius: 18, background: t.surface2, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="5" stroke="#6B6B80" strokeWidth="1.8"/>
              <path d="M11 11l2.5 2.5" stroke="#6B6B80" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
          <button
            onClick={() => navigate('profile')}
            className="flex items-center justify-center rounded-full"
            style={{ width: 36, height: 36, background: 'linear-gradient(135deg, #5B5CE2 0%, #4647C7 100%)', border: 'none', cursor: 'pointer' }}
          >
            <span style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>Y</span>
          </button>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 mobile-scroll px-5 pt-4 pb-4" style={{ gap: 0 }}>

        {/* AI Briefing Hero Card */}
        <div
          className="card-press mb-4"
          onClick={() => navigate('morning-briefing')}
          style={{
            background: 'linear-gradient(135deg, #5B5CE2 0%, #4647C7 60%, #3A3AB5 100%)',
            borderRadius: 20,
            padding: '18px 20px',
            boxShadow: '0 8px 24px rgba(91,92,226,0.28)',
          }}
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.05em' }}>SABAH BRİFİNGİ</span>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#34C759', display: 'inline-block', boxShadow: '0 0 6px rgba(52,199,89,0.6)' }} />
              </div>
              <h2 style={{ fontSize: 19, fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.3 }}>
                Bugün bilmen gereken<br/>5 şey var.
              </h2>
            </div>
            <div style={{
              width: 44, height: 44, borderRadius: 22,
              background: 'rgba(255,255,255,0.18)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="9" stroke="white" strokeWidth="1.5" fill="none"/>
                <path d="M8 7l5 3-5 3V7z" fill="white"/>
              </svg>
            </div>
          </div>

          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', marginBottom: 14, lineHeight: 1.4 }}>
            2 dakikalık brifing hazır
          </p>

          {/* Mini stats */}
          <div className="flex items-center gap-3">
            {[
              { n: 3, label: 'önemli mail' },
              { n: 4, label: 'etkinlik' },
              { n: 2, label: 'takip' },
              { n: 1, label: 'son tarih' },
            ].map(({ n, label }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>{n}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.65)', fontWeight: 500 }}>{label}</div>
              </div>
            ))}
          </div>

          <div className="flex items-center mt-3 gap-2">
            <button
              onClick={(e) => { e.stopPropagation(); navigate('morning-briefing') }}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none', borderRadius: 10, padding: '7px 14px',
                fontSize: 12, fontWeight: 600, color: '#fff', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 6,
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 2l6 4-6 4V2z" fill="white"/>
              </svg>
              Dinle
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); navigate('morning-briefing') }}
              style={{
                background: 'transparent', border: '1px solid rgba(255,255,255,0.35)',
                borderRadius: 10, padding: '7px 14px',
                fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.85)', cursor: 'pointer',
              }}
            >
              Brifing Aç
            </button>
          </div>
        </div>

        {/* Top Priorities */}
        <div className="mb-2">
          <div className="flex items-center justify-between mb-3">
            <h2 style={{ fontSize: 17, fontWeight: 700, color: t.text, letterSpacing: '-0.02em' }}>Önceliklerin</h2>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#5B5CE2' }}>{mockInsights.length} konu</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {mockInsights.map((item, i) => (
              <InsightCard
                key={item.id}
                item={item}
                animationDelay={i * 60}
                onAction={(action) => {
                  if (action === 'Yanıtı Gör') navigate('email-detail')
                  if (action === 'Hazırlan') navigate('meeting-prep')
                  if (action === 'Hatırlat') setReminderCtx(item.title)
                }}
              />
            ))}
          </div>
        </div>

        {/* Next Meeting */}
        <div className="mb-4 mt-4">
          <h2 style={{ fontSize: 17, fontWeight: 700, color: t.text, letterSpacing: '-0.02em', marginBottom: 12 }}>Programın</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {mockMeetings.map((m, i) => (
              <div
                key={m.id}
                className="card-press animate-fade-in"
                onClick={() => navigate('meeting-prep')}
                style={{
                  background: t.surface,
                  borderRadius: 14,
                  padding: '12px 14px',
                  boxShadow: '0 1px 4px rgba(15,15,26,0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  animationDelay: `${i * 50 + 200}ms`,
                  opacity: 0,
                }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: i === 0 ? 'rgba(91,92,226,0.1)' : '#F1F1F8',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="2" y="3" width="16" height="15" rx="3" stroke={i === 0 ? '#5B5CE2' : '#A0A0B2'} strokeWidth="1.6"/>
                    <path d="M6 1v4M14 1v4M2 7h16" stroke={i === 0 ? '#5B5CE2' : '#A0A0B2'} strokeWidth="1.6" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: 14, fontWeight: 600, color: t.text, letterSpacing: '-0.01em', marginBottom: 2 }}>{m.title}</p>
                  <p style={{ fontSize: 12, color: t.textSec }}>{m.time} · {m.duration} · {m.platform}</p>
                </div>
                {m.minutesLeft && (
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#5B5CE2', background: '#EEEEFF', padding: '3px 8px', borderRadius: 8, whiteSpace: 'nowrap' }}>
                    {m.minutesLeft}dk
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Life Intelligence */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 style={{ fontSize: 17, fontWeight: 700, color: t.text, letterSpacing: '-0.02em' }}>Dijital Hayatın</h2>
          </div>
          <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
            {mockLifeItems.map((item, i) => (
              <div
                key={item.id}
                className="animate-fade-in"
                style={{
                  background: t.surface,
                  borderRadius: 16,
                  padding: 14,
                  minWidth: 160,
                  boxShadow: '0 1px 4px rgba(15,15,26,0.05)',
                  flexShrink: 0,
                  animationDelay: `${i * 40 + 300}ms`,
                  opacity: 0,
                }}
              >
                <div style={{ fontSize: 24, marginBottom: 8 }}>{item.icon}</div>
                <p style={{ fontSize: 13, fontWeight: 600, color: t.text, marginBottom: 3, lineHeight: 1.3 }}>{item.title}</p>
                <p style={{ fontSize: 11, color: t.textMuted, marginBottom: 10, lineHeight: 1.3 }}>{item.detail}</p>
                <button
                  onClick={() => openLifeDetail(item)}
                  style={{ fontSize: 11, fontWeight: 600, color: '#5B5CE2', background: '#EEEEFF', border: 'none', borderRadius: 8, padding: '5px 10px', cursor: 'pointer' }}
                >
                  {item.action}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Midday + Evening shortcuts */}
        <div className="flex gap-3 mb-4">
          <button
            onClick={() => navigate('midday-pulse')}
            className="flex-1 flex items-center gap-3 card-press"
            style={{ background: t.surface, borderRadius: 14, padding: '12px 14px', boxShadow: '0 1px 4px rgba(15,15,26,0.05)', border: 'none', cursor: 'pointer', textAlign: 'left' }}
          >
            <div style={{ fontSize: 20 }}>🌤️</div>
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, color: t.text }}>Gün Ortası</p>
              <p style={{ fontSize: 10, color: t.textMuted }}>13:00 brifing</p>
            </div>
          </button>
          <button
            onClick={() => navigate('evening-close')}
            className="flex-1 flex items-center gap-3 card-press"
            style={{ background: t.surface, borderRadius: 14, padding: '12px 14px', boxShadow: '0 1px 4px rgba(15,15,26,0.05)', border: 'none', cursor: 'pointer', textAlign: 'left' }}
          >
            <div style={{ fontSize: 20 }}>🌙</div>
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, color: t.text }}>Akşam Kapanış</p>
              <p style={{ fontSize: 10, color: t.textMuted }}>19:00 özet</p>
            </div>
          </button>
        </div>

        {/* Weekly Report teaser */}
        <button
          onClick={() => navigate('weekly-report')}
          className="w-full card-press"
          style={{
            background: 'linear-gradient(135deg, #F8F0FF 0%, #EEF0FF 100%)',
            borderRadius: 14,
            padding: '14px 16px',
            border: 'none',
            cursor: 'pointer',
            textAlign: 'left',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div style={{ fontSize: 24 }}>📊</div>
          <div className="flex-1">
            <p style={{ fontSize: 13, fontWeight: 600, color: t.text, marginBottom: 1 }}>Haftalık Raporun Hazır</p>
            <p style={{ fontSize: 11, color: t.textSec }}>684 mail analiz edildi · 2 sa 48 dk kazandırıldı</p>
          </div>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 4l4 4-4 4" stroke="#5B5CE2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div style={{ height: 16 }} />
      </div>

      {/* Smart Reminder sheet */}
      <SmartReminderSheet
        isOpen={reminderCtx !== null}
        onClose={() => setReminderCtx(null)}
        context={reminderCtx ?? undefined}
      />

      {/* Life Intelligence Detail Sheet */}
      <BottomSheet isOpen={lifeDetail !== null} onClose={() => setLifeDetail(null)} title={lifeDetail?.title ?? ''}>
        {lifeDetail && (
          <div className="px-5 pb-5">
            <div style={{ fontSize: 40, textAlign: 'center', marginBottom: 12 }}>{lifeDetail.icon}</div>
            <p style={{ fontSize: 14, color: '#6B6B80', textAlign: 'center', marginBottom: 16, lineHeight: 1.5 }}>{lifeDetail.detail}</p>
            {lifeDetail.extra.map((line, i) => (
              <div key={i} style={{ padding: '11px 0', borderBottom: i < lifeDetail.extra.length - 1 ? '1px solid #F2F2F8' : 'none' }}>
                <span style={{ fontSize: 13, color: '#0F0F1A', fontWeight: 500 }}>{line}</span>
              </div>
            ))}
            <button onClick={() => setLifeDetail(null)} style={{ width: '100%', marginTop: 16, padding: '13px', borderRadius: 14, background: '#F1F1F8', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: '#6B6B80' }}>
              Kapat
            </button>
          </div>
        )}
      </BottomSheet>
    </div>
  )
}
