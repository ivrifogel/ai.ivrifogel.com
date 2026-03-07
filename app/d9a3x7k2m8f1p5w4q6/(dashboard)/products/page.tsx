import { supabaseAdmin } from '@/lib/supabase'
import ProductTable from '@/components/admin/ProductTable'

export default async function ProductsPage() {
  const { data } = await supabaseAdmin
    .from('products')
    .select('*')
    .order('sort_order', { ascending: true })

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-black">Products</h1>
      <ProductTable products={data ?? []} />
    </div>
  )
}
