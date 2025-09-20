import { ReactNode, forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { CARD_STYLES } from '@/constants/theme'

/**
 * Reusable Card component for consistent layout and styling
 * Provides flexible options for different use cases
 */

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  interactive?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
  onClick?: () => void
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({ 
  children, 
  className, 
  hover = false, 
  interactive = false,
  padding = 'md',
  onClick 
}, ref) => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }

  return (
    <div
      ref={ref}
      className={cn(
        CARD_STYLES.base,
        hover && CARD_STYLES.hover,
        interactive && CARD_STYLES.interactive,
        paddingClasses[padding],
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
})

Card.displayName = 'Card'

/**
 * Card Header component for consistent card titles
 */
interface CardHeaderProps {
  title: string
  subtitle?: string
  action?: ReactNode
  className?: string
}

export function CardHeader({ title, subtitle, action, className }: CardHeaderProps) {
  return (
    <div className={cn('flex items-start justify-between mb-4', className)}>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
        {subtitle && (
          <p className="text-sm text-gray-600">{subtitle}</p>
        )}
      </div>
      {action && (
        <div className="ml-4">
          {action}
        </div>
      )}
    </div>
  )
}

/**
 * Card Footer component for actions and metadata
 */
interface CardFooterProps {
  children: ReactNode
  className?: string
}

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div className={cn(
      'flex items-center justify-between pt-4 mt-4 border-t border-gray-100',
      className
    )}>
      {children}
    </div>
  )
}
