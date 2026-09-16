interface ChipProps {
  label: string
  selected?: boolean
  onClick?: () => void
}

export default function Chip({ label, selected = false, onClick }: ChipProps) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        height: 32,
        padding: '0 14px',
        borderRadius: 16,
        fontSize: 13,
        fontWeight: selected ? 600 : 500,
        color: selected ? '#5B5CE2' : '#6B6B80',
        background: selected ? 'rgba(91,92,226,0.1)' : 'rgba(241,241,248,0.8)',
        border: selected ? '1.5px solid rgba(91,92,226,0.3)' : '1px solid transparent',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        letterSpacing: '-0.01em',
        whiteSpace: 'nowrap',
        flexShrink: 0,
      }}
    >
      {label}
    </button>
  )
}
