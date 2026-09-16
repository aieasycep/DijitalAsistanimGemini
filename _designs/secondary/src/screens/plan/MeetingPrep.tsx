import { useState } from 'react'
import PageHeader from '../../components/layout/PageHeader'
import { useNavigation } from '../../context/NavigationContext'
import { useTheme } from '../../context/ThemeContext'

export default function MeetingPrep() {
  const { navigate } = useNavigation()
  const { t } = useTheme()
  const [noteOpen, setNoteOpen] = useState(false)
  const [note, setNote] = useState('')
  const [showHandoff, setShowHandoff] = useState(false)

  const sections = [
    {
      title: 'Toplantının Amacı',
      content: 'Revize fiyat teklifinin son değerlendirmesi ve sözleşme şartlarının görüşülmesi.',
      icon: '🎯',
    },
    {
      title: 'Son Görüşmeniz',
      content: 'Son görüşme 4 gün önce. Fiyat teklifi tartışıldı, Mehmet bazı revizyonlar istedi.',
      icon: '🕐',
    },
    {
      title: 'Son E-postalar',
      content: '2 mail: "Revize fiyat teklifi - acil" (bugün 08:42) ve "Teklif üzerine son değerlendirme" (bugün 10:20).',
      icon: '✉️',
    },
    {
      title: 'Açık Konular',
      content: '• Revize fiyat teklifi gönderilmedi\n• Teslim tarihi netleşmedi\n• Sözleşme maddesi #7 tartışılmadı',
      icon: '📋',
    },
  ]

  if (showHandoff) {
    return (
      <div className="flex flex-col flex-1 overflow-hidden items-center justify-center" style={{ background: '#0F0F1A' }}>
        <div style={{ textAlign: 'center', padding: '0 40px' }}>
          <div style={{ width: 72, height: 72, borderRadius: 20, background: 'linear-gradient(135deg, #5B5CE2, #4647C7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, margin: '0 auto 20px' }}>📹</div>
          <p style={{ fontSize: 20, fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', marginBottom: 8 }}>Google Meet açılıyor…</p>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5, marginBottom: 32 }}>Mehmet Kaya ile toplantın başlamak üzere. Hazır olduğunda uygulamaya geç.</p>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => setShowHandoff(false)} style={{ flex: 1, padding: '13px', borderRadius: 14, background: 'rgba(255,255,255,0.1)', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>
              Geri Dön
            </button>
            <button style={{ flex: 2, padding: '13px', borderRadius: 14, background: 'linear-gradient(135deg, #5B5CE2, #4647C7)', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 700, color: '#fff' }}>
              Meet'i Aç ↗
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: t.bg }}>
      <PageHeader showBack />

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #5B5CE2 0%, #4647C7 100%)', padding: '16px 20px 20px' }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.05em', marginBottom: 6 }}>TOPLANTIYA HAZIRLAN</p>
        <h2 style={{ fontSize: 21, fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', marginBottom: 4 }}>Mehmet Kaya</h2>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', marginBottom: 12 }}>14:30 · Google Meet</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 8, padding: '4px 10px' }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>⏱️ 18 dakika kaldı</span>
          </div>
        </div>
      </div>

      <div className="flex-1 mobile-scroll pb-4">
        {/* AI Key Points */}
        <div className="px-5 pt-4 mb-4">
          <div style={{ background: '#EEEEFF', borderRadius: 16, padding: '14px 16px', border: '1px solid rgba(91,92,226,0.2)' }}>
            <div className="flex items-center gap-2 mb-3">
              <span style={{ fontSize: 14 }}>✨</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#5B5CE2', letterSpacing: '0.04em' }}>TOPLANTIDA KONUŞMAN GEREKEN 3 ŞEY</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {['Revize fiyat teklifi — güncellenen rakamları paylaş', 'Teslim tarihi — kesin tarih belirle', 'Sözleşme maddesi #7 — müzakere et'].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <div style={{ width: 22, height: 22, borderRadius: 11, background: '#5B5CE2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#fff' }}>{i + 1}</span>
                  </div>
                  <span style={{ fontSize: 13, color: t.text, lineHeight: 1.4, fontWeight: 500 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Person card */}
        <div className="px-5 mb-3">
          <button
            onClick={() => navigate('person-intelligence')}
            style={{ width: '100%', background: t.surface, borderRadius: 14, padding: '13px 16px', border: 'none', cursor: 'pointer', textAlign: 'left', boxShadow: '0 1px 3px rgba(15,15,26,0.04)', display: 'flex', alignItems: 'center', gap: 12 }}
          >
            <div style={{ width: 40, height: 40, borderRadius: 20, background: '#EEEEFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, color: '#5B5CE2' }}>MK</div>
            <div className="flex-1">
              <p style={{ fontSize: 14, fontWeight: 700, color: t.text }}>Mehmet Kaya</p>
              <p style={{ fontSize: 12, color: t.textMuted }}>Son iletişim: 4 gün önce · 3 açık konu</p>
            </div>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ opacity: 0.3 }}>
              <path d="M5 3l4 4-4 4" stroke="#0F0F1A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Sections */}
        <div className="px-5">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {sections.map(s => (
              <div
                key={s.title}
                onClick={s.title === 'Son E-postalar' ? () => navigate('email-detail') : undefined}
                style={{ background: t.surface, borderRadius: 14, padding: '14px 16px', boxShadow: '0 1px 3px rgba(15,15,26,0.04)', cursor: s.title === 'Son E-postalar' ? 'pointer' : 'default' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span>{s.icon}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: t.textMuted, letterSpacing: '0.03em' }}>{s.title.toUpperCase()}</span>
                  {s.title === 'Son E-postalar' && <span style={{ marginLeft: 'auto', fontSize: 11, color: '#5B5CE2', fontWeight: 600 }}>Aç →</span>}
                </div>
                <p style={{ fontSize: 13, color: t.text, lineHeight: 1.55, whiteSpace: 'pre-line' }}>{s.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Note taking */}
        <div className="px-5 mt-4">
          {!noteOpen ? (
            <button
              onClick={() => setNoteOpen(true)}
              style={{
                width: '100%', padding: '13px', borderRadius: 14,
                background: t.surface, border: `1.5px dashed ${t.border}`,
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
              }}
            >
              <span style={{ fontSize: 16 }}>📝</span>
              <span style={{ fontSize: 14, fontWeight: 500, color: t.textMuted }}>Not Al…</span>
            </button>
          ) : (
            <div style={{ background: t.surface, borderRadius: 14, padding: '12px 14px', border: '1.5px solid #5B5CE2' }}>
              <textarea
                value={note}
                onChange={e => setNote(e.target.value)}
                placeholder="Toplantı notlarını buraya yaz…"
                autoFocus
                style={{
                  width: '100%', background: 'transparent', border: 'none', outline: 'none',
                  fontSize: 14, color: t.text, lineHeight: 1.6,
                  resize: 'none', minHeight: 100, fontFamily: 'Inter, sans-serif',
                }}
              />
            </div>
          )}
        </div>

        {/* CTAs */}
        <div className="px-5 mt-4 flex gap-3">
          <button
            onClick={() => navigate('post-meeting')}
            style={{
              flex: 1, padding: '14px', borderRadius: 14,
              background: 'linear-gradient(135deg, #5B5CE2 0%, #4647C7 100%)',
              border: 'none', cursor: 'pointer',
              fontSize: 14, fontWeight: 700, color: '#fff',
              boxShadow: '0 4px 12px rgba(91,92,226,0.25)',
            }}
          >
            2 Dk Özet
          </button>
          <button onClick={() => setShowHandoff(true)} style={{
            flex: 1, padding: '14px', borderRadius: 14,
            background: t.surface2, border: 'none', cursor: 'pointer',
            fontSize: 14, fontWeight: 600, color: t.textSec,
          }}>
            Toplantıyı Başlat
          </button>
        </div>
      </div>
    </div>
  )
}
