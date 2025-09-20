import { cn } from '@/lib/utils'

/**
 * Reusable LoadingSpinner component for consistent loading states
 * Provides different sizes and colors for various use cases
 */

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: 'blue' | 'gray' | 'white'
  className?: string
}

export function LoadingSpinner({ 
  size = 'md', 
  color = 'blue',
  className 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12'
  }

  const colorClasses = {
    blue: 'border-blue-600',
    gray: 'border-gray-600',
    white: 'border-white'
  }

  return (
    <div className={cn(
      'animate-spin rounded-full border-2 border-t-transparent',
      sizeClasses[size],
      colorClasses[color],
      className
    )} />
  )
}

/**
 * Full page loading component
 */
interface PageLoadingProps {
  message?: string
}

export function PageLoading({ message = 'Loading...' }: PageLoadingProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="xl" className="mx-auto mb-4" />
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  )
}

/**
 * Inline loading component for buttons and small areas
 */
interface InlineLoadingProps {
  message?: string
  size?: 'sm' | 'md'
}

export function InlineLoading({ message, size = 'sm' }: InlineLoadingProps) {
  return (
    <div className="flex items-center gap-2">
      <LoadingSpinner size={size} />
      {message && (
        <span className="text-sm text-gray-600">{message}</span>
      )}
    </div>
  )
}
