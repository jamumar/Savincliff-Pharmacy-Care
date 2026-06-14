import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);
import { ArrowUpRight, ShieldCheck, Activity, Zap, Plus } from 'lucide-react';
import AnimatedText from '@/components/ui/AnimatedText';
import ScrollMarquee from '@/components/ui/ScrollMarquee';

const easeQuint = [0.16, 1, 0.3, 1];

const NARRATIVE_WORDS = [
  { text: "We" }, { text: "are" }, { text: "a" }, { text: "clinical" }, { text: "pharmacy" },
  { text: "where" }, { text: "science" }, { text: "meets" }, { text: "precision." },
  { text: "Verification", teal: true }, { text: "is" }, { text: "our" }, { text: "compass," },
  { text: "ensuring" }, { text: "every" }, { text: "medication" }, { text: "is" },
  { text: "authenticated" }, { text: "at" }, { text: "the" }, { text: "source." },
  { text: "We" }, { text: "infuse" }, { text: "every" }, { text: "prescription", teal: true },
  { text: "with" }, { text: "purpose," }, { text: "crafting" }, { text: "therapeutic" },
  { text: "protocols" }, { text: "that" }, { text: "protect" }, { text: "across" }, { text: "every" },
  { text: "interaction." }, { text: "Quality", teal: true }, { text: "is" }, { text: "our" },
  { text: "foundation," }, { text: "maintaining" }, { text: "the" }, { text: "highest" },
  { text: "pharmaceutical" }, { text: "standards" }, { text: "in" }, { text: "every" },
  { text: "formulation" }, { text: "we" }, { text: "dispense." },
  { text: "Through" }, { text: "full-spectrum" }, { text: "clinical" }, { text: "certainty." }
];

/* ─── Showcase Section ───────────────────────────────────────── */
const STORIES = [
  {
    id: 'AUTHENTICATION',
    label: 'AUTHENTICATION',
    headline: `SAVINCLIFF COMBINES CLINICAL
OVERSIGHT, DIGITAL
INFRASTRUCTURE, AND MODERN
PHARMACEUTICAL WORKFLOWS
TO CREATE A SAFER AND MORE
INTELLIGENT DISPENSING
EXPERIENCE`,
    cta: 'READ CLINICAL REPORT',
    stats: [
      { value: 'VERIFIED', label: "MULTI-STEP\nPRESCRIPTION\nREVIEW" },
      { value: 'SECURE', label: "PROTECTED\nDIGITAL PATIENT\nSYSTEMS" },
      { value: 'CONTROLLED', label: "TEMPERATURE-\nMONITORED\nMEDICATION\nHANDLING" },
    ],
  },
  {
    id: 'DISPENSING',
    label: 'DISPENSING',
    headline: `CLINICAL DISPENSING SYSTEMS
STRUCTURED AROUND RIGOROUS
PHARMACEUTICAL OVERSIGHT,
MEDICATION AUTHENTICATION,
AND PATIENT-CENTERED
ACCURACY.`,
    cta: 'READ CLINICAL REPORT',
    stats: [],
  },
  {
    id: 'PATIENT ACCESS',
    label: 'PATIENT ACCESS',
    headline: `INTEGRATED DIGITAL PORTALS
DESIGNED FOR SECURE
PRESCRIPTION UPLOADS,
SEAMLESS REFILL COORDINATION,
AND CONVENIENT PATIENT
ACCESS TO PHARMACEUTICAL CARE.`,
    cta: 'READ CLINICAL REPORT',
    stats: [
      { value: 'DIGITAL', label: "ONLINE\nPRESCRIPTION\nSUBMISSION" },
      { value: 'ACCESSIBLE', label: "PATIENT\nMEDICATION\nHISTORY ACCESS" },
      { value: 'CONNECTED', label: "INTEGRATED\nPAYMENT AND\nREFILL SYSTEMS" },
    ],
  },
];

function ShowcaseSection() {
  const [active, setActive] = useState(0);
  const story = STORIES[active];

  return (
    <section className="bg-black text-white py-24 md:py-40 px-8 md:px-20 lg:px-32">
      {/* Heading */}
      <div className="max-w-[1400px] mx-auto">
        <p className="text-2xs md:text-sm font-black tracking-[0.4em] uppercase text-white/30 mb-6">[CLINICAL SYSTEMS]</p>
        <h2 className="display-lg font-black uppercase tracking-tighter leading-none mb-20 md:mb-28">
          DESIGNED FOR<br />CLINICAL PRECISION
        </h2>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">

          {/* Left — Story detail */}
          <div className="flex-1 min-w-0">
            <h3 className="text-2xl md:text-3xl font-black uppercase leading-snug tracking-tight mb-10 max-w-lg transition-all duration-500 whitespace-pre-line">
              {story.headline}
            </h3>

            <button className="inline-flex items-center gap-3 border border-white/30 px-6 py-3 text-2xs md:text-sm font-black uppercase tracking-[0.25em] hover:border-[#1B6E8C] hover:text-[#1B6E8C] transition-all duration-300 mb-16">
              {story.cta} <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Stats row */}
            <div className="flex gap-10 md:gap-16">
              {story.stats.map((s, i) => (
                <div key={i}>
                  <p className="text-lg md:text-2xl font-black leading-tight tracking-widest text-white uppercase whitespace-pre-line">{s.value}</p>
                  <p className="text-3xs md:text-xs font-black tracking-[0.2em] text-white/40 mt-2 whitespace-pre-line uppercase">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Cards */}
          <div className="flex flex-col gap-0 w-full lg:w-[340px] shrink-0">
            {STORIES.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActive(i)}
                className={[
                  'w-full h-[100px] flex items-center justify-center text-2xs md:text-sm font-black uppercase tracking-[0.2em] transition-all duration-400 border border-white/5',
                  i === active
                    ? 'bg-[#1B6E8C] text-white'
                    : 'bg-black text-white hover:bg-[#1B6E8C] hover:text-white',
                ].join(' ')}
              >
                {s.label}
              </button>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

/* ─── Dispensing Care Carousel (Pharmaceutical Images) ────────── */
const CAROUSEL_IMAGES = [
  { url: '/images/pharmacy_interior.png', label: 'INTERIOR RENDER', number: '01' },
  { url: '/images/digital_terminal.png', label: 'DIGITAL WORKFLOW', number: '02' },
  { url: '/images/medication_shelving.png', label: 'STORAGE SHELVING', number: '03' },
  { url: '/images/lab.png', label: 'CLINICAL LAB', number: '04' },
  { url: '/images/pharmacist.png', label: 'PHARMACIST CONSULTATION', number: '05' },
];

function DispensingCareCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const nextSlide = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length);
  };

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 }
      }
    },
    exit: (dir) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 }
      }
    })
  };

  const handleDragEnd = (e, { offset, velocity }) => {
    const swipeThreshold = 50;
    if (offset.x < -swipeThreshold) {
      nextSlide();
    } else if (offset.x > swipeThreshold) {
      prevSlide();
    }
  };

  return (
    <section className="bg-[#050505] text-white py-24 md:py-40 px-8 md:px-20 lg:px-32 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          
          {/* Left Side: Header & Navigation */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full min-w-0">
            <div>
              <p className="text-2xs md:text-sm font-black tracking-[0.4em] uppercase text-white/30 mb-6">
                [ DISPENSING ENVIRONMENT ]
              </p>
              <h2 className="display-sm md:display-md lg:display-md font-black uppercase tracking-tighter leading-[0.85] mb-12">
                BUILT FOR THE<br />
                FUTURE OF<br />
                PHARMACEUTICAL<br />
                <span className="text-brand-teal">DISPENSING<br />CARE</span>
              </h2>
            </div>

            {/* Slider controls & details */}
            <div className="space-y-8 mt-4">
              <div className="flex items-center gap-6">
                <span className="text-sm font-black tracking-widest text-brand-teal">
                  {CAROUSEL_IMAGES[activeIndex].number}
                </span>
                <div className="flex-1 h-[1px] bg-white/10 relative overflow-hidden max-w-[200px]">
                  <motion.div 
                    className="absolute top-0 left-0 h-full bg-brand-teal"
                    initial={{ width: 0 }}
                    animate={{ width: `${((activeIndex + 1) / CAROUSEL_IMAGES.length) * 100}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
                <span className="text-sm font-black tracking-widest text-white/20">
                  0{CAROUSEL_IMAGES.length}
                </span>
              </div>

              {/* Caption */}
              <div className="h-8">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={activeIndex}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="text-xs font-black tracking-[0.3em] uppercase text-white/60"
                  >
                    {CAROUSEL_IMAGES[activeIndex].label}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Navigation buttons */}
              <div className="flex gap-4">
                <button
                  onClick={prevSlide}
                  className="w-12 h-12 md:w-16 md:h-16 border border-white/10 rounded-sm flex items-center justify-center hover:border-brand-teal hover:text-brand-teal transition-all duration-300 group"
                  aria-label="Previous slide"
                >
                  <svg className="w-5 h-5 transform rotate-180 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  className="w-12 h-12 md:w-16 md:h-16 border border-white/10 rounded-sm flex items-center justify-center hover:border-brand-teal hover:text-brand-teal transition-all duration-300 group"
                  aria-label="Next slide"
                >
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Right Side: Image Viewport */}
          <div className="lg:col-span-7 w-full">
            <div className="relative aspect-square md:aspect-[4/3] w-full overflow-hidden bg-[#111] border border-white/5 shadow-2xl rounded-sm cursor-grab active:cursor-grabbing select-none">
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={activeIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.6}
                  onDragEnd={handleDragEnd}
                  className="absolute inset-0 w-full h-full"
                >
                  <img
                    src={CAROUSEL_IMAGES[activeIndex].url}
                    alt={CAROUSEL_IMAGES[activeIndex].label}
                    className="w-full h-full object-cover pointer-events-none"
                    draggable="false"
                  />
                  {/* Subtle overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Slide indicator dots */}
            <div className="flex gap-2.5 mt-6 justify-center lg:justify-start">
              {CAROUSEL_IMAGES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > activeIndex ? 1 : -1);
                    setActiveIndex(i);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === activeIndex ? 'w-8 bg-brand-teal' : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}


const HERO_LINES = ["PRECISION", "WELLNESS", "HUMANITY", "FUTURE"];

export default function About() {
  const splitSectionRef = useRef(null);
  const paragraphSectionRef = useRef(null);
  const paragraphRef = useRef(null);

  useGSAP(() => {
    // 1. Lenis Setup
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

    // 2. Text Reveal Animation
    const chars = paragraphRef.current.querySelectorAll(".char");

    gsap.set(chars, {
      x: 100,
      opacity: 0,
      rotateY: 90,
    });

    gsap.to(chars, {
      x: 0,
      opacity: 1,
      rotateY: 0,
      ease: "expo.out",
      stagger: 0.01,
      scrollTrigger: {
        trigger: paragraphSectionRef.current,
        start: "top top",
        end: "bottom+=1500 top", // optimized pin duration
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // 3. Split Section Panels Animation
    const panels = gsap.utils.toArray('.scroll-panel');
    
    // Initialize panels
    panels.forEach((panel, i) => {
      if (i === 0) {
        gsap.set(panel, { y: 0, zIndex: 1 });
      } else {
        gsap.set(panel, { y: '100%', zIndex: i + 1 });
      }
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: splitSectionRef.current,
        start: 'top top',
        end: `+=${panels.length * 100}%`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    panels.forEach((panel, i) => {
      if (i === 0) return;
      tl.to(panel, {
        y: '0%',
        ease: 'none',
      });
    });

    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-white min-h-screen">
      
      {/* Native Auto-Playing Typography Hero */}
      <section 
        className="bg-black text-[#1B6E8C] min-h-screen relative overflow-hidden flex flex-col justify-center pt-[15vh] pb-[10vh]"
        style={{ textShadow: '0 0 35px rgba(27, 110, 140, 0.4)' }}
      >
        <div className="w-full flex flex-col justify-center space-y-4 md:space-y-6 pl-[8vw] pr-[8vw]">
          {HERO_LINES.map((text, i) => {
            return (
              <h1
                key={text}
                className="hero-line display-lg leading-[0.85] font-black tracking-[-0.04em] whitespace-nowrap cursor-default select-none w-max"
                style={{
                  animation: 'hero-glide-in 8s infinite',
                  animationDelay: `${i * 0.4}s`,
                }}
              >
                {text}
              </h1>
            );
          })}
          <style>{`
            @keyframes hero-glide-in {
              0%, 15% {
                transform: translate3d(0, 0, 0);
                opacity: 0.35;
                animation-timing-function: cubic-bezier(0.76, 0, 0.24, 1);
              }
              40%, 65% {
                transform: translate3d(calc(84vw - 100%), 0, 0);
                opacity: 1;
                animation-timing-function: cubic-bezier(0.76, 0, 0.24, 1);
              }
              90%, 100% {
                transform: translate3d(0, 0, 0);
                opacity: 0.35;
              }
            }
          `}</style>
        </div>
        <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10 text-white/50 text-2xs md:text-sm font-black tracking-[0.4em] uppercase">
            Constant Motion
        </div>
      </section>

      {/* Pinned Scroll Scrub Reveal */}
      <section ref={paragraphSectionRef} className="relative bg-black border-t border-white/10 min-h-screen flex flex-col justify-center items-center overflow-hidden pt-32 pb-20">
        <div className="relative z-10 w-full px-6 md:px-12 lg:px-24">
           <div className="max-w-[1400px] mx-auto">
             <p ref={paragraphRef} className="paragraph text-xl md:text-3xl text-white leading-relaxed tracking-normal font-bold flex flex-wrap justify-center items-center text-center">
                {NARRATIVE_WORDS.map((w, i) => (
                  <span key={i} className={`word inline-flex flex-wrap mx-[0.2em] mb-[0.2em] ${w.teal ? 'text-brand-teal' : 'text-white'}`}>
                    {w.text.split("").map((char, ci) => (
                      <span key={ci} className="char inline-block">{char}</span>
                    ))}
                  </span>
                ))}
             </p>
           </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-white">
        <div className="grid-container grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-32 items-center">
            <div className="space-y-8 md:space-y-16">
                <h2 className="display-lg font-black uppercase tracking-tighter leading-none flex flex-col items-start">
                  <AnimatedText text="OUR" splitBy="word" />
                  <AnimatedText text="FOUNDATION" splitBy="char" delay={0.1} />
                </h2>
                <div className="space-y-6 md:space-y-10 max-w-xl">
                    <p className="text-lg md:text-2xl text-black font-black leading-none tracking-tighter uppercase">
                        Built in Abuja to<br />
                        modernize the pharmacy<br />
                        experience through<br />
                        precision, trust, and<br />
                        patient-centered care
                    </p>
                    <p className="text-xs md:text-sm font-semibold tracking-normal text-black/60 leading-relaxed border-l-4 border-[#1B6E8C] pl-6 md:pl-8">
                        Traditional pharmacy models often prioritize<br />
                        speed over precision. Savincliff was created<br />
                        to deliver a more thoughtful standard of<br />
                        pharmaceutical care – where every<br />
                        prescription is reviewed carefully, every<br />
                        medication is verified at the source, & every<br />
                        patient interaction is built on trust.
                    </p>
                </div>
            </div>
            
            <motion.div 
                initial={{ opacity: 0, x: -100, y: 100, rotate: -5 }}
                whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, ease: easeQuint }}
                className="relative aspect-video overflow-hidden bg-black svz-image-reveal shadow-2xl"
            >
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
                <div className="absolute top-6 left-6 text-white/50 text-2xs md:text-sm font-black tracking-[0.4em] uppercase border border-white/20 p-2">
                    CLINICAL MANIFEST v2.0
                </div>
            </motion.div>
        </div>
      </section>

      {/* Split Sticky Scroll Section */}
      <section ref={splitSectionRef} className="relative bg-black h-screen flex flex-col md:flex-row overflow-hidden">
        {/* Left Side - Sticky */}
        <div className="w-full md:w-1/2 bg-black text-white p-12 md:p-24 flex flex-col justify-center">
          <div className="text-brand-teal text-2xs md:text-sm font-black tracking-[0.2em] uppercase mb-4">
            [OUR DIFFERENCE]
          </div>
          <h2 className="display-lg font-black uppercase tracking-tighter leading-none">
            WHY<br />SAVINCLIFF
          </h2>
        </div>

        {/* Right Side - Panels */}
        <div className="w-full md:w-1/2 relative h-full">
          {/* Panel 1 */}
          <div className="scroll-panel absolute inset-0 bg-brand-teal text-white p-12 md:p-24 flex flex-col justify-center">
            <h3 className="font-serif text-3xl md:text-5xl font-bold mb-8 leading-tight tracking-wide">
              Clinical Standards
            </h3>
            <div className="space-y-4 max-w-lg">
              <div className="flex justify-between items-start gap-4 border-b border-white/20 pb-2 text-2xs md:text-sm font-black uppercase tracking-wider">
                <span className="opacity-70 shrink-0">VERIFIED SOURCING</span>
                <span className="text-right">Authenticated pharmaceutical supply systems</span>
              </div>
              <div className="flex justify-between items-start gap-4 border-b border-white/20 pb-2 text-2xs md:text-sm font-black uppercase tracking-wider">
                <span className="opacity-70 shrink-0">PRESCRIPTION REVIEW</span>
                <span className="text-right">Every prescription reviewed by licensed pharmacists</span>
              </div>
              <div className="flex justify-between items-start gap-4 border-b border-white/20 pb-2 text-2xs md:text-sm font-black uppercase tracking-wider">
                <span className="opacity-70 shrink-0">STORAGE SYSTEMS</span>
                <span className="text-right">Temperature-controlled medication handling & cold-chain handling</span>
              </div>
              <div className="flex justify-between items-start gap-4 border-b border-white/20 pb-2 text-2xs md:text-sm font-black uppercase tracking-wider">
                <span className="opacity-70 shrink-0">DIGITAL ACCESS</span>
                <span className="text-right">Secure prescription and patient portal systems</span>
              </div>
              <div className="flex justify-between items-start gap-4 border-b border-white/20 pb-2 text-2xs md:text-sm font-black uppercase tracking-wider">
                <span className="opacity-70 shrink-0">PATIENT SUPPORT</span>
                <span className="text-right">Consultation-driven pharmaceutical care</span>
              </div>
            </div>
          </div>

          {/* Panel 2 */}
          <div className="scroll-panel absolute inset-0 bg-white text-black p-12 md:p-24 flex flex-col justify-center">
            <h3 className="font-serif text-3xl md:text-5xl font-bold mb-8 leading-tight tracking-wide">
              Built for Modern Care
            </h3>
            <div className="space-y-4 max-w-lg">
              <div className="flex justify-between items-start gap-4 border-b border-black/10 pb-2 text-2xs md:text-sm font-black uppercase tracking-wider">
                <span className="opacity-70 shrink-0">VERIFIED SOURCING</span>
                <span className="text-right">Authenticated pharmaceutical supply chain</span>
              </div>
              <div className="flex justify-between items-start gap-4 border-b border-black/10 pb-2 text-2xs md:text-sm font-black uppercase tracking-wider">
                <span className="opacity-70 shrink-0">DIGITAL PRESCRIPTIONS</span>
                <span className="text-right">Secure prescription upload and review</span>
              </div>
              <div className="flex justify-between items-start gap-4 border-b border-black/10 pb-2 text-2xs md:text-sm font-black uppercase tracking-wider">
                <span className="opacity-70 shrink-0">PATIENT PORTAL</span>
                <span className="text-right">Private medication records and review</span>
              </div>
              <div className="flex justify-between items-start gap-4 border-b border-black/10 pb-2 text-2xs md:text-sm font-black uppercase tracking-wider">
                <span className="opacity-70 shrink-0">CLINICAL CONSULTATION</span>
                <span className="text-right">Consultation-driven medication support</span>
              </div>
              <div className="flex justify-between items-start gap-4 border-b border-black/10 pb-2 text-2xs md:text-sm font-black uppercase tracking-wider">
                <span className="opacity-70 shrink-0">DELIVERY & COLLECTION</span>
                <span className="text-right">Flexible pickup and local delivery systems</span>
              </div>
            </div>
          </div>

          {/* Panel 3 */}
          <div className="scroll-panel absolute inset-0 bg-brand-teal text-white p-12 md:p-24 flex flex-col justify-center">
            <h3 className="font-serif text-3xl md:text-5xl font-bold mb-8 leading-tight tracking-wide">
              Precision Infrastructure
            </h3>
            <div className="space-y-4 max-w-lg">
              <div className="flex justify-between items-start gap-4 border-b border-white/20 pb-2 text-2xs md:text-sm font-black uppercase tracking-wider">
                <span className="opacity-70 shrink-0">DIGITAL RX</span>
                <span className="text-right">Integrated prescription intake systems</span>
              </div>
              <div className="flex justify-between items-start gap-4 border-b border-white/20 pb-2 text-2xs md:text-sm font-black uppercase tracking-wider">
                <span className="opacity-70 shrink-0">CLINICAL REVIEW</span>
                <span className="text-right">Licensed pharmacist oversight protocols</span>
              </div>
              <div className="flex justify-between items-start gap-4 border-b border-white/20 pb-2 text-2xs md:text-sm font-black uppercase tracking-wider">
                <span className="opacity-70 shrink-0">SOURCE TRACEABILITY</span>
                <span className="text-right">Medication authentication at procurement level</span>
              </div>
              <div className="flex justify-between items-start gap-4 border-b border-white/20 pb-2 text-2xs md:text-sm font-black uppercase tracking-wider">
                <span className="opacity-70 shrink-0">PATIENT ACCESS</span>
                <span className="text-right">Secure patient portal architecture</span>
              </div>
              <div className="flex justify-between items-start gap-4 border-b border-white/20 pb-2 text-2xs md:text-sm font-black uppercase tracking-wider">
                <span className="opacity-70 shrink-0">STORAGE CONTROL</span>
                <span className="text-right">Environmental monitoring and storage integrity</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-40 bg-white border-b border-black/5 overflow-hidden">
          <ScrollMarquee baseVelocity={-1.5}>
             <span className="display-giant font-black uppercase tracking-[-0.05em] text-black/5 mx-8 md:mx-24">
                PCN - NAFDAC - NDPR - VERIFIED - SECURE - COMPLIANT - AUTHENTICATED - 
             </span>
          </ScrollMarquee>
      </section>

      {/* ── Showcase of Clinical Excellence ─────────────────────────── */}
      <ShowcaseSection />

      {/* ── Dispensing Care Carousel ─────────────────────────────────── */}
      <DispensingCareCarousel />

      {/* High-Fidelity CTA */}
      <section className="section-padding bg-white">
        <div className="grid-container">
            <div className="bg-black text-white p-8 md:p-20 lg:p-40 relative overflow-hidden group">
                <div className="relative z-10 space-y-8 md:space-y-16">
                    <h2 className="display-md font-black uppercase tracking-tighter leading-none">EXPERIENCE<br />THE PRECISION</h2>
                    <div className="flex flex-col sm:flex-row gap-4 md:gap-8">
                        <button className="bg-white text-black px-8 md:px-16 py-5 md:py-8 text-2xs md:text-sm font-black uppercase tracking-[0.2em] md:tracking-[0.3em] hover:bg-brand-teal hover:text-white transition-all duration-700">Explore Inventory</button>
                        <button className="border border-white/20 px-8 md:px-16 py-5 md:py-8 text-2xs md:text-sm font-black uppercase tracking-[0.2em] md:tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-700 flex items-center justify-center gap-4 md:gap-6 group/btn">
                            Consult Pharmacist <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 group-hover/btn:translate-x-2 group-hover/btn:-translate-y-2 transition-transform" />
                        </button>
                    </div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-brand-teal/5 blur-[200px] rounded-full group-hover:bg-brand-teal/10 transition-all duration-1000" />
            </div>
        </div>
      </section>

    </div>
  );
}