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
  { text: "WE" }, { text: "ARE" }, { text: "A" }, { text: "CLINICAL" }, { text: "PHARMACY" },
  { text: "WHERE" }, { text: "SCIENCE" }, { text: "MEETS" }, { text: "PRECISION." },
  { text: "VERIFICATION", teal: true }, { text: "IS" }, { text: "OUR" }, { text: "COMPASS," },
  { text: "ENSURING" }, { text: "EVERY" }, { text: "MEDICATION" }, { text: "IS" },
  { text: "AUTHENTICATED" }, { text: "AT" }, { text: "THE" }, { text: "SOURCE." },
  { text: "WE" }, { text: "INFUSE" }, { text: "EVERY" }, { text: "PRESCRIPTION", teal: true },
  { text: "WITH" }, { text: "PURPOSE," }, { text: "CRAFTING" }, { text: "THERAPEUTIC" },
  { text: "PROTOCOLS" }, { text: "THAT" }, { text: "PROTECT" }, { text: "ACROSS" }, { text: "EVERY" },
  { text: "INTERACTION." }, { text: "QUALITY", teal: true }, { text: "IS" }, { text: "OUR" },
  { text: "FOUNDATION," }, { text: "MAINTAINING" }, { text: "THE" }, { text: "HIGHEST" },
  { text: "PHARMACEUTICAL" }, { text: "STANDARDS" }, { text: "IN" }, { text: "EVERY" },
  { text: "FORMULATION" }, { text: "WE" }, { text: "DISPENSE." },
  { text: "THROUGH" }, { text: "FULL-SPECTRUM" }, { text: "CLINICAL" }, { text: "CERTAINTY." }
];

/* ─── Showcase Section ───────────────────────────────────────── */
const STORIES = [
  {
    id: 'NAUTH',
    label: 'NAUTH',
    headline: 'HOW NAUTH REDUCED DISPENSING ERRORS BY 94% WITH SAVINCLIFF\'S VERIFICATION PROTOCOL',
    cta: 'READ CLINICAL REPORT',
    stats: [
      { value: '94%', label: 'Reduction in dispensing errors' },
      { value: '12K+', label: 'Prescriptions verified monthly' },
      { value: '4.9/5', label: 'Patient satisfaction score' },
    ],
  },
  {
    id: 'UITH',
    label: 'UITH',
    headline: 'HOW UITH SCALED THEIR CLINICAL PHARMACY OPERATIONS ACROSS 3 CAMPUSES IN 6 MONTHS',
    cta: 'READ CLINICAL REPORT',
    stats: [
      { value: '3x', label: 'Operational scale increase' },
      { value: '99.2%', label: 'Formulary accuracy rate' },
      { value: '6 mo', label: 'Full deployment timeline' },
    ],
  },
  {
    id: 'LUTH',
    label: 'LUTH',
    headline: 'HOW LUTH ACHIEVED ZERO-COMPROMISE PHARMACEUTICAL SOURCING FOR A \u20A620B PORTFOLIO',
    cta: 'READ CLINICAL REPORT',
    stats: [
      { value: '\u20A620B+', label: 'Portfolio under management' },
      { value: '100%', label: 'NAFDAC-verified sourcing' },
      { value: '18+', label: 'Institutional partnerships' },
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
        <p className="text-[9px] font-black tracking-[0.4em] uppercase text-white/30 mb-6">[ CLINICAL PARTNERSHIPS ]</p>
        <h2 className="text-[9vw] md:text-[5.5vw] font-black uppercase tracking-tighter leading-none mb-20 md:mb-28">
          SHOWCASE OF<br />CLINICAL EXCELLENCE
        </h2>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">

          {/* Left — Story detail */}
          <div className="flex-1 min-w-0">
            <h3 className="text-[22px] md:text-[28px] font-black uppercase leading-snug tracking-tight mb-10 max-w-lg transition-all duration-500">
              {story.headline}
            </h3>

            <button className="inline-flex items-center gap-3 border border-white/30 px-6 py-3 text-[10px] font-black uppercase tracking-[0.25em] hover:border-[#1B6E8C] hover:text-[#1B6E8C] transition-all duration-300 mb-16">
              {story.cta} <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Stats row */}
            <div className="flex gap-10 md:gap-16">
              {story.stats.map((s, i) => (
                <div key={i}>
                  <p className="text-[40px] md:text-[56px] font-black leading-none tracking-tighter text-white">{s.value}</p>
                  <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-white/40 mt-2 max-w-[120px]">{s.label}</p>
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
                  'w-full h-[100px] flex items-center justify-center text-[13px] font-black uppercase tracking-[0.2em] transition-all duration-400 border border-white/5',
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

/* ─── Wall of Fame (Single Card Swipe) ────────────────────── */
const TESTIMONIALS = [
  {
    text: "Our website and brand took a leap forward. The process was smooth. The communication was terrific. I really appreciate the team’s attention to detail and delivery.",
    name: "Jon Silvers",
    role: "Head of Marketing, Search.io"
  },
  {
    text: "We've had the pleasure to work with the team on a complete re-design of our website. We were highly impressed by their structured approach and organization.",
    name: "Vincent Huber",
    role: "Co-Founder, Jrny"
  },
  {
    text: "We're very happy with the finished website & brand. The team did a great job of understanding the challenges of both our business and what we needed.",
    name: "Jenn Virskus",
    role: "Head of Marketing, Saildrone"
  },
  {
    text: "They have been an incredible partner from research to design, development, and beyond. Their thoughtfulness, adaptability, and ability to truly understand our needs.",
    name: "Bill Meyer",
    role: "Executive Director, EMA Foundation"
  },
  {
    text: "They did a beautiful job designing and developing our site. The team made the effort to really understand our data, analytics, brand, and our team loves the outcome.",
    name: "Summer Romasco",
    role: "VP of Marketing, Burner"
  },
  {
    text: "Very responsive to the needs of our brand and worked in partnership with us to create a visual identity that feels authentic to our diverse team, users, and community.",
    name: "Mariana Racasan",
    role: "Marketing Director, Zehhub"
  },
  {
    text: "Working with great design teams can be an almost transcendental experience. They’re able to unlock what’s in your head, even if you can’t always articulate it well.",
    name: "Michael Peach",
    role: "VP, Marketing, Rimsys"
  },
  {
    text: "Working with the team was nothing short of amazing. Not only does their portfolio speak for itself, they are a one-stop shop for branding, design and development.",
    name: "Travis Wingate",
    role: "VP, Marketing, Supermove"
  },
  {
    text: "From teaming with our internal infrastructure team to iron out developer details, to standing by for our late night website launch, they were there for us.",
    name: "Alexis Hain",
    role: "Operations Manager, Patreon"
  }
];

function WallOfFame() {
  const [mode, setMode] = useState('GRID'); // 'GRID' | 'SINGLE'
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for prev

  const handleDragEnd = (e, { offset, velocity }) => {
    const swipePower = Math.abs(offset.x) * velocity.x;
    const swipeConfidenceThreshold = 10000;
    const distanceThreshold = 100;

    if (offset.x < -distanceThreshold || swipePower < -swipeConfidenceThreshold) {
      if (activeIndex < TESTIMONIALS.length - 1) {
        setDirection(1);
        setActiveIndex(prev => prev + 1);
      }
    } else if (offset.x > distanceThreshold || swipePower > swipeConfidenceThreshold) {
      if (activeIndex > 0) {
        setDirection(-1);
        setActiveIndex(prev => prev - 1);
      }
    }
  };

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir) => ({
      zIndex: 0,
      x: dir < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    })
  };

  return (
    <section className="bg-[#050505] text-white py-24 md:py-32 overflow-hidden relative min-h-screen flex flex-col justify-center">
      <div className="relative z-10 text-center mb-16 px-8 pointer-events-none">
        <h2 className="text-[10vw] md:text-[7vw] font-black uppercase tracking-tighter leading-none">
          WALL OF F<span className="font-serif italic normal-case tracking-normal pr-1 md:pr-2 -ml-2 md:-ml-4 text-[1.1em]">a</span>ME
        </h2>
      </div>

      <AnimatePresence mode="wait">
        {mode === 'GRID' ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-6 md:px-12 max-w-[1400px] mx-auto w-full"
          >
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02, backgroundColor: '#141414' }}
                onClick={() => {
                  setActiveIndex(i);
                  setDirection(0); // Reset direction for clean entry
                  setMode('SINGLE');
                }}
                className="flex flex-col justify-between bg-[#0a0a0a] p-8 md:p-10 border border-white/5 rounded-sm cursor-pointer transition-colors h-[280px]"
              >
                <p className="text-[13px] text-white/30 leading-relaxed font-medium pointer-events-none line-clamp-4">
                  {t.text}
                </p>
                <div className="flex items-center gap-4 mt-6 pointer-events-none opacity-40">
                  <div className="w-10 h-10 bg-[#1a1a1a] flex items-center justify-center font-bold text-white/50 rounded-sm shrink-0">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-white/70">{t.name}</div>
                    <div className="text-[9px] font-medium uppercase tracking-[0.15em] text-white/30 mt-1">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="single"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="relative w-full h-[450px] flex items-center justify-center overflow-hidden flex-col"
          >
            <button 
              onClick={() => setMode('GRID')}
              className="absolute top-0 md:top-4 right-8 md:right-24 text-[11px] font-bold uppercase tracking-[0.2em] text-white/40 hover:text-brand-teal transition-colors z-20 py-2 px-4 border border-white/10 hover:border-brand-teal/50 rounded-sm"
            >
              [ Back to Wall ]
            </button>

            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={handleDragEnd}
                className="absolute flex flex-col justify-between bg-[#111] p-10 md:p-14 border border-white/10 rounded-sm w-[90%] md:w-[540px] h-[340px] cursor-grab active:cursor-grabbing shadow-2xl z-10"
              >
                <p className="text-[15px] md:text-[16px] text-white/80 leading-relaxed font-medium pointer-events-none">
                  {TESTIMONIALS[activeIndex].text}
                </p>
                <div className="flex items-center gap-4 mt-8 pointer-events-none">
                  <div className="w-12 h-12 bg-brand-teal/20 text-brand-teal flex items-center justify-center font-bold rounded-sm shrink-0">
                    {TESTIMONIALS[activeIndex].name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-white">{TESTIMONIALS[activeIndex].name}</div>
                    <div className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/50 mt-1">{TESTIMONIALS[activeIndex].role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Navigation Indicators */}
            <div className="absolute bottom-4 flex gap-2 z-10">
              {TESTIMONIALS.map((_, i) => (
                <div 
                  key={i} 
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'bg-brand-teal scale-125' : 'bg-white/20'}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

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
        end: "bottom+=5000 top",
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
      <section 
        className="bg-black text-[#22D3EE] min-h-screen relative overflow-hidden flex flex-col justify-center pt-[15vh] pb-[10vh]"
        style={{ textShadow: '0 0 35px rgba(34, 211, 238, 0.45)' }}
      >
        <div className="w-full flex flex-col justify-center space-y-2">
            <motion.h1 
              initial={{ x: "-5vw" }}
              animate={{ x: "60vw" }} 
              transition={getTransition(0)}
              className="text-[14vw] md:text-[11vw] leading-[0.85] font-serif font-normal tracking-[-0.02em] opacity-100 whitespace-nowrap"
            >
               Legacy
            </motion.h1>
            <motion.h1 
              initial={{ x: "10vw" }}
              animate={{ x: "40vw" }} 
              transition={getTransition(0.3)}
              className="text-[14vw] md:text-[11vw] leading-[0.85] font-serif font-normal tracking-[-0.02em] opacity-100 whitespace-nowrap"
            >
               Innovation
            </motion.h1>
            <motion.h1 
              initial={{ x: "-15vw" }}
              animate={{ x: "50vw" }} 
              transition={getTransition(0.6)}
              className="text-[14vw] md:text-[11vw] leading-[0.85] font-serif font-normal tracking-[-0.02em] opacity-100 whitespace-nowrap"
            >
               Human
            </motion.h1>
            <motion.h1 
              initial={{ x: "20vw" }}
              animate={{ x: "70vw" }} 
              transition={getTransition(0.9)}
              className="text-[14vw] md:text-[11vw] leading-[0.85] font-serif font-normal tracking-[-0.02em] opacity-100 whitespace-nowrap"
            >
               Freedom
            </motion.h1>
        </div>
        <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10 text-white/50 text-[9px] font-black tracking-[0.4em] uppercase">
            Constant Motion
        </div>
      </section>

      {/* Pinned Scroll Scrub Reveal */}
      <section ref={paragraphSectionRef} className="relative bg-black border-t border-white/10 min-h-screen flex flex-col justify-center items-center overflow-hidden pt-32 pb-20">
        <div className="relative z-10 w-full px-6 md:px-12 lg:px-24">
           <div className="max-w-[1400px] mx-auto">
             <p ref={paragraphRef} className="paragraph text-xl md:text-[2.6vw] text-white leading-[1.2] tracking-tighter font-black uppercase flex flex-wrap justify-center items-center text-center">
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
                <h2 className="text-[10vw] md:text-[5vw] font-black uppercase tracking-tighter leading-none flex flex-col items-start">
                  <AnimatedText text="THE" splitBy="word" />
                  <AnimatedText text="MANIFEST" splitBy="char" delay={0.1} />
                </h2>
                <div className="space-y-6 md:space-y-10 max-w-xl">
                    <p className="text-lg md:text-2xl text-black font-black leading-none tracking-tighter uppercase">
                        Originating in the FCT node of Abuja, Savincliff emerged from a singular clinical requirement.
                    </p>
                    <p className="text-[11px] md:text-[12px] font-black tracking-[0.3em] md:tracking-[0.4em] text-black/40 uppercase leading-relaxed border-l-4 border-[#1B6E8C] pl-6 md:pl-8">
                        Traditional pharmacy models prioritized volume over verification. We inverted the sequence. Every prescription processed at Savincliff is a project of precision—audited by architects of health and delivered through a secured custodial chain.
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
                    className="w-full h-full object-contain opacity-80 hover:opacity-100 transition-all duration-1000"
                >
                    <source src="/animations/whatsapp_2.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/20 pointer-events-none" />
                <div className="absolute top-6 left-6 text-white/50 text-[9px] font-black tracking-[0.4em] uppercase border border-white/20 p-2">
                    CLINICAL MANIFEST v2.0
                </div>
            </motion.div>
        </div>
      </section>

      {/* Split Sticky Scroll Section */}
      <section ref={splitSectionRef} className="relative bg-black h-screen flex flex-col md:flex-row overflow-hidden">
        {/* Left Side - Sticky */}
        <div className="w-full md:w-1/2 bg-black text-white p-12 md:p-24 flex flex-col justify-center">
          <div className="text-brand-teal text-[10px] font-black tracking-[0.2em] uppercase mb-4">
            [ENTERPRISE]
          </div>
          <h2 className="text-[8vw] md:text-[5vw] font-black uppercase tracking-tighter leading-none">
            WHY CHOOSE<br />SAVINCLIFF
          </h2>
        </div>

        {/* Right Side - Panels */}
        <div className="w-full md:w-1/2 relative h-full">
          {/* Panel 1 */}
          <div className="scroll-panel absolute inset-0 bg-brand-teal text-white p-12 md:p-24 flex flex-col justify-center">
            <h3 className="font-serif text-3xl md:text-5xl font-bold mb-8 leading-tight tracking-wide">
              Dedicated Senior Team
            </h3>
            <div className="space-y-4 max-w-lg">
              <div className="flex justify-between border-b border-white/20 pb-2 text-[11px] md:text-xs font-bold uppercase tracking-wider">
                <span className="opacity-70">SENIOR TEAM DIRECTORS</span>
                <span>12</span>
              </div>
              <div className="flex justify-between border-b border-white/20 pb-2 text-[11px] md:text-xs font-bold uppercase tracking-wider">
                <span className="opacity-70">NEW CLIENTS ACCEPTED</span>
                <span>≈ 1 Per Month</span>
              </div>
              <div className="flex justify-between border-b border-white/20 pb-2 text-[11px] md:text-xs font-bold uppercase tracking-wider">
                <span className="opacity-70">HQ LOCATION</span>
                <span>≈ Abuja, Nigeria</span>
              </div>
              <div className="flex justify-between border-b border-white/20 pb-2 text-[11px] md:text-xs font-bold uppercase tracking-wider">
                <span className="opacity-70">SATELLITE OFFICE</span>
                <span>≈ Lagos, Nigeria</span>
              </div>
              <div className="flex justify-between border-b border-white/20 pb-2 text-[11px] md:text-xs font-bold uppercase tracking-wider">
                <span className="opacity-70">TEAM DISTRIBUTION</span>
                <span>Pan-African</span>
              </div>
            </div>
          </div>

          {/* Panel 2 */}
          <div className="scroll-panel absolute inset-0 bg-white text-black p-12 md:p-24 flex flex-col justify-center">
            <h3 className="font-serif text-3xl md:text-5xl font-bold mb-8 leading-tight tracking-wide">
              Choose your way
            </h3>
            <div className="space-y-4 max-w-lg">
              <div className="flex justify-between border-b border-black/10 pb-2 text-[11px] md:text-xs font-bold uppercase tracking-wider">
                <span className="opacity-70">FLAT RATE PROJECT(S)</span>
                <span>Yes</span>
              </div>
              <div className="flex justify-between border-b border-black/10 pb-2 text-[11px] md:text-xs font-bold uppercase tracking-wider">
                <span className="opacity-70">DESIGN & DEV RETAINER</span>
                <span>Yes</span>
              </div>
              <div className="flex justify-between border-b border-black/10 pb-2 text-[11px] md:text-xs font-bold uppercase tracking-wider">
                <span className="opacity-70">GROWTH & SEO RETAINER</span>
                <span>Yes</span>
              </div>
              <div className="flex justify-between border-b border-black/10 pb-2 text-[11px] md:text-xs font-bold uppercase tracking-wider">
                <span className="opacity-70">CLINICAL TRAINING</span>
                <span>Yes</span>
              </div>
              <div className="flex justify-between border-b border-black/10 pb-2 text-[11px] md:text-xs font-bold uppercase tracking-wider">
                <span className="opacity-70">PRODUCTION SERVICES</span>
                <span>Yes</span>
              </div>
            </div>
          </div>

          {/* Panel 3 */}
          <div className="scroll-panel absolute inset-0 bg-brand-teal text-white p-12 md:p-24 flex flex-col justify-center">
            <h3 className="font-serif text-3xl md:text-5xl font-bold mb-8 leading-tight tracking-wide">
              Project Count & Recognition
            </h3>
            <div className="space-y-4 max-w-lg">
              <div className="flex justify-between border-b border-white/20 pb-2 text-[11px] md:text-xs font-bold uppercase tracking-wider">
                <span className="opacity-70">FINALIZED PROJECTS</span>
                <span>300+</span>
              </div>
              <div className="flex justify-between border-b border-white/20 pb-2 text-[11px] md:text-xs font-bold uppercase tracking-wider">
                <span className="opacity-70">ENTERPRISE PARTNER</span>
                <span>Finalist 2026</span>
              </div>
              <div className="flex justify-between border-b border-white/20 pb-2 text-[11px] md:text-xs font-bold uppercase tracking-wider">
                <span className="opacity-70">1ST EVER CLINICAL.GOV</span>
                <span>Won First State Contract</span>
              </div>
              <div className="flex justify-between border-b border-white/20 pb-2 text-[11px] md:text-xs font-bold uppercase tracking-wider">
                <span className="opacity-70">AWWWARDS</span>
                <span>Honorable Mentions x15</span>
              </div>
            </div>
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

      {/* ── Showcase of Clinical Excellence ─────────────────────────── */}
      <ShowcaseSection />

      {/* ── Wall of Fame ───────────────────────────────────────────── */}
      <WallOfFame />

      {/* High-Fidelity CTA */}
      <section className="section-padding bg-white">
        <div className="grid-container">
            <div className="bg-black text-white p-8 md:p-20 lg:p-40 relative overflow-hidden group">
                <div className="relative z-10 space-y-8 md:space-y-16">
                    <h2 className="text-[8vw] md:text-[5vw] font-black uppercase tracking-tighter leading-none">EXPERIENCE<br />THE PRECISION</h2>
                    <div className="flex flex-col sm:flex-row gap-4 md:gap-8">
                        <button className="bg-white text-black px-8 md:px-16 py-5 md:py-8 text-[10px] md:text-[12px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] hover:bg-brand-teal hover:text-white transition-all duration-700">Explore Inventory</button>
                        <button className="border border-white/20 px-8 md:px-16 py-5 md:py-8 text-[10px] md:text-[12px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-700 flex items-center justify-center gap-4 md:gap-6 group/btn">
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