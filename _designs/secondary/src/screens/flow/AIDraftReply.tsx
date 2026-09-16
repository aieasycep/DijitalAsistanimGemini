import { useState } from 'react'
import PageHeader from '../../components/layout/PageHeader'
import BottomSheet from '../../components/layout/BottomSheet'
import { useNavigation } from '../../context/NavigationContext'

const defaultDraft = `Merhaba Ahmet,

Revize fiyat teklifini ekte bulabilirsiniz. İstediğiniz değişiklikleri yansıtmaya çalıştım.

Herhangi bir sorunuz olursa lütfen çekinmeden belirtin.

İyi günler,
Yunus`

export default function AIDraftReply() {
  const { navigate } = useNavigation()
  const [tone, setTone] = useState('Profesyonel')
  const [draft, setDraft] = useState(defaultDraft)
  const [showConfirm, setShowConfirm] = useState(false)
  const [sent, setSent] = useState(false)
  const [showGmailHandoff, setShowGmailHandoff] = useState(false)

  const tones = ['Kısa', 'Profesyonel', 'Samimi', 'Detaylı']

  if (showGmailHandoff) {
    return (
      <div className="flex flex-col flex-1 overflow-hidden items-center justify-center" style={{ background: '#0F0F1A' }}>
        <div style={{ textAlign: 'center', padding: '0 40px' }}>
          <div style={{ width: 72, height: 72, borderRadius: 20, background: '#EA4335', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, margin: '0 auto 20px' }}>✉</div>
          <p style={{ fontSize: 20, fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', marginBottom: 8 }}>Gmail açılıyor…</p>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5, marginBottom: 32 }}>Taslak Gmail uygulamasına aktarıldı. Göndermek için Gmail'i kullan.</p>
          <button onClick={() => setShowGmailHandoff(false)} style={{ width: '100%', padding: '14px', borderRadius: 14, background: 'rgba(255,255,255,0.1)', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: '#fff' }}>
            Geri Dön
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: '#F8F8FC' }}>
      <PageHeader title="Yanıt Hazırla" showBack />

      <div className="flex-1 mobile-scroll pb-4">
        <div className="px-5 pt-4">
          {/* Tone selector */}
          <div className="mb-4">
            <p style={{ fontSize: 12, fontWeight: 700, color: '#A0A0B2', letterSpacing: '0.04em', marginBottom: 8 }}>TON</p>
            <div className="flex gap-2">
              {tones.map(t => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  style={{
                    padding: '6px 14px', borderRadius: 10, border: 'none', cursor: 'pointer',
                    fontSize: 13, fontWeight: 600,
                    background: tone === t ? '#5B5CE2' : '#F1F1F8',
                    color: tone === t ? '#fff' : '#6B6B80',
                    transition: 'all 0.15s',
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* To field */}
          <div style={{ background: '#fff', borderRadius: 12, padding: '12px 14px', marginBottom: 12, boxShadow: '0 1px 3px rgba(15,15,26,0.04)' }}>
            <div className="flex items-center gap-3">
              <span style={{ fontSize: 12, fontWeight: 600, color: '#A0A0B2', width: 32 }}>Kime</span>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: 14, background: '#FFEEED', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#C0251B' }}>AY</div>
                <span style={{ fontSize: 14, color: '#0F0F1A' }}>Ahmet Yılmaz</span>
              </div>
            </div>
          </div>

          {/* AI badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#5B5CE2', background: '#EEEEFF', borderRadius: 6, padding: '2px 8px', letterSpacing: '0.04em' }}>AI TARAFINDAN HAZIRLANDI</span>
            <span style={{ fontSize: 11, color: '#A0A0B2' }}>Düzenleyebilirsin</span>
          </div>

          {/* Editable draft */}
          <textarea
            value={draft}
            onChange={e => setDraft(e.target.value)}
            style={{
              width: '100%', background: '#fff', border: '1.5px solid #E8E8F0',
              borderRadius: 16, padding: '14px 16px',
              fontSize: 14, color: '#0F0F1A', lineHeight: 1.6,
              resize: 'none', minHeight: 200, fontFamily: 'Inter, sans-serif',
              letterSpacing: '-0.01em', outline: 'none',
              boxShadow: '0 1px 4px rgba(15,15,26,0.04)',
            }}
          />

          <p style={{ fontSize: 11, color: '#A0A0B2', textAlign: 'center', margin: '8px 0 16px', letterSpacing: '-0.01em' }}>
            ⚠️ AI onayın olmadan mail göndermez
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button
              onClick={() => setShowConfirm(true)}
              style={{
                width: '100%', padding: '15px',
                background: 'linear-gradient(135deg, #5B5CE2 0%, #4647C7 100%)',
                border: 'none', borderRadius: 16, cursor: 'pointer',
                fontSize: 15, fontWeight: 700, color: '#fff',
                letterSpacing: '-0.02em',
                boxShadow: '0 4px 16px rgba(91,92,226,0.3)',
              }}
            >
              Göndermeyi Onayla
            </button>
            <button onClick={() => setShowGmailHandoff(true)} style={{
              width: '100%', padding: '13px',
              background: '#F1F1F8', border: 'none', borderRadius: 14,
              cursor: 'pointer', fontSize: 14, fontWeight: 600, color: '#6B6B80',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 4l5 4 5-4" stroke="#6B6B80" strokeWidth="1.4" strokeLinecap="round"/>
                <rect x="1" y="3" width="12" height="8" rx="2" stroke="#6B6B80" strokeWidth="1.4" fill="none"/>
              </svg>
              Gmail'de Aç
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation sheet */}
      <BottomSheet isOpen={showConfirm} onClose={() => setShowConfirm(false)} title="Son Onay">
        <div className="px-5 py-4">
          <p style={{ fontSize: 14, color: '#6B6B80', lineHeight: 1.5, marginBottom: 16 }}>
            Ahmet Yılmaz'a şu mail gönderilecek. Bu işlem geri alınamaz.
          </p>
          <div style={{ background: '#F8F8FC', borderRadius: 12, padding: '12px 14px', marginBottom: 20, border: '1px solid #E8E8F0' }}>
            <p style={{ fontSize: 13, color: '#0F0F1A', lineHeight: 1.5 }}>{draft.substring(0, 120)}…</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button
              onClick={() => { setSent(true); setShowConfirm(false) }}
              style={{ width: '100%', padding: '14px', background: '#5B5CE2', border: 'none', borderRadius: 14, cursor: 'pointer', fontSize: 15, fontWeight: 700, color: '#fff' }}
            >
              Evet, Gönder
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              style={{ width: '100%', padding: '12px', background: '#F1F1F8', border: 'none', borderRadius: 14, cursor: 'pointer', fontSize: 14, fontWeight: 600, color: '#6B6B80' }}
            >
              İptal
            </button>
          </div>
        </div>
      </BottomSheet>

      {/* Sent success overlay */}
      {sent && (
        <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.96)', zIndex: 100, borderRadius: 48 }}>
          <div className="text-center animate-scale-in">
            <div style={{ width: 72, height: 72, borderRadius: 36, background: '#E8F8EE', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M8 16l5 5 10-10" stroke="#34C759" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p style={{ fontSize: 22, fontWeight: 800, color: '#0F0F1A', letterSpacing: '-0.03em', marginBottom: 6 }}>Gönderildi!</p>
            <p style={{ fontSize: 14, color: '#6B6B80', marginBottom: 24 }}>Ahmet Yılmaz'a iletildi.</p>
            <button onClick={() => navigate('today')} style={{ padding: '12px 28px', background: '#5B5CE2', border: 'none', borderRadius: 14, cursor: 'pointer', fontSize: 15, fontWeight: 600, color: '#fff' }}>
              Bugüne Dön
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
