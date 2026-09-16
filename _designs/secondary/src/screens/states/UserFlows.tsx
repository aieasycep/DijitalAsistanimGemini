import PageHeader from '../../components/layout/PageHeader'

const flows = [
  {
    id: 'FLOW 1',
    title: 'İlk Kurulum',
    color: '#5B5CE2',
    bg: '#EEEEFF',
    steps: [
      { label: 'Yükle', icon: '📱' },
      { label: 'Giriş Yap', icon: '🔐' },
      { label: 'Gmail Bağla', icon: '📧' },
      { label: 'Takvim Bağla', icon: '📅' },
      { label: 'Analiz', icon: '✨' },
      { label: 'İlk Brifing', icon: '☀️' },
      { label: 'Ana Ekran', icon: '🏠' },
    ],
  },
  {
    id: 'FLOW 2',
    title: 'Önemli Mail → Yanıt',
    color: '#007AFF',
    bg: '#E5F2FF',
    steps: [
      { label: 'Önemli Mail', icon: '🔴' },
      { label: 'AI Özet', icon: '✨' },
      { label: 'Taslak Hazırla', icon: '✏️' },
      { label: 'Kullanıcı Onayı', icon: '👁️' },
      { label: 'Gönder', icon: '📤' },
    ],
  },
  {
    id: 'FLOW 3',
    title: 'Toplantı Hazırlığı',
    color: '#8B5CF6',
    bg: '#F0ECFF',
    steps: [
      { label: 'Takvim Etkinliği', icon: '📅' },
      { label: 'Meeting Prep', icon: '📋' },
      { label: 'İlgili Mailler', icon: '✉️' },
      { label: 'Not Al', icon: '✍️' },
      { label: 'Toplantı Sonrası', icon: '✅' },
    ],
  },
  {
    id: 'FLOW 4',
    title: 'Son Tarih Tespit → Hatırlatıcı',
    color: '#FF9F0A',
    bg: '#FFF4E0',
    steps: [
      { label: 'Tespit Edildi', icon: '🔍' },
      { label: 'Hatırlatıcı Öner', icon: '🔔' },
      { label: 'Kullanıcı Onayı', icon: '✅' },
      { label: 'Takvime Ekle', icon: '📅' },
    ],
  },
  {
    id: 'FLOW 5',
    title: 'Asistan Sorgusu',
    color: '#34C759',
    bg: '#E8F8EE',
    steps: [
      { label: 'Kullanıcı Sorar', icon: '💬' },
      { label: 'AI Yanıt', icon: '✨' },
      { label: 'Önerilen Aksiyon', icon: '💡' },
      { label: 'Onay', icon: '✅' },
      { label: 'Tamamlandı', icon: '🎉' },
    ],
  },
  {
    id: 'FLOW 6',
    title: 'Ücretsiz → Premium',
    color: '#FF3B30',
    bg: '#FFEEED',
    steps: [
      { label: 'Premium Özellik', icon: '⭐' },
      { label: 'Paywall', icon: '💳' },
      { label: '7 Gün Trial', icon: '🆓' },
      { label: 'Pro Kullanıcı', icon: '🏆' },
    ],
  },
]

export default function UserFlows() {
  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: '#F8F8FC' }}>
      <PageHeader title="User Flow Diyagramları" showBack />

      <div className="flex-1 mobile-scroll px-5 py-5">
        <div style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#A0A0B2', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>
            KRİTİK KULLANICI AKIŞLARI
          </p>
          <p style={{ fontSize: 13, color: '#6B6B80', lineHeight: 1.5 }}>
            6 temel kullanıcı senaryosu. Her adım tıklanabilir ve onay gerektiren aksiyonlar belirlenmiştir.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {flows.map((flow, fi) => (
            <div
              key={flow.id}
              className="animate-fade-in"
              style={{
                background: '#fff', borderRadius: 16, padding: '16px',
                boxShadow: '0 1px 4px rgba(15,15,26,0.05)',
                animationDelay: `${fi * 80}ms`, opacity: 0,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <span style={{
                  fontSize: 10, fontWeight: 700, color: flow.color,
                  background: flow.bg, borderRadius: 6, padding: '3px 8px', letterSpacing: '0.05em',
                }}>{flow.id}</span>
                <p style={{ fontSize: 14, fontWeight: 700, color: '#0F0F1A' }}>{flow.title}</p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 0, overflowX: 'auto', paddingBottom: 4 }}>
                {flow.steps.map((step, si) => (
                  <div key={si} style={{ display: 'flex', alignItems: 'center', gap: 0, flexShrink: 0 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                      <div style={{
                        width: 40, height: 40, borderRadius: 12,
                        background: flow.bg,
                        border: `1.5px solid ${flow.color}30`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
                      }}>
                        {step.icon}
                      </div>
                      <p style={{ fontSize: 10, fontWeight: 600, color: '#6B6B80', textAlign: 'center', maxWidth: 44, lineHeight: 1.3 }}>
                        {step.label}
                      </p>
                    </div>
                    {si < flow.steps.length - 1 && (
                      <div style={{ display: 'flex', alignItems: 'center', height: 40, padding: '0 3px', marginBottom: 16 }}>
                        <div style={{ width: 14, height: 1.5, background: '#D1D1DA' }} />
                        <div style={{ width: 0, height: 0, borderTop: '3px solid transparent', borderBottom: '3px solid transparent', borderLeft: `5px solid #D1D1DA` }} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Key rules */}
        <div style={{ background: '#fff', borderRadius: 16, padding: 16, marginTop: 16, boxShadow: '0 1px 4px rgba(15,15,26,0.05)' }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#5B5CE2', letterSpacing: '0.04em', marginBottom: 12 }}>
            TEMEL AKIŞ KURALLARI
          </p>
          {[
            '🔒 Write actions (mail gönder, takvim oluştur) her zaman kullanıcı onayı gerektirir',
            '✨ AI önerileri aksiyonla bitmeli: "Şimdi ne yapmalıyım?" sorusu her adımda cevaplı',
            '↩ Geri gidebilme her akışta mevcut olmalı',
            '💡 Hata durumunda kullanıcı dostu mesaj ve alternatif yol sunulmalı',
            '⚡ Kritik bildirimler flow\'u kesebilir (overlay/modal değil, banner)',
          ].map((rule, i) => (
            <p key={i} style={{ fontSize: 12, color: '#0F0F1A', lineHeight: 1.55, marginBottom: 6 }}>{rule}</p>
          ))}
        </div>
      </div>
    </div>
  )
}
