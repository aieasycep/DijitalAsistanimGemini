import PageHeader from '../../components/layout/PageHeader'

export default function Referral() {
  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: '#F8F8FC' }}>
      <PageHeader title="Arkadaşını Davet Et" showBack />

      <div className="flex-1 mobile-scroll px-5 pt-6 pb-6">
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 52, marginBottom: 12 }}>🎁</div>
          <h1 style={{ fontSize: 24, fontWeight: 900, color: '#0F0F1A', letterSpacing: '-0.04em', lineHeight: 1.2, marginBottom: 8 }}>
            İkiniz de 14 gün<br/>Pro kazanın.
          </h1>
          <p style={{ fontSize: 14, color: '#6B6B80', lineHeight: 1.5 }}>
            Arkadaşın uygulamaya kaydolunca her ikiniz de 14 gün ücretsiz Pro kazanırsınız.
          </p>
        </div>

        {/* Invite link */}
        <div style={{ background: '#fff', borderRadius: 16, padding: '14px 16px', marginBottom: 16, boxShadow: '0 1px 4px rgba(15,15,26,0.05)' }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#A0A0B2', letterSpacing: '0.04em', marginBottom: 6 }}>DAVETİYE LİNKİN</p>
          <div className="flex items-center gap-8">
            <span style={{ flex: 1, fontSize: 14, color: '#5B5CE2', fontWeight: 600 }}>dijital.asistan/davet/yunus42</span>
            <button style={{ fontSize: 12, fontWeight: 700, color: '#fff', background: '#5B5CE2', border: 'none', borderRadius: 8, padding: '6px 12px', cursor: 'pointer' }}>
              Kopyala
            </button>
          </div>
        </div>

        {/* Share buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
          {[
            { icon: '💬', label: 'WhatsApp\'tan Paylaş', bg: '#25D366' },
            { icon: '📤', label: 'Paylaş…', bg: '#5B5CE2' },
          ].map(btn => (
            <button key={btn.label} style={{
              width: '100%', padding: '14px', background: btn.bg, border: 'none', borderRadius: 14,
              cursor: 'pointer', fontSize: 15, fontWeight: 600, color: '#fff',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <span style={{ fontSize: 18 }}>{btn.icon}</span>
              {btn.label}
            </button>
          ))}
        </div>

        {/* Status */}
        <div style={{ background: '#fff', borderRadius: 16, padding: '16px', boxShadow: '0 1px 4px rgba(15,15,26,0.05)' }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: '#0F0F1A', marginBottom: 12 }}>Davet Durumu</p>
          <div className="flex items-center justify-between">
            <span style={{ fontSize: 14, color: '#6B6B80' }}>Gönderilen davet</span>
            <span style={{ fontSize: 22, fontWeight: 900, color: '#5B5CE2', letterSpacing: '-0.02em' }}>3</span>
          </div>
          <div style={{ height: 1, background: '#F2F2F8', margin: '10px 0' }} />
          <div className="flex items-center justify-between">
            <span style={{ fontSize: 14, color: '#6B6B80' }}>Kazanılan gün</span>
            <span style={{ fontSize: 22, fontWeight: 900, color: '#34C759', letterSpacing: '-0.02em' }}>14</span>
          </div>
        </div>
      </div>
    </div>
  )
}
