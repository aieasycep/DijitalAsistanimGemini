import PageHeader from '../../components/layout/PageHeader'

const screenshots = [
  {
    id: 1,
    bg: 'linear-gradient(160deg, #0F0F1A 0%, #1E1E3A 100%)',
    headline: 'Bugün bilmen gerekenleri,\nsen sormadan söyler.',
    sub: 'Sabah brifingini 2 dakikada dinle',
    mockColor: '#5B5CE2',
    badge: 'SABAH BRİFİNGİ',
  },
  {
    id: 2,
    bg: 'linear-gradient(160deg, #F8F8FC 0%, #EEF0FF 100%)',
    headline: '84 mail içinde\nyalnızca 3 önemli.',
    sub: 'AI filtreleme ile dikkatini koru',
    mockColor: '#FF3B30',
    badge: 'MAİL ZEKASİ',
  },
  {
    id: 3,
    bg: 'linear-gradient(160deg, #F0F8FF 0%, #E8F8EE 100%)',
    headline: 'Toplantıdan önce\nher şeyi biliyorsun.',
    sub: '8 bölümlük AI brifing hazır',
    mockColor: '#5B5CE2',
    badge: 'TOPLANTI HAZIRLIĞI',
  },
  {
    id: 4,
    bg: 'linear-gradient(160deg, #FFF8F0 0%, #FFF4E0 100%)',
    headline: 'Takip edilmesi gereken\nhiçbir şeyi kaçırma.',
    sub: 'AI taahhütleri otomatik yakalar',
    mockColor: '#FF9F0A',
    badge: 'TAKİP MERKEZI',
  },
  {
    id: 5,
    bg: 'linear-gradient(160deg, #0F0F1A 0%, #1a1a3e 100%)',
    headline: 'Sesli asistan.\nSade. Hızlı. Akıllı.',
    sub: '"Bugün hangi toplantılarım var?"',
    mockColor: '#7879F1',
    badge: 'SES ASISTANI',
  },
  {
    id: 6,
    bg: 'linear-gradient(160deg, #F8F8FC 0%, #F5F0FF 100%)',
    headline: 'Bu hafta 2 saat\n48 dakika kazandın.',
    sub: 'Haftalık AI raporun hazır',
    mockColor: '#5B5CE2',
    badge: 'HAFTALIK RAPOR',
  },
]

function ScreenshotCard({ s }: { s: typeof screenshots[0] }) {
  return (
    <div style={{
      borderRadius: 20,
      overflow: 'hidden',
      background: s.bg,
      height: 220,
      padding: 16,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      boxShadow: '0 4px 16px rgba(15,15,26,0.1)',
      flexShrink: 0,
      width: '100%',
    }}>
      <div>
        <div style={{
          display: 'inline-block',
          fontSize: 9, fontWeight: 700,
          color: s.mockColor,
          background: s.bg.includes('0F0F1A') ? 'rgba(255,255,255,0.15)' : `${s.mockColor}20`,
          padding: '3px 8px', borderRadius: 6,
          letterSpacing: '0.06em',
          marginBottom: 10,
        }}>{s.badge}</div>
        <h3 style={{
          fontSize: 18, fontWeight: 800,
          color: s.bg.includes('0F0F1A') ? '#fff' : '#0F0F1A',
          letterSpacing: '-0.03em',
          lineHeight: 1.25,
          whiteSpace: 'pre-line',
        }}>{s.headline}</h3>
        <p style={{
          fontSize: 12,
          color: s.bg.includes('0F0F1A') ? 'rgba(255,255,255,0.6)' : '#6B6B80',
          marginTop: 6, lineHeight: 1.4,
        }}>{s.sub}</p>
      </div>

      {/* Mock screen preview */}
      <div style={{
        background: s.bg.includes('0F0F1A') ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.7)',
        borderRadius: 10,
        padding: '8px 10px',
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
      }}>
        {[80, 65, 90].map((w, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 16, height: 16, borderRadius: 5, background: s.mockColor, opacity: 0.8 }} />
            <div style={{ height: 6, width: `${w}%`, borderRadius: 3, background: s.bg.includes('0F0F1A') ? 'rgba(255,255,255,0.3)' : 'rgba(15,15,26,0.1)' }} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function AppStoreScreenshots() {
  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: '#F8F8FC' }}>
      <PageHeader title="App Store Görsellleri" />

      <div className="flex-1 mobile-scroll px-5 pb-6">

        <p style={{ fontSize: 13, color: '#6B6B80', marginBottom: 6, lineHeight: 1.5 }}>
          App Store ekran görüntüleri — 6 anahtar özellik
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#34C759', background: '#E8F8EE', padding: '3px 8px', borderRadius: 6 }}>
            iPhone 6.7"
          </div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#5B5CE2', background: '#EEEEFF', padding: '3px 8px', borderRadius: 6 }}>
            Türkçe · TR
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {screenshots.map(s => (
            <ScreenshotCard key={s.id} s={s} />
          ))}
        </div>

        <div style={{ marginTop: 20, background: '#fff', borderRadius: 16, padding: '14px 16px', boxShadow: '0 1px 4px rgba(15,15,26,0.05)' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#0F0F1A', marginBottom: 8 }}>Dışa Aktar</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {['PNG 6.7"', 'PNG 6.1"', 'PNG 5.5"'].map(size => (
              <button key={size} style={{
                flex: 1, padding: '8px 0',
                background: '#EEEEFF', border: 'none', borderRadius: 8,
                fontSize: 11, fontWeight: 600, color: '#5B5CE2', cursor: 'pointer',
              }}>
                {size}
              </button>
            ))}
          </div>
        </div>

        <div style={{ height: 20 }} />
      </div>
    </div>
  )
}
