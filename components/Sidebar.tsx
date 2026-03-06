'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'

const browseItems = [
  { label: 'All Products', value: 'all' },
  { label: 'Free', value: 'free' },
  { label: 'Paid', value: 'paid' },
  { label: 'Bundles', value: 'bundle' },
  { label: 'Premium', value: 'premium' },
]

const categoryItems = [
  { label: 'Toolkits', value: 'toolkit' },
  { label: 'Templates', value: 'template' },
  { label: 'Courses', value: 'course' },
  { label: 'Generators', value: 'generator' },
]

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  const currentFilter = searchParams.get('filter') || 'all'
  const currentCategory = searchParams.get('category') || ''

  // Close drawer on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname, searchParams])

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  function handleFilterClick(value: string) {
    const params = new URLSearchParams()
    if (value !== 'all') params.set('filter', value)
    router.push(`/browse${params.toString() ? '?' + params.toString() : ''}`, { scroll: false })
  }

  function handleCategoryClick(value: string) {
    const params = new URLSearchParams()
    if (isBrowsePage && currentCategory === value) {
      // Toggle off
    } else {
      params.set('category', value)
    }
    router.push(`/browse${params.toString() ? '?' + params.toString() : ''}`, { scroll: false })
  }

  const isBrowsePage = pathname === '/browse'

  const sidebarContent = (
    <div className="flex h-full flex-col p-4">
      {/* Logo */}
      <div className="mb-6">
        <Link href="/" className="text-sm font-bold tracking-wide text-black">
          INF
        </Link>
        <div className="text-[11px] text-gray-400">ai.ivrifogel.com</div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2">
          <svg className="h-3.5 w-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <span className="text-sm text-gray-400">Search...</span>
        </div>
      </div>

      {/* Browse */}
      <div className="mb-6">
        <div className="mb-2 px-3 text-[10px] font-medium uppercase tracking-[0.1em] text-gray-400">
          Browse
        </div>
        <nav className="space-y-0.5">
          {browseItems.map((item) => {
            const isActive = isBrowsePage && !currentCategory && currentFilter === item.value
            return (
              <button
                key={item.value}
                onClick={() => handleFilterClick(item.value)}
                className={`w-full rounded-md px-3 py-1.5 text-left text-sm transition-colors duration-100 ${
                  isActive
                    ? 'bg-black font-medium text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {item.label}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Categories */}
      <div className="mb-6 border-t border-gray-200 pt-4">
        <div className="mb-2 px-3 text-[10px] font-medium uppercase tracking-[0.1em] text-gray-400">
          Categories
        </div>
        <nav className="space-y-0.5">
          {categoryItems.map((item) => {
            const isActive = isBrowsePage && currentCategory === item.value
            return (
              <button
                key={item.value}
                onClick={() => handleCategoryClick(item.value)}
                className={`w-full rounded-md px-3 py-1.5 text-left text-sm transition-colors duration-100 ${
                  isActive
                    ? 'bg-black font-medium text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {item.label}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Connect - pushed to bottom */}
      <div className="mt-auto border-t border-gray-200 pt-4">
        <div className="mb-2 px-3 text-[10px] font-medium uppercase tracking-[0.1em] text-gray-400">
          Connect
        </div>
        <div className="space-y-1.5 px-3">
          <a href="mailto:start@ivrifogel.com" className="block text-xs text-gray-400 transition-colors hover:text-black">
            start@ivrifogel.com
          </a>
          <span className="block text-xs text-gray-400">Bangkok</span>
          <a href="https://ivrifogel.com" target="_blank" rel="noopener noreferrer" className="block text-xs text-gray-400 transition-colors hover:text-black">
            ivrifogel.com
          </a>
        </div>
        <div className="mt-4 px-3 text-[11px] text-gray-300">
          &copy; 2026 Ivri Fogel
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed left-4 top-4 z-40 flex h-10 w-10 items-center justify-center rounded-md bg-white shadow-sm ring-1 ring-gray-200 lg:hidden"
        aria-label="Open menu"
      >
        <svg className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>

      {/* Desktop sidebar */}
      <aside className="fixed left-0 top-0 hidden h-screen w-[240px] border-r border-border bg-sidebar overflow-y-auto lg:block">
        {sidebarContent}
      </aside>

      {/* Mobile drawer backdrop */}
      {isOpen && (
        <div
          className="sidebar-backdrop fixed inset-0 z-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-[280px] bg-sidebar shadow-lg transition-transform duration-200 ease-out lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Close button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          aria-label="Close menu"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {sidebarContent}
      </aside>
    </>
  )
}
