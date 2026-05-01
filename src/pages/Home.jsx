import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import AnimatedText from '@/components/ui/AnimatedText';
import ScrollMarquee from '@/components/ui/ScrollMarquee';
import InteractiveGallery3D from '@/components/ui/InteractiveGallery3D';

const ease = [0.16, 1, 0.3, 1];

/* ─── Mock project data ─── */
const PROJECTS = [
  { id: '01', title: 'NEUROGEN AXON',   cat: 'Verified Clinical',  img: '/images/product2.png' },
  { id: '02', title: 'SPECTRUM DROPS',   cat: 'Ophthalmic Node',    img: '/images/product1.png' },
  { id: '03', title: 'AURUM REGEN',      cat: 'Topical Protocol',   img: '/images/product3.png' },
  { id: '04', title: 'CLINICAL HQ',      cat: 'Architecture',       img: '/images/hq.png' },
];

/* ═══════════════════════════════════════════════════════
   SECTION 1 — HERO
   ═══════════════════════════════════════════════════════ */
function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const dotY = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <section ref={ref} className="relative h-[100svh] bg-black overflow-hidden flex flex-col items-center justify-center px-5">

      {/* ── Abstract geometric shapes — hidden on very small screens ── */}
      <motion.div style={{ y: y1 }} className="absolute top-[10%] left-[2%] w-[15vw] h-[40vh] bg-white/[0.04] rounded-[4px] hidden sm:block" />
      <motion.div style={{ y: y2 }} className="absolute top-[25%] left-[8%] w-[8vw] h-[25vh] bg-white/[0.06] hidden sm:block" />
      <div className="absolute top-[5%] right-[5%] w-[20vw] md:w-[12vw] h-[20vw] md:h-[12vw] rounded-full border border-white/[0.06]" />
      <div className="absolute bottom-[-5%] right-[10%] w-[50vw] md:w-[35vw] h-[50vw] md:h-[35vw] rounded-full bg-white/[0.03]" />
      <motion.div style={{ y: y2 }} className="absolute bottom-[12%] right-[5%] w-[8vw] md:w-[4vw] h-[8vh] bg-svz-red/80 hidden sm:block" />

      {/* ── Floating red dot ── */}
      <motion.div style={{ y: dotY }} className="absolute top-[52%] left-[46%] z-10 animate-float-dot">
        <div className="w-6 h-6 md:w-[3vw] md:h-[3vw] md:min-w-[28px] md:min-h-[28px] rounded-full bg-svz-red shadow-[0_0_40px_rgba(251,44,44,0.4)]" />
      </motion.div>

      {/* ── Subtitle ── */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease }}
        className="relative z-20 text-[9px] md:text-[11px] font-bold tracking-[0.3em] md:tracking-[0.5em] uppercase text-white/50 mb-6 md:mb-10 text-center"
      >
        Savincliff Pharmacy · Est. 2024
      </motion.p>

      {/* ── Main headline — mixed typography ── */}
      <div className="relative z-20 text-center w-full max-w-[95vw] text-white flex flex-col items-center">
        <span className="block mb-2 md:mb-4">
          <AnimatedText text="delivering" splitBy="char" className="font-serif-italic font-normal text-white/60 text-[5vw] md:text-[3.2vw]" />
          <AnimatedText text=" CLINICAL CARE" splitBy="word" className="font-black uppercase tracking-[-0.03em] text-[10vw] md:text-[6vw] leading-[0.9]" />
        </span>
        <span className="block mb-2 md:mb-4">
          <AnimatedText text="for the " splitBy="char" delay={0.2} className="font-serif-italic font-normal text-white/60 text-[5vw] md:text-[2.8vw]" />
          <AnimatedText text=" PATIENTS OF" splitBy="word" delay={0.2} className="font-black uppercase tracking-[-0.04em] text-[10vw] md:text-[7vw] leading-[0.85]" />
        </span>
        <span className="block font-black uppercase tracking-[-0.04em] text-[13vw] md:text-[7vw] leading-[0.85] mt-1">
           <AnimatedText text="TOMORROW" splitBy="char" delay={0.4} />
        </span>
      </div>

      {/* ── "Enter our world" CTA ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 md:bottom-12 z-20 flex flex-col items-center gap-3"
      >
        <Link to="/shop" className="text-[10px] md:text-[11px] font-bold tracking-[0.4em] uppercase text-white/50 hover:text-white transition-colors flex items-center gap-3">
          Enter Our World <ArrowDown className="w-4 h-4 animate-bounce" />
        </Link>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION 2 — "WE ARE"
   ═══════════════════════════════════════════════════════ */
function WeAreSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0.1, 0.5], [0.85, 1]);

  return (
    <section ref={ref} className="relative h-[80vh] md:h-[120vh] flex items-center justify-center overflow-hidden bg-[#e8e8e8]">
      <motion.div
        style={{ opacity: bgOpacity }}
        className="absolute bottom-[15%] left-[5%] animate-float-dot"
      >
        <div className="w-4 h-4 md:w-[2.5vw] md:h-[2.5vw] md:min-w-[20px] md:min-h-[20px] rounded-full bg-svz-red/80 shadow-[0_0_30px_rgba(251,44,44,0.3)]" />
      </motion.div>

      <motion.div style={{ scale, opacity: bgOpacity }} className="text-center px-4">
        <h2 className="text-[22vw] md:text-[16vw] font-black leading-[0.8] tracking-[-0.05em] uppercase text-black">
          WE
          <span className="font-serif-italic font-normal text-[20vw] md:text-[14vw] mx-[1vw]">A</span>
          RE
        </h2>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION 3 — Services manifesto
   ═══════════════════════════════════════════════════════ */
function ManifestoSection() {
  const ref = useRef(null);

  return (
    <section ref={ref} className="relative bg-black text-white flex items-center">
      {/* Floating project thumbnail on left */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease }}
        className="absolute left-[3vw] top-[50%] -translate-y-1/2 hidden lg:block"
      >
        <div className="w-[14vw] relative overflow-hidden svz-image-reveal">
          <p className="text-[9px] font-black tracking-[0.4em] uppercase text-white/30 mb-3">Featured Protocol</p>
          <img src="/images/lab.png" alt="Lab" className="w-full aspect-[3/4] object-cover opacity-80 hover:opacity-100 transition-all duration-1000" />
        </div>
      </motion.div>

      <div className="max-w-[750px] mx-auto px-6 md:px-8 lg:ml-[25vw] lg:mr-[8vw] py-[12vh] md:py-[15vh]">
        <motion.p
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease }}
          className="text-[14px] md:text-[clamp(18px,2.5vw,32px)] font-bold uppercase leading-[1.8] md:leading-[1.6] tracking-[0.05em] md:tracking-[0.08em] text-justify-inter"
        >
          We are a clinical pharmacy where science meets precision.{' '}
          <span className="text-svz-red">Verification</span> is our compass, ensuring every medication is authenticated at the source.{' '}
          We infuse every <span className="text-svz-red">prescription</span> with purpose, crafting therapeutic protocols that protect across every interaction.{' '}
          <span className="text-svz-red">Quality</span> is our foundation, maintaining the highest pharmaceutical standards in every formulation we dispense.{' '}
          Through full-spectrum <span className="text-svz-red">clinical care</span>, we transform prescriptions into verified health outcomes.{' '}
          Our <span className="text-svz-red">logistics network</span> ensures temperature-controlled integrity from source to patient.{' '}
          We foster lasting <span className="text-svz-red">wellbeing</span>, empowering patients to access, understand, and thrive at every step.
        </motion.p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION 4 — Selected projects grid
   ═══════════════════════════════════════════════════════ */
function ProjectsSection() {
  return <InteractiveGallery3D />;
}

/* ═══════════════════════════════════════════════════════
   SECTION 5 — Marquee ticker
   ═══════════════════════════════════════════════════════ */
function MarqueeSection() {
  return (
    <section className="py-12 md:py-20 bg-white overflow-hidden select-none pointer-events-none border-y border-black/5">
      <ScrollMarquee baseVelocity={-2}>
        <span className="text-[15vw] md:text-[12vw] font-black uppercase tracking-[-0.04em] text-black/[0.04] mx-4 md:mx-8">
          SAVINCLIFF PHARMACY · CLINICAL PRECISION · PRIMARY SOURCE ·
        </span>
      </ScrollMarquee>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION 6 — Final CTA
   ═══════════════════════════════════════════════════════ */
function CTASection() {
  return (
    <section className="bg-black text-white py-[15vh] md:py-[20vh] relative overflow-hidden">
      <div className="grid-container text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease }}
          className="space-y-8 md:space-y-12"
        >
          <p className="text-[10px] md:text-[11px] font-black tracking-[0.4em] md:tracking-[0.5em] uppercase text-svz-red">Ready to begin?</p>
          <h2 className="text-[10vw] md:text-[6vw] font-black uppercase tracking-[-0.04em] leading-[0.85]">
            LET'S BUILD<br />
            <span className="font-serif-italic font-normal text-[9vw] md:text-[5vw] text-white/40">something</span>{' '}
            VITAL
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 pt-4 md:pt-8">
            <Link to="/shop" className="bg-white text-black px-8 md:px-14 py-5 md:py-6 text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] hover:bg-svz-red hover:text-white transition-all duration-700">
              Explore Inventory
            </Link>
            <Link to="/contact" className="border border-white/20 px-8 md:px-14 py-5 md:py-6 text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-700 flex items-center justify-center gap-4">
              Discovery Call <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-svz-red/5 blur-[200px] rounded-full pointer-events-none" />
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   PAGE EXPORT
   ═══════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <div className="bg-black min-h-screen">
      <HeroSection />
      <WeAreSection />
      <ManifestoSection />
      <ProjectsSection />
      <MarqueeSection />
      <CTASection />
    </div>
  );
}