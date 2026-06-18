import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import useCmsPage from '@/hooks/useCmsPage';
import { DEFAULT_FAQS_SECTIONS } from '@/lib/cmsDefaults';

export default function Faqs() {
  const { sections, loading } = useCmsPage('faqs', DEFAULT_FAQS_SECTIONS);

  const heroSec = sections.find(s => s.type === 'faqs_hero') || DEFAULT_FAQS_SECTIONS[0];
  const catSec = sections.find(s => s.type === 'faqs_categories') || DEFAULT_FAQS_SECTIONS[1];

  const categories = catSec.data.categories || [];

  const [activeTab, setActiveTab] = useState('');
  const [expandedQ, setExpandedQ] = useState({});

  useEffect(() => {
    if (categories.length > 0 && !activeTab) {
      setActiveTab(categories[0].id);
    }
  }, [categories, activeTab]);

  // Dynamic intersection observer to update active floating navbar pill on scroll
  useEffect(() => {
    if (categories.length === 0) return;
    const handleScroll = () => {
      const sectionElements = categories.map(c => document.getElementById(c.id));
      const scrollPos = window.scrollY + window.innerHeight / 3;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const sec = sectionElements[i];
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveTab(categories[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [categories]);

  const scrollToSection = (id) => {
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) {
      // Smooth native scrolling factoring in sticky desktop header clearance
      const yOffset = -120;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const toggleExpand = (catIndex, qIndex) => {
    const key = `${catIndex}-${qIndex}`;
    setExpandedQ(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const getCustomStyles = (data) => {
    const styles = {};
    if (data?.customTextColor) styles.color = data.customTextColor;
    if (data?.customFontFamily) styles.fontFamily = data.customFontFamily;
    if (data?.customFontWeight) styles.fontWeight = data.customFontWeight;
    if (data?.customFontSize) styles.fontSize = data.customFontSize;
    return styles;
  };

  return (
    <div className="bg-black text-white min-h-screen pb-48 pt-32 select-none overflow-x-hidden">
      {/* Hero Section */}
      <section className="px-6 md:px-12 pt-12 pb-24 text-center max-w-[1400px] mx-auto" style={getCustomStyles(heroSec.data)}>
        {/* SVZ bespoke stylized Serif/Italic interspersing */}
        <h1 className="display-giant font-black uppercase tracking-[-0.04em] leading-[0.85]">
          {heroSec.data.title1}<br />
          Q<span className="font-serif italic text-brand-teal inline-block transform -rotate-6 mx-1">{heroSec.data.titleLetter1 || 'U'}</span>E
          <span className="font-serif italic text-white/90 inline-block transform rotate-2">{heroSec.data.titleLetter2 || 'S'}</span>TI
          <span className="font-serif italic text-brand-teal inline-block transform -rotate-3 mx-1">{heroSec.data.titleLetter3 || 'O'}</span>NS
        </h1>
        <p className="text-white/50 text-xs md:text-sm font-medium max-w-lg mx-auto mt-8 tracking-wide">
          {heroSec.data.desc}
        </p>
      </section>

      {/* Main Categories & Question Grids */}
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 flex flex-col gap-28" style={getCustomStyles(catSec.data)}>
        {categories.map((cat, cIdx) => (
          <section key={cat.id || cIdx} id={cat.id} className="scroll-mt-32">
            {/* Category Header */}
            <div className="flex items-baseline gap-3 mb-8 border-b border-white/10 pb-4">
              <span className="text-xs font-black text-brand-teal">{cat.idNum}</span>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white uppercase">{cat.title}</h2>
            </div>

            {/* Question Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(cat.questions || []).map((item, qIdx) => {
                const isExpanded = expandedQ[`${cIdx}-${qIdx}`];
                return (
                  <motion.div
                    key={qIdx}
                    layout
                    onClick={() => toggleExpand(cIdx, qIdx)}
                    className="bg-[#262626] rounded-xl p-8 relative overflow-hidden flex flex-col justify-between min-h-[280px] border border-white/5 shadow-xl group cursor-pointer hover:border-brand-teal/30 transition-all duration-500"
                  >
                    {/* SVZ Signature Internal Corner Crossmarks (+) */}
                    <span className="absolute top-2 left-3 text-brand-teal text-2xs select-none opacity-80">+</span>
                    <span className="absolute top-2 right-3 text-brand-teal text-2xs select-none opacity-80">+</span>
                    <span className="absolute bottom-2 left-3 text-brand-teal text-2xs select-none opacity-80">+</span>
                    <span className="absolute bottom-2 right-3 text-brand-teal text-2xs select-none opacity-80">+</span>

                    {/* Top Content Area */}
                    <div>
                      {/* Eyebrow Category */}
                      <div className="text-brand-teal text-2xs font-black tracking-[0.2em] uppercase mb-4">
                        {cat.tag}
                      </div>

                      {/* Question Heading */}
                      <h3 className="font-serif text-base md:text-lg text-white mb-4 leading-snug tracking-wide group-hover:text-white transition-colors">
                        {item.q}
                      </h3>

                      {/* Answer Block */}
                      <AnimatePresence initial={false}>
                        <motion.div
                          initial={{ height: 'auto', opacity: 1 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          className="overflow-hidden"
                        >
                          <p className={`text-xs md:text-sm text-white/60 tracking-normal font-normal leading-relaxed ${!isExpanded ? 'line-clamp-3' : ''}`}>
                            {item.a}
                          </p>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Card Footer Link */}
                    <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-2xs font-black tracking-[0.2em] text-white uppercase group-hover:text-brand-teal transition-colors">
                      {isExpanded ? (
                        <span>COLLAPSE</span>
                      ) : (
                        <Link to={`/faqs/${item.slug || 'default'}`} onClick={(e) => e.stopPropagation()} className="hover:text-brand-teal">
                          READ MORE
                        </Link>
                      )}
                      <span className="text-brand-teal text-xs transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {/* Floating Bottom Toolbar Pill */}
      {categories.length > 0 && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-[95vw] md:max-w-max">
          <div className="bg-[#141414]/95 backdrop-blur-md border border-white/10 rounded-full p-1.5 flex items-center gap-1 overflow-x-auto no-scrollbar shadow-2xl mx-auto max-w-full">
            {categories.map((cat) => {
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => scrollToSection(cat.id)}
                  className={`px-4 md:px-5 py-2.5 rounded-full text-2xs md:text-2xs font-bold tracking-[0.15em] uppercase whitespace-nowrap transition-all duration-300 shrink-0 ${
                    isActive 
                      ? 'bg-transparent text-white border border-brand-teal shadow-[0_0_15px_rgba(27,110,140,0.3)]' 
                      : 'text-white/40 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  {cat.title}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
