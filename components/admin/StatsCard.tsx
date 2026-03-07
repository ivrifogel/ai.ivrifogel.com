type StatsCardProps = {
  label: string
  value: number | string
  subtitle?: string
}

export default function StatsCard({ label, value, subtitle }: StatsCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5">
      <div className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
        {label}
      </div>
      <div className="mt-1 text-3xl font-bold text-black">{value}</div>
      {subtitle && (
        <div className="mt-1 text-xs text-gray-400">{subtitle}</div>
      )}
    </div>
  )
}
