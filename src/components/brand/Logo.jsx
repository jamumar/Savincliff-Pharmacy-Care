import React from 'react';

export default function Logo({ className = "", variant = "dark" }) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <img 
        src="/logo.svg" 
        alt="Savincliff" 
        className={`h-12 md:h-16 w-auto object-contain transition-all duration-300 ${variant === 'light' ? 'brightness-0 invert' : ''}`}
      />
    </div>
  );
}