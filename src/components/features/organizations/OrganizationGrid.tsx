import { AlertCircle } from 'lucide-react'
import { Organization } from '@/types'
import { OrganizationCard } from './OrganizationCard'

/**
 * OrganizationGrid component for displaying a grid of organizations
 * Handles empty states and provides consistent layout
 */

interface OrganizationGridProps {
  organizations: Organization[]
  onOrganizationClick?: (org: Organization) => void
  loading?: boolean
  className?: string
}

export function OrganizationGrid({ 
  organizations, 
  onOrganizationClick,
  loading = false,
  className 
}: OrganizationGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <div className="h-6 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (organizations.length === 0) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No organizations found
        </h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Try adjusting your filters to see more results, or check back later as we add more organizations.
        </p>
      </div>
    )
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {organizations.map((org) => (
        <OrganizationCard
          key={org.id}
          organization={org}
          onClick={onOrganizationClick}
        />
      ))}
    </div>
  )
}
