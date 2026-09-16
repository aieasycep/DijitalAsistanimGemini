import { useState } from 'react'
import { useNavigation } from '../../context/NavigationContext'

export default function EveningClose() {
  const { goBack } = useNavigation()
  const [moved, setMoved] = useState<string[]>([])

  const remaining = [
    { id: '1', text: 'Ahmet\'e teklif göndermek', priority: 'critical' },
    { id: '2', text: 'Fatma\'ya dosya paylaşmak', priority: 'upcoming' },
    { id: '3', text: 'Q3 raporunu incelemek', priority: 'info' },
  ]

  const completed = [
    'Mehmet ile müşteri toplantısı',
    'Haftalık ekip standup',
    'Ayşe\'nin sunumunu inceledim',
  ]

  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: '#F8F8FC' }}>
      <div className="flex items-center justify-between px-5 py-3 flex-shrink-0" style={{ background: '#0F0F1A', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <button onClick={goBack} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: 18, width: 36, height: 36, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M11 4L6 9l5 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <span style={{ fontSize: 15, fontWeight: 600, color: '#fff' }}>Günü Kapat</span>
        <div style={{ width: 36 }} />
      </div>

      <div className="flex-1 mobile-scroll">
        {/* Hero - dark */}
        <div style={{ background: '#0F0F1A', padding: '20px 20px 28px' }}>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>Cumartesi · 19:00</p>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1.25 }}>
            Bugünden yarına<br/>3 konu kalıyor.
          </h1>
        </div>

        <div className="px-5 pt-4 pb-6" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Tamamlananlar */}
          <div>
            <h2 style={{ fontSize: 13, fontWeight: 700, color: '#A0A0B2', letterSpacing: '0.04em', marginBottom: 10 }}>TAMAMLANANLAR</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {completed.map(c => (
                <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: '#fff', borderRadius: 12, boxShadow: '0 1px 3px rgba(15,15,26,0.04)' }}>
                  <div style={{ width: 20, height: 20, borderRadius: 10, background: '#E8F8EE', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5 4-4" stroke="#1A7A33" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <span style={{ fontSize: 13, color: '#6B6B80', textDecoration: 'line-through' }}>{c}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Yarına Kalanlar */}
          <div>
            <h2 style={{ fontSize: 13, fontWeight: 700, color: '#A0A0B2', letterSpacing: '0.04em', marginBottom: 10 }}>YARINALANLAR</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {remaining.map(item => (
                <div key={item.id} style={{ background: '#fff', borderRadius: 12, padding: '12px 14px', boxShadow: '0 1px 3px rgba(15,15,26,0.04)' }}>
                  <div className="flex items-center justify-between">
                    <span style={{ fontSize: 14, fontWeight: 500, color: '#0F0F1A' }}>{item.text}</span>
                    {!moved.includes(item.id) && (
                      <button
                        onClick={() => setMoved(m => [...m, item.id])}
                        style={{ fontSize: 11, fontWeight: 600, color: '#5B5CE2', background: '#EEEEFF', border: 'none', borderRadius: 7, padding: '4px 8px', cursor: 'pointer', flexShrink: 0, marginLeft: 8 }}
                      >
                        Yarına taşı
                      </button>
                    )}
                    {moved.includes(item.id) && (
                      <span style={{ fontSize: 11, color: '#1A7A33', fontWeight: 600 }}>✓ Taşındı</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Yarın Sabah */}
          <div style={{ background: '#EEEEFF', borderRadius: 16, padding: '14px 16px' }}>
            <h2 style={{ fontSize: 13, fontWeight: 700, color: '#5B5CE2', letterSpacing: '0.04em', marginBottom: 8 }}>YARIN SABAH</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {['10:00 Proje kickoff · Can Öztürk', 'TK2412 uçuşu · İstanbul → Antalya 09:15'].map(t => (
                <p key={t} style={{ fontSize: 13, color: '#0F0F1A' }}>• {t}</p>
              ))}
            </div>
          </div>

          {/* Takip Etmen Gerekenler */}
          <div style={{ background: '#fff', borderRadius: 16, padding: '14px 16px', boxShadow: '0 1px 4px rgba(15,15,26,0.05)' }}>
            <h2 style={{ fontSize: 13, fontWeight: 700, color: '#FF9F0A', letterSpacing: '0.04em', marginBottom: 10 }}>TAKİP ETMEN GEREKENLER</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { who: 'Mehmet Kaya', what: 'Teklif maili yanıtı hâlâ bekleniyor', days: '3 gün' },
                { who: 'Ayşe Demir', what: 'Proje dosyası iletildi mi?', days: 'Bugün' },
              ].map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 16, background: '#FFF4E0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#FF9F0A', flexShrink: 0 }}>
                    {f.who.charAt(0)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#0F0F1A' }}>{f.who}</p>
                    <p style={{ fontSize: 12, color: '#6B6B80' }}>{f.what}</p>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#FF9F0A' }}>{f.days}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <button style={{
            width: '100%',
            background: 'linear-gradient(135deg, #5B5CE2 0%, #4647C7 100%)',
            border: 'none', borderRadius: 16, padding: '16px',
            fontSize: 16, fontWeight: 700, color: '#fff',
            cursor: 'pointer', letterSpacing: '-0.02em',
            boxShadow: '0 4px 16px rgba(91,92,226,0.3)',
          }}>
            Yarına Hazırım ✓
          </button>
        </div>
      </div>
    </div>
  )
}
