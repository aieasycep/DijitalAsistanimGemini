import { useState } from 'react'
import PageHeader from '../../components/layout/PageHeader'
import { useNavigation } from '../../context/NavigationContext'

export default function CalendarConflict() {
  const { navigate } = useNavigation()
  const [resolved, setResolved] = useState(false)

  if (resolved) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center px-5" style={{ background: '#F8F8FC' }}>
        <div className="animate-scale-in text-center">
          <div style={{ width: 72, height: 72, borderRadius: 36, background: '#E8F8EE', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: 32 }}>
            ✅
          </div>
          <p style={{ fontSize: 22, fontWeight: 800, color: '#0F0F1A', letterSpacing: '-0.03em', marginBottom: 6 }}>Çözüldü!</p>
          <p style={{ fontSize: 14, color: '#6B6B80', marginBottom: 24 }}>Müşteri toplantısı 13:00'e alındı.</p>
          <button onClick={() => navigate('plan')} style={{ padding: '12px 28px', background: '#5B5CE2', border: 'none', borderRadius: 14, cursor: 'pointer', fontSize: 15, fontWeight: 600, color: '#fff' }}>
            Plana Dön
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: '#F8F8FC' }}>
      <PageHeader title="Takvim Çakışması" showBack />

      <div className="flex-1 mobile-scroll px-5 pt-4 pb-6">
        {/* Warning hero */}
        <div style={{ background: '#FFEEED', borderRadius: 16, padding: '16px', marginBottom: 20, border: '1px solid rgba(192,37,27,0.15)' }}>
          <div className="flex items-center gap-3 mb-3">
            <div style={{ fontSize: 32 }}>⚠️</div>
            <div>
              <p style={{ fontSize: 16, fontWeight: 700, color: '#C0251B', letterSpacing: '-0.02em' }}>Çakışma Tespit Edildi</p>
              <p style={{ fontSize: 12, color: '#6B6B80' }}>Bugün saat 14:00–15:00</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { label: 'Müşteri Toplantısı', time: '14:00–15:00', icon: '📅', source: 'Google Calendar' },
              { label: 'Doktor Randevusu', time: '14:30–15:30', icon: '🏥', source: 'Apple Calendar' },
            ].map(e => (
              <div key={e.label} style={{ background: 'rgba(255,255,255,0.8)', borderRadius: 10, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 20 }}>{e.icon}</span>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#0F0F1A' }}>{e.label}</p>
                  <p style={{ fontSize: 11, color: '#A0A0B2' }}>{e.time} · {e.source}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Suggestion */}
        <div style={{ background: '#EEEEFF', borderRadius: 16, padding: '16px', marginBottom: 20, border: '1px solid rgba(91,92,226,0.2)' }}>
          <div className="flex items-center gap-2 mb-3">
            <span>✨</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#5B5CE2', letterSpacing: '0.04em' }}>AI ÖNERİSİ</span>
          </div>
          <p style={{ fontSize: 14, color: '#0F0F1A', lineHeight: 1.5 }}>
            Müşteri toplantısını <strong>13:00'e</strong> almayı önerebilirim. Mehmet'in takviminde de bu saat uygun görünüyor.
          </p>
        </div>

        {/* Options */}
        <h3 style={{ fontSize: 13, fontWeight: 700, color: '#A0A0B2', letterSpacing: '0.04em', marginBottom: 10 }}>SEÇENEKLER</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { label: 'Müşteri toplantısını 13:00\'e al', sub: 'AI önerisi · Takvim güncelleme gerekiyor', recommended: true },
            { label: 'Doktor randevusunu iptal et', sub: 'Randevu sisteminde değişiklik gerekiyor', recommended: false },
            { label: 'Beni hatırlat, kendim çözeyim', sub: '1 saat sonra hatırlatılır', recommended: false },
          ].map(opt => (
            <button
              key={opt.label}
              onClick={() => opt.recommended && setResolved(true)}
              style={{
                background: opt.recommended ? '#fff' : '#fff',
                border: opt.recommended ? '2px solid #5B5CE2' : '1px solid #E8E8F0',
                borderRadius: 14, padding: '14px 16px', cursor: 'pointer', textAlign: 'left',
                boxShadow: '0 1px 3px rgba(15,15,26,0.04)',
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p style={{ fontSize: 14, fontWeight: 600, color: '#0F0F1A', marginBottom: 3 }}>{opt.label}</p>
                  <p style={{ fontSize: 12, color: '#A0A0B2' }}>{opt.sub}</p>
                </div>
                {opt.recommended && (
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#5B5CE2', background: '#EEEEFF', borderRadius: 6, padding: '2px 6px', marginLeft: 8, whiteSpace: 'nowrap' }}>
                    ÖNERİLEN
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
