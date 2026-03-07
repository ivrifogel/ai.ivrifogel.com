import ProductGrid from '@/components/ProductGrid'
import { mockProducts } from '@/lib/mock-data'

type SearchParams = Promise<{ filter?: string; category?: string }>

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const params = await searchParams
  const filter = params.filter || 'all'
  const category = params.category || ''

  // TODO: Replace with Supabase query when connected
  let products = mockProducts

  if (filter !== 'all') {
    products = products.filter((p) => p.type === filter)
  }

  if (category) {
    products = products.filter((p) => p.category === category)
  }

  return (
    <>
      {/* Top bar */}
      <div className="sticky top-0 z-10 border-b border-border-subtle bg-white px-4 py-6 pt-16 sm:px-8 lg:pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Browse Tools</h1>
            <p className="mt-0.5 text-sm text-gray-400">
              Handcrafted AI tools and templates
            </p>
          </div>
          <span className="text-sm text-gray-400">
            {products.length} product{products.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Product grid */}
      <div className="px-4 py-6 sm:px-8">
        <ProductGrid products={products} />
      </div>
    </>
  )
}
