import { useState } from 'react'
import PageHeader from '../../components/layout/PageHeader'

const apps = [
  { icon: '📱', name: 'WhatsApp', enabled: true, priority: 'high' },
  { icon: '📧', name: 'Gmail', enabled: true, priority: 'high' },
  { icon: '💼', name: 'LinkedIn', enabled: false, priority: 'low' },
  { icon: '🗓️', name: 'Google Takvim', enabled: true, priority: 'high' },
  { icon: '💬', name: 'Slack', enabled: true, priority: 'medium' },
  { icon: '🛍️', name: 'Trendyol', enabled: false, priority: 'low' },
  { icon: '🏦', name: 'Ziraat Bankası', enabled: true, priority: 'high' },
  { icon: '🚕', name: 'BiTaksi', enabled: false, priority: 'low' },
]

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      style={{
        width: 44, height: 26, borderRadius: 13, position: 'relative',
        background: on ? '#5B5CE2' : '#D1D1DA',
        border: 'none', cursor: 'pointer', transition: 'background 0.25s', flexShrink: 0,
        padding: 0,
      }}
    >
      <div style={{
        position: 'absolute', top: 3, left: on ? 21 : 3,
        width: 20, height: 20, borderRadius: 10, background: '#fff',
        boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
        transition: 'left 0.25s',
      }} />
    </button>
  )
}

export default function AndroidNotifications() {
  const [mode, setMode] = useState<'all' | 'selected'>('selected')
  const [appStates, setAppStates] = useState(apps.map(a => a.enabled))
  const [masterOn, setMasterOn] = useState(true)

  const toggle = (i: number) => {
    setAppStates(prev => prev.map((v, idx) => idx === i ? !v : v))
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: '#F8F8FC' }}>
      <PageHeader title="Telefon Bildirimleri" showBack />

      <div className="flex-1 mobile-scroll px-5 py-5">

        {/* Explain card */}
        <div style={{
          background: 'linear-gradient(135deg, #EEEEFF 0%, #F0ECFF 100%)',
          borderRadius: 16, padding: '16px', marginBottom: 20,
          border: '1px solid rgba(91,92,226,0.15)',
        }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <div style={{ fontSize: 22 }}>🔔</div>
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#0F0F1A', marginBottom: 4 }}>
                Bildirim Zekası
              </p>
              <p style={{ fontSize: 13, color: '#6B6B80', lineHeight: 1.5 }}>
                İzin verirsen diğer uygulamalardan gelen bildirimleri de Dijital Asistan analiz edebilir. Önemlileri filtreler, gerisini özetler.
              </p>
            </div>
          </div>
        </div>

        {/* Master toggle */}
        <div style={{
          background: '#fff', borderRadius: 16, padding: '14px 16px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          boxShadow: '0 1px 4px rgba(15,15,26,0.05)', marginBottom: 16,
        }}>
          <div>
            <p style={{ fontSize: 15, fontWeight: 600, color: '#0F0F1A' }}>Bildirim Erişimi</p>
            <p style={{ fontSize: 12, color: '#6B6B80', marginTop: 2 }}>Tüm bildirimler için temel izin</p>
          </div>
          <Toggle on={masterOn} onChange={() => setMasterOn(p => !p)} />
        </div>

        {masterOn && (
          <>
            {/* Mode selector */}
            <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 4px rgba(15,15,26,0.05)', marginBottom: 16 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: '#A0A0B2', letterSpacing: '0.05em', textTransform: 'uppercase', padding: '14px 16px 0' }}>
                ERİŞİM MODU
              </p>
              {[
                { id: 'all' as const, label: 'Tüm Bildirimler', desc: 'Her uygulamadan gelen bildirimi analiz et' },
                { id: 'selected' as const, label: 'Seçili Uygulamalar', desc: 'Sadece seçtiğim uygulamaları analiz et' },
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setMode(opt.id)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: 14,
                    padding: '14px 16px', background: 'none', border: 'none', cursor: 'pointer',
                    borderTop: '1px solid #F2F2F8', textAlign: 'left',
                  }}
                >
                  <div style={{
                    width: 22, height: 22, borderRadius: 11,
                    border: `2px solid ${mode === opt.id ? '#5B5CE2' : '#D1D1DA'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, transition: 'border-color 0.2s',
                  }}>
                    {mode === opt.id && <div style={{ width: 10, height: 10, borderRadius: 5, background: '#5B5CE2' }} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, fontWeight: 600, color: '#0F0F1A', marginBottom: 2 }}>{opt.label}</p>
                    <p style={{ fontSize: 12, color: '#6B6B80' }}>{opt.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* App list */}
            {mode === 'selected' && (
              <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 4px rgba(15,15,26,0.05)', marginBottom: 16 }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#A0A0B2', letterSpacing: '0.05em', textTransform: 'uppercase', padding: '14px 16px 0' }}>
                  UYGULAMALAR
                </p>
                {apps.map((app, i) => (
                  <div
                    key={app.name}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 14, padding: '13px 16px',
                      borderTop: '1px solid #F2F2F8',
                    }}
                  >
                    <div style={{
                      width: 36, height: 36, borderRadius: 10, background: '#F1F1F8',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0,
                    }}>
                      {app.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 14, fontWeight: 500, color: '#0F0F1A' }}>{app.name}</p>
                      <p style={{ fontSize: 11, color: app.priority === 'high' ? '#34C759' : app.priority === 'medium' ? '#FF9F0A' : '#A0A0B2' }}>
                        {app.priority === 'high' ? '● Yüksek öncelik' : app.priority === 'medium' ? '● Orta öncelik' : '● Düşük öncelik'}
                      </p>
                    </div>
                    <Toggle on={appStates[i]} onChange={() => toggle(i)} />
                  </div>
                ))}
              </div>
            )}

            {/* Priority rules */}
            <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 4px rgba(15,15,26,0.05)', marginBottom: 16 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: '#A0A0B2', letterSpacing: '0.05em', textTransform: 'uppercase', padding: '14px 16px 0' }}>
                ÖNCELİK KURALLARI
              </p>
              {[
                { label: 'Para transferleri her zaman önemli', icon: '💸', on: true },
                { label: 'Toplantı hatırlatmaları ilet', icon: '📅', on: true },
                { label: 'Teslimat bildirimleri özetle', icon: '📦', on: false },
                { label: 'Sosyal medya bildirimlerini filtrele', icon: '📱', on: true },
              ].map((rule, i) => {
                const [on, setOn] = useState(rule.on)
                return (
                  <div
                    key={rule.label}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12, padding: '13px 16px',
                      borderTop: '1px solid #F2F2F8',
                    }}
                  >
                    <span style={{ fontSize: 18 }}>{rule.icon}</span>
                    <p style={{ flex: 1, fontSize: 13, fontWeight: 500, color: '#0F0F1A', lineHeight: 1.4 }}>{rule.label}</p>
                    <Toggle on={on} onChange={() => setOn(p => !p)} />
                  </div>
                )
              })}
            </div>

            {/* Privacy warning */}
            <div style={{
              background: '#FFF4E0', borderRadius: 14, padding: '14px 16px',
              border: '1px solid rgba(255,159,10,0.2)', marginBottom: 8,
              display: 'flex', gap: 10, alignItems: 'flex-start',
            }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>🔒</span>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#7A4F00', marginBottom: 4 }}>Gizlilik Güvencesi</p>
                <p style={{ fontSize: 12, color: '#7A4F00', lineHeight: 1.5 }}>
                  Bildirim içerikleri yalnızca cihazında işlenir. Reklamverenlerle paylaşılmaz. Dilediğin zaman bu erişimi kapatabilirsin.
                </p>
              </div>
            </div>

            <p style={{ fontSize: 11, color: '#A0A0B2', textAlign: 'center', padding: '4px 0 8px' }}>
              Yalnızca Android 12+ cihazlarda geçerlidir.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
