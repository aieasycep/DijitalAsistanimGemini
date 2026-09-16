const COLORS = [
  { bg: '#5B5CE2', text: '#fff' },
  { bg: '#34C759', text: '#fff' },
  { bg: '#FF9F0A', text: '#fff' },
  { bg: '#FF3B30', text: '#fff' },
  { bg: '#8B5CF6', text: '#fff' },
  { bg: '#007AFF', text: '#fff' },
]

function colorForInitials(initials: string) {
  const idx = (initials.charCodeAt(0) + (initials.charCodeAt(1) || 0)) % COLORS.length
  return COLORS[idx]
}

interface AvatarProps {
  initials: string
  size?: number
  color?: string
}

export default function Avatar({ initials, size = 36, color }: AvatarProps) {
  const { bg, text } = color ? { bg: color, text: '#fff' } : colorForInitials(initials)
  return (
    <div
      className="flex items-center justify-center rounded-full flex-shrink-0"
      style={{
        width: size,
        height: size,
        background: bg,
        fontSize: size * 0.37,
        fontWeight: 600,
        color: text,
        letterSpacing: '-0.02em',
      }}
    >
      {initials}
    </div>
  )
}
