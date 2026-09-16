import { useNavigation } from '../../context/NavigationContext'
import PageHeader from '../../components/layout/PageHeader'

const emptyVariants = [
  {
    icon: '✉️',
    emoji: '✅',
    title: 'Her şey kontrol altında.',
    subtitle: 'Dikkat gerektiren önemli bir mail yok.',
    context: 'Mail Akışı',
    bgColor: '#E8F8EE',
    iconColor: '#34C759',
    action: null,
  },
  {
    icon: '📅',
    emoji: '😌',
    title: 'Bugün takvimin oldukça sakin.',
    subtitle: 'Planlanmış bir toplantın ya da etkinliğin yok.',
    context: 'Bugünkü Program',
    bgColor: '#E5F2FF',
    iconColor: '#007AFF',
    action: 'Etkinlik Ekle',
  },
  {
    icon: '🔄',
    emoji: '🎉',
    title: 'Bekleyen takip yok.',
    subtitle: 'Tüm açık konular kapatıldı.',
    context: 'Takip Listesi',
    bgColor: '#F0ECFF',
    iconColor: '#8B5CF6',
    action: null,
  },
  {
    icon: '📬',
    emoji: '🔗',
    title: 'Mailini bağla.',
    subtitle: 'Gmail veya Outlook bağlayarak önemli konuları burada görebilirsin.',
    context: 'Bağlantı Yok',
    bgColor: '#FFF4E0',
    iconColor: '#FF9F0A',
    action: 'Hesap Bağla',
  },
  {
    icon: '🤝',
    emoji: '👥',
    title: 'Henüz VIP kişi yok.',
    subtitle: 'Önemli kişileri ekleyerek onlardan gelen mesajlara öncelik ver.',
    context: 'VIP Kişiler',
    bgColor: '#EEEEFF',
    iconColor: '#5B5CE2',
    action: 'Kişi Ekle',
  },
]

export default function EmptyStates() {
  const { navigate } = useNavigation()

  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: '#F8F8FC' }}>
      <PageHeader title="Empty States" showBack />

      <div className="flex-1 mobile-scroll px-5 py-5">
        <div style={{ marginBottom: 20 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#A0A0B2', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>
            TASARIM SİSTEMİ — BOŞLUK DURUMU KOMPONENTLERİ
          </p>
          <p style={{ fontSize: 13, color: '#6B6B80', lineHeight: 1.5 }}>
            Her modül için özel boş durum ekranları. Pozitif ve sakin ton.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {emptyVariants.map((v, i) => (
            <div
              key={i}
              className="animate-fade-in"
              style={{
                background: '#fff',
                borderRadius: 20,
                padding: '28px 20px',
                boxShadow: '0 1px 4px rgba(15,15,26,0.05)',
                textAlign: 'center',
                animationDelay: `${i * 80}ms`,
                opacity: 0,
              }}
            >
              <div style={{ marginBottom: 4 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#A0A0B2', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  {v.context}
                </span>
              </div>
              <div
                style={{
                  width: 72, height: 72, borderRadius: 36,
                  background: v.bgColor,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '12px auto 16px',
                  fontSize: 32,
                }}
              >
                {v.emoji}
              </div>
              <p style={{ fontSize: 18, fontWeight: 700, color: '#0F0F1A', letterSpacing: '-0.02em', marginBottom: 8 }}>
                {v.title}
              </p>
              <p style={{ fontSize: 13, color: '#6B6B80', lineHeight: 1.5, marginBottom: v.action ? 20 : 0, maxWidth: 240, margin: '0 auto' }}>
                {v.subtitle}
              </p>
              {v.action && (
                <button
                  style={{
                    marginTop: 20,
                    padding: '10px 24px',
                    background: 'linear-gradient(135deg, #5B5CE2 0%, #4647C7 100%)',
                    border: 'none', borderRadius: 12, cursor: 'pointer',
                    fontSize: 13, fontWeight: 600, color: '#fff',
                  }}
                >
                  {v.action}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
