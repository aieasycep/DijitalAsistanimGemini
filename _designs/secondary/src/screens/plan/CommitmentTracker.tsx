import { useState } from 'react'
import PageHeader from '../../components/layout/PageHeader'
import BottomSheet from '../../components/layout/BottomSheet'
import { useNavigation } from '../../context/NavigationContext'
import { mockCommitments } from '../../data/mock'

const statusConfig = {
  pending: { label: 'Bekliyor', bg: '#FFF4E0', color: '#8C5200' },
  done: { label: 'Tamamlandı', bg: '#E8F8EE', color: '#1A7A33' },
  overdue: { label: 'Gecikti', bg: '#FFEEED', color: '#C0251B' },
}

export default function CommitmentTracker() {
  const { navigate } = useNavigation()
  const [items, setItems] = useState(mockCommitments)
  const [erteleItem, setErteleItem] = useState<string | null>(null)
  const [rescheduleDate, setRescheduleDate] = useState('')
  const [rescheduled, setRescheduled] = useState(false)

  function markDone(id: string) {
    setItems(prev => prev.map(i => i.id === id ? { ...i, status: 'done' as const } : i))
  }

  function confirmReschedule() {
    setRescheduled(true)
    setTimeout(() => {
      setItems(prev => prev.map(i => i.id === erteleItem ? { ...i, date: rescheduleDate || 'Yarın', status: 'pending' as const } : i))
      setRescheduled(false)
      setErteleItem(null)
      setRescheduleDate('')
    }, 1400)
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: '#F8F8FC' }}>
      <PageHeader title="Taahhütler" showBack />

      <div className="px-5 py-3 flex-shrink-0" style={{ background: '#fff', borderBottom: '1px solid #F2F2F8' }}>
        <p style={{ fontSize: 13, color: '#6B6B80' }}>
          AI e-postalarından tespit ettiği {items.filter(i => i.status !== 'done').length} açık taahhüt var.
        </p>
      </div>

      <div className="flex-1 mobile-scroll px-5 pt-4 pb-4">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {items.map((item, i) => {
            const sc = statusConfig[item.status]
            return (
              <div key={item.id} className="animate-fade-in" style={{ background: '#fff', borderRadius: 16, padding: 16, boxShadow: '0 1px 4px rgba(15,15,26,0.06)', animationDelay: `${i*50}ms`, opacity: 0 }}>
                <div className="flex items-start justify-between mb-2">
                  <p style={{ fontSize: 14, fontWeight: 600, color: '#0F0F1A', flex: 1, lineHeight: 1.4, letterSpacing: '-0.01em' }}>
                    "{item.commitment}"
                  </p>
                  <span style={{ fontSize: 10, fontWeight: 700, color: sc.color, background: sc.bg, borderRadius: 6, padding: '2px 7px', marginLeft: 8, whiteSpace: 'nowrap' }}>
                    {sc.label}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
                  <div>
                    <span style={{ fontSize: 10, color: '#A0A0B2', fontWeight: 600, letterSpacing: '0.04em' }}>KİME</span>
                    <p style={{ fontSize: 12, color: '#0F0F1A', fontWeight: 500 }}>{item.to}</p>
                  </div>
                  <div>
                    <span style={{ fontSize: 10, color: '#A0A0B2', fontWeight: 600, letterSpacing: '0.04em' }}>TARİH</span>
                    <p style={{ fontSize: 12, color: item.status === 'overdue' ? '#C0251B' : '#0F0F1A', fontWeight: 500 }}>{item.date}</p>
                  </div>
                </div>

                <div style={{ fontSize: 11, color: '#A0A0B2', marginBottom: 12 }}>Kaynak: {item.source}</div>

                {item.status !== 'done' && (
                  <div className="flex gap-2">
                    <button onClick={() => markDone(item.id)} style={{ flex: 2, fontSize: 12, fontWeight: 600, color: '#1A7A33', background: '#E8F8EE', border: 'none', borderRadius: 8, padding: '7px', cursor: 'pointer' }}>
                      Tamamlandı
                    </button>
                    <button onClick={() => setErteleItem(item.id)} style={{ flex: 1, fontSize: 12, fontWeight: 600, color: '#8C5200', background: '#FFF4E0', border: 'none', borderRadius: 8, padding: '7px', cursor: 'pointer' }}>
                      Ertele
                    </button>
                    <button onClick={() => navigate('email-detail')} style={{ flex: 1, fontSize: 12, fontWeight: 600, color: '#6B6B80', background: '#F1F1F8', border: 'none', borderRadius: 8, padding: '7px', cursor: 'pointer' }}>
                      Kaynağı Gör
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Reschedule Sheet */}
      <BottomSheet isOpen={erteleItem !== null} onClose={() => setErteleItem(null)} title="Ertele">
        <div className="px-5 pb-5">
          {rescheduled ? (
            <div className="flex flex-col items-center py-8">
              <div style={{ width: 64, height: 64, borderRadius: 32, background: '#E8F8EE', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12, fontSize: 28 }}>✅</div>
              <p style={{ fontSize: 15, fontWeight: 700, color: '#0F0F1A' }}>Ertelendi</p>
            </div>
          ) : (
            <>
              <p style={{ fontSize: 14, color: '#6B6B80', marginBottom: 16 }}>Yeni bir tarih seç:</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
                {['Yarın', '2 gün sonra', 'Önümüzdeki hafta', 'Özel tarih'].map((opt, idx) => (
                  <button
                    key={opt}
                    onClick={() => idx < 3 ? setRescheduleDate(opt) : undefined}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: 12, background: rescheduleDate === opt ? '#EEEEFF' : '#F8F8FC', border: rescheduleDate === opt ? '1.5px solid rgba(91,92,226,0.4)' : '1.5px solid #E8E8F0', cursor: 'pointer', textAlign: 'left', fontSize: 14, color: '#0F0F1A', fontWeight: 500 }}
                  >
                    {opt}
                  </button>
                ))}
                <input
                  type="date"
                  value={rescheduleDate.includes('-') ? rescheduleDate : ''}
                  onChange={e => setRescheduleDate(e.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: 12, border: '1.5px solid #E8E8F0', fontSize: 14, color: '#0F0F1A', background: '#fff', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
              <button
                onClick={confirmReschedule}
                disabled={!rescheduleDate}
                style={{ width: '100%', padding: '14px', borderRadius: 14, background: rescheduleDate ? 'linear-gradient(135deg, #5B5CE2 0%, #4647C7 100%)' : '#E8E8F0', border: 'none', cursor: rescheduleDate ? 'pointer' : 'not-allowed', fontSize: 15, fontWeight: 700, color: rescheduleDate ? '#fff' : '#A0A0B2' }}
              >
                Kaydet
              </button>
            </>
          )}
        </div>
      </BottomSheet>
    </div>
  )
}
