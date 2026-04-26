import React from 'react';

export default function Logo({ className = "", variant = "dark", showText = true }) {
  // Using the transparent logo.png
  const logoSrc = "/src/assets/logo.png";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src={logoSrc}
        alt="Savincliff"
        className="h-10 w-10 object-contain"
        // Removed the invert filter to keep the original logo colors on the dark background
      />
      {showText && (
        <div className={`flex flex-col leading-none ${variant === 'light' ? 'text-white' : 'text-[#0A0A0A]'}`}>
          <span className="font-serif text-[18px] font-medium tracking-tight">Savincliff</span>
          <span className="text-[10px] tracking-[0.22em] uppercase opacity-60 mt-0.5">Pharmacy & Care</span>
        </div>
      )}
    </div>
  );
}