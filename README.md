# Naya Nepal 🇳🇵

A transparency platform for Nepal-focused nonprofit projects, enabling donors and supporters to discover organizations, track funding, and verify project impact.

## Features

### 🏢 Organization Discovery
- **Comprehensive Directory**: Browse verified nonprofit organizations working on Nepal projects
- **Location-based Filtering**: Find organizations by state/city in the US
- **Verification System**: Verified organizations are clearly marked for credibility
- **Contact Information**: Direct access to organization websites, emails, and phone numbers

### 📊 Project Transparency
- **Detailed Project Information**: View project descriptions, locations, and timelines
- **Funding Breakdown**: See exactly how funds are allocated across different categories
- **Progress Tracking**: Monitor project updates and funding progress
- **Past Initiatives**: Access historical project data and outcomes

### 🗺️ Interactive Map
- **Geographic Visualization**: See organization locations across the US on an interactive map
- **Filtered Views**: Filter map by sector and project status
- **Quick Access**: Click markers to view organization details and projects

### 🎯 Smart Classification
- **AI-Powered Sector Detection**: Automatically classify projects into sectors (Health, Education, Infrastructure, etc.)
- **Keyword Analysis**: Uses advanced keyword matching to determine project categories
- **Consistent Organization**: Ensures projects are properly categorized for better discoverability

### 🔍 Advanced Filtering
- **Multi-dimensional Filters**: Filter by sector, project status, and organization location
- **Real-time Results**: Instant filtering with live result counts
- **Comprehensive Search**: Find exactly what you're looking for quickly

## Project Sectors

The platform supports the following project sectors:

- 🏥 **Health**: Medical services, healthcare access, public health initiatives
- 📚 **Education**: Schools, educational programs, learning opportunities
- 🏗️ **Infrastructure**: Roads, bridges, utilities, public facilities
- 🌱 **Environment**: Conservation, sustainable practices, renewable energy
- 🚨 **Disaster Relief**: Emergency response, disaster preparedness
- 💼 **Economic Development**: Business development, economic growth
- 🤝 **Social Services**: Community support, social welfare
- 💻 **Technology**: Digital literacy, technology access
- 🚜 **Agriculture**: Farming, food security, rural development
- 📋 **Other**: Projects that don't fit other categories

## Technology Stack

- **Frontend**: Next.js 15 with React 19
- **Styling**: Tailwind CSS 4
- **Maps**: React Map GL with Mapbox
- **Icons**: Lucide React
- **Language**: TypeScript
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd naya-nepal
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Create .env.local file
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── organization/[id]/  # Organization detail pages
│   ├── map/               # Interactive map view
│   ├── classify/          # Project classification tool
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable components
│   └── Navigation.tsx     # Main navigation
├── data/                 # Mock data and samples
│   └── mockData.ts       # Sample organizations and projects
├── types/                # TypeScript type definitions
│   └── index.ts          # Main type definitions
└── utils/                # Utility functions
    └── sectorClassifier.ts # AI classification logic
```

## Key Features Explained

### Funding Transparency
Each project shows:
- **Target Amount**: How much funding is needed
- **Raised Amount**: Current funding received
- **Progress Bar**: Visual representation of funding progress
- **Breakdown**: Detailed allocation of funds across categories
- **Updates**: Regular progress reports with funding milestones

### Organization Verification
- Organizations can be marked as "verified" after meeting certain criteria
- Verified status is prominently displayed throughout the platform
- Helps donors identify credible organizations

### Location-based Discovery
- Organizations are located across different US states
- Users can filter by their state to find local organizations
- Map view shows geographic distribution of organizations

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or support, please contact [your-email@example.com]

---

**Naya Nepal** - Building transparency in Nepal-focused humanitarian efforts 🇳🇵