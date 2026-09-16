import PageHeader from '../../components/layout/PageHeader'

function Node({ label, color = '#5B5CE2', bg = '#EEEEFF', small = false }: { label: string; color?: string; bg?: string; small?: boolean }) {
  return (
    <div style={{
      background: bg, borderRadius: small ? 8 : 10,
      padding: small ? '5px 10px' : '7px 12px',
      border: `1.5px solid ${color}30`,
    }}>
      <p style={{ fontSize: small ? 11 : 12, fontWeight: 600, color, textAlign: 'center', letterSpacing: '-0.01em' }}>{label}</p>
    </div>
  )
}

function Arrow({ horizontal = false }: { horizontal?: boolean }) {
  if (horizontal) {
    return <div style={{ display: 'flex', alignItems: 'center', padding: '0 4px' }}>
      <div style={{ width: 20, height: 1.5, background: '#D1D1DA' }} />
      <div style={{ width: 0, height: 0, borderTop: '4px solid transparent', borderBottom: '4px solid transparent', borderLeft: '6px solid #D1D1DA' }} />
    </div>
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
      <div style={{ width: 1.5, height: 12, background: '#D1D1DA' }} />
      <div style={{ width: 0, height: 0, borderLeft: '4px solid transparent', borderRight: '4px solid transparent', borderTop: '6px solid #D1D1DA' }} />
    </div>
  )
}

export default function IAPage() {
  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: '#F8F8FC' }}>
      <PageHeader title="Bilgi Mimarisi" showBack />

      <div className="flex-1 mobile-scroll px-5 py-5">
        <div style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#A0A0B2', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>
            ÜRÜN MİMARİSİ — INFORMATION ARCHITECTURE
          </p>
          <p style={{ fontSize: 13, color: '#6B6B80', lineHeight: 1.5 }}>
            Tüm ekranlar ve navigasyon yapısı.
          </p>
        </div>

        {/* Onboarding Flow */}
        <div style={{ background: '#fff', borderRadius: 16, padding: 16, boxShadow: '0 1px 4px rgba(15,15,26,0.05)', marginBottom: 16 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#A0A0B2', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 12 }}>ONBOARDING</p>
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 4 }}>
            {['Karşılama', 'Gürültü', 'Proaktif', 'Kontrol', 'Hesap', 'Bağla', 'İzin', 'Tercihler', 'Kişisel.', 'VIP', 'Analiz', 'Aha!', 'Bildirim'].map((s, i, arr) => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <Node label={s} color="#5B5CE2" bg="#EEEEFF" small />
                {i < arr.length - 1 && <div style={{ width: 12, height: 1.5, background: '#D1D1DA' }} />}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
            <Arrow />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Node label="Bugün Ekranı" color="#5B5CE2" bg="#EEEEFF" />
          </div>
        </div>

        {/* Main Navigation */}
        <div style={{ background: '#fff', borderRadius: 16, padding: 16, boxShadow: '0 1px 4px rgba(15,15,26,0.05)', marginBottom: 16 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#A0A0B2', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 12 }}>ANA NAVİGASYON (4 TAB)</p>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            {[
              { label: 'Bugün', color: '#5B5CE2', bg: '#EEEEFF' },
              { label: 'Akış', color: '#007AFF', bg: '#E5F2FF' },
              { label: 'Plan', color: '#8B5CF6', bg: '#F0ECFF' },
              { label: 'Asistan', color: '#34C759', bg: '#E8F8EE' },
            ].map(tab => (
              <div key={tab.label} style={{ flex: 1 }}>
                <Node label={tab.label} color={tab.color} bg={tab.bg} />
              </div>
            ))}
          </div>

          {/* Today sub-screens */}
          <div style={{ marginBottom: 12 }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: '#5B5CE2', marginBottom: 6 }}>Bugün Alt Ekranlar</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {['Sabah Brifing', 'Gün Ortası', 'Akşam Kapanış', 'Haftalık Rapor', 'Neden Önemli?', 'Hatırlatıcı'].map(s => (
                <Node key={s} label={s} color="#5B5CE2" bg="#F8F8FF" small />
              ))}
            </div>
          </div>

          {/* Flow sub-screens */}
          <div style={{ marginBottom: 12 }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: '#007AFF', marginBottom: 6 }}>Akış Alt Ekranlar</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {['Mail Özeti', 'Mail Detay', 'AI Yanıt Taslağı', 'Takip Gereken', 'Senden Beklenen'].map(s => (
                <Node key={s} label={s} color="#007AFF" bg="#F0F8FF" small />
              ))}
            </div>
          </div>

          {/* Plan sub-screens */}
          <div style={{ marginBottom: 12 }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: '#8B5CF6', marginBottom: 6 }}>Plan Alt Ekranlar</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {['Takvim Çakışması', 'Toplantı Hazırlık', 'Toplantı Sonrası', 'Taahhütler'].map(s => (
                <Node key={s} label={s} color="#8B5CF6" bg="#FAF8FF" small />
              ))}
            </div>
          </div>

          {/* Assistant sub-screens */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 600, color: '#34C759', marginBottom: 6 }}>Asistan Alt Ekranlar</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {['Sesli Asistan', 'Evrensel Yakalama'].map(s => (
                <Node key={s} label={s} color="#34C759" bg="#F5FDF7" small />
              ))}
            </div>
          </div>
        </div>

        {/* Shared screens */}
        <div style={{ background: '#fff', borderRadius: 16, padding: 16, boxShadow: '0 1px 4px rgba(15,15,26,0.05)', marginBottom: 16 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#A0A0B2', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 12 }}>ORTAK EKRANLAR (Her tabdan erişilebilir)</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {['Arama', 'Onay Merkezi', 'Kişi Profili', 'Evrensel Yakalama'].map(s => (
              <Node key={s} label={s} color="#FF9F0A" bg="#FFF4E0" small />
            ))}
          </div>
        </div>

        {/* Settings */}
        <div style={{ background: '#fff', borderRadius: 16, padding: 16, boxShadow: '0 1px 4px rgba(15,15,26,0.05)', marginBottom: 16 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#A0A0B2', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 12 }}>PROFİL / AYARLAR (Avatar → Profil)</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {['Profil', 'Entegrasyonlar', 'AI Kişisel.', 'Güvenlik', 'Veri Kontrolü', 'VIP Kişiler', 'Android Bildirim', 'Paywall', 'Referral'].map(s => (
              <Node key={s} label={s} color="#6B6B80" bg="#F1F1F8" small />
            ))}
          </div>
        </div>

        {/* Marketing */}
        <div style={{ background: '#fff', borderRadius: 16, padding: 16, boxShadow: '0 1px 4px rgba(15,15,26,0.05)' }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#A0A0B2', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 12 }}>MARKETİNG & TASARIM SİSTEMİ</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {['Landing', 'App Store', 'Social Ads', 'Widget Showcase', 'Bildirim Örnekleri', 'Design System', 'Empty States', 'Error States', 'Loading States'].map(s => (
              <Node key={s} label={s} color="#FF3B30" bg="#FFEEED" small />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
