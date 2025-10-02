import { Link, useLocation } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Home, Package, ChevronDown, ChevronRight } from 'lucide-react'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation()
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['common']))
  
  // Close sidebar on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll when sidebar is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev)
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId)
      } else {
        newSet.add(sectionId)
      }
      return newSet
    })
  }

  // Navigation items
  const navigationItems = [
    { to: '/', label: 'Home', icon: Home, isRoute: true },
  ]

  // Component sections
  const componentSections = [
    {
      id: 'common',
      label: 'Common Components',
      items: [
        { name: 'Button', path: '/components/button' },
        { name: 'Header', path: '/components/header' },
      ]
    },
    {
      id: 'forms',
      label: 'Form Components',
      items: [
        { name: 'UserForm', path: '/components/user-form' },
        { name: 'UserManagement', path: '/components/user-management' },
      ]
    }
  ]

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out flex flex-col
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:shadow-none lg:h-screen
        `}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-lg font-semibold text-gray-800">Components</h2>
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Close sidebar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation links */}
        <nav className="p-4 flex-1 overflow-y-auto">
          <ul className="space-y-2">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.to
              const LinkComponent = item.isRoute ? Link : 'a'
              const linkProps = item.isRoute 
                ? { to: item.to as any }
                : { href: item.to }
              const IconComponent = item.icon
              
              return (
                <li key={item.to}>
                  <LinkComponent
                    {...linkProps}
                    className={`
                      flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
                      ${isActive
                        ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-700'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }
                    `}
                    onClick={() => {
                      // Close sidebar on mobile when link is clicked
                      if (window.innerWidth < 1024) {
                        onClose()
                      }
                    }}
                  >
                    <IconComponent className="w-5 h-5" aria-hidden="true" />
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="ml-auto text-xs bg-blue-700 text-white px-2 py-1 rounded-full">
                        Current
                      </span>
                    )}
                  </LinkComponent>
                </li>
              )
            })}
          </ul>

          {/* Components Section */}
          <div className="mt-6">
            <div className="flex items-center gap-2 px-3 py-2 mb-2">
              <Package className="w-5 h-5 text-gray-500" />
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Components</h3>
            </div>
            
            <ul className="space-y-1">
              {componentSections.map((section) => {
                const isExpanded = expandedSections.has(section.id)
                const ChevronIcon = isExpanded ? ChevronDown : ChevronRight
                
                return (
                  <li key={section.id}>
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
                    >
                      <ChevronIcon className="w-4 h-4" />
                      <span>{section.label}</span>
                    </button>
                    
                    {isExpanded && (
                      <ul className="ml-6 mt-1 space-y-1">
                        {section.items.map((component) => (
                          <li key={component.name}>
                            <Link
                              to={component.path as any}
                              className={`
                                block px-3 py-2 rounded-md text-sm transition-colors duration-200
                                ${location.pathname === component.path
                                  ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-700'
                                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                                }
                              `}
                              onClick={() => {
                                if (window.innerWidth < 1024) {
                                  onClose()
                                }
                              }}
                            >
                              {component.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        </nav>

        {/* Sidebar footer */}
        <div className="p-4 border-t border-gray-200 flex-shrink-0">
          <div className="text-xs text-gray-500 text-center">
            © 2024 Your App
          </div>
        </div>
      </aside>
    </>
  )
}
