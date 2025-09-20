import { cn, formatLabel } from '@/lib/utils'
import { SECTOR_COLORS, STATUS_COLORS } from '@/constants/theme'
import { ProjectSector, ProjectStatus } from '@/types'

/**
 * Reusable Badge component for displaying sectors and statuses
 * Centralizes styling logic and ensures consistent appearance
 */

interface BadgeProps {
  variant: 'sector' | 'status'
  value: ProjectSector | ProjectStatus
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function Badge({ variant, value, className, size = 'md' }: BadgeProps) {
  const colorMap = variant === 'sector' ? SECTOR_COLORS : STATUS_COLORS
  const colors = colorMap[value as keyof typeof colorMap]
  
  const sizeClasses = {
    sm: 'px-1.5 py-0.5 text-xs',
    md: 'px-2 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm'
  }
  
  return (
    <span className={cn(
      'inline-flex items-center rounded-full border font-medium',
      colors,
      sizeClasses[size],
      className
    )}>
      {formatLabel(value)}
    </span>
  )
}

/**
 * Specialized badge for verification status
 */
interface VerificationBadgeProps {
  verified: boolean
  className?: string
}

export function VerificationBadge({ verified, className }: VerificationBadgeProps) {
  if (!verified) return null
  
  return (
    <span className={cn(
      'inline-flex items-center px-2 py-1 text-xs font-medium rounded-full',
      'bg-green-100 text-green-800 border border-green-200',
      className
    )}>
      ✓ Verified
    </span>
  )
}

/**
 * Count badge for showing numbers (like project count)
 */
interface CountBadgeProps {
  count: number
  label?: string
  className?: string
}

export function CountBadge({ count, label, className }: CountBadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center px-2 py-1 text-xs font-medium rounded-full',
      'bg-gray-100 text-gray-800 border border-gray-200',
      className
    )}>
      {count} {label && count !== 1 ? `${label}s` : label}
    </span>
  )
}
