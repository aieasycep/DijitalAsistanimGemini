import { useState, useEffect } from 'react'
import { useNavigation } from '../../context/NavigationContext'

type OnboardingStep = 'welcome' | 'noise' | 'proactive' | 'control' | 'account' | 'connect' | 'permission' | 'calendar-permission' | 'preferences' | 'personalization' | 'vip' | 'analysis' | 'aha' | 'notification'

export default function OnboardingFlow() {
  const { navigate } = useNavigation()
  const [step, setStep] = useState<OnboardingStep>('welcome')

  const order: OnboardingStep[] = ['welcome', 'noise', 'proactive', 'control', 'account', 'connect', 'permission', 'calendar-permission', 'preferences', 'personalization', 'vip', 'analysis', 'aha', 'notification']

  const next = (s?: OnboardingStep) => {
    if (s) return setStep(s)
    const idx = order.indexOf(step)
    if (idx < order.length - 1) setStep(order[idx + 1])
    else navigate('today')
  }

  const stepProgress: Record<OnboardingStep, number> = {
    welcome: 0, noise: 1, proactive: 2, control: 3, account: 4,
    connect: 5, permission: 6, 'calendar-permission': 7, preferences: 8, personalization: 9,
    vip: 10, analysis: 11, aha: 12, notification: 13,
  }
  const totalSteps = 14

  if (step === 'welcome') return <WelcomeScreen onNext={next} />
  if (step === 'noise') return <NoiseScreen onNext={next} progress={stepProgress[step]} total={totalSteps} />
  if (step === 'proactive') return <ProactiveScreen onNext={next} progress={stepProgress[step]} total={totalSteps} />
  if (step === 'control') return <ControlScreen onNext={next} progress={stepProgress[step]} total={totalSteps} />
  if (step === 'account') return <AccountScreen onNext={next} progress={stepProgress[step]} total={totalSteps} />
  if (step === 'connect') return <ConnectScreen onNext={next} progress={stepProgress[step]} total={totalSteps} />
  if (step === 'permission') return <PermissionScreen onNext={next} progress={stepProgress[step]} total={totalSteps} />
  if (step === 'calendar-permission') return <CalendarPermissionScreen onNext={next} progress={stepProgress[step]} total={totalSteps} />
  if (step === 'preferences') return <PreferencesScreen onNext={next} progress={stepProgress[step]} total={totalSteps} />
  if (step === 'personalization') return <PersonalizationScreen onNext={next} progress={stepProgress[step]} total={totalSteps} />
  if (step === 'vip') return <VIPScreen onNext={next} progress={stepProgress[step]} total={totalSteps} />
  if (step === 'analysis') return <AnalysisScreen onNext={next} />
  if (step === 'aha') return <AhaScreen onNext={next} />
  if (step === 'notification') return <NotificationScreen onNext={() => navigate('today')} />
  return null
}

function ProgressBar({ progress, total }: { progress: number; total: number }) {
  return (
    <div className="flex gap-1 px-5 py-2 flex-shrink-0">
      {Array.from({ length: total }, (_, i) => (
        <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= progress ? '#5B5CE2' : '#E8E8F0', transition: 'background 0.3s' }} />
      ))}
    </div>
  )
}

function WelcomeScreen({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: '#0F0F1A' }}>
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        {/* Logo */}
        <div className="animate-float" style={{ marginBottom: 32 }}>
          <div style={{
            width: 80, height: 80, borderRadius: 24,
            background: 'linear-gradient(135deg, #7879F1 0%, #5B5CE2 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 16px 48px rgba(91,92,226,0.5)',
          }}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="18" stroke="white" strokeWidth="2" fill="none" strokeOpacity="0.3"/>
              <path d="M12 20h6l3-8 3 16 3-8h4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <h1 style={{ fontSize: 30, fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1.2, marginBottom: 16 }}>
          Dijital hayatın artık tek yerde.
        </h1>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: 48 }}>
          Mailini, takvimini ve açık işlerini anlayıp her gün sana kısa bir brifing hazırlar.
        </p>

        <button
          onClick={onNext}
          style={{
            width: '100%', maxWidth: 320, padding: '17px',
            background: 'linear-gradient(135deg, #7879F1 0%, #5B5CE2 100%)',
            border: 'none', borderRadius: 18, cursor: 'pointer',
            fontSize: 17, fontWeight: 700, color: '#fff',
            letterSpacing: '-0.02em',
            boxShadow: '0 8px 32px rgba(91,92,226,0.5)',
          }}
        >
          Başlayalım
        </button>
        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', marginTop: 16 }}>
          Devam ederek Gizlilik Politikası'nı kabul etmiş olursunuz.
        </p>
      </div>
    </div>
  )
}

function NoiseScreen({ onNext, progress, total }: { onNext: () => void; progress: number; total: number }) {
  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: '#F8F8FC' }}>
      <ProgressBar progress={progress} total={total} />
      <div className="flex-1 flex flex-col px-6 pt-8">
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#0F0F1A', letterSpacing: '-0.04em', lineHeight: 1.2, marginBottom: 12 }}>
          Gürültüyü azalt.
        </h1>
        <p style={{ fontSize: 15, color: '#6B6B80', lineHeight: 1.6, marginBottom: 40 }}>
          Yüzlerce mail arasından gerçekten önemli olanı bulur.
        </p>

        {/* Visual */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40, flex: 1, justifyContent: 'center' }}>
          {/* Before */}
          <div style={{ background: '#fff', borderRadius: 16, padding: 16, boxShadow: '0 1px 4px rgba(15,15,26,0.06)' }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#A0A0B2', letterSpacing: '0.05em', marginBottom: 12 }}>ÖNCE</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {Array.from({ length: 6 }, (_, i) => (
                <div key={i} style={{ height: 8, borderRadius: 4, background: '#F1F1F8', width: `${60 + Math.sin(i) * 30}%` }} />
              ))}
            </div>
            <div style={{ marginTop: 8, fontSize: 32, fontWeight: 900, color: '#F1F1F8', letterSpacing: '-0.04em' }}>127 mail</div>
          </div>

          <div style={{ textAlign: 'center', fontSize: 24 }}>⬇️</div>

          {/* After */}
          <div style={{ background: 'linear-gradient(135deg, #EEEEFF 0%, #E5F2FF 100%)', borderRadius: 16, padding: 16, border: '1px solid rgba(91,92,226,0.2)' }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#5B5CE2', letterSpacing: '0.05em', marginBottom: 12 }}>SONRA</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {['Revize teklif — bugün 17:00', 'Toplantı değişikliği', 'Kritik son tarih'].map((t, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 4, background: '#5B5CE2', flexShrink: 0 }} />
                  <span style={{ fontSize: 13, fontWeight: 500, color: '#0F0F1A' }}>{t}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 8, fontSize: 28, fontWeight: 900, color: '#5B5CE2', letterSpacing: '-0.03em' }}>3 önemli konu</div>
          </div>
        </div>

        <button onClick={onNext} style={{ width: '100%', padding: '16px', background: '#5B5CE2', border: 'none', borderRadius: 16, cursor: 'pointer', fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 16 }}>
          Devam
        </button>
      </div>
    </div>
  )
}

function ProactiveScreen({ onNext, progress, total }: { onNext: () => void; progress: number; total: number }) {
  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: '#F8F8FC' }}>
      <ProgressBar progress={progress} total={total} />
      <div className="flex-1 flex flex-col px-6 pt-8">
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#0F0F1A', letterSpacing: '-0.04em', lineHeight: 1.2, marginBottom: 12 }}>
          Gününü sen sormadan hazırlarız.
        </h1>
        <p style={{ fontSize: 15, color: '#6B6B80', lineHeight: 1.6, marginBottom: 32 }}>
          Her sabah kişisel bir brifing hazır olur.
        </p>

        {/* Mock briefing card */}
        <div className="animate-float" style={{ background: 'linear-gradient(135deg, #5B5CE2 0%, #4647C7 100%)', borderRadius: 24, padding: '20px', marginBottom: 32, boxShadow: '0 16px 48px rgba(91,92,226,0.3)' }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.65)', marginBottom: 6 }}>Günaydın, Yunus 👋</p>
          <p style={{ fontSize: 19, fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.3, marginBottom: 14 }}>
            Bugün bilmen gereken 5 şey var.
          </p>
          <div className="flex gap-3">
            {[['3', 'mail'], ['4', 'etkinlik'], ['2', 'takip']].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>{n}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1" />
        <button onClick={onNext} style={{ width: '100%', padding: '16px', background: '#5B5CE2', border: 'none', borderRadius: 16, cursor: 'pointer', fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 16 }}>
          Devam
        </button>
      </div>
    </div>
  )
}

function ControlScreen({ onNext, progress, total }: { onNext: () => void; progress: number; total: number }) {
  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: '#F8F8FC' }}>
      <ProgressBar progress={progress} total={total} />
      <div className="flex-1 flex flex-col px-6 pt-8">
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#0F0F1A', letterSpacing: '-0.04em', lineHeight: 1.2, marginBottom: 12 }}>
          Kontrol her zaman sende.
        </h1>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12, justifyContent: 'center' }}>
          {[
            { icon: '🔒', text: 'Sen onaylamadan mail göndermeyiz.' },
            { icon: '👁️', text: 'Verilerin reklam için kullanılmaz.' },
            { icon: '🔗', text: 'Bağlantını istediğin zaman kaldırabilirsin.' },
            { icon: '✋', text: 'Önemli işlemler onayın olmadan gerçekleşmez.' },
          ].map(item => (
            <div key={item.text} style={{ background: '#fff', borderRadius: 14, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 1px 3px rgba(15,15,26,0.04)' }}>
              <span style={{ fontSize: 22, flexShrink: 0 }}>{item.icon}</span>
              <span style={{ fontSize: 14, fontWeight: 500, color: '#0F0F1A', lineHeight: 1.4 }}>{item.text}</span>
            </div>
          ))}
        </div>
        <button onClick={onNext} style={{ width: '100%', padding: '16px', background: '#5B5CE2', border: 'none', borderRadius: 16, cursor: 'pointer', fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 16, marginTop: 24 }}>
          Anladım
        </button>
      </div>
    </div>
  )
}

function AccountScreen({ onNext, progress, total }: { onNext: () => void; progress: number; total: number }) {
  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: '#F8F8FC' }}>
      <ProgressBar progress={progress} total={total} />
      <div className="flex-1 flex flex-col px-6 pt-8">
        <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0F0F1A', letterSpacing: '-0.03em', marginBottom: 8 }}>Hesap oluştur</h1>
        <p style={{ fontSize: 14, color: '#6B6B80', marginBottom: 32 }}>Güvenli giriş için bir yöntem seç.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { icon: '🔵', label: 'Google ile devam et', bg: '#fff', border: '#E8E8F0' },
            { icon: '⬛', label: 'Apple ile devam et', bg: '#0F0F1A', color: '#fff', border: '#0F0F1A' },
            { icon: '🔷', label: 'Microsoft ile devam et', bg: '#fff', border: '#E8E8F0' },
          ].map(opt => (
            <button
              key={opt.label}
              onClick={onNext}
              style={{
                width: '100%', padding: '15px 20px',
                background: opt.bg,
                border: `1.5px solid ${opt.border}`,
                borderRadius: 14, cursor: 'pointer',
                fontSize: 15, fontWeight: 600,
                color: (opt as any).color || '#0F0F1A',
                display: 'flex', alignItems: 'center', gap: 12,
                boxShadow: '0 1px 3px rgba(15,15,26,0.06)',
              }}
            >
              <span style={{ fontSize: 20 }}>{opt.icon}</span>
              {opt.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '16px 0' }}>
          <div style={{ flex: 1, height: 1, background: '#E8E8F0' }} />
          <span style={{ fontSize: 12, color: '#A0A0B2' }}>veya</span>
          <div style={{ flex: 1, height: 1, background: '#E8E8F0' }} />
        </div>

        <button onClick={onNext} style={{ width: '100%', padding: '14px', background: 'transparent', border: '1.5px solid #E8E8F0', borderRadius: 14, cursor: 'pointer', fontSize: 14, fontWeight: 600, color: '#0F0F1A' }}>
          E-posta ile devam et
        </button>
      </div>
    </div>
  )
}

function ConnectScreen({ onNext, progress, total }: { onNext: () => void; progress: number; total: number }) {
  const [connected, setConnected] = useState<string[]>([])

  const services = [
    { id: 'gmail', label: 'Gmail', icon: '📧', desc: 'Google hesabın' },
    { id: 'outlook', label: 'Outlook', icon: '📨', desc: 'Microsoft hesabın' },
    { id: 'gcal', label: 'Google Takvim', icon: '📅', desc: 'Google Calendar' },
    { id: 'mcal', label: 'Microsoft Takvim', icon: '📆', desc: 'Outlook Calendar' },
    { id: 'acal', label: 'Apple Takvim', icon: '🗓️', desc: 'iCloud Calendar' },
  ]

  const hasMinimum = connected.some(c => ['gmail', 'outlook'].includes(c)) && connected.some(c => ['gcal', 'mcal', 'acal'].includes(c))

  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: '#F8F8FC' }}>
      <ProgressBar progress={progress} total={total} />
      <div className="flex-1 flex flex-col px-5 pt-6 pb-4">
        <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0F0F1A', letterSpacing: '-0.03em', marginBottom: 4 }}>Dijital hayatını bağla.</h1>
        <p style={{ fontSize: 14, color: '#6B6B80', marginBottom: 24 }}>En az 1 mail + 1 takvim bağla.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
          {services.map(s => {
            const isConnected = connected.includes(s.id)
            return (
              <button
                key={s.id}
                onClick={() => setConnected(prev => isConnected ? prev.filter(c => c !== s.id) : [...prev, s.id])}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '14px 16px', background: isConnected ? '#EEEEFF' : '#fff',
                  border: isConnected ? '2px solid #5B5CE2' : '1px solid #E8E8F0',
                  borderRadius: 14, cursor: 'pointer', textAlign: 'left',
                  transition: 'all 0.15s',
                }}
              >
                <span style={{ fontSize: 22, width: 32 }}>{s.icon}</span>
                <div className="flex-1">
                  <p style={{ fontSize: 14, fontWeight: 600, color: '#0F0F1A' }}>{s.label}</p>
                  <p style={{ fontSize: 11, color: '#A0A0B2' }}>{s.desc}</p>
                </div>
                <div style={{
                  width: 22, height: 22, borderRadius: 11,
                  background: isConnected ? '#5B5CE2' : '#F1F1F8',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: isConnected ? 'none' : '1.5px solid #E8E8F0',
                  flexShrink: 0,
                }}>
                  {isConnected && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
              </button>
            )
          })}
        </div>

        <button
          onClick={onNext}
          disabled={!hasMinimum}
          style={{
            width: '100%', padding: '16px', marginTop: 16,
            background: hasMinimum ? '#5B5CE2' : '#E8E8F0',
            border: 'none', borderRadius: 16, cursor: hasMinimum ? 'pointer' : 'not-allowed',
            fontSize: 16, fontWeight: 700, color: hasMinimum ? '#fff' : '#A0A0B2',
            transition: 'all 0.2s',
          }}
        >
          {hasMinimum ? 'Devam' : 'Mail ve takvim seç'}
        </button>
      </div>
    </div>
  )
}

function PermissionScreen({ onNext, progress, total }: { onNext: () => void; progress: number; total: number }) {
  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: '#F8F8FC' }}>
      <ProgressBar progress={progress} total={total} />
      <div className="flex-1 flex flex-col px-6 pt-8 pb-4">
        <div style={{ fontSize: 36, marginBottom: 12 }}>📧</div>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: '#0F0F1A', letterSpacing: '-0.03em', marginBottom: 8, lineHeight: 1.3 }}>
          Gmail erişimine neden ihtiyacımız var?
        </h1>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8, margin: '16px 0' }}>
          {[
            'Önemli mailleri bulmak',
            'Cevap bekleyenleri tespit etmek',
            'Son tarihleri anlamak',
            'Takip edilecek konuları bulmak',
          ].map(item => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: '#fff', borderRadius: 12, boxShadow: '0 1px 3px rgba(15,15,26,0.04)' }}>
              <div style={{ width: 20, height: 20, borderRadius: 10, background: '#E8F8EE', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5 4-4" stroke="#34C759" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <span style={{ fontSize: 14, color: '#0F0F1A' }}>{item}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#EEEEFF', borderRadius: 14, padding: '14px 16px', marginBottom: 24, border: '1px solid rgba(91,92,226,0.15)' }}>
          <p style={{ fontSize: 13, color: '#0F0F1A', lineHeight: 1.5, fontWeight: 500 }}>
            🔒 Sen onaylamadan mail göndermeyiz. Veriler reklamverenlerle paylaşılmaz.
          </p>
        </div>

        <button onClick={onNext} style={{ width: '100%', padding: '16px', background: '#5B5CE2', border: 'none', borderRadius: 16, cursor: 'pointer', fontSize: 16, fontWeight: 700, color: '#fff' }}>
          Güvenli şekilde bağla
        </button>
      </div>
    </div>
  )
}

function CalendarPermissionScreen({ onNext, progress, total }: { onNext: () => void; progress: number; total: number }) {
  const [denied, setDenied] = useState(false)

  if (denied) {
    return (
      <div className="flex flex-col flex-1 overflow-hidden" style={{ background: '#F8F8FC' }}>
        <ProgressBar progress={progress} total={total} />
        <div className="flex-1 flex flex-col px-6 pt-8 pb-4 items-center justify-center text-center">
          <div style={{ fontSize: 48, marginBottom: 16 }}>📅</div>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: '#0F0F1A', letterSpacing: '-0.03em', marginBottom: 8 }}>Takvim erişimi kapalı</h1>
          <p style={{ fontSize: 14, color: '#6B6B80', lineHeight: 1.55, marginBottom: 32 }}>
            Dilersen Ayarlar&apos;dan daha sonra açabilirsin. Takvim olmadan da temel özellikler çalışır.
          </p>
          <button
            onClick={() => alert('Ayarlar açılıyor...')}
            style={{ width: '100%', padding: '14px', background: '#5B5CE2', border: 'none', borderRadius: 14, cursor: 'pointer', fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 10 }}
          >Ayarları Aç</button>
          <button onClick={onNext} style={{ width: '100%', padding: '13px', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 500, color: '#A0A0B2' }}>
            Şimdilik Atla
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: '#F8F8FC' }}>
      <ProgressBar progress={progress} total={total} />
      <div className="flex-1 flex flex-col px-6 pt-8 pb-4">
        <div style={{ fontSize: 36, marginBottom: 12 }}>📅</div>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: '#0F0F1A', letterSpacing: '-0.03em', marginBottom: 8, lineHeight: 1.3 }}>
          Takvimine neden erişmemiz gerekiyor?
        </h1>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8, margin: '16px 0' }}>
          {[
            'Gününü anlayabilmek',
            'Toplantı çakışmalarını fark etmek',
            'Yaklaşan etkinlikleri brifinge eklemek',
            'Uygun zaman önerileri sunmak',
          ].map(item => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: '#fff', borderRadius: 12, boxShadow: '0 1px 3px rgba(15,15,26,0.04)' }}>
              <div style={{ width: 20, height: 20, borderRadius: 10, background: '#E8F8EE', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5 4-4" stroke="#34C759" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <span style={{ fontSize: 14, color: '#0F0F1A' }}>{item}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#EEEEFF', borderRadius: 14, padding: '14px 16px', marginBottom: 20, border: '1px solid rgba(91,92,226,0.15)' }}>
          <p style={{ fontSize: 13, color: '#0F0F1A', lineHeight: 1.5, fontWeight: 500 }}>
            🔒 Takviminde değişiklik yapmadan önce senden onay isteriz.
          </p>
        </div>

        <button onClick={onNext} style={{ width: '100%', padding: '16px', background: '#5B5CE2', border: 'none', borderRadius: 16, cursor: 'pointer', fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 10 }}>
          Takvim Erişimine İzin Ver
        </button>
        <button onClick={() => setDenied(true)} style={{ width: '100%', padding: '13px', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 500, color: '#A0A0B2' }}>
          Şimdi Değil
        </button>
      </div>
    </div>
  )
}

function PreferencesScreen({ onNext, progress, total }: { onNext: () => void; progress: number; total: number }) {
  const [morning, setMorning] = useState('07:30')
  const [midday, setMidday] = useState('13:00')
  const [evening, setEvening] = useState('19:00')
  const [weekend, setWeekend] = useState(false)

  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: '#F8F8FC' }}>
      <ProgressBar progress={progress} total={total} />
      <div className="flex-1 flex flex-col px-5 pt-6 pb-4">
        <h1 style={{ fontSize: 22, fontWeight: 800, color: '#0F0F1A', letterSpacing: '-0.03em', marginBottom: 4 }}>Günün ne zaman başlıyor?</h1>
        <p style={{ fontSize: 14, color: '#6B6B80', marginBottom: 24 }}>Brifinglerin için en uygun zamanları ayarla.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
          {[
            { icon: '☀️', label: 'Sabah Brifing', value: morning, onChange: setMorning },
            { icon: '🌤️', label: 'Gün Ortası', value: midday, onChange: setMidday },
            { icon: '🌙', label: 'Akşam Kapanış', value: evening, onChange: setEvening },
          ].map(item => (
            <div key={item.label} style={{ background: '#fff', borderRadius: 14, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 1px 3px rgba(15,15,26,0.04)' }}>
              <span style={{ fontSize: 22 }}>{item.icon}</span>
              <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: '#0F0F1A' }}>{item.label}</span>
              <input
                type="time"
                value={item.value}
                onChange={e => item.onChange(e.target.value)}
                style={{
                  fontSize: 15, fontWeight: 700, color: '#5B5CE2',
                  background: '#EEEEFF', border: 'none', borderRadius: 10,
                  padding: '6px 10px', fontFamily: 'Inter, sans-serif',
                  cursor: 'pointer', outline: 'none',
                }}
              />
            </div>
          ))}

          <div style={{ background: '#fff', borderRadius: 14, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 1px 3px rgba(15,15,26,0.04)' }}>
            <span style={{ fontSize: 22 }}>📅</span>
            <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: '#0F0F1A' }}>Hafta sonu brifing gönder</span>
            <button
              onClick={() => setWeekend(v => !v)}
              style={{
                width: 50, height: 30, borderRadius: 15,
                background: weekend ? '#5B5CE2' : '#E0E0EA',
                border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.25s', flexShrink: 0,
              }}
            >
              <span style={{
                position: 'absolute', top: 3, left: weekend ? 23 : 3, width: 24, height: 24, borderRadius: 12,
                background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.18)', transition: 'left 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }} />
            </button>
          </div>
        </div>

        <button onClick={onNext} style={{ width: '100%', padding: '16px', background: '#5B5CE2', border: 'none', borderRadius: 16, cursor: 'pointer', fontSize: 16, fontWeight: 700, color: '#fff', marginTop: 16 }}>
          Devam
        </button>
      </div>
    </div>
  )
}

function PersonalizationScreen({ onNext, progress, total }: { onNext: () => void; progress: number; total: number }) {
  const [selected, setSelected] = useState<string[]>([])

  const options = ['İş', 'Aile', 'Finans', 'Seyahat', 'Alışveriş', 'Randevular', 'Son Tarihler', 'Hepsi']

  function toggle(opt: string) {
    if (opt === 'Hepsi') { setSelected(['Hepsi']); return }
    setSelected(prev => {
      const without = prev.filter(p => p !== 'Hepsi')
      return without.includes(opt) ? without.filter(p => p !== opt) : [...without, opt]
    })
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: '#F8F8FC' }}>
      <ProgressBar progress={progress} total={total} />
      <div className="flex-1 flex flex-col px-5 pt-6 pb-4">
        <h1 style={{ fontSize: 22, fontWeight: 800, color: '#0F0F1A', letterSpacing: '-0.03em', marginBottom: 4 }}>Senin için neler daha önemli?</h1>
        <p style={{ fontSize: 14, color: '#6B6B80', marginBottom: 24 }}>Birden fazla seçebilirsin.</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, flex: 1, alignContent: 'flex-start' }}>
          {options.map(opt => {
            const sel = selected.includes(opt)
            return (
              <button
                key={opt}
                onClick={() => toggle(opt)}
                style={{
                  padding: '10px 18px', borderRadius: 24,
                  background: sel ? '#5B5CE2' : '#fff',
                  border: sel ? 'none' : '1.5px solid #E8E8F0',
                  fontSize: 14, fontWeight: 600,
                  color: sel ? '#fff' : '#0F0F1A',
                  cursor: 'pointer', transition: 'all 0.15s',
                  boxShadow: sel ? '0 2px 8px rgba(91,92,226,0.25)' : '0 1px 3px rgba(15,15,26,0.04)',
                }}
              >
                {opt}
              </button>
            )
          })}
        </div>

        <button
          onClick={onNext}
          disabled={selected.length === 0}
          style={{
            width: '100%', padding: '16px', marginTop: 16,
            background: selected.length > 0 ? '#5B5CE2' : '#E8E8F0',
            border: 'none', borderRadius: 16, cursor: selected.length > 0 ? 'pointer' : 'not-allowed',
            fontSize: 16, fontWeight: 700, color: selected.length > 0 ? '#fff' : '#A0A0B2',
          }}
        >
          Devam
        </button>
      </div>
    </div>
  )
}

function VIPScreen({ onNext, progress, total }: { onNext: () => void; progress: number; total: number }) {
  const [selected, setSelected] = useState<string[]>([])
  const contacts = ['Mehmet Kaya', 'Ahmet Yılmaz', 'Fatma Şahin', 'Ayşe Demir', 'Can Öztürk', 'Anne / Baba', 'Yönetici']

  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: '#F8F8FC' }}>
      <ProgressBar progress={progress} total={total} />
      <div className="flex-1 flex flex-col px-5 pt-6 pb-4">
        <h1 style={{ fontSize: 22, fontWeight: 800, color: '#0F0F1A', letterSpacing: '-0.03em', lineHeight: 1.3, marginBottom: 4 }}>
          Kimlerden gelen şeyleri asla kaçırmak istemezsin?
        </h1>
        <p style={{ fontSize: 14, color: '#6B6B80', marginBottom: 24 }}>VIP kişilerin mesajları her zaman öne çıkar.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
          {contacts.map(c => {
            const initials = c.split(' ').map(p => p[0]).join('').substring(0, 2)
            const sel = selected.includes(c)
            return (
              <button
                key={c}
                onClick={() => setSelected(prev => sel ? prev.filter(p => p !== c) : [...prev, c])}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '12px 14px', background: sel ? '#EEEEFF' : '#fff',
                  border: sel ? '1.5px solid rgba(91,92,226,0.4)' : '1px solid #E8E8F0',
                  borderRadius: 12, cursor: 'pointer', textAlign: 'left',
                  transition: 'all 0.15s',
                }}
              >
                <div style={{ width: 36, height: 36, borderRadius: 18, background: sel ? '#5B5CE2' : '#F1F1F8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: sel ? '#fff' : '#6B6B80' }}>{initials}</span>
                </div>
                <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: '#0F0F1A' }}>{c}</span>
                {sel && (
                  <div style={{ width: 20, height: 20, borderRadius: 10, background: '#5B5CE2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                )}
              </button>
            )
          })}
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          <button onClick={onNext} style={{ flex: 1, padding: '14px', background: '#F1F1F8', border: 'none', borderRadius: 14, cursor: 'pointer', fontSize: 14, fontWeight: 600, color: '#6B6B80' }}>
            Atla
          </button>
          <button onClick={onNext} style={{ flex: 2, padding: '14px', background: '#5B5CE2', border: 'none', borderRadius: 14, cursor: 'pointer', fontSize: 15, fontWeight: 700, color: '#fff' }}>
            Devam {selected.length > 0 && `(${selected.length})`}
          </button>
        </div>
      </div>
    </div>
  )
}

function AnalysisScreen({ onNext }: { onNext: () => void }) {
  const [step, setStep] = useState(0)

  const steps = [
    { text: 'Son 72 saat taranıyor…', sub: '' },
    { text: 'E-postalar sınıflandırılıyor…', sub: '127 mail bulundu' },
    { text: 'Takvim kontrol ediliyor…', sub: '8 potansiyel önemli konu' },
    { text: 'Açık konular aranıyor…', sub: '4 yaklaşan etkinlik' },
    { text: 'Neredeyse bitti…', sub: '2 olası takip' },
  ]

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    steps.forEach((_, i) => {
      timers.push(setTimeout(() => {
        setStep(i)
        if (i === steps.length - 1) {
          timers.push(setTimeout(onNext, 1200))
        }
      }, i * 1000))
    })
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className="flex flex-col flex-1 items-center justify-center px-6" style={{ background: '#0F0F1A' }}>
      {/* Spinner */}
      <div style={{ position: 'relative', width: 100, height: 100, marginBottom: 40 }}>
        <div style={{
          width: 100, height: 100, borderRadius: 50,
          border: '3px solid rgba(91,92,226,0.2)',
          borderTopColor: '#7879F1',
          animation: 'spin 1s linear infinite',
        }} />
        <div style={{
          position: 'absolute', inset: 12,
          width: 76, height: 76, borderRadius: 38,
          background: 'rgba(91,92,226,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32,
        }}>
          🔍
        </div>
      </div>

      <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', marginBottom: 8, textAlign: 'center' }}>
        Dijital hayatın analiz ediliyor…
      </h2>
      <p className="animate-fade-in" key={step} style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', marginBottom: 4, textAlign: 'center' }}>
        {steps[step]?.text}
      </p>
      {steps[step]?.sub && (
        <p className="animate-fade-in" key={`sub-${step}`} style={{ fontSize: 14, color: '#7879F1', fontWeight: 600, textAlign: 'center' }}>
          {steps[step].sub}
        </p>
      )}

      {/* Progress dots */}
      <div className="flex gap-2 mt-8">
        {steps.map((_, i) => (
          <div key={i} style={{ width: 8, height: 8, borderRadius: 4, background: i <= step ? '#7879F1' : 'rgba(255,255,255,0.15)', transition: 'background 0.3s' }} />
        ))}
      </div>
    </div>
  )
}

function AhaScreen({ onNext }: { onNext: () => void }) {
  const cards = [
    { priority: 'KRİTİK', text: 'Ahmet Yılmaz senden bugün 17:00\'ye kadar teklif bekliyor.', source: 'Gmail' },
    { priority: 'YAKLAŞAN', text: '14:30\'da Mehmet ile müşteri toplantın var.', source: 'Google Calendar' },
    { priority: 'SON TARİH', text: 'Başvuru bugün saat 17:00\'de kapanıyor.', source: 'Gmail' },
    { priority: 'BİLGİ', text: 'Trendyol siparişin bugün geliyor.', source: 'Gmail' },
    { priority: 'BİLGİ', text: 'TK2412 uçuşun yarın 09:15\'de.', source: 'Gmail' },
  ]

  const priorityColors: Record<string, { bg: string; color: string }> = {
    'KRİTİK': { bg: '#FFEEED', color: '#C0251B' },
    'YAKLAŞAN': { bg: '#FFF4E0', color: '#8C5200' },
    'SON TARİH': { bg: '#F0ECFF', color: '#5B21B6' },
    'BİLGİ': { bg: '#E5F2FF', color: '#0051A8' },
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: '#F8F8FC' }}>
      <div className="flex-1 flex flex-col px-5 pt-8 pb-4">
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🎉</div>
          <h1 style={{ fontSize: 26, fontWeight: 900, color: '#0F0F1A', letterSpacing: '-0.04em', marginBottom: 8 }}>Hazır.</h1>
          <p style={{ fontSize: 15, color: '#6B6B80', lineHeight: 1.5 }}>
            Son 72 saatte bilmen gereken <strong style={{ color: '#0F0F1A' }}>5 şey</strong> bulduk.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
          {cards.map((card, i) => {
            const pc = priorityColors[card.priority]
            return (
              <div key={i} className="animate-fade-in" style={{ background: '#fff', borderRadius: 14, padding: '12px 14px', boxShadow: '0 1px 4px rgba(15,15,26,0.06)', animationDelay: `${i * 100}ms`, opacity: 0 }}>
                <div className="flex items-center gap-2 mb-2">
                  <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.06em', color: pc.color, background: pc.bg, borderRadius: 5, padding: '2px 6px' }}>
                    {card.priority}
                  </span>
                </div>
                <p style={{ fontSize: 13, fontWeight: 500, color: '#0F0F1A', marginBottom: 4 }}>{card.text}</p>
                <p style={{ fontSize: 11, color: '#A0A0B2' }}>{card.source}</p>
              </div>
            )
          })}
        </div>

        <button
          onClick={onNext}
          style={{
            width: '100%', padding: '17px', marginTop: 20,
            background: 'linear-gradient(135deg, #5B5CE2 0%, #4647C7 100%)',
            border: 'none', borderRadius: 18, cursor: 'pointer',
            fontSize: 17, fontWeight: 700, color: '#fff',
            letterSpacing: '-0.02em',
            boxShadow: '0 8px 24px rgba(91,92,226,0.35)',
          }}
        >
          Brifingimi Gör
        </button>
      </div>
    </div>
  )
}

function NotificationScreen({ onNext }: { onNext: () => void }) {
  const examples = [
    { icon: '☀️', text: '"Bugün bilmen gereken 5 şey var."' },
    { icon: '⚠️', text: '"Ahmet senden bugün 17:00\'ye kadar dönüş bekliyor."' },
    { icon: '📅', text: '"14:30 toplantına 20 dakika kaldı."' },
    { icon: '📦', text: '"Kargon bugün geliyor."' },
  ]

  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: '#F8F8FC' }}>
      <div className="flex-1 flex flex-col px-6 pt-8 pb-4">
        <div style={{ fontSize: 36, marginBottom: 12 }}>🔔</div>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: '#0F0F1A', letterSpacing: '-0.03em', lineHeight: 1.3, marginBottom: 4 }}>
          Sadece önemli olduğunda haber verelim.
        </h1>
        <p style={{ fontSize: 14, color: '#6B6B80', marginBottom: 24 }}>Gereksiz bildirim göndermeyiz.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
          {examples.map(e => (
            <div key={e.text} style={{ background: '#fff', borderRadius: 12, padding: '12px 14px', display: 'flex', gap: 10, boxShadow: '0 1px 3px rgba(15,15,26,0.04)' }}>
              <span style={{ fontSize: 18 }}>{e.icon}</span>
              <span style={{ fontSize: 13, color: '#0F0F1A', fontStyle: 'italic', lineHeight: 1.4 }}>{e.text}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 24 }}>
          <button
            onClick={onNext}
            style={{
              width: '100%', padding: '16px',
              background: 'linear-gradient(135deg, #5B5CE2 0%, #4647C7 100%)',
              border: 'none', borderRadius: 16, cursor: 'pointer',
              fontSize: 16, fontWeight: 700, color: '#fff',
            }}
          >
            Bildirimleri Aç
          </button>
          <button onClick={onNext} style={{ width: '100%', padding: '13px', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 500, color: '#A0A0B2' }}>
            Şimdi Değil
          </button>
        </div>
      </div>
    </div>
  )
}
