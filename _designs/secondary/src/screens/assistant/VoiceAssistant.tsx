import { useState, useEffect } from 'react'
import { useNavigation } from '../../context/NavigationContext'

const exampleCommands = [
  '"Bugün ne var?"',
  '"Yarınki toplantımı 30 dakika ileri al."',
  '"Mehmet\'e cevap vermem gerekiyor mu?"',
  '"Bugünkü brifingimi oku."',
]

type VoiceState = 'idle' | 'listening' | 'processing' | 'responding'

export default function VoiceAssistant() {
  const { goBack } = useNavigation()
  const [state, setState] = useState<VoiceState>('idle')
  const [response, setResponse] = useState<string | null>(null)

  function startListening() {
    setState('listening')
    setTimeout(() => {
      setState('processing')
      setTimeout(() => {
        setState('responding')
        setResponse('Bugün 5 önemli konun var. En kritik olan Ahmet\'in 17:00\'ye kadar beklediği teklif. Toplantın 14:30\'da başlıyor.')
      }, 1500)
    }, 2000)
  }

  function reset() {
    setState('idle')
    setResponse(null)
  }

  const stateLabels: Record<VoiceState, string> = {
    idle: 'Konuşmak için dokun',
    listening: 'Dinliyorum…',
    processing: 'Anlıyorum…',
    responding: 'Yanıt hazır',
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: '#0F0F1A' }}>
      {/* Close button */}
      <div className="flex justify-between items-center px-5 pt-2 pb-0" style={{ height: 52 }}>
        <div style={{ width: 36 }} />
        <span style={{ fontSize: 15, fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>Sesli Asistan</span>
        <button onClick={goBack} style={{ width: 36, height: 36, borderRadius: 18, background: 'rgba(255,255,255,0.08)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 2l10 10M12 2L2 12" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Waveform visualization */}
        <div style={{ marginBottom: 40, height: 80, display: 'flex', alignItems: 'center', gap: 4 }}>
          {Array.from({ length: 32 }, (_, i) => {
            const isActive = state === 'listening' || state === 'processing'
            const delay = i * 0.05
            const baseHeight = isActive ? (0.3 + Math.sin(i * 0.8) * 0.4) * 60 : 8
            return (
              <div
                key={i}
                style={{
                  width: 4,
                  height: baseHeight,
                  borderRadius: 2,
                  background: isActive
                    ? `rgba(120, 121, 241, ${0.4 + Math.sin(i * 0.5) * 0.4})`
                    : 'rgba(255,255,255,0.1)',
                  animation: isActive ? `wavePulse ${0.8 + Math.random() * 0.8}s ease-in-out ${delay}s infinite` : 'none',
                  transition: 'height 0.3s ease, background 0.3s ease',
                }}
              />
            )
          })}
        </div>

        {/* State label */}
        <p style={{ fontSize: 20, fontWeight: 600, color: 'rgba(255,255,255,0.9)', letterSpacing: '-0.02em', marginBottom: 8, textAlign: 'center' }}>
          {stateLabels[state]}
        </p>

        {/* Response */}
        {response && (
          <div className="animate-fade-in" style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 20, padding: '18px 20px', marginBottom: 24, maxWidth: 340, textAlign: 'center' }}>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6 }}>{response}</p>
          </div>
        )}

        {/* Main button */}
        <button
          onClick={state === 'idle' ? startListening : reset}
          style={{
            width: 88, height: 88, borderRadius: 44,
            background: state === 'listening'
              ? 'linear-gradient(135deg, #FF3B30 0%, #E02E24 100%)'
              : 'linear-gradient(135deg, #7879F1 0%, #5B5CE2 100%)',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: state === 'listening'
              ? '0 0 0 20px rgba(255,59,48,0.12), 0 8px 24px rgba(255,59,48,0.4)'
              : '0 0 0 16px rgba(91,92,226,0.12), 0 8px 24px rgba(91,92,226,0.4)',
            transition: 'all 0.3s ease',
          }}
        >
          {state === 'idle' || state === 'responding' ? (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect x="9" y="2" width="10" height="15" rx="5" fill="white"/>
              <path d="M4 14a10 10 0 0020 0" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
              <line x1="14" y1="24" x2="14" y2="27" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          ) : state === 'listening' ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="7" height="18" rx="2" fill="white"/>
              <rect x="14" y="3" width="7" height="18" rx="2" fill="white"/>
            </svg>
          ) : (
            <div className="animate-spin-custom" style={{ width: 24, height: 24, borderRadius: 12, border: '3px solid rgba(255,255,255,0.3)', borderTopColor: '#fff' }} />
          )}
        </button>

        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 16, textAlign: 'center' }}>
          {state === 'listening' ? 'Durdurmak için dokun' : state === 'idle' ? 'veya aşağıdan örnek seç' : ''}
        </p>
      </div>

      {/* Example commands */}
      {state === 'idle' && (
        <div className="px-5 pb-6">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {exampleCommands.map(cmd => (
              <button
                key={cmd}
                onClick={() => { startListening() }}
                style={{
                  background: 'rgba(255,255,255,0.06)', border: 'none', borderRadius: 12,
                  padding: '11px 16px', cursor: 'pointer', textAlign: 'left',
                  fontSize: 13, color: 'rgba(255,255,255,0.6)', fontStyle: 'italic',
                }}
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
