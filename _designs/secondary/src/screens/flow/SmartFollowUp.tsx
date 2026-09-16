import { useState } from 'react'
import PageHeader from '../../components/layout/PageHeader'
import Avatar from '../../components/ui/Avatar'
import SmartReminderSheet from '../../components/ui/SmartReminderSheet'
import { useNavigation } from '../../context/NavigationContext'
import { mockFollowUps } from '../../data/mock'

export default function SmartFollowUp() {
  const { navigate } = useNavigation()
  const [showReminder, setShowReminder] = useState(false)
  const [reminderContext, setReminderContext] = useState('')
  const [closedIds, setClosedIds] = useState<string[]>([])
  const [closingId, setClosingId] = useState<string | null>(null)

  function handleClose(id: string) {
    setClosingId(id)
    setTimeout(() => {
      setClosedIds(prev => [...prev, id])
      setClosingId(null)
    }, 400)
  }

  const visible = mockFollowUps.filter(f => !closedIds.includes(f.id))

  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: '#F8F8FC' }}>
      <PageHeader title="Takip Etmen Gerekenler" showBack />

      <div className="flex-1 mobile-scroll px-5 pt-4 pb-4">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {visible.map((item, i) => (
            <div
              key={item.id}
              className="animate-fade-in"
              style={{
                background: '#fff', borderRadius: 16, padding: 16,
                boxShadow: '0 1px 4px rgba(15,15,26,0.06)',
                animationDelay: `${i * 60}ms`, opacity: closingId === item.id ? 0 : undefined,
                transition: closingId === item.id ? 'opacity 0.35s' : undefined,
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <Avatar initials={item.initials} size={40} />
                <div className="flex-1">
                  <p style={{ fontSize: 15, fontWeight: 700, color: '#0F0F1A', letterSpacing: '-0.01em' }}>{item.person}</p>
                  <p style={{ fontSize: 12, color: '#A0A0B2' }}>Konu: {item.topic}</p>
                </div>
                <div style={{
                  background: item.daysWaiting > 5 ? '#FFEEED' : '#FFF4E0',
                  borderRadius: 8, padding: '3px 8px',
                }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: item.daysWaiting > 5 ? '#C0251B' : '#8C5200' }}>
                    {item.daysWaiting} gün önce
                  </span>
                </div>
              </div>

              <div style={{ background: '#F8F8FC', borderRadius: 10, padding: '10px 12px', marginBottom: 12 }}>
                <p style={{ fontSize: 13, color: '#6B6B80' }}>{item.status}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => navigate('ai-draft-reply')}
                  style={{ flex: 2, fontSize: 11, fontWeight: 600, padding: '7px 0', background: '#EEEEFF', color: '#5B5CE2', border: 'none', borderRadius: 8, cursor: 'pointer' }}
                >
                  Takip Mesajı Hazırla
                </button>
                <button
                  onClick={() => { setReminderContext(`${item.person} — ${item.topic}`); setShowReminder(true) }}
                  style={{ flex: 1, fontSize: 11, fontWeight: 600, padding: '7px 0', background: '#F1F1F8', color: '#6B6B80', border: 'none', borderRadius: 8, cursor: 'pointer' }}
                >
                  Hatırlat
                </button>
                <button
                  onClick={() => handleClose(item.id)}
                  style={{ flex: 1, fontSize: 11, fontWeight: 600, padding: '7px 0', background: '#F1F1F8', color: '#6B6B80', border: 'none', borderRadius: 8, cursor: 'pointer' }}
                >
                  Kapat
                </button>
              </div>
            </div>
          ))}

          {visible.length === 0 && (
            <div className="flex flex-col items-center" style={{ paddingTop: 60 }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
              <p style={{ fontSize: 17, fontWeight: 700, color: '#0F0F1A', marginBottom: 6 }}>Hepsi tamam!</p>
              <p style={{ fontSize: 14, color: '#A0A0B2' }}>Takip edilecek konu yok.</p>
            </div>
          )}
        </div>
      </div>

      <SmartReminderSheet
        isOpen={showReminder}
        onClose={() => setShowReminder(false)}
        context={reminderContext}
      />
    </div>
  )
}
