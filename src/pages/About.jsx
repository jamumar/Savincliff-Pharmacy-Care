import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);
import { ArrowUpRight, ShieldCheck, Activity, Zap } from 'lucide-react';
import AnimatedText from '@/components/ui/AnimatedText';
import ScrollMarquee from '@/components/ui/ScrollMarquee';

const easeQuint = [0.16, 1, 0.3, 1];

const NARRATIVE_WORDS = [
  { text: "We" }, { text: "are" }, { text: "a" }, { text: "boutique" }, { text: "studio" },
  { text: "built" }, { text: "on" }, { text: "thoughtful" }, { text: "design" }, { text: "and" },
  { text: "honest" }, { text: "collaboration." }, 
  { text: "We" }, { text: "shape" }, { text: "ideas" },
  { text: "with" }, { text: "artistry" }, { text: "and" }, { text: "care" }, { text: "then" },
  { text: "move" }, { text: "with" },
  { text: "purpose", red: true }, { text: "and", red: true }, { text: "intent", red: true },
  { text: "through" }, { text: "every" }, { text: "phase." },
  { break: true },
  { text: "Each" }, { text: "step" }, { text: "aligns" }, { text: "vision" }, { text: "with" },
  { text: "action—crafting" }, { text: "work" }, { text: "with" }, { text: "genuine" }, { text: "passion" },
  { text: "that" }, { text: "leads" }, { text: "to" },
  { text: "unparalleled", red: true }, { text: "success.", red: true }
];

const PinnedScrollReveal = () => {
  const sectionRef = useRef(null);
  const paragraphRef = useRef(null);
  
  useEffect(() => {
    // -------------------------------
    // LENIS (smooth scrolling)
    // -------------------------------
    const lenis = new Lenis({
      duration: 1.2,
      smooth: true,
      lerp: 0.08,
    });

    function raf(time) {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // -------------------------------
    // GSAP ANIMATION
    // -------------------------------
    const ctx = gsap.context(() => {
      const words = paragraphRef.current.querySelectorAll(".word");

      gsap.set(words, {
        x: window.innerWidth,
        force3D: true,
        willChange: "transform",
      });

      gsap.to(words, {
        x: 0,
        ease: "power3.out",
        stagger: {
          each: 0.02,
          from: "start",
        },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom+=4500 top",

          scrub: 1.5,
          pin: true,
          anticipatePin: 1,

          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-black border-t border-white/10 min-h-screen flex flex-col justify-center items-center overflow-hidden section-padding">
      <div className="grid-container relative z-10 w-full flex flex-col items-center">
         <div className="max-w-4xl text-center container">
           <p ref={paragraphRef} className="paragraph text-xl md:text-[28px] lg:text-[34px] text-white leading-[1.4] tracking-widest font-sans uppercase flex flex-wrap justify-center items-center">
              {NARRATIVE_WORDS.map((w, i) => {
                if (w.break) {
                  return <div key={i} className="w-full h-2 md:h-6" />;
                }
                return (
                  <span key={i} className={`word inline-block px-[0.12em] py-[0.1em] ${w.red ? 'text-[#FF4049]' : 'text-white'}`}>
                    {w.text}
                  </span>
                );
              })}
           </p>
         </div>
      </div>
    </section>
  );
};

export default function About() {
  
  // Animation config for infinite back-and-forth glide (7s total loop)
  const getTransition = (delay) => ({
    duration: 3.5, // 3.5s forward, 3.5s reverse = 7s loop exactly like Lottie
    repeat: Infinity,
    repeatType: "reverse",
    ease: "easeInOut",
    delay: delay
  });

  return (
    <div className="bg-white min-h-screen">
      
      {/* Native Auto-Playing Typography Hero */}
      <section className="bg-black text-[#8B0000] min-h-screen relative overflow-hidden flex flex-col justify-center pt-[15vh] pb-[10vh]">
        <div className="w-full flex flex-col justify-center space-y-2">
            <motion.h1 
              initial={{ x: "-5vw" }}
              animate={{ x: "60vw" }} 
              transition={getTransition(0)}
              className="text-[14vw] md:text-[11vw] leading-[0.85] font-serif font-normal tracking-[-0.02em] opacity-90 whitespace-nowrap"
            >
               Legacy
            </motion.h1>
            <motion.h1 
              initial={{ x: "10vw" }}
              animate={{ x: "40vw" }} 
              transition={getTransition(0.3)}
              className="text-[14vw] md:text-[11vw] leading-[0.85] font-serif font-normal tracking-[-0.02em] opacity-90 whitespace-nowrap"
            >
               Innovation
            </motion.h1>
            <motion.h1 
              initial={{ x: "-15vw" }}
              animate={{ x: "50vw" }} 
              transition={getTransition(0.6)}
              className="text-[14vw] md:text-[11vw] leading-[0.85] font-serif font-normal tracking-[-0.02em] opacity-90 whitespace-nowrap"
            >
               Human
            </motion.h1>
            <motion.h1 
              initial={{ x: "20vw" }}
              animate={{ x: "70vw" }} 
              transition={getTransition(0.9)}
              className="text-[14vw] md:text-[11vw] leading-[0.85] font-serif font-normal tracking-[-0.02em] opacity-90 whitespace-nowrap"
            >
               Freedom
            </motion.h1>
        </div>
        <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10 text-white/50 text-[9px] font-black tracking-[0.4em] uppercase">
            Constant Motion
        </div>
      </section>

      {/* Pinned Scroll Scrub Reveal */}
      <PinnedScrollReveal />

      {/* Story Section */}
      <section className="section-padding bg-white">
        <div className="grid-container grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-32 items-center">
            <div className="space-y-8 md:space-y-16">
                <h2 className="text-[10vw] md:text-[5vw] font-black uppercase tracking-tighter leading-none flex flex-col items-start">
                  <AnimatedText text="THE" splitBy="word" />
                  <AnimatedText text="MANIFEST" splitBy="char" delay={0.1} />
                </h2>
                <div className="space-y-6 md:space-y-10 max-w-xl">
                    <p className="text-lg md:text-2xl text-black font-black leading-none tracking-tighter uppercase">
                        Originating in the FCT node of Abuja, Savincliff emerged from a singular clinical requirement.
                    </p>
                    <p className="text-[11px] md:text-[12px] font-black tracking-[0.3em] md:tracking-[0.4em] text-black/40 uppercase leading-relaxed border-l-4 border-svz-red pl-6 md:pl-8">
                        Traditional pharmacy models prioritized volume over verification. We inverted the sequence. Every prescription processed at Savincliff is a project of precision—audited by architects of health and delivered through a secured custodial chain.
                    </p>
                </div>
            </div>
            
            <div className="relative aspect-[4/5] overflow-hidden bg-black svz-image-reveal shadow-2xl">
                <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-all duration-1000"
                >
                    <source src="/animations/whatsapp_2.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/20 pointer-events-none" />
                <div className="absolute top-6 left-6 text-white/50 text-[9px] font-black tracking-[0.4em] uppercase border border-white/20 p-2">
                    CLINICAL MANIFEST v2.0
                </div>
            </div>
        </div>
      </section>

      <section className="bg-black text-white section-padding px-5 md:px-0">
        <div className="grid-container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/10">
                {[
                   { i: <ShieldCheck className="w-8 h-8 md:w-10 md:h-10 text-svz-red" />, t: 'VERIFICATION', d: 'WE OPERATE UNDER A ZERO-TRUST MODEL. EVERY UNIT OF MEDICATION IS AUDITED THROUGH PRIMARY SOURCE MANIFESTS BEFORE COMMITTING TO THE QUEUE.' },
                   { i: <Activity className="w-8 h-8 md:w-10 md:h-10 text-svz-red" />, t: 'PRECISION', d: 'HUMAN ERROR IS ARCHITECTURALLY ELIMINATED. LICENSED PHARMACISTS OVERSEE ALL THERAPEUTIC SYNERGIES FOR TOTAL CLINICAL ALIGNMENT.' },
                   { i: <Zap className="w-8 h-8 md:w-10 md:h-10 text-svz-red" />, t: 'ACCESS', d: 'MEDICAL ESSENTIALS ARE A HUMAN RIGHT. WE HAVE OPTIMIZED OUR DISPATCH NODES TO ENSURE REACH ACROSS THE PAN-AFRICAN FRONTIER.' }
                ].map((node, i) => (
                    <motion.div 
                        key={node.t}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.2, duration: 1, ease: easeQuint }}
                        className="p-8 md:p-16 border-b md:border-b-0 md:border-r border-white/10 last:border-r-0 last:border-b-0 hover:bg-white/5 transition-colors duration-700"
                    >
                        <div className="mb-6 md:mb-12">{node.i}</div>
                        <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter mb-4 md:mb-8">{node.t}</h3>
                        <p className="text-[10px] md:text-[11px] font-black tracking-[0.2em] md:tracking-[0.25em] uppercase text-white/30 leading-relaxed">
                           {node.d}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* Compliance Strip */}
      <section className="py-20 md:py-40 bg-white border-b border-black/5 overflow-hidden">
          <ScrollMarquee baseVelocity={1.5}>
             <span className="text-[15vw] md:text-[10vw] font-black uppercase tracking-[-0.05em] text-black/5 mx-8 md:mx-24">
                PCN LICENSED NODE / NAFDAC PRIMARY SOURCE / VERIFIED CLINICAL CERTAINTY / 
             </span>
          </ScrollMarquee>
      </section>

      {/* High-Fidelity CTA */}
      <section className="section-padding bg-white">
        <div className="grid-container">
            <div className="bg-black text-white p-8 md:p-20 lg:p-40 relative overflow-hidden group">
                <div className="relative z-10 space-y-8 md:space-y-16">
                    <h2 className="text-[8vw] md:text-[5vw] font-black uppercase tracking-tighter leading-none">EXPERIENCE<br />THE PRECISION</h2>
                    <div className="flex flex-col sm:flex-row gap-4 md:gap-8">
                        <button className="bg-white text-black px-8 md:px-16 py-5 md:py-8 text-[10px] md:text-[12px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] hover:bg-svz-red hover:text-white transition-all duration-700">Explore Inventory</button>
                        <button className="border border-white/20 px-8 md:px-16 py-5 md:py-8 text-[10px] md:text-[12px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-700 flex items-center justify-center gap-4 md:gap-6 group/btn">
                            Consult Pharmacist <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 group-hover/btn:translate-x-2 group-hover/btn:-translate-y-2 transition-transform" />
                        </button>
                    </div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-svz-red/5 blur-[200px] rounded-full group-hover:bg-svz-red/10 transition-all duration-1000" />
            </div>
        </div>
      </section>

    </div>
  );
}