import { useState } from 'react'
import PageHeader from '../../components/layout/PageHeader'
import BottomSheet from '../../components/layout/BottomSheet'
import { mockApprovals } from '../../data/mock'

const typeIcons: Record<string, string> = {
  'send-email': '✉️',
  'create-event': '📅',
  'move-event': '🔄',
  'create-task': '✅',
  'set-reminder': '🔔',
}

export default function ApprovalCenter() {
  const [items, setItems] = useState(mockApprovals)
  const [approved, setApproved] = useState<string[]>([])
  const [rejected, setRejected] = useState<string[]>([])
  const [editItem, setEditItem] = useState<string | null>(null)
  const [editNote, setEditNote] = useState('')

  function approve(id: string) {
    setApproved(prev => [...prev, id])
    setTimeout(() => setItems(prev => prev.filter(i => i.id !== id)), 600)
  }

  function reject(id: string) {
    setRejected(prev => [...prev, id])
    setTimeout(() => setItems(prev => prev.filter(i => i.id !== id)), 600)
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: '#F8F8FC' }}>
      <PageHeader title="Onay Bekleyenler" showBack />

      <div className="flex-1 mobile-scroll px-5 pt-4 pb-6">
        {items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
            <p style={{ fontSize: 18, fontWeight: 700, color: '#0F0F1A', letterSpacing: '-0.02em', marginBottom: 6 }}>Tüm işlemler onaylandı!</p>
            <p style={{ fontSize: 14, color: '#A0A0B2' }}>Bekleyen AI işlemi yok.</p>
          </div>
        ) : (
          <>
            <p style={{ fontSize: 13, color: '#6B6B80', marginBottom: 16, lineHeight: 1.5 }}>
              AI bu işlemleri yapmak istiyor. Onayın olmadan gerçekleştirmeyecek.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {items.map((item, i) => (
                <div
                  key={item.id}
                  className="animate-fade-in"
                  style={{
                    background: '#fff', borderRadius: 18, padding: 16,
                    boxShadow: '0 1px 4px rgba(15,15,26,0.06)',
                    animationDelay: `${i * 60}ms`, opacity: 0,
                  }}
                >
                  {/* Type badge */}
                  <div className="flex items-center gap-2 mb-3">
                    <span style={{ fontSize: 20 }}>{typeIcons[item.type]}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#5B5CE2', background: '#EEEEFF', borderRadius: 6, padding: '2px 8px', letterSpacing: '0.04em' }}>
                      {item.action.toUpperCase()}
                    </span>
                  </div>

                  {/* What */}
                  <div style={{ marginBottom: 10 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: '#A0A0B2', letterSpacing: '0.04em', marginBottom: 3 }}>NE YAPILACAK</p>
                    <p style={{ fontSize: 14, fontWeight: 600, color: '#0F0F1A', lineHeight: 1.4 }}>{item.what}</p>
                  </div>

                  {/* Why */}
                  <div style={{ marginBottom: 10 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: '#A0A0B2', letterSpacing: '0.04em', marginBottom: 3 }}>NEDEN</p>
                    <p style={{ fontSize: 13, color: '#6B6B80', lineHeight: 1.4 }}>{item.why}</p>
                  </div>

                  {/* Change */}
                  <div style={{ background: '#F8F8FC', borderRadius: 10, padding: '10px 12px', marginBottom: 12, border: '1px solid #F2F2F8' }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: '#A0A0B2', letterSpacing: '0.04em', marginBottom: 3 }}>DEĞİŞİKLİK</p>
                    <p style={{ fontSize: 13, color: '#0F0F1A', lineHeight: 1.4, fontStyle: 'italic' }}>{item.change}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => approve(item.id)}
                      style={{ flex: 2, padding: '11px', background: 'linear-gradient(135deg, #5B5CE2 0%, #4647C7 100%)', border: 'none', borderRadius: 12, cursor: 'pointer', fontSize: 14, fontWeight: 700, color: '#fff', boxShadow: '0 3px 10px rgba(91,92,226,0.25)' }}
                    >
                      Onayla
                    </button>
                    <button onClick={() => { setEditItem(item.id); setEditNote(item.action) }} style={{ flex: 1, padding: '11px', background: '#F8F8FC', border: '1px solid #E8E8F0', borderRadius: 12, cursor: 'pointer', fontSize: 13, fontWeight: 600, color: '#6B6B80' }}>
                      Düzenle
                    </button>
                    <button
                      onClick={() => reject(item.id)}
                      style={{ flex: 1, padding: '11px', background: '#FFEEED', border: 'none', borderRadius: 12, cursor: 'pointer', fontSize: 13, fontWeight: 600, color: '#C0251B' }}
                    >
                      Reddet
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <BottomSheet isOpen={editItem !== null} onClose={() => setEditItem(null)} title="Eylemi Düzenle">
        <div className="px-5 pb-6">
          <p style={{ fontSize: 13, color: '#6B6B80', marginBottom: 12 }}>AI'nın yapacağı eylemi düzenle:</p>
          <textarea
            value={editNote}
            onChange={e => setEditNote(e.target.value)}
            style={{ width: '100%', minHeight: 100, padding: '12px', borderRadius: 12, border: '1.5px solid #E8E8F0', fontSize: 14, color: '#0F0F1A', background: '#F8F8FC', outline: 'none', resize: 'none', fontFamily: 'Inter, sans-serif', boxSizing: 'border-box' }}
          />
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <button onClick={() => setEditItem(null)} style={{ flex: 1, padding: '13px', borderRadius: 14, background: '#F1F1F8', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: '#6B6B80' }}>
              İptal
            </button>
            <button onClick={() => { if (editItem) approve(editItem); setEditItem(null) }} style={{ flex: 2, padding: '13px', borderRadius: 14, background: 'linear-gradient(135deg, #5B5CE2, #4647C7)', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 700, color: '#fff' }}>
              Kaydet ve Onayla
            </button>
          </div>
        </div>
      </BottomSheet>
    </div>
  )
}
