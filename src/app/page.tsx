'use client'

import { Organization } from '@/types'
import { useOrganizations } from '@/hooks/useOrganizations'
import { useFilters } from '@/hooks/useFilters'
import { OrganizationFilters } from '@/components/features/organizations/OrganizationFilters'
import { OrganizationGrid } from '@/components/features/organizations/OrganizationGrid'
import { PageHeader } from '@/components/layout/PageHeader'
import { PageLoading } from '@/components/ui/LoadingSpinner'
import { AlertCircle } from 'lucide-react'

/**
 * Homepage - Organizations listing with filters
 * Refactored to use new component structure and custom hooks
 * Much cleaner and more maintainable than the original
 */

export default function Home() {
  const { organizations, loading, error } = useOrganizations()
  const { 
    filters, 
    filteredOrganizations, 
    availableStates, 
    updateFilter,
    resetFilters,
    hasActiveFilters
  } = useFilters(organizations)

  const handleOrganizationClick = (org: Organization) => {
    window.location.href = `/organization/${org.id}`
  }

  // Loading state
  if (loading) {
    return <PageLoading message="Loading organizations..." />
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Data</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <PageHeader 
        title="Naya Nepal 🇳🇵"
        subtitle="Transparency in projects helping Nepal grow"
        description="Discover nonprofit organizations working on Nepal-focused projects. View funding transparency, track project progress, and connect with organizations making a real difference in Nepal."
      />

      {/* Filters */}
      <OrganizationFilters
        selectedSector={filters.sector}
        selectedStatus={filters.status}
        selectedState={filters.state}
        availableStates={availableStates}
        onSectorChange={(sector) => updateFilter('sector', sector)}
        onStatusChange={(status) => updateFilter('status', status)}
        onStateChange={(state) => updateFilter('state', state)}
        onReset={resetFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {/* Organizations Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Organizations ({filteredOrganizations.length})
          </h2>
          <p className="text-gray-600">
            Click on any organization to view their projects and funding details
          </p>
        </div>

        <OrganizationGrid
          organizations={filteredOrganizations}
          onOrganizationClick={handleOrganizationClick}
        />
      </div>
    </main>
  )
}