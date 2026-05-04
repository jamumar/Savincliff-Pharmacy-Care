import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { Player } from '@lottiefiles/react-lottie-player';
import AnimatedText from '@/components/ui/AnimatedText';
import ScrollMarquee from '@/components/ui/ScrollMarquee';
import InteractiveLogoHero from '@/components/ui/InteractiveLogoHero';

const ease = [0.16, 1, 0.3, 1];

/* ═══════════════════════════════════════════════════════
   FLOATING DECORATIONS (The "Tale" Color Shapes)
   ═══════════════════════════════════════════════════════ */
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
          filter: 'hue-rotate(200deg) saturate(1.5) brightness(0.8)', // Transforms red to #1B6E8C spectrum
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
              className="font-serif-italic font-light text-[7vw] md:text-[4vw] text-white/50 lowercase" 
            />
            <AnimatedText 
              text="CLINICAL CARE" 
              splitBy="word" 
              className="font-black uppercase tracking-[-0.04em] text-[12vw] md:text-[8vw] leading-none" 
            />
          </div>
          <div className="flex flex-wrap justify-center items-center gap-x-4 md:gap-x-6">
            <AnimatedText 
              text="for the" 
              splitBy="char" 
              delay={0.2} 
              className="font-serif-italic font-light text-[7vw] md:text-[4vw] text-white/50 lowercase" 
            />
            <AnimatedText 
              text="PATIENTS OF" 
              splitBy="word" 
              delay={0.2} 
              className="font-black uppercase tracking-[-0.04em] text-[12vw] md:text-[8vw] leading-none" 
            />
          </div>
          <AnimatedText 
            text="TOMORROW" 
            splitBy="char" 
            delay={0.4} 
            className="font-black uppercase tracking-[-0.04em] text-[12vw] md:text-[8vw] leading-none" 
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
   ═══════════════════════════════════════════════════════ */
function WeAreSection() {
  return (
    <section className="relative h-[60vh] md:h-[100vh] flex items-center justify-center bg-[#F5F5F3] overflow-hidden">
      <div className="text-center px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease }}
          className="text-[25vw] md:text-[18vw] font-black leading-[0.8] tracking-[-0.06em] uppercase text-black flex items-center justify-center"
        >
          WE
          <span className="font-serif-italic font-light text-[22vw] md:text-[16vw] mx-[2vw] lowercase text-black/20">a</span>
          RE
        </motion.h2>
      </div>
    </section>
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
           <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">Our<br/>Protocol</h2>
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

export default function Home() {
  return (
    <div className="bg-black min-h-screen">
      <HeroSection />
      <WeAreSection />
      <ManifestoSection />
      <InteractiveLogoHero />
      
      {/* Marquee Section */}
      <section className="py-20 bg-white overflow-hidden border-y border-black/5">
        <ScrollMarquee baseVelocity={-1.5}>
          <span className="text-[12vw] font-black uppercase tracking-[-0.04em] text-black/[0.03] mx-12">
            SAVINCLIFF PHARMACY · CLINICAL PRECISION · PRIMARY SOURCE · 
          </span>
        </ScrollMarquee>
      </section>

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