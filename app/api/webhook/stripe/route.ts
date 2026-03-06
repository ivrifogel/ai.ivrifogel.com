import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { supabaseAdmin } from '@/lib/supabase'
import { generateToken, getSiteUrl } from '@/lib/utils'
import { resend } from '@/lib/resend'
import Stripe from 'stripe'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    const productId = session.metadata?.product_id
    const email = session.metadata?.email || session.customer_email || ''

    if (!productId) {
      console.error('Missing product_id in session metadata')
      return NextResponse.json({ received: true })
    }

    const token = generateToken()
    const siteUrl = getSiteUrl()
    const downloadUrl = `${siteUrl}/download/${token}`

    // Create purchase record
    await supabaseAdmin.from('purchases').insert({
      product_id: productId,
      email,
      stripe_session_id: session.id,
      stripe_payment_id: session.payment_intent as string,
      amount_cents: session.amount_total,
      currency: session.currency || 'usd',
      status: 'completed',
      download_token: token,
    })

    // Save email subscriber (non-blocking)
    if (email) {
      try {
        await supabaseAdmin
          .from('email_subscribers')
          .upsert({ email, source: `purchase-${productId}` }, { onConflict: 'email' })
      } catch {}
    }

    // Get product name for email
    const { data: product } = await supabaseAdmin
      .from('products')
      .select('name')
      .eq('id', productId)
      .single()

    const productName = product?.name || 'Your purchase'
    const amountPaid = session.amount_total
      ? `$${(session.amount_total / 100).toFixed(2)}`
      : ''

    // Send confirmation email
    if (email) {
      try {
        await resend.emails.send({
          from: 'AI Tools <noreply@ivrifogel.com>',
          to: email,
          subject: `Your purchase — ${productName}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 500px; margin: 0 auto; padding: 40px 20px;">
              <h1 style="font-size: 24px; font-weight: 700; margin-bottom: 8px;">Payment successful</h1>
              <p style="color: #666; margin-bottom: 4px;">${productName}</p>
              ${amountPaid ? `<p style="color: #666; margin-bottom: 24px;">Amount paid: ${amountPaid}</p>` : ''}
              <a href="${downloadUrl}" style="display: inline-block; background: #000; color: #fff; padding: 14px 28px; border-radius: 999px; text-decoration: none; font-size: 14px; font-weight: 500;">
                Download Now
              </a>
              <p style="color: #999; font-size: 12px; margin-top: 32px;">This link expires after 5 downloads.</p>
            </div>
          `,
        })
      } catch {
        console.error('Failed to send purchase confirmation email')
      }
    }
  }

  return NextResponse.json({ received: true })
}
