import { MapPin, Globe, Mail, Calendar } from 'lucide-react'
import { Organization } from '@/types'
import { Card } from '@/components/ui/Card'
import { Badge, VerificationBadge, CountBadge } from '@/components/ui/Badge'
import { truncateText } from '@/lib/utils'

/**
 * OrganizationCard component for displaying organization information
 * Encapsulates all organization display logic in a reusable component
 */

interface OrganizationCardProps {
  organization: Organization
  onClick?: (org: Organization) => void
  className?: string
}

export function OrganizationCard({ organization, onClick, className }: OrganizationCardProps) {
  const activeProjects = organization.projects.filter(p => p.status === 'active')
  
  const handleClick = () => {
    onClick?.(organization)
  }

  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }
  
  return (
    <Card 
      hover 
      interactive={!!onClick}
      onClick={handleClick}
      className={className}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {organization.name}
          </h3>
          
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
            {organization.location.city}, {organization.location.state}
          </div>
          
          <VerificationBadge verified={organization.verified} />
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-700 text-sm mb-4 leading-relaxed">
        {truncateText(organization.description, 150)}
      </p>

      {/* Projects Section */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-900">Projects</span>
          <CountBadge count={activeProjects.length} label="active" />
        </div>
        
        <div className="flex flex-wrap gap-1">
          {organization.projects.slice(0, 3).map((project) => (
            <Badge 
              key={project.id}
              variant="sector" 
              value={project.sector}
              size="sm"
            />
          ))}
          {organization.projects.length > 3 && (
            <CountBadge 
              count={organization.projects.length - 3} 
              label="more"
            />
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-sm text-gray-600 pt-4 border-t border-gray-100">
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-1" />
          Founded {organization.foundedYear}
        </div>
        
        <div className="flex items-center space-x-2">
          {organization.website && (
            <a 
              href={organization.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition-colors"
              onClick={handleLinkClick}
              title="Visit website"
            >
              <Globe className="h-4 w-4" />
            </a>
          )}
          {organization.email && (
            <a 
              href={`mailto:${organization.email}`}
              className="text-blue-600 hover:text-blue-800 transition-colors"
              onClick={handleLinkClick}
              title="Send email"
            >
              <Mail className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </Card>
  )
}
