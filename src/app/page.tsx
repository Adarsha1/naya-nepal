'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import ProjectCard from '@/components/forms/ProjectCard'
import type { Project } from '@/types'

// Sample data to demonstrate the components
const sampleProjects: Project[] = [
  {
    id: '1',
    title: 'Digital Literacy Program',
    description: 'A comprehensive program to teach digital skills to rural communities across Nepal. This initiative focuses on providing basic computer literacy, internet usage, and digital communication skills to bridge the digital divide.',
    category: 'education',
    status: 'active',
    location: 'Kathmandu Valley',
    budget: 500000,
    startDate: new Date('2024-01-15'),
    createdBy: 'user1',
    contributors: ['user1', 'user2', 'user3'],
    tags: ['digital-literacy', 'rural-development', 'education', 'technology'],
    websiteUrl: 'https://example.com/digital-literacy',
    githubUrl: 'https://github.com/example/digital-literacy'
  },
  {
    id: '2',
    title: 'Clean Water Initiative',
    description: 'Installing water purification systems in remote villages to provide access to clean drinking water. The project includes training local communities on maintenance and sustainability practices.',
    category: 'health',
    status: 'completed',
    location: 'Dolakha District',
    budget: 750000,
    startDate: new Date('2023-06-01'),
    endDate: new Date('2024-02-28'),
    createdBy: 'user2',
    contributors: ['user2', 'user4', 'user5'],
    tags: ['clean-water', 'health', 'sustainability', 'rural-development']
  },
  {
    id: '3',
    title: 'Sustainable Agriculture Platform',
    description: 'A mobile app and web platform connecting farmers with modern agricultural techniques, weather forecasting, and market prices to improve crop yields and farmer income.',
    category: 'technology',
    status: 'planned',
    location: 'Chitwan District',
    budget: 1200000,
    startDate: new Date('2024-06-01'),
    createdBy: 'user3',
    contributors: ['user3', 'user6'],
    tags: ['agriculture', 'mobile-app', 'farmers', 'technology', 'sustainability'],
    githubUrl: 'https://github.com/example/agri-platform'
  }
]

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [showAllProjects, setShowAllProjects] = useState(false)

  const handleViewProject = (project: Project) => {
    setSelectedProject(project)
  }

  const handleEditProject = (project: Project) => {
    console.log('Edit project:', project.id)
    // In a real app, this would open an edit modal or navigate to edit page
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-green-600/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Naya Nepal 🇳🇵
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              A centralized platform to discover, support, and contribute to projects 
              helping Nepal grow and prosper. Together, we build a better tomorrow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="primary" 
                size="lg"
                onClick={() => setShowAllProjects(true)}
              >
                Explore Projects
              </Button>
              <Button 
                variant="secondary" 
                size="lg"
                onClick={() => console.log('Submit project clicked')}
              >
                Submit Your Project
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center" padding="lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">150+</div>
              <div className="text-gray-600">Active Projects</div>
            </Card>
            <Card className="text-center" padding="lg">
              <div className="text-3xl font-bold text-green-600 mb-2">75</div>
              <div className="text-gray-600">Districts Covered</div>
            </Card>
            <Card className="text-center" padding="lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">10K+</div>
              <div className="text-gray-600">Lives Impacted</div>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover innovative projects making a real difference across Nepal. 
              From education to healthcare, technology to environment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onViewDetails={handleViewProject}
                onEdit={handleEditProject}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              variant="secondary" 
              size="lg"
              onClick={() => setShowAllProjects(true)}
            >
              View All Projects
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Project Categories
            </h2>
            <p className="text-lg text-gray-600">
              Explore projects by category and find causes you care about
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: 'Education', icon: '🎓', count: 45 },
              { name: 'Health', icon: '🏥', count: 32 },
              { name: 'Technology', icon: '💻', count: 28 },
              { name: 'Environment', icon: '🌱', count: 35 },
              { name: 'Infrastructure', icon: '🏗️', count: 20 }
            ].map((category) => (
              <Card 
                key={category.name}
                className="text-center hover:shadow-lg transition-shadow cursor-pointer"
                padding="md"
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.count} projects</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join our community of changemakers and help build a better Nepal
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="secondary" 
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-50"
            >
              Start a Project
            </Button>
            <Button 
              variant="ghost" 
              size="lg"
              className="text-white border-white hover:bg-white/10"
            >
              Become a Volunteer
            </Button>
          </div>
        </div>
      </section>

      {/* Project Detail Modal (Simple demonstration) */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedProject.title}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedProject(null)}
              >
                ✕
              </Button>
            </div>
            <p className="text-gray-700 mb-4">{selectedProject.description}</p>
            <div className="space-y-2 text-sm text-gray-600">
              <p><strong>Category:</strong> {selectedProject.category}</p>
              <p><strong>Status:</strong> {selectedProject.status}</p>
              <p><strong>Location:</strong> {selectedProject.location}</p>
              {selectedProject.budget && (
                <p><strong>Budget:</strong> NPR {selectedProject.budget.toLocaleString()}</p>
              )}
            </div>
          </Card>
        </div>
      )}
    </main>
  )
}