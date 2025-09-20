import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import type { ButtonProps } from '@/types'

/**
 * Reusable Button component with multiple variants and sizes
 * 
 * @example
 * <Button variant="primary" size="lg" onClick={handleClick}>
 *   Click me
 * </Button>
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    children, 
    variant = 'primary', 
    size = 'md', 
    type = 'button',
    disabled = false,
    loading = false,
    onClick,
    className,
    ...props 
  }, ref) => {
    const baseStyles = [
      'inline-flex items-center justify-center',
      'font-medium rounded-lg',
      'transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'active:scale-95'
    ].join(' ')

    const variants = {
      primary: [
        'bg-blue-600 hover:bg-blue-700 text-white',
        'focus:ring-blue-500',
        'shadow-sm hover:shadow-md'
      ].join(' '),
      
      secondary: [
        'bg-gray-100 hover:bg-gray-200 text-gray-900',
        'border border-gray-300',
        'focus:ring-gray-500'
      ].join(' '),
      
      danger: [
        'bg-red-600 hover:bg-red-700 text-white',
        'focus:ring-red-500',
        'shadow-sm hover:shadow-md'
      ].join(' '),
      
      ghost: [
        'bg-transparent hover:bg-gray-100 text-gray-700',
        'focus:ring-gray-500'
      ].join(' ')
    }

    const sizes = {
      sm: 'px-3 py-1.5 text-sm gap-1.5',
      md: 'px-4 py-2 text-base gap-2',
      lg: 'px-6 py-3 text-lg gap-2.5'
    }

    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || loading}
        onClick={onClick}
        {...props}
      >
        {loading && (
          <svg 
            className="animate-spin -ml-1 mr-2 h-4 w-4" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
