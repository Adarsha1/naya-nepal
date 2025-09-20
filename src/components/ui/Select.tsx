import { SelectHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

/**
 * Reusable Select component with consistent styling
 * Provides proper TypeScript support and accessibility
 */

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  helperText?: string
  fullWidth?: boolean
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  label,
  error,
  helperText,
  fullWidth = true,
  className,
  children,
  id,
  ...props
}, ref) => {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className={cn('space-y-1', !fullWidth && 'inline-block')}>
      {label && (
        <label 
          htmlFor={selectId}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      
      <select
        ref={ref}
        id={selectId}
        className={cn(
          'block px-3 py-2 border rounded-md shadow-sm',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
          'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
          error 
            ? 'border-red-500 focus:ring-red-500' 
            : 'border-gray-300',
          fullWidth ? 'w-full' : 'w-auto',
          className
        )}
        {...props}
      >
        {children}
      </select>
      
      {error && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p className="text-sm text-gray-600">
          {helperText}
        </p>
      )}
    </div>
  )
})

Select.displayName = 'Select'

/**
 * Option component for better TypeScript support
 */
interface OptionProps {
  value: string | number
  children: React.ReactNode
  disabled?: boolean
}

export function Option({ value, children, disabled }: OptionProps) {
  return (
    <option value={value} disabled={disabled}>
      {children}
    </option>
  )
}
