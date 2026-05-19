import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Plus, Check } from 'lucide-react';
import { Player } from '@lottiefiles/react-lottie-player';

import AnimatedText from '@/components/ui/AnimatedText';
import ScrollMarquee from '@/components/ui/ScrollMarquee';
import { useCart } from '@/lib/CartContext';
import { MOCK_PRODUCTS } from '@/pages/Shop';


const ease = [0.16, 1, 0.3, 1];



/* ═══════════════════════════════════════════════════════
   SECTION 1 — HERO
   ═══════════════════════════════════════════════════════ */
function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);



  return (
    <section ref={ref} className="relative h-[100svh] bg-black overflow-hidden flex flex-col items-center justify-center">

      {/* ── Background Animation (Filtered from Red to Brand Teal) ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          filter: 'hue-rotate(200deg) saturate(1.5) brightness(0.8)',
        }}
      >
        <Player
          autoplay
          loop
          src="https://cdn.prod.website-files.com/67ec482dfa06d8122041aef1/67ec482dfa06d8122041b027_lottie.json"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* ── Top Label ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease }}
        className="absolute top-60 md:top-80 z-20 text-[10px] md:text-[14px] font-black tracking-[0.4em] uppercase text-white/40"
      >
        SAVINCLIFF PHARMACY — EST. 2024
      </motion.div>

      {/* ── Main Headline ── */}
      <motion.div
        style={{ y: yText, opacity: opacityText }}
        className="relative z-20 text-center w-full max-w-[1400px] px-6 text-white mt-40 md:mt-60"
      >
        <div className="flex flex-col items-center gap-2 md:gap-4">
          <div className="flex flex-wrap justify-center items-center gap-x-4 md:gap-x-6">
            <AnimatedText
              text="delivering"
              splitBy="char"
              className="font-serif-italic font-light text-[5vw] md:text-[3vw] text-white/50 lowercase"
            />
            <AnimatedText
              text="CLINICAL CARE"
              splitBy="word"
              className="font-black uppercase tracking-[-0.04em] text-[9vw] md:text-[6vw] leading-none"
            />
          </div>
          <div className="flex flex-wrap justify-center items-center gap-x-4 md:gap-x-6">
            <AnimatedText
              text="for the"
              splitBy="char"
              delay={0.2}
              className="font-serif-italic font-light text-[5vw] md:text-[3vw] text-white/50 lowercase"
            />
            <AnimatedText
              text="PATIENTS OF"
              splitBy="word"
              delay={0.2}
              className="font-black uppercase tracking-[-0.04em] text-[9vw] md:text-[6vw] leading-none"
            />
          </div>
          <AnimatedText
            text="TOMORROW"
            splitBy="char"
            delay={0.4}
            className="font-black uppercase tracking-[-0.04em] text-[9vw] md:text-[6vw] leading-none"
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
        <Link to="/shop" className="text-[10px] font-black tracking-[0.4em] uppercase text-white/30 hover:text-white transition-colors">
          Enter Archive
        </Link>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION 2 — WE ARE
   Panel slides UP over hero with frosted-glass backdrop,
   then the SVG zooms in via scale (GPU-only, no layout cost).
   ═══════════════════════════════════════════════════════ */
function WeAreSection({ scrollYProgress }) {
  // Phase 1 [0→0.2]: slide up from below viewport
  const y = useTransform(scrollYProgress, [0, 0.2], ['100vh', '0vh']);

  // Phase 2 [0.2→0.8]: scale zoom
  const scale = useTransform(scrollYProgress, [0.2, 0.8], [1, 43.75]);

  // Phase 3 [0.8→1.0]: fade out → ManifestoSection flows in cleanly below
  const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

  // Background: frosted glass → solid black (cleared by opacity above)
  const backgroundColor = useTransform(
    scrollYProgress,
    [0,                        0.4,                  0.8],
    ['rgba(160,160,160,0.35)', 'rgba(8,8,8,0.75)', 'rgba(8,8,8,1)']
  );

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
function ManifestoSection() {
  return (
    <section className="relative bg-black text-white py-40 md:py-60">
      <div className="grid-container grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
        <div className="lg:col-span-4 lg:sticky lg:top-40">
          <p className="text-[11px] font-black tracking-[0.4em] uppercase text-brand-teal mb-8">Clinical Manifesto</p>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">Our<br />Protocol</h2>
        </div>
        <div className="lg:col-span-8">
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease }}
            className="text-2xl md:text-5xl font-bold uppercase leading-[1.1] tracking-tight text-justify-inter"
          >
            We are a clinical pharmacy where science meets precision.{' '}
            <span className="text-white/30 italic font-serif">Verification</span> is our compass, ensuring every medication is authenticated at the source.{' '}
            We infuse every <span className="text-white/30 italic font-serif">prescription</span> with purpose, crafting therapeutic protocols that protect across every interaction.{' '}
            <span className="text-white/30 italic font-serif">Quality</span> is our foundation, maintaining the highest pharmaceutical standards in every formulation we dispense.
          </motion.p>
          <div className="mt-20 flex flex-col md:flex-row gap-12 border-t border-white/10 pt-20">
            <div className="space-y-4 max-w-xs">
              <p className="text-[10px] font-black tracking-[0.3em] uppercase text-white/40">Clinical Node 01</p>
              <p className="text-[12px] font-bold uppercase tracking-widest text-white/60 leading-relaxed">
                Zero-trust verification protocol for all primary pharmaceutical sources.
              </p>
            </div>
            <div className="space-y-4 max-w-xs">
              <p className="text-[10px] font-black tracking-[0.3em] uppercase text-white/40">Clinical Node 02</p>
              <p className="text-[12px] font-bold uppercase tracking-widest text-white/60 leading-relaxed">
                Temperature-controlled logistics network ensuring cold-chain integrity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION 4 — PRODUCT CAROUSEL
   ═══════════════════════════════════════════════════════ */
function ProductCarouselSection() {
  const { add, items } = useCart();
  const isAdded = (id) => items.some(item => item.id === id);

  // Duplicate products for seamless infinite scrolling
  const carouselItems = [...MOCK_PRODUCTS, ...MOCK_PRODUCTS];

  return (
    <section className="bg-white py-20 overflow-hidden select-none">
      <div className="mb-12 px-5 md:px-12 flex justify-between items-end max-w-[1800px] mx-auto">
         <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-black">
            FEATURED NODES
         </h2>
         <Link to="/shop" className="text-[10px] font-black tracking-[0.3em] uppercase text-black/40 hover:text-brand-teal transition-colors flex items-center gap-2">
            View All <ArrowUpRight className="w-3 h-3" />
         </Link>
      </div>

      <div className="relative w-full flex">
        {/* Shadow overlays for edge fading */}
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
                {/* Image Layer */}
                <div className="absolute inset-0 z-0 bg-[#FAFAFA] svz-image-reveal">
                    <img 
                        src={p.img} 
                        alt={p.name} 
                        className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105" 
                        draggable={false}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-700" />
                </div>

                {/* Content Layer */}
                <div className="relative z-10 w-full p-6 md:p-8 flex flex-col justify-between h-full pointer-events-none">
                    <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <p className="text-[9px] font-black tracking-[0.3em] uppercase text-black/30 group-hover:text-brand-teal transition-all duration-500">Node 0{p.id}</p>
                          <h3 className="text-lg md:text-xl font-black uppercase tracking-tighter leading-none group-hover:translate-x-2 transition-all duration-700">{p.name}</h3>
                        </div>
                    </div>

                    <div className="flex justify-between items-end pointer-events-auto">
                        <div className="space-y-1">
                            <p className="text-[8px] font-black tracking-[0.3em] uppercase text-black/40">{p.brand}</p>
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

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  return (
    <div className="bg-black min-h-screen">
      {/* Robust structure: Single sticky container for both Hero and WeAreSection */}
      <div ref={containerRef} className="relative h-[200vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Hero stays fixed in the background */}
          <div className="absolute inset-0 z-0">
            <HeroSection />
          </div>

          {/* WeAreSection overlays and slides up */}
          <WeAreSection scrollYProgress={scrollYProgress} />
        </div>
      </div>
      <ManifestoSection />
      {/* Marquee Section */}
      <section className="py-20 bg-white overflow-hidden border-t border-black/5">
        <ScrollMarquee baseVelocity={-1.5}>
          <span className="text-[12vw] font-black uppercase tracking-[-0.04em] text-black/[0.03] mx-12">
            SAVINCLIFF PHARMACY · CLINICAL PRECISION · PRIMARY SOURCE ·
          </span>
        </ScrollMarquee>
      </section>

      {/* Product Carousel Section */}
      <ProductCarouselSection />

      {/* Final CTA */}
      <section className="bg-black text-white py-40 md:py-60 relative overflow-hidden">
        <div className="grid-container text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease }}
            className="space-y-12"
          >
            <p className="text-[11px] font-black tracking-[0.5em] uppercase text-brand-teal">Ready to begin?</p>
            <h2 className="text-6xl md:text-[8vw] font-black uppercase tracking-[-0.04em] leading-[0.85]">
              LET'S BUILD<br />
              <span className="font-serif-italic font-light text-[7vw] md:text-[6vw] text-white/20 italic lowercase">something</span> VITAL
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-6 pt-10">
              <Link to="/shop" className="bg-white text-black px-16 py-8 text-[12px] font-black uppercase tracking-[0.3em] hover:bg-brand-teal hover:text-white transition-all duration-700">
                Explore Inventory
              </Link>
              <Link to="/contact" className="border border-white/20 px-16 py-8 text-[12px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-700 flex items-center justify-center gap-4">
                Discovery Call <ArrowUpRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-brand-teal/5 blur-[200px] rounded-full pointer-events-none" />
      </section>
    </div>
  );
}