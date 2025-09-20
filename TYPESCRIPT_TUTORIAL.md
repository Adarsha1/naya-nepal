# TypeScript + Next.js + Tailwind CSS Tutorial

## 📁 Project Structure Overview

Your current project follows the **Next.js App Router** structure (Next.js 13+). Here's what each file does:

```
naya-nepal/
├── src/app/                 # App Router directory (Next.js 13+)
│   ├── layout.tsx          # Root layout component
│   ├── page.tsx            # Home page component
│   ├── globals.css         # Global styles + Tailwind imports
│   └── favicon.ico         # Site icon
├── public/                 # Static assets (images, icons)
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── next.config.ts         # Next.js configuration
├── postcss.config.mjs     # PostCSS config (for Tailwind)
└── eslint.config.mjs      # ESLint configuration
```

## 🎯 Key File Purposes

### `tsconfig.json` - TypeScript Configuration
```json
{
  "compilerOptions": {
    "target": "ES2017",           // JavaScript version to compile to
    "lib": ["dom", "esnext"],     // Available APIs (DOM, modern JS)
    "strict": true,               // Enable strict type checking
    "jsx": "preserve",            // Keep JSX for Next.js to handle
    "paths": {
      "@/*": ["./src/*"]          // Path alias: @/components = src/components
    }
  }
}
```

### `package.json` - Dependencies
- **dependencies**: Runtime packages (React, Next.js)
- **devDependencies**: Development tools (TypeScript, Tailwind, ESLint)

### `src/app/layout.tsx` - Root Layout
- Wraps all pages
- Defines HTML structure
- Loads fonts and global styles
- Sets metadata

### `src/app/page.tsx` - Home Page
- Default route component (`/`)
- Uses TypeScript + JSX (TSX)

## 🏗️ Recommended Project Structure

For a larger project, organize like this:

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Route groups (optional)
│   │   ├── login/
│   │   └── register/
│   ├── dashboard/
│   │   └── page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components/            # Reusable UI components
│   ├── ui/               # Basic UI elements
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Card.tsx
│   ├── forms/            # Form components
│   └── layout/           # Layout components
├── lib/                  # Utility functions
│   ├── utils.ts
│   ├── api.ts
│   └── constants.ts
├── types/                # TypeScript type definitions
│   ├── index.ts
│   └── api.ts
├── hooks/                # Custom React hooks
└── styles/               # Additional styles
```

## 🎨 TypeScript + Tailwind Integration

### 1. Component with Props and Tailwind

```typescript
// src/components/ui/Button.tsx
import { ReactNode } from 'react'

// Define prop types
interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  disabled?: boolean
  className?: string
}

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  onClick,
  disabled = false,
  className = ''
}: ButtonProps) {
  // Base styles
  const baseStyles = 'font-medium rounded-lg transition-colors focus:outline-none focus:ring-2'
  
  // Variant styles
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900 focus:ring-gray-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500'
  }
  
  // Size styles
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  }
  
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
```

### 2. Card Component with TypeScript

```typescript
// src/components/ui/Card.tsx
import { ReactNode } from 'react'

interface CardProps {
  title?: string
  children: ReactNode
  className?: string
  padding?: 'sm' | 'md' | 'lg'
}

export default function Card({ 
  title, 
  children, 
  className = '',
  padding = 'md' 
}: CardProps) {
  const paddingStyles = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }
  
  return (
    <div className={`bg-white rounded-lg shadow-md border ${paddingStyles[padding]} ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      )}
      {children}
    </div>
  )
}
```

### 3. Form Component with State Management

```typescript
// src/components/forms/ContactForm.tsx
'use client' // Client component for interactivity

import { useState } from 'react'
import Button from '@/components/ui/Button'

// Form data type
interface FormData {
  name: string
  email: string
  message: string
}

// Form errors type
interface FormErrors {
  name?: string
  email?: string
  message?: string
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  })
  
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Validate form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    try {
      // API call would go here
      console.log('Form submitted:', formData)
      
      // Reset form
      setFormData({ name: '', email: '', message: '' })
      setErrors({})
    } catch (error) {
      console.error('Submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Your name"
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="your@email.com"
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.message ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Your message..."
        />
        {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
      </div>
      
      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  )
}
```

## 🔧 Best Practices

### 1. Type Definitions
Create a `types` folder for shared types:

```typescript
// src/types/index.ts
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

export interface Project {
  id: string
  title: string
  description: string
  category: 'education' | 'health' | 'technology' | 'environment'
  status: 'active' | 'completed' | 'planned'
  createdAt: Date
  updatedAt: Date
}

export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}
```

### 2. Utility Functions
```typescript
// src/lib/utils.ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Combine Tailwind classes properly
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format date
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

// Truncate text
export function truncate(text: string, length: number): string {
  return text.length > length ? text.substring(0, length) + '...' : text
}
```

### 3. Custom Hooks
```typescript
// src/hooks/useLocalStorage.ts
'use client'

import { useState, useEffect } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue)

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key)
      if (item) {
        setStoredValue(JSON.parse(item))
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
    }
  }, [key])

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  return [storedValue, setValue] as const
}
```

## 🎨 Tailwind CSS Best Practices

### 1. Use CSS Variables for Theming
```css
/* globals.css */
@import "tailwindcss";

:root {
  --color-primary: #3b82f6;
  --color-secondary: #6b7280;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-danger: #ef4444;
}

@theme inline {
  --color-primary: var(--color-primary);
  --color-secondary: var(--color-secondary);
  /* ... */
}
```

### 2. Component Variants Pattern
```typescript
// src/components/ui/Alert.tsx
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface AlertProps {
  children: ReactNode
  variant?: 'info' | 'success' | 'warning' | 'error'
  className?: string
}

export default function Alert({ children, variant = 'info', className }: AlertProps) {
  return (
    <div
      className={cn(
        'p-4 rounded-lg border',
        {
          'bg-blue-50 border-blue-200 text-blue-800': variant === 'info',
          'bg-green-50 border-green-200 text-green-800': variant === 'success',
          'bg-yellow-50 border-yellow-200 text-yellow-800': variant === 'warning',
          'bg-red-50 border-red-200 text-red-800': variant === 'error',
        },
        className
      )}
    >
      {children}
    </div>
  )
}
```

### 3. Responsive Design
```typescript
export default function ResponsiveGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns */}
    </div>
  )
}
```

## 🚀 Next Steps

1. **Install useful packages**:
   ```bash
   npm install clsx tailwind-merge
   npm install -D @types/node
   ```

2. **Create the folder structure**:
   ```bash
   mkdir -p src/{components/{ui,forms,layout},lib,types,hooks}
   ```

3. **Start building components** using the patterns above

4. **Learn about**:
   - Next.js App Router routing
   - Server vs Client Components
   - API Routes
   - Middleware
   - Database integration

This structure will scale well as your project grows!
