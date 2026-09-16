import PageHeader from '../../components/layout/PageHeader'

const notifications = [
  {
    type: 'Sabah Brifing',
    icon: '☀️',
    app: 'Dijital Asistan',
    time: '07:30',
    title: 'Günaydın. Bugün bilmen gereken 5 şey var.',
    body: 'Ahmet cevap bekliyor · 14:30 toplantın var · Elektrik faturası bugün son gün',
    bg: 'linear-gradient(135deg, #FFF4E0 0%, #FFFBF2 100%)',
    accent: '#FF9F0A',
    iconBg: '#FFF4E0',
  },
  {
    type: 'Kritik Uyarı',
    icon: '🔴',
    app: 'Dijital Asistan',
    time: '10:14',
    title: 'Ahmet senden bugün 17:00\'ye kadar dönüş bekliyor.',
    body: 'Revize fiyat teklifi · Gmail · 3 saattir bekliyor',
    bg: 'linear-gradient(135deg, #FFEEED 0%, #FFF8F8 100%)',
    accent: '#FF3B30',
    iconBg: '#FFEEED',
  },
  {
    type: 'Toplantı Hatırlatma',
    icon: '📅',
    app: 'Dijital Asistan',
    time: '14:10',
    title: '14:30 toplantına 20 dakika kaldı.',
    body: 'Mehmet Kaya · Google Meet · 3 hazırlık notun var',
    bg: 'linear-gradient(135deg, #EEEEFF 0%, #F8F8FF 100%)',
    accent: '#5B5CE2',
    iconBg: '#EEEEFF',
  },
  {
    type: 'Gün Ortası Güncellemesi',
    icon: '⚡',
    app: 'Dijital Asistan',
    time: '13:00',
    title: 'Sabahından beri 2 önemli gelişme oldu.',
    body: 'Mehmet toplantıyı 16:00\'ya almak istiyor · Kargo bugün geliyor',
    bg: 'linear-gradient(135deg, #F0ECFF 0%, #FAF8FF 100%)',
    accent: '#8B5CF6',
    iconBg: '#F0ECFF',
  },
  {
    type: 'Akşam Özeti',
    icon: '🌙',
    app: 'Dijital Asistan',
    time: '19:00',
    title: 'Bugünden yarına 3 konu kalıyor.',
    body: 'Teklif maili · Mehmet takibi · Yarın 10:00 toplantı',
    bg: 'linear-gradient(135deg, #E5F2FF 0%, #F5FAFF 100%)',
    accent: '#007AFF',
    iconBg: '#E5F2FF',
  },
  {
    type: 'Sessiz Özet',
    icon: '📦',
    app: 'Dijital Asistan',
    time: '11:45',
    title: 'Trendyol siparişin bugün teslim edilecek.',
    body: 'Tahmini teslimat: 14:00–18:00',
    bg: 'linear-gradient(135deg, #E8F8EE 0%, #F5FDF7 100%)',
    accent: '#34C759',
    iconBg: '#E8F8EE',
  },
]

function NotificationBubble({ n }: { n: typeof notifications[0] }) {
  return (
    <div style={{
      background: n.bg,
      borderRadius: 16, padding: '14px 16px',
      border: `1px solid ${n.accent}22`,
      boxShadow: '0 2px 8px rgba(15,15,26,0.06)',
    }}>
      {/* Type label */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <span style={{
          fontSize: 10, fontWeight: 700, color: n.accent,
          textTransform: 'uppercase', letterSpacing: '0.05em',
        }}>
          {n.type}
        </span>
        <span style={{ fontSize: 11, color: '#A0A0B2' }}>{n.time}</span>
      </div>

      {/* Notification content */}
      <div style={{
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(12px)',
        borderRadius: 12,
        padding: '12px 14px',
        boxShadow: '0 1px 4px rgba(15,15,26,0.08)',
      }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: n.iconBg,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, flexShrink: 0,
            border: `1px solid ${n.accent}22`,
          }}>
            {n.icon}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#0F0F1A' }}>{n.app}</span>
              <span style={{ fontSize: 10, color: '#A0A0B2' }}>şimdi</span>
            </div>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#0F0F1A', lineHeight: 1.35, marginBottom: 4 }}>
              {n.title}
            </p>
            <p style={{ fontSize: 12, color: '#6B6B80', lineHeight: 1.4 }}>
              {n.body}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function NotificationExamples() {
  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: '#F8F8FC' }}>
      <PageHeader title="Bildirim Örnekleri" showBack />

      <div className="flex-1 mobile-scroll px-5 py-5">
        <div style={{ marginBottom: 20 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#A0A0B2', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>
            TASARIM SİSTEMİ — BİLDİRİM DİZAYNI ÖRNEKLERİ
          </p>
          <p style={{ fontSize: 13, color: '#6B6B80', lineHeight: 1.5 }}>
            Sadece önemli olduğunda haber ver. Spam hissi yaratma. Kısa, net, aksiyonable.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {notifications.map((n, i) => (
            <div key={i} className="animate-fade-in" style={{ animationDelay: `${i * 70}ms`, opacity: 0 }}>
              <NotificationBubble n={n} />
            </div>
          ))}
        </div>

        {/* Principles */}
        <div style={{ background: '#fff', borderRadius: 16, padding: '16px', marginTop: 20, boxShadow: '0 1px 4px rgba(15,15,26,0.05)' }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#5B5CE2', letterSpacing: '0.04em', marginBottom: 12 }}>BİLDİRİM İLKELERİ</p>
          {[
            '☑ Sadece gerçekten önemli olduğunda gönder',
            '☑ Her bildirimin net bir aksiyonu olsun',
            '☑ Gün içinde maksimum 3–5 bildirim',
            '☑ Teknik jargon yok, doğal Türkçe',
            '☑ Özet ve gruplandırma tercih et',
          ].map((p, i) => (
            <p key={i} style={{ fontSize: 13, color: '#0F0F1A', lineHeight: 1.5, marginBottom: 4 }}>{p}</p>
          ))}
        </div>
      </div>
    </div>
  )
}
