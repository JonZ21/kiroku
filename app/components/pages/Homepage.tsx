'use client';

import { useState, useRef, useEffect } from 'react';
import RecentMatches from '../ui/RecentMatches';

export default function Homepage() {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const checkTheme = () => {
      const theme = document.documentElement.getAttribute('data-theme');
      setIsDarkMode(theme === 'dark');
    };

    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (titleRef.current) {
      const rect = titleRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePosition({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
    }
  };

  const gradientStyle = {
    backgroundImage: isDarkMode 
      ? `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
          var(--kiroku-pink), 
          var(--kiroku-mauve), 
          var(--kiroku-pink))`
      : `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
          var(--kiroku-gold), 
          var(--kiroku-mauve), 
          var(--kiroku-gold))`,
    opacity: isHovering ? 1 : 0,
    transition: 'opacity 300ms ease-out'
  };

  return (
    <div className="min-h-screen">
      <section className="h-[40vh] flex flex-col items-center justify-center px-4 py-8">
        <div className="text-center">
          <div className="relative">
            <h1 
              ref={titleRef}
              className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold animate-fadeInUp text-foreground cursor-default"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              onMouseMove={handleMouseMove}
            >
              Kiroku
            </h1>
            <h1 
              className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold absolute inset-0 bg-clip-text text-transparent pointer-events-none"
              style={{
                backgroundImage: gradientStyle.backgroundImage,
                opacity: gradientStyle.opacity,
                transition: gradientStyle.transition
              }}
            >
              Kiroku
            </h1>
          </div>
          <p className="font-sans text-lg md:text-xl text-foreground/70 mt-2">
            Super Smash Bros Match Counter
          </p>
          <div className="mt-12">
            <button className="bg-foreground text-background px-8 py-4 rounded-full font-medium text-lg hover:scale-105 transition-transform duration-200 animate-pulse-slow">
              Start Tracking
            </button>
          </div>
        </div>
      </section>

      <RecentMatches />
    </div>
  );
}