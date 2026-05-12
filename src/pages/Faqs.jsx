import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const FAQ_CATEGORIES = [
  {
    id: 'about-savincliff',
    idNum: '[01]',
    title: 'ABOUT SAVINCLIFF',
    tag: 'ABOUT SAVINCLIFF',
    questions: [
      {
        q: 'WHAT MAKES SAVINCLIFF DIFFERENT FROM OTHER AGENCIES?',
        a: 'SAVINCLIFF BLENDS ARTISTRY AND TECH WITH INTENTIONAL GROWTH AND ELITE PHARMACEUTICAL EXECUTION.'
      },
      {
        q: 'WHAT KIND OF AGENCY IS SAVINCLIFF?',
        a: 'SAVINCLIFF IS A HIGH-CALIBER CREATIVE AND TECHNICAL AGENCY WITH FULL-SPECTRUM CLINICAL SERVICES.'
      }
    ]
  },
  {
    id: 'client-experience',
    idNum: '[02]',
    title: 'CLIENT EXPERIENCE',
    tag: 'CLIENT EXPERIENCE',
    questions: [
      {
        q: 'HOW DO WE GET STARTED WORKING WITH SAVINCLIFF?',
        a: 'BOOK A DISCOVERY CALL—SAVINCLIFF FOLLOWS UP WITH A CUSTOM CLINICAL AUDIT AND PROPOSAL.'
      },
      {
        q: 'CAN SAVINCLIFF WORK WITH INTERNATIONAL OR REMOTE TEAMS?',
        a: 'YES—SAVINCLIFF WORKS GLOBALLY WITH ASYNC WORKFLOWS AND SECURE DISTRIBUTED AUDIT NODES.'
      },
      {
        q: 'WHO WILL BE LEADING OUR PROJECT AT SAVINCLIFF?',
        a: 'PROJECTS ARE LED BY SENIOR PHARMACEUTICAL ARCHITECTS AND SUPPORTED BY A CLOSE-KNIT CLINICAL TEAM.'
      },
      {
        q: 'HOW ARE PROJECTS TYPICALLY PRICED AT SAVINCLIFF?',
        a: 'SAVINCLIFF USES FLAT-FEE PRICING WITH OPTIONAL PHASES OR ONGOING REGULATORY RETAINERS.'
      },
      {
        q: 'HOW INVOLVED WILL OUR TEAM NEED TO BE DURING A PROJECT?',
        a: 'CLIENT COLLABORATION IS KEY—SAVINCLIFF GUIDES, BUT YOUR STRATEGIC INPUT SHAPES THE FINAL COMPLIANCE OUTCOME.'
      },
      {
        q: 'WHAT HAPPENS AFTER THE PROJECT LAUNCHES?',
        a: 'SAVINCLIFF OFFERS POST-LAUNCH SUPPORT, AUDIT MONITORING, TRAINING, AND LONG-TERM PARTNERSHIP OPTIONS.'
      }
    ]
  },
  {
    id: 'branding',
    idNum: '[03]',
    title: 'BRANDING',
    tag: 'BRANDING',
    questions: [
      {
        q: 'HOW DOES SAVINCLIFF APPROACH HEALTHCARE IDENTITY?',
        a: 'WE CRAFT TIMELESS VISUAL SYSTEMS THAT COMMAND TRUST WHILE RETAINING CUTTING-EDGE DIGITAL PRECISION.'
      },
      {
        q: 'DO YOU PROVIDE FULL DESIGN SYSTEMS AND COMPLIANCE KITS?',
        a: 'EVERY DIGITAL DEPLOYMENT INCLUDES COMPREHENSIVE COMPONENT ARCHITECTURE BUILT FOR INSTITUTIONAL SCALE.'
      }
    ]
  },
  {
    id: 'design-ux',
    idNum: '[04]',
    title: 'DESIGN & UX',
    tag: 'DESIGN & UX',
    questions: [
      {
        q: 'HOW DO YOU ENSURE SEAMLESS DISPENSING USABILITY?',
        a: 'WE CONDUCT RIGOROUS USER FLOW AUDITS AND CLINICAL PERSONA MAPPING TO ACCELERATE FULFILLMENT VELOCITY.'
      },
      {
        q: 'DO YOU INTEGRATE VOLUMETRIC 3D EXPERIENCES?',
        a: 'YES, WE DEPLOY HIGH-FIDELITY WEBGL/THREE.JS VISUALIZATIONS TO ELEVATE PRODUCT PRESENTATION WITH ADDITIVE LIGHTING.'
      }
    ]
  },
  {
    id: 'production',
    idNum: '[05]',
    title: 'PRODUCTION',
    tag: 'PRODUCTION',
    questions: [
      {
        q: 'WHAT IS YOUR PRE-PRODUCTION BRIEFING PROCESS?',
        a: 'WE ALIGN ON STRICT CREATIVE FOCUS AND COMPLIANCE BOUNDARIES BEFORE EXECUTING INDUSTRIAL-GRADE MEDIA CAMPAIGNS.'
      }
    ]
  },
  {
    id: 'engineering-development',
    idNum: '[06]',
    title: 'ENGINEERING & DEVELOPMENT',
    tag: 'ENGINEERING & DEVELOPMENT',
    questions: [
      {
        q: 'WHAT TECHNOLOGY STACK DOES SAVINCLIFF DEPLOY?',
        a: 'HIGH-PERFORMANCE REACT NODES, TAURI DESKTOP ENGINES, AND SECURE OFFLINE-FIRST INDEXEDDB SYNCHRONIZATION.'
      },
      {
        q: 'ARE YOUR SYSTEMS FULLY REGULATORY COMPLIANT?',
        a: 'TOTAL CRYPTOGRAPHIC AUDIT TRAILS GUARANTEE SEAMLESS COMPLIANCE ACROSS LOCAL AND INTERNATIONAL DISPENSING STANDARDS.'
      }
    ]
  },
  {
    id: 'webflow-nocode',
    idNum: '[07]',
    title: 'WEBFLOW & NO-CODE',
    tag: 'WEBFLOW & NO-CODE',
    questions: [
      {
        q: 'CAN YOU INTEGRATE CUSTOM AI AGENTS INTO EXISTING PLATFORMS?',
        a: 'WE BUILD EMBEDDED NO-CODE AI PROTOTYPES AND AUTOMATION WORKFLOWS TAILORED DIRECTLY TO INSTITUTIONAL DASHBOARDS.'
      }
    ]
  },
  {
    id: 'strategy-consulting',
    idNum: '[08]',
    title: 'STRATEGY & CONSULTING',
    tag: 'STRATEGY & CONSULTING',
    questions: [
      {
        q: 'HOW DO WE SCALE OUR CLINICAL DISPENSING REACH?',
        a: 'WE CONDUCT COMPREHENSIVE COMPETITOR MAPPING AND ECOSYSTEM AUTOMATION TO AMPLIFY WHAT WORKS AND SECURE FUTURE EXPANSION.'
      }
    ]
  }
];

export default function Faqs() {
  const [activeTab, setActiveTab] = useState('about-savincliff');
  const [expandedQ, setExpandedQ] = useState({});

  // Dynamic intersection observer to update active floating navbar pill on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = FAQ_CATEGORIES.map(c => document.getElementById(c.id));
      const scrollPos = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveTab(FAQ_CATEGORIES[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  return (
    <div className="bg-black text-white min-h-screen pb-48 pt-32 select-none overflow-x-hidden">
      {/* Hero Section */}
      <section className="px-6 md:px-12 pt-12 pb-24 text-center max-w-[1400px] mx-auto">
        {/* SVZ bespoke stylized Serif/Italic interspersing */}
        <h1 className="text-[12vw] md:text-[9.5vw] font-black uppercase tracking-[-0.04em] leading-[0.85]">
          COMMON<br />
          Q<span className="font-serif italic text-brand-teal inline-block transform -rotate-6 mx-1">U</span>E
          <span className="font-serif italic text-white/90 inline-block transform rotate-2">S</span>TI
          <span className="font-serif italic text-brand-teal inline-block transform -rotate-3 mx-1">O</span>NS
        </h1>
        <p className="text-white/50 text-xs md:text-sm font-medium max-w-lg mx-auto mt-8 tracking-wide">
          Explore the categories below to find the information you need and learn more about us.
        </p>
      </section>

      {/* Main Categories & Question Grids */}
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 flex flex-col gap-28">
        {FAQ_CATEGORIES.map((cat, cIdx) => (
          <section key={cat.id} id={cat.id} className="scroll-mt-32">
            {/* Category Header */}
            <div className="flex items-baseline gap-3 mb-8 border-b border-white/10 pb-4">
              <span className="text-[11px] font-black text-brand-teal">{cat.idNum}</span>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white uppercase">{cat.title}</h2>
            </div>

            {/* Question Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cat.questions.map((item, qIdx) => {
                const isExpanded = expandedQ[`${cIdx}-${qIdx}`];
                return (
                  <motion.div
                    key={qIdx}
                    layout
                    onClick={() => toggleExpand(cIdx, qIdx)}
                    className="bg-[#262626] rounded-xl p-8 relative overflow-hidden flex flex-col justify-between min-h-[280px] border border-white/5 shadow-xl group cursor-pointer hover:border-brand-teal/30 transition-all duration-500"
                  >
                    {/* SVZ Signature Internal Corner Crossmarks (+) */}
                    <span className="absolute top-2 left-3 text-brand-teal text-[10px] select-none opacity-80">+</span>
                    <span className="absolute top-2 right-3 text-brand-teal text-[10px] select-none opacity-80">+</span>
                    <span className="absolute bottom-2 left-3 text-brand-teal text-[10px] select-none opacity-80">+</span>
                    <span className="absolute bottom-2 right-3 text-brand-teal text-[10px] select-none opacity-80">+</span>

                    {/* Top Content Area */}
                    <div>
                      {/* Eyebrow Category */}
                      <div className="text-brand-teal text-[9px] font-black tracking-[0.2em] uppercase mb-4">
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
                          <p className={`text-[11px] text-white/50 tracking-wider font-bold leading-relaxed uppercase ${!isExpanded ? 'line-clamp-3' : ''}`}>
                            {item.a}
                          </p>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Card Footer Link */}
                    <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-black tracking-[0.2em] text-white uppercase group-hover:text-brand-teal transition-colors">
                      {isExpanded ? (
                        <span>COLLAPSE</span>
                      ) : (
                        <Link to="/faqs/default" onClick={(e) => e.stopPropagation()} className="hover:text-brand-teal">
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
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-[95vw] md:max-w-max">
        <div className="bg-[#141414]/95 backdrop-blur-md border border-white/10 rounded-full p-1.5 flex items-center gap-1 overflow-x-auto no-scrollbar shadow-2xl mx-auto max-w-full">
          {FAQ_CATEGORIES.map((cat) => {
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => scrollToSection(cat.id)}
                className={`px-4 md:px-5 py-2.5 rounded-full text-[9px] md:text-[10px] font-bold tracking-[0.15em] uppercase whitespace-nowrap transition-all duration-300 shrink-0 ${
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
    </div>
  );
}
