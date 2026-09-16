import PageHeader from '../../components/layout/PageHeader'

export default function AndroidFrame() {
  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: '#F8F8FC' }}>
      <PageHeader title="Android Temsili Frame" showBack />

      <div className="flex-1 mobile-scroll px-5 pt-4 pb-6">
        <p style={{ fontSize: 13, color: '#6B6B80', marginBottom: 20, lineHeight: 1.5 }}>
          412px genişliğinde Android temsili ekran. Gerçek Android durum ve navigasyon çubukları.
        </p>

        {/* Android Device Frame */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{
            width: 412,
            maxWidth: '100%',
            background: '#0F0F1A',
            borderRadius: 36,
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
            border: '2px solid #2A2A3C',
          }}>
            {/* Android Status Bar */}
            <div style={{
              height: 28,
              background: '#0F0F1A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 20px',
            }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#fff' }}>09:41</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                {/* Signal */}
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                  {[2, 4, 6, 8].map((h, i) => (
                    <rect key={i} x={i * 3.5} y={10 - h} width="2.5" height={h} rx="0.5" fill={i < 3 ? '#fff' : 'rgba(255,255,255,0.3)'}/>
                  ))}
                </svg>
                {/* WiFi */}
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                  <path d="M7 8.5a1 1 0 110-2 1 1 0 010 2z" fill="#fff"/>
                  <path d="M4.5 6.5C5.2 5.8 6 5.4 7 5.4s1.8.4 2.5 1.1" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
                  <path d="M2 4C3.4 2.6 5 1.9 7 1.9s3.6.7 5 2.1" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
                </svg>
                {/* Battery */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <div style={{ width: 20, height: 10, borderRadius: 2, border: '1.5px solid rgba(255,255,255,0.5)', padding: 1.5, display: 'flex' }}>
                    <div style={{ flex: 0.8, background: '#34C759', borderRadius: 1 }} />
                  </div>
                  <div style={{ width: 2, height: 5, background: 'rgba(255,255,255,0.5)', borderRadius: 1 }} />
                </div>
              </div>
            </div>

            {/* App Content — Today Screen snapshot */}
            <div style={{ background: '#F8F8FC', minHeight: 580 }}>
              {/* App Header */}
              <div style={{ background: '#F8F8FC', padding: '12px 20px 8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ fontSize: 13, color: '#A0A0B2', fontWeight: 500 }}>Cumartesi, 5 Eylül</p>
                    <h1 style={{ fontSize: 22, fontWeight: 700, color: '#0F0F1A', letterSpacing: '-0.03em' }}>Günaydın, Yunus 👋</h1>
                  </div>
                  <div style={{ width: 34, height: 34, borderRadius: 17, background: 'linear-gradient(135deg, #5B5CE2, #4647C7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Y</span>
                  </div>
                </div>
              </div>

              {/* Hero Card */}
              <div style={{ margin: '0 16px 12px', borderRadius: 20, background: 'linear-gradient(135deg, #5B5CE2 0%, #4647C7 100%)', padding: '18px', boxShadow: '0 8px 24px rgba(91,92,226,0.3)' }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.05em', marginBottom: 6 }}>☀️ SABAH BRİFİNGİ</p>
                <p style={{ fontSize: 18, fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', marginBottom: 12 }}>Bugün bilmen gereken{"\n"}5 şey var.</p>
                <div style={{ display: 'flex', gap: 20, marginBottom: 14 }}>
                  {[['3', 'kritik'], ['4', 'toplantı'], ['2', 'son tarih']].map(([n, l]) => (
                    <div key={l}>
                      <div style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>{n}</div>
                      <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.65)' }}>{l}</div>
                    </div>
                  ))}
                </div>
                <div style={{ height: 34, background: 'rgba(255,255,255,0.15)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>▶  Dinle — 90 saniye</span>
                </div>
              </div>

              {/* Priority items */}
              <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { badge: 'KRİTİK', bg: '#FFEEED', badgeColor: '#C0251B', title: 'Teklif gönderilmeli', sub: 'Ahmet Yılmaz · Bugün 17:00' },
                  { badge: 'YAKLAŞAN', bg: '#FFF4E0', badgeColor: '#8C5200', title: 'Müşteri toplantısı', sub: 'Mehmet Kaya · 14:30 Google Meet' },
                ].map(item => (
                  <div key={item.badge} style={{ background: '#fff', borderRadius: 14, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 1px 4px rgba(15,15,26,0.06)' }}>
                    <div style={{ width: 8, height: 8, borderRadius: 4, background: item.badgeColor, flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                        <span style={{ fontSize: 9, fontWeight: 700, color: item.badgeColor, background: item.bg, borderRadius: 5, padding: '1px 6px' }}>{item.badge}</span>
                      </div>
                      <p style={{ fontSize: 13, fontWeight: 600, color: '#0F0F1A' }}>{item.title}</p>
                      <p style={{ fontSize: 11, color: '#A0A0B2' }}>{item.sub}</p>
                    </div>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ opacity: 0.25 }}>
                      <path d="M4 2l4 4-4 4" stroke="#0F0F1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                ))}
              </div>
            </div>

            {/* Android Navigation Bar */}
            <div style={{
              height: 48,
              background: '#0F0F1A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 48,
            }}>
              {/* Back chevron */}
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M13 5l-5 5 5 5" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {/* Home pill */}
              <div style={{ width: 40, height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.7)' }} />
              {/* Recent squares */}
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="4" y="7" width="7" height="9" rx="2" stroke="rgba(255,255,255,0.7)" strokeWidth="1.6" fill="none"/>
                <rect x="9" y="4" width="7" height="9" rx="2" stroke="rgba(255,255,255,0.7)" strokeWidth="1.6" fill="none"/>
              </svg>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 20, background: '#fff', borderRadius: 14, padding: '14px 16px', border: '1px solid #E8E8F0' }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#A0A0B2', letterSpacing: '0.04em', marginBottom: 8 }}>FRAME DETAYLARI</p>
          {[['Genişlik', '412px (Android temsili)'], ['Durum Çubuğu', '28px Android style'], ['Nav Çubuğu', '48px gesture/button'], ['İçerik', 'Today ekranı snapshot']].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F2F2F8' }}>
              <span style={{ fontSize: 13, color: '#6B6B80' }}>{k}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#0F0F1A' }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
