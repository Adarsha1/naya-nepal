import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import type { CardProps } from '@/types'

/**
 * Reusable Card component for displaying content in a contained layout
 * 
 * @example
 * <Card title="Project Title" subtitle="Category" padding="lg">
 *   <p>Project description goes here...</p>
 * </Card>
 */
const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ 
    children, 
    title, 
    subtitle, 
    className, 
    padding = 'md',
    shadow = 'md',
    ...props 
  }, ref) => {
    const baseStyles = [
      'bg-white rounded-lg border border-gray-200',
      'transition-shadow duration-200'
    ].join(' ')

    const paddingStyles = {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8'
    }

    const shadowStyles = {
      sm: 'shadow-sm hover:shadow-md',
      md: 'shadow-md hover:shadow-lg',
      lg: 'shadow-lg hover:shadow-xl',
      xl: 'shadow-xl hover:shadow-2xl'
    }

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          paddingStyles[padding],
          shadowStyles[shadow],
          className
        )}
        {...props}
      >
        {(title || subtitle) && (
          <div className="mb-4">
            {title && (
              <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-sm text-gray-600 mt-1">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

export default Card
