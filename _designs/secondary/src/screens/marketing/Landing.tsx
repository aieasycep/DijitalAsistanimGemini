import { useEffect, useState } from 'react'
import { useNavigation } from '../../context/NavigationContext'

const features = [
  { emoji: '☀️', title: 'Sabah Brifingini', desc: 'Her sabah 60 saniyelik sesli özet. Günü hazır başla.' },
  { emoji: '✉️', title: 'Mail Zekası', desc: '83 mail içinde gerçekten önemli 4 tanesi. Gerisini siler.' },
  { emoji: '📅', title: 'Akıllı Plan', desc: 'Toplantıya hazırlıksız girme. Çakışmaları önce AI görür.' },
  { emoji: '🤝', title: 'Taahhüt Takibi', desc: 'Verdiğin sözleri unutma. Açık konular takip edilir.' },
  { emoji: '🧠', title: 'AI Belleği', desc: 'Seni zamanla öğrenir. Her gün daha iyi öneriler sunar.' },
  { emoji: '🔒', title: 'Güvenlik', desc: 'Veriler şifrelenir. Reklamverenlere asla satılmaz.' },
]

const integrations = ['Gmail', 'Outlook', 'Google Takvim', 'Apple Takvim', 'Zoom', 'Teams']

export default function Landing() {
  const { navigate } = useNavigation()
  const [w, setW] = useState(window.innerWidth)
  useEffect(() => {
    const handler = () => setW(window.innerWidth)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  const isDesktop = w >= 900

  return (
    <div style={{ minHeight: '100vh', background: '#0F0F1A', color: '#fff', fontFamily: 'Inter, sans-serif', overflowX: 'hidden' }}>
      {/* Nav */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: isDesktop ? '20px 80px' : '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)', position: 'sticky', top: 0, background: 'rgba(15,15,26,0.9)', backdropFilter: 'blur(12px)', zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #5B5CE2, #4647C7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>✨</div>
          <span style={{ fontSize: 17, fontWeight: 800, letterSpacing: '-0.03em' }}>Dijital Asistan</span>
        </div>
        {isDesktop && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            {['Özellikler', 'Güvenlik', 'Fiyatlandırma'].map(l => (
              <span key={l} style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontWeight: 500 }}>{l}</span>
            ))}
          </div>
        )}
        <button
          onClick={() => navigate('onboarding')}
          style={{ background: '#5B5CE2', border: 'none', borderRadius: 12, padding: '10px 20px', fontSize: 14, fontWeight: 700, color: '#fff', cursor: 'pointer' }}
        >
          Ücretsiz Başla
        </button>
      </nav>

      {/* Hero */}
      <section style={{ padding: isDesktop ? '80px 80px 100px' : '48px 20px 64px', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: isDesktop ? 'grid' : 'block', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          {/* Left */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(91,92,226,0.15)', border: '1px solid rgba(91,92,226,0.3)', borderRadius: 20, padding: '5px 14px', marginBottom: 24 }}>
              <span style={{ width: 6, height: 6, borderRadius: 3, background: '#34C759', display: 'inline-block' }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: '#9090C8', letterSpacing: '0.04em' }}>Şu an ücretsiz erişim açık</span>
            </div>
            <h1 style={{ fontSize: isDesktop ? 56 : 36, fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: 20 }}>
              Dijital hayatın<br/>
              <span style={{ color: '#7B7CF4' }}>artık tek yerde.</span>
            </h1>
            <p style={{ fontSize: isDesktop ? 18 : 16, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, marginBottom: 32, maxWidth: 480 }}>
              Mail, takvim ve taahhütlerinizi AI ile yönetin. Her sabah 60 saniyelik brifingla güne hazır başlayın.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}>
              <button
                onClick={() => navigate('onboarding')}
                style={{ padding: '16px 28px', background: 'linear-gradient(135deg, #5B5CE2 0%, #4647C7 100%)', border: 'none', borderRadius: 16, fontSize: 16, fontWeight: 700, color: '#fff', cursor: 'pointer', boxShadow: '0 8px 24px rgba(91,92,226,0.4)' }}
              >
                7 Gün Ücretsiz Başla →
              </button>
              <button
                onClick={() => navigate('morning-briefing')}
                style={{ padding: '16px 24px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 16, fontSize: 15, fontWeight: 600, color: '#fff', cursor: 'pointer' }}
              >
                ▶ Demo Gör
              </button>
            </div>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Kredi kartı gerekmez · iOS ve Android</p>
          </div>

          {/* Right - Phone mockup */}
          {isDesktop && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
              <div style={{ width: 280, background: '#1E1E2E', borderRadius: 40, padding: '24px 16px', border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 40px 80px rgba(0,0,0,0.6)' }}>
                <div style={{ background: 'linear-gradient(135deg, #5B5CE2, #4647C7)', borderRadius: 20, padding: '16px', marginBottom: 12 }}>
                  <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', marginBottom: 4 }}>SABAH BRİFİNGİ</p>
                  <p style={{ fontSize: 16, fontWeight: 700, color: '#fff', lineHeight: 1.3 }}>Bugün bilmen gereken<br/>5 şey var.</p>
                  <div style={{ display: 'flex', gap: 12, marginTop: 10 }}>
                    {[['3', 'mail'], ['4', 'etkinlik'], ['2', 'takip']].map(([n, l]) => (
                      <div key={l} style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{n}</div>
                        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.65)' }}>{l}</div>
                      </div>
                    ))}
                  </div>
                </div>
                {[
                  { badge: 'KRİTİK', text: 'Ahmet revize teklif bekliyor · 17:00', color: '#FFEEED', tc: '#C0251B' },
                  { badge: 'TOPLANTI', text: 'Mehmet Kaya · 14:30 Google Meet', color: '#EEEEFF', tc: '#5B5CE2' },
                  { badge: 'SON TARİH', text: 'Başvuru kapanıyor · Bu akşam', color: '#FFF4E0', tc: '#8C5200' },
                ].map(c => (
                  <div key={c.badge} style={{ background: '#2A2A3C', borderRadius: 12, padding: '10px 12px', marginBottom: 8, borderLeft: `3px solid ${c.tc}` }}>
                    <span style={{ fontSize: 8, fontWeight: 700, color: c.tc, background: c.color, borderRadius: 4, padding: '1px 5px' }}>{c.badge}</span>
                    <p style={{ fontSize: 11, color: '#EAEAF8', marginTop: 4, lineHeight: 1.3 }}>{c.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Social proof */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '24px 20px', textAlign: 'center' }}>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 12 }}>ŞU ANDA BAĞLI HESAPLAR</p>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: isDesktop ? 32 : 16 }}>
          {integrations.map(i => (
            <span key={i} style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>{i}</span>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: isDesktop ? '80px 80px' : '48px 20px', maxWidth: 1280, margin: '0 auto' }}>
        <h2 style={{ fontSize: isDesktop ? 40 : 28, fontWeight: 800, letterSpacing: '-0.03em', textAlign: 'center', marginBottom: isDesktop ? 16 : 12 }}>
          Her şey <span style={{ color: '#7B7CF4' }}>tek yerde</span>
        </h2>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', textAlign: 'center', marginBottom: 48 }}>
          Dağınık araçlara veda et.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? 'repeat(3, 1fr)' : '1fr 1fr', gap: isDesktop ? 20 : 12 }}>
          {features.map(f => (
            <div key={f.title} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: isDesktop ? '24px' : '16px' }}>
              <div style={{ fontSize: isDesktop ? 36 : 28, marginBottom: 12 }}>{f.emoji}</div>
              <h3 style={{ fontSize: isDesktop ? 17 : 14, fontWeight: 700, marginBottom: 6 }}>{f.title}</h3>
              <p style={{ fontSize: isDesktop ? 14 : 12, color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section style={{ padding: isDesktop ? '80px 80px' : '48px 20px', maxWidth: 1280, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: isDesktop ? 40 : 28, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 8 }}>Fiyatlandırma</h2>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', marginBottom: 40 }}>7 gün ücretsiz, sonra aylık veya yıllık.</p>
        <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { label: 'Aylık', price: '199 TL', sub: '/ay', note: '7 gün ücretsiz dene', highlight: false },
            { label: 'Yıllık', price: '1.490 TL', sub: '/yıl', note: 'Aylık 124 TL · %38 indirim', highlight: true },
          ].map(plan => (
            <div key={plan.label} style={{ background: plan.highlight ? 'linear-gradient(135deg, #5B5CE2, #4647C7)' : 'rgba(255,255,255,0.06)', border: plan.highlight ? 'none' : '1px solid rgba(255,255,255,0.1)', borderRadius: 24, padding: '32px 40px', minWidth: 220, flex: '0 0 auto' }}>
              <p style={{ fontSize: 14, fontWeight: 600, opacity: 0.8, marginBottom: 8 }}>{plan.label}</p>
              <p style={{ fontSize: 36, fontWeight: 900, letterSpacing: '-0.04em', marginBottom: 4 }}>{plan.price}</p>
              <p style={{ fontSize: 13, opacity: 0.7, marginBottom: 16 }}>{plan.sub}</p>
              <p style={{ fontSize: 12, opacity: 0.75, marginBottom: 24 }}>{plan.note}</p>
              <button
                onClick={() => navigate('paywall')}
                style={{ width: '100%', padding: '13px', borderRadius: 14, background: plan.highlight ? 'rgba(255,255,255,0.2)' : '#5B5CE2', border: 'none', cursor: 'pointer', fontSize: 15, fontWeight: 700, color: '#fff' }}
              >
                Başla
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ padding: isDesktop ? '80px 80px 100px' : '48px 20px 60px', textAlign: 'center' }}>
        <h2 style={{ fontSize: isDesktop ? 44 : 28, fontWeight: 900, letterSpacing: '-0.04em', marginBottom: 16 }}>
          Dijital hayatını<br/><span style={{ color: '#7B7CF4' }}>kontrol altına al.</span>
        </h2>
        <button
          onClick={() => navigate('onboarding')}
          style={{ padding: '18px 36px', background: 'linear-gradient(135deg, #5B5CE2, #4647C7)', border: 'none', borderRadius: 20, fontSize: 17, fontWeight: 700, color: '#fff', cursor: 'pointer', boxShadow: '0 12px 32px rgba(91,92,226,0.4)' }}
        >
          Ücretsiz Başla →
        </button>
        <p style={{ marginTop: 16, fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>Kredi kartı gerekmez · 7 gün ücretsiz</p>
      </section>
    </div>
  )
}
