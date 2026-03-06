import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted">
            <a
              href="https://ivrifogel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              ivrifogel.com
            </a>
            <span className="text-border">·</span>
            <a
              href="https://instagram.com/ivrifogel"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              Instagram
            </a>
            <span className="text-border">·</span>
            <a
              href="https://linkedin.com/in/ivrifogel"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              LinkedIn
            </a>
            <span className="text-border">·</span>
            <Link
              href="mailto:start@ivrifogel.com"
              className="transition-colors hover:text-foreground"
            >
              Contact
            </Link>
          </div>

          <p className="text-xs text-muted-light">
            Built by Ivri Fogel
          </p>
        </div>
      </div>
    </footer>
  )
}
