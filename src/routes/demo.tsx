import { createFileRoute } from '@tanstack/react-router'
import UserManagement from '../components/UserManagement'

export const Route = createFileRoute('/demo')({
  component: DemoPage,
})

function DemoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            React Component Best Practices Demo
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            This demo showcases the best practices for creating React components including 
            TypeScript props, state management, custom hooks, form validation, and accessibility.
          </p>
        </div>
        
        <UserManagement />
        
        <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            What This Demo Shows
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Component Structure</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Proper TypeScript interfaces</li>
                <li>• Default props and optional parameters</li>
                <li>• Semantic HTML and accessibility</li>
                <li>• Error handling and validation</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">State Management</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Custom hooks for reusable logic</li>
                <li>• Local storage persistence</li>
                <li>• Form state with validation</li>
                <li>• Loading and error states</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Performance</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• useCallback for event handlers</li>
                <li>• Proper dependency arrays</li>
                <li>• Memoization where needed</li>
                <li>• Efficient re-renders</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">User Experience</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Responsive design</li>
                <li>• Keyboard navigation</li>
                <li>• Loading indicators</li>
                <li>• Form validation feedback</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}