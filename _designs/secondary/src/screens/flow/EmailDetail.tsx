import { useState } from 'react'
import PageHeader from '../../components/layout/PageHeader'
import SourceTag from '../../components/special/SourceTag'
import SmartReminderSheet from '../../components/ui/SmartReminderSheet'
import BottomSheet from '../../components/layout/BottomSheet'
import { useNavigation } from '../../context/NavigationContext'
import { mockEmails } from '../../data/mock'

export default function EmailDetail() {
  const { navigate } = useNavigation()
  const email = mockEmails[0]
  const [showReminder, setShowReminder] = useState(false)
  const [showTaskSheet, setShowTaskSheet] = useState(false)
  const [taskTitle, setTaskTitle] = useState(email.subject)
  const [taskDate, setTaskDate] = useState('')
  const [taskCreated, setTaskCreated] = useState(false)
  const [showMailHandoff, setShowMailHandoff] = useState(false)

  const actions = [
    { label: 'Yanıt Hazırla', icon: '✍️', primary: true, fn: () => navigate('ai-draft-reply') },
    { label: 'Görev Oluştur', icon: '✅', primary: false, fn: () => setShowTaskSheet(true) },
    { label: 'Takvime Ekle', icon: '📅', primary: false, fn: () => navigate('plan') },
    { label: 'Hatırlat', icon: '🔔', primary: false, fn: () => setShowReminder(true) },
  ]

  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: '#F8F8FC' }}>
      <PageHeader showBack title="Mail Detayı" />

      <div className="flex-1 mobile-scroll pb-4">
        {/* Sender block */}
        <div className="px-5 pt-4 pb-4" style={{ background: '#fff', borderBottom: '1px solid #F2F2F8' }}>
          <div className="flex items-center gap-3 mb-3">
            <div style={{
              width: 44, height: 44, borderRadius: 22,
              background: '#FFEEED',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 15, fontWeight: 700, color: '#C0251B',
            }}>
              {email.senderInitials}
            </div>
            <div>
              <p style={{ fontSize: 15, fontWeight: 700, color: '#0F0F1A' }}>{email.sender}</p>
              <p style={{ fontSize: 12, color: '#A0A0B2' }}>{email.time} · Gmail</p>
            </div>
          </div>
          <h2 style={{ fontSize: 17, fontWeight: 700, color: '#0F0F1A', letterSpacing: '-0.02em', lineHeight: 1.3 }}>
            {email.subject}
          </h2>
        </div>

        {/* AI Summary */}
        <div className="px-5 pt-4">
          <div style={{ background: 'linear-gradient(135deg, #EEEEFF 0%, #E5F2FF 100%)', borderRadius: 16, padding: '16px', marginBottom: 16, border: '1px solid rgba(91,92,226,0.15)' }}>
            <div className="flex items-center gap-2 mb-3">
              <span style={{ fontSize: 16 }}>✨</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#5B5CE2', letterSpacing: '0.04em' }}>AI ÖZETİ</span>
            </div>
            <p style={{ fontSize: 14, color: '#0F0F1A', lineHeight: 1.55, letterSpacing: '-0.01em' }}>
              {email.aiSummary}
            </p>
          </div>

          {/* Key points */}
          <div style={{ marginBottom: 16 }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: '#A0A0B2', letterSpacing: '0.04em', marginBottom: 10 }}>ÖNEMLİ NOKTALAR</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {email.keyPoints.map(kp => (
                <div key={kp} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: '#fff', borderRadius: 10, boxShadow: '0 1px 3px rgba(15,15,26,0.04)' }}>
                  <div style={{ width: 6, height: 6, borderRadius: 3, background: '#5B5CE2', flexShrink: 0 }} />
                  <span style={{ fontSize: 14, color: '#0F0F1A' }}>{kp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Source tag */}
          <div className="mb-4">
            <SourceTag source={`Gmail · ${email.sender} · ${email.time}`} />
          </div>

          <div style={{ height: 1, background: '#F2F2F8', marginBottom: 16 }} />

          {/* Actions */}
          <h3 style={{ fontSize: 13, fontWeight: 700, color: '#A0A0B2', letterSpacing: '0.04em', marginBottom: 10 }}>İŞLEMLER</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
            {actions.map(a => (
              <button
                key={a.label}
                onClick={a.fn}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                  padding: '14px 12px',
                  background: a.primary ? 'linear-gradient(135deg, #5B5CE2 0%, #4647C7 100%)' : '#fff',
                  border: a.primary ? 'none' : '1px solid #E8E8F0',
                  borderRadius: 14, cursor: 'pointer',
                  boxShadow: a.primary ? '0 4px 12px rgba(91,92,226,0.25)' : '0 1px 3px rgba(15,15,26,0.04)',
                }}
              >
                <span style={{ fontSize: 22 }}>{a.icon}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: a.primary ? '#fff' : '#0F0F1A', letterSpacing: '-0.01em' }}>{a.label}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowMailHandoff(true)}
            style={{
              width: '100%', padding: '12px', borderRadius: 12,
              background: '#F1F1F8', border: 'none', cursor: 'pointer',
              fontSize: 14, fontWeight: 600, color: '#6B6B80',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 4l5 4 5-4" stroke="#6B6B80" strokeWidth="1.4" strokeLinecap="round"/>
              <rect x="1" y="3" width="12" height="8" rx="2" stroke="#6B6B80" strokeWidth="1.4" fill="none"/>
            </svg>
            Orijinal Maili Aç
          </button>
        </div>
      </div>

      {/* Mail Handoff Sheet */}
      <BottomSheet isOpen={showMailHandoff} onClose={() => setShowMailHandoff(false)} title="Orijinal Mail">
        <div className="px-5 pb-6 flex flex-col items-center" style={{ textAlign: 'center' }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: '#EA4335', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, marginBottom: 14 }}>✉</div>
          <p style={{ fontSize: 16, fontWeight: 700, color: '#0F0F1A', marginBottom: 8 }}>Gmail'de Açılıyor</p>
          <p style={{ fontSize: 13, color: '#6B6B80', lineHeight: 1.55, marginBottom: 24 }}>Orijinal mail Gmail uygulamasında açılacak. Devam etmek istiyor musun?</p>
          <button onClick={() => setShowMailHandoff(false)} style={{ width: '100%', padding: '14px', borderRadius: 14, background: 'linear-gradient(135deg, #5B5CE2, #4647C7)', border: 'none', cursor: 'pointer', fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 10 }}>
            Gmail&apos;de Aç ↗
          </button>
          <button onClick={() => setShowMailHandoff(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 14, color: '#A0A0B2' }}>
            İptal
          </button>
        </div>
      </BottomSheet>

      {/* Smart Reminder Sheet */}
      <SmartReminderSheet
        isOpen={showReminder}
        onClose={() => setShowReminder(false)}
        context={`${email.sender} — ${email.subject}`}
      />

      {/* Task Create Sheet */}
      <BottomSheet isOpen={showTaskSheet} onClose={() => setShowTaskSheet(false)} title="Görev Oluştur">
        <div className="px-5 pb-5">
          {taskCreated ? (
            <div className="flex flex-col items-center py-8">
              <div style={{ width: 64, height: 64, borderRadius: 32, background: '#E8F8EE', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12, fontSize: 30 }}>✅</div>
              <p style={{ fontSize: 16, fontWeight: 700, color: '#0F0F1A', marginBottom: 4 }}>Görev Oluşturuldu</p>
              <p style={{ fontSize: 13, color: '#6B6B80' }}>{taskTitle}</p>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: 12 }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: '#A0A0B2', marginBottom: 6 }}>GÖREV BAŞLIĞI</p>
                <input
                  value={taskTitle}
                  onChange={e => setTaskTitle(e.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: 12, border: '1.5px solid #E8E8F0', fontSize: 14, color: '#0F0F1A', background: '#fff', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
              <div style={{ marginBottom: 16 }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: '#A0A0B2', marginBottom: 6 }}>SON TARİH</p>
                <input
                  type="date"
                  value={taskDate}
                  onChange={e => setTaskDate(e.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: 12, border: '1.5px solid #E8E8F0', fontSize: 14, color: '#0F0F1A', background: '#fff', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
              <button
                onClick={() => { setTaskCreated(true); setTimeout(() => { setTaskCreated(false); setShowTaskSheet(false) }, 1500) }}
                style={{ width: '100%', padding: '14px', borderRadius: 14, background: 'linear-gradient(135deg, #5B5CE2 0%, #4647C7 100%)', border: 'none', cursor: 'pointer', fontSize: 15, fontWeight: 700, color: '#fff' }}
              >
                Görev Oluştur
              </button>
            </>
          )}
        </div>
      </BottomSheet>
    </div>
  )
}
