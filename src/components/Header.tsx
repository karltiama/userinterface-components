import { Link } from '@tanstack/react-router'

interface HeaderProps {
  onMenuClick: () => void
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-4 py-3 flex items-center justify-between">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Open sidebar"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Logo/Brand */}
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
            Your App
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden lg:flex items-center space-x-6">
          <Link 
            to="/" 
            className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
          >
            Home
          </Link>
          <a 
            href="/about" 
            className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
          >
            About
          </a>
          <a 
            href="/projects" 
            className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
          >
            Projects
          </a>
          <a 
            href="/contact" 
            className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
          >
            Contact
          </a>
        </nav>

        {/* Right side actions */}
        <div className="hidden lg:flex items-center space-x-4">
          <button className="text-gray-600 hover:text-gray-900 p-2 rounded-md hover:bg-gray-100 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-5a7.5 7.5 0 1 0-15 0v5" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
