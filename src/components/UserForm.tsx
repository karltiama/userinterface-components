import React, { useState, useCallback } from 'react'
import { User, Mail, Phone, MapPin, Save, X } from 'lucide-react'
import Button from './Button'

// Type definitions
interface User {
  id: string
  name: string
  email: string
  phone: string
  address: string
}

interface UserFormProps {
  initialUser?: Partial<User>
  onSubmit: (user: Omit<User, 'id'>) => Promise<void>
  onCancel?: () => void
  loading?: boolean
}

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  address?: string
}

// Custom hook for form management
function useUserForm(initialUser: Partial<User> = {}) {
  const [formData, setFormData] = useState({
    name: initialUser.name || '',
    email: initialUser.email || '',
    phone: initialUser.phone || '',
    address: initialUser.address || ''
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  // Update form field
  const setField = useCallback((field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }, [errors])

  // Mark field as touched
  const setFieldTouched = useCallback((field: keyof typeof formData) => {
    setTouched(prev => ({ ...prev, [field]: true }))
  }, [])

  // Set field error
  const setFieldError = useCallback((field: keyof typeof formData, error: string) => {
    setErrors(prev => ({ ...prev, [field]: error }))
  }, [])

  // Validate form
  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^\+?[\d\s\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData])

  // Reset form
  const resetForm = useCallback(() => {
    setFormData({
      name: initialUser.name || '',
      email: initialUser.email || '',
      phone: initialUser.phone || '',
      address: initialUser.address || ''
    })
    setErrors({})
    setTouched({})
  }, [initialUser])

  return {
    formData,
    errors,
    touched,
    setField,
    setFieldTouched,
    setFieldError,
    validateForm,
    resetForm
  }
}

/**
 * A comprehensive user form component with validation and state management
 * 
 * @example
 * ```tsx
 * <UserForm
 *   initialUser={{ name: 'John Doe', email: 'john@example.com' }}
 *   onSubmit={handleSubmit}
 *   onCancel={handleCancel}
 *   loading={isSubmitting}
 * />
 * ```
 */
export default function UserForm({
  initialUser = {},
  onSubmit,
  onCancel,
  loading = false
}: UserFormProps) {
  const {
    formData,
    errors,
    touched,
    setField,
    setFieldTouched,
    validateForm,
    resetForm
  } = useUserForm(initialUser)

  // Handle form submission
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Mark all fields as touched
    Object.keys(formData).forEach(field => {
      setFieldTouched(field as keyof typeof formData)
    })

    // Validate form
    if (!validateForm()) {
      return
    }

    try {
      await onSubmit(formData as Omit<User, 'id'>)
      resetForm()
    } catch (error) {
      console.error('Form submission error:', error)
    }
  }, [formData, onSubmit, validateForm, resetForm, setFieldTouched])

  // Handle field change
  const handleFieldChange = useCallback((
    field: keyof typeof formData,
    value: string
  ) => {
    setField(field, value)
  }, [setField])

  // Handle field blur
  const handleFieldBlur = useCallback((field: keyof typeof formData) => {
    setFieldTouched(field)
  }, [setFieldTouched])

  // Check if field has error
  const hasError = useCallback((field: keyof typeof formData) => {
    return touched[field] && errors[field]
  }, [touched, errors])

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Full Name *
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleFieldChange('name', e.target.value)}
            onBlur={() => handleFieldBlur('name')}
            className={`
              w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              ${hasError('name') 
                ? 'border-red-300 bg-red-50' 
                : 'border-gray-300 hover:border-gray-400'
              }
            `}
            placeholder="Enter full name"
            aria-invalid={hasError('name') ? 'true' : 'false'}
            aria-describedby={hasError('name') ? 'name-error' : undefined}
          />
        </div>
        {hasError('name') && (
          <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address *
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleFieldChange('email', e.target.value)}
            onBlur={() => handleFieldBlur('email')}
            className={`
              w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              ${hasError('email') 
                ? 'border-red-300 bg-red-50' 
                : 'border-gray-300 hover:border-gray-400'
              }
            `}
            placeholder="Enter email address"
            aria-invalid={hasError('email') ? 'true' : 'false'}
            aria-describedby={hasError('email') ? 'email-error' : undefined}
          />
        </div>
        {hasError('email') && (
          <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      {/* Phone Field */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number *
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleFieldChange('phone', e.target.value)}
            onBlur={() => handleFieldBlur('phone')}
            className={`
              w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              ${hasError('phone') 
                ? 'border-red-300 bg-red-50' 
                : 'border-gray-300 hover:border-gray-400'
              }
            `}
            placeholder="Enter phone number"
            aria-invalid={hasError('phone') ? 'true' : 'false'}
            aria-describedby={hasError('phone') ? 'phone-error' : undefined}
          />
        </div>
        {hasError('phone') && (
          <p id="phone-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.phone}
          </p>
        )}
      </div>

      {/* Address Field */}
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
          Address *
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <textarea
            id="address"
            value={formData.address}
            onChange={(e) => handleFieldChange('address', e.target.value)}
            onBlur={() => handleFieldBlur('address')}
            rows={3}
            className={`
              w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical
              ${hasError('address') 
                ? 'border-red-300 bg-red-50' 
                : 'border-gray-300 hover:border-gray-400'
              }
            `}
            placeholder="Enter full address"
            aria-invalid={hasError('address') ? 'true' : 'false'}
            aria-describedby={hasError('address') ? 'address-error' : undefined}
          />
        </div>
        {hasError('address') && (
          <p id="address-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.address}
          </p>
        )}
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={loading}
            leftIcon={<X className="w-4 h-4" />}
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          variant="primary"
          loading={loading}
          leftIcon={<Save className="w-4 h-4" />}
        >
          {initialUser.id ? 'Update User' : 'Create User'}
        </Button>
      </div>
    </form>
  )
}

export type { UserFormProps, User, FormErrors }
