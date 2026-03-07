import { supabaseAdmin } from '@/lib/supabase'
import StatsCard from '@/components/admin/StatsCard'
import GrowthChart from '@/components/admin/GrowthChart'
import SourceBreakdown from '@/components/admin/SourceBreakdown'

export default async function AdminDashboardPage() {
  // Total subscribers
  const { count: total } = await supabaseAdmin
    .from('email_subscribers')
    .select('*', { count: 'exact', head: true })

  // Active subscribers
  const { count: active } = await supabaseAdmin
    .from('email_subscribers')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true)

  // New this week
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  const { count: newThisWeek } = await supabaseAdmin
    .from('email_subscribers')
    .select('*', { count: 'exact', head: true })
    .gte('subscribed_at', weekAgo)

  // Growth data
  const { data: growthData } = await supabaseAdmin
    .from('email_subscribers')
    .select('subscribed_at')
    .order('subscribed_at', { ascending: true })

  // Source data
  const { data: sourceData } = await supabaseAdmin
    .from('email_subscribers')
    .select('source')

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-black">Dashboard</h1>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatsCard label="Total Subscribers" value={total ?? 0} />
        <StatsCard label="Active" value={active ?? 0} />
        <StatsCard label="New This Week" value={newThisWeek ?? 0} />
      </div>

      {/* Growth chart */}
      <div className="mb-8 rounded-lg border border-gray-200 bg-white p-5">
        <h2 className="mb-4 text-sm font-semibold text-black">Subscriber Growth (30 days)</h2>
        <GrowthChart data={growthData ?? []} />
      </div>

      {/* Source breakdown */}
      <div className="rounded-lg border border-gray-200 bg-white p-5">
        <h2 className="mb-4 text-sm font-semibold text-black">Signups by Source</h2>
        <SourceBreakdown data={sourceData ?? []} />
      </div>
    </div>
  )
}
