import PageHeader from '../../components/layout/PageHeader'
import { weeklyStats } from '../../data/mock'

export default function WeeklyReport() {
  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: '#F8F8FC' }}>
      <PageHeader title="Haftalık Rapor" showBack />

      <div className="flex-1 mobile-scroll pb-6">
        {/* Hero */}
        <div style={{ background: 'linear-gradient(135deg, #0F0F1A 0%, #1A1A2E 100%)', padding: '20px 20px 28px' }}>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>1–7 Eylül 2025</p>
          <h1 style={{ fontSize: 26, fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1.2, marginBottom: 12 }}>
            Haftan Nasıl Geçti?
          </h1>

          <div style={{ background: 'rgba(91,92,226,0.25)', borderRadius: 16, padding: '16px', border: '1px solid rgba(91,92,226,0.3)' }}>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>TAHMİNİ KAZANDIRILAN ZAMAN</p>
            <p style={{ fontSize: 40, fontWeight: 900, color: '#7879F1', letterSpacing: '-0.04em' }}>{weeklyStats.timeSaved}</p>
          </div>
        </div>

        <div className="px-5 pt-5">
          {/* Stats grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
            {[
              { n: weeklyStats.mailsAnalyzed, label: 'mail analiz edildi', icon: '✉️', color: '#EEEEFF' },
              { n: weeklyStats.importantFound, label: 'önemli konu bulundu', icon: '⭐', color: '#FFF4E0' },
              { n: weeklyStats.followupsReminded, label: 'takip hatırlatıldı', icon: '🔔', color: '#E8F8EE' },
              { n: weeklyStats.meetingsTracked, label: 'toplantı takip edildi', icon: '📅', color: '#EEEEFF' },
              { n: weeklyStats.deadlinesCaught, label: 'deadline yakalandı', icon: '⏰', color: '#FFEEED' },
            ].map(stat => (
              <div key={stat.label} style={{ background: '#fff', borderRadius: 16, padding: '16px', boxShadow: '0 1px 4px rgba(15,15,26,0.05)' }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, marginBottom: 8 }}>
                  {stat.icon}
                </div>
                <p style={{ fontSize: 28, fontWeight: 900, color: '#0F0F1A', letterSpacing: '-0.04em', marginBottom: 2 }}>{stat.n}</p>
                <p style={{ fontSize: 12, color: '#A0A0B2', lineHeight: 1.3 }}>{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Stories */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
            <div style={{ background: '#fff', borderRadius: 16, padding: '16px', boxShadow: '0 1px 4px rgba(15,15,26,0.05)' }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: '#A0A0B2', letterSpacing: '0.04em', marginBottom: 6 }}>EN YOĞUN GÜNÜN</p>
              <p style={{ fontSize: 20, fontWeight: 900, color: '#0F0F1A', letterSpacing: '-0.03em' }}>{weeklyStats.busiestDay}</p>
              <p style={{ fontSize: 13, color: '#6B6B80', marginTop: 3 }}>14 mail, 5 toplantı, 3 son tarih</p>
            </div>

            <div style={{ background: '#fff', borderRadius: 16, padding: '16px', boxShadow: '0 1px 4px rgba(15,15,26,0.05)' }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: '#A0A0B2', letterSpacing: '0.04em', marginBottom: 10 }}>EN ÇOK İLETİŞİMDE OLDUĞUN KİŞİLER</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {weeklyStats.topContacts.map((c, i) => {
                  const initials = c.split(' ').map(p => p[0]).join('')
                  return (
                    <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 32, height: 32, borderRadius: 16, background: ['#FFEEED', '#EEEEFF', '#E8F8EE'][i], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: ['#C0251B', '#5B5CE2', '#1A7A33'][i] }}>
                        {initials}
                      </div>
                      <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: '#0F0F1A' }}>{c}</span>
                      <div style={{ height: 4, width: `${(3 - i) * 25}%`, background: '#5B5CE2', borderRadius: 2, opacity: 0.3 + i * 0.2 }} />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Share card */}
          <div style={{ background: 'linear-gradient(135deg, #5B5CE2 0%, #4647C7 100%)', borderRadius: 20, padding: '20px', boxShadow: '0 8px 24px rgba(91,92,226,0.3)' }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.04em', marginBottom: 4 }}>DİJİTAL HAFTAM</p>
            <p style={{ fontSize: 18, fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', marginBottom: 12 }}>
              Bu hafta {weeklyStats.mailsAnalyzed} mail analiz edildi, {weeklyStats.timeSaved} kazandırıldı.
            </p>
            <button style={{
              background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 10,
              padding: '8px 16px', fontSize: 13, fontWeight: 600, color: '#fff', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v8M4 6l3 3 3-3M2 10v2h10v-2" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Paylaş
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
