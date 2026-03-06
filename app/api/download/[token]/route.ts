import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params

  if (!token) {
    return NextResponse.json({ error: 'Token is required' }, { status: 400 })
  }

  // Look up purchase by token
  const { data: purchase, error } = await supabaseAdmin
    .from('purchases')
    .select('*, products(*)')
    .eq('download_token', token)
    .single()

  if (error || !purchase) {
    return NextResponse.json({ error: 'Invalid download token' }, { status: 404 })
  }

  // Check download limit
  if (purchase.download_count >= 5) {
    return NextResponse.json(
      { error: 'Download limit reached. Contact support at start@ivrifogel.com' },
      { status: 403 }
    )
  }

  const product = purchase.products
  if (!product?.file_path) {
    return NextResponse.json({ error: 'File not available' }, { status: 404 })
  }

  // Generate signed URL from Supabase Storage
  const { data: signedUrl, error: storageError } = await supabaseAdmin.storage
    .from('product-files')
    .createSignedUrl(product.file_path, 3600) // 1 hour expiry

  if (storageError || !signedUrl) {
    return NextResponse.json({ error: 'Failed to generate download link' }, { status: 500 })
  }

  // Increment download count
  await supabaseAdmin
    .from('purchases')
    .update({ download_count: purchase.download_count + 1 })
    .eq('id', purchase.id)

  return NextResponse.redirect(signedUrl.signedUrl)
}
