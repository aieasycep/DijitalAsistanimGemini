import PageHeader from '../../components/layout/PageHeader'
import Avatar from '../../components/ui/Avatar'
import { mockPeople } from '../../data/mock'

export default function PersonIntelligence() {
  const person = mockPeople[0]

  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: '#F8F8FC' }}>
      <PageHeader showBack />

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #5B5CE2 0%, #4647C7 100%)', padding: '12px 20px 24px' }}>
        <div className="flex items-center gap-14 mb-3">
          <div style={{ width: 60, height: 60, borderRadius: 30, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 700, color: '#fff' }}>
            {person.initials}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 style={{ fontSize: 20, fontWeight: 800, color: '#fff', letterSpacing: '-0.03em' }}>{person.name}</h2>
              {person.isVip && <span style={{ fontSize: 14 }}>⭐</span>}
            </div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>{person.role}</p>
          </div>
        </div>

        <div className="flex gap-4">
          {[
            { label: 'Son İletişim', value: person.lastContact },
            { label: 'Açık Konu', value: `${person.openLoops}` },
            { label: 'Yaklaşan', value: person.upcomingMeeting || 'Yok' },
          ].map(stat => (
            <div key={stat.label} style={{ flex: 1 }}>
              <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', fontWeight: 600, letterSpacing: '0.03em', marginBottom: 2 }}>{stat.label.toUpperCase()}</p>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 mobile-scroll px-5 pt-4 pb-6">
        {/* Open loops */}
        <div className="mb-4">
          <p style={{ fontSize: 11, fontWeight: 700, color: '#A0A0B2', letterSpacing: '0.04em', marginBottom: 10 }}>AÇIK KONULAR</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { text: 'Revize teklif gönderilmedi', urgency: 'acil' },
              { text: 'Toplantı notu paylaşılmadı', urgency: 'normal' },
            ].map(loop => (
              <div key={loop.text} style={{ background: '#fff', borderRadius: 12, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 1px 3px rgba(15,15,26,0.04)' }}>
                <div style={{ width: 8, height: 8, borderRadius: 4, background: loop.urgency === 'acil' ? '#FF3B30' : '#FF9F0A', flexShrink: 0 }} />
                <span style={{ fontSize: 14, color: '#0F0F1A' }}>{loop.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent conversations */}
        <div className="mb-4">
          <p style={{ fontSize: 11, fontWeight: 700, color: '#A0A0B2', letterSpacing: '0.04em', marginBottom: 10 }}>SON KONUŞULAN KONULAR</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {['Fiyat teklifi tartışması', 'Toplantı programı', 'Proje teslim tarihi'].map((topic, i) => (
              <div key={topic} style={{ background: '#fff', borderRadius: 10, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 1px 3px rgba(15,15,26,0.04)' }}>
                <span style={{ fontSize: 14 }}>💬</span>
                <span style={{ fontSize: 13, color: '#0F0F1A', flex: 1 }}>{topic}</span>
                <span style={{ fontSize: 11, color: '#A0A0B2' }}>{['Bugün', '2 gün', '1 hafta'][i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Ask about person */}
        <div style={{ background: '#EEEEFF', borderRadius: 14, padding: '12px 14px', border: '1px solid rgba(91,92,226,0.15)' }}>
          <p style={{ fontSize: 13, color: '#5B5CE2', fontWeight: 600, marginBottom: 4 }}>✨ AI'ya sor</p>
          <input placeholder="Mehmet hakkında sor…" style={{
            width: '100%', background: 'transparent', border: 'none', outline: 'none',
            fontSize: 14, color: '#0F0F1A', letterSpacing: '-0.01em',
          }} />
        </div>
      </div>
    </div>
  )
}
