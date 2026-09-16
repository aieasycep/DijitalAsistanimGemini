import { useState } from 'react'
import PageHeader from '../../components/layout/PageHeader'
import BottomSheet from '../../components/layout/BottomSheet'

const initialPrefs = [
  { id: '1', text: 'Mehmet Yılmaz yüksek öncelikli', priority: 'high', enabled: true },
  { id: '2', text: 'Promosyon mailleri düşük öncelikli', priority: 'low', enabled: true },
  { id: '3', text: 'Toplantıları 30 dakika önce hatırlatmayı tercih ediyorsun', priority: 'normal', enabled: true },
  { id: '4', text: "Fatma Şahin'den gelen mailler önemli", priority: 'high', enabled: true },
  { id: '5', text: 'Haber bültenleri otomatik arşivleniyor', priority: 'low', enabled: false },
]

const priorityLabels: Record<string, { label: string; color: string; bg: string }> = {
  high: { label: 'Yüksek', color: '#C0251B', bg: '#FFEEED' },
  normal: { label: 'Normal', color: '#5B5CE2', bg: '#EEEEFF' },
  low: { label: 'Düşük', color: '#6B6B80', bg: '#F1F1F8' },
}

export default function AIPersonalization() {
  const [prefs, setPrefs] = useState(initialPrefs)
  const [editId, setEditId] = useState<string | null>(null)
  const [editPriority, setEditPriority] = useState<string>('normal')
  const [learnEnabled, setLearnEnabled] = useState(true)

  const editPref = prefs.find(p => p.id === editId)

  function remove(id: string) {
    setPrefs(prev => prev.filter(p => p.id !== id))
  }

  function toggleEnabled(id: string) {
    setPrefs(prev => prev.map(p => p.id === id ? { ...p, enabled: !p.enabled } : p))
  }

  function openEdit(id: string) {
    const p = prefs.find(pr => pr.id === id)
    if (p) { setEditId(id); setEditPriority(p.priority) }
  }

  function saveEdit() {
    setPrefs(prev => prev.map(p => p.id === editId ? { ...p, priority: editPriority } : p))
    setEditId(null)
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: '#F8F8FC' }}>
      <PageHeader title="AI Kişiselleştirme" showBack />

      <div className="flex-1 mobile-scroll px-5 pt-4 pb-6">
        <div style={{ background: '#EEEEFF', borderRadius: 14, padding: '14px 16px', marginBottom: 20, border: '1px solid rgba(91,92,226,0.15)' }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: '#5B5CE2', marginBottom: 4 }}>Dijital Asistan beni nasıl tanıyor?</p>
          <p style={{ fontSize: 13, color: '#6B6B80', lineHeight: 1.5 }}>
            AI zamanla seni öğrenir. Aşağıda öğrendiklerini düzenleyebilirsin.
          </p>
        </div>

        <p style={{ fontSize: 11, fontWeight: 700, color: '#A0A0B2', letterSpacing: '0.05em', marginBottom: 8 }}>ÖĞRENİLEN TERCİHLER</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {prefs.map(pref => {
            const pl = priorityLabels[pref.priority]
            return (
              <div key={pref.id} style={{ background: '#fff', borderRadius: 12, padding: '12px 14px', boxShadow: '0 1px 3px rgba(15,15,26,0.04)', opacity: pref.enabled ? 1 : 0.5 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10 }}>
                  <span style={{ fontSize: 16, flexShrink: 0 }}>✨</span>
                  <span style={{ flex: 1, fontSize: 14, color: '#0F0F1A', lineHeight: 1.4 }}>{pref.text}</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: pl.color, background: pl.bg, borderRadius: 6, padding: '2px 7px', flexShrink: 0 }}>{pl.label}</span>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => openEdit(pref.id)} style={{ flex: 1, padding: '7px', borderRadius: 8, background: '#EEEEFF', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600, color: '#5B5CE2' }}>
                    Düzenle
                  </button>
                  <button onClick={() => toggleEnabled(pref.id)} style={{ flex: 1, padding: '7px', borderRadius: 8, background: pref.enabled ? '#FFF4E0' : '#E8F8EE', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600, color: pref.enabled ? '#8C5200' : '#1A7A33' }}>
                    {pref.enabled ? 'Devre Dışı' : 'Etkinleştir'}
                  </button>
                  <button onClick={() => remove(pref.id)} style={{ width: 34, height: 34, padding: 0, borderRadius: 8, background: '#FFEEED', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="#C0251B" strokeWidth="1.6" strokeLinecap="round"/></svg>
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {prefs.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#A0A0B2' }}>
            <p style={{ fontSize: 32, marginBottom: 8 }}>🤖</p>
            <p style={{ fontSize: 14 }}>AI henüz bir tercih öğrenmedi.</p>
          </div>
        )}

        <div style={{ marginTop: 24 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#A0A0B2', letterSpacing: '0.05em', marginBottom: 8 }}>EĞİTİM VERİSİ</p>
          <div style={{ background: '#fff', borderRadius: 14, padding: '14px 16px', boxShadow: '0 1px 3px rgba(15,15,26,0.04)' }}>
            <div className="flex items-center justify-between">
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#0F0F1A', marginBottom: 2 }}>Etkileşimlerimden öğren</p>
                <p style={{ fontSize: 12, color: '#A0A0B2' }}>Daha iyi öneriler için verilerini kullan</p>
              </div>
              <button onClick={() => setLearnEnabled(!learnEnabled)} style={{ width: 50, height: 30, borderRadius: 15, background: learnEnabled ? '#5B5CE2' : '#D0D0E0', border: 'none', cursor: 'pointer', position: 'relative', flexShrink: 0, transition: 'background 0.2s' }}>
                <span style={{ position: 'absolute', top: 3, left: learnEnabled ? 23 : 3, width: 24, height: 24, borderRadius: 12, background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.18)', transition: 'left 0.2s' }} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <BottomSheet isOpen={editId !== null} onClose={() => setEditId(null)} title="Tercihi Düzenle">
        <div className="px-5 pb-6">
          {editPref && (
            <>
              <div style={{ background: '#F8F8FC', borderRadius: 12, padding: '12px 14px', marginBottom: 20, border: '1px solid #E8E8F0' }}>
                <p style={{ fontSize: 14, color: '#0F0F1A', lineHeight: 1.4 }}>{editPref.text}</p>
              </div>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#A0A0B2', letterSpacing: '0.05em', marginBottom: 10 }}>ÖNCELİK</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
                {(['high', 'normal', 'low'] as const).map(p => {
                  const pl = priorityLabels[p]
                  return (
                    <button
                      key={p}
                      onClick={() => setEditPriority(p)}
                      style={{ padding: '12px 16px', borderRadius: 12, background: editPriority === p ? pl.bg : '#F8F8FC', border: editPriority === p ? `1.5px solid ${pl.color}` : '1.5px solid #E8E8F0', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}
                    >
                      <div style={{ width: 16, height: 16, borderRadius: 8, border: `2px solid ${editPriority === p ? pl.color : '#D0D0E0'}`, background: editPriority === p ? pl.color : 'transparent' }} />
                      <span style={{ fontSize: 14, fontWeight: 600, color: editPriority === p ? pl.color : '#0F0F1A' }}>{pl.label}</span>
                    </button>
                  )
                })}
              </div>
              <button onClick={saveEdit} style={{ width: '100%', padding: '14px', borderRadius: 14, background: 'linear-gradient(135deg, #5B5CE2, #4647C7)', border: 'none', cursor: 'pointer', fontSize: 15, fontWeight: 700, color: '#fff' }}>
                Kaydet
              </button>
            </>
          )}
        </div>
      </BottomSheet>
    </div>
  )
}
