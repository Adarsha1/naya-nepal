import { ReactNode } from 'react'
import { MapPin } from 'lucide-react'
import { Button } from '@/components/ui/Button'

/**
 * PageHeader component for consistent page headers across the application
 * Provides flexible layout options for titles, descriptions, and actions
 */

interface PageHeaderProps {
  title: string
  subtitle?: string
  description?: string
  action?: ReactNode
  showMapButton?: boolean
  className?: string
}

export function PageHeader({ 
  title, 
  subtitle, 
  description, 
  action,
  showMapButton = true,
  className 
}: PageHeaderProps) {
  return (
    <div className={`bg-white border-b border-gray-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">{title}</h1>
          
          {subtitle && (
            <p className="text-xl text-gray-700 mb-6">{subtitle}</p>
          )}
          
          {description && (
            <p className="text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              {description}
            </p>
          )}
          
          <div className="flex justify-center items-center gap-4">
            {showMapButton && (
              <Button
                variant="primary"
                size="lg"
                onClick={() => window.location.href = '/map'}
                className="inline-flex items-center"
              >
                <MapPin className="h-5 w-5 mr-2" />
                View Map
              </Button>
            )}
            {action}
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Simple page header for internal pages
 */
interface SimplePageHeaderProps {
  title: string
  subtitle?: string
  breadcrumb?: ReactNode
  action?: ReactNode
}

export function SimplePageHeader({ 
  title, 
  subtitle, 
  breadcrumb, 
  action 
}: SimplePageHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {breadcrumb && (
          <div className="mb-4">
            {breadcrumb}
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            {subtitle && (
              <p className="text-gray-600 mt-1">{subtitle}</p>
            )}
          </div>
          
          {action && (
            <div className="flex items-center gap-3">
              {action}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
