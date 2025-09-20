'use client'

import { Project } from '@/types'
import { Modal, ModalHeader, ModalBody } from '@/components/ui/Modal'
import { Badge } from '@/components/ui/Badge'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { formatCurrency, formatDate } from '@/lib/formatters'

/**
 * ProjectModal component for displaying detailed project information
 * Encapsulates project detail display logic in a reusable modal
 */

interface ProjectModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!project) return null

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
    >
      <ModalHeader
        title={project.title}
        subtitle={`${project.location.district}, ${project.location.region}`}
        onClose={onClose}
      />
      
      <ModalBody>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Project Details */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Project Details</h4>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="text-sm font-medium text-gray-700">Description</label>
                <p className="text-gray-600 mt-1 leading-relaxed">{project.description}</p>
              </div>
              
              <div className="flex items-center gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Sector</label>
                  <div className="mt-1">
                    <Badge variant="sector" value={project.sector} />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Status</label>
                  <div className="mt-1">
                    <Badge variant="status" value={project.status} />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Timeline</label>
                <p className="text-gray-600 mt-1">
                  Started: {formatDate(project.startDate)}
                  {project.endDate && (
                    <span> • Ended: {formatDate(project.endDate)}</span>
                  )}
                </p>
              </div>
            </div>

            {/* Contact Information */}
            {project.contactPerson && (
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Contact</h4>
                <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Contact Person:</span>{' '}
                    {project.contactPerson.name}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Email:</span>{' '}
                    <a 
                      href={`mailto:${project.contactPerson.email}`} 
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {project.contactPerson.email}
                    </a>
                  </div>
                  {project.contactPerson.phone && (
                    <div className="text-sm">
                      <span className="font-medium text-gray-700">Phone:</span>{' '}
                      <a 
                        href={`tel:${project.contactPerson.phone}`} 
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {project.contactPerson.phone}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Funding & Updates */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Funding Progress</h4>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Target Amount</span>
                <span className="font-medium">{formatCurrency(project.targetAmount)}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Raised Amount</span>
                <span className="font-medium text-green-600">
                  {formatCurrency(project.raisedAmount)}
                </span>
              </div>
              
              <ProgressBar
                current={project.raisedAmount}
                target={project.targetAmount}
                showLabel
                showValues={false}
              />
            </div>

            {/* Funding Breakdown */}
            {project.fundingBreakdown && project.fundingBreakdown.length > 0 && (
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Funding Breakdown</h4>
                <div className="space-y-3">
                  {project.fundingBreakdown.map((item, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-gray-900">{item.category}</span>
                        <span className="text-sm text-gray-600">{item.percentage}%</span>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">{item.description}</div>
                      <div className="text-sm font-medium text-green-600">
                        {formatCurrency(item.amount)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Project Updates */}
            {project.updates && project.updates.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Recent Updates</h4>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {project.updates.map((update) => (
                    <div key={update.id} className="border rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-900">{update.title}</span>
                        <span className="text-sm text-gray-500">
                          {formatDate(update.date)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{update.description}</p>
                      {update.amountRaised && (
                        <div className="text-sm font-medium text-green-600">
                          Raised: {formatCurrency(update.amountRaised)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </ModalBody>
    </Modal>
  )
}
