import { useState } from 'react'
import PageHeader from '../../components/layout/PageHeader'
import BottomSheet from '../../components/layout/BottomSheet'
import { useNavigation } from '../../context/NavigationContext'

type ActionSheet = 'permissions' | 'retention' | 'clear-history' | 'download' | 'delete-account' | null

export default function SecurityPrivacy() {
  const { navigate } = useNavigation()
  const [activeSheet, setActiveSheet] = useState<ActionSheet>(null)
  const [confirmed, setConfirmed] = useState<string | null>(null)
  const [retentionSelected, setRetentionSelected] = useState('1 yıl')

  function confirm(action: string) {
    setConfirmed(action)
    setTimeout(() => { setConfirmed(null); setActiveSheet(null) }, 1600)
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: '#F8F8FC' }}>
      <PageHeader title="Gizlilik ve Güvenlik" showBack />

      <div className="flex-1 mobile-scroll px-5 pt-4 pb-6">
        {/* Trust highlights */}
        <div style={{ background: 'linear-gradient(135deg, #EEEEFF 0%, #E5F2FF 100%)', borderRadius: 16, padding: '16px', marginBottom: 20, border: '1px solid rgba(91,92,226,0.15)' }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#5B5CE2', letterSpacing: '0.04em', marginBottom: 10 }}>TAAHHÜTLER</p>
          {[
            '🔒 Veriler reklamverenlere satılmaz',
            '✅ Kritik işlemler onayın olmadan gerçekleşmez',
            '🛡️ Veriler aktarım sırasında ve saklanırken şifrelenir',
            '🗑️ Verilerini istediğin zaman silebilirsin',
          ].map(t => (
            <p key={t} style={{ fontSize: 13, color: '#0F0F1A', marginBottom: 6, lineHeight: 1.4 }}>{t}</p>
          ))}
        </div>

        {[
          {
            title: 'Veri ve Erişim',
            items: [
              { label: 'Bağlı Hesaplar', fn: () => navigate('integrations') },
              { label: "AI'ın Erişebildiği Veriler", fn: () => navigate('data-source-control') },
              { label: 'İzinler', fn: () => setActiveSheet('permissions') },
            ],
          },
          {
            title: 'Veri Yönetimi',
            items: [
              { label: 'Veri Saklama', fn: () => setActiveSheet('retention') },
              { label: 'Geçmişi Sil', fn: () => setActiveSheet('clear-history'), danger: true },
              { label: 'Verilerimi İndir', fn: () => setActiveSheet('download') },
              { label: 'Hesabımı Sil', fn: () => setActiveSheet('delete-account'), danger: true },
            ],
          },
          {
            title: 'AI Ayarları',
            items: [
              { label: 'AI Kişiselleştirme', fn: () => navigate('ai-personalization') },
            ],
          },
        ].map(group => (
          <div key={group.title} className="mb-5">
            <p style={{ fontSize: 11, fontWeight: 700, color: '#A0A0B2', letterSpacing: '0.05em', marginBottom: 8 }}>{group.title.toUpperCase()}</p>
            <div style={{ background: '#fff', borderRadius: 14, overflow: 'hidden', boxShadow: '0 1px 3px rgba(15,15,26,0.04)' }}>
              {group.items.map((item, i) => (
                <button
                  key={item.label}
                  onClick={item.fn}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '13px 16px', background: 'none', border: 'none', cursor: 'pointer',
                    borderBottom: i < group.items.length - 1 ? '1px solid #F2F2F8' : 'none',
                  }}
                >
                  <span style={{ fontSize: 14, color: (item as any).danger ? '#FF3B30' : '#0F0F1A', fontWeight: 500 }}>{item.label}</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ opacity: 0.3 }}>
                    <path d="M5 3l4 4-4 4" stroke="#0F0F1A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Permissions Sheet */}
      <BottomSheet isOpen={activeSheet === 'permissions'} onClose={() => setActiveSheet(null)} title="İzinler">
        <div className="px-5 pb-5">
          {[
            { label: 'Kamera', status: 'İzin Verildi', icon: '📷' },
            { label: 'Mikrofon', status: 'İzin Verildi', icon: '🎙️' },
            { label: 'Bildirimler', status: 'İzin Verildi', icon: '🔔' },
            { label: 'Takvim', status: 'İzin Verildi', icon: '📅' },
            { label: 'Kişiler', status: 'Reddedildi', icon: '👥' },
          ].map(p => (
            <div key={p.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #F2F2F8' }}>
              <div className="flex items-center gap-3">
                <span style={{ fontSize: 18 }}>{p.icon}</span>
                <span style={{ fontSize: 15, fontWeight: 500, color: '#0F0F1A' }}>{p.label}</span>
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: p.status === 'İzin Verildi' ? '#34C759' : '#FF3B30' }}>{p.status}</span>
            </div>
          ))}
          <button onClick={() => setConfirmed('system-settings')} style={{ width: '100%', marginTop: 16, padding: '13px', borderRadius: 14, background: confirmed === 'system-settings' ? '#0F0F1A' : '#F1F1F8', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: confirmed === 'system-settings' ? '#fff' : '#5B5CE2' }}>
            {confirmed === 'system-settings' ? '📱 Sistem Ayarları açılıyor…' : 'Sistem Ayarlarına Git ↗'}
          </button>
        </div>
      </BottomSheet>

      {/* Retention Sheet */}
      <BottomSheet isOpen={activeSheet === 'retention'} onClose={() => setActiveSheet(null)} title="Veri Saklama">
        <div className="px-5 pb-5">
          <p style={{ fontSize: 14, color: '#6B6B80', lineHeight: 1.5, marginBottom: 16 }}>
            Verilerini ne kadar süre saklamamızı istediğini seç. Aboneliğin bittiğinde veriler 30 gün içinde silinir.
          </p>
          {['3 ay', '6 ay', '1 yıl', 'Sınırsız (PRO)'].map((opt, i) => (
            <button key={opt} onClick={() => setRetentionSelected(opt)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 0', background: 'none', border: 'none', borderBottom: i < 3 ? '1px solid #F2F2F8' : 'none', cursor: 'pointer' }}>
              <span style={{ fontSize: 15, color: retentionSelected === opt ? '#5B5CE2' : '#0F0F1A', fontWeight: retentionSelected === opt ? 600 : 400 }}>{opt}</span>
              {retentionSelected === opt && <span style={{ fontSize: 12, color: '#5B5CE2', fontWeight: 700 }}>Seçili ✓</span>}
            </button>
          ))}
        </div>
      </BottomSheet>

      {/* Clear History Sheet */}
      <BottomSheet isOpen={activeSheet === 'clear-history'} onClose={() => setActiveSheet(null)} title="Geçmişi Sil">
        <div className="px-5 pb-5">
          {confirmed === 'clear' ? (
            <div className="flex flex-col items-center py-8">
              <div style={{ width: 64, height: 64, borderRadius: 32, background: '#E8F8EE', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12, fontSize: 28 }}>✅</div>
              <p style={{ fontSize: 15, fontWeight: 700, color: '#0F0F1A' }}>Geçmiş Temizlendi</p>
            </div>
          ) : (
            <>
              <p style={{ fontSize: 14, color: '#6B6B80', lineHeight: 1.5, marginBottom: 20 }}>
                AI sohbet geçmişin ve öğrenilen tercihler sıfırlanacak. Bu işlem geri alınamaz.
              </p>
              <button onClick={() => confirm('clear')} style={{ width: '100%', padding: '14px', borderRadius: 14, background: '#FF3B30', border: 'none', cursor: 'pointer', fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 10 }}>
                Geçmişi Temizle
              </button>
              <button onClick={() => setActiveSheet(null)} style={{ width: '100%', padding: '14px', borderRadius: 14, background: '#F1F1F8', border: 'none', cursor: 'pointer', fontSize: 15, fontWeight: 600, color: '#6B6B80' }}>
                İptal
              </button>
            </>
          )}
        </div>
      </BottomSheet>

      {/* Download Sheet */}
      <BottomSheet isOpen={activeSheet === 'download'} onClose={() => setActiveSheet(null)} title="Verilerimi İndir">
        <div className="px-5 pb-5">
          {confirmed === 'download' ? (
            <div className="flex flex-col items-center py-8">
              <div style={{ width: 64, height: 64, borderRadius: 32, background: '#EEEEFF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12, fontSize: 28 }}>📦</div>
              <p style={{ fontSize: 15, fontWeight: 700, color: '#0F0F1A', marginBottom: 4 }}>İstek Alındı</p>
              <p style={{ fontSize: 13, color: '#6B6B80', textAlign: 'center' }}>Verilerini hazırlayıp e-posta ile göndereceğiz.</p>
            </div>
          ) : (
            <>
              <p style={{ fontSize: 14, color: '#6B6B80', lineHeight: 1.5, marginBottom: 16 }}>
                Tüm verilerinin bir kopyasını JSON formatında e-posta adresine göndereceğiz.
              </p>
              <div style={{ background: '#F8F8FC', borderRadius: 12, padding: '12px 14px', marginBottom: 16 }}>
                <p style={{ fontSize: 13, color: '#A0A0B2', marginBottom: 2 }}>Gönderilecek adres</p>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#0F0F1A' }}>yunus@example.com</p>
              </div>
              <button onClick={() => confirm('download')} style={{ width: '100%', padding: '14px', borderRadius: 14, background: 'linear-gradient(135deg, #5B5CE2 0%, #4647C7 100%)', border: 'none', cursor: 'pointer', fontSize: 15, fontWeight: 700, color: '#fff' }}>
                Veri Talebini Gönder
              </button>
            </>
          )}
        </div>
      </BottomSheet>

      {/* Delete Account Sheet */}
      <BottomSheet isOpen={activeSheet === 'delete-account'} onClose={() => setActiveSheet(null)} title="Hesabımı Sil">
        <div className="px-5 pb-5">
          <div style={{ background: '#FFF4E0', borderRadius: 12, padding: '12px 14px', marginBottom: 16, border: '1px solid rgba(255,159,10,0.3)' }}>
            <p style={{ fontSize: 13, color: '#8C5200', lineHeight: 1.5 }}>
              ⚠️ Bu işlem geri alınamaz. Tüm verilerin, bağlı hesapların ve aboneliğin kalıcı olarak silinir.
            </p>
          </div>
          <p style={{ fontSize: 14, color: '#6B6B80', lineHeight: 1.5, marginBottom: 20 }}>
            Hesabını silmek istediğinden emin misin?
          </p>
          <button onClick={() => setActiveSheet(null)} style={{ width: '100%', padding: '14px', borderRadius: 14, background: '#F1F1F8', border: 'none', cursor: 'pointer', fontSize: 15, fontWeight: 600, color: '#6B6B80', marginBottom: 10 }}>
            Vazgeç
          </button>
          <button style={{ width: '100%', padding: '14px', borderRadius: 14, background: 'none', border: '1.5px solid #FF3B30', cursor: 'pointer', fontSize: 15, fontWeight: 700, color: '#FF3B30' }}>
            Evet, Hesabımı Sil
          </button>
        </div>
      </BottomSheet>
    </div>
  )
}
