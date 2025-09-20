'use client'

import { useState, useMemo } from 'react'
import { Organization, ProjectSector, ProjectStatus } from '@/types'

/**
 * Custom hook for managing organization and project filters
 * Separates filtering logic from UI components for better maintainability
 */

interface FilterState {
  sector: ProjectSector | 'all'
  status: ProjectStatus | 'all'
  state: string
}

export function useFilters(organizations: Organization[]) {
  const [filters, setFilters] = useState<FilterState>({
    sector: 'all',
    status: 'all',
    state: 'all'
  })

  // Get unique states for filter options
  const availableStates = useMemo(() => 
    Array.from(new Set(organizations.map(org => org.location.state))).sort(),
    [organizations]
  )

  // Filter organizations based on current filters
  const filteredOrganizations = useMemo(() => {
    return organizations.filter(org => {
      // Check if organization has projects matching the sector filter
      const hasSectorProjects = filters.sector === 'all' || 
        org.projects.some(project => project.sector === filters.sector)
      
      // Check if organization has projects matching the status filter
      const hasStatusProjects = filters.status === 'all' || 
        org.projects.some(project => project.status === filters.status)
      
      // Check if organization location matches the state filter
      const matchesState = filters.state === 'all' || 
        org.location.state === filters.state

      return hasSectorProjects && hasStatusProjects && matchesState
    })
  }, [organizations, filters])

  // Update a specific filter
  const updateFilter = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      sector: 'all',
      status: 'all',
      state: 'all'
    })
  }

  // Get filter summary for display
  const getFilterSummary = () => {
    const activeFilters = []
    if (filters.sector !== 'all') activeFilters.push(`Sector: ${filters.sector}`)
    if (filters.status !== 'all') activeFilters.push(`Status: ${filters.status}`)
    if (filters.state !== 'all') activeFilters.push(`State: ${filters.state}`)
    return activeFilters
  }

  return {
    filters,
    filteredOrganizations,
    availableStates,
    updateFilter,
    resetFilters,
    getFilterSummary,
    hasActiveFilters: filters.sector !== 'all' || filters.status !== 'all' || filters.state !== 'all'
  }
}
