'use client';

import { MapPin } from 'lucide-react';
import { Organization } from '@/types';

interface SimpleMapProps {
  organizations: Organization[];
  onOrganizationClick: (org: Organization) => void;
}

export default function SimpleMap({ organizations, onOrganizationClick }: SimpleMapProps) {
  return (
    <div className="bg-gray-100 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Organization Locations</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {organizations.map((org) => (
          <div 
            key={org.id}
            onClick={() => onOrganizationClick(org)}
            className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow border border-gray-200"
          >
            <div className="flex items-start mb-3">
              <MapPin className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 text-sm">{org.name}</h4>
                <p className="text-xs text-gray-600 mt-1">
                  {org.location.city}, {org.location.state}
                </p>
              </div>
            </div>
            
            <p className="text-xs text-gray-700 mb-3 line-clamp-2">
              {org.description}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-600">
                {org.projects.length} project{org.projects.length !== 1 ? 's' : ''}
              </div>
              <div className="text-xs text-blue-600 font-medium">
                View Details →
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {organizations.length === 0 && (
        <div className="text-center py-8">
          <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No organizations found with current filters.</p>
        </div>
      )}
    </div>
  );
}
