import { useState } from 'react'
import PageHeader from '../../components/layout/PageHeader'
import Avatar from '../../components/ui/Avatar'
import SmartReminderSheet from '../../components/ui/SmartReminderSheet'
import { useNavigation } from '../../context/NavigationContext'
import { mockWaitingReplies } from '../../data/mock'

const urgencyLabel = { acil: 'Acil', bugun: 'Bugün', yakinda: 'Yakında' }
const urgencyColor = {
  acil: { bg: '#FFEEED', color: '#C0251B' },
  bugun: { bg: '#FFF4E0', color: '#8C5200' },
  yakinda: { bg: '#E5F2FF', color: '#0051A8' },
}

export default function WaitingReply() {
  const { navigate } = useNavigation()
  const [showReminder, setShowReminder] = useState(false)
  const [reminderContext, setReminderContext] = useState('')

  const grouped = {
    acil: mockWaitingReplies.filter(r => r.urgency === 'acil'),
    bugun: mockWaitingReplies.filter(r => r.urgency === 'bugun'),
    yakinda: mockWaitingReplies.filter(r => r.urgency === 'yakinda'),
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: '#F8F8FC' }}>
      <PageHeader title="Senden Beklenenler" showBack />

      <div className="flex-1 mobile-scroll px-5 pt-4 pb-4">
        {(Object.keys(grouped) as Array<keyof typeof grouped>).map(urgency => {
          const items = grouped[urgency]
          if (items.length === 0) return null
          const uc = urgencyColor[urgency]
          return (
            <div key={urgency} className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.05em', color: uc.color, background: uc.bg, padding: '2px 8px', borderRadius: 6 }}>
                  {urgencyLabel[urgency].toUpperCase()}
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {items.map(item => (
                  <div key={item.id} style={{ background: '#fff', borderRadius: 14, padding: '14px', boxShadow: '0 1px 3px rgba(15,15,26,0.05)' }}>
                    <div className="flex items-center gap-3 mb-2">
                      <Avatar initials={item.initials} size={36} />
                      <div className="flex-1">
                        <p style={{ fontSize: 14, fontWeight: 600, color: '#0F0F1A' }}>{item.person}</p>
                        <p style={{ fontSize: 12, color: '#6B6B80' }}>{item.topic}</p>
                      </div>
                      <span style={{ fontSize: 11, color: '#A0A0B2' }}>
                        {item.waitingHours < 24 ? `${item.waitingHours} sa` : `${Math.floor(item.waitingHours/24)} gün`}
                      </span>
                    </div>
                    <p style={{ fontSize: 13, color: '#0F0F1A', lineHeight: 1.45, marginBottom: 10 }}>{item.expectation}</p>
                    <div className="flex items-center gap-2">
                      <span style={{ flex: 1, fontSize: 11, color: uc.color, fontWeight: 600 }}>Son: {item.deadline}</span>
                      <button
                        onClick={() => navigate('email-detail')}
                        style={{ fontSize: 11, fontWeight: 600, color: '#6B6B80', background: '#F1F1F8', border: 'none', borderRadius: 8, padding: '5px 10px', cursor: 'pointer' }}
                      >
                        Maili Aç
                      </button>
                      <button
                        onClick={() => navigate('ai-draft-reply')}
                        style={{ fontSize: 11, fontWeight: 600, color: '#5B5CE2', background: '#EEEEFF', border: 'none', borderRadius: 8, padding: '5px 10px', cursor: 'pointer' }}
                      >
                        Yanıtla
                      </button>
                      <button
                        onClick={() => { setReminderContext(`${item.person} — ${item.topic}`); setShowReminder(true) }}
                        style={{ fontSize: 11, fontWeight: 600, color: '#A0A0B2', background: '#F1F1F8', border: 'none', borderRadius: 8, padding: '5px 10px', cursor: 'pointer' }}
                      >
                        🔔
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      <SmartReminderSheet
        isOpen={showReminder}
        onClose={() => setShowReminder(false)}
        context={reminderContext}
      />
    </div>
  )
}
