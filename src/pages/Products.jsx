import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldCheck, Thermometer, Clipboard, PackageSearch, ArrowUpRight } from 'lucide-react';

const assurances = [
    { id: '01', title: 'SOURCE AUDIT', text: 'Total clinical verification of primary supply chains. We only interface with licensed manufacturers.' },
    { id: '02', title: 'THERMAL NODE', text: 'Continuous temperature monitoring. Potency is maintained through strict thermal protocols.' },
    { id: '03', title: 'BATCH TRACE', text: 'Real-time audit trails for every pharmaceutical unit. Quality is a non-negotiable metric.' },
    { id: '04', title: 'LIFESPAN MGMT', text: 'Aggressive expiry monitoring protocols. Our inventory is a live clinical dataset.' },
];

export default function Products() {
  return (
    <div className="bg-white min-h-screen pt-40">
      
      {/* High-Impact Heading */}
      <section className="px-6 md:px-12 mb-20 lg:mb-40">
         <div className="max-w-[1800px] mx-auto border-b border-black pb-12">
            <h1 className="display-svz uppercase">STANDARDS</h1>
            <p className="text-[11px] font-black tracking-[0.4em] text-black/40 mt-4 uppercase">CLINICAL QUALITY PROTOCOLS / VERIFIED 2026</p>
         </div>
      </section>

      {/* Assurance Grid */}
      <section className="px-6 md:px-12 pb-40">
        <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-black/10">
            {assurances.map((a, i) => (
                <motion.div
                    key={a.id}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.8 }}
                    className="p-16 border-b md:border-r border-black/10 hover:bg-black hover:text-white transition-all duration-700 group flex flex-col justify-between min-h-[400px]"
                >
                    <div>
                        <p className="text-[10px] font-black tracking-[0.4em] uppercase text-black/20 group-hover:text-white/20 mb-8">{a.id} / AUDIT</p>
                        <h3 className="text-3xl font-black uppercase tracking-tighter mb-6">{a.title}</h3>
                        <p className="text-[11px] font-bold text-black/40 group-hover:text-white/40 tracking-widest uppercase leading-relaxed">
                           {a.text}
                        </p>
                    </div>
                    <ArrowUpRight className="w-6 h-6 self-end opacity-0 group-hover:opacity-100 transition-opacity text-brand-teal" />
                </motion.div>
            ))}
        </div>
      </section>

      {/* Hero Visual Node */}
      <section className="bg-black text-white py-40 px-6 md:px-12 overflow-hidden relative">
         <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
            <div>
               <h2 className="sub-display-svz mb-12">CLINICAL<br />INTEGRITY</h2>
               <div className="space-y-8 max-w-xl">
                  <p className="text-xl text-white font-medium leading-tight tracking-tight uppercase">
                      Integrity is not a value; it's a specification. Every medication at Savincliff is subjected to a four-layer clinical audit before entering our inventory node.
                  </p>
                  <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-white/40 leading-relaxed">
                      We dismantle the complexity of pharmaceutical verification to ensure that your health is anchored by primary-source certainty.
                  </p>
               </div>
            </div>
            
            <div className="relative aspect-square overflow-hidden bg-white/5">
                <img 
                    src="https://images.unsplash.com/photo-1579152276532-535c21af3bb5?w=1000&q=80" 
                    alt="Clinical Integrity" 
                    className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-1000"
                />
                <div className="absolute inset-0 border-[40px] border-black/80 pointer-events-none" />
            </div>
         </div>
         {/* Decoration */}
         <div className="absolute bottom-0 right-0 w-[50vw] h-[50vw] bg-brand-teal/5 blur-[150px] rounded-full" />
      </section>

      {/* Special Sourcing CTA */}
      <section className="py-40 px-6 md:px-12 bg-white text-center">
         <div className="max-w-[1800px] mx-auto">
            <h2 className="display-svz text-black/10 hover:text-black transition-colors duration-1000 cursor-default uppercase">SPECIAL<br />PROCUREMENT</h2>
            <div className="mt-20 max-w-2xl mx-auto space-y-12">
               <p className="text-[11px] font-black uppercase tracking-[0.4em] text-black">
                  Can't identify your requirement in our primary catalogue?
               </p>
               <button className="bg-black text-white px-20 py-8 text-[12px] font-black uppercase tracking-[0.3em] hover:bg-brand-teal transition-all duration-700">
                   Request Sourcing Node
               </button>
            </div>
         </div>
      </section>

    </div>
  );
}