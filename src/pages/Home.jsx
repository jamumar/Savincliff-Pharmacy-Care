import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Plus, Check } from 'lucide-react';
import { Player } from '@lottiefiles/react-lottie-player';

import AnimatedText from '@/components/ui/AnimatedText';
import ScrollMarquee from '@/components/ui/ScrollMarquee';
import { useCart } from '@/lib/CartContext';
import { MOCK_PRODUCTS } from '@/pages/Shop';
import useCmsPage from '@/hooks/useCmsPage';
import { DEFAULT_HOME_SECTIONS } from '@/lib/cmsDefaults';

const ease = [0.16, 1, 0.3, 1];

// Helper to inject premium hover text spans on specific matching words dynamically
function renderTextWithHoverSpans(text, interactiveWords = []) {
  if (!text) return null;
  if (!interactiveWords || interactiveWords.length === 0) return text;
  
  const sortedWords = [...interactiveWords].sort((a, b) => b.length - a.length);
  const regex = new RegExp(`\\b(${sortedWords.join('|')})\\b`, 'gi');
  const parts = text.split(regex);
  
  return parts.map((part, i) => {
    const isInteractive = sortedWords.some(w => w.toLowerCase() === part.toLowerCase());
    if (isInteractive) {
      return (
        <motion.span
          key={i}
          initial={{ color: 'rgba(27, 110, 140, 0.4)' }}
          whileHover={{ scale: 1.1, color: '#1B6E8C', y: -4, textShadow: '0 0 20px rgba(27, 110, 140, 0.4)' }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          className="inline-block italic font-serif cursor-pointer origin-center"
        >
          {part}
        </motion.span>
      );
    }
    return part;
  });
}

/* ═══════════════════════════════════════════════════════
   SECTION 1 — HERO
   ═══════════════════════════════════════════════════════ */
function HeroSection({ data }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const { topLabel, line1Small, line1Big, line2Small, line2Big, line3Big, lottieBg, linkText } = data;

  return (
    <section
      ref={ref}
      className="relative h-[100svh] bg-black overflow-hidden flex flex-col items-center justify-center"
    >
      {/* ── Background Animation ── */}
      {lottieBg && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            filter: 'hue-rotate(200deg) saturate(1.5) brightness(0.8)',
            opacity: 0.4,
          }}
        >
          <Player
            autoplay
            loop
            src={lottieBg}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      )}
 
      {/* ── Top Label ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease }}
        className="absolute top-60 md:top-80 z-20 text-2xs md:text-sm font-black tracking-[0.4em] uppercase text-white/40"
      >
        {topLabel}
      </motion.div>

      {/* ── Main Headline ── */}
      <motion.div
        style={{ y: yText, opacity: opacityText }}
        className="relative z-20 w-full px-4 text-white mt-40 md:mt-60"
      >
        <div className="mx-auto grid w-fit grid-cols-[18vw_auto] md:grid-cols-[18vw_auto] items-center gap-x-2 md:gap-x-6 text-center">
          {/* Line 1 small text */}
          <AnimatedText
            text={line1Small}
            splitBy="char"
            className="justify-self-end self-center whitespace-nowrap font-serif-italic font-light text-[4.2vw] md:text-[3vw] text-white/50 lowercase leading-none"
          />

          {/* Line 1 big text */}
          <AnimatedText
            text={line1Big}
            splitBy="word"
            className="justify-self-start whitespace-nowrap font-black uppercase tracking-[-0.04em] text-[8vw] md:text-[6vw] leading-none"
          />

          {/* Line 2 small text */}
          <AnimatedText
            text={line2Small}
            splitBy="char"
            delay={0.2}
            className="justify-self-end self-center whitespace-nowrap font-serif-italic font-light text-[4.2vw] md:text-[3vw] text-white/50 lowercase leading-none"
          />

          {/* Line 2 big text */}
          <AnimatedText
            text={line2Big}
            splitBy="word"
            delay={0.2}
            className="justify-self-start whitespace-nowrap font-black uppercase tracking-[-0.04em] text-[8vw] md:text-[6vw] leading-none"
          />

          {/* Line 3 empty left col */}
          <div />

          {/* Line 3 big text */}
          <AnimatedText
            text={line3Big}
            splitBy="char"
            delay={0.4}
            className="justify-self-start whitespace-nowrap font-black uppercase tracking-[-0.04em] text-[8vw] md:text-[6vw] leading-none"
          />
        </div>
      </motion.div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 z-20 flex flex-col items-center gap-4"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-white/0 via-white/50 to-white/0" />

        <Link
          to="/shop"
          className="text-2xs md:text-sm font-black tracking-[0.4em] uppercase text-white/30 hover:text-white transition-colors"
        >
          {linkText}
        </Link>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION 2 — WE ARE (Always Hardcoded/Static as requested)
   ═══════════════════════════════════════════════════════ */
function WeAreSection({ scrollYProgress }) {
  const y = useTransform(scrollYProgress, [0, 0.28], ['100vh', '0vh']);
  const scale = useTransform(scrollYProgress, [0.22, 0.45, 0.7, 0.95], [1, 4, 14, 43.75]);
  const opacity = useTransform(scrollYProgress, [0.88, 0.98], [1, 0]);
  const backgroundColor = useTransform(scrollYProgress, [0, 0.4, 0.9], ['rgba(160,160,160,0.35)', 'rgba(8,8,8,0.75)', 'rgba(8,8,8,1)']);

  return (
    <motion.div
      style={{
        y,
        backgroundColor,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <motion.div
        style={{
          scale,
          opacity,
          width: '80vw',
          transformOrigin: '20% center',
          willChange: 'transform',
        }}
        className="flex-shrink-0"
      >
        <img
          src="https://cdn.prod.website-files.com/67ec482dfa06d8122041aef1/67ec482dfa06d8122041b028_WE%20Are.svg"
          alt="WE ARE"
          className="w-full h-auto select-none pointer-events-none"
          loading="lazy"
          draggable={false}
        />
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION 3 — MANIFESTO
   ═══════════════════════════════════════════════════════ */
function ManifestoSection({ data }) {
  const { label, title, text, interactiveWords, columns } = data;

  return (
    <section className="relative z-10 bg-black text-white py-40 md:py-60 mt-[-35vh]">
      <div className="grid-container grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
        <div className="lg:col-span-4 lg:sticky lg:top-40">
          <p className="text-2xs md:text-sm font-black tracking-[0.4em] uppercase text-brand-teal mb-8">{label}</p>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">{title}</h2>
        </div>
        <div className="lg:col-span-8">
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease }}
            className="text-2xl md:text-5xl font-bold uppercase leading-[1.1] tracking-tight text-justify-inter"
          >
            {renderTextWithHoverSpans(text, interactiveWords)}
          </motion.p>
          
          {columns && columns.length > 0 && (
            <div className="mt-20 flex flex-col md:flex-row gap-12 border-t border-white/10 pt-20">
              {columns.map((col, idx) => (
                <div key={idx} className="space-y-4 max-w-xs">
                  <p className="text-xs font-bold uppercase tracking-widest text-white/60 leading-relaxed whitespace-pre-line">
                    {col.text}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION 4 — PRODUCT CAROUSEL
   ═══════════════════════════════════════════════════════ */
function ProductCarouselSection({ data }) {
  const { add, items } = useCart();
  const isAdded = (id) => items.some(item => item.id === id);

  const { title, linkText, products } = data;
  const listToUse = products && products.length > 0 ? products : MOCK_PRODUCTS;
  const carouselItems = [...listToUse, ...listToUse, ...listToUse];

  return (
    <section className="bg-white py-20 overflow-hidden select-none">
      <div className="mb-12 px-5 md:px-12 flex justify-between items-end max-w-[1800px] mx-auto">
         <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-black leading-none">
            {title}
         </h2>
         <Link to="/shop" className="text-2xs md:text-sm font-black tracking-[0.3em] uppercase text-black/40 hover:text-brand-teal transition-colors flex items-center gap-2">
            {linkText} <ArrowUpRight className="w-3 h-3" />
         </Link>
      </div>

      <div className="relative w-full flex">
        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none" />

        <motion.div 
          className="flex gap-0 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 50, repeat: Infinity }}
        >
          {carouselItems.map((p, i) => (
            <div
                key={`${p.id}-${i}`}
                className="group relative w-[80vw] sm:w-[45vw] md:w-[30vw] lg:w-[25vw] flex-shrink-0 border-r border-y border-black/10 cursor-pointer overflow-hidden flex flex-col justify-between h-[45vh] sm:h-[50vh] bg-white first:border-l"
            >
                <div className="absolute inset-0 z-0 bg-[#FAFAFA] svz-image-reveal">
                    <img 
                        src={p.img} 
                        alt={p.name} 
                        className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105" 
                        draggable={false}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-700" />
                </div>

                <div className="relative z-10 w-full p-6 md:p-8 flex flex-col justify-between h-full pointer-events-none">
                    <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <p className="text-2xs md:text-sm font-black tracking-[0.3em] uppercase text-black/30 group-hover:text-brand-teal transition-all duration-500">Node 0{p.id}</p>
                          <h3 className="text-lg md:text-xl font-black uppercase tracking-tighter leading-none group-hover:translate-x-2 transition-all duration-700">{p.name}</h3>
                        </div>
                    </div>

                    <div className="flex justify-between items-end pointer-events-auto">
                        <div className="space-y-1">
                            <p className="text-2xs md:text-sm font-black tracking-[0.3em] uppercase text-black/40">{p.brand}</p>
                            <p className="text-xl font-black tracking-tighter transition-all duration-700 group-hover:text-brand-teal">₦{p.price.toLocaleString()}</p>
                        </div>
                        
                        <button 
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); add(p); }}
                            className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transition-all duration-700 ${
                              isAdded(p.id) ? 'bg-brand-teal text-white' : 'bg-black text-white group-hover:bg-brand-teal'
                            }`}
                        >
                            {isAdded(p.id) ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </button>
                    </div>
                </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION 5 — CTA SECTION
   ═══════════════════════════════════════════════════════ */
function CtaSection({ data }) {
  const { label, title1, title2, title3, primaryBtnText, primaryBtnLink, secondaryBtnText, secondaryBtnLink } = data;

  return (
    <section className="bg-black text-white py-40 md:py-60 relative overflow-hidden">
      <div className="grid-container text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease }}
          className="space-y-12"
        >
           <p className="text-2xs md:text-sm font-black tracking-[0.5em] uppercase text-brand-teal">{label}</p>
           <h2 className="text-[7vw] md:text-[6vw] font-black uppercase tracking-[-0.04em] leading-[0.85] text-white">
            {title1}<br />
            {title2 && (
              <motion.span
                initial={{ color: 'rgba(27, 110, 140, 0.3)' }}
                whileHover={{ scale: 1.05, color: '#1B6E8C', y: -2, textShadow: '0 0 20px rgba(27, 110, 140, 0.4)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                className="font-serif-italic font-light text-[7vw] md:text-[6vw] italic lowercase cursor-pointer inline-block origin-center"
              >
                {title2}
              </motion.span>
            )}{' '}
            {title3}
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6 pt-10">
            {primaryBtnText && (
              <Link to={primaryBtnLink || '/shop'} className="bg-white text-black px-16 py-8 text-2xs md:text-sm font-black uppercase tracking-[0.3em] hover:bg-brand-teal hover:text-white transition-all duration-700">
                {primaryBtnText}
              </Link>
            )}
            {secondaryBtnText && (
              <Link to={secondaryBtnLink || '/rx-terminal'} className="border border-white/20 px-16 py-8 text-2xs md:text-sm font-black uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-700 flex items-center justify-center gap-4">
                {secondaryBtnText} <ArrowUpRight className="w-5 h-5" />
              </Link>
            )}
          </div>
        </motion.div>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-brand-teal/5 blur-[200px] rounded-full pointer-events-none" />
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN PAGE WRAPPER
   ═══════════════════════════════════════════════════════ */
export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const { sections, loading } = useCmsPage('home', DEFAULT_HOME_SECTIONS);

  // Extract Hero Section configuration
  const heroSec = sections.find(s => s.type === 'home_hero') || DEFAULT_HOME_SECTIONS[0];

  const getCustomStyles = (data) => {
    const styles = {};
    if (data?.customTextColor) styles.color = data.customTextColor;
    if (data?.customFontFamily) styles.fontFamily = data.customFontFamily;
    if (data?.customFontWeight) styles.fontWeight = data.customFontWeight;
    if (data?.customFontSize) styles.fontSize = data.customFontSize;
    return styles;
  };

  return (
    <div className="bg-black min-h-screen">
      {/* Hero and static WeAre remain linked in their 300vh sticky scroll module */}
      <div ref={containerRef} className="relative h-[300vh] z-0">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <div className="absolute inset-0 z-0" style={getCustomStyles(heroSec.data)}>
            <HeroSection data={heroSec.data} />
          </div>
          <WeAreSection scrollYProgress={scrollYProgress} />
        </div>
      </div>

      {/* Render remaining sections dynamically in order */}
      {sections.map((sec) => {
        if (sec.type === 'home_hero') return null;

        const customStyles = getCustomStyles(sec.data);

        return (
          <div key={sec.id} style={customStyles}>
            {(() => {
              switch (sec.type) {
                case 'home_manifesto':
                  return <ManifestoSection data={sec.data} />;
                case 'marquee':
                  return (
                    <section className="py-20 bg-white overflow-hidden border-t border-black/5">
                      <ScrollMarquee baseVelocity={sec.data.velocity || -0.25}>
                        {Array.from({ length: 6 }).map((_, i) => (
                          <span
                            key={i}
                            className="display-giant font-black uppercase tracking-[-0.04em] text-black/[0.03] whitespace-nowrap"
                          >
                            {sec.data.text}&nbsp;
                          </span>
                        ))}
                      </ScrollMarquee>
                    </section>
                  );
                case 'product_carousel':
                  return <ProductCarouselSection data={sec.data} />;
                case 'cta':
                  return <CtaSection data={sec.data} />;
                default:
                  return null;
              }
            })()}
          </div>
        );
      })}
    </div>
  );
}
