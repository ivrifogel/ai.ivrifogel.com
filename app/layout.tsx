import type { Metadata } from 'next'
import { Suspense } from 'react'
import Sidebar from '@/components/Sidebar'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Tools | Ivri Fogel',
  description: 'Handcrafted AI tools, templates, and starter kits to help you build faster.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-white text-foreground antialiased">
        <div className="flex min-h-screen">
          <Suspense>
            <Sidebar />
          </Suspense>
          <main className="min-h-screen flex-1 lg:ml-[240px]">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
