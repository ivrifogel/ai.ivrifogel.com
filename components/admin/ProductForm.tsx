'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ADMIN_SLUG } from '@/lib/admin-config'

type ProductData = {
  id?: string
  name: string
  slug: string
  description: string
  short_desc: string
  price_cents: number
  type: 'free' | 'paid' | 'bundle' | 'premium'
  category: string
  file_path: string
  demo_url: string
  thumbnail_url: string
  features: string[]
  is_published: boolean
  sort_order: number
}

const emptyProduct: ProductData = {
  name: '',
  slug: '',
  description: '',
  short_desc: '',
  price_cents: 0,
  type: 'free',
  category: '',
  file_path: '',
  demo_url: '',
  thumbnail_url: '',
  features: [],
  is_published: true,
  sort_order: 0,
}

export default function ProductForm({ product }: { product?: ProductData }) {
  const [form, setForm] = useState<ProductData>(product ?? emptyProduct)
  const [featuresText, setFeaturesText] = useState(
    (product?.features ?? []).join('\n')
  )
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  function updateField<K extends keyof ProductData>(key: K, value: ProductData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function handleSlugify() {
    const slug = form.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    updateField('slug', slug)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')

    const payload = {
      ...form,
      features: featuresText.split('\n').map((f) => f.trim()).filter(Boolean),
    }

    const isEdit = !!product?.id
    const url = isEdit
      ? `/api/${ADMIN_SLUG}/products/${product.id}`
      : `/api/${ADMIN_SLUG}/products`

    const res = await fetch(url, {
      method: isEdit ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const data = await res.json()
      setError(data.error || 'Something went wrong')
      setSaving(false)
      return
    }

    router.push(`/${ADMIN_SLUG}/products`)
    router.refresh()
  }

  const inputClass =
    'w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-black placeholder:text-gray-400 focus:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-200'

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      {/* Name + Slug */}
      <div>
        <label className="mb-1 block text-xs font-medium text-gray-500">Name</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => updateField('name', e.target.value)}
          onBlur={() => !form.slug && handleSlugify()}
          required
          className={inputClass}
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-gray-500">Slug</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={form.slug}
            onChange={(e) => updateField('slug', e.target.value)}
            required
            className={inputClass}
          />
          <button
            type="button"
            onClick={handleSlugify}
            className="whitespace-nowrap rounded-lg border border-gray-200 px-3 py-2 text-xs text-gray-500 hover:bg-gray-50"
          >
            Auto
          </button>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-gray-500">Short Description</label>
        <input
          type="text"
          value={form.short_desc}
          onChange={(e) => updateField('short_desc', e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-gray-500">Full Description (Markdown)</label>
        <textarea
          value={form.description}
          onChange={(e) => updateField('description', e.target.value)}
          rows={6}
          className={inputClass}
        />
      </div>

      {/* Type + Price + Category */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">Type</label>
          <select
            value={form.type}
            onChange={(e) => updateField('type', e.target.value as ProductData['type'])}
            className={inputClass}
          >
            <option value="free">Free</option>
            <option value="paid">Paid</option>
            <option value="bundle">Bundle</option>
            <option value="premium">Premium</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">Price (cents)</label>
          <input
            type="number"
            value={form.price_cents}
            onChange={(e) => updateField('price_cents', parseInt(e.target.value) || 0)}
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">Category</label>
          <input
            type="text"
            value={form.category}
            onChange={(e) => updateField('category', e.target.value)}
            placeholder="e.g. claude-plugins"
            className={inputClass}
          />
        </div>
      </div>

      {/* URLs */}
      <div>
        <label className="mb-1 block text-xs font-medium text-gray-500">Thumbnail URL</label>
        <input
          type="url"
          value={form.thumbnail_url}
          onChange={(e) => updateField('thumbnail_url', e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-gray-500">File Path / Download URL</label>
        <input
          type="text"
          value={form.file_path}
          onChange={(e) => updateField('file_path', e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-gray-500">Demo URL</label>
        <input
          type="url"
          value={form.demo_url}
          onChange={(e) => updateField('demo_url', e.target.value)}
          className={inputClass}
        />
      </div>

      {/* Features */}
      <div>
        <label className="mb-1 block text-xs font-medium text-gray-500">
          Features (one per line)
        </label>
        <textarea
          value={featuresText}
          onChange={(e) => setFeaturesText(e.target.value)}
          rows={4}
          placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
          className={inputClass}
        />
      </div>

      {/* Sort + Published */}
      <div className="flex items-center gap-6">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">Sort Order</label>
          <input
            type="number"
            value={form.sort_order}
            onChange={(e) => updateField('sort_order', parseInt(e.target.value) || 0)}
            className="w-24 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-black focus:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-200"
          />
        </div>
        <label className="flex items-center gap-2 pt-4">
          <input
            type="checkbox"
            checked={form.is_published}
            onChange={(e) => updateField('is_published', e.target.checked)}
            className="h-4 w-4 rounded border-gray-300"
          />
          <span className="text-sm text-gray-600">Published</span>
        </label>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-black px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {saving ? 'Saving...' : product?.id ? 'Update Product' : 'Create Product'}
        </button>
        <button
          type="button"
          onClick={() => router.push(`/${ADMIN_SLUG}/products`)}
          className="rounded-lg border border-gray-200 px-6 py-2.5 text-sm text-gray-600 hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
