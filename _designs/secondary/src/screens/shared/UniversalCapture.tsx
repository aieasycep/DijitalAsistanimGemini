import { useState } from 'react'
import PageHeader from '../../components/layout/PageHeader'
import { useNavigation } from '../../context/NavigationContext'

export default function UniversalCapture() {
  const { navigate } = useNavigation()
  const [mode, setMode] = useState<'input' | 'analyzing' | 'result'>('input')
  const [input, setInput] = useState('')
  const [captureType, setCaptureType] = useState<string | null>(null)

  function analyze() {
    if (!input.trim()) return
    setMode('analyzing')
    setTimeout(() => setMode('result'), 2000)
  }

  if (mode === 'analyzing') {
    return (
      <div className="flex flex-col flex-1 items-center justify-center px-6" style={{ background: '#F8F8FC' }}>
        <div className="animate-spin-custom" style={{ width: 48, height: 48, borderRadius: 24, border: '3px solid rgba(91,92,226,0.2)', borderTopColor: '#5B5CE2', marginBottom: 20 }} />
        <p style={{ fontSize: 16, fontWeight: 600, color: '#0F0F1A', marginBottom: 6 }}>İçerik analiz ediliyor…</p>
        <p style={{ fontSize: 13, color: '#A0A0B2' }}>Etkinlik, görev ve son tarih aranıyor</p>
      </div>
    )
  }

  if (mode === 'result') {
    return (
      <div className="flex flex-col flex-1 overflow-hidden" style={{ background: '#F8F8FC' }}>
        <PageHeader title="İçerik Tespit Edildi" showBack />
        <div className="flex-1 mobile-scroll px-5 pt-4 pb-6">
          <div style={{ background: '#EEEEFF', borderRadius: 16, padding: '16px', marginBottom: 20, border: '1px solid rgba(91,92,226,0.2)' }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: '#5B5CE2', letterSpacing: '0.04em', marginBottom: 8 }}>✨ AI TESPİT ETTİ</p>
            <p style={{ fontSize: 15, fontWeight: 600, color: '#0F0F1A', marginBottom: 4 }}>12 Eylül · 20:00 · Zorlu PSM</p>
            <p style={{ fontSize: 13, color: '#6B6B80' }}>Etkinlik olarak tespit edildi</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {[
              { label: 'Takvime Ekle', icon: '📅', primary: true },
              { label: 'Görev Oluştur', icon: '✅', primary: false },
              { label: 'Hatırlatıcı Kur', icon: '🔔', primary: false },
            ].map(a => (
              <button
                key={a.label}
                onClick={() => navigate('approval-center')}
                style={{
                  width: '100%', padding: '14px 16px', borderRadius: 14,
                  background: a.primary ? 'linear-gradient(135deg, #5B5CE2 0%, #4647C7 100%)' : '#fff',
                  border: a.primary ? 'none' : '1px solid #E8E8F0',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10,
                  fontSize: 15, fontWeight: 600, color: a.primary ? '#fff' : '#0F0F1A',
                  boxShadow: a.primary ? '0 4px 12px rgba(91,92,226,0.25)' : '0 1px 3px rgba(15,15,26,0.04)',
                }}
              >
                <span style={{ fontSize: 18 }}>{a.icon}</span>
                {a.label}
              </button>
            ))}
          </div>

          <button onClick={() => setMode('input')} style={{ width: '100%', padding: '12px', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 14, color: '#A0A0B2' }}>
            Tekrar Dene
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: '#F8F8FC' }}>
      <PageHeader title="Dijital Asistan'a Ekle" showBack />

      <div className="flex-1 mobile-scroll px-5 pt-4 pb-6">
        <p style={{ fontSize: 14, color: '#6B6B80', marginBottom: 20, lineHeight: 1.5 }}>
          Fotoğraf, screenshot, PDF, link veya metin yapıştır. AI içerikten etkinlik, görev veya hatırlatıcı çıkarır.
        </p>

        <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
          {[{ icon: '📷', label: 'Fotoğraf', sample: 'Konsert bileti fotoğrafı — 12 Eylül 20:00 Zorlu PSM' }, { icon: '📄', label: 'PDF', sample: 'Sözleşme PDF — imza tarihi 15 Eylül' }, { icon: '🔗', label: 'Link', sample: 'https://etkinlik.com/bilet/123456' }].map(t => (
            <button key={t.label} onClick={() => { setCaptureType(t.label); setInput(t.sample); setMode('analyzing'); setTimeout(() => setMode('result'), 1800) }} style={{ flex: 1, padding: '16px 0', background: captureType === t.label ? '#EEEEFF' : '#fff', border: captureType === t.label ? '1.5px solid rgba(91,92,226,0.4)' : '1.5px dashed #E8E8F0', borderRadius: 14, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 24 }}>{t.icon}</span>
              <span style={{ fontSize: 12, fontWeight: 500, color: '#A0A0B2' }}>{t.label}</span>
            </button>
          ))}
        </div>

        <div style={{ marginBottom: 12 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: '#A0A0B2', marginBottom: 8 }}>VEYA METİN YAPIŞTIIR</p>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder='"12 Eylül saat 20:00, Zorlu PSM Konseri — bilet konfirmasyon maili"'
            style={{
              width: '100%', background: '#fff', border: '1.5px solid #E8E8F0',
              borderRadius: 16, padding: '14px', fontSize: 14, color: '#0F0F1A',
              lineHeight: 1.55, resize: 'none', minHeight: 120,
              fontFamily: 'Inter, sans-serif', outline: 'none',
            }}
          />
        </div>

        <button
          onClick={analyze}
          disabled={!input.trim()}
          style={{
            width: '100%', padding: '15px', borderRadius: 16,
            background: input.trim() ? '#5B5CE2' : '#E8E8F0',
            border: 'none', cursor: input.trim() ? 'pointer' : 'not-allowed',
            fontSize: 15, fontWeight: 700, color: input.trim() ? '#fff' : '#A0A0B2',
          }}
        >
          AI ile Analiz Et
        </button>
      </div>
    </div>
  )
}
