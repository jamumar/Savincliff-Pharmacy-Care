import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1];

/* ─── Mock project data ─── */
const PROJECTS = [
  { id: '01', title: 'NEUROGEN AXON',   cat: 'Verified Clinical',  img: '/images/product2.png' },
  { id: '02', title: 'SPECTRUM DROPS',   cat: 'Ophthalmic Node',    img: '/images/product1.png' },
  { id: '03', title: 'AURUM REGEN',      cat: 'Topical Protocol',   img: '/images/product3.png' },
  { id: '04', title: 'CLINICAL HQ',      cat: 'Architecture',       img: '/images/hq.png' },
];

/* ═══════════════════════════════════════════════════════
   SECTION 1 — HERO  (black bg, geometric shapes, mixed type)
   ═══════════════════════════════════════════════════════ */
function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const dotY = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <section ref={ref} className="relative h-[100vh] bg-black overflow-hidden flex flex-col items-center justify-center">

      {/* ── Abstract geometric shapes (dark grey on black) ── */}
      <motion.div style={{ y: y1 }} className="absolute top-[10%] left-[2%] w-[15vw] h-[40vh] bg-white/[0.04] rounded-[4px]" />
      <motion.div style={{ y: y2 }} className="absolute top-[25%] left-[8%] w-[8vw] h-[25vh] bg-white/[0.06]" />
      <div className="absolute top-[5%] right-[5%] w-[12vw] h-[12vw] rounded-full border border-white/[0.06]" />
      <motion.div style={{ y: y1 }} className="absolute bottom-[15%] left-[15%] w-[20vw] h-[3px] bg-white/[0.06] -rotate-[25deg]" />
      <motion.div style={{ y: y2 }} className="absolute bottom-[25%] left-[25%] w-[15vw] h-[3px] bg-white/[0.06] rotate-[15deg]" />
      <div className="absolute bottom-[8%] right-[3%] w-[6vw] h-[20vh] bg-white/[0.04]" />
      <div className="absolute top-[20%] right-[8%] w-[5vw] h-[14vw] bg-white/[0.03]" />
      {/* Large dark circle */}
      <div className="absolute bottom-[-5%] right-[15%] w-[35vw] h-[35vw] rounded-full bg-white/[0.03]" />
      {/* Small red rectangle */}
      <motion.div style={{ y: y2 }} className="absolute bottom-[12%] right-[5%] w-[4vw] h-[8vh] bg-svz-red/80" />

      {/* ── Floating red dot ── */}
      <motion.div
        style={{ y: dotY }}
        className="absolute top-[52%] left-[46%] z-10 animate-float-dot"
      >
        <div className="w-[3vw] h-[3vw] min-w-[28px] min-h-[28px] rounded-full bg-svz-red shadow-[0_0_40px_rgba(251,44,44,0.4)]" />
      </motion.div>

      {/* ── Subtitle ── */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease }}
        className="relative z-20 text-[11px] font-bold tracking-[0.5em] uppercase text-white/50 mb-10"
      >
        Savincliff Pharmacy · Est. 2024
      </motion.p>

      {/* ── Main headline — mixed typography ── */}
      <div className="relative z-20 text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease }}
          className="text-white"
        >
          <span className="block text-[5vw] md:text-[3.2vw]">
            <span className="font-serif-italic font-normal text-white/60">delivering</span>
            {'  '}
            <span className="font-black uppercase tracking-[-0.03em] text-[8vw] md:text-[6vw] leading-[0.9]">
              CLINICAL CARE
            </span>
            {'  '}
            <span className="font-serif-italic font-normal text-white/60 text-[4vw] md:text-[2.8vw]">for the</span>
          </span>
          <span className="block font-black uppercase tracking-[-0.04em] text-[9vw] md:text-[7vw] leading-[0.85] mt-2">
            PATIENTS OF TOM
            <span className="text-svz-red">O</span>
            RROW
          </span>
        </motion.h1>
      </div>

      {/* ── "Enter our world" CTA at bottom ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-12 z-20 flex flex-col items-center gap-3"
      >
        <Link to="/shop" className="text-[11px] font-bold tracking-[0.4em] uppercase text-white/50 hover:text-white transition-colors flex items-center gap-3">
          Enter Our World <ArrowDown className="w-4 h-4 animate-bounce" />
        </Link>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION 2 — "WE ARE" massive typography on scroll
   ═══════════════════════════════════════════════════════ */
function WeAreSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.4 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0.1, 0.5], [0.85, 1]);

  return (
    <section ref={ref} className="relative h-[120vh] flex items-center justify-center overflow-hidden bg-[#e8e8e8]">
      {/* Floating red dot */}
      <motion.div
        style={{ opacity: bgOpacity }}
        className="absolute bottom-[15%] left-[5%] animate-float-dot"
      >
        <div className="w-[2.5vw] h-[2.5vw] min-w-[20px] min-h-[20px] rounded-full bg-svz-red/80 shadow-[0_0_30px_rgba(251,44,44,0.3)]" />
      </motion.div>

      <motion.div style={{ scale, opacity: bgOpacity }} className="text-center px-6">
        <h2 className="text-[18vw] md:text-[16vw] font-black leading-[0.8] tracking-[-0.05em] uppercase text-black">
          WE
          <span className="font-serif-italic font-normal text-[16vw] md:text-[14vw] mx-[1vw]">A</span>
          RE
        </h2>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION 3 — Services manifesto (justified text, red keywords)
   ═══════════════════════════════════════════════════════ */
function ManifestoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="relative bg-black text-white min-h-screen flex items-center">

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
          <img src="/images/lab.png" alt="Lab" className="w-full aspect-[3/4] object-cover grayscale opacity-40 hover:opacity-80 transition-all duration-1000" />
        </div>
      </motion.div>

      <div className="max-w-[750px] mx-auto px-8 lg:ml-[25vw] lg:mr-[8vw] py-[15vh]">
        <motion.p
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease }}
          className="text-[clamp(18px,2.5vw,32px)] font-bold uppercase leading-[1.6] tracking-[0.08em] text-justify-inter"
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
  return (
    <section className="bg-black text-white py-[15vh]">
      <div className="grid-container">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20 border-b border-white/10 pb-10">
          <h2 className="sub-display-svz">SELECTED<br/>INVENTORY</h2>
          <p className="text-[10px] font-black tracking-[0.4em] uppercase text-white/30 mb-2">Clinical Manifest / 2026</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px]">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.15, duration: 1, ease }}
            >
              <Link to="/shop" className="group block relative aspect-[16/10] overflow-hidden bg-[#111] cursor-pointer">
                <img
                  src={p.img}
                  alt={p.title}
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-50 group-hover:opacity-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)]"
                />
                {/* Hover overlay with text */}
                <div className="absolute inset-0 z-10 p-10 md:p-14 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-black tracking-[0.4em] uppercase text-white/30 group-hover:text-svz-red transition-colors duration-500">{p.cat}</span>
                    <span className="text-[10px] font-black tracking-[0.4em] uppercase text-white/0 group-hover:text-white/50 transition-all duration-700">{p.id}</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <h3 className="text-3xl md:text-5xl font-black uppercase tracking-[-0.03em] leading-none translate-y-4 group-hover:translate-y-0 transition-all duration-700">{p.title}</h3>
                    <div className="w-14 h-14 bg-white/0 group-hover:bg-white flex items-center justify-center transition-all duration-500 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
                      <ArrowUpRight className="w-6 h-6 text-black" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <Link to="/shop" className="group inline-flex items-center gap-6 text-[11px] font-black uppercase tracking-[0.4em] text-white/60 hover:text-white border-b border-white/20 hover:border-white pb-3 transition-all duration-500">
            View All Inventory <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION 5 — Marquee ticker
   ═══════════════════════════════════════════════════════ */
function MarqueeSection() {
  return (
    <section className="py-20 bg-white overflow-hidden select-none pointer-events-none border-y border-black/5">
      <div className="animate-marquee whitespace-nowrap">
        {Array(6).fill('').map((_, i) => (
          <span key={i} className="text-[12vw] font-black uppercase tracking-[-0.04em] text-black/[0.04] mx-8">
            SAVINCLIFF PHARMACY ·  CLINICAL PRECISION ·  PRIMARY SOURCE ·  
          </span>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION 6 — Final CTA
   ═══════════════════════════════════════════════════════ */
function CTASection() {
  return (
    <section className="bg-black text-white py-[20vh] relative overflow-hidden">
      <div className="grid-container text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease }}
          className="space-y-12"
        >
          <p className="text-[11px] font-black tracking-[0.5em] uppercase text-svz-red">Ready to begin?</p>
          <h2 className="text-[8vw] md:text-[6vw] font-black uppercase tracking-[-0.04em] leading-[0.85]">
            LET'S BUILD<br />
            <span className="font-serif-italic font-normal text-[7vw] md:text-[5vw] text-white/40">something</span>{' '}
            VITAL
          </h2>
          <div className="flex flex-col md:flex-row justify-center gap-6 pt-8">
            <Link to="/shop" className="bg-white text-black px-14 py-6 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-svz-red hover:text-white transition-all duration-700">
              Explore Inventory
            </Link>
            <Link to="/contact" className="border border-white/20 px-14 py-6 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-700 flex items-center justify-center gap-4">
              Discovery Call <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Decorative red glow */}
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