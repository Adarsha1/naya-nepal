'use client';

import Link from 'next/link';
import { MapPin, Home, Wand2 } from 'lucide-react';

export default function Navigation() {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800">
              <span className="text-xl font-bold">Naya Nepal 🇳🇵</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-6">
            <Link 
              href="/" 
              className="flex items-center text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              <Home className="h-4 w-4 mr-2" />
              Organizations
            </Link>
            <Link 
              href="/map" 
              className="flex items-center text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              <MapPin className="h-4 w-4 mr-2" />
              Map View
            </Link>
            <Link 
              href="/classify" 
              className="flex items-center text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              <Wand2 className="h-4 w-4 mr-2" />
              Classify
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
