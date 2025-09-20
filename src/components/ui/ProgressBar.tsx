import { cn } from '@/lib/utils'
import { calculateFundingPercentage } from '@/lib/formatters'

/**
 * Reusable ProgressBar component for showing funding progress
 * Handles percentage calculations and provides consistent styling
 */

interface ProgressBarProps {
  current: number
  target: number
  className?: string
  showLabel?: boolean
  showValues?: boolean
  size?: 'sm' | 'md' | 'lg'
  color?: 'green' | 'blue' | 'purple' | 'orange'
}

export function ProgressBar({ 
  current, 
  target, 
  className, 
  showLabel = true,
  showValues = false,
  size = 'md',
  color = 'green'
}: ProgressBarProps) {
  const percentage = calculateFundingPercentage(current, target)
  
  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3'
  }

  const colorClasses = {
    green: 'bg-green-600',
    blue: 'bg-blue-600',
    purple: 'bg-purple-600',
    orange: 'bg-orange-600'
  }
  
  return (
    <div className={cn('space-y-2', className)}>
      {showValues && (
        <div className="flex justify-between text-sm text-gray-600">
          <span>Raised: ${current.toLocaleString()}</span>
          <span>Target: ${target.toLocaleString()}</span>
        </div>
      )}
      
      <div className={cn('w-full bg-gray-200 rounded-full', sizeClasses[size])}>
        <div 
          className={cn(
            'rounded-full transition-all duration-500 ease-out',
            colorClasses[color],
            sizeClasses[size]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      {showLabel && (
        <div className="text-xs text-gray-500 text-center">
          {percentage}% funded
        </div>
      )}
    </div>
  )
}

/**
 * Simple progress bar for generic use cases
 */
interface SimpleProgressBarProps {
  percentage: number
  className?: string
  color?: 'green' | 'blue' | 'purple' | 'orange'
  size?: 'sm' | 'md' | 'lg'
}

export function SimpleProgressBar({ 
  percentage, 
  className, 
  color = 'blue',
  size = 'md'
}: SimpleProgressBarProps) {
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100)
  
  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3'
  }

  const colorClasses = {
    green: 'bg-green-600',
    blue: 'bg-blue-600',
    purple: 'bg-purple-600',
    orange: 'bg-orange-600'
  }
  
  return (
    <div className={cn('w-full bg-gray-200 rounded-full', sizeClasses[size], className)}>
      <div 
        className={cn(
          'rounded-full transition-all duration-300',
          colorClasses[color],
          sizeClasses[size]
        )}
        style={{ width: `${clampedPercentage}%` }}
      />
    </div>
  )
}
