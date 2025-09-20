import { ProjectSector } from '@/types';

export interface SectorKeywords {
  [key: string]: string[];
}

export const sectorKeywords: SectorKeywords = {
  health: [
    'medical', 'health', 'hospital', 'clinic', 'doctor', 'nurse', 'medicine', 'healthcare',
    'vaccination', 'maternal', 'child health', 'mental health', 'disease', 'treatment',
    'medical equipment', 'health center', 'pharmacy', 'ambulance', 'emergency medical'
  ],
  education: [
    'school', 'education', 'student', 'teacher', 'learning', 'classroom', 'library',
    'university', 'college', 'training', 'literacy', 'curriculum', 'textbook',
    'scholarship', 'tuition', 'academic', 'educational', 'teaching', 'study'
  ],
  infrastructure: [
    'road', 'bridge', 'building', 'construction', 'infrastructure', 'water system',
    'electricity', 'power', 'sewer', 'drainage', 'transportation', 'public works',
    'facility', 'development', 'engineering', 'utilities', 'telecommunications'
  ],
  environment: [
    'environment', 'climate', 'conservation', 'renewable', 'solar', 'wind', 'clean energy',
    'pollution', 'waste management', 'recycling', 'sustainability', 'green', 'ecology',
    'forest', 'wildlife', 'biodiversity', 'carbon', 'emissions'
  ],
  'disaster-relief': [
    'disaster', 'emergency', 'relief', 'earthquake', 'flood', 'hurricane', 'typhoon',
    'rescue', 'evacuation', 'shelter', 'aid', 'crisis', 'response', 'recovery',
    'preparedness', 'mitigation', 'vulnerability', 'risk reduction'
  ],
  'economic-development': [
    'economic', 'business', 'entrepreneur', 'job', 'employment', 'income', 'microfinance',
    'loan', 'credit', 'investment', 'market', 'trade', 'commerce', 'industry',
    'manufacturing', 'agriculture', 'farming', 'livelihood', 'poverty reduction'
  ],
  'social-services': [
    'social', 'community', 'welfare', 'support', 'care', 'elderly', 'children', 'family',
    'counseling', 'therapy', 'rehabilitation', 'integration', 'advocacy', 'rights',
    'protection', 'safety', 'domestic violence', 'homeless', 'refugee'
  ],
  technology: [
    'technology', 'digital', 'computer', 'internet', 'software', 'app', 'website',
    'coding', 'programming', 'IT', 'data', 'information', 'communication', 'mobile',
    'online', 'cyber', 'tech', 'innovation', 'startup', 'digital literacy'
  ],
  agriculture: [
    'agriculture', 'farming', 'crop', 'livestock', 'food', 'nutrition', 'irrigation',
    'fertilizer', 'seed', 'harvest', 'rural', 'village', 'farmer', 'agricultural',
    'food security', 'sustainable farming', 'organic', 'livestock', 'dairy'
  ]
};

export function classifyProjectSector(description: string, title: string): ProjectSector {
  const text = `${title} ${description}`.toLowerCase();
  
  const sectorScores: { [key in ProjectSector]: number } = {
    health: 0,
    education: 0,
    infrastructure: 0,
    environment: 0,
    'disaster-relief': 0,
    'economic-development': 0,
    'social-services': 0,
    technology: 0,
    agriculture: 0,
    other: 0
  };

  // Score each sector based on keyword matches
  Object.entries(sectorKeywords).forEach(([sector, keywords]) => {
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      const matches = text.match(regex);
      if (matches) {
        sectorScores[sector as ProjectSector] += matches.length;
      }
    });
  });

  // Find the sector with the highest score
  const maxScore = Math.max(...Object.values(sectorScores));
  
  if (maxScore === 0) {
    return 'other';
  }

  const topSector = Object.entries(sectorScores).find(([_, score]) => score === maxScore)?.[0] as ProjectSector;
  return topSector;
}

export function getSectorDescription(sector: ProjectSector): string {
  const descriptions: { [key in ProjectSector]: string } = {
    health: 'Projects focused on healthcare, medical services, and public health initiatives',
    education: 'Projects supporting schools, educational programs, and learning opportunities',
    infrastructure: 'Projects building roads, bridges, utilities, and public facilities',
    environment: 'Projects promoting environmental conservation and sustainable practices',
    'disaster-relief': 'Projects providing emergency response and disaster preparedness',
    'economic-development': 'Projects supporting business development and economic growth',
    'social-services': 'Projects providing community support and social welfare services',
    technology: 'Projects promoting digital literacy and technology access',
    agriculture: 'Projects supporting farming, food security, and rural development',
    other: 'Projects that don\'t fit into the above categories'
  };
  
  return descriptions[sector];
}

export function getSectorIcon(sector: ProjectSector): string {
  const icons: { [key in ProjectSector]: string } = {
    health: '🏥',
    education: '📚',
    infrastructure: '🏗️',
    environment: '🌱',
    'disaster-relief': '🚨',
    'economic-development': '💼',
    'social-services': '🤝',
    technology: '💻',
    agriculture: '🚜',
    other: '📋'
  };
  
  return icons[sector];
}
