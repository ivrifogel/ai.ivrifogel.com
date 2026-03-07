import { supabaseAdmin } from '@/lib/supabase'
import EmailComposer from '@/components/admin/EmailComposer'

export default async function EmailPage() {
  const { count } = await supabaseAdmin
    .from('email_subscribers')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true)

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-black">Send Email</h1>
      <EmailComposer subscriberCount={count ?? 0} />
    </div>
  )
}
