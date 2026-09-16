import { useState } from 'react'
import PageHeader from '../../components/layout/PageHeader'

interface Permission {
  id: string
  label: string
  enabled: boolean
}

interface Source {
  id: string
  name: string
  icon: string
  account: string
  permissions: Permission[]
}

const initialSources: Source[] = [
  {
    id: 'gmail', name: 'Gmail', icon: '📧', account: 'yunus@gmail.com',
    permissions: [
      { id: 'read', label: 'Mailleri oku', enabled: true },
      { id: 'attachments', label: 'Ekleri analiz et', enabled: true },
      { id: 'deadlines', label: 'Son tarihleri tespit et', enabled: true },
      { id: 'draft', label: 'Taslak cevap hazırla', enabled: true },
    ],
  },
  {
    id: 'gcal', name: 'Google Takvim', icon: '📅', account: 'yunus@gmail.com',
    permissions: [
      { id: 'read', label: 'Etkinlikleri oku', enabled: true },
      { id: 'suggest', label: 'Program öner', enabled: true },
      { id: 'create', label: 'Onayınla etkinlik oluştur', enabled: true },
    ],
  },
]

export default function DataSourceControl() {
  const [sources, setSources] = useState(initialSources)

  function toggle(sourceId: string, permId: string) {
    setSources(prev => prev.map(s =>
      s.id === sourceId
        ? { ...s, permissions: s.permissions.map(p => p.id === permId ? { ...p, enabled: !p.enabled } : p) }
        : s
    ))
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: '#F8F8FC' }}>
      <PageHeader title="Veri Kaynağı Kontrolü" showBack />

      <div className="flex-1 mobile-scroll px-5 pt-4 pb-6">
        <p style={{ fontSize: 13, color: '#6B6B80', marginBottom: 20, lineHeight: 1.5 }}>
          Her kaynak için hangi işlemlere izin verdiğini ayrı ayrı yönet.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {sources.map(source => (
            <div key={source.id} style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 4px rgba(15,15,26,0.05)' }}>
              {/* Source header */}
              <div style={{ padding: '14px 16px', background: '#F8F8FC', borderBottom: '1px solid #F2F2F8', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 20 }}>{source.icon}</span>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#0F0F1A' }}>{source.name}</p>
                  <p style={{ fontSize: 11, color: '#A0A0B2' }}>{source.account}</p>
                </div>
              </div>

              {/* Permissions */}
              {source.permissions.map((perm, i) => (
                <div key={perm.id} style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', borderBottom: i < source.permissions.length - 1 ? '1px solid #F2F2F8' : 'none' }}>
                  <span style={{ flex: 1, fontSize: 14, color: '#0F0F1A' }}>{perm.label}</span>
                  <button
                    onClick={() => toggle(source.id, perm.id)}
                    style={{
                      width: 46, height: 28, borderRadius: 14,
                      background: perm.enabled ? '#5B5CE2' : '#E0E0EA',
                      border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.25s', flexShrink: 0,
                    }}
                  >
                    <span style={{
                      position: 'absolute', top: 2, left: perm.enabled ? 20 : 2, width: 24, height: 24, borderRadius: 12,
                      background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.18)', transition: 'left 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    }} />
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
