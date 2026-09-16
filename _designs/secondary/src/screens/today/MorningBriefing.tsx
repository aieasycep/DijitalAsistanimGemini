import { useState, useEffect } from 'react'
import PageHeader from '../../components/layout/PageHeader'
import { useNavigation } from '../../context/NavigationContext'

export default function MorningBriefing() {
  const { goBack } = useNavigation()
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [speed, setSpeed] = useState(1)
  const speeds = [1, 1.25, 1.5]

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>
    if (isPlaying && progress < 100) {
      interval = setInterval(() => setProgress(p => Math.min(p + 0.4, 100)), 100)
    }
    return () => clearInterval(interval)
  }, [isPlaying, progress])

  const sections = [
    { title: 'Bugünün Öncelikleri', count: 3, color: '#FFEEED', icon: '⚡' },
    { title: 'Programın', count: 3, color: '#EEEEFF', icon: '📅' },
    { title: 'Cevap Bekleyenler', count: 2, color: '#FFF4E0', icon: '✉️' },
    { title: 'Senden Beklenenler', count: 2, color: '#F0ECFF', icon: '📋' },
    { title: 'Son Tarihler', count: 1, color: '#FFEEED', icon: '⏰' },
    { title: 'Kişisel Hatırlatmalar', count: 2, color: '#E8F8EE', icon: '🔔' },
  ]

  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: '#0F0F1A' }}>
      {/* Dark header */}
      <div className="flex items-center justify-between px-5 pt-2 pb-0" style={{ height: 52 }}>
        <button onClick={goBack} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: 18, width: 36, height: 36, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M11 4L6 9l5 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <span style={{ fontSize: 15, fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>Sabah Brifing</span>
        <div style={{ width: 36 }} />
      </div>

      <div className="flex-1 mobile-scroll pb-4">
        {/* Hero */}
        <div className="px-5 pt-4 pb-6">
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>Cumartesi, 5 Eylül</p>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1.2, marginBottom: 16 }}>
            Günaydın<br/>Yunus 👋
          </h1>

          {/* Narrative */}
          <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 16, padding: '16px 18px' }}>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, letterSpacing: '-0.01em' }}>
              Bugün oldukça sakin bir günün var. Öğlene kadar toplantın bulunmuyor. Saat 14:30'da Mehmet ile müşteri toplantın var. Toplantı öncesi dün gönderilen fiyat teklifine göz atman iyi olabilir. Gelen 46 mail arasında 3 konu dikkat gerektiriyor.
            </p>
          </div>
        </div>

        {/* Audio Player */}
        <div className="mx-5 mb-6" style={{ background: 'rgba(91,92,226,0.2)', borderRadius: 20, padding: '16px 18px', border: '1px solid rgba(91,92,226,0.3)' }}>
          <div className="flex items-center justify-between mb-3">
            <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>Brifing Sesi</span>
            <button
              onClick={() => setSpeed(s => { const i = speeds.indexOf(s); return speeds[(i + 1) % speeds.length] })}
              style={{ fontSize: 12, fontWeight: 700, color: '#7879F1', background: 'rgba(91,92,226,0.25)', border: 'none', borderRadius: 8, padding: '3px 8px', cursor: 'pointer' }}
            >
              {speed}x
            </button>
          </div>

          {/* Progress bar */}
          <div style={{ height: 3, background: 'rgba(255,255,255,0.15)', borderRadius: 2, marginBottom: 12, cursor: 'pointer' }}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              const pct = ((e.clientX - rect.left) / rect.width) * 100
              setProgress(Math.max(0, Math.min(100, pct)))
            }}>
            <div style={{ height: '100%', width: `${progress}%`, background: '#7879F1', borderRadius: 2, transition: 'width 0.1s linear' }} />
          </div>

          <div className="flex items-center justify-between">
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>0:{Math.floor(progress * 1.2).toString().padStart(2,'0')}</span>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setProgress(p => Math.max(0, p - 10))}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.7)', fontSize: 11, fontWeight: 600 }}
              >
                ↩ 15
              </button>
              <button
                onClick={() => setIsPlaying(p => !p)}
                style={{
                  width: 44, height: 44, borderRadius: 22,
                  background: '#7879F1', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                {isPlaying ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="3" y="3" width="4" height="10" rx="1" fill="white"/>
                    <rect x="9" y="3" width="4" height="10" rx="1" fill="white"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M5 3l8 5-8 5V3z" fill="white"/>
                  </svg>
                )}
              </button>
              <button
                onClick={() => setProgress(p => Math.min(100, p + 10))}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.7)', fontSize: 11, fontWeight: 600 }}
              >
                15 ↪
              </button>
            </div>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>2:00</span>
          </div>
        </div>

        {/* Sections */}
        <div className="px-5">
          <h2 style={{ fontSize: 15, fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.04em', marginBottom: 12 }}>BRİFİNG İÇERİĞİ</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {sections.map((s) => (
              <div key={s.title} style={{
                background: 'rgba(255,255,255,0.06)',
                borderRadius: 14,
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}>
                <div style={{ fontSize: 20, width: 36, textAlign: 'center' }}>{s.icon}</div>
                <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.85)', letterSpacing: '-0.01em' }}>{s.title}</span>
                <span style={{
                  fontSize: 11, fontWeight: 700, color: '#0F0F1A',
                  background: 'rgba(255,255,255,0.9)',
                  borderRadius: 8, padding: '2px 8px',
                  minWidth: 24, textAlign: 'center',
                }}>
                  {s.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
