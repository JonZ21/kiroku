'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Footer() {
  const [isHoveringLogo, setIsHoveringLogo] = useState(false);
  const [isHoveringGithub, setIsHoveringGithub] = useState(false);
  const [isHoveringContact, setIsHoveringContact] = useState(false);

  return (
    <footer className="relative overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0" style={{background: 'linear-gradient(to bottom right, #2B061E, #875053, #D2BF55)', opacity: 0.95}}></div>
      <div className="absolute inset-0 animate-gradient-slow" style={{background: 'linear-gradient(to top left, #875053, #FBBFCA, #FFEED6)', opacity: 0.7}}></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8 items-center text-center md:text-left">
          
          {/* Logo Section */}
          <div className="space-y-4">
            <Link 
              href="/"
              className="inline-block"
              onMouseEnter={() => setIsHoveringLogo(true)}
              onMouseLeave={() => setIsHoveringLogo(false)}
            >
              <h2 className={`text-4xl font-serif font-bold text-white transition-all duration-300 ${
                isHoveringLogo ? 'transform scale-110' : ''
              }`} style={isHoveringLogo ? {color: '#D2BF55'} : {}}>
                Kiroku
              </h2>
            </Link>
            <div className="h-1 w-16 rounded-full mx-auto md:mx-0 animate-pulse" style={{background: 'linear-gradient(to right, #D2BF55, #FBBFCA)'}}></div>
          </div>

          {/* Tagline Section */}
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold text-white mb-2 animate-fadeInUp">
              Track. Fight. 
              <span className="bg-clip-text text-transparent" style={{backgroundImage: 'linear-gradient(to right, #D2BF55, #FBBFCA, #FFEED6)'}}>
                Dominate.
              </span>
            </p>
            <p className="text-white/80 text-sm animate-fadeInUp animate-delay-200">
              Your ultimate Smash Bros companion
            </p>
          </div>

          {/* Links Section */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-end">
            {/* GitHub Link */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white hover:bg-white/20 transition-all duration-300 ${
                isHoveringGithub ? 'transform scale-105 shadow-lg shadow-white/25' : ''
              }`}
              onMouseEnter={() => setIsHoveringGithub(true)}
              onMouseLeave={() => setIsHoveringGithub(false)}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span className="font-medium">GitHub</span>
            </a>

            {/* Contact Button */}
            <button
              className={`group flex items-center gap-2 px-6 py-3 rounded-full text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 ${
                isHoveringContact ? 'transform scale-105' : ''
              }`}
              style={{
                background: 'linear-gradient(to right, #875053, #D2BF55)',
                boxShadow: isHoveringContact ? '0 20px 25px -5px rgba(210, 191, 85, 0.3)' : undefined
              }}
              onMouseEnter={() => setIsHoveringContact(true)}
              onMouseLeave={() => setIsHoveringContact(false)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Contact</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/20 text-center">
          <p className="text-white/60 text-sm">
            © 2024 Kiroku. Made with 🤍 for the Smash community.
          </p>
        </div>
      </div>

    </footer>
  );
}