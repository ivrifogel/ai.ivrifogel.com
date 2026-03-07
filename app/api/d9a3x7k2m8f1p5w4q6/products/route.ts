import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { mockProducts } from '@/lib/mock-data'

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('products')
      .select('*')
      .order('sort_order', { ascending: true })

    if (!error && data && data.length > 0) {
      return NextResponse.json({ products: data })
    }
  } catch {}

  return NextResponse.json({ products: mockProducts })
}

export async function POST(req: NextRequest) {
  const body = await req.json()

  const { data, error } = await supabaseAdmin
    .from('products')
    .insert({
      name: body.name,
      slug: body.slug,
      description: body.description || null,
      short_desc: body.short_desc || null,
      price_cents: body.price_cents || 0,
      type: body.type || 'free',
      category: body.category || null,
      file_path: body.file_path || null,
      demo_url: body.demo_url || null,
      thumbnail_url: body.thumbnail_url || null,
      features: body.features || [],
      is_published: body.is_published ?? true,
      sort_order: body.sort_order || 0,
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ product: data })
}
