import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { resend } from '@/lib/resend'

export async function POST(req: NextRequest) {
  const { subject, html } = await req.json()

  if (!subject || !html) {
    return NextResponse.json({ error: 'Subject and body are required' }, { status: 400 })
  }

  // Fetch all active subscribers
  const { data: subscribers, error } = await supabaseAdmin
    .from('email_subscribers')
    .select('email')
    .eq('is_active', true)

  if (error || !subscribers) {
    return NextResponse.json({ error: 'Failed to fetch subscribers' }, { status: 500 })
  }

  if (subscribers.length === 0) {
    return NextResponse.json({ error: 'No active subscribers' }, { status: 400 })
  }

  // Wrap in email template
  const emailHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 500px; margin: 0 auto; padding: 40px 20px;">
      ${html}
      <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;" />
      <p style="color: #999; font-size: 11px;">
        You received this because you downloaded a tool from ai.ivrifogel.com.<br/>
        <a href="mailto:start@ivrifogel.com?subject=Unsubscribe" style="color: #999;">Unsubscribe</a>
      </p>
    </div>
  `

  // Batch send in groups of 50
  const BATCH_SIZE = 50
  let sent = 0
  let failed = 0
  const errors: string[] = []

  for (let i = 0; i < subscribers.length; i += BATCH_SIZE) {
    const batch = subscribers.slice(i, i + BATCH_SIZE)

    try {
      await resend.batch.send(
        batch.map((sub) => ({
          from: 'AI Tools <noreply@ivrifogel.com>',
          to: sub.email,
          subject,
          html: emailHtml,
        }))
      )
      sent += batch.length
    } catch (err) {
      failed += batch.length
      errors.push(`Batch ${Math.floor(i / BATCH_SIZE) + 1}: ${err}`)
    }

    // Delay between batches
    if (i + BATCH_SIZE < subscribers.length) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }
  }

  return NextResponse.json({ sent, failed, total: subscribers.length, errors })
}
