import { useState } from 'react'
import { useNavigation } from '../../context/NavigationContext'

export default function PostMeeting() {
  const { navigate } = useNavigation()
  const [text, setText] = useState('')
  const [saved, setSaved] = useState(false)

  if (saved) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center px-5" style={{ background: '#F8F8FC' }}>
        <div className="animate-scale-in text-center">
          <div style={{ width: 72, height: 72, borderRadius: 36, background: '#EEEEFF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M8 16l5 5 10-10" stroke="#5B5CE2" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <p style={{ fontSize: 22, fontWeight: 800, color: '#0F0F1A', letterSpacing: '-0.03em', marginBottom: 6 }}>Taahhüt Kaydedildi</p>
          <p style={{ fontSize: 14, color: '#6B6B80', marginBottom: 8 }}>Mehmet'e teklif gönder</p>
          <p style={{ fontSize: 12, color: '#A0A0B2', marginBottom: 28 }}>Yarın hatırlatılacak</p>
          <button onClick={() => navigate('today')} style={{ padding: '12px 28px', background: '#5B5CE2', border: 'none', borderRadius: 14, cursor: 'pointer', fontSize: 15, fontWeight: 600, color: '#fff' }}>
            Bugüne Dön
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: '#F8F8FC' }}>
      <div className="flex items-center justify-between px-5 py-3 flex-shrink-0" style={{ borderBottom: '1px solid #F2F2F8' }}>
        <button onClick={() => navigate('plan')} style={{ background: '#F1F1F8', border: 'none', borderRadius: 18, width: 36, height: 36, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M11 4L6 9l5 5" stroke="#0F0F1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <span style={{ fontSize: 15, fontWeight: 600, color: '#0F0F1A' }}>Toplantı Sonrası</span>
        <div style={{ width: 36 }} />
      </div>

      <div className="flex-1 mobile-scroll px-5 pt-6 pb-6">
        <div style={{ marginBottom: 24, textAlign: 'center' }}>
          <div style={{ width: 60, height: 60, borderRadius: 30, background: '#E8F8EE', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: 28 }}>
            ✅
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: '#0F0F1A', letterSpacing: '-0.03em', marginBottom: 6 }}>Toplantın bitti.</h1>
          <p style={{ fontSize: 14, color: '#6B6B80' }}>Mehmet Kaya · Müşteri Toplantısı · 60 dk</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: '16px', boxShadow: '0 1px 4px rgba(15,15,26,0.05)', marginBottom: 20 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: '#0F0F1A', marginBottom: 12 }}>Takip edilecek bir konu var mı?</p>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="&quot;Mehmet'e yarın teklif göndereceğim.&quot;"
            style={{
              width: '100%', background: '#F8F8FC', border: '1.5px solid #E8E8F0',
              borderRadius: 12, padding: '12px', fontSize: 14, color: '#0F0F1A',
              lineHeight: 1.55, resize: 'none', minHeight: 90,
              fontFamily: 'Inter, sans-serif', outline: 'none',
            }}
          />
        </div>

        {text.trim().length > 0 && (
          <div className="animate-fade-in" style={{ background: '#EEEEFF', borderRadius: 14, padding: '14px 16px', marginBottom: 20, border: '1px solid rgba(91,92,226,0.2)' }}>
            <div className="flex items-center gap-2 mb-2">
              <span style={{ fontSize: 11, fontWeight: 700, color: '#5B5CE2', letterSpacing: '0.04em' }}>✨ YENİ TAAHHÜT</span>
            </div>
            <p style={{ fontSize: 15, fontWeight: 600, color: '#0F0F1A', marginBottom: 4 }}>Mehmet'e teklif gönder</p>
            <p style={{ fontSize: 12, color: '#A0A0B2' }}>Yarın · Taahhütler listesine eklenecek</p>
          </div>
        )}

        <button
          onClick={() => text.trim() && setSaved(true)}
          disabled={!text.trim()}
          style={{
            width: '100%', padding: '15px', borderRadius: 16,
            background: text.trim() ? 'linear-gradient(135deg, #5B5CE2 0%, #4647C7 100%)' : '#E8E8F0',
            border: 'none', cursor: text.trim() ? 'pointer' : 'not-allowed',
            fontSize: 15, fontWeight: 700, color: text.trim() ? '#fff' : '#A0A0B2',
            letterSpacing: '-0.02em',
          }}
        >
          Kaydet
        </button>
      </div>
    </div>
  )
}
