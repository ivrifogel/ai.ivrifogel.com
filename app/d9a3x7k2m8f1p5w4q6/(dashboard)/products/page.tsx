import { supabaseAdmin } from '@/lib/supabase'
import { mockProducts } from '@/lib/mock-data'
import ProductTable from '@/components/admin/ProductTable'

export default async function ProductsPage() {
  let products = mockProducts
  try {
    const { data } = await supabaseAdmin
      .from('products')
      .select('*')
      .order('sort_order', { ascending: true })
    if (data && data.length > 0) products = data
  } catch {}

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-black">Products</h1>
      <ProductTable products={products} />
    </div>
  )
}
