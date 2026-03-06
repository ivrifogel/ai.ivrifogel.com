import type { Metadata } from 'next'
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
        <link rel="icon" href="https://byyqqelacuorqpnxfhmv.supabase.co/storage/v1/object/public/ivrifogel.com/INF%20Logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-white text-foreground antialiased">
        {children}
      </body>
    </html>
  )
}
