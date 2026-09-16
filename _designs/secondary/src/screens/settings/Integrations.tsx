import { useState } from 'react'
import PageHeader from '../../components/layout/PageHeader'

const services = [
  { id: 'gmail', label: 'Gmail', icon: '📧', account: 'yunus@gmail.com', connected: true },
  { id: 'outlook', label: 'Outlook', icon: '📨', account: null, connected: false },
  { id: 'gcal', label: 'Google Takvim', icon: '📅', account: 'yunus@gmail.com', connected: true },
  { id: 'mcal', label: 'Microsoft Takvim', icon: '📆', account: null, connected: false },
  { id: 'acal', label: 'Apple Takvim', icon: '🗓️', account: null, connected: false },
  { id: 'gtasks', label: 'Google Tasks', icon: '✅', account: 'yunus@gmail.com', connected: true },
  { id: 'todo', label: 'Microsoft To Do', icon: '📋', account: null, connected: false },
  { id: 'areminders', label: 'Apple Reminders', icon: '🔔', account: null, connected: false },
]

export default function Integrations() {
  const [items, setItems] = useState(services)

  function toggle(id: string) {
    setItems(prev => prev.map(s => s.id === id ? { ...s, connected: !s.connected, account: !s.connected ? 'yunus@example.com' : null } : s))
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: '#F8F8FC' }}>
      <PageHeader title="Entegrasyonlar" showBack />

      <div className="flex-1 mobile-scroll px-5 pt-4 pb-6">
        <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 4px rgba(15,15,26,0.05)' }}>
          {items.map((item, i) => (
            <div
              key={item.id}
              style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px',
                borderBottom: i < items.length - 1 ? '1px solid #F2F2F8' : 'none',
              }}
            >
              <span style={{ fontSize: 22, width: 32 }}>{item.icon}</span>
              <div className="flex-1">
                <p style={{ fontSize: 14, fontWeight: 600, color: '#0F0F1A' }}>{item.label}</p>
                {item.connected && item.account && (
                  <p style={{ fontSize: 12, color: '#A0A0B2' }}>{item.account}</p>
                )}
              </div>
              {item.connected ? (
                <div className="flex items-center gap-2">
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#1A7A33', background: '#E8F8EE', borderRadius: 6, padding: '2px 7px' }}>Bağlı</span>
                  <button onClick={() => toggle(item.id)} style={{ fontSize: 11, color: '#C0251B', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>Kaldır</button>
                </div>
              ) : (
                <button
                  onClick={() => toggle(item.id)}
                  style={{ fontSize: 12, fontWeight: 700, color: '#5B5CE2', background: '#EEEEFF', border: 'none', borderRadius: 8, padding: '6px 14px', cursor: 'pointer' }}
                >
                  Bağla
                </button>
              )}
            </div>
          ))}
        </div>

        <p style={{ fontSize: 12, color: '#A0A0B2', textAlign: 'center', marginTop: 16, lineHeight: 1.5 }}>
          Tüm bağlantılar OAuth ile güvenli şekilde yapılır. İstediğin zaman kaldırabilirsin.
        </p>
      </div>
    </div>
  )
}
