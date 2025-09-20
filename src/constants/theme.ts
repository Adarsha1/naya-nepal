import { ProjectSector, ProjectStatus } from '@/types';

/**
 * Theme constants for consistent styling across the application
 * Centralizes color schemes and styling logic to eliminate duplication
 */

export const SECTOR_COLORS: Record<ProjectSector, string> = {
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
} as const;

export const STATUS_COLORS: Record<ProjectStatus, string> = {
  planning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  active: 'bg-green-100 text-green-800 border-green-200',
  completed: 'bg-blue-100 text-blue-800 border-blue-200',
  paused: 'bg-orange-100 text-orange-800 border-orange-200',
  cancelled: 'bg-red-100 text-red-800 border-red-200'
} as const;

export const SECTOR_ICONS: Record<ProjectSector, string> = {
  health: '🏥',
  education: '🎓',
  infrastructure: '🏗️',
  environment: '🌱',
  'disaster-relief': '🚨',
  'economic-development': '💼',
  'social-services': '🤝',
  technology: '💻',
  agriculture: '🌾',
  other: '📋'
} as const;

export const STATUS_ICONS: Record<ProjectStatus, string> = {
  planning: '📋',
  active: '🚀',
  completed: '✅',
  paused: '⏸️',
  cancelled: '❌'
} as const;

// Common styling classes
export const CARD_STYLES = {
  base: 'bg-white rounded-lg shadow-md border border-gray-200 transition-shadow',
  hover: 'hover:shadow-lg',
  interactive: 'cursor-pointer'
} as const;

export const BUTTON_STYLES = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
  secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500'
} as const;

// Data constants
export const SECTORS: ProjectSector[] = [
  'health', 'education', 'infrastructure', 'environment', 
  'disaster-relief', 'economic-development', 'social-services', 
  'technology', 'agriculture', 'other'
];

export const STATUSES: ProjectStatus[] = [
  'planning', 'active', 'completed', 'paused', 'cancelled'
];
