'use client';

import { useState } from 'react';
import { ArrowLeft, Wand2, CheckCircle } from 'lucide-react';
import { classifyProjectSector, getSectorDescription, getSectorIcon } from '@/utils/sectorClassifier';
import { ProjectSector } from '@/types';

export default function ClassifyPage() {
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [classifiedSector, setClassifiedSector] = useState<ProjectSector | null>(null);
  const [isClassifying, setIsClassifying] = useState(false);

  const handleClassify = async () => {
    if (!projectTitle.trim() || !projectDescription.trim()) {
      alert('Please enter both project title and description');
      return;
    }

    setIsClassifying(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const sector = classifyProjectSector(projectDescription, projectTitle);
      setClassifiedSector(sector);
      setIsClassifying(false);
    }, 1000);
  };

  const getSectorColor = (sector: ProjectSector) => {
    const colors = {
      health: 'bg-red-100 text-red-800 border-red-200',
      education: 'bg-blue-100 text-blue-800 border-blue-200',
      infrastructure: 'bg-green-100 text-green-800 border-green-200',
      environment: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      'disaster-relief': 'bg-orange-100 text-orange-800 border-orange-200',
      'economic-development': 'bg-purple-100 text-purple-800 border-purple-200',
      'social-services': 'bg-pink-100 text-pink-800 border-pink-200',
      technology: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      agriculture: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      other: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[sector];
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center mb-4">
            <a 
              href="/" 
              className="flex items-center text-blue-600 hover:text-blue-800 mr-4"
            >
              <ArrowLeft className="h-5 w-5 mr-1" />
              Back to Organizations
            </a>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Wand2 className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">Project Sector Classifier</h1>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Enter your project details below and our AI tool will automatically classify it into the appropriate sector 
              (Health, Education, Infrastructure, etc.) to help with transparency and organization.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Project Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Title *
                </label>
                <input
                  type="text"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  placeholder="e.g., Mobile Health Clinic for Rural Communities"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Description *
                </label>
                <textarea
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  placeholder="Describe your project in detail. Include what it does, who it helps, and how it works..."
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <button
                onClick={handleClassify}
                disabled={isClassifying || !projectTitle.trim() || !projectDescription.trim()}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isClassifying ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Classifying...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4 mr-2" />
                    Classify Project
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Classification Result</h2>
            
            {classifiedSector ? (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-6xl mb-4">{getSectorIcon(classifiedSector)}</div>
                  <div className={`inline-flex items-center px-4 py-2 rounded-full border-2 ${getSectorColor(classifiedSector)}`}>
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span className="font-semibold text-lg">
                      {classifiedSector.charAt(0).toUpperCase() + classifiedSector.slice(1).replace('-', ' ')}
                    </span>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">Sector Description</h3>
                  <p className="text-gray-700 text-sm">
                    {getSectorDescription(classifiedSector)}
                  </p>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-medium text-blue-900 mb-2">Next Steps</h3>
                  <ul className="text-blue-800 text-sm space-y-1">
                    <li>• Use this classification when adding your project</li>
                    <li>• It helps donors find projects in their area of interest</li>
                    <li>• Enables better filtering and organization</li>
                    <li>• Improves transparency and project discoverability</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Wand2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  Enter your project details and click "Classify Project" to see the result.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Sector Information */}
        <div className="mt-8 bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Available Sectors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(['health', 'education', 'infrastructure', 'environment', 'disaster-relief', 'economic-development', 'social-services', 'technology', 'agriculture', 'other'] as ProjectSector[]).map((sector) => (
              <div key={sector} className="flex items-center p-3 border rounded-lg">
                <span className="text-2xl mr-3">{getSectorIcon(sector)}</span>
                <div>
                  <div className="font-medium text-gray-900">
                    {sector.charAt(0).toUpperCase() + sector.slice(1).replace('-', ' ')}
                  </div>
                  <div className="text-sm text-gray-600">
                    {getSectorDescription(sector)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
