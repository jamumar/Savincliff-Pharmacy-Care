import React from 'react';

export default function Logo({ className = "", variant = "dark" }) {
  return (
    <div className={`flex items-center relative ${className}`}>
      <img 
        src="/logo.svg?v=34" 
        alt="Savincliff" 
        className={`h-[64px] md:h-[84px] w-auto object-contain transition-all duration-300 ${variant === 'light' ? 'invert hue-rotate-180' : ''}`}
      />
      <span className={`absolute top-[6px] md:top-[8px] right-[-10px] md:right-[-14px] text-[14px] md:text-[20px] font-black ${variant === 'light' ? 'text-white' : 'text-[#0d3252]'} pointer-events-none`}>®</span>
    </div>
  );
}