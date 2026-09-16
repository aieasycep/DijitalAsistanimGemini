import { useState } from 'react'
import PageHeader from '../../components/layout/PageHeader'

const ads = [
  {
    id: 'problem',
    label: 'Problem/Çözüm',
  },
  {
    id: 'followup',
    label: 'SmartFollowUp',
  },
  {
    id: 'morning',
    label: 'Morning Briefing',
  },
]

function AdPreview({ id }: { id: string }) {
  const containerStyle: React.CSSProperties = {
    width: '100%',
    aspectRatio: '9/16',
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    background: '#0F0F1A',
    display: 'flex',
    flexDirection: 'column',
    padding: '28px 22px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
  }

  if (id === 'problem') {
    return (
      <div style={containerStyle}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 'auto' }}>
          <div style={{ width: 26, height: 26, borderRadius: 8, background: 'linear-gradient(135deg, #5B5CE2, #4647C7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>✨</div>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>Dijital Asistan</span>
        </div>

        {/* Chaos list */}
        <div style={{ marginTop: 32, marginBottom: 20 }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em', marginBottom: 14 }}>BUGÜN GELENLERİN HEPSİ</p>
          {[
            { n: '284', label: 'okunmamış mail', color: '#FF6B6B' },
            { n: '6', label: 'takvim etkinliği', color: '#FFB347' },
            { n: '14', label: 'görev', color: '#A78BFA' },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 10, opacity: 0.8 }}>
              <span style={{ fontSize: 32, fontWeight: 900, color: item.color, letterSpacing: '-0.04em', lineHeight: 1 }}>{item.n}</span>
              <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', fontWeight: 500 }}>{item.label}</span>
            </div>
          ))}
        </div>

        {/* Arrow divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.1)' }} />
          <div style={{ fontSize: 22, color: '#5B5CE2' }}>↓</div>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.1)' }} />
        </div>

        {/* Solution */}
        <div style={{ background: 'linear-gradient(135deg, rgba(91,92,226,0.2), rgba(70,71,199,0.1))', border: '1px solid rgba(91,92,226,0.3)', borderRadius: 16, padding: '18px', marginBottom: 28 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#7B7CF4', letterSpacing: '0.04em', marginBottom: 8 }}>BUGÜN GERÇEKTEN BİLMEN GEREKEN</p>
          <p style={{ fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.2 }}>4 şey var.</p>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 6 }}>Gerisini AI halletti.</p>
        </div>

        {/* CTA */}
        <button style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #5B5CE2, #4647C7)', border: 'none', borderRadius: 14, fontSize: 15, fontWeight: 700, color: '#fff', cursor: 'pointer' }}>
          Ücretsiz Dene →
        </button>
        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', textAlign: 'center', marginTop: 10 }}>Kredi kartı gerekmez</p>
      </div>
    )
  }

  if (id === 'followup') {
    return (
      <div style={{ ...containerStyle, background: '#0A0A16' }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 26, height: 26, borderRadius: 8, background: 'linear-gradient(135deg, #5B5CE2, #4647C7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>✨</div>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>Dijital Asistan</span>
        </div>

        {/* Question */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingBottom: 16 }}>
          <p style={{ fontSize: 28, fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1.15, marginBottom: 16 }}>
            Bir maili cevaplamayı<br/>
            <span style={{ color: '#FF6B6B' }}>unuttuğun</span><br/>
            oldu mu?
          </p>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.55, marginBottom: 28 }}>
            Önemli bir e-postayı gözden kaçırdığın için fırsatı kaçırmak artık geride kaldı.
          </p>

          {/* Feature card */}
          <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(91,92,226,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🤝</div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Smart Follow-Up</p>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Otomatik takip sistemi</p>
              </div>
            </div>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>
              Cevaplanmayı bekleyen mailler takip edilir. Zamanı gelince seni uyarır.
            </p>
          </div>
        </div>

        {/* CTA */}
        <button style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #5B5CE2, #4647C7)', border: 'none', borderRadius: 14, fontSize: 15, fontWeight: 700, color: '#fff', cursor: 'pointer' }}>
          7 Gün Ücretsiz Başla →
        </button>
        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', textAlign: 'center', marginTop: 10 }}>iOS ve Android</p>
      </div>
    )
  }

  // Morning Briefing
  return (
    <div style={{ ...containerStyle, background: 'linear-gradient(160deg, #0F0F1A 0%, #1A1A2E 100%)' }}>
      {/* Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 26, height: 26, borderRadius: 8, background: 'linear-gradient(135deg, #5B5CE2, #4647C7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>✨</div>
        <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>Dijital Asistan</span>
      </div>

      {/* Quote */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingBottom: 8 }}>
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: '#7B7CF4', letterSpacing: '0.06em', marginBottom: 10 }}>KULLANICI DENEYİMİ</p>
          <p style={{ fontSize: 24, fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.25 }}>
            "Ben artık sabah<br/><span style={{ color: '#FF6B6B' }}>Gmail açmıyorum.</span>"
          </p>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 10 }}>— Dijital Asistan kullanıcısı</p>
        </div>

        {/* Briefing card */}
        <div style={{ background: 'linear-gradient(135deg, #5B5CE2, #4647C7)', borderRadius: 18, padding: '18px', marginBottom: 20 }}>
          <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', fontWeight: 700, letterSpacing: '0.05em', marginBottom: 6 }}>☀️ SABAH BRİFİNGİ · 07:00</p>
          <p style={{ fontSize: 16, fontWeight: 800, color: '#fff', lineHeight: 1.3, marginBottom: 12 }}>Bugün bilmen gereken 5 şey var.</p>
          <div style={{ display: 'flex', gap: 16 }}>
            {[['3', 'kritik mail'], ['4', 'etkinlik'], ['2', 'son tarih']].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontSize: 16, fontWeight: 800, color: '#fff' }}>{n}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.65)' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.55 }}>
          Her sabah 60 saniyelik sesli özet. Gelen kutunu açmadan önce her şeyi biliyorsun.
        </p>
      </div>

      {/* CTA */}
      <button style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #5B5CE2, #4647C7)', border: 'none', borderRadius: 14, fontSize: 15, fontWeight: 700, color: '#fff', cursor: 'pointer' }}>
        Hemen İndir →
      </button>
      <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', textAlign: 'center', marginTop: 10 }}>Kredi kartı gerekmez</p>
    </div>
  )
}

export default function SocialAds() {
  const [selected, setSelected] = useState(0)
  const ad = ads[selected]

  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: '#F8F8FC' }}>
      <PageHeader title="Sosyal Medya Görselleri" />

      <div className="flex-1 mobile-scroll px-5 pb-6">
        <p style={{ fontSize: 13, color: '#6B6B80', marginBottom: 16, lineHeight: 1.5 }}>
          Instagram ve TikTok için hazır görseller
        </p>

        {/* Selector */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {ads.map((a, i) => (
            <button
              key={a.id}
              onClick={() => setSelected(i)}
              style={{
                flex: 1, padding: '7px 4px',
                background: selected === i ? '#5B5CE2' : '#fff',
                border: selected === i ? 'none' : '1px solid #E8E8F0',
                borderRadius: 10, fontSize: 10, fontWeight: 600,
                color: selected === i ? '#fff' : '#6B6B80',
                cursor: 'pointer',
              }}
            >
              {a.label}
            </button>
          ))}
        </div>

        {/* Format badges */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#5B5CE2', background: '#EEEEFF', padding: '3px 8px', borderRadius: 6 }}>
            9:16
          </div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#6B6B80', background: '#F1F1F8', padding: '3px 8px', borderRadius: 6 }}>
            Instagram · Reels · TikTok
          </div>
        </div>

        <AdPreview id={ad.id} />

        {/* Export row */}
        <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
          <button style={{
            flex: 1, padding: '11px 0',
            background: '#5B5CE2', border: 'none', borderRadius: 12,
            fontSize: 13, fontWeight: 600, color: '#fff', cursor: 'pointer',
          }}>
            PNG İndir
          </button>
          <button style={{
            flex: 1, padding: '11px 0',
            background: '#fff', border: '1px solid #E8E8F0', borderRadius: 12,
            fontSize: 13, fontWeight: 600, color: '#6B6B80', cursor: 'pointer',
          }}>
            MP4 İndir
          </button>
        </div>

        <div style={{ height: 20 }} />
      </div>
    </div>
  )
}
