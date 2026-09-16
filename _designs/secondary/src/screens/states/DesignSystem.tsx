import PageHeader from '../../components/layout/PageHeader'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <p style={{ fontSize: 11, fontWeight: 700, color: '#A0A0B2', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 12 }}>
        {title}
      </p>
      {children}
    </div>
  )
}

function Swatch({ color, name, hex }: { color: string; name: string; hex: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <div style={{ width: 44, height: 44, borderRadius: 12, background: color, boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }} />
      <p style={{ fontSize: 10, fontWeight: 600, color: '#0F0F1A', textAlign: 'center' }}>{name}</p>
      <p style={{ fontSize: 9, color: '#A0A0B2' }}>{hex}</p>
    </div>
  )
}

const badges = [
  { label: 'KRİTİK', bg: '#FFEEED', color: '#FF3B30' },
  { label: 'YAKLAŞAN', bg: '#FFF4E0', color: '#FF9F0A' },
  { label: 'SON TARİH', bg: '#F0ECFF', color: '#8B5CF6' },
  { label: 'BİLGİ', bg: '#E5F2FF', color: '#007AFF' },
  { label: 'TAMAM', bg: '#E8F8EE', color: '#34C759' },
]

const typeSamples = [
  { label: 'Display', size: 32, weight: 800, text: 'Dijital Asistan' },
  { label: 'H1', size: 26, weight: 700, text: 'Günaydın, Yunus' },
  { label: 'H2', size: 20, weight: 700, text: 'Bugünün Öncelikleri' },
  { label: 'H3', size: 17, weight: 600, text: 'Mail Özeti' },
  { label: 'Body', size: 15, weight: 400, text: 'AI tarafından analiz edildi' },
  { label: 'Caption', size: 13, weight: 400, text: 'Gmail · Ahmet Yılmaz · 08:42' },
  { label: 'Micro Label', size: 11, weight: 700, text: 'KAYNAK GÖSTER' },
]

const radiusSamples = [
  { r: 6, label: 'xs — 6px', use: 'Badge, Tag' },
  { r: 10, label: 'sm — 10px', use: 'Chip, Button sm' },
  { r: 14, label: 'md — 14px', use: 'Card, Input' },
  { r: 20, label: 'lg — 20px', use: 'Sheet, Hero Card' },
]

export default function DesignSystem() {
  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: '#F8F8FC' }}>
      <PageHeader title="Design System" showBack />

      <div className="flex-1 mobile-scroll px-5 py-5">
        <div style={{ marginBottom: 20 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#A0A0B2', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>
            DESIGN SYSTEM — TÜM BİLEŞENLER
          </p>
          <p style={{ fontSize: 13, color: '#6B6B80' }}>Token sistemi, typography, bileşenler ve renk paleti.</p>
        </div>

        {/* Colors */}
        <Section title="Renk Paleti">
          <div style={{ background: '#fff', borderRadius: 16, padding: 16, boxShadow: '0 1px 4px rgba(15,15,26,0.05)' }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: '#6B6B80', marginBottom: 12 }}>Ana Renkler</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <Swatch color="#5B5CE2" name="Primary" hex="#5B5CE2" />
              <Swatch color="#4647C7" name="Primary Dark" hex="#4647C7" />
              <Swatch color="#EEEEFF" name="Primary Soft" hex="#EEEEFF" />
              <Swatch color="#0F0F1A" name="Text" hex="#0F0F1A" />
              <Swatch color="#F8F8FC" name="Surface" hex="#F8F8FC" />
            </div>
            <p style={{ fontSize: 12, fontWeight: 600, color: '#6B6B80', marginBottom: 12 }}>Durum Renkleri</p>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Swatch color="#FF3B30" name="Critical" hex="#FF3B30" />
              <Swatch color="#FF9F0A" name="Warning" hex="#FF9F0A" />
              <Swatch color="#8B5CF6" name="Deadline" hex="#8B5CF6" />
              <Swatch color="#007AFF" name="Info" hex="#007AFF" />
              <Swatch color="#34C759" name="Success" hex="#34C759" />
            </div>
          </div>
        </Section>

        {/* Typography */}
        <Section title="Typography — Inter">
          <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 4px rgba(15,15,26,0.05)' }}>
            {typeSamples.map((t, i) => (
              <div key={t.label} style={{
                padding: '12px 16px',
                borderBottom: i < typeSamples.length - 1 ? '1px solid #F2F2F8' : 'none',
                display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8,
              }}>
                <p style={{ fontSize: t.size, fontWeight: t.weight, color: '#0F0F1A', letterSpacing: '-0.02em', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {t.text}
                </p>
                <span style={{ fontSize: 10, color: '#A0A0B2', flexShrink: 0 }}>{t.label} · {t.size}px/{t.weight}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Priority Badges */}
        <Section title="Öncelik Etiketleri (Priority Badges)">
          <div style={{ background: '#fff', borderRadius: 16, padding: 16, boxShadow: '0 1px 4px rgba(15,15,26,0.05)' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {badges.map(b => (
                <span key={b.label} style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.06em',
                  color: b.color, background: b.bg,
                  borderRadius: 6, padding: '4px 8px',
                }}>{b.label}</span>
              ))}
            </div>
          </div>
        </Section>

        {/* Buttons */}
        <Section title="Butonlar">
          <div style={{ background: '#fff', borderRadius: 16, padding: 16, boxShadow: '0 1px 4px rgba(15,15,26,0.05)', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button style={{ width: '100%', padding: '14px', borderRadius: 14, background: 'linear-gradient(135deg, #5B5CE2 0%, #4647C7 100%)', border: 'none', cursor: 'pointer', fontSize: 15, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>
              Primary — Başla
            </button>
            <button style={{ width: '100%', padding: '13px', borderRadius: 14, background: '#EEEEFF', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: '#5B5CE2' }}>
              Secondary — Daha Sonra
            </button>
            <button style={{ width: '100%', padding: '13px', borderRadius: 14, background: 'transparent', border: '1.5px solid #E8E8F0', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: '#6B6B80' }}>
              Tertiary — İptal
            </button>
            <button style={{ width: '100%', padding: '13px', borderRadius: 14, background: '#FFEEED', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: '#FF3B30' }}>
              Danger — Hesabı Sil
            </button>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{ flex: 1, padding: '10px', borderRadius: 12, background: '#F1F1F8', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, color: '#0F0F1A' }}>
                sm
              </button>
              <button style={{ flex: 1, padding: '12px', borderRadius: 12, background: '#5B5CE2', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 700, color: '#fff' }}>
                md
              </button>
              <button style={{ flex: 1, padding: '14px', borderRadius: 14, background: '#5B5CE2', border: 'none', cursor: 'pointer', fontSize: 15, fontWeight: 700, color: '#fff' }}>
                lg
              </button>
            </div>
          </div>
        </Section>

        {/* Chips */}
        <Section title="Filter Chips">
          <div style={{ background: '#fff', borderRadius: 16, padding: 16, boxShadow: '0 1px 4px rgba(15,15,26,0.05)' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['Tümü', 'Önemli', 'Mail', 'Takvim', 'Takip', 'Kişisel'].map((c, i) => (
                <button key={c} style={{
                  padding: '7px 14px', borderRadius: 9999,
                  background: i === 0 ? '#5B5CE2' : '#F1F1F8',
                  border: 'none', cursor: 'pointer',
                  fontSize: 13, fontWeight: 600,
                  color: i === 0 ? '#fff' : '#6B6B80',
                }}>
                  {c}
                </button>
              ))}
            </div>
          </div>
        </Section>

        {/* Radius */}
        <Section title="Border Radius Skalası">
          <div style={{ background: '#fff', borderRadius: 16, padding: 16, boxShadow: '0 1px 4px rgba(15,15,26,0.05)' }}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end' }}>
              {radiusSamples.map(rs => (
                <div key={rs.r} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                  <div style={{
                    width: 48, height: 48,
                    background: '#EEEEFF',
                    borderRadius: rs.r,
                  }} />
                  <p style={{ fontSize: 10, fontWeight: 600, color: '#6B6B80', textAlign: 'center' }}>{rs.r}px</p>
                  <p style={{ fontSize: 9, color: '#A0A0B2', textAlign: 'center' }}>{rs.use}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Spacing */}
        <Section title="Spacing Skalası (4px Grid)">
          <div style={{ background: '#fff', borderRadius: 16, padding: 16, boxShadow: '0 1px 4px rgba(15,15,26,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4 }}>
              {[4, 8, 12, 16, 20, 24, 32, 40].map(s => (
                <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flex: 1 }}>
                  <div style={{ width: '100%', height: s, background: '#5B5CE2', borderRadius: 2, opacity: 0.6 + s / 120 }} />
                  <p style={{ fontSize: 9, color: '#A0A0B2', textAlign: 'center' }}>{s}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Shadows */}
        <Section title="Gölge Sistemi">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { label: 'xs — Subtle', shadow: '0 1px 3px rgba(15,15,26,0.04)' },
              { label: 'sm — Card', shadow: '0 1px 8px rgba(15,15,26,0.06)' },
              { label: 'md — Sheet', shadow: '0 4px 24px rgba(15,15,26,0.12)' },
              { label: 'lg — Modal', shadow: '0 16px 48px rgba(15,15,26,0.2)' },
            ].map(sh => (
              <div key={sh.label} style={{
                background: '#fff', borderRadius: 12, padding: '14px 16px',
                boxShadow: sh.shadow,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <span style={{ fontSize: 13, fontWeight: 500, color: '#0F0F1A' }}>{sh.label}</span>
                <span style={{ fontSize: 10, color: '#A0A0B2', fontFamily: 'monospace' }}>{sh.shadow.split(' ').slice(0, 3).join(' ')}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Avatar */}
        <Section title="Avatar">
          <div style={{ background: '#fff', borderRadius: 16, padding: 16, boxShadow: '0 1px 4px rgba(15,15,26,0.05)', display: 'flex', gap: 16, alignItems: 'center' }}>
            {[
              { init: 'AY', bg: '#5B5CE2', size: 44 },
              { init: 'MK', bg: '#34C759', size: 36 },
              { init: 'FŞ', bg: '#FF9F0A', size: 28 },
            ].map(av => (
              <div key={av.init} style={{
                width: av.size, height: av.size, borderRadius: av.size / 2,
                background: av.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: av.size * 0.35, fontWeight: 700, color: '#fff',
              }}>{av.init}</div>
            ))}
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 12, color: '#6B6B80' }}>Baş harflerden otomatik avatar üretimi. Deterministik renk sistemi.</p>
            </div>
          </div>
        </Section>

        {/* Source Tag */}
        <Section title="Kaynak Etiketi (SourceTag)">
          <div style={{ background: '#fff', borderRadius: 16, padding: 16, boxShadow: '0 1px 4px rgba(15,15,26,0.05)', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['Gmail · Ahmet Yılmaz · 08:42', 'Google Takvim · 14:30', 'Outlook · Proje ekibi', 'Apple Calendar · Yarın'].map(tag => (
              <span key={tag} style={{
                fontSize: 11, fontWeight: 600, color: '#6B6B80',
                background: '#F1F1F8', borderRadius: 6, padding: '4px 9px',
              }}>{tag}</span>
            ))}
          </div>
        </Section>
      </div>
    </div>
  )
}
