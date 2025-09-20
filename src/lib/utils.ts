/**
 * Utility functions for common operations across the application
 * Centralizes logic to reduce duplication and improve maintainability
 */

// Simple class name utility (install clsx and tailwind-merge for full functionality)
type ClassValue = string | number | boolean | undefined | null | ClassValue[]

/**
 * Combines class names - simplified version
 * For full functionality, install: npm install clsx tailwind-merge
 */
export function cn(...inputs: ClassValue[]): string {
  return inputs
    .filter(Boolean)
    .map(String)
    .join(' ')
}

/**
 * Capitalizes first letter and replaces hyphens with spaces
 * Used for displaying enum values in a user-friendly format
 */
export function formatLabel(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).replace(/-/g, ' ')
}

/**
 * Truncates text to specified length with ellipsis
 * Ensures text doesn't break layouts in cards and lists
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}

/**
 * Generates a URL-friendly slug from a string
 * Useful for creating SEO-friendly URLs
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim()
}

/**
 * Validates email format using a simple regex
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validates URL format
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Debounce function for search inputs and API calls
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Get initials from a name (for avatars)
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .substring(0, 2)
}
