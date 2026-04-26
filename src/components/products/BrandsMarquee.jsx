import React from 'react';

const brands = [
  'GSK','Pfizer','Sanofi','Emzor','Fidson','May & Baker',
  'Bayer','J&J','Nestlé Health','Swiss Pharma','Neimeth',
  'Roche','Abbott','Merck','Novartis','P&G',
];

export default function BrandsMarquee() {
  return (
    <section className="bg-[#0A0A0A] text-white py-16 md:py-24 overflow-hidden border-y border-white/5">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 mb-10">
        <div className="flex items-center gap-4 text-[10px] tracking-[0.35em] uppercase text-white/35">
          <span className="w-8 h-px bg-white/25" />
          <span>Trusted Brands & Partners</span>
        </div>
        <h3 className="font-serif text-3xl md:text-5xl font-light mt-5 max-w-2xl">
          Sourced from globally recognized{' '}
          <em className="not-italic text-[#1B6E8C]">pharmaceutical leaders</em>.
        </h3>
      </div>
      <div className="flex marquee-track whitespace-nowrap gap-16 select-none">
        {[...brands, ...brands].map((b, i) => (
          <span key={i} className="font-serif text-4xl md:text-6xl text-white/18 hover:text-white/60 transition-colors cursor-default">
            {b}
          </span>
        ))}
      </div>
    </section>
  );
}