'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

const navItems = [
  {
    label: 'Products',
    bgColor: '#f5f5f5',
    textColor: '#0a0a0a',
    links: [
      { label: 'Browse All', href: '/#catalog' },
      { label: 'Free Tools', href: '/#catalog' },
      { label: 'Bundles', href: '/#catalog' },
    ],
  },
  {
    label: 'About',
    bgColor: '#0a0a0a',
    textColor: '#ffffff',
    links: [
      { label: 'Portfolio', href: 'https://ivrifogel.com', external: true },
      { label: 'Instagram', href: 'https://instagram.com/ivrifogel', external: true },
      { label: 'LinkedIn', href: 'https://linkedin.com/in/ivrifogel', external: true },
    ],
  },
  {
    label: 'Contact',
    bgColor: '#f5f5f5',
    textColor: '#0a0a0a',
    links: [
      { label: 'Email', href: 'mailto:start@ivrifogel.com' },
      { label: 'Based in Bangkok', href: '#' },
    ],
  },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [contentHeight, setContentHeight] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!contentRef.current) return
    const measure = () => {
      setContentHeight(contentRef.current?.scrollHeight || 0)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const toggle = () => setIsOpen((prev) => !prev)

  return (
    <div className="fixed left-1/2 top-4 z-50 w-[92%] max-w-[800px] -translate-x-1/2 sm:top-5">
      <nav
        className="overflow-hidden rounded-xl bg-white shadow-lg shadow-black/[0.08] ring-1 ring-black/[0.04] transition-[height] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ height: isOpen ? `${60 + contentHeight + 8}px` : '60px' }}
      >
        {/* Top bar */}
        <div className="relative flex h-[60px] items-center justify-between px-3 pl-5">
          {/* Hamburger */}
          <button
            onClick={toggle}
            className="relative flex h-10 w-8 flex-col items-center justify-center gap-[6px]"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            <span
              className={`block h-[2px] w-[22px] bg-foreground transition-all duration-250 ease-out ${
                isOpen ? 'translate-y-[4px] rotate-45' : ''
              }`}
            />
            <span
              className={`block h-[2px] w-[22px] bg-foreground transition-all duration-250 ease-out ${
                isOpen ? '-translate-y-[4px] -rotate-45' : ''
              }`}
            />
          </button>

          {/* Logo (centered) */}
          <Link
            href="/"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-base font-bold tracking-tight text-foreground"
          >
            INF
          </Link>

          {/* CTA button */}
          <a
            href="mailto:start@ivrifogel.com"
            className="hidden rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-foreground/85 sm:block"
          >
            Get Started
          </a>
        </div>

        {/* Expandable card content */}
        <div
          ref={contentRef}
          className={`flex gap-2 px-2 pb-2 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] max-md:flex-col ${
            isOpen ? 'visible opacity-100' : 'invisible opacity-0'
          }`}
        >
          {navItems.map((item, idx) => (
            <div
              key={item.label}
              className="flex flex-1 flex-col gap-2 rounded-[10px] px-4 py-3 transition-all duration-300 max-md:min-h-[56px]"
              style={{
                backgroundColor: item.bgColor,
                color: item.textColor,
                transitionDelay: isOpen ? `${idx * 60}ms` : '0ms',
                transform: isOpen ? 'translateY(0)' : 'translateY(30px)',
                opacity: isOpen ? 1 : 0,
              }}
            >
              <div className="text-[20px] font-normal tracking-[-0.3px] max-md:text-[17px]">
                {item.label}
              </div>
              <div className="mt-auto flex flex-col gap-[2px]">
                {item.links.map((lnk) => {
                  const isExternal = 'external' in lnk && lnk.external
                  return (
                    <a
                      key={lnk.label}
                      href={lnk.href}
                      target={isExternal ? '_blank' : undefined}
                      rel={isExternal ? 'noopener noreferrer' : undefined}
                      className="inline-flex items-center gap-1.5 text-[15px] transition-opacity hover:opacity-70 max-md:text-[14px]"
                      style={{ color: item.textColor }}
                      onClick={() => setIsOpen(false)}
                    >
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                      </svg>
                      {lnk.label}
                    </a>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  )
}
