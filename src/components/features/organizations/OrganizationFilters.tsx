import { ProjectSector, ProjectStatus } from '@/types'
import { Select, Option } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { formatLabel } from '@/lib/utils'
import { SECTORS, STATUSES } from '@/constants/theme'
import { X } from 'lucide-react'

/**
 * OrganizationFilters component for filtering organizations
 * Encapsulates all filtering UI logic in a reusable component
 */

interface OrganizationFiltersProps {
  selectedSector: ProjectSector | 'all'
  selectedStatus: ProjectStatus | 'all'
  selectedState: string
  availableStates: string[]
  onSectorChange: (sector: ProjectSector | 'all') => void
  onStatusChange: (status: ProjectStatus | 'all') => void
  onStateChange: (state: string) => void
  onReset?: () => void
  hasActiveFilters?: boolean
}

export function OrganizationFilters({
  selectedSector,
  selectedStatus,
  selectedState,
  availableStates,
  onSectorChange,
  onStatusChange,
  onStateChange,
  onReset,
  hasActiveFilters = false
}: OrganizationFiltersProps) {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Filters</h3>
          {hasActiveFilters && onReset && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onReset}
              className="text-gray-600"
            >
              <X className="h-4 w-4 mr-1" />
              Clear Filters
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Sector Filter */}
          <Select
            label="Project Sector"
            value={selectedSector}
            onChange={(e) => onSectorChange(e.target.value as ProjectSector | 'all')}
          >
            <Option value="all">All Sectors</Option>
            {SECTORS.map(sector => (
              <Option key={sector} value={sector}>
                {formatLabel(sector)}
              </Option>
            ))}
          </Select>
          
          {/* Status Filter */}
          <Select
            label="Project Status"
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value as ProjectStatus | 'all')}
          >
            <Option value="all">All Statuses</Option>
            {STATUSES.map(status => (
              <Option key={status} value={status}>
                {formatLabel(status)}
              </Option>
            ))}
          </Select>
          
          {/* Location Filter */}
          <Select
            label="Organization Location"
            value={selectedState}
            onChange={(e) => onStateChange(e.target.value)}
          >
            <Option value="all">All States</Option>
            {availableStates.map(state => (
              <Option key={state} value={state}>
                {state}
              </Option>
            ))}
          </Select>
        </div>
      </div>
    </div>
  )
}
