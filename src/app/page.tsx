'use client';

import { useState } from 'react';
import { MapPin, Globe, Mail, Phone, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import { mockOrganizations } from '@/data/mockData';
import { Organization, ProjectSector, ProjectStatus } from '@/types';

export default function Home() {
  const [selectedSector, setSelectedSector] = useState<ProjectSector | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<ProjectStatus | 'all'>('all');
  const [selectedState, setSelectedState] = useState<string>('all');

  const sectors: ProjectSector[] = ['health', 'education', 'infrastructure', 'environment', 'disaster-relief', 'economic-development', 'social-services', 'technology', 'agriculture', 'other'];
  const statuses: ProjectStatus[] = ['planning', 'active', 'completed', 'paused', 'cancelled'];
  const states = Array.from(new Set(mockOrganizations.map(org => org.location.state)));

  const filteredOrganizations = mockOrganizations.filter(org => {
    const hasSectorProjects = selectedSector === 'all' || 
      org.projects.some(project => project.sector === selectedSector);
    const hasStatusProjects = selectedStatus === 'all' || 
      org.projects.some(project => project.status === selectedStatus);
    const matchesState = selectedState === 'all' || org.location.state === selectedState;
    
    return hasSectorProjects && hasStatusProjects && matchesState;
  });

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

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
            <h1 className="text-4xl font-bold text-blue-600 mb-4">Naya Nepal 🇳🇵</h1>
            <p className="text-xl text-gray-700 mb-6">
              Transparency in projects helping Nepal grow
            </p>
            <p className="text-gray-600 max-w-3xl mx-auto mb-8">
              Discover nonprofit organizations working on Nepal-focused projects. View funding transparency, 
              track project progress, and connect with organizations making a real difference in Nepal.
            </p>
            <div className="flex justify-center space-x-4">
              <a 
                href="/map" 
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <MapPin className="h-5 w-5 mr-2" />
                View Map
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sector</label>
              <select 
                value={selectedSector} 
                onChange={(e) => setSelectedSector(e.target.value as ProjectSector | 'all')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Sectors</option>
                {sectors.map(sector => (
                  <option key={sector} value={sector}>
                    {sector.charAt(0).toUpperCase() + sector.slice(1).replace('-', ' ')}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Project Status</label>
              <select 
                value={selectedStatus} 
                onChange={(e) => setSelectedStatus(e.target.value as ProjectStatus | 'all')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Statuses</option>
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Organization Location</label>
              <select 
                value={selectedState} 
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All States</option>
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrganizations.map((org) => (
            <div 
              key={org.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
              onClick={() => window.location.href = `/organization/${org.id}`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{org.name}</h3>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      {org.location.city}, {org.location.state}
                    </div>
                    {org.verified && (
                      <div className="flex items-center text-sm text-green-600 mb-2">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Verified Organization
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                  {org.description}
                </p>

                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-900 mb-2">
                    Active Projects ({org.projects.filter(p => p.status === 'active').length})
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {org.projects.slice(0, 3).map((project) => (
                      <span 
                        key={project.id}
                        className={`px-2 py-1 text-xs rounded-full ${getSectorColor(project.sector)}`}
                      >
                        {project.sector.replace('-', ' ')}
                      </span>
                    ))}
                    {org.projects.length > 3 && (
                      <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                        +{org.projects.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Founded {org.foundedYear}
                  </div>
                  <div className="flex space-x-2">
                    {org.website && (
                      <a 
                        href={org.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Globe className="h-4 w-4" />
                      </a>
                    )}
                    {org.email && (
                      <a 
                        href={`mailto:${org.email}`}
                        className="text-blue-600 hover:text-blue-800"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Mail className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredOrganizations.length === 0 && (
          <div className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No organizations found</h3>
            <p className="text-gray-600">Try adjusting your filters to see more results.</p>
          </div>
        )}
      </div>
    </main>
  );
}
