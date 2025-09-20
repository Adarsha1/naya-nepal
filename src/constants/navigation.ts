import { Home, MapPin, Wand2, BarChart3, Settings } from 'lucide-react';

/**
 * Navigation configuration for consistent routing across the application
 */

export interface NavigationItem {
  name: string;
  href: string;
  icon: any;
  description?: string;
}

export const MAIN_NAVIGATION: NavigationItem[] = [
  {
    name: 'Organizations',
    href: '/',
    icon: Home,
    description: 'Browse all organizations and their projects'
  },
  {
    name: 'Map View',
    href: '/map',
    icon: MapPin,
    description: 'View organizations on an interactive map'
  },
  {
    name: 'Classify',
    href: '/classify',
    icon: Wand2,
    description: 'Classify project sectors using AI'
  }
];

export const ADMIN_NAVIGATION: NavigationItem[] = [
  {
    name: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3,
    description: 'View platform analytics and insights'
  },
  {
    name: 'Settings',
    href: '/admin/settings',
    icon: Settings,
    description: 'Manage platform settings'
  }
];
