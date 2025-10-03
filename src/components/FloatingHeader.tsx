import { useState, useEffect } from "react"
import Button from "./Button.tsx"

export function FloatingHeader() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Check if user has scrolled past the viewport height
      setIsScrolled(window.scrollY > window.innerHeight)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div
        className={`transition-all duration-500 ease-in-out ${
          isScrolled 
            ? "mx-0 my-0 rounded-none" 
            : "mx-6 my-4 rounded-full bg-white shadow-lg"
        }`}
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-xl font-semibold text-gray-900">Header Inc.</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#portfolio" className="text-gray-600 hover:text-gray-900 transition-colors">
              Portfolio
            </a>
            <a href="#services" className="text-gray-600 hover:text-gray-900 transition-colors">
              Services
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
              Pricing
            </a>
          </nav>

          {/* CTA Button */}
          <Button 
            variant="primary" 
            className="bg-gray-900 text-white hover:bg-gray-800 rounded-full px-6"
          >
            Book A Free Call
          </Button>
        </div>
      </div>
    </header>
  )
}

export default FloatingHeader
