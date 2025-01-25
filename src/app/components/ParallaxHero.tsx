'use client';

import { useEffect, useState } from 'react';

interface ParallaxHeroProps {
  title: string;
  description: string;
  imageUrl: string;
}

export default function ParallaxHero({ title, description, imageUrl }: ParallaxHeroProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative h-[300px] overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url('${imageUrl}')`,
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-600/75" />
      <div 
        className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center"
        style={{
          transform: `translateY(${scrollY * 0.2}px)`,
        }}
      >
        <h1 className="text-4xl font-bold text-white mb-4 transition-transform">
          {title}
        </h1>
        <p className="text-xl text-gray-200 transition-transform">
          {description}
        </p>
      </div>
    </div>
  );
} 