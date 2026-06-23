import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Award, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  ArrowUpRight, 
  Lock, 
  UserCheck, 
  FileSpreadsheet, 
  Layers, 
  Activity, 
  Workflow, 
  HeartPulse 
} from 'lucide-react';
import useCmsPage from '@/hooks/useCmsPage';
import { DEFAULT_PROTOCOLS_SECTIONS } from '@/lib/cmsDefaults';

function StackingTimeline({ steps = [], title }) {
  const containerRef = useRef(null);
  
  // Track scroll position of the entire timeline block
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div 
      ref={containerRef} 
      className="relative bg-black text-white px-6 md:px-12 border-t border-white/10"
      style={{ height: `${(steps.length * 80) + 120}vh` }}
    >
      {/* Fixed Sticky Layout */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between py-16 overflow-hidden">
        
        {/* Left Side Timeline Text */}
        <div className="absolute left-[2vw] top-1/2 -translate-y-1/2 hidden xl:block select-none pointer-events-none z-10">
          <span className="text-white/[0.08] font-serif text-[clamp(1.5rem,2vw,3rem)] tracking-[0.4em] uppercase block transform -rotate-90 origin-center whitespace-nowrap">
            [ TIMELINE ]
          </span>
        </div>
        
        {/* Right Side Timeline Text */}
        <div className="absolute right-[2vw] top-1/2 -translate-y-1/2 hidden xl:block select-none pointer-events-none z-10">
          <span className="text-white/[0.08] font-serif text-[clamp(1.5rem,2vw,3rem)] tracking-[0.4em] uppercase block transform rotate-90 origin-center whitespace-nowrap">
            [ TIMELINE ]
          </span>
        </div>

        {/* Timeline Title Header */}
        <div className="text-center pt-8 z-10 relative">
          <p className="text-3xs font-black tracking-[0.4em] text-brand-teal uppercase mb-2">OPERATIONAL SEQUENCING</p>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">{title || 'From Script to Dispensing'}</h2>
        </div>

        {/* Centered Stacking Cards Container */}
        <div className="relative flex-1 max-w-2xl mx-auto w-full flex items-center justify-center mt-12 z-20">
          {steps.map((step, idx) => {
            return (
              <TimelineCard 
                key={idx} 
                step={step} 
                idx={idx} 
                total={steps.length} 
                scrollYProgress={scrollYProgress} 
              />
            );
          })}
        </div>

        {/* Timeline Bottom Footer Indicator */}
        <div className="text-center pb-8 z-10">
          <p className="text-4xs font-black tracking-widest text-white/30 uppercase">
            SCROLL TO STEP THROUGH WORKFLOW (01 / 0{steps.length})
          </p>
        </div>
      </div>
    </div>
  );
}

function TimelineCard({ step, idx, total, scrollYProgress }) {
  const start = idx / total;
  const end = (idx + 1) / total;
  
  // Transform card scale and opacity as it gets stacked on top of
  const scale = useTransform(
    scrollYProgress,
    [start, end, end + 0.1],
    [1, 1, 0.92]
  );
  
  const opacity = useTransform(
    scrollYProgress,
    [start, end, end + 0.1],
    [1, 1, 0.6]
  );

  // Cards slide in from bottom
  const y = useTransform(
    scrollYProgress,
    [start - 0.12, start],
    [600, 0]
  );

  // Apply alternate rotations for stacking look
  const rot = (idx % 2 === 0 ? 1 : -1) * (idx * 0.5);

  const bgClass = step.bgColor || 'bg-gradient-to-br from-[#400e0e] to-[#1a0505]';
  const isLight = bgClass.includes('white') || bgClass.includes('bg-white');

  const numberColor = isLight ? 'text-black/80' : 'text-white/85';
  const titleColor = isLight ? 'text-black' : 'text-white';
  const descColor = isLight ? 'text-black/60' : 'text-white/60';
  const borderColor = isLight ? 'border-black/10' : 'border-white/10';

  return (
    <motion.div
      style={{ 
        y, 
        scale, 
        opacity, 
        zIndex: idx + 5,
        rotate: rot
      }}
      className={`absolute w-full ${bgClass} border ${borderColor} rounded-[2rem] p-10 md:p-12 h-[350px] md:h-[420px] flex flex-col justify-between shadow-2xl`}
    >
      {/* Top section: Number */}
      <div className="flex justify-between items-start">
        <span className={`font-serif text-5xl md:text-6xl font-light ${numberColor}`}>
          {step.number || `0${idx + 1}`}
        </span>
        <span className="text-3xs font-black tracking-widest text-brand-teal uppercase">
          [ PIPELINE NODE ]
        </span>
      </div>

      {/* Middle section: Step Title */}
      <div className="my-4">
        <h3 className={`font-serif text-2xl md:text-4xl font-normal leading-tight ${titleColor} tracking-wide uppercase`}>
          {step.title}
        </h3>
      </div>

      {/* Bottom section: Description */}
      <div className={`border-t ${borderColor} pt-4`}>
        <p className={`text-xs md:text-sm font-medium ${descColor} leading-relaxed`}>
          {step.desc || "Savincliff verified dispensing pipeline step."}
        </p>
      </div>
    </motion.div>
  );
}

export default function Protocols() {
  const { sections, loading } = useCmsPage('protocols', DEFAULT_PROTOCOLS_SECTIONS);

  const getCustomStyles = (data) => {
    const styles = {};
    if (data?.customTextColor) styles.color = data.customTextColor;
    if (data?.customFontFamily) styles.fontFamily = data.customFontFamily;
    if (data?.customFontWeight) styles.fontWeight = data.customFontWeight;
    if (data?.customFontSize) styles.fontSize = data.customFontSize;
    return styles;
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="w-8 h-8 border-4 border-black/10 border-t-brand-teal rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {sections.map((sec) => {
        const customStyles = getCustomStyles(sec.data);

        return (
          <div key={sec.id} style={customStyles}>
            {(() => {
              switch (sec.type) {
                case 'protocols_hero':
                  return (
                    <section className="px-6 md:px-12 pt-40 pb-20 lg:pt-52 lg:pb-32 bg-white text-black text-left">
                      <div className="max-w-[1800px] mx-auto border-b border-black/15 pb-16">
                        <span className="text-3xs font-black tracking-[0.4em] text-brand-teal uppercase mb-6 block">[ SAVINCLIFF PROTOCOLS ]</span>
                        <h1 className="text-display-lg font-black uppercase tracking-tighter leading-[0.9] max-w-5xl mb-8" dangerouslySetInnerHTML={{ __html: (sec.data.title || '').replace(/\n/g, '<br />') }} />
                        <p className="text-sm md:text-base font-semibold text-black/60 max-w-2xl leading-relaxed mb-12">
                          {sec.data.subtitle}
                        </p>
                        <div className="flex flex-wrap gap-4">
                          <Link to={sec.data.btn1Link || '/rx-terminal'} className="flex items-center gap-2 bg-black text-white px-8 py-4 text-xs font-black uppercase tracking-widest hover:bg-brand-teal hover:text-white transition-all duration-500">
                            {sec.data.btn1Text || 'Upload Script'} <ArrowUpRight className="w-4 h-4" />
                          </Link>
                          <Link to={sec.data.btn2Link || '/services'} className="flex items-center gap-2 border border-black/20 text-black px-8 py-4 text-xs font-black uppercase tracking-widest hover:border-black hover:bg-black/5 transition-all duration-500">
                            {sec.data.btn2Text || 'Explore Services'}
                          </Link>
                        </div>
                      </div>
                    </section>
                  );

                case 'protocols_intro':
                  return (
                    <section className="px-6 md:px-12 py-20 lg:py-32 bg-white text-black text-left">
                      <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
                        <div className="lg:col-span-4">
                          <h2 className="text-xs font-black tracking-[0.4em] text-brand-teal uppercase mb-4">[ THE STANDARD ]</h2>
                          <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none" dangerouslySetInnerHTML={{ __html: (sec.data.title || '').replace(/\n/g, '<br />') }} />
                        </div>
                        <div className="lg:col-span-8">
                          <p className="text-lg md:text-xl font-medium leading-relaxed text-black/85 max-w-4xl">
                            {sec.data.desc}
                          </p>
                        </div>
                      </div>
                    </section>
                  );

                case 'protocols_pillars':
                  const pillars = sec.data.pillars || [];
                  const commitments = sec.data.commitments || [];
                  
                  return (
                    <section className="px-6 md:px-12 py-24 lg:py-40 bg-zinc-50 border-t border-b border-black/5 text-left">
                      <div className="max-w-[1800px] mx-auto">
                        <div className="mb-16">
                          <p className="text-2xs font-black tracking-[0.4em] text-brand-teal uppercase mb-4">[ OPERATIONAL INTEGRITY ]</p>
                          <h2 className="text-4xl font-black uppercase tracking-tighter leading-none mb-6">{sec.data.title || 'Core Protocol Pillars'}</h2>
                          <p className="text-xs md:text-sm font-semibold tracking-normal text-black/60 leading-relaxed max-w-xl">{sec.data.subtitle}</p>
                        </div>

                        {pillars.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {pillars.map((c, i) => {
                              const icons = [ShieldCheck, Award, FileText, CheckCircle, AlertCircle];
                              const Icon = icons[i % icons.length];
                              return (
                                <motion.div
                                  key={i}
                                  initial={{ opacity: 0, y: 30 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.6, delay: i * 0.1 }}
                                  className="bg-white border border-black/5 p-8 lg:p-10 rounded-2xl shadow-sm hover:shadow-md hover:border-brand-teal/20 transition-all duration-500 flex flex-col justify-between min-h-[300px]"
                                >
                                  <div>
                                    <div className="flex justify-between items-center mb-8">
                                      <span className="text-3xs font-black text-brand-teal tracking-widest">[ PILLAR 0{i + 1} ]</span>
                                      <Icon className="w-5 h-5 text-brand-teal" strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-xl font-black uppercase tracking-tight mb-4">{c.title}</h3>
                                    <p className="text-xs md:text-sm font-medium text-black/60 leading-relaxed">{c.body}</p>
                                  </div>
                                </motion.div>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-black/10">
                            {commitments.map((c, i) => (
                              <div key={i} className="p-8 border-b border-r border-black/10 hover:bg-black hover:text-white transition-all duration-700 flex items-center justify-between group">
                                <span className="text-xs font-black uppercase tracking-widest group-hover:text-brand-teal transition-colors">0{i + 1} - {c}</span>
                                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </section>
                  );

                case 'protocols_visual_systems':
                  const blocks = sec.data.blocks || [];
                  return (
                    <section className="px-6 md:px-12 py-24 lg:py-40 bg-white text-black text-left">
                      <div className="max-w-[1800px] mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-16 lg:mb-24 items-end">
                          <div className="lg:col-span-5">
                            <span className="text-2xs font-black tracking-[0.4em] text-brand-teal uppercase mb-4 block">[ CLINICAL WORKFLOW ]</span>
                            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none">{sec.data.title}</h2>
                          </div>
                          <div className="lg:col-span-7">
                            <p className="text-sm md:text-base font-semibold text-black/60 leading-relaxed max-w-2xl">
                              {sec.data.desc}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                          {blocks.map((block, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0.95 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.5, delay: i * 0.08 }}
                              className="group border border-black/5 bg-zinc-50 p-6 md:p-8 rounded-xl flex flex-col justify-between min-h-[180px] hover:border-brand-teal hover:bg-white hover:shadow-lg hover:shadow-brand-teal/[0.02] transition-all duration-500"
                            >
                              <div className="flex justify-between items-center">
                                <span className="text-3xs font-black text-black/30 group-hover:text-brand-teal transition-colors">0{i + 1}</span>
                                <div className="w-1.5 h-1.5 rounded-full bg-brand-teal opacity-40 group-hover:opacity-100 group-hover:scale-125 transition-all animate-pulse" />
                              </div>
                              <div>
                                <p className="text-xs md:text-sm font-black uppercase tracking-wider text-black group-hover:text-brand-teal transition-colors leading-tight">
                                  {block.name}
                                </p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </section>
                  );

                case 'protocols_compliance':
                  const compItems = sec.data.items || [];
                  return (
                    <section className="px-6 md:px-12 py-24 lg:py-40 bg-zinc-50 border-t border-b border-black/5 text-left">
                      <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                        <div className="lg:col-span-5">
                          <span className="text-2xs font-black tracking-[0.4em] text-brand-teal uppercase mb-4 block">[ REGULATORY STANDARD ]</span>
                          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-6">{sec.data.title}</h2>
                          <p className="text-xs md:text-sm font-semibold text-black/60 leading-relaxed max-w-md">
                            {sec.data.desc}
                          </p>
                        </div>
                        <div className="lg:col-span-7">
                          <div className="border border-black/5 bg-white rounded-2xl overflow-hidden divide-y divide-black/5">
                            {compItems.map((item, i) => (
                              <div key={i} className="px-8 py-6 flex items-center justify-between hover:bg-zinc-50 transition-colors group">
                                <span className="text-xs font-black uppercase tracking-wider text-black/50 group-hover:text-brand-teal transition-colors mr-6">
                                  [ SEC-0{i + 1} ]
                                </span>
                                <span className="text-sm font-semibold text-black flex-1">
                                  {item}
                                </span>
                                <CheckCircle className="w-4 h-4 text-brand-teal/40 group-hover:text-brand-teal transition-colors" strokeWidth={2} />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </section>
                  );

                case 'protocols_portal_security':
                  const secItems = sec.data.items || [];
                  return (
                    <section className="px-6 md:px-12 py-24 lg:py-40 bg-white text-black text-left">
                      <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
                        <div className="lg:col-span-6 space-y-6">
                          <span className="text-2xs font-black tracking-[0.4em] text-brand-teal uppercase">[ PORTAL INTEGRITY ]</span>
                          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none">{sec.data.title}</h2>
                          <p className="text-sm md:text-base font-semibold text-black/60 leading-relaxed max-w-xl">
                            {sec.data.desc}
                          </p>
                          <div className="pt-4">
                            <div className="inline-flex items-center gap-3 bg-zinc-50 border border-black/5 rounded-full px-5 py-2.5 text-2xs font-black uppercase tracking-widest text-black/70">
                              <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                              Secure Paystack Node Integrated
                            </div>
                          </div>
                        </div>
                        
                        <div className="lg:col-span-6">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {secItems.map((item, i) => (
                              <motion.div
                                key={i}
                                whileHover={{ y: -5 }}
                                className="p-6 border border-black/5 bg-zinc-50 rounded-2xl flex flex-col justify-between min-h-[140px] hover:border-brand-teal hover:bg-white hover:shadow-md transition-all duration-300"
                              >
                                <div className="flex justify-between items-center mb-4">
                                  <span className="text-3xs font-black tracking-widest text-black/30">[ NODE 0{i + 1} ]</span>
                                  <ShieldCheck className="w-4 h-4 text-brand-teal" />
                                </div>
                                <p className="text-xs md:text-sm font-black uppercase tracking-wider text-black">
                                  {item}
                                </p>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </section>
                  );

                case 'protocols_timeline':
                  return (
                    <StackingTimeline 
                      steps={sec.data.steps} 
                      title={sec.data.title} 
                    />
                  );

                case 'protocols_cta':
                  return (
                    <section className="px-6 md:px-12 py-32 lg:py-48 bg-black text-white text-center relative overflow-hidden">
                      <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none flex items-center justify-center">
                        <span className="text-[20vw] font-black uppercase tracking-tighter">SAVINCLIFF</span>
                      </div>
                      <div className="max-w-4xl mx-auto relative z-10 space-y-8">
                        <p className="text-3xs font-black tracking-[0.5em] text-brand-teal uppercase">[ VERIFIED HEALTHCARE ]</p>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-none">
                          {sec.data.title}
                        </h2>
                        <p className="text-sm md:text-base font-semibold text-white/50 max-w-xl mx-auto leading-relaxed">
                          {sec.data.subtitle}
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 pt-8">
                          <Link to={sec.data.btn1Link || '/rx-terminal'} className="flex items-center gap-2 bg-brand-teal text-white px-8 py-4 text-xs font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-500">
                            {sec.data.btn1Text || 'Upload Script'} <ArrowUpRight className="w-4 h-4" />
                          </Link>
                          <Link to={sec.data.btn2Link || '/rx-terminal'} className="flex items-center gap-2 border border-white/20 text-white px-8 py-4 text-xs font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-500">
                            {sec.data.btn2Text || 'Access Patient Portal'}
                          </Link>
                        </div>
                      </div>
                    </section>
                  );

                // Backward compatibility section cases
                case 'protocols_certifications':
                  return (
                    <section className="bg-black text-white py-40 px-6 md:px-12">
                      <div className="max-w-[1800px] mx-auto">
                        <p className="text-2xs font-black tracking-[0.4em] uppercase text-brand-teal mb-12">{sec.data.label}</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 border border-white/10">
                          {(sec.data.badges || []).map((b, i) => (
                            <motion.div
                              key={b.id || i}
                              initial={{ opacity: 0 }}
                              whileInView={{ opacity: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: i * 0.1, duration: 0.8 }}
                              className="p-12 border-b md:border-r border-white/10 hover:bg-white/5 transition-all duration-700 min-h-[350px] flex flex-col justify-between"
                            >
                              <div>
                                <p className="text-2xs font-black uppercase tracking-[0.4em] text-brand-teal mb-8">{b.id} - NODE</p>
                                <h3 className="text-2xl font-black uppercase tracking-tighter mb-6">{b.title}</h3>
                                <p className="text-xs md:text-sm font-medium tracking-normal text-white/50 leading-relaxed">{b.body}</p>
                              </div>
                              <CheckCircle className="w-6 h-6 text-white/10" strokeWidth={1} />
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </section>
                  );

                case 'protocols_footer_strip':
                  return (
                    <section className="bg-black text-white py-32 px-6 md:px-12 text-center pointer-events-none select-none overflow-hidden">
                      <div className="max-w-[1800px] mx-auto opacity-10 flex flex-wrap justify-center gap-12 md:gap-24">
                        {(sec.data.nodes || []).map((node, i) => (
                          <span key={i} className="display-svz text-white">{node}</span>
                        ))}
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
