import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const easeQuint = [0.16, 1, 0.3, 1];

export default function Contact() {
  return (
    <div className="bg-white min-h-screen pt-24 md:pt-40">
      
      {/* High-Impact Heading */}
      <section className="px-5 md:px-12 mb-12 md:mb-40">
         <div className="max-w-[1800px] mx-auto border-b border-black pb-8 md:pb-12 overflow-hidden">
            <motion.h1 
               initial={{ y: 100 }}
               animate={{ y: 0 }}
               transition={{ duration: 1, ease: easeQuint }}
               className="text-[12vw] md:text-[8vw] font-black uppercase tracking-tighter leading-none"
            >
               ESTABLISH<br />SYNC
            </motion.h1>
            <p className="text-[9px] md:text-[11px] font-black tracking-[0.3em] md:tracking-[0.4em] uppercase text-black/40 mt-4 md:mt-8">Primary Communications Node / FCT Abuja</p>
         </div>
      </section>

      {/* Contact Grid */}
      <section className="px-5 md:px-12 pb-20 md:pb-40">
        <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24 items-start">
            
            {/* Left: Contact Specs */}
            <div className="lg:col-span-4 space-y-12 md:space-y-24">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8 md:gap-12">
                   <div className="space-y-3 md:space-y-4">
                      <p className="text-[9px] md:text-[10px] font-black tracking-[0.3em] md:tracking-[0.4em] uppercase text-brand-teal">Node 01 / Physical</p>
                      <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter">CLINICAL HQ</h3>
                      <p className="text-base md:text-xl text-black/60 font-medium uppercase tracking-tight leading-tight">
                         Divib Plaza, 7th Avenue,<br />Gwarinpa, Abuja / FCT
                      </p>
                   </div>
                   <div className="space-y-3 md:space-y-4">
                      <p className="text-[9px] md:text-[10px] font-black tracking-[0.3em] md:tracking-[0.4em] uppercase text-brand-teal">Node 02 / Digital</p>
                      <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter">DIRECT SYNC</h3>
                      <p className="text-base md:text-xl text-black/60 font-medium uppercase tracking-tight leading-tight">
                         node@savincliff.com<br />
                         +234 (0) 923 251 2064
                      </p>
                   </div>
                   <div className="space-y-3 md:space-y-4">
                      <p className="text-[9px] md:text-[10px] font-black tracking-[0.3em] md:tracking-[0.4em] uppercase text-brand-teal">Node 03 / Support</p>
                      <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter">PATIENT DESK</h3>
                      <p className="text-base md:text-xl text-black/60 font-medium uppercase tracking-tight leading-tight">
                         Live Terminal Available<br />
                         09:00 — 18:00 WAT
                      </p>
                   </div>
                </div>

                <div className="aspect-square bg-white border border-black/10 svz-image-reveal hidden lg:block">
                    <img 
                       src="/images/hq.png" 
                       alt="HQ Internal" 
                       className="w-full h-full object-cover grayscale opacity-50 hover:opacity-100 duration-1000"
                    />
                </div>
            </div>

            {/* Right: Inquiry Terminal */}
            <div className="lg:col-span-8 bg-[#FAFAFA] p-6 md:p-24 space-y-10 md:space-y-20 border border-black/5">
                <div className="space-y-4 md:space-y-8">
                   <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter leading-none">INQUIRY<br />MANIFEST</h2>
                   <p className="text-[10px] md:text-[11px] font-black tracking-[0.2em] md:tracking-[0.3em] uppercase text-black/30 max-w-xl">
                      Submit your clinical requirements through the secured channel below. A licensed pharmacist will audit and synchronize within 60 minutes.
                   </p>
                </div>

                <form className="space-y-8 md:space-y-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                        <div className="space-y-3 md:space-y-4 relative group">
                            <label className="text-[9px] md:text-[10px] font-black tracking-[0.3em] md:tracking-[0.4em] uppercase opacity-40 group-focus-within:opacity-100 transition-opacity">Patient Handle</label>
                            <input placeholder="ENTER FULL NAME" className="w-full bg-transparent border-b border-black/10 py-4 md:py-6 text-base md:text-2xl font-black uppercase tracking-tighter focus:outline-none focus:border-brand-teal transition-all" />
                        </div>
                        <div className="space-y-3 md:space-y-4 relative group">
                            <label className="text-[9px] md:text-[10px] font-black tracking-[0.3em] md:tracking-[0.4em] uppercase opacity-40 group-focus-within:opacity-100 transition-opacity">Digital Node</label>
                            <input placeholder="EMAIL@NODE.COM" className="w-full bg-transparent border-b border-black/10 py-4 md:py-6 text-base md:text-2xl font-black uppercase tracking-tighter focus:outline-none focus:border-brand-teal transition-all" />
                        </div>
                    </div>
                    
                    <div className="space-y-3 md:space-y-4 relative group">
                        <label className="text-[9px] md:text-[10px] font-black tracking-[0.3em] md:tracking-[0.4em] uppercase opacity-40 group-focus-within:opacity-100 transition-opacity">Clinical Protocol / Message</label>
                        <textarea rows={4} placeholder="STATE YOUR REQUIREMENT" className="w-full bg-transparent border-b border-black/10 py-4 md:py-6 text-base md:text-2xl font-black uppercase tracking-tighter focus:outline-none focus:border-brand-teal transition-all resize-none" />
                    </div>

                    <button type="button" className="group flex items-center justify-between w-full bg-black text-white px-6 md:px-12 py-6 md:py-10 text-[11px] md:text-[14px] font-black uppercase tracking-[0.2em] md:tracking-[0.4em] hover:bg-brand-teal transition-all duration-700">
                        COMMIT PROTOCOL <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-4 transition-transform" />
                    </button>
                </form>
            </div>
        </div>
      </section>

      {/* Map Strip */}
      <section className="bg-black py-12 md:py-24 overflow-hidden select-none pointer-events-none">
          <div className="animate-marquee whitespace-nowrap">
             {Array(8).fill("").map((_, i) => (
                <span key={i} className="text-[15vw] md:text-[12vw] font-black uppercase tracking-[-0.05em] text-white/5 mx-8 md:mx-24">
                   ESTABLISH SYNC / ABUJA NODE / FCT / GWARINPA / 09.04.12 / 
                </span>
             ))}
          </div>
      </section>

    </div>
  );
}