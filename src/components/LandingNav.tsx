import { Link } from '@tanstack/react-router'

export default function LandingNav() {
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
            className="text-sm font-medium text-white/90 hover:text-white transition-colors"
          >
            About
          </a>
          <Link
            to="/components/hero"
            className="text-sm font-medium text-white/90 hover:text-white transition-colors"
          >
            Work
          </Link>
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
