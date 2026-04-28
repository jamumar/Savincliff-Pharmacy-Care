import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ShieldCheck, Activity, Zap } from 'lucide-react';

const easeQuint = [0.16, 1, 0.3, 1];

export default function About() {
  return (
    <div className="bg-white min-h-screen">
      
      {/* Narrative Hero */}
      <section className="bg-black text-white section-padding flex flex-col justify-center relative overflow-hidden">
        <div className="grid-container relative z-10 w-full pt-8 md:pt-20">
            <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: easeQuint }}
            >
                <p className="label-svz mb-6 md:mb-12">Clinical Origins / Registry 2026</p>
                <h1 className="text-[12vw] md:text-[8vw] font-black uppercase tracking-tighter leading-none">
                    BEYOND<br />
                    DISPENSE
                </h1>
            </motion.div>
            
            <div className="mt-10 md:mt-24 max-w-4xl">
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 1 }}
                    className="text-base md:text-3xl text-white/50 leading-tight tracking-tight uppercase font-medium"
                >
                    Savincliff is an architectural project in pharmaceutical certainty. We dismantle traditional healthcare models to rebuild them on the foundations of medical precision and zero-trust verification.
                </motion.p>
            </div>
        </div>
        <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-svz-red/5 blur-[200px] -mr-[10vw] -mt-[10vw] rounded-full" />
      </section>

      {/* Story Section */}
      <section className="section-padding bg-white">
        <div className="grid-container grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-32 items-center">
            <div className="space-y-8 md:space-y-16">
                <h2 className="text-[10vw] md:text-[5vw] font-black uppercase tracking-tighter leading-none">THE<br />MANIFEST</h2>
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
                <img 
                    src="/images/pharmacist.png" 
                    alt="Clinical Lead" 
                    className="w-full h-full object-cover grayscale opacity-80 hover:opacity-100 transition-all duration-1000"
                />
            </div>
        </div>
      </section>

      {/* Philosophy Grid */}
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
          <div className="animate-marquee whitespace-nowrap">
             {Array(8).fill("").map((_, i) => (
                <span key={i} className="text-[15vw] md:text-[10vw] font-black uppercase tracking-[-0.05em] text-black/5 mx-8 md:mx-24">
                   PCN LICENSED NODE / NAFDAC PRIMARY SOURCE / VERIFIED CLINICAL CERTAINTY / 
                </span>
             ))}
          </div>
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