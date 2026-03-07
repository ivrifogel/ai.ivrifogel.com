'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ADMIN_SLUG } from '@/lib/admin-config'

const navItems = [
  { label: 'Dashboard', href: `/${ADMIN_SLUG}` },
  { label: 'Subscribers', href: `/${ADMIN_SLUG}/subscribers` },
  { label: 'Products', href: `/${ADMIN_SLUG}/products` },
  { label: 'Send Email', href: `/${ADMIN_SLUG}/email` },
]

export default function AdminNav() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    await fetch(`/api/${ADMIN_SLUG}/logout`, { method: 'POST' })
    router.push(`/${ADMIN_SLUG}/login`)
  }

  return (
    <nav className="border-b border-gray-200 bg-white px-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="rounded bg-black px-2 py-0.5 text-xs font-bold text-white">
            ADMIN
          </span>
          <div className="flex gap-1">
            {navItems.map((item) => {
              const isActive =
                item.href === `/${ADMIN_SLUG}`
                  ? pathname === `/${ADMIN_SLUG}`
                  : pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                    isActive
                      ? 'bg-gray-100 font-medium text-black'
                      : 'text-gray-500 hover:text-black'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-gray-400 transition-colors hover:text-black"
        >
          Logout
        </button>
      </div>
    </nav>
  )
}
