import { notFound } from 'next/navigation'
import { supabaseAdmin } from '@/lib/supabase'
import { mockProducts } from '@/lib/mock-data'
import ProductForm from '@/components/admin/ProductForm'

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  let product = null
  try {
    const { data } = await supabaseAdmin
      .from('products')
      .select('*')
      .eq('id', id)
      .single()
    if (data) product = data
  } catch {}

  if (!product) {
    product = mockProducts.find((p) => p.id === id) || null
  }

  if (!product) notFound()

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-black">Edit Product</h1>
      <ProductForm product={product} />
    </div>
  )
}
