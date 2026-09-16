import { useState } from 'react'
import { useNavigation } from '../../context/NavigationContext'
import SourceTag from '../../components/special/SourceTag'
import type { ScreenName } from '../../types'

interface SearchResult {
  icon: string
  title: string
  source: string
  date: string
  summary: string
  screen: ScreenName | null
}

const recentSearches = ['Mehmet teklif', 'Uçak bileti', 'Elektrik faturası']

const searchResults: Record<string, SearchResult[]> = {
  'teklif': [
    { icon: '✉️', title: 'Revize fiyat teklifi - acil', source: 'Gmail · Ahmet Yılmaz', date: 'Bugün', summary: "Bugün 17:00'ye kadar revize teklif bekliyor.", screen: 'email-detail' },
    { icon: '👤', title: 'Ahmet Yılmaz', source: 'Kişiler', date: 'Son iletişim: Bugün', summary: 'Müzik Prodüksiyon Ltd · 2 açık konu', screen: 'person-intelligence' },
    { icon: '✉️', title: 'Teklif üzerine son değerlendirme', source: 'Gmail · Mehmet Kaya', date: 'Bugün', summary: 'Fiyat revizyonu ve sözleşme maddesi hakkında.', screen: 'email-detail' },
  ],
  'ucus': [
    { icon: '✈️', title: 'TK2412 · İstanbul → Antalya', source: 'Gmail · THY', date: 'Yarın', summary: 'Yarın 09:15 kalkış, check-in açık.', screen: null },
  ],
  'fatura': [
    { icon: '⚡', title: 'Elektrik faturası — 1.842 TL', source: 'Gmail · Fatura', date: '1 Eylül', summary: 'Son ödeme tarihi 10 Eylül.', screen: 'email-detail' },
    { icon: '📱', title: 'Telefon faturası', source: 'Gmail · Turkcell', date: '28 Ağustos', summary: 'Ödendi.', screen: null },
  ],
  'mehmet': [
    { icon: '👤', title: 'Mehmet Kaya', source: 'Kişiler', date: 'Son iletişim: 4 gün önce', summary: 'Toplantı: Bugün 14:30 · 2 açık konu', screen: 'person-intelligence' },
    { icon: '📅', title: 'Proje değerlendirme toplantısı', source: 'Takvim · Mehmet Kaya', date: 'Bugün 14:30', summary: 'Google Meet · 18 dakika kaldı', screen: 'meeting-prep' },
  ],
}

export default function SearchScreen() {
  const { goBack, navigate } = useNavigation()
  const [query, setQuery] = useState('')

  const results = Object.entries(searchResults).flatMap(([key, items]) =>
    query.length > 1 && (query.toLowerCase().includes(key) || key.includes(query.toLowerCase())) ? items : []
  )

  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: '#F8F8FC' }}>
      {/* Search header */}
      <div className="px-5 pt-2 pb-3 flex-shrink-0" style={{ background: '#fff', borderBottom: '1px solid #F2F2F8' }}>
        <div className="flex items-center gap-3">
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, background: '#F1F1F8', borderRadius: 14, padding: '10px 14px' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
              <circle cx="7" cy="7" r="5" stroke="#A0A0B2" strokeWidth="1.8"/>
              <path d="M11 11l2.5 2.5" stroke="#A0A0B2" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Dijital hayatında ara…"
              autoFocus
              style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: 15, color: '#0F0F1A', letterSpacing: '-0.01em' }}
            />
            {query && (
              <button onClick={() => setQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#A0A0B2', lineHeight: 1 }}>✕</button>
            )}
          </div>
          <button onClick={goBack} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: '#5B5CE2', flexShrink: 0 }}>
            İptal
          </button>
        </div>
      </div>

      <div className="flex-1 mobile-scroll px-5 pt-4 pb-4">
        {query.length === 0 ? (
          <>
            {/* Recent */}
            <p style={{ fontSize: 11, fontWeight: 700, color: '#A0A0B2', letterSpacing: '0.05em', marginBottom: 10 }}>SON ARAMALAR</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {recentSearches.map(s => (
                <button key={s} onClick={() => setQuery(s)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 0', background: 'none', border: 'none', cursor: 'pointer', borderBottom: '1px solid #F2F2F8', textAlign: 'left' }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ opacity: 0.4 }}><circle cx="8" cy="8" r="6" stroke="#6B6B80" strokeWidth="1.5"/><path d="M8 5v3l2 2" stroke="#6B6B80" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  <span style={{ fontSize: 14, color: '#6B6B80' }}>{s}</span>
                </button>
              ))}
            </div>

            {/* Suggestions */}
            <p style={{ fontSize: 11, fontWeight: 700, color: '#A0A0B2', letterSpacing: '0.05em', marginBottom: 10, marginTop: 20 }}>ÖRNEK ARAMALAR</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['Geçen ay uçak bileti', 'Ekim toplantıları', 'Ödemem gerekenler', 'Mehmet teklif maili'].map(s => (
                <button key={s} onClick={() => setQuery(s)} style={{ background: '#fff', border: '1px solid #E8E8F0', borderRadius: 10, padding: '7px 12px', fontSize: 13, color: '#6B6B80', cursor: 'pointer' }}>
                  {s}
                </button>
              ))}
            </div>
          </>
        ) : results.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#A0A0B2', letterSpacing: '0.05em', marginBottom: 4 }}>
              {results.length} SONUÇ
            </p>
            {results.map((r, i) => (
              <div key={i} onClick={() => r.screen && navigate(r.screen)} style={{ background: '#fff', borderRadius: 14, padding: '14px', boxShadow: '0 1px 3px rgba(15,15,26,0.04)', cursor: r.screen ? 'pointer' : 'default' }}>
                <div className="flex items-start gap-3">
                  <span style={{ fontSize: 20, flexShrink: 0 }}>{r.icon}</span>
                  <div className="flex-1">
                    <p style={{ fontSize: 14, fontWeight: 600, color: '#0F0F1A', marginBottom: 3 }}>{r.title}</p>
                    <p style={{ fontSize: 13, color: '#6B6B80', marginBottom: 8, lineHeight: 1.4 }}>{r.summary}</p>
                    <div className="flex items-center justify-between">
                      <SourceTag source={r.source} />
                      <span style={{ fontSize: 11, color: '#A0A0B2' }}>{r.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <p style={{ fontSize: 32, marginBottom: 8 }}>🔍</p>
            <p style={{ fontSize: 16, fontWeight: 600, color: '#0F0F1A', marginBottom: 4 }}>Sonuç bulunamadı</p>
            <p style={{ fontSize: 13, color: '#A0A0B2' }}>"{query}" için bir şey bulunamadı.</p>
          </div>
        )}
      </div>
    </div>
  )
}
