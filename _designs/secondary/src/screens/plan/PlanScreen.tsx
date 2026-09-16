import { useState } from 'react'
import { useNavigation } from '../../context/NavigationContext'
import BottomSheet from '../../components/layout/BottomSheet'
import { useTheme } from '../../context/ThemeContext'

const timeSlots = [
  { time: '08:00', event: null },
  { time: '09:00', event: { title: 'Teklif Hazırlama', type: 'ai', duration: 2 } },
  { time: '10:00', event: null },
  { time: '11:00', event: null },
  { time: '12:00', event: null },
  { time: '13:00', event: null },
  { time: '14:00', event: { title: 'Mehmet Kaya · Müşteri Toplantısı', type: 'meeting', duration: 1, platform: 'Google Meet' } },
  { time: '15:00', event: null },
  { time: '16:00', event: { title: 'Can Öztürk · Proje Kickoff', type: 'meeting', duration: 1.5, platform: 'Zoom' } },
  { time: '17:00', event: null },
  { time: '18:00', event: null },
]

export default function PlanScreen() {
  const { navigate } = useNavigation()
  const { t } = useTheme()
  const [view, setView] = useState<'gun' | 'hafta'>('gun')
  const [showPlanSheet, setShowPlanSheet] = useState(false)
  const [planConfirmed, setPlanConfirmed] = useState(false)
  const [timelineHasTask, setTimelineHasTask] = useState(false)

  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: t.bg }}>
      {/* Header */}
      <div className="px-5 pt-2 pb-3 flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <h1 style={{ fontSize: 26, fontWeight: 700, color: t.text, letterSpacing: '-0.03em' }}>Plan</h1>
          <div className="flex items-center gap-2">
            <button onClick={() => navigate('commitments')} style={{ background: '#F0ECFF', border: 'none', borderRadius: 10, padding: '7px 12px', fontSize: 12, fontWeight: 600, color: '#5B21B6', cursor: 'pointer' }}>
              Taahhütler
            </button>
            <button onClick={() => navigate('profile')} className="flex items-center justify-center rounded-full" style={{ width: 32, height: 32, background: 'linear-gradient(135deg, #5B5CE2 0%, #4647C7 100%)', border: 'none', cursor: 'pointer' }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Y</span>
            </button>
          </div>
        </div>

        {/* Segment */}
        <div style={{ display: 'flex', background: t.surface2, borderRadius: 12, padding: 3, gap: 0 }}>
          {(['gun', 'hafta'] as const).map(v => (
            <button
              key={v}
              onClick={() => setView(v)}
              style={{
                flex: 1, padding: '7px 0', borderRadius: 10,
                background: view === v ? '#fff' : 'transparent',
                border: 'none', cursor: 'pointer',
                fontSize: 14, fontWeight: 600,
                color: view === v ? '#0F0F1A' : '#A0A0B2',
                boxShadow: view === v ? '0 1px 4px rgba(15,15,26,0.1)' : 'none',
                transition: 'all 0.2s',
              }}
            >
              {v === 'gun' ? 'Gün' : 'Hafta'}
            </button>
          ))}
        </div>
      </div>

      {/* Date strip */}
      <div className="flex gap-3 px-5 pb-3 overflow-x-auto flex-shrink-0">
        {['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'].map((day, i) => {
          const date = i + 1
          const isToday = day === 'Cmt'
          return (
            <div key={day} style={{ textAlign: 'center', flexShrink: 0, cursor: 'pointer' }}>
              <p style={{ fontSize: 10, fontWeight: 500, color: isToday ? '#5B5CE2' : '#A0A0B2', marginBottom: 4, letterSpacing: '0.02em' }}>{day}</p>
              <div style={{
                width: 32, height: 32, borderRadius: 16,
                background: isToday ? '#5B5CE2' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: 14, fontWeight: isToday ? 700 : 500, color: isToday ? '#fff' : '#0F0F1A' }}>
                  {date}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* AI Suggestion banner */}
      <div className="mx-5 mb-3 flex-shrink-0">
        <div style={{
          background: 'linear-gradient(135deg, #EEEEFF 0%, #E5F2FF 100%)',
          borderRadius: 12, padding: '10px 14px',
          border: '1px solid rgba(91,92,226,0.15)',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <span style={{ fontSize: 18 }}>✨</span>
          <div className="flex-1">
            <p style={{ fontSize: 13, color: t.text, fontWeight: 500, lineHeight: 1.4 }}>
              Yarın 14:00–16:30 arasında 2,5 saat boşluğun var.
            </p>
            <p style={{ fontSize: 11, color: '#5B5CE2', fontWeight: 600 }}>Teklif hazırlama görevini buraya yerleştirebilirim.</p>
          </div>
          <button onClick={() => setShowPlanSheet(true)} style={{ background: '#5B5CE2', border: 'none', borderRadius: 8, padding: '5px 10px', fontSize: 11, fontWeight: 700, color: '#fff', cursor: 'pointer' }}>
            Planla
          </button>
        </div>
      </div>

      {/* Timeline */}
      <div className="flex-1 mobile-scroll px-5 pb-4">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {timeSlots.map((slot, i) => (
            <div key={slot.time} style={{ display: 'flex', gap: 12, minHeight: 52 }}>
              <div style={{ width: 44, flexShrink: 0, paddingTop: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 500, color: t.textMuted }}>{slot.time}</span>
              </div>
              <div style={{ flex: 1, borderLeft: `1px solid ${t.border}`, paddingLeft: 12, paddingTop: 8, paddingBottom: 4 }}>
                {slot.event ? (
                  <div
                    className="card-press"
                    onClick={() => slot.event?.type === 'meeting' && navigate('meeting-prep')}
                    style={{
                      background: slot.event.type === 'ai' ? 'linear-gradient(135deg, #EEEEFF, #E5F2FF)' : t.surface,
                      borderRadius: 12, padding: '10px 12px',
                      border: slot.event.type === 'ai' ? '1px dashed rgba(91,92,226,0.4)' : '1px solid #F2F2F8',
                      boxShadow: '0 1px 3px rgba(15,15,26,0.04)',
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.04em', color: slot.event.type === 'ai' ? '#5B5CE2' : '#6B6B80' }}>
                        {slot.event.type === 'ai' ? '✨ AI ÖNERİSİ' : '📅 TOPLANTI'}
                      </span>
                      <span style={{ fontSize: 10, color: t.textMuted }}>{slot.event.duration}sa</span>
                    </div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: t.text, letterSpacing: '-0.01em' }}>{slot.event.title}</p>
                    {slot.event.platform && (
                      <p style={{ fontSize: 11, color: t.textMuted, marginTop: 2 }}>{slot.event.platform}</p>
                    )}
                  </div>
                ) : (
                  <div style={{ height: 36 }} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Plan Sheet */}
      <BottomSheet isOpen={showPlanSheet} onClose={() => { setShowPlanSheet(false); setPlanConfirmed(false) }} title="AI Öneri">
        <div className="px-5 pb-6">
          {planConfirmed ? (
            <div className="flex flex-col items-center py-8 gap-3">
              <div style={{ width: 64, height: 64, borderRadius: 32, background: '#E8F8EE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>✅</div>
              <p style={{ fontSize: 16, fontWeight: 700, color: t.text }}>Takvime eklendi</p>
              <p style={{ fontSize: 13, color: t.textMuted, textAlign: 'center' }}>Yarın 14:00–16:30 bloğu "Teklif hazırla" görevi olarak eklendi.</p>
            </div>
          ) : (
            <>
              <div style={{ background: 'linear-gradient(135deg, #EEEEFF, #E5F2FF)', borderRadius: 14, padding: '16px', marginBottom: 20, border: '1px solid rgba(91,92,226,0.2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 18 }}>✨</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#5B5CE2', letterSpacing: '0.05em' }}>ÖNERİLEN ZAMAN BLOĞU</span>
                </div>
                <p style={{ fontSize: 22, fontWeight: 800, color: t.text, letterSpacing: '-0.03em', marginBottom: 4 }}>14:00 – 16:30</p>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#5B5CE2', marginBottom: 12 }}>Teklif hazırla</p>
                <p style={{ fontSize: 12, color: t.textMuted, lineHeight: 1.5 }}>Yarın bu aralıkta 2,5 saatlik boşluk var. Mehmet Kaya toplantısından önce teklifin hazır olması için ideal zaman.</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <button
                  onClick={() => { setPlanConfirmed(true); setTimelineHasTask(true); setTimeout(() => { setShowPlanSheet(false); setPlanConfirmed(false) }, 1800) }}
                  style={{ width: '100%', padding: '14px', borderRadius: 14, background: 'linear-gradient(135deg, #5B5CE2, #4647C7)', border: 'none', cursor: 'pointer', fontSize: 15, fontWeight: 700, color: '#fff' }}
                >
                  Onayla
                </button>
                <button
                  style={{ width: '100%', padding: '14px', borderRadius: 14, background: t.surface2, border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: t.textSec }}
                >
                  Saati Değiştir
                </button>
                <button
                  onClick={() => setShowPlanSheet(false)}
                  style={{ width: '100%', padding: '14px', borderRadius: 14, background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: t.textMuted }}
                >
                  İptal
                </button>
              </div>
            </>
          )}
        </div>
      </BottomSheet>

      {/* Conflict Alert */}
      <div className="mx-5 mb-3 flex-shrink-0">
        <div style={{
          background: '#FFEEED', borderRadius: 14, padding: '12px 14px',
          border: '1px solid rgba(192,37,27,0.15)',
          display: 'flex', alignItems: 'flex-start', gap: 10,
        }}>
          <span style={{ fontSize: 18, marginTop: 1 }}>⚠️</span>
          <div className="flex-1">
            <p style={{ fontSize: 13, fontWeight: 700, color: '#C0251B', marginBottom: 2 }}>Takvim Çakışması</p>
            <p style={{ fontSize: 12, color: t.textSec, lineHeight: 1.4 }}>14:00–15:00 müşteri toplantısı ile 14:30 doktor randevusu çakışıyor.</p>
          </div>
          <button onClick={() => navigate('calendar-conflict')} style={{ background: t.surface, border: 'none', borderRadius: 8, padding: '5px 10px', fontSize: 11, fontWeight: 600, color: '#C0251B', cursor: 'pointer', flexShrink: 0 }}>
            Çöz
          </button>
        </div>
      </div>
    </div>
  )
}
