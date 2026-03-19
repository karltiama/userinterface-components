import { Link } from '@tanstack/react-router'

const SCROLL_OFFSET_PX = 60
const SCROLL_DURATION_MS = 900

function smoothScrollTo(el: HTMLElement, offsetPx: number, durationMs: number) {
  const start = window.scrollY
  const end = el.getBoundingClientRect().top + start - offsetPx
  const startTime = performance.now()

  function step(now: number) {
    const t = Math.min((now - startTime) / durationMs, 1)
    const eased = 1 - (1 - t) ** 2 // easeOutQuad
    window.scrollTo(0, start + (end - start) * eased)
    if (t < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

export default function LandingNav() {
  function handleAboutClick(e: React.MouseEvent<HTMLAnchorElement>) {
    const about = document.getElementById('about')
    if (!about) return
    e.preventDefault()
    smoothScrollTo(about, SCROLL_OFFSET_PX, SCROLL_DURATION_MS)
  }

  function handleWorkClick(e: React.MouseEvent<HTMLAnchorElement>) {
    const work = document.getElementById('work')
    if (!work) return
    e.preventDefault()
    smoothScrollTo(work, SCROLL_OFFSET_PX, SCROLL_DURATION_MS)
  }

  function handleBlogClick(e: React.MouseEvent<HTMLAnchorElement>) {
    const blog = document.getElementById('blog')
    if (!blog) return
    e.preventDefault()
    smoothScrollTo(blog, SCROLL_OFFSET_PX, SCROLL_DURATION_MS)
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-4 text-white"
      role="navigation"
    >
      {/* Subtle backdrop so nav stays readable over terrain */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm pointer-events-none" />

      <div className="relative z-10 flex items-center justify-between w-full max-w-6xl mx-auto">
        <Link
          to="/landing"
          className="text-lg font-semibold text-white hover:text-gray-200 transition-colors"
        >
          Karl
        </Link>

        <div className="flex items-center gap-8">
          <a
            href="#about"
            onClick={handleAboutClick}
            className="text-sm font-medium text-white/90 hover:text-white transition-colors"
          >
            About
          </a>
          <a
            href="#work"
            onClick={handleWorkClick}
            className="text-sm font-medium text-white/90 hover:text-white transition-colors"
          >
            Work
          </a>
          <a
            href="#blog"
            onClick={handleBlogClick}
            className="text-sm font-medium text-white/90 hover:text-white transition-colors"
          >
            Blog
          </a>
          <a
            href="#contact"
            className="text-sm font-medium text-white/90 hover:text-white transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  )
}
