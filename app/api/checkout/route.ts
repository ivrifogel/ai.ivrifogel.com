import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { supabaseAdmin } from '@/lib/supabase'
import { getSiteUrl } from '@/lib/utils'
import { mockProducts } from '@/lib/mock-data'

export async function POST(req: NextRequest) {
  try {
    const { productId, email } = await req.json()

    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 })
    }

    // TODO: Replace with Supabase query when connected
    // const { data: product } = await supabaseAdmin.from('products').select('*').eq('id', productId).single()
    const product = mockProducts.find((p) => p.id === productId)

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    if (product.price_cents === 0) {
      return NextResponse.json({ error: 'This product is free' }, { status: 400 })
    }

    const siteUrl = getSiteUrl()

    // Save email subscriber if provided
    if (email) {
      await supabaseAdmin
        .from('email_subscribers')
        .upsert({ email, source: product.slug }, { onConflict: 'email' })
        .catch(() => {}) // Non-blocking
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              description: product.short_desc || undefined,
            },
            unit_amount: product.price_cents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/products/${product.slug}`,
      customer_email: email || undefined,
      metadata: {
        product_id: product.id,
        email: email || '',
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Checkout error:', err)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
