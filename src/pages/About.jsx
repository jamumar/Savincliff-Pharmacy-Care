import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);
import { ArrowUpRight } from 'lucide-react';
import AnimatedText from '@/components/ui/AnimatedText';
import ScrollMarquee from '@/components/ui/ScrollMarquee';
import useCmsPage from '@/hooks/useCmsPage';
import { DEFAULT_ABOUT_SECTIONS } from '@/lib/cmsDefaults';

const easeQuint = [0.16, 1, 0.3, 1];

/* ─── Hero Section ───────────────────────────────────────────── */
function AboutHeroSection({ data }) {
  const { lines, color, bottomLabel } = data;
  return (
    <section 
      className="bg-black text-[#1B6E8C] min-h-screen relative overflow-hidden flex flex-col justify-center pt-[15vh] pb-[10vh]"
      style={{ 
        textShadow: '0 0 35px rgba(27, 110, 140, 0.4)',
        color: color || '#1B6E8C'
      }}
    >
      <div className="w-full flex flex-col justify-center space-y-4 md:space-y-6 pl-[8vw] pr-[8vw]">
        {lines.map((text, i) => (
          <h1
            key={text + '-' + i}
            className="hero-line display-giant leading-[0.85] font-black tracking-[-0.04em] whitespace-nowrap cursor-default select-none w-max"
            style={{
              animation: 'hero-glide-in 8s infinite',
              animationDelay: `${i * 0.4}s`,
            }}
          >
            {text}
          </h1>
        ))}
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
          {bottomLabel}
      </div>
    </section>
  );
}

/* ─── Narrative Section ──────────────────────────────────────── */
const NarrativeSection = React.forwardRef(({ data, innerRef }, ref) => {
  const { words } = data;
  return (
    <section ref={innerRef} className="relative bg-black border-t border-white/10 min-h-screen flex flex-col justify-center items-center overflow-hidden pt-32 pb-20">
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-24">
         <div className="max-w-[1400px] mx-auto">
           <p ref={ref} className="paragraph text-2xl md:text-5xl text-white leading-[1.1] tracking-tight font-bold uppercase flex flex-wrap justify-center items-center text-center">
              {words.map((w, i) => {
                if (w.teal) {
                  return (
                    <motion.span
                      key={i}
                      initial={{ color: 'rgba(27, 110, 140, 0.4)' }}
                      whileHover={{ scale: 1.1, color: '#1B6E8C', y: -4, textShadow: '0 0 20px rgba(27, 110, 140, 0.4)' }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                      className="word inline-flex flex-wrap mx-[0.2em] mb-[0.2em] font-serif italic cursor-pointer origin-center"
                    >
                      {w.text.split("").map((char, ci) => (
                        <span key={ci} className="char inline-block">{char}</span>
                      ))}
                    </motion.span>
                  );
                }
                return (
                  <span
                    key={i}
                    className="word inline-flex flex-wrap mx-[0.2em] mb-[0.2em] text-white"
                  >
                    {w.text.split("").map((char, ci) => (
                      <span key={ci} className="char inline-block">{char}</span>
                    ))}
                  </span>
                );
              })}
           </p>
         </div>
      </div>
    </section>
  );
});

NarrativeSection.displayName = 'NarrativeSection';

/* ─── Story Section ──────────────────────────────────────────── */
function StorySection({ data }) {
  const { title1, title2, subtitle, body, videoUrl } = data;
  return (
    <section className="section-padding bg-white">
      <div className="grid-container grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-32 items-center">
          <div className="space-y-8 md:space-y-16">
              <h2 className="display-lg font-black uppercase tracking-tighter leading-none flex flex-col items-start text-black">
                <AnimatedText text={title1} splitBy="word" />
                <AnimatedText text={title2} splitBy="char" delay={0.1} />
              </h2>
              <div className="space-y-6 md:space-y-10 max-w-xl">
                  <p className="text-lg md:text-2xl text-black font-black leading-none tracking-tighter uppercase">
                      {subtitle}
                  </p>
                  <p className="text-xs md:text-sm font-semibold tracking-normal text-black/60 leading-relaxed border-l-4 border-[#1B6E8C] pl-6 md:pl-8 text-left">
                      {body}
                  </p>
              </div>
          </div>
          
          {videoUrl && (
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
                    <source src={videoUrl} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/20 pointer-events-none" />
            </motion.div>
          )}
      </div>
    </section>
  );
}

/* ─── Split Sticky Scroll Section ────────────────────────────── */
function SplitStickySection({ data, innerRef }) {
  const { label, title, panels } = data;
  return (
    <section ref={innerRef} className="relative bg-black h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Left Side - Sticky */}
      <div className="w-full md:w-1/2 bg-black text-white p-12 md:p-24 flex flex-col justify-center">
        <div className="text-brand-teal text-2xs md:text-sm font-black tracking-[0.2em] uppercase mb-4">
          {label}
        </div>
        <h2 className="display-lg font-black uppercase tracking-tighter leading-none" dangerouslySetInnerHTML={{ __html: title.replace(/\s+/g, '<br />') }} />
      </div>

      {/* Right Side - Panels */}
      <div className="w-full md:w-1/2 relative h-full">
        {panels.map((panel, idx) => (
          <div 
            key={idx} 
            className={`scroll-panel absolute inset-0 p-12 md:p-24 flex flex-col justify-center ${panel.bgColor || 'bg-brand-teal'} ${panel.textColor || 'text-white'}`}
          >
            <h3 className="font-serif text-3xl md:text-5xl font-bold mb-8 leading-tight tracking-wide">
              {panel.title}
            </h3>
            <div className="space-y-4 max-w-lg">
              {panel.items.map((item, itemIdx) => (
                <div 
                  key={itemIdx} 
                  className={`flex justify-between items-start gap-4 border-b pb-2 text-2xs md:text-sm font-black uppercase tracking-wider ${
                    panel.bgColor === 'bg-white' ? 'border-black/10' : 'border-white/20'
                  }`}
                >
                  <span className="opacity-70 shrink-0">{item.label}</span>
                  <span className="text-right">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Showcase Section ───────────────────────────────────────── */
function ShowcaseSection({ data }) {
  const { label, title, stories } = data;
  const [active, setActive] = useState(0);
  const story = stories[active];

  return (
    <section className="bg-black text-white py-24 md:py-40 px-8 md:px-20 lg:px-32">
      <div className="max-w-[1400px] mx-auto">
        <p className="text-2xs md:text-sm font-black tracking-[0.4em] uppercase text-white/30 mb-6">{label}</p>
        <h2 className="display-lg font-black uppercase tracking-tighter leading-none mb-20 md:mb-28" dangerouslySetInnerHTML={{ __html: title.replace('FOR', 'FOR<br/>') }} />

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          {/* Left — Story detail */}
          <div className="flex-1 min-w-0">
            <h3 className="text-2xl md:text-3xl font-black uppercase leading-snug tracking-tight mb-10 max-w-lg transition-all duration-500 whitespace-pre-line text-left">
              {story.headline}
            </h3>

            <button className="inline-flex items-center gap-3 border border-white/30 px-6 py-3 text-2xs md:text-sm font-black uppercase tracking-[0.25em] hover:border-[#1B6E8C] hover:text-[#1B6E8C] transition-all duration-300 mb-16">
              {story.cta} <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Stats row */}
            <div className="flex gap-10 md:gap-16 text-left">
              {story.stats && story.stats.map((s, i) => (
                <div key={i}>
                  <p className="text-lg md:text-2xl font-black leading-tight tracking-widest text-white uppercase whitespace-pre-line">{s.value}</p>
                  <p className="text-3xs md:text-xs font-black tracking-[0.2em] text-white/40 mt-2 whitespace-pre-line uppercase">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Cards */}
          <div className="flex flex-col gap-0 w-full lg:w-[340px] shrink-0">
            {stories.map((s, i) => (
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

/* ─── Dispensing Care Carousel ─────────────────────────────────── */
function DispensingCareCarousel({ data }) {
  const { label, title, images } = data;
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
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

  const handleDragEnd = (e, { offset }) => {
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
          <div className="lg:col-span-5 flex flex-col justify-between h-full min-w-0 text-left">
            <div>
              <p className="text-2xs md:text-sm font-black tracking-[0.4em] uppercase text-white/30 mb-6">
                {label}
              </p>
              <h2 className="display-sm md:display-md lg:display-md font-black uppercase tracking-tighter leading-[0.85] mb-12" dangerouslySetInnerHTML={{ __html: title.replace('PHARMACEUTICAL', 'PHARMACEUTICAL<br/>').replace('DISPENSING', '<span class="text-brand-teal">DISPENSING').replace('CARE', 'CARE</span>') }} />
            </div>

            {/* Slider controls & details */}
            <div className="space-y-8 mt-4">
              <div className="flex items-center gap-6">
                <span className="text-sm font-black tracking-widest text-brand-teal">
                  {images[activeIndex].number}
                </span>
                <div className="flex-1 h-[1px] bg-white/10 relative overflow-hidden max-w-[200px]">
                  <motion.div 
                    className="absolute top-0 left-0 h-full bg-brand-teal"
                    initial={{ width: 0 }}
                    animate={{ width: `${((activeIndex + 1) / images.length) * 100}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
                <span className="text-sm font-black tracking-widest text-white/20">
                  0{images.length}
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
                    {images[activeIndex].label}
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
          <div className="lg:col-span-7 w-full text-left">
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
                    src={images[activeIndex].url}
                    alt={images[activeIndex].label}
                    className="w-full h-full object-cover pointer-events-none"
                    draggable="false"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Slide indicator dots */}
            <div className="flex gap-2.5 mt-6 justify-center lg:justify-start">
              {images.map((_, i) => (
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

/* ─── About Page component ───────────────────────────────────── */
export default function About() {
  const splitSectionRef = useRef(null);
  const paragraphSectionRef = useRef(null);
  const paragraphRef = useRef(null);

  const { sections, loading } = useCmsPage('about', DEFAULT_ABOUT_SECTIONS);

  useGSAP(() => {
    if (loading) return;

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
    const paragraphElement = paragraphRef.current;
    if (paragraphElement) {
      const chars = paragraphElement.querySelectorAll(".char");
      if (chars.length > 0) {
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
            end: "bottom+=1500 top",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      }
    }

    // 3. Split Section Panels Animation
    const splitElement = splitSectionRef.current;
    if (splitElement) {
      const panels = gsap.utils.toArray(splitElement.querySelectorAll('.scroll-panel'));
      if (panels.length > 0) {
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
            trigger: splitElement,
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
      }
    }

    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
    };
  }, [loading, sections]);

  // Force ScrollTrigger calculations update when dynamic data loads
  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }
  }, [loading, sections]);

  const getCustomStyles = (data) => {
    const styles = {};
    if (data?.customTextColor) styles.color = data.customTextColor;
    if (data?.customFontFamily) styles.fontFamily = data.customFontFamily;
    if (data?.customFontWeight) styles.fontWeight = data.customFontWeight;
    if (data?.customFontSize) styles.fontSize = data.customFontSize;
    return styles;
  };

  return (
    <div className="bg-white min-h-screen">
      {sections.map((sec) => {
        const customStyles = getCustomStyles(sec.data);

        return (
          <div key={sec.id} style={customStyles}>
            {(() => {
              switch (sec.type) {
                case 'about_hero':
                  return <AboutHeroSection data={sec.data} />;
                
                case 'about_narrative':
                  return (
                    <NarrativeSection 
                      data={sec.data} 
                      innerRef={paragraphSectionRef} 
                      ref={paragraphRef} 
                    />
                  );
                
                case 'about_story':
                  return <StorySection data={sec.data} />;
                
                case 'about_split_sticky':
                  return (
                    <SplitStickySection 
                      data={sec.data} 
                      innerRef={splitSectionRef} 
                    />
                  );
                
                case 'marquee':
                  return (
                    <section className="py-20 md:py-40 bg-white border-b border-black/5 overflow-hidden">
                      <ScrollMarquee baseVelocity={sec.data.velocity || -1.5}>
                        <span className="display-giant font-black uppercase tracking-[-0.05em] text-black/5 mx-8 md:mx-24">
                          {sec.data.text}
                        </span>
                      </ScrollMarquee>
                    </section>
                  );
                
                case 'about_showcase':
                  return <ShowcaseSection data={sec.data} />;
                
                case 'about_dispensing_care':
                  return <DispensingCareCarousel data={sec.data} />;
                
                case 'about_cta':
                  return (
                    <section className="section-padding bg-white">
                      <div className="grid-container">
                          <div className="bg-black text-white p-8 md:p-20 lg:p-40 relative overflow-hidden group">
                              <div className="relative z-10 space-y-8 md:space-y-16 text-left">
                                  <h2 className="display-md font-black uppercase tracking-tighter leading-none">{sec.data.title}</h2>
                                  <div className="flex flex-col sm:flex-row gap-4 md:gap-8">
                                      <Link to="/shop" className="bg-white text-black px-8 md:px-16 py-5 md:py-8 text-2xs md:text-sm font-black uppercase tracking-[0.2em] md:tracking-[0.3em] hover:bg-brand-teal hover:text-white transition-all duration-700 text-center">
                                        {sec.data.btn1Text}
                                      </Link>
                                      <Link to="/contact" className="border border-white/20 px-8 md:px-16 py-5 md:py-8 text-2xs md:text-sm font-black uppercase tracking-[0.2em] md:tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-700 flex items-center justify-center gap-4 md:gap-6 group/btn text-center">
                                          {sec.data.btn2Text} <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 group-hover/btn:translate-x-2 group-hover/btn:-translate-y-2 transition-transform" />
                                      </Link>
                                  </div>
                              </div>
                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-brand-teal/5 blur-[200px] rounded-full group-hover:bg-brand-teal/10 transition-all duration-1000" />
                          </div>
                      </div>
                    </section>
                  );
                
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