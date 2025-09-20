'use client'

import { useState, useEffect } from 'react'
import { Organization } from '@/types'
import { mockOrganizations } from '@/data/mockData'

/**
 * Custom hook for managing organization data
 * Abstracts data fetching and state management from UI components
 * In a real app, this would handle API calls, caching, and error states
 */

interface UseOrganizationsReturn {
  organizations: Organization[]
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useOrganizations(): UseOrganizationsReturn {
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchOrganizations = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // In a real app, this would be:
      // const response = await fetch('/api/organizations')
      // const data = await response.json()
      // setOrganizations(data)
      
      setOrganizations(mockOrganizations)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch organizations')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrganizations()
  }, [])

  return { 
    organizations, 
    loading, 
    error, 
    refetch: fetchOrganizations 
  }
}

/**
 * Hook for getting a single organization by ID
 */
export function useOrganization(id: string) {
  const { organizations, loading, error } = useOrganizations()
  
  const organization = organizations.find(org => org.id === id)
  
  return {
    organization,
    loading,
    error: error || (!loading && !organization ? 'Organization not found' : null)
  }
}
