import { useState } from 'react'
import PageHeader from '../../components/layout/PageHeader'

const errorVariants = [
  {
    emoji: '🔑',
    title: 'Bağlantı süresi doldu.',
    subtitle: 'Gmail hesabına yeniden bağlanman gerekiyor. Verilerini koruyoruz.',
    ctaPrimary: 'Yeniden Bağlan',
    ctaSecondary: 'Daha Sonra',
    color: '#FF9F0A',
    bg: '#FFF4E0',
    badge: 'BAĞLANTI',
  },
  {
    emoji: '🚫',
    title: 'Erişim izni reddedildi.',
    subtitle: 'Google hesabında izin onaylanmadı. Tekrar denemek için aşağıya dokun.',
    ctaPrimary: 'Tekrar Dene',
    ctaSecondary: 'İptal',
    color: '#FF3B30',
    bg: '#FFEEED',
    badge: 'YETKİLENDİRME',
  },
  {
    emoji: '📅',
    title: 'Takvim izni verilmedi.',
    subtitle: 'Toplantı hazırlığı ve takvim akışı için takvim erişimine ihtiyacımız var.',
    ctaPrimary: 'Ayarlara Git',
    ctaSecondary: 'Atla',
    color: '#007AFF',
    bg: '#E5F2FF',
    badge: 'TAKVİM',
  },
  {
    emoji: '✨',
    title: 'AI şu an meşgul.',
    subtitle: 'Analizler geçici olarak yavaşladı. Birkaç dakika içinde her şey normale dönecek.',
    ctaPrimary: 'Yenile',
    ctaSecondary: null,
    color: '#8B5CF6',
    bg: '#F0ECFF',
    badge: 'AI ANALİZ',
  },
  {
    emoji: '📡',
    title: 'İnternet bağlantısı yok.',
    subtitle: 'Çevrimiçi olduğunda her şey otomatik olarak güncellenir.',
    ctaPrimary: 'Tekrar Dene',
    ctaSecondary: null,
    color: '#6B6B80',
    bg: '#F1F1F8',
    badge: 'BAĞLANTI',
  },
  {
    emoji: '⏱️',
    title: 'Senkronizasyon gecikiyor.',
    subtitle: 'Sunucularla bağlantı normalden yavaş. Biraz daha bekleyebilirsin.',
    ctaPrimary: 'Arka Planda Dene',
    ctaSecondary: 'Tamam',
    color: '#FF9F0A',
    bg: '#FFF4E0',
    badge: 'SENKRON',
  },
]

export default function ErrorStates() {
  const [retrying, setRetrying] = useState<number | null>(null)

  const handleRetry = (i: number) => {
    setRetrying(i)
    setTimeout(() => setRetrying(null), 1500)
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: '#F8F8FC' }}>
      <PageHeader title="Error States" showBack />

      <div className="flex-1 mobile-scroll px-5 py-5">
        <div style={{ marginBottom: 20 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#A0A0B2', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>
            TASARIM SİSTEMİ — HATA DURUMU KOMPONENTLERİ
          </p>
          <p style={{ fontSize: 13, color: '#6B6B80', lineHeight: 1.5 }}>
            Kullanıcı dostu hata mesajları. Teknik jargon yok, net aksiyon adımları.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {errorVariants.map((v, i) => (
            <div
              key={i}
              className="animate-fade-in"
              style={{
                background: '#fff',
                borderRadius: 20,
                padding: '24px 20px',
                boxShadow: '0 1px 4px rgba(15,15,26,0.05)',
                animationDelay: `${i * 80}ms`,
                opacity: 0,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <div
                  style={{
                    width: 52, height: 52, borderRadius: 16, background: v.bg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, fontSize: 24,
                  }}
                >
                  {v.emoji}
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: v.color, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    {v.badge}
                  </span>
                  <p style={{ fontSize: 15, fontWeight: 700, color: '#0F0F1A', letterSpacing: '-0.02em', marginTop: 2, marginBottom: 6 }}>
                    {v.title}
                  </p>
                  <p style={{ fontSize: 13, color: '#6B6B80', lineHeight: 1.5 }}>
                    {v.subtitle}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                <button
                  onClick={() => handleRetry(i)}
                  style={{
                    flex: 1, padding: '11px 0',
                    background: retrying === i ? '#E8F8EE' : v.color,
                    border: 'none', borderRadius: 12, cursor: 'pointer',
                    fontSize: 13, fontWeight: 600,
                    color: retrying === i ? '#34C759' : '#fff',
                    transition: 'all 0.2s',
                  }}
                >
                  {retrying === i ? '✓ Deneniyor...' : v.ctaPrimary}
                </button>
                {v.ctaSecondary && (
                  <button
                    style={{
                      flex: 1, padding: '11px 0',
                      background: '#F1F1F8',
                      border: 'none', borderRadius: 12, cursor: 'pointer',
                      fontSize: 13, fontWeight: 600, color: '#6B6B80',
                    }}
                  >
                    {v.ctaSecondary}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
