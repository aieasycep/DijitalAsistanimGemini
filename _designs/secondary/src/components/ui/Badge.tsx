import type { Priority } from '../../types'

interface BadgeProps {
  priority: Priority
  size?: 'sm' | 'md'
}

const labels: Record<Priority, string> = {
  critical: 'KRİTİK',
  upcoming: 'YAKLAŞAN',
  deadline: 'SON TARİH',
  info: 'BİLGİ',
  success: 'TAMAMLANDI',
}

const classMap: Record<Priority, string> = {
  critical: 'badge-critical',
  upcoming: 'badge-upcoming',
  deadline: 'badge-deadline',
  info: 'badge-info',
  success: 'badge-success',
}

export default function Badge({ priority, size = 'sm' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center font-semibold rounded-md ${classMap[priority]}`}
      style={{
        fontSize: size === 'sm' ? 9 : 10,
        padding: size === 'sm' ? '2px 6px' : '3px 8px',
        letterSpacing: '0.06em',
      }}
    >
      {labels[priority]}
    </span>
  )
}
