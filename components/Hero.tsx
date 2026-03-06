export default function Hero() {
  return (
    <section className="relative bg-white px-6 pb-8 pt-[100px]">
      <div className="mx-auto max-w-7xl text-center">
        <div className="hero-fade-1 mb-4 text-xs font-medium uppercase tracking-[0.3em] text-muted-light">
          (01) AI Tools
        </div>

        <h1 className="hero-fade-2 mx-auto mb-4 max-w-3xl text-3xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          <span className="shiny-text">AI Tools That Actually Work</span>
        </h1>

        <p className="hero-fade-3 mx-auto mb-8 max-w-lg text-base leading-relaxed text-body sm:text-lg">
          Handcrafted tools, templates, and starter kits to help you build faster with AI.
        </p>

        <a
          href="#catalog"
          className="hero-fade-4 group inline-flex items-center gap-2 rounded-lg bg-foreground px-6 py-2.5 text-sm font-medium text-white transition-all hover:opacity-90"
        >
          Browse Tools
          <svg
            className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>

      {/* Subtle marquee */}
      <div className="mt-12 overflow-hidden py-3">
        <div className="animate-marquee flex whitespace-nowrap">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="mx-6 text-[10px] font-medium uppercase tracking-[0.2em] text-[#d1d5db]">
              AI TOOLS · TEMPLATES · STARTER KITS · DIGITAL PRODUCTS
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
