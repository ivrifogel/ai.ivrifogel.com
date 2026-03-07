import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { generateToken, getSiteUrl } from '@/lib/utils'
import { resend } from '@/lib/resend'
import { mockProducts } from '@/lib/mock-data'

export async function POST(req: NextRequest) {
  try {
    const { productId, email, firstName } = await req.json()

    if (!productId || !email) {
      return NextResponse.json({ error: 'Product ID and email are required' }, { status: 400 })
    }

    if (!firstName?.trim()) {
      return NextResponse.json({ error: 'First name is required' }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const cleanName = firstName.trim()

    // Try Supabase first, fall back to mock data
    let product = mockProducts.find((p) => p.id === productId) || null
    try {
      const { data } = await supabaseAdmin
        .from('products')
        .select('*')
        .eq('id', productId)
        .single()
      if (data) product = data
    } catch {}

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    const token = generateToken()
    const siteUrl = getSiteUrl()

    // If the product has a direct public URL, use it directly
    const downloadUrl = product.file_path?.startsWith('http')
      ? product.file_path
      : `${siteUrl}/download/${token}`

    // Save email subscriber (non-blocking)
    try {
      await supabaseAdmin
        .from('email_subscribers')
        .upsert(
          { email, first_name: cleanName, source: product.slug },
          { onConflict: 'email' }
        )
    } catch {}

    // Create purchase record (non-blocking)
    try {
      await supabaseAdmin
        .from('purchases')
        .insert({
          product_id: product.id,
          email,
          amount_cents: 0,
          status: 'completed',
          download_token: token,
        })
    } catch {}

    // Send email with download link
    try {
      await resend.emails.send({
        from: 'AI Tools <noreply@ivrifogel.com>',
        to: email,
        subject: `${cleanName}, your free download is ready`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 500px; margin: 0 auto; padding: 40px 20px;">
            <h1 style="font-size: 24px; font-weight: 700; margin-bottom: 8px;">Hey ${cleanName}, your download is ready</h1>
            <p style="color: #666; margin-bottom: 24px;">${product.name}</p>
            <a href="${downloadUrl}" style="display: inline-block; background: #000; color: #fff; padding: 14px 28px; border-radius: 999px; text-decoration: none; font-size: 14px; font-weight: 500;">
              Download Now
            </a>
            <p style="color: #999; font-size: 12px; margin-top: 32px;">This link expires after 5 downloads.</p>
          </div>
        `,
      })
    } catch {
      // Email sending is non-blocking
      console.error('Failed to send email')
    }

    return NextResponse.json({ downloadUrl })
  } catch (err) {
    console.error('Free download error:', err)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
