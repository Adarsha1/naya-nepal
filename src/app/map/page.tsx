'use client';

import { useState, useCallback, useEffect } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import { MapPin, ArrowLeft, Filter, CheckCircle } from 'lucide-react';
import { mockOrganizations } from '@/data/mockData';
import { Organization, ProjectSector, ProjectStatus } from '@/types';
import SimpleMap from '@/components/SimpleMap';

export default function MapPage() {
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [selectedSector, setSelectedSector] = useState<ProjectSector | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<ProjectStatus | 'all'>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Set a timeout to show fallback if map doesn't load
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!mapLoaded && !mapError) {
        setMapError('Map is taking longer than expected to load. Showing alternative view.');
      }
    }, 10000); // 10 second timeout

    return () => clearTimeout(timer);
  }, [mapLoaded, mapError]);

  const sectors: ProjectSector[] = ['health', 'education', 'infrastructure', 'environment', 'disaster-relief', 'economic-development', 'social-services', 'technology', 'agriculture', 'other'];
  const statuses: ProjectStatus[] = ['planning', 'active', 'completed', 'paused', 'cancelled'];

  const filteredOrganizations = mockOrganizations.filter(org => {
    const hasSectorProjects = selectedSector === 'all' || 
      org.projects.some(project => project.sector === selectedSector);
    const hasStatusProjects = selectedStatus === 'all' || 
      org.projects.some(project => project.status === selectedStatus);
    
    return hasSectorProjects && hasStatusProjects;
  });

  const getSectorColor = (sector: ProjectSector) => {
    const colors = {
      health: '#ef4444',
      education: '#3b82f6',
      infrastructure: '#10b981',
      environment: '#059669',
      'disaster-relief': '#f97316',
      'economic-development': '#8b5cf6',
      'social-services': '#ec4899',
      technology: '#6366f1',
      agriculture: '#eab308',
      other: '#6b7280'
    };
    return colors[sector];
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <a 
                href="/" 
                className="flex items-center text-blue-600 hover:text-blue-800 mr-4"
              >
                <ArrowLeft className="h-5 w-5 mr-1" />
                Back to Organizations
              </a>
              <h1 className="text-2xl font-bold text-gray-900">Organization Map</h1>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </button>
          </div>
        </div>
      </header>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>
          </div>
        </div>
      )}

      {/* Map */}
      <div className="relative" style={{ height: 'calc(100vh - 200px)' }}>
        {mapError ? (
          <div className="p-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-yellow-600 mr-2" />
                <div>
                  <h3 className="text-sm font-medium text-yellow-800">Interactive Map Unavailable</h3>
                  <p className="text-sm text-yellow-700 mt-1">{mapError}</p>
                </div>
              </div>
            </div>
            <SimpleMap 
              organizations={filteredOrganizations}
              onOrganizationClick={(org) => window.location.href = `/organization/${org.id}`}
            />
          </div>
        ) : !mapLoaded ? (
          <div className="flex items-center justify-center h-full bg-gray-100">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading map...</p>
            </div>
          </div>
        ) : (
          <Map
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN || 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'}
            initialViewState={{
              longitude: -98.5795,
              latitude: 39.8283,
              zoom: 4
            }}
            style={{ width: '100%', height: '100%' }}
            mapStyle="mapbox://styles/mapbox/light-v10"
            onError={(e) => {
              console.error('Map error:', e);
              setMapError('Failed to load map. Please check your internet connection.');
            }}
            onLoad={() => setMapLoaded(true)}
          >
          {filteredOrganizations.map((org) => (
            <Marker
              key={org.id}
              longitude={org.location.coordinates[0]}
              latitude={org.location.coordinates[1]}
              onClick={() => setSelectedOrg(org)}
            >
              <div className="relative">
                <div 
                  className="w-6 h-6 rounded-full border-2 border-white shadow-lg cursor-pointer"
                  style={{ backgroundColor: getSectorColor(org.projects[0]?.sector || 'other') }}
                />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-white rounded-full border border-gray-300 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                </div>
              </div>
            </Marker>
          ))}

          {selectedOrg && (
            <Popup
              longitude={selectedOrg.location.coordinates[0]}
              latitude={selectedOrg.location.coordinates[1]}
              onClose={() => setSelectedOrg(null)}
              closeButton={true}
              closeOnClick={false}
              className="max-w-sm"
            >
              <div className="p-2">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">{selectedOrg.name}</h3>
                    <div className="flex items-center text-xs text-gray-600 mb-2">
                      <MapPin className="h-3 w-3 mr-1" />
                      {selectedOrg.location.city}, {selectedOrg.location.state}
                    </div>
                    {selectedOrg.verified && (
                      <div className="flex items-center text-xs text-green-600 mb-2">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-xs text-gray-700 mb-3 line-clamp-2">
                  {selectedOrg.description}
                </p>

                <div className="mb-3">
                  <div className="text-xs font-medium text-gray-900 mb-1">
                    Projects ({selectedOrg.projects.length})
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {selectedOrg.projects.slice(0, 3).map((project) => (
                      <span 
                        key={project.id}
                        className="px-1.5 py-0.5 text-xs rounded-full text-white"
                        style={{ backgroundColor: getSectorColor(project.sector) }}
                      >
                        {project.sector.replace('-', ' ')}
                      </span>
                    ))}
                    {selectedOrg.projects.length > 3 && (
                      <span className="px-1.5 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
                        +{selectedOrg.projects.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Raised:</span>
                    <span className="font-medium text-green-600">
                      {formatCurrency(selectedOrg.projects.reduce((sum, p) => sum + p.raisedAmount, 0))}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Active Projects:</span>
                    <span className="font-medium">
                      {selectedOrg.projects.filter(p => p.status === 'active').length}
                    </span>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t">
                  <a 
                    href={`/organization/${selectedOrg.id}`}
                    className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View Details →
                  </a>
                </div>
              </div>
            </Popup>
          )}
          </Map>
        )}
      </div>

      {/* Legend */}
      <div className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Sector Legend</h3>
              <div className="flex flex-wrap gap-3">
                {sectors.slice(0, 6).map(sector => (
                  <div key={sector} className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: getSectorColor(sector) }}
                    />
                    <span className="text-xs text-gray-600">
                      {sector.charAt(0).toUpperCase() + sector.slice(1).replace('-', ' ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-sm text-gray-600">
              Showing {filteredOrganizations.length} organizations
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
