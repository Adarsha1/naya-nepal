'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { useOrganization } from '@/hooks/useOrganizations'
import { ProjectCard } from '@/components/features/projects/ProjectCard'
import { ProjectModal } from '@/components/features/projects/ProjectModal'
import { SimplePageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/Card'
import { VerificationBadge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { PageLoading } from '@/components/ui/LoadingSpinner'
import { formatCurrency } from '@/lib/formatters'
import { Project } from '@/types'

/**
 * Organization Detail Page
 * Refactored to use new component structure and custom hooks
 * Much cleaner separation of concerns
 */

export default function OrganizationPage() {
  const params = useParams()
  const orgId = params.id as string
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const { organization, loading, error } = useOrganization(orgId)

  // Loading state
  if (loading) {
    return <PageLoading message="Loading organization..." />
  }

  // Error state
  if (error || !organization) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {error || 'Organization not found'}
          </h1>
          <Button
            variant="primary"
            onClick={() => window.location.href = '/'}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Organizations
          </Button>
        </div>
      </div>
    )
  }

  // Calculate totals
  const totalRaised = organization.projects.reduce((sum, project) => sum + project.raisedAmount, 0)
  const totalTarget = organization.projects.reduce((sum, project) => sum + project.targetAmount, 0)
  const activeProjects = organization.projects.filter(p => p.status === 'active')

  const breadcrumb = (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => window.location.href = '/'}
      className="text-blue-600 hover:text-blue-800"
    >
      <ArrowLeft className="h-4 w-4 mr-1" />
      Back to Organizations
    </Button>
  )

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <SimplePageHeader
        title={organization.name}
        subtitle={`${organization.location.city}, ${organization.location.state}, ${organization.location.country}`}
        breadcrumb={breadcrumb}
        action={<VerificationBadge verified={organization.verified} />}
      />

      {/* Organization Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="mb-8">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              {organization.description}
            </p>
            
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              {organization.foundedYear && (
                <span>Founded: {organization.foundedYear}</span>
              )}
              {organization.website && (
                <a 
                  href={organization.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  Visit Website →
                </a>
              )}
              {organization.email && (
                <a 
                  href={`mailto:${organization.email}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Contact Email →
                </a>
              )}
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {organization.projects.length}
            </div>
            <div className="text-sm text-gray-600">Total Projects</div>
          </Card>
          
          <Card className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {activeProjects.length}
            </div>
            <div className="text-sm text-gray-600">Active Projects</div>
          </Card>
          
          <Card className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {formatCurrency(totalRaised)}
            </div>
            <div className="text-sm text-gray-600">Total Raised</div>
          </Card>
          
          <Card className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {formatCurrency(totalTarget)}
            </div>
            <div className="text-sm text-gray-600">Total Target</div>
          </Card>
        </div>

        {/* Projects */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Projects ({organization.projects.length})
          </h2>
          
          {organization.projects.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {organization.projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onViewDetails={setSelectedProject}
                />
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="h-12 w-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
              <p className="text-gray-600">This organization hasn't added any projects yet.</p>
            </Card>
          )}
        </div>
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </main>
  )
}