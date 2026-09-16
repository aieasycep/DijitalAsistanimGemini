import { useState } from 'react'
import PageHeader from '../../components/layout/PageHeader'
import { useNavigation } from '../../context/NavigationContext'
import { mockEmails } from '../../data/mock'

const categories = [
  { key: 'important', label: 'Önemli', count: 3, color: '#FFEEED', textColor: '#C0251B', icon: '⭐' },
  { key: 'awaiting-reply', label: 'Cevap Bekleyen', count: 2, color: '#FFF4E0', textColor: '#8C5200', icon: '✉️' },
  { key: 'my-awaiting', label: 'Cevap Beklediğin', count: 3, color: '#F0ECFF', textColor: '#5B21B6', icon: '⏳' },
  { key: 'deadline', label: 'Son Tarih İçeren', count: 2, color: '#FFEEED', textColor: '#C0251B', icon: '⏰' },
  { key: 'info', label: 'Bilgilendirme', count: 18, color: '#E5F2FF', textColor: '#0051A8', icon: 'ℹ️' },
  { key: 'low', label: 'Düşük Öncelik', count: 56, color: '#F1F1F8', textColor: '#A0A0B2', icon: '📬' },
]

export default function MailIntelligence() {
  const { navigate } = useNavigation()
  const [selectedCat, setSelectedCat] = useState<string | null>(null)

  const filteredEmails = selectedCat
    ? mockEmails.filter(e => e.category === selectedCat)
    : mockEmails.filter(e => e.priority === 'critical' || e.category === 'awaiting-reply')

  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: '#F8F8FC' }}>
      <PageHeader title="Mail Özeti" showBack />

      {/* Stats hero */}
      <div className="px-5 py-4 flex-shrink-0" style={{ background: '#fff', borderBottom: '1px solid #F2F2F8' }}>
        <div className="flex items-baseline gap-2 mb-1">
          <span style={{ fontSize: 32, fontWeight: 800, color: '#0F0F1A', letterSpacing: '-0.04em' }}>83</span>
          <span style={{ fontSize: 15, color: '#6B6B80' }}>mail bugün</span>
        </div>
        <p style={{ fontSize: 14, color: '#5B5CE2', fontWeight: 600 }}>6 tanesi dikkat gerektiriyor.</p>
      </div>

      <div className="flex-1 mobile-scroll pb-4">
        {/* Categories */}
        <div className="px-5 pt-4 pb-2">
          <h2 style={{ fontSize: 13, fontWeight: 700, color: '#A0A0B2', letterSpacing: '0.04em', marginBottom: 10 }}>KATEGORİLER</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {categories.map(cat => (
              <button
                key={cat.key}
                onClick={() => {
                  if (cat.key === 'awaiting-reply') { navigate('smart-followup'); return }
                  if (cat.key === 'my-awaiting') { navigate('waiting-reply'); return }
                  setSelectedCat(selectedCat === cat.key ? null : cat.key)
                }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  background: selectedCat === cat.key ? cat.color : '#fff',
                  borderRadius: 12, padding: '11px 14px',
                  border: selectedCat === cat.key ? `1.5px solid ${cat.textColor}20` : '1px solid #F2F2F8',
                  cursor: 'pointer', textAlign: 'left',
                  transition: 'all 0.15s',
                }}
              >
                <span style={{ fontSize: 18, width: 28 }}>{cat.icon}</span>
                <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: '#0F0F1A', letterSpacing: '-0.01em' }}>{cat.label}</span>
                <span style={{
                  fontSize: 12, fontWeight: 700,
                  color: cat.textColor,
                  background: cat.color,
                  borderRadius: 8, padding: '2px 8px',
                }}>
                  {cat.count}
                </span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ opacity: 0.4 }}>
                  <path d="M5 3l4 4-4 4" stroke="#0F0F1A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* Email list */}
        <div className="px-5 pt-2">
          <h2 style={{ fontSize: 13, fontWeight: 700, color: '#A0A0B2', letterSpacing: '0.04em', marginBottom: 10 }}>
            {selectedCat ? categories.find(c => c.key === selectedCat)?.label.toUpperCase() : 'ÖNE ÇIKANLAR'}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {filteredEmails.map(email => (
              <div
                key={email.id}
                className="card-press"
                onClick={() => navigate('email-detail')}
                style={{ background: '#fff', borderRadius: 14, padding: '12px 14px', boxShadow: '0 1px 3px rgba(15,15,26,0.05)' }}
              >
                <div className="flex items-start gap-3">
                  <div style={{
                    width: 36, height: 36, borderRadius: 18,
                    background: email.priority === 'critical' ? '#FFEEED' : '#F1F1F8',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, fontWeight: 700, color: email.priority === 'critical' ? '#C0251B' : '#6B6B80',
                    flexShrink: 0,
                  }}>
                    {email.senderInitials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <span style={{ fontSize: 13, fontWeight: 600, color: '#0F0F1A' }}>{email.sender}</span>
                      <span style={{ fontSize: 11, color: '#A0A0B2' }}>{email.time}</span>
                    </div>
                    <p style={{ fontSize: 13, fontWeight: email.isRead ? 400 : 600, color: email.isRead ? '#6B6B80' : '#0F0F1A', marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {email.subject}
                    </p>
                    <p style={{ fontSize: 12, color: '#A0A0B2', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {email.aiSummary}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
