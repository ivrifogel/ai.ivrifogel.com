import { Product } from '@/lib/supabase'
import ProductCard from './ProductCard'

type ProductGridProps = {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product, i) => (
        <div
          key={product.id}
          className="card-fade-in"
          style={{ animationDelay: `${i * 30}ms` }}
        >
          <ProductCard product={product} />
        </div>
      ))}

      {products.length === 0 && (
        <div className="col-span-full py-20 text-center text-sm text-gray-400">
          No products found.
        </div>
      )}
    </div>
  )
}
