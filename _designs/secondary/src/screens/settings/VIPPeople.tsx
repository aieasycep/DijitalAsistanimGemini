import { useState } from 'react'
import PageHeader from '../../components/layout/PageHeader'
import Avatar from '../../components/ui/Avatar'
import { mockPeople } from '../../data/mock'
import { useNavigation } from '../../context/NavigationContext'

export default function VIPPeople() {
  const { navigate } = useNavigation()
  const [people, setPeople] = useState(mockPeople)
  const vipList = people.filter(p => p.isVip)

  function toggleVip(id: string) {
    setPeople(prev => prev.map(p => p.id === id ? { ...p, isVip: !p.isVip } : p))
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: '#F8F8FC' }}>
      <PageHeader title="VIP Kişiler" showBack />

      <div className="flex-1 mobile-scroll px-5 pt-4 pb-6">
        <div style={{ background: '#FFF4E0', borderRadius: 14, padding: '12px 14px', marginBottom: 20, border: '1px solid rgba(255,159,10,0.2)' }}>
          <p style={{ fontSize: 13, color: '#8C5200', lineHeight: 1.5 }}>
            ⭐ VIP kişilerin mesajları her zaman önce gösterilir.
          </p>
        </div>

        <p style={{ fontSize: 11, fontWeight: 700, color: '#A0A0B2', letterSpacing: '0.05em', marginBottom: 8 }}>
          VIP LİSTEN ({vipList.length} kişi)
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
          {people.map(person => (
            <div key={person.id} onClick={() => navigate('person-intelligence')} style={{ background: '#fff', borderRadius: 14, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 1px 3px rgba(15,15,26,0.04)', cursor: 'pointer' }}>
              <Avatar initials={person.initials} size={40} />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p style={{ fontSize: 14, fontWeight: 600, color: '#0F0F1A' }}>{person.name}</p>
                  {person.isVip && <span style={{ fontSize: 12 }}>⭐</span>}
                </div>
                <p style={{ fontSize: 12, color: '#A0A0B2' }}>{person.role}</p>
              </div>
              <button
                onClick={() => toggleVip(person.id)}
                style={{
                  fontSize: 12, fontWeight: 600, padding: '5px 12px', borderRadius: 8, border: 'none', cursor: 'pointer',
                  background: person.isVip ? '#FFEEED' : '#EEEEFF',
                  color: person.isVip ? '#C0251B' : '#5B5CE2',
                }}
              >
                {person.isVip ? 'Kaldır' : 'VIP Ekle'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
