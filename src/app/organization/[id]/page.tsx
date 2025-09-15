'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, MapPin, Globe, Mail, Phone, Calendar, CheckCircle, DollarSign, Users, Clock, Target } from 'lucide-react';
import { mockOrganizations } from '@/data/mockData';
import { ProjectSector, ProjectStatus } from '@/types';

export default function OrganizationPage() {
  const params = useParams();
  const orgId = params.id as string;
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const organization = mockOrganizations.find(org => org.id === orgId);

  if (!organization) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Organization not found</h1>
          <a href="/" className="text-blue-600 hover:text-blue-800">← Back to organizations</a>
        </div>
      </div>
    );
  }

  const getSectorColor = (sector: ProjectSector) => {
    const colors = {
      health: 'bg-red-100 text-red-800',
      education: 'bg-blue-100 text-blue-800',
      infrastructure: 'bg-green-100 text-green-800',
      environment: 'bg-emerald-100 text-emerald-800',
      'disaster-relief': 'bg-orange-100 text-orange-800',
      'economic-development': 'bg-purple-100 text-purple-800',
      'social-services': 'bg-pink-100 text-pink-800',
      technology: 'bg-indigo-100 text-indigo-800',
      agriculture: 'bg-yellow-100 text-yellow-800',
      other: 'bg-gray-100 text-gray-800'
    };
    return colors[sector];
  };

  const getStatusColor = (status: ProjectStatus) => {
    const colors = {
      planning: 'bg-yellow-100 text-yellow-800',
      active: 'bg-green-100 text-green-800',
      completed: 'bg-blue-100 text-blue-800',
      paused: 'bg-orange-100 text-orange-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status];
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const totalRaised = organization.projects.reduce((sum, project) => sum + project.raisedAmount, 0);
  const totalTarget = organization.projects.reduce((sum, project) => sum + project.targetAmount, 0);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center mb-4">
            <a 
              href="/" 
              className="flex items-center text-blue-600 hover:text-blue-800 mr-4"
            >
              <ArrowLeft className="h-5 w-5 mr-1" />
              Back to Organizations
            </a>
          </div>
          
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <h1 className="text-3xl font-bold text-gray-900 mr-3">{organization.name}</h1>
                {organization.verified && (
                  <div className="flex items-center text-sm text-green-600">
                    <CheckCircle className="h-5 w-5 mr-1" />
                    Verified
                  </div>
                )}
              </div>
              
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="h-4 w-4 mr-1" />
                {organization.location.city}, {organization.location.state}, {organization.location.country}
              </div>
              
              <p className="text-gray-700 mb-4 max-w-3xl">
                {organization.description}
              </p>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                {organization.foundedYear && (
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Founded {organization.foundedYear}
                  </div>
                )}
                {organization.website && (
                  <a 
                    href={organization.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <Globe className="h-4 w-4 mr-1" />
                    Website
                  </a>
                )}
                {organization.email && (
                  <a 
                    href={`mailto:${organization.email}`}
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <Mail className="h-4 w-4 mr-1" />
                    Email
                  </a>
                )}
                {organization.phone && (
                  <a 
                    href={`tel:${organization.phone}`}
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <Phone className="h-4 w-4 mr-1" />
                    Phone
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{organization.projects.length}</div>
              <div className="text-sm text-gray-600">Total Projects</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{organization.projects.filter(p => p.status === 'active').length}</div>
              <div className="text-sm text-gray-600">Active Projects</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{formatCurrency(totalRaised)}</div>
              <div className="text-sm text-gray-600">Total Raised</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{formatCurrency(totalTarget)}</div>
              <div className="text-sm text-gray-600">Total Target</div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Projects</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {organization.projects.map((project) => (
            <div 
              key={project.id}
              className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      {project.location.district}, {project.location.region}
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex items-center gap-2 mb-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${getSectorColor(project.sector)}`}>
                    {project.sector.replace('-', ' ')}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(project.status)}`}>
                    {project.status.replace('-', ' ')}
                  </span>
                </div>

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
                    <span className="font-medium text-green-600">{formatCurrency(project.raisedAmount)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${Math.min((project.raisedAmount / project.targetAmount) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 text-center">
                    {Math.round((project.raisedAmount / project.targetAmount) * 100)}% funded
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-1" />
                    {project.status === 'completed' ? 'Completed' : 'Started'} {new Date(project.startDate).toLocaleDateString()}
                  </div>
                  <button 
                    onClick={() => setSelectedProject(project.id)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {organization.projects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Users className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
            <p className="text-gray-600">This organization hasn't added any projects yet.</p>
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {(() => {
                const project = organization.projects.find(p => p.id === selectedProject);
                if (!project) return null;

                return (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-gray-900">{project.title}</h3>
                      <button 
                        onClick={() => setSelectedProject(null)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Project Details</h4>
                        <div className="space-y-3 mb-6">
                          <div>
                            <label className="text-sm font-medium text-gray-700">Description</label>
                            <p className="text-gray-600 mt-1">{project.description}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700">Location</label>
                            <p className="text-gray-600 mt-1">{project.location.district}, {project.location.region}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700">Status</label>
                            <span className={`ml-2 px-2 py-1 text-xs rounded-full ${getStatusColor(project.status)}`}>
                              {project.status.replace('-', ' ')}
                            </span>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700">Sector</label>
                            <span className={`ml-2 px-2 py-1 text-xs rounded-full ${getSectorColor(project.sector)}`}>
                              {project.sector.replace('-', ' ')}
                            </span>
                          </div>
                        </div>

                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Funding Progress</h4>
                        <div className="space-y-3 mb-6">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Target Amount</span>
                            <span className="font-medium">{formatCurrency(project.targetAmount)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Raised Amount</span>
                            <span className="font-medium text-green-600">{formatCurrency(project.raisedAmount)}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                              className="bg-green-600 h-3 rounded-full" 
                              style={{ width: `${Math.min((project.raisedAmount / project.targetAmount) * 100, 100)}%` }}
                            ></div>
                          </div>
                          <div className="text-center text-sm text-gray-500">
                            {Math.round((project.raisedAmount / project.targetAmount) * 100)}% funded
                          </div>
                        </div>

                        {project.contactPerson && (
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-3">Contact</h4>
                            <div className="space-y-2">
                              <div className="text-sm">
                                <span className="font-medium text-gray-700">Contact Person:</span> {project.contactPerson.name}
                              </div>
                              <div className="text-sm">
                                <span className="font-medium text-gray-700">Email:</span> 
                                <a href={`mailto:${project.contactPerson.email}`} className="text-blue-600 hover:text-blue-800 ml-1">
                                  {project.contactPerson.email}
                                </a>
                              </div>
                              {project.contactPerson.phone && (
                                <div className="text-sm">
                                  <span className="font-medium text-gray-700">Phone:</span> 
                                  <a href={`tel:${project.contactPerson.phone}`} className="text-blue-600 hover:text-blue-800 ml-1">
                                    {project.contactPerson.phone}
                                  </a>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Funding Breakdown</h4>
                        <div className="space-y-3 mb-6">
                          {project.fundingBreakdown.map((item, index) => (
                            <div key={index} className="border rounded-lg p-3">
                              <div className="flex justify-between items-center mb-1">
                                <span className="font-medium text-gray-900">{item.category}</span>
                                <span className="text-sm text-gray-600">{item.percentage}%</span>
                              </div>
                              <div className="text-sm text-gray-600 mb-2">{item.description}</div>
                              <div className="text-sm font-medium text-green-600">{formatCurrency(item.amount)}</div>
                            </div>
                          ))}
                        </div>

                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Project Updates</h4>
                        <div className="space-y-3">
                          {project.updates.map((update) => (
                            <div key={update.id} className="border rounded-lg p-3">
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-medium text-gray-900">{update.title}</span>
                                <span className="text-sm text-gray-500">{new Date(update.date).toLocaleDateString()}</span>
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
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
