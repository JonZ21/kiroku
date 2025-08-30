'use client';

import { useState } from 'react';
import Link from 'next/link';
import PlayerSearch from '../ui/PlayerSearch';
import ThemeToggle from '../ui/ThemeToggle';

export default function Header() {
  const [isPlayerSearchOpen, setIsPlayerSearchOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-background/90 backdrop-blur-sm border-b border-foreground/10 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl font-serif font-bold text-foreground hover:opacity-80 transition-opacity">
              Kiroku
            </h1>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-8">
            {/* Players Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsPlayerSearchOpen(!isPlayerSearchOpen)}
                className="text-foreground hover:opacity-80 transition-opacity font-medium"
              >
                Players
              </button>
              <PlayerSearch 
                isOpen={isPlayerSearchOpen} 
                onClose={() => setIsPlayerSearchOpen(false)} 
              />
            </div>

            {/* Matches Link */}
            <Link 
              href="/matches" 
              className="text-foreground hover:opacity-80 transition-opacity font-medium"
            >
              Matches
            </Link>

            {/* Stats Link */}
            <Link 
              href="/stats" 
              className="text-foreground hover:opacity-80 transition-opacity font-medium"
            >
              Stats
            </Link>

            {/* Theme Toggle */}
            <ThemeToggle />
          </nav>
        </div>
      </div>

      {/* Overlay to close dropdown */}
      {isPlayerSearchOpen && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setIsPlayerSearchOpen(false)}
        />
      )}
    </header>
  );
}