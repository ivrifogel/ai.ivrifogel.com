import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin',
  robots: 'noindex, nofollow',
}

export default function AdminBaseLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-white">{children}</div>
}
