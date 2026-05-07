import React from 'react';

export default function Logo({ className = "", variant = "dark" }) {
  return (
    <div className={`flex items-center relative ${className}`}>
      <img
        src="/logo.svg"
        alt="Savincliff"
        className={`h-[80px] md:h-[108px] w-auto object-contain transition-all duration-300`}
      />
    </div>
  );
}