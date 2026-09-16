import { useNavigation } from '../../context/NavigationContext'

export default function MiddayPulse() {
  const { goBack, navigate } = useNavigation()

  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: '#F8F8FC' }}>
      <div className="flex items-center justify-between px-5 py-3 flex-shrink-0" style={{ borderBottom: '1px solid #F2F2F8' }}>
        <button onClick={goBack} style={{ background: '#F1F1F8', border: 'none', borderRadius: 18, width: 36, height: 36, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M11 4L6 9l5 5" stroke="#0F0F1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <span style={{ fontSize: 15, fontWeight: 600, color: '#0F0F1A' }}>Gün Ortası</span>
        <div style={{ width: 36 }} />
      </div>

      <div className="flex-1 mobile-scroll px-5 py-5">
        <div className="animate-fade-in" style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 13, color: '#A0A0B2', marginBottom: 4 }}>Öğleden sonra · 13:15</p>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: '#0F0F1A', letterSpacing: '-0.03em', lineHeight: 1.25 }}>
            Sabahından beri<br/>2 önemli gelişme oldu.
          </h1>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            {
              icon: '📅',
              bg: '#EEEEFF',
              text: 'Mehmet toplantıyı 16:00\'ya almak istiyor.',
              source: 'Google Calendar · 12:42',
              actions: ['Kabul Et', 'Reddet', 'Müzakere Et'],
            },
            {
              icon: '✉️',
              bg: '#FFF4E0',
              text: 'Teklif mailine henüz cevap verilmedi.',
              source: 'Gmail · Ahmet Yılmaz · 08:42',
              actions: ['Hatırlat', 'Yanıt Yaz'],
            },
          ].map((item, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 16, padding: 16, boxShadow: '0 1px 4px rgba(15,15,26,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
                  {item.icon}
                </div>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#0F0F1A', flex: 1, lineHeight: 1.35 }}>{item.text}</p>
              </div>
              <p style={{ fontSize: 11, color: '#A0A0B2', marginBottom: 12 }}>{item.source}</p>
              <div className="flex gap-2">
                {item.actions.map(a => (
                  <button key={a} style={{
                    fontSize: 12, fontWeight: 600,
                    color: a === item.actions[0] ? '#5B5CE2' : '#6B6B80',
                    background: a === item.actions[0] ? '#EEEEFF' : '#F1F1F8',
                    border: 'none', borderRadius: 8, padding: '6px 12px', cursor: 'pointer',
                  }}>{a}</button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <p style={{ fontSize: 13, color: '#A0A0B2', marginBottom: 12 }}>Sonraki brifing saat 19:00'da</p>
          <button onClick={goBack} style={{
            background: '#F1F1F8', border: 'none', borderRadius: 12,
            padding: '12px 24px', fontSize: 14, fontWeight: 600, color: '#6B6B80', cursor: 'pointer',
          }}>Bugüne Dön</button>
        </div>
      </div>
    </div>
  )
}
