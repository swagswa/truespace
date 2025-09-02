"use client";

import React from 'react';
import Image from 'next/image';

export type IconName = 
  | 'heart'
  | 'check'
  | 'home'
  | 'arrow-left'
  | 'chevron-down'
  | 'book'
  | 'external-link'
  | 'alert-circle'
  | 'lightning'
  | 'webinar'
  | 'design-ai'
  | 'no-code'
  | 'graduation-cap';

interface IconProps {
  name: IconName;
  className?: string;
  size?: number;
  color?: string;
}

export function Icon({ name, className = '', size = 24, color = 'currentColor' }: IconProps) {
  return (
    <div 
      className={`inline-flex items-center justify-center ${className}`}
      style={{ 
        width: size, 
        height: size,
        color: color
      }}
    >
      <Image
        src={`/${name}.svg`}
        alt={`${name} icon`}
        width={size}
        height={size}
        className="w-full h-full"
        style={{
          filter: color !== 'currentColor' ? 'none' : undefined
        }}
      />
    </div>
  );
}

// Компонент для inline SVG с возможностью кастомизации цвета
export function InlineIcon({ name, className = '', size = 24 }: Omit<IconProps, 'color'>) {
  const iconPaths: Record<IconName, string> = {
    'heart': 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z',
    'check': 'M20 6L9 17l-5-5',
    'home': 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9,22 9,12 15,12 15,22',
    'arrow-left': 'M19 12H5 M12 19l-7-7 7-7',
    'chevron-down': 'M6 9l6 6 6-6',
    'book': 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z',
    'external-link': 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6 M15,3 21,3 21,9 M10 14l11-11',
    'alert-circle': 'M12 12m-10 0a10,10 0 1,0 20,0a10,10 0 1,0 -20,0 M12 8v4 M12 16h.01',
    'lightning': 'M13 2L3 14h5l-1 8 10-12h-5l1-8z',
    'webinar': 'M21 16V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2zM23 7l-7 5 7 5V7zM2 20.5C2 21.3 2.7 22 3.5 22h17c.8 0 1.5-.7 1.5-1.5s-.7-1.5-1.5-1.5h-17c-.8 0-1.5.7-1.5 1.5z',
    'design-ai': 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM8 17.5c-1.38 0-2.5-1.12-2.5-2.5S6.62 12.5 8 12.5s2.5 1.12 2.5 2.5S9.38 17.5 8 17.5zM12 10c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM16 17.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
    'no-code': 'M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4zM12 18h2v2h-2v-2zM12 14h2v2h-2v-2zM12 10h2v2h-2v-2zM12 6h2v2h-2V6z',
    'graduation-cap': 'M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z'
  };

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {name === 'home' ? (
        <>
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9,22 9,12 15,12 15,22" />
        </>
      ) : name === 'external-link' ? (
        <>
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15,3 21,3 21,9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </>
      ) : name === 'alert-circle' ? (
        <>
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </>
      ) : name === 'book' ? (
        <>
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </>
      ) : name === 'arrow-left' ? (
        <>
          <path d="M19 12H5" />
          <path d="M12 19l-7-7 7-7" />
        </>
      ) : (
        <path d={iconPaths[name]} />
      )}
    </svg>
  );
}