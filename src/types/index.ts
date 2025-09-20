// Global type definitions for the Naya Nepal project

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'admin' | 'contributor' | 'viewer'
  createdAt: Date
}

export interface Project {
  id: string
  title: string
  description: string
  category: 'education' | 'health' | 'technology' | 'environment' | 'infrastructure'
  status: 'active' | 'completed' | 'planned' | 'on-hold'
  location: string
  budget?: number
  startDate: Date
  endDate?: Date
  createdBy: string
  contributors: string[]
  tags: string[]
  imageUrl?: string
  websiteUrl?: string
  githubUrl?: string
}

export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
  timestamp: Date
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Form-related types
export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface ProjectFormData {
  title: string
  description: string
  category: Project['category']
  location: string
  budget?: number
  startDate: string
  endDate?: string
  tags: string[]
  websiteUrl?: string
  githubUrl?: string
}

// Component prop types
export interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
  className?: string
}

export interface CardProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
  className?: string
  padding?: 'sm' | 'md' | 'lg'
  shadow?: 'sm' | 'md' | 'lg' | 'xl'
}
