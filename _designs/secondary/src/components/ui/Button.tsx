import type { ReactNode, ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  children: ReactNode
  fullWidth?: boolean
  icon?: ReactNode
}

const variantStyles: Record<Variant, string> = {
  primary: 'text-white border-none',
  secondary: 'text-primary border-primary bg-primary-soft',
  tertiary: 'bg-surface-3 text-text-primary border-none',
  danger: 'text-white border-none',
  ghost: 'bg-transparent text-text-secondary border-none',
}

const variantBg: Record<Variant, string> = {
  primary: 'linear-gradient(135deg, #5B5CE2 0%, #4647C7 100%)',
  secondary: 'transparent',
  tertiary: 'transparent',
  danger: 'linear-gradient(135deg, #FF3B30 0%, #E02E24 100%)',
  ghost: 'transparent',
}

const sizeStyles: Record<Size, { padding: string; fontSize: number; height: number; radius: number }> = {
  sm: { padding: '0 14px', fontSize: 13, height: 32, radius: 10 },
  md: { padding: '0 18px', fontSize: 15, height: 40, radius: 12 },
  lg: { padding: '0 24px', fontSize: 16, height: 50, radius: 14 },
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth = false,
  icon,
  style,
  ...props
}: ButtonProps) {
  const sz = sizeStyles[size]

  return (
    <button
      {...props}
      className={`${variantStyles[variant]} flex items-center justify-center gap-2 font-semibold transition-all ${fullWidth ? 'w-full' : ''}`}
      style={{
        background: variantBg[variant],
        height: sz.height,
        padding: sz.padding,
        fontSize: sz.fontSize,
        borderRadius: sz.radius,
        border: variant === 'secondary' ? '1.5px solid #5B5CE2' : 'none',
        cursor: 'pointer',
        letterSpacing: '-0.01em',
        ...style,
      }}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  )
}
