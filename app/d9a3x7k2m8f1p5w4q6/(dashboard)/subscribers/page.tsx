import { supabaseAdmin } from '@/lib/supabase'
import SubscriberTable from '@/components/admin/SubscriberTable'

export default async function SubscribersPage() {
  const { data, count } = await supabaseAdmin
    .from('email_subscribers')
    .select('*', { count: 'exact' })
    .order('subscribed_at', { ascending: false })
    .range(0, 49)

  const initial = {
    subscribers: data ?? [],
    total: count ?? 0,
    page: 1,
    totalPages: Math.ceil((count ?? 0) / 50),
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-black">Subscribers</h1>
      <SubscriberTable initial={initial} />
    </div>
  )
}
