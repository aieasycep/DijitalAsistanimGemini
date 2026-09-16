import PageHeader from '../../components/layout/PageHeader'

const widgetData = {
  date: 'Cumartesi, 5 Eylül',
  greeting: 'Günaydın, Yunus',
  priorities: 3,
  meetings: 4,
  summary: '3 önemli konu · 4 etkinlik',
  nextMeeting: 'Proje Değerlendirme · 10:00',
  critical: 'Ahmet Y. teklif yanıtı bekliyor',
  savings: '2s 48dk kazandırıldı bu hafta',
}

function SmallWidget() {
  return (
    <div style={{
      width: 155, height: 155, borderRadius: 22,
      background: 'linear-gradient(135deg, #5B5CE2 0%, #4647C7 100%)',
      padding: 14, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      boxShadow: '0 8px 24px rgba(91,92,226,0.3)',
    }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
          <div style={{ width: 20, height: 20, borderRadius: 6, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h3l2-5 2.5 10L11 6h1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}>Asistan</span>
        </div>
        <div style={{ fontSize: 28, fontWeight: 700, color: '#fff', lineHeight: 1 }}>{widgetData.priorities}</div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>öncelikli konu</div>
      </div>
      <div style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>Sabah brifingini aç →</div>
    </div>
  )
}

function MediumWidget() {
  return (
    <div style={{
      width: 329, height: 155, borderRadius: 22,
      background: '#fff',
      padding: '14px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      boxShadow: '0 4px 20px rgba(15,15,26,0.08)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#A0A0B2', marginBottom: 2 }}>{widgetData.date.toUpperCase()}</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#0F0F1A', letterSpacing: '-0.02em' }}>{widgetData.greeting.split(',')[0]}, Yunus</div>
        </div>
        <div style={{
          width: 36, height: 36, borderRadius: 12,
          background: 'linear-gradient(135deg, #5B5CE2, #4647C7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M2 9h4.5l2.5-7 3 14 2-7H18" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        {[
          { n: widgetData.priorities, label: 'Öncelik', color: '#FF3B30', bg: '#FFEEED' },
          { n: widgetData.meetings, label: 'Toplantı', color: '#5B5CE2', bg: '#EEEEFF' },
          { n: 2, label: 'Takip', color: '#FF9F0A', bg: '#FFF4E0' },
        ].map(({ n, label, color, bg }) => (
          <div key={label} style={{ flex: 1, background: bg, borderRadius: 10, padding: '8px 10px', textAlign: 'center' }}>
            <div style={{ fontSize: 20, fontWeight: 700, color, letterSpacing: '-0.02em' }}>{n}</div>
            <div style={{ fontSize: 10, fontWeight: 600, color, opacity: 0.8 }}>{label}</div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 11, color: '#6B6B80' }}>
        <span style={{ color: '#FF3B30', fontWeight: 600 }}>⚠ </span>
        {widgetData.critical}
      </div>
    </div>
  )
}

function LargeWidget() {
  return (
    <div style={{
      width: 329, height: 329, borderRadius: 22,
      background: '#F8F8FC',
      padding: '16px', display: 'flex', flexDirection: 'column', gap: 12,
      boxShadow: '0 4px 20px rgba(15,15,26,0.08)',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#A0A0B2' }}>DİJİTAL ASISTAN</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#0F0F1A' }}>{widgetData.date}</div>
        </div>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#34C759', background: '#E8F8EE', padding: '3px 8px', borderRadius: 8 }}>✓ 2s 48dk kazandı</div>
      </div>

      {/* Critical alert */}
      <div style={{ background: '#FFEEED', borderRadius: 12, padding: '10px 12px', borderLeft: '3px solid #FF3B30' }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#FF3B30', letterSpacing: '0.05em', marginBottom: 2 }}>KRİTİK</div>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#0F0F1A' }}>Ahmet Yılmaz teklif yanıtı bekliyor</div>
        <div style={{ fontSize: 11, color: '#6B6B80', marginTop: 2 }}>Gmail · 3 saattir okunmadı</div>
      </div>

      {/* Next meeting */}
      <div style={{ background: '#fff', borderRadius: 12, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 1px 4px rgba(15,15,26,0.05)' }}>
        <div style={{ width: 34, height: 34, borderRadius: 10, background: '#EEEEFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="1" y="2" width="14" height="13" rx="3" stroke="#5B5CE2" strokeWidth="1.5"/>
            <path d="M5 1v2M11 1v2M1 6h14" stroke="#5B5CE2" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#0F0F1A' }}>Proje Değerlendirme</div>
          <div style={{ fontSize: 11, color: '#6B6B80' }}>10:00 · 45 dk · Google Meet</div>
        </div>
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 600, color: '#5B5CE2', background: '#EEEEFF', padding: '3px 8px', borderRadius: 8 }}>18dk</div>
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', gap: 8 }}>
        {[{ n: 3, label: 'Öncelik' }, { n: 6, label: 'Takip' }, { n: 84, label: 'Mail' }].map(({ n, label }) => (
          <div key={label} style={{ flex: 1, textAlign: 'center', background: '#fff', borderRadius: 10, padding: '8px 6px', boxShadow: '0 1px 3px rgba(15,15,26,0.04)' }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#0F0F1A' }}>{n}</div>
            <div style={{ fontSize: 10, color: '#A0A0B2', fontWeight: 500 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Sabah brifing */}
      <div style={{ background: 'linear-gradient(135deg, #5B5CE2, #4647C7)', borderRadius: 12, padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>Sabah Brifingini Dinle</span>
        <div style={{ width: 28, height: 28, borderRadius: 14, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M4 3l7 4-7 4V3z" fill="white"/>
          </svg>
        </div>
      </div>
    </div>
  )
}

function LockScreenWidget() {
  return (
    <div style={{
      width: 329, height: 52, borderRadius: 13,
      background: 'rgba(255,255,255,0.15)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255,255,255,0.2)',
      padding: '0 14px', display: 'flex', alignItems: 'center', gap: 12,
    }}>
      <div style={{ width: 32, height: 32, borderRadius: 10, background: 'linear-gradient(135deg, #7879F1, #5B5CE2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M1 7h4l2-5 2.5 10L11 7h3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#fff' }}>3 öncelikli konu · 4 toplantı</div>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)' }}>Sabah brifingini aç</div>
      </div>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M4 3l4 3-4 3V3z" fill="rgba(255,255,255,0.6)"/>
      </svg>
    </div>
  )
}

export default function WidgetShowcase() {
  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: '#F8F8FC' }}>
      <PageHeader title="Widget Galerisi" />

      <div className="flex-1 mobile-scroll px-5 pb-6">

        <p style={{ fontSize: 13, color: '#6B6B80', marginBottom: 20, lineHeight: 1.5 }}>
          Ana ekran ve kilit ekranı widget'ları ile Dijital Asistan her zaman yanında.
        </p>

        <h3 style={{ fontSize: 13, fontWeight: 700, color: '#A0A0B2', letterSpacing: '0.05em', marginBottom: 12 }}>KÜÇÜK WIDGET</h3>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
          <SmallWidget />
        </div>

        <h3 style={{ fontSize: 13, fontWeight: 700, color: '#A0A0B2', letterSpacing: '0.05em', marginBottom: 12 }}>ORTA WIDGET</h3>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
          <MediumWidget />
        </div>

        <h3 style={{ fontSize: 13, fontWeight: 700, color: '#A0A0B2', letterSpacing: '0.05em', marginBottom: 12 }}>BÜYÜK WIDGET</h3>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
          <LargeWidget />
        </div>

        <h3 style={{ fontSize: 13, fontWeight: 700, color: '#A0A0B2', letterSpacing: '0.05em', marginBottom: 12 }}>KİLİT EKRANI</h3>
        <div style={{
          background: 'linear-gradient(160deg, #1a1a3e 0%, #2d1b69 50%, #0f0f1a 100%)',
          borderRadius: 20, padding: 20, display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center',
        }}>
          <div style={{ textAlign: 'center', marginBottom: 8 }}>
            <div style={{ fontSize: 48, fontWeight: 300, color: '#fff', letterSpacing: '-0.03em' }}>09:41</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>Cumartesi, 5 Eylül</div>
          </div>
          <LockScreenWidget />
        </div>

        <div style={{ height: 20 }} />
      </div>
    </div>
  )
}
