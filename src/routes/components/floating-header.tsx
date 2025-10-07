import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useRef } from 'react'
import Button from '../../components/Button.tsx'

export const Route = createFileRoute('/components/floating-header')({
  component: FloatingHeaderPage,
})

function FloatingHeaderPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Floating Header Component</h1>
        <p className="text-lg text-gray-600">
          A responsive header that transforms from a floating pill to a full-width header as you scroll.
        </p>
      </div>

      {/* Floating Header Demo */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Live Demo</h2>
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <FloatingHeaderDemo />
        </div>
      </section>

      {/* Component Details */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Component Features</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Initial State</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Floating pill shape with rounded corners</li>
              <li>• Positioned with margins from screen edges</li>
              <li>• Transparent background</li>
              <li>• Subtle shadow for depth</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Scrolled State</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Full-width header</li>
              <li>• White background with shadow</li>
              <li>• No rounded corners</li>
              <li>• Fixed positioning</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Technical Details */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Technical Implementation</h2>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Scroll Detection</h4>
              <p className="text-gray-600">Uses <code className="bg-gray-100 px-2 py-1 rounded">window.scrollY</code> to detect when user scrolls past viewport height.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Smooth Transitions</h4>
              <p className="text-gray-600">CSS transitions with <code className="bg-gray-100 px-2 py-1 rounded">duration-500 ease-in-out</code> for smooth animations.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Responsive Design</h4>
              <p className="text-gray-600">Mobile-friendly navigation with hidden menu on smaller screens.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Constrained Floating Header Component (for demo container)
function ConstrainedFloatingHeader({ isScrolled }: { isScrolled: boolean }) {

  return (
    <header
      className={`absolute top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div
        className={`transition-all duration-500 ease-in-out ${
          isScrolled 
            ? "mx-0 my-0 rounded-none" 
            : "mx-20 my-4 rounded-full bg-white shadow-lg"
        }`}
      >
        <div className={`mx-auto px-6 py-3 flex items-center ${
          isScrolled ? "container justify-between" : "max-w-lg justify-center gap-8"
        }`}>
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-orange-500 rounded-lg flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-white" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-lg font-semibold text-gray-900">Header</span>
          </div>

          {/* Navigation */}
          <nav className={`items-center gap-6 transition-all duration-500 ${
            isScrolled ? "hidden md:flex" : "hidden lg:flex"
          }`}>
            <a href="#portfolio" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
              Portfolio
            </a>
            <a href="#services" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
              Services
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
              Pricing
            </a>
          </nav>

          {/* CTA Button */}
          <Button 
            variant="primary" 
            size="sm"
            className="bg-gray-900 text-white hover:bg-gray-800 rounded-full px-4 py-2 text-sm whitespace-nowrap"
          >
            Book Call
          </Button>
        </div>
      </div>
    </header>
  )
}

// Floating Header Demo Component
function FloatingHeaderDemo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        // Check if user has scrolled past 200px within the container
        setIsScrolled(containerRef.current.scrollTop > 200)
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll)
      return () => container.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div className="relative overflow-hidden" style={{ height: '600px' }}>
      {/* Floating Header - Constrained to container */}
      <ConstrainedFloatingHeader isScrolled={isScrolled} />
      
      {/* Demo Content */}
      <div 
        ref={containerRef}
        className="bg-gradient-to-br from-blue-50 to-indigo-100 h-full overflow-y-auto"
      >
        {/* Hero Section */}
        <div className="pt-24 pb-12 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Floating Header
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
              A responsive header that transforms as you scroll. Notice how it changes from a floating pill to a full-width header with shadow.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-lg">
                Get Started
              </button>
              <button className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300 border border-blue-200">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Content Sections to Enable Scrolling */}
        <div className="px-6 pb-12">
          <div className="max-w-4xl mx-auto space-y-8">
            <section className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Scroll to See the Magic</h2>
              <p className="text-base text-gray-600 mb-6">
                As you scroll down, the header transforms from a floating pill shape to a full-width header with a shadow.
              </p>
            </section>

            <section className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Initial State</h3>
                <p className="text-sm text-gray-600">
                  The header starts as a floating pill with rounded corners and a subtle shadow, positioned with margins from the screen edges.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Scrolled State</h3>
                <p className="text-sm text-gray-600">
                  After scrolling past 200px, it becomes a full-width header with a shadow and no rounded corners.
                </p>
              </div>
            </section>

            <section className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Features</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">Smooth Transitions</h3>
                  <p className="text-sm text-gray-600">Beautiful animations with CSS transitions for a polished feel.</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">Responsive Design</h3>
                  <p className="text-sm text-gray-600">Works perfectly on all device sizes with mobile-friendly navigation.</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">Easy Integration</h3>
                  <p className="text-sm text-gray-600">Simple to implement with clean, reusable React component code.</p>
                </div>
              </div>
            </section>

            {/* Extra content to ensure scrolling */}
            <section className="text-center py-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Keep Scrolling</h2>
              <p className="text-base text-gray-600 mb-6">
                The header will continue to maintain its transformed state as you scroll through the content.
              </p>
            </section>

            <section className="text-center py-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Perfect for Landing Pages</h2>
              <p className="text-base text-gray-600 mb-6">
                This floating header pattern is ideal for modern landing pages and marketing websites.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}