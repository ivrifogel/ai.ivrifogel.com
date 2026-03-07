type SectionLabelProps = {
  label: string
  count?: string
  divider?: boolean
}

export default function SectionLabel({ label, count, divider = true }: SectionLabelProps) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-secondary">
          ({label})
        </span>
        {count && (
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-secondary">
            {count}
          </span>
        )}
      </div>
      {divider && <div className="mt-4 border-t border-border" />}
    </div>
  )
}
