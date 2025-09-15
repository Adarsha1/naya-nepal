export interface Organization {
  id: string;
  name: string;
  description: string;
  website?: string;
  email?: string;
  phone?: string;
  location: {
    city: string;
    state: string;
    country: string;
    coordinates: [number, number]; // [longitude, latitude]
  };
  foundedYear?: number;
  logo?: string;
  verified: boolean;
  projects: Project[];
}

export interface Project {
  id: string;
  organizationId: string;
  title: string;
  description: string;
  sector: ProjectSector;
  status: ProjectStatus;
  startDate: string;
  endDate?: string;
  targetAmount: number;
  raisedAmount: number;
  location: {
    region: string;
    district: string;
    coordinates?: [number, number];
  };
  images?: string[];
  updates: ProjectUpdate[];
  fundingBreakdown: FundingBreakdown[];
  contactPerson?: {
    name: string;
    email: string;
    phone?: string;
  };
}

export type ProjectSector = 
  | 'health'
  | 'education' 
  | 'infrastructure'
  | 'environment'
  | 'disaster-relief'
  | 'economic-development'
  | 'social-services'
  | 'technology'
  | 'agriculture'
  | 'other';

export type ProjectStatus = 
  | 'planning'
  | 'active'
  | 'completed'
  | 'paused'
  | 'cancelled';

export interface ProjectUpdate {
  id: string;
  date: string;
  title: string;
  description: string;
  images?: string[];
  amountRaised?: number;
}

export interface FundingBreakdown {
  category: string;
  amount: number;
  percentage: number;
  description: string;
}

export interface FilterOptions {
  location?: {
    state?: string;
    city?: string;
  };
  sector?: ProjectSector[];
  status?: ProjectStatus[];
  verified?: boolean;
}
