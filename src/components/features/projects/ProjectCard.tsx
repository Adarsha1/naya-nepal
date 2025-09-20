import { MapPin, Clock, Target, DollarSign } from 'lucide-react'
import { Project } from '@/types'
import { Card, CardHeader, CardFooter } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Button } from '@/components/ui/Button'
import { truncateText } from '@/lib/utils'
import { formatCurrency, formatDate } from '@/lib/formatters'

/**
 * ProjectCard component for displaying project information
 * Encapsulates all project display logic in a reusable component
 */

interface ProjectCardProps {
  project: Project
  onViewDetails?: (project: Project) => void
  onEdit?: (project: Project) => void
  className?: string
  showOrganization?: boolean
}

export function ProjectCard({ 
  project, 
  onViewDetails, 
  onEdit,
  className,
  showOrganization = false 
}: ProjectCardProps) {
  return (
    <Card hover interactive={!!onViewDetails} className={className}>
      <CardHeader
        title={project.title}
        subtitle={
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-1" />
            {project.location.district}, {project.location.region}
          </div>
        }
      />

      {/* Description */}
      <p className="text-gray-700 text-sm mb-4 leading-relaxed">
        {truncateText(project.description, 120)}
      </p>

      {/* Badges */}
      <div className="flex items-center gap-2 mb-4">
        <Badge variant="sector" value={project.sector} size="sm" />
        <Badge variant="status" value={project.status} size="sm" />
      </div>

      {/* Funding Information */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-gray-600">
            <Target className="h-4 w-4 mr-1" />
            Target
          </div>
          <span className="font-medium">{formatCurrency(project.targetAmount)}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-gray-600">
            <DollarSign className="h-4 w-4 mr-1" />
            Raised
          </div>
          <span className="font-medium text-green-600">
            {formatCurrency(project.raisedAmount)}
          </span>
        </div>
        
        <ProgressBar
          current={project.raisedAmount}
          target={project.targetAmount}
          size="sm"
          showLabel
        />
      </div>

      <CardFooter>
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="h-4 w-4 mr-1" />
          {project.status === 'completed' ? 'Completed' : 'Started'} {formatDate(project.startDate)}
        </div>
        
        <div className="flex items-center gap-2">
          {onEdit && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onEdit(project)
              }}
            >
              Edit
            </Button>
          )}
          {onViewDetails && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => onViewDetails(project)}
            >
              View Details →
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
