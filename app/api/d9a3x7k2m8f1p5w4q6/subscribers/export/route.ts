import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('email_subscribers')
    .select('email, source, subscribed_at, is_active')
    .eq('is_active', true)
    .order('subscribed_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const csv = [
    'email,source,subscribed_at,is_active',
    ...(data ?? []).map(
      (s) => `${s.email},${s.source ?? ''},${s.subscribed_at},${s.is_active}`
    ),
  ].join('\n')

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename=subscribers-${new Date().toISOString().slice(0, 10)}.csv`,
    },
  })
}
