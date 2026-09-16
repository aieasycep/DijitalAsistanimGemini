import { useState, useRef, useEffect } from 'react'
import { useNavigation } from '../../context/NavigationContext'
import { useTheme } from '../../context/ThemeContext'

interface Message {
  id: string
  role: 'user' | 'ai'
  text: string
  card?: {
    type: 'email' | 'calendar' | 'person'
    title: string
    detail: string
  }
}

const suggestions = [
  'Bugün neye odaklanmalıyım?',
  'Kimlere cevap vermem gerekiyor?',
  'Yarın yoğun muyum?',
  'Bu hafta hangi son tarihlerim var?',
  'Mehmet ile en son ne konuştuk?',
  'Ödenmesi gereken bir şey var mı?',
]

const aiResponses: Record<string, { text: string; card?: Message['card'] }> = {
  'Bugün neye odaklanmalıyım?': {
    text: 'Bugün için 3 önceliklerin var: Ahmet\'e revize teklif (17:00 son tarih), 14:30\'da Mehmet toplantısı ve başvuru son tarihi. Teklifi sabah bitirirsen öğleden sonra toplantıya rahat girebilirsin.',
    card: { type: 'email', title: 'Ahmet Yılmaz — Teklif', detail: 'Bugün 17:00\'ye kadar · Gmail' },
  },
  'Kimlere cevap vermem gerekiyor?': {
    text: '3 kişi senden cevap bekliyor: Ahmet Yılmaz (acil, bugün 17:00), Fatma Şahin (yarın), Can Öztürk (bu hafta).',
  },
  'Yarın yoğun muyum?': {
    text: 'Yarın sabah görece sakin. Tek etkinlik 10:00\'daki proje kickoff toplantısı. Öğleden sonra uçuşun var (TK2412, 09:15 — aslında yarın sabah erken!). Takviminde 2,5 saatlik boş alan var.',
    card: { type: 'calendar', title: 'TK2412 İstanbul→Antalya', detail: 'Yarın 09:15 · Terminal 1' },
  },
}

function getAIResponse(text: string): { text: string; card?: Message['card'] } {
  const match = Object.keys(aiResponses).find(k => text.toLowerCase().includes(k.toLowerCase().split(' ')[0]))
  if (match) return aiResponses[match]
  return { text: `"${text}" hakkında bilgi arıyorum. Maillerinde ve takviminde ilgili bir konu bulamadım. Daha spesifik bir şey sormak ister misin?` }
}

export default function AssistantScreen() {
  const { navigate } = useNavigation()
  const { t } = useTheme()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  function sendMessage(text: string) {
    if (!text.trim()) return
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      const { text: aiText, card } = getAIResponse(text)
      setIsTyping(false)
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        text: aiText,
        card,
      }])
    }, 1200 + Math.random() * 600)
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: t.bg }}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-2 pb-3 flex-shrink-0">
        <h1 style={{ fontSize: 26, fontWeight: 700, color: t.text, letterSpacing: '-0.03em' }}>Asistan</h1>
        <button
          onClick={() => navigate('voice-assistant')}
          style={{ width: 36, height: 36, borderRadius: 18, background: '#EEEEFF', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="5" y="1" width="6" height="9" rx="3" fill="#5B5CE2"/>
            <path d="M2 8a6 6 0 0012 0" stroke="#5B5CE2" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
            <line x1="8" y1="14" x2="8" y2="16" stroke="#5B5CE2" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Messages or empty state */}
      <div className="flex-1 mobile-scroll px-4 pb-2">
        {messages.length === 0 ? (
          <div>
            {/* Welcome */}
            <div style={{ background: 'linear-gradient(135deg, #EEEEFF 0%, #E5F2FF 100%)', borderRadius: 20, padding: '20px', marginBottom: 20, border: '1px solid rgba(91,92,226,0.15)' }}>
              <div style={{ fontSize: 36, marginBottom: 10 }}>✨</div>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: t.text, letterSpacing: '-0.03em', marginBottom: 6 }}>Dijital hayatına sor.</h2>
              <p style={{ fontSize: 14, color: t.textSec, lineHeight: 1.5 }}>
                Mail, takvim ve taahhütlerine dayalı akıllı yanıtlar alırsın.
              </p>
            </div>

            {/* Suggestions */}
            <p style={{ fontSize: 12, fontWeight: 700, color: t.textMuted, letterSpacing: '0.04em', marginBottom: 10 }}>ÖNERİLEN SORULAR</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {suggestions.map(s => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  style={{
                    background: t.surface, border: 'none', borderRadius: 12, padding: '12px 14px',
                    fontSize: 14, color: t.text, cursor: 'pointer', textAlign: 'left',
                    fontWeight: 500, boxShadow: '0 1px 3px rgba(15,15,26,0.04)',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {s}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ opacity: 0.4, flexShrink: 0 }}>
                    <path d="M5 3l4 4-4 4" stroke="#0F0F1A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 4 }}>
            {messages.map(msg => (
              <div key={msg.id} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '85%',
                  background: msg.role === 'user'
                    ? 'linear-gradient(135deg, #5B5CE2 0%, #4647C7 100%)'
                    : t.surface,
                  borderRadius: msg.role === 'user' ? '18px 18px 6px 18px' : '18px 18px 18px 6px',
                  padding: '12px 14px',
                  boxShadow: '0 1px 4px rgba(15,15,26,0.08)',
                }}>
                  <p style={{ fontSize: 14, color: msg.role === 'user' ? '#fff' : t.text, lineHeight: 1.5, letterSpacing: '-0.01em' }}>
                    {msg.text}
                  </p>
                  {msg.card && (
                    <div style={{ marginTop: 10, background: msg.role === 'ai' ? t.bg : 'rgba(255,255,255,0.2)', borderRadius: 10, padding: '10px 12px' }}>
                      <p style={{ fontSize: 12, fontWeight: 700, color: msg.role === 'ai' ? '#5B5CE2' : 'rgba(255,255,255,0.9)', marginBottom: 2 }}>{msg.card.title}</p>
                      <p style={{ fontSize: 11, color: msg.role === 'ai' ? t.textMuted : 'rgba(255,255,255,0.7)' }}>{msg.card.detail}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{ background: t.surface, borderRadius: '18px 18px 18px 6px', padding: '14px 18px', boxShadow: '0 1px 4px rgba(15,15,26,0.08)' }}>
                  <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                    {[0, 1, 2].map(i => (
                      <div key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: '#5B5CE2', animation: `wavePulse 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="px-4 pb-3 pt-2 flex-shrink-0" style={{ background: 'rgba(248,248,252,0.95)', borderTop: '1px solid rgba(232,232,240,0.6)', backdropFilter: 'blur(12px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 0 }}>
          <button
            onClick={() => navigate('universal-capture')}
            style={{ width: 36, height: 36, borderRadius: 18, background: t.surface2, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
            title="Evrensel Ekleme"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2v12M2 8h12" stroke="#A0A0B2" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, background: t.surface, borderRadius: 24, padding: '8px 8px 8px 16px', border: `1.5px solid ${t.border}`, boxShadow: '0 1px 4px rgba(15,15,26,0.04)' }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
            placeholder="Dijital hayatına sor…"
            style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              fontSize: 15, color: t.text, letterSpacing: '-0.01em',
            }}
          />
          <button
            onClick={() => navigate('voice-assistant')}
            style={{ width: 34, height: 34, borderRadius: 17, background: t.surface2, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="4" y="1" width="6" height="7" rx="3" fill="#A0A0B2"/>
              <path d="M2 7a5 5 0 0010 0" stroke="#A0A0B2" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              <line x1="7" y1="12" x2="7" y2="14" stroke="#A0A0B2" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim()}
            style={{
              width: 34, height: 34, borderRadius: 17,
              background: input.trim() ? '#5B5CE2' : '#F1F1F8',
              border: 'none', cursor: input.trim() ? 'pointer' : 'not-allowed',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              transition: 'background 0.2s',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke={input.trim() ? '#fff' : '#A0A0B2'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        </div>
      </div>
    </div>
  )
}
