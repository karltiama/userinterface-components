import { Link, useLocation } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Package, ChevronDown, ChevronRight } from 'lucide-react'

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
    },
    {
      id: 'sections',
      label: "Section Components",
      items: [
        { name: 'Hero', path: '/components/hero' },
        { name: 'FloatingHeader', path: '/components/floating-header' },
      ]
    }
  ]

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out flex flex-col
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:sticky lg:top-0 lg:shadow-none lg:h-screen
        `}
        role="navigation"
        aria-label="Main navigation"
      >

        {/* Components Section */}
        <nav className="p-4 flex-1 overflow-y-auto">
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
        <div className="p-4 flex-shrink-0">
          <div className="text-xs text-gray-500 text-center">
            © 2024 Your App
          </div>
        </div>
      </aside>
    </>
  )
}
