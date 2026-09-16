import { useState } from 'react'
import PageHeader from '../../components/layout/PageHeader'
import { useNavigation } from '../../context/NavigationContext'

const benefits = [
  { icon: '🤖', text: 'Sınırsız AI analiz' },
  { icon: '🔔', text: 'Akıllı takip ve hatırlatmalar' },
  { icon: '📋', text: 'Meeting Prep' },
  { icon: '🌤️', text: 'Gün Ortası & Akşam Brifingleri' },
  { icon: '🎧', text: 'Sesli brifing' },
  { icon: '🧠', text: 'AI hafıza' },
  { icon: '📧', text: 'Çoklu hesap desteği' },
  { icon: '⭐', text: 'VIP kişiler' },
  { icon: '📱', text: 'Android Bildirim Zekası' },
]

export default function Paywall() {
  const { navigate } = useNavigation()
  const [plan, setPlan] = useState<'monthly' | 'annual'>('annual')

  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: '#F8F8FC' }}>
      <PageHeader showBack />

      <div className="flex-1 mobile-scroll pb-6">
        {/* Hero */}
        <div style={{ background: 'linear-gradient(135deg, #5B5CE2 0%, #3A3AB5 100%)', padding: '20px 20px 28px', textAlign: 'center' }}>
          <div style={{ fontSize: 36, marginBottom: 10 }}>✨</div>
          <h1 style={{ fontSize: 24, fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1.2, marginBottom: 8 }}>
            Dijital Asistan'ın<br/>tamamını aç.
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>
            7 gün ücretsiz dene, istediğin zaman iptal et.
          </p>
        </div>

        <div className="px-5 pt-5">
          {/* Benefits */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 24 }}>
            {benefits.map(b => (
              <div key={b.text} style={{ background: '#fff', borderRadius: 12, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 1px 3px rgba(15,15,26,0.04)' }}>
                <span style={{ fontSize: 16, flexShrink: 0 }}>{b.icon}</span>
                <span style={{ fontSize: 12, fontWeight: 500, color: '#0F0F1A', lineHeight: 1.3 }}>{b.text}</span>
              </div>
            ))}
          </div>

          {/* Plan selector */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
            <button
              onClick={() => setPlan('annual')}
              style={{
                flex: 1, padding: '14px 12px', borderRadius: 16, cursor: 'pointer', textAlign: 'left',
                background: plan === 'annual' ? '#fff' : '#F8F8FC',
                border: plan === 'annual' ? '2px solid #5B5CE2' : '1px solid #E8E8F0',
                boxShadow: plan === 'annual' ? '0 2px 8px rgba(91,92,226,0.15)' : 'none',
                position: 'relative',
              }}
            >
              {plan === 'annual' && (
                <div style={{ position: 'absolute', top: -8, right: 8, background: '#34C759', borderRadius: 6, padding: '2px 8px', fontSize: 9, fontWeight: 700, color: '#fff', letterSpacing: '0.04em' }}>
                  EN AVANTAJLI
                </div>
              )}
              <p style={{ fontSize: 15, fontWeight: 700, color: '#0F0F1A', marginBottom: 2 }}>Yıllık</p>
              <p style={{ fontSize: 20, fontWeight: 900, color: '#5B5CE2', letterSpacing: '-0.03em' }}>
                1.490 <span style={{ fontSize: 13, fontWeight: 600 }}>TL/yıl</span>
              </p>
              <p style={{ fontSize: 11, color: '#A0A0B2' }}>~124 TL/ay</p>
            </button>
            <button
              onClick={() => setPlan('monthly')}
              style={{
                flex: 1, padding: '14px 12px', borderRadius: 16, cursor: 'pointer', textAlign: 'left',
                background: plan === 'monthly' ? '#fff' : '#F8F8FC',
                border: plan === 'monthly' ? '2px solid #5B5CE2' : '1px solid #E8E8F0',
              }}
            >
              <p style={{ fontSize: 15, fontWeight: 700, color: '#0F0F1A', marginBottom: 2 }}>Aylık</p>
              <p style={{ fontSize: 20, fontWeight: 900, color: '#5B5CE2', letterSpacing: '-0.03em' }}>
                199 <span style={{ fontSize: 13, fontWeight: 600 }}>TL/ay</span>
              </p>
              <p style={{ fontSize: 11, color: '#A0A0B2' }}>Her ay yenilenir</p>
            </button>
          </div>

          {/* CTA */}
          <button
            onClick={() => navigate('today')}
            style={{
              width: '100%', padding: '17px',
              background: 'linear-gradient(135deg, #5B5CE2 0%, #4647C7 100%)',
              border: 'none', borderRadius: 18, cursor: 'pointer',
              fontSize: 17, fontWeight: 700, color: '#fff',
              letterSpacing: '-0.02em', marginBottom: 12,
              boxShadow: '0 8px 24px rgba(91,92,226,0.35)',
            }}
          >
            7 Gün Ücretsiz Dene
          </button>

          <button onClick={() => navigate('today')} style={{ width: '100%', padding: '13px', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 500, color: '#A0A0B2' }}>
            Ücretsiz ile devam et
          </button>

          <p style={{ fontSize: 11, color: '#A0A0B2', textAlign: 'center', marginTop: 8, lineHeight: 1.5 }}>
            İstediğin zaman iptal edebilirsin. Karanlık örüntü yok.
          </p>
        </div>
      </div>
    </div>
  )
}
