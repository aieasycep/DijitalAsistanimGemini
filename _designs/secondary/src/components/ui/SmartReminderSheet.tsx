import { useState } from 'react'
import BottomSheet from '../layout/BottomSheet'

interface SmartReminderSheetProps {
  isOpen: boolean
  onClose: () => void
  context?: string
}

const options = [
  { id: '30m', label: '30 dakika sonra', icon: '⏰' },
  { id: '1h', label: '1 saat sonra', icon: '⏱️' },
  { id: 'evening', label: 'Bu akşam · 19:00', icon: '🌆' },
  { id: 'tomorrow', label: 'Yarın sabah · 08:00', icon: '☀️' },
  { id: 'smart', label: 'Uygun zamanda', icon: '✨' },
  { id: 'custom', label: 'Kendin seç', icon: '📅' },
]

export default function SmartReminderSheet({ isOpen, onClose, context }: SmartReminderSheetProps) {
  const [selected, setSelected] = useState<string | null>(null)
  const [confirmed, setConfirmed] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [customDate, setCustomDate] = useState('')
  const [customTime, setCustomTime] = useState('09:00')

  const handleSelect = (id: string) => {
    setSelected(id)
    if (id === 'custom') {
      setShowDatePicker(true)
    }
  }

  const handleConfirm = () => {
    setConfirmed(true)
    setTimeout(() => {
      setConfirmed(false)
      setSelected(null)
      setShowDatePicker(false)
      onClose()
    }, 1400)
  }

  const selectedLabel = options.find(o => o.id === selected)?.label

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="Hatırlatıcı">
      <div className="px-5 pb-5">
        {confirmed ? (
          <div className="animate-scale-in flex flex-col items-center py-8">
            <div style={{ width: 64, height: 64, borderRadius: 32, background: '#E8F8EE', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12, fontSize: 30 }}>✅</div>
            <p style={{ fontSize: 16, fontWeight: 700, color: '#0F0F1A', marginBottom: 4 }}>Hatırlatıcı Oluşturuldu</p>
            <p style={{ fontSize: 13, color: '#6B6B80' }}>{selectedLabel}</p>
          </div>
        ) : (
          <>
            {context && (
              <div style={{ background: '#F1F1F8', borderRadius: 10, padding: '10px 12px', marginBottom: 16 }}>
                <p style={{ fontSize: 13, color: '#6B6B80', lineHeight: 1.4 }}>{context}</p>
              </div>
            )}

            <p style={{ fontSize: 13, fontWeight: 700, color: '#A0A0B2', letterSpacing: '0.04em', marginBottom: 10 }}>
              NE ZAMAN HATIRLATAYIM?
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
              {options.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => handleSelect(opt.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12, padding: '13px 14px',
                    background: selected === opt.id ? '#EEEEFF' : '#fff',
                    border: selected === opt.id ? '1.5px solid rgba(91,92,226,0.4)' : '1.5px solid #E8E8F0',
                    borderRadius: 12, cursor: 'pointer', textAlign: 'left',
                    transition: 'all 0.15s',
                  }}
                >
                  <span style={{ fontSize: 18 }}>{opt.icon}</span>
                  <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: '#0F0F1A' }}>{opt.label}</span>
                  {selected === opt.id && (
                    <div style={{ width: 18, height: 18, borderRadius: 9, background: '#5B5CE2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {selected === 'smart' && (
              <div className="animate-fade-in" style={{ background: '#EEEEFF', borderRadius: 10, padding: '10px 14px', marginBottom: 12, border: '1px solid rgba(91,92,226,0.2)' }}>
                <p style={{ fontSize: 12, color: '#5B5CE2', lineHeight: 1.5 }}>
                  ✨ Takvimindeki boşluklara göre uygun zamanı Dijital Asistan seçer.
                </p>
              </div>
            )}

            {showDatePicker && selected === 'custom' && (
              <div className="animate-fade-in" style={{ background: '#F8F8FC', borderRadius: 12, padding: '12px', marginBottom: 12, border: '1px solid #E8E8F0' }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: '#A0A0B2', marginBottom: 8 }}>TARİH VE SAAT SEÇ</p>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input
                    type="date"
                    value={customDate}
                    onChange={e => setCustomDate(e.target.value)}
                    style={{ flex: 1, padding: '10px', borderRadius: 10, border: '1.5px solid #E8E8F0', fontSize: 14, color: '#0F0F1A', background: '#fff', outline: 'none' }}
                  />
                  <input
                    type="time"
                    value={customTime}
                    onChange={e => setCustomTime(e.target.value)}
                    style={{ width: 90, padding: '10px', borderRadius: 10, border: '1.5px solid #E8E8F0', fontSize: 14, color: '#0F0F1A', background: '#fff', outline: 'none' }}
                  />
                </div>
              </div>
            )}

            <button
              onClick={handleConfirm}
              disabled={!selected || (selected === 'custom' && !customDate)}
              style={{
                width: '100%', padding: '14px', borderRadius: 14,
                background: selected && !(selected === 'custom' && !customDate) ? 'linear-gradient(135deg, #5B5CE2 0%, #4647C7 100%)' : '#E8E8F0',
                border: 'none', cursor: selected ? 'pointer' : 'not-allowed',
                fontSize: 15, fontWeight: 700,
                color: selected && !(selected === 'custom' && !customDate) ? '#fff' : '#A0A0B2',
                transition: 'all 0.2s',
              }}
            >
              Hatırlatıcı Oluştur
            </button>
          </>
        )}
      </div>
    </BottomSheet>
  )
}
