import { Organization, Project, ProjectSector, ProjectStatus } from '@/types';

export const mockOrganizations: Organization[] = [
  {
    id: 'org-1',
    name: 'Nepal Health Foundation',
    description: 'Dedicated to improving healthcare access in rural Nepal through mobile clinics and medical equipment donations.',
    website: 'https://nepalhealthfoundation.org',
    email: 'info@nepalhealthfoundation.org',
    phone: '+1-555-0123',
    location: {
      city: 'San Francisco',
      state: 'California',
      country: 'USA',
      coordinates: [-122.4194, 37.7749]
    },
    foundedYear: 2015,
    verified: true,
    projects: []
  },
  {
    id: 'org-2',
    name: 'Education for Nepal',
    description: 'Building schools and providing educational resources to underserved communities in Nepal.',
    website: 'https://educationfornepal.org',
    email: 'contact@educationfornepal.org',
    location: {
      city: 'New York',
      state: 'New York',
      country: 'USA',
      coordinates: [-74.0060, 40.7128]
    },
    foundedYear: 2012,
    verified: true,
    projects: []
  },
  {
    id: 'org-3',
    name: 'Nepal Infrastructure Initiative',
    description: 'Focusing on sustainable infrastructure development including clean water systems and renewable energy.',
    website: 'https://nepalinfrastructure.org',
    email: 'hello@nepalinfrastructure.org',
    location: {
      city: 'Austin',
      state: 'Texas',
      country: 'USA',
      coordinates: [-97.7431, 30.2672]
    },
    foundedYear: 2018,
    verified: true,
    projects: []
  },
  {
    id: 'org-4',
    name: 'Disaster Relief Nepal',
    description: 'Emergency response and disaster preparedness programs for earthquake and flood-affected regions.',
    website: 'https://disasterreliefnepal.org',
    email: 'support@disasterreliefnepal.org',
    location: {
      city: 'Seattle',
      state: 'Washington',
      country: 'USA',
      coordinates: [-122.3321, 47.6062]
    },
    foundedYear: 2015,
    verified: true,
    projects: []
  },
  {
    id: 'org-5',
    name: 'Nepal Youth Development',
    description: 'Empowering young people through technology training and entrepreneurship programs.',
    website: 'https://nepalyouthdev.org',
    email: 'info@nepalyouthdev.org',
    location: {
      city: 'Boston',
      state: 'Massachusetts',
      country: 'USA',
      coordinates: [-71.0589, 42.3601]
    },
    foundedYear: 2020,
    verified: false,
    projects: []
  }
];

export const mockProjects: Project[] = [
  {
    id: 'proj-1',
    organizationId: 'org-1',
    title: 'Mobile Health Clinic - Gorkha District',
    description: 'Deploying mobile health clinics to provide essential medical services to remote villages in Gorkha District. This project includes vaccination programs, maternal health services, and basic medical consultations.',
    sector: 'health',
    status: 'active',
    startDate: '2024-01-15',
    endDate: '2024-12-31',
    targetAmount: 50000,
    raisedAmount: 32000,
    location: {
      region: 'Gandaki Province',
      district: 'Gorkha',
      coordinates: [84.6333, 28.0000]
    },
    images: ['/images/mobile-clinic-1.jpg', '/images/mobile-clinic-2.jpg'],
    updates: [
      {
        id: 'update-1',
        date: '2024-02-15',
        title: 'Mobile Clinic Vehicle Acquired',
        description: 'Successfully purchased and equipped the mobile clinic vehicle with essential medical equipment.',
        amountRaised: 15000
      },
      {
        id: 'update-2',
        date: '2024-03-20',
        title: 'First Village Visit Completed',
        description: 'Mobile clinic visited 3 villages in Gorkha District, providing medical services to 150+ patients.',
        amountRaised: 25000
      }
    ],
    fundingBreakdown: [
      { category: 'Medical Equipment', amount: 20000, percentage: 40, description: 'Essential medical supplies and diagnostic tools' },
      { category: 'Vehicle & Fuel', amount: 15000, percentage: 30, description: 'Mobile clinic vehicle and operational fuel costs' },
      { category: 'Staff Salaries', amount: 10000, percentage: 20, description: 'Medical staff and driver salaries' },
      { category: 'Administrative', amount: 5000, percentage: 10, description: 'Administrative and coordination costs' }
    ],
    contactPerson: {
      name: 'Dr. Sarah Johnson',
      email: 'sarah@nepalhealthfoundation.org',
      phone: '+1-555-0123'
    }
  },
  {
    id: 'proj-2',
    organizationId: 'org-2',
    title: 'Digital Learning Center - Kathmandu Valley',
    description: 'Establishing a modern digital learning center with computers, internet access, and educational software for students in Kathmandu Valley. The center will serve 500+ students annually.',
    sector: 'education',
    status: 'active',
    startDate: '2024-02-01',
    endDate: '2025-01-31',
    targetAmount: 75000,
    raisedAmount: 45000,
    location: {
      region: 'Bagmati Province',
      district: 'Kathmandu',
      coordinates: [85.3240, 27.7172]
    },
    updates: [
      {
        id: 'update-3',
        date: '2024-03-01',
        title: 'Building Renovation Complete',
        description: 'Completed renovation of the learning center building with proper electrical and internet infrastructure.',
        amountRaised: 30000
      },
      {
        id: 'update-4',
        date: '2024-04-15',
        title: 'Computer Equipment Installed',
        description: 'Installed 25 computers and educational software. Center is now operational for basic computer training.',
        amountRaised: 45000
      }
    ],
    fundingBreakdown: [
      { category: 'Computer Equipment', amount: 30000, percentage: 40, description: '25 computers, monitors, and accessories' },
      { category: 'Building Renovation', amount: 20000, percentage: 27, description: 'Electrical work, internet setup, furniture' },
      { category: 'Educational Software', amount: 15000, percentage: 20, description: 'Licenses for educational programs and platforms' },
      { category: 'Staff Training', amount: 10000, percentage: 13, description: 'Teacher training and technical support' }
    ],
    contactPerson: {
      name: 'Michael Chen',
      email: 'michael@educationfornepal.org'
    }
  },
  {
    id: 'proj-3',
    organizationId: 'org-3',
    title: 'Solar Water Pump System - Mustang District',
    description: 'Installing solar-powered water pump systems to provide clean drinking water to 5 villages in Mustang District. This sustainable solution will serve 2000+ residents.',
    sector: 'infrastructure',
    status: 'planning',
    startDate: '2024-06-01',
    endDate: '2024-11-30',
    targetAmount: 100000,
    raisedAmount: 25000,
    location: {
      region: 'Gandaki Province',
      district: 'Mustang',
      coordinates: [83.9333, 28.8000]
    },
    updates: [
      {
        id: 'update-5',
        date: '2024-04-01',
        title: 'Project Planning Phase',
        description: 'Completed site surveys and technical planning for solar water pump installation.',
        amountRaised: 25000
      }
    ],
    fundingBreakdown: [
      { category: 'Solar Panels', amount: 40000, percentage: 40, description: 'High-efficiency solar panels and mounting systems' },
      { category: 'Water Pumps', amount: 30000, percentage: 30, description: 'Solar-powered water pumps and control systems' },
      { category: 'Installation', amount: 20000, percentage: 20, description: 'Professional installation and labor costs' },
      { category: 'Maintenance Fund', amount: 10000, percentage: 10, description: 'Long-term maintenance and repair fund' }
    ],
    contactPerson: {
      name: 'Lisa Rodriguez',
      email: 'lisa@nepalinfrastructure.org',
      phone: '+1-555-0456'
    }
  },
  {
    id: 'proj-4',
    organizationId: 'org-4',
    title: 'Earthquake Preparedness Training - Sindhupalchok',
    description: 'Comprehensive earthquake preparedness training for communities in Sindhupalchok District, including emergency response drills and safety equipment distribution.',
    sector: 'disaster-relief',
    status: 'completed',
    startDate: '2023-09-01',
    endDate: '2024-02-29',
    targetAmount: 30000,
    raisedAmount: 30000,
    location: {
      region: 'Bagmati Province',
      district: 'Sindhupalchok',
      coordinates: [85.7000, 27.8000]
    },
    updates: [
      {
        id: 'update-6',
        date: '2023-10-15',
        title: 'Training Sessions Begin',
        description: 'Started earthquake preparedness training in 10 villages across Sindhupalchok District.',
        amountRaised: 15000
      },
      {
        id: 'update-7',
        date: '2024-01-20',
        title: 'Safety Equipment Distributed',
        description: 'Distributed emergency kits and safety equipment to 500 families.',
        amountRaised: 25000
      },
      {
        id: 'update-8',
        date: '2024-02-29',
        title: 'Project Completed Successfully',
        description: 'Completed all training sessions and equipment distribution. 2000+ residents now have earthquake preparedness knowledge.',
        amountRaised: 30000
      }
    ],
    fundingBreakdown: [
      { category: 'Training Materials', amount: 12000, percentage: 40, description: 'Educational materials, manuals, and training supplies' },
      { category: 'Safety Equipment', amount: 15000, percentage: 50, description: 'Emergency kits, first aid supplies, and safety equipment' },
      { category: 'Transportation', amount: 3000, percentage: 10, description: 'Travel costs for trainers and equipment delivery' }
    ],
    contactPerson: {
      name: 'David Kim',
      email: 'david@disasterreliefnepal.org'
    }
  },
  {
    id: 'proj-5',
    organizationId: 'org-5',
    title: 'Tech Skills Training - Pokhara',
    description: 'Providing coding and digital skills training to young adults in Pokhara, focusing on web development and digital marketing.',
    sector: 'technology',
    status: 'active',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    targetAmount: 40000,
    raisedAmount: 18000,
    location: {
      region: 'Gandaki Province',
      district: 'Kaski',
      coordinates: [83.9856, 28.2096]
    },
    updates: [
      {
        id: 'update-9',
        date: '2024-02-01',
        title: 'Training Center Setup',
        description: 'Set up training center with 20 computers and high-speed internet connection.',
        amountRaised: 10000
      },
      {
        id: 'update-10',
        date: '2024-03-15',
        title: 'First Cohort Graduated',
        description: 'First batch of 25 students completed web development training program.',
        amountRaised: 18000
      }
    ],
    fundingBreakdown: [
      { category: 'Computer Equipment', amount: 20000, percentage: 50, description: '20 computers, monitors, and accessories' },
      { category: 'Internet & Software', amount: 8000, percentage: 20, description: 'High-speed internet and development software licenses' },
      { category: 'Instructor Salaries', amount: 10000, percentage: 25, description: 'Qualified instructors and teaching assistants' },
      { category: 'Learning Materials', amount: 2000, percentage: 5, description: 'Textbooks, online courses, and learning resources' }
    ],
    contactPerson: {
      name: 'Priya Sharma',
      email: 'priya@nepalyouthdev.org'
    }
  }
];

// Assign projects to organizations
mockOrganizations.forEach(org => {
  org.projects = mockProjects.filter(proj => proj.organizationId === org.id);
});
