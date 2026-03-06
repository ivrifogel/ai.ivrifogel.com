import { Suspense } from 'react'
import Sidebar from '@/components/Sidebar'

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <Suspense>
        <Sidebar />
      </Suspense>
      <main className="min-h-screen flex-1 lg:ml-[240px]">
        {children}
      </main>
    </div>
  )
}
