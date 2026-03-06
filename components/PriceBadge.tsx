type PriceBadgeProps = {
  type: 'free' | 'paid' | 'bundle' | 'premium'
  priceCents: number
  size?: 'sm' | 'md'
}

export default function PriceBadge({ type, priceCents, size = 'sm' }: PriceBadgeProps) {
  const styles: Record<string, string> = {
    free: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    paid: 'bg-white text-black border-gray-200',
    bundle: 'bg-violet-50 text-violet-600 border-violet-200',
    premium: 'bg-amber-50 text-amber-700 border-amber-200',
  }

  const label =
    priceCents === 0
      ? 'FREE'
      : type === 'bundle'
        ? `$${(priceCents / 100).toFixed(0)} Bundle`
        : `$${(priceCents / 100).toFixed(0)}`

  const sizeClasses = size === 'md' ? 'px-3 py-1 text-sm' : 'px-2 py-0.5 text-[11px]'

  return (
    <span
      className={`inline-block rounded-full border font-medium ${sizeClasses} ${styles[type]}`}
    >
      {label}
    </span>
  )
}
