interface SourceTagProps {
  source: string
  onClick?: () => void
}

const sourceColors: Record<string, { bg: string; color: string; dot: string }> = {
  gmail: { bg: 'rgba(234,67,53,0.08)', color: '#C23121', dot: '#EA4335' },
  outlook: { bg: 'rgba(0,114,198,0.08)', color: '#0072C6', dot: '#0072C6' },
  calendar: { bg: 'rgba(52,168,83,0.08)', color: '#1E7E34', dot: '#34A853' },
  apple: { bg: 'rgba(0,122,255,0.08)', color: '#0066CC', dot: '#007AFF' },
  default: { bg: 'rgba(107,107,128,0.08)', color: '#6B6B80', dot: '#A0A0B2' },
}

function getSourceStyle(source: string) {
  const lower = source.toLowerCase()
  if (lower.includes('gmail')) return sourceColors.gmail
  if (lower.includes('outlook')) return sourceColors.outlook
  if (lower.includes('calendar')) return sourceColors.calendar
  if (lower.includes('apple')) return sourceColors.apple
  return sourceColors.default
}

export default function SourceTag({ source, onClick }: SourceTagProps) {
  const style = getSourceStyle(source)
  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        padding: '3px 8px',
        borderRadius: 6,
        background: style.bg,
        border: 'none',
        cursor: onClick ? 'pointer' : 'default',
        maxWidth: '100%',
      }}
    >
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: style.dot, flexShrink: 0 }} />
      <span style={{ fontSize: 11, fontWeight: 500, color: style.color, letterSpacing: '-0.01em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {source}
      </span>
    </button>
  )
}
