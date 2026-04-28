import React from 'react';

export default function Logo({ className = "", variant = "dark" }) {
  return (
    <div className={`flex items-center gap-1.5 ${className} ${variant === 'light' ? 'text-white' : 'text-black'}`}>
       <span className="font-black text-2xl tracking-tighter uppercase leading-none">Savincliff</span>
       <div className="w-1.5 h-1.5 bg-[#FF0000] self-end mb-1" />
    </div>
  );
}