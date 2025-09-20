# TypeScript + Tailwind Examples

This file contains practical examples of how to use the components and patterns in your Naya Nepal project.

## 🎯 Component Usage Examples

### 1. Basic Button Usage

```typescript
import Button from '@/components/ui/Button'

// Different variants
<Button variant="primary">Primary Action</Button>
<Button variant="secondary">Secondary Action</Button>
<Button variant="danger">Delete Item</Button>
<Button variant="ghost">Subtle Action</Button>

// Different sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// With loading state
<Button loading={isSubmitting}>
  {isSubmitting ? 'Saving...' : 'Save Changes'}
</Button>

// With click handler
<Button onClick={() => handleSubmit()}>
  Submit Form
</Button>
```

### 2. Input Component with Validation

```typescript
import { useState } from 'react'
import Input from '@/components/ui/Input'
import { isValidEmail } from '@/lib/utils'

function ContactForm() {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')

  const validateEmail = (value: string) => {
    if (!value) {
      setEmailError('Email is required')
    } else if (!isValidEmail(value)) {
      setEmailError('Please enter a valid email')
    } else {
      setEmailError('')
    }
  }

  return (
    <Input
      label="Email Address"
      type="email"
      value={email}
      onChange={(e) => {
        setEmail(e.target.value)
        validateEmail(e.target.value)
      }}
      error={emailError}
      placeholder="Enter your email"
      leftIcon={
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
        </svg>
      }
    />
  )
}
```

### 3. Card Component Variations

```typescript
import Card from '@/components/ui/Card'

// Basic card
<Card title="Project Title">
  <p>Project description goes here...</p>
</Card>

// Card with subtitle
<Card 
  title="Digital Literacy Program" 
  subtitle="Education • Active"
  padding="lg"
  shadow="lg"
>
  <p>Teaching digital skills to rural communities...</p>
</Card>

// Interactive card
<Card 
  className="hover:shadow-xl transition-shadow cursor-pointer"
  onClick={() => handleCardClick()}
>
  <h3>Clickable Card</h3>
  <p>This card responds to clicks</p>
</Card>
```

### 4. Using Custom Hooks

```typescript
'use client'

import { useState, useEffect } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useDebounce } from '@/hooks/useDebounce'
import type { User } from '@/types'

function UserProfile() {
  // Persist user data in localStorage
  const [user, setUser] = useLocalStorage<User | null>('user', null)
  
  // Debounced search
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  
  // Effect runs only when debounced value changes
  useEffect(() => {
    if (debouncedSearchTerm) {
      console.log('Searching for:', debouncedSearchTerm)
      // Make API call here
    }
  }, [debouncedSearchTerm])

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      {user && (
        <div>
          <h2>Welcome, {user.name}!</h2>
          <button onClick={() => setUser(null)}>
            Logout
          </button>
        </div>
      )}
    </div>
  )
}
```

## 🎨 Tailwind CSS Patterns

### 1. Responsive Design

```typescript
// Mobile-first responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  {/* Items */}
</div>

// Responsive text sizes
<h1 className="text-2xl md:text-4xl lg:text-6xl font-bold">
  Responsive Heading
</h1>

// Responsive padding/margin
<div className="p-4 md:p-6 lg:p-8">
  <div className="space-y-4 md:space-y-6 lg:space-y-8">
    {/* Content */}
  </div>
</div>
```

### 2. Dark Mode Support

```typescript
// Add to your component
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  <h2 className="text-gray-800 dark:text-gray-200">
    This adapts to dark mode
  </h2>
</div>

// Button that works in both modes
<button className="
  bg-blue-600 hover:bg-blue-700 
  dark:bg-blue-500 dark:hover:bg-blue-600
  text-white px-4 py-2 rounded
">
  Dark Mode Ready
</button>
```

### 3. Animation and Transitions

```typescript
// Hover effects
<div className="
  transform transition-all duration-300 
  hover:scale-105 hover:shadow-lg
  cursor-pointer
">
  Hover me!
</div>

// Loading spinner
<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600">
</div>

// Fade in animation
<div className="
  opacity-0 animate-fade-in
  transition-opacity duration-500
">
  Fades in smoothly
</div>
```

### 4. Form Layouts

```typescript
function ProjectForm() {
  return (
    <form className="space-y-6 max-w-2xl mx-auto">
      {/* Two-column layout on larger screens */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Project Title" />
        <Input label="Category" />
      </div>
      
      {/* Full-width fields */}
      <Input label="Description" />
      
      {/* Button group */}
      <div className="flex flex-col sm:flex-row gap-3 justify-end">
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary" type="submit">
          Save Project
        </Button>
      </div>
    </form>
  )
}
```

## 🔧 TypeScript Patterns

### 1. Component Props with Defaults

```typescript
interface ComponentProps {
  title: string
  subtitle?: string
  variant?: 'default' | 'highlighted'
  onAction?: (id: string) => void
}

function MyComponent({ 
  title, 
  subtitle, 
  variant = 'default',
  onAction 
}: ComponentProps) {
  // Component logic
}
```

### 2. Generic Components

```typescript
interface ListProps<T> {
  items: T[]
  renderItem: (item: T) => React.ReactNode
  keyExtractor: (item: T) => string
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={keyExtractor(item)}>
          {renderItem(item)}
        </div>
      ))}
    </div>
  )
}

// Usage
<List
  items={projects}
  renderItem={(project) => <ProjectCard project={project} />}
  keyExtractor={(project) => project.id}
/>
```

### 3. API Response Handling

```typescript
import type { ApiResponse, Project } from '@/types'

async function fetchProjects(): Promise<Project[]> {
  try {
    const response = await fetch('/api/projects')
    const data: ApiResponse<Project[]> = await response.json()
    
    if (data.success) {
      return data.data
    } else {
      throw new Error(data.message)
    }
  } catch (error) {
    console.error('Failed to fetch projects:', error)
    throw error
  }
}

// Usage in component
function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProjects()
      .then(setProjects)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}
```

## 🚀 Next Steps

1. **Run the development server**:
   ```bash
   npm run dev
   ```

2. **Explore the components** in your browser at `http://localhost:3000`

3. **Try modifying** the components to see how TypeScript helps catch errors

4. **Add new features** like:
   - Search functionality
   - Filtering by category
   - User authentication
   - Project submission form

5. **Learn more about**:
   - Next.js App Router
   - Server Components vs Client Components
   - API Routes
   - Database integration with Prisma
   - Authentication with NextAuth.js

Happy coding! 🎉
