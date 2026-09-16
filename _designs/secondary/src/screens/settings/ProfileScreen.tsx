import PageHeader from '../../components/layout/PageHeader'
import { useNavigation } from '../../context/NavigationContext'
import { useTheme } from '../../context/ThemeContext'
import type { ScreenName } from '../../types'

type SettingItem = { icon: string; label: string; badge?: string; screen: ScreenName | null }
const settingsGroups: { title: string; items: SettingItem[] }[] = [
  {
    title: 'Hesap',
    items: [
      { icon: '💳', label: 'Abonelik', badge: 'PRO', screen: 'paywall' as ScreenName },
    ],
  },
  {
    title: 'Kişiselleştir',
    items: [
      { icon: '⏰', label: 'Brifing Ayarları', screen: 'briefing-settings' as ScreenName },
      { icon: '🔔', label: 'Bildirimler', screen: 'notification-settings' as ScreenName },
      { icon: '⭐', label: 'Öncelik Kuralları', screen: 'priority-rules' as ScreenName },
      { icon: '👥', label: 'VIP Kişiler', screen: 'vip-people' as ScreenName },
    ],
  },
  {
    title: 'Bağlantılar',
    items: [
      { icon: '🔗', label: 'Entegrasyonlar', screen: 'integrations' as ScreenName },
      { icon: '✨', label: 'AI Kişiselleştirme', screen: 'ai-personalization' as ScreenName },
    ],
  },
  {
    title: 'Güvenlik',
    items: [
      { icon: '🔒', label: 'Gizlilik ve Güvenlik', screen: 'security-privacy' as ScreenName },
      { icon: '📊', label: 'Veri Kaynağı Kontrolü', screen: 'data-source-control' as ScreenName },
    ],
  },
  {
    title: 'Uygulama',
    items: [
      { icon: '🎨', label: 'Görünüm', screen: 'appearance' as ScreenName },
      { icon: '🌍', label: 'Dil', screen: 'language' as ScreenName },
      { icon: '❓', label: 'Yardım', screen: 'help' as ScreenName },
      { icon: '💬', label: 'Geri Bildirim', screen: 'feedback' as ScreenName },
    ],
  },
  {
    title: 'Diğer',
    items: [
      { icon: '🎁', label: 'Arkadaşını Davet Et', screen: 'referral' as ScreenName },
      { icon: '📊', label: 'Haftalık Rapor', screen: 'weekly-report' as ScreenName },
      { icon: '🤖', label: 'Android Bildirimleri', screen: 'android-notifications' as ScreenName },
      { icon: '📲', label: 'Android Frame (412px)', screen: 'android-frame' as ScreenName },
    ],
  },
  {
    title: 'Tasarım Sistemi',
    items: [
      { icon: '💫', label: 'Boşluk Durumları', screen: 'empty-states' as ScreenName },
      { icon: '⚠️', label: 'Hata Durumları', screen: 'error-states' as ScreenName },
      { icon: '⏳', label: 'Yükleme Durumları', screen: 'loading-states' as ScreenName },
      { icon: '🎨', label: 'Design System', screen: 'design-system' as ScreenName },
      { icon: '🗺️', label: 'Bilgi Mimarisi', screen: 'ia-page' as ScreenName },
      { icon: '🔄', label: 'User Flow Diyagramları', screen: 'user-flows' as ScreenName },
      { icon: '🔔', label: 'Bildirim Örnekleri', screen: 'notification-examples' as ScreenName },
      { icon: '📱', label: 'Widget Showcase', screen: 'widget-showcase' as ScreenName },
      { icon: '🏪', label: 'App Store Görseller', screen: 'appstore-screenshots' as ScreenName },
      { icon: '📣', label: 'Sosyal Reklamlar', screen: 'social-ads' as ScreenName },
      { icon: '🌐', label: 'Landing Page', screen: 'landing' as ScreenName },
    ],
  },
]

export default function ProfileScreen() {
  const { navigate } = useNavigation()
  const { t } = useTheme()

  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: t.bg }}>
      <PageHeader title="Profil" showBack />

      <div className="flex-1 mobile-scroll pb-6">
        {/* Profile card */}
        <div style={{ background: 'linear-gradient(135deg, #5B5CE2 0%, #4647C7 100%)', padding: '24px 20px', marginBottom: 16 }}>
          <div className="flex items-center gap-14">
            <div style={{ width: 64, height: 64, borderRadius: 32, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, fontWeight: 700, color: '#fff' }}>
              Y
            </div>
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: '#fff', letterSpacing: '-0.03em' }}>Yunus</h2>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>yunus@example.com</p>
              <div style={{ marginTop: 6, display: 'flex', gap: 6 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#5B5CE2', background: '#fff', borderRadius: 6, padding: '2px 8px' }}>PRO</span>
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)' }}>14 gün kaldı</span>
              </div>
            </div>
          </div>
        </div>

        {/* Settings groups */}
        <div className="px-5">
          {settingsGroups.map(group => (
            <div key={group.title} className="mb-5">
              <p style={{ fontSize: 11, fontWeight: 700, color: t.textMuted, letterSpacing: '0.05em', marginBottom: 8 }}>
                {group.title.toUpperCase()}
              </p>
              <div style={{ background: t.surface, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 4px rgba(15,15,26,0.05)' }}>
                {group.items.map((item, i) => (
                  <button
                    key={item.label}
                    onClick={() => item.screen && navigate(item.screen)}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                      padding: '13px 16px', background: 'none', border: 'none', cursor: item.screen ? 'pointer' : 'default',
                      borderBottom: i < group.items.length - 1 ? '1px solid #F2F2F8' : 'none',
                      textAlign: 'left',
                    }}
                  >
                    <span style={{ fontSize: 18, width: 28 }}>{item.icon}</span>
                    <span style={{ flex: 1, fontSize: 15, color: t.text, fontWeight: 500 }}>{item.label}</span>
                    {item.badge && (
                      <span style={{ fontSize: 10, fontWeight: 700, color: '#1A7A33', background: '#E8F8EE', borderRadius: 6, padding: '2px 7px' }}>{item.badge}</span>
                    )}
                    {item.screen && (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ opacity: 0.3 }}>
                        <path d="M5 3l4 4-4 4" stroke="#0F0F1A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Sign out */}
          <button style={{
            width: '100%', padding: '14px', background: t.surface, border: `1px solid ${t.border}`,
            borderRadius: 14, cursor: 'pointer', fontSize: 15, fontWeight: 600, color: '#FF3B30',
            boxShadow: '0 1px 3px rgba(15,15,26,0.04)',
          }}>
            Çıkış Yap
          </button>
        </div>
      </div>
    </div>
  )
}
