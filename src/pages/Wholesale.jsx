import React from 'react';
import { motion } from 'framer-motion';
import { Camera, FileUp, Truck, ShieldCheck, ArrowRight } from 'lucide-react';
import RxUploader from '@/components/wholesale/RxUploader';

const STEPS = [
    { 
        id: '01', 
        name: 'VISUAL CAPTURE', 
        desc: 'Place prescription on a clinical-white surface. Ensure all medical identifiers (Hospital, MD, Dosage) are legible.',
        icon: <Camera className="w-8 h-8 text-svz-red" strokeWidth={1} />
    },
    { 
        id: '02', 
        name: 'NODE TRANSMIT', 
        desc: 'Commit JPEG/PNG or PDF to the clinical portal. Our verification team receives an immediate audit notification.',
        icon: <FileUp className="w-8 h-8 text-svz-red" strokeWidth={1} />
    },
    { 
        id: '03', 
        name: 'CLINICAL DISPATCH', 
        desc: 'Upon validation, medication is synchronized for fast, thermal-controlled logistics to your biometric address.',
        icon: <Truck className="w-8 h-8 text-svz-red" strokeWidth={1} />
    }
];

export default function Wholesale() {
  return (
    <div className="bg-white min-h-screen pt-40">
      
      {/* High-Impact Heading */}
      <section className="px-6 md:px-12 mb-20 lg:mb-40">
         <div className="max-w-[1800px] mx-auto border-b border-black pb-12 text-center md:text-left">
            <h1 className="display-svz uppercase">VERIFICATION</h1>
            <p className="text-[11px] font-black tracking-[0.4em] text-black/40 mt-4 uppercase underline underline-offset-8">Clinical Rx Upload / Prescription Specification Protocol</p>
         </div>
      </section>

      {/* Guide Nodes */}
      <section className="px-6 md:px-12 pb-40">
        <div className="max-w-[1800px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 border border-black/10">
                {STEPS.map((s, i) => (
                    <motion.div 
                        key={s.id}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 1 }}
                        className="p-16 border-b md:border-r border-black/10 hover:bg-black hover:text-white transition-all duration-700 group flex flex-col justify-between min-h-[400px]"
                    >
                        <div>
                            <div className="mb-12">{s.icon}</div>
                            <h3 className="text-3xl font-black uppercase tracking-tighter mb-8 leading-none">{s.name}</h3>
                            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-black/40 group-hover:text-white/40 leading-relaxed max-w-xs">{s.desc}</p>
                        </div>
                        <span className="text-4xl font-black opacity-10 group-hover:opacity-30 self-end transition-opacity select-none">{s.id}</span>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* Uploader Terminal */}
      <section className="px-6 md:px-12 pb-40 bg-black text-white py-40 overflow-hidden relative">
         <div className="max-w-[1000px] mx-auto text-center relative z-10 space-y-12">
            <h2 className="sub-display-svz mb-12">COMMISSION<br />UPLOAD</h2>
            <div className="bg-white text-black p-4 lg:p-20 border border-white/10 group">
                <RxUploader />
            </div>
         </div>
         {/* Decoration */}
         <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-svz-red/5 blur-[150px] -mr-20 -mt-20 rounded-full" />
      </section>

      {/* Policy Audit */}
      <section className="py-40 px-6 md:px-12 bg-white">
         <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24">
             <div className="lg:col-span-4">
                 <h2 className="text-4xl font-black uppercase tracking-tighter mb-12">CLINICAL<br />SPEC</h2>
                 <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-svz-red">Operational Protocols</p>
             </div>
             <div className="lg:col-span-8 flex flex-col justify-center space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <p className="text-[13px] font-black uppercase tracking-tighter">PHARMACIST AUDIT</p>
                        <p className="text-[11px] font-bold uppercase leading-relaxed tracking-widest text-black/40">
                           Every document is subjected to a live clinical review by our licensed pharmacists within a 30-minute node cycle.
                        </p>
                    </div>
                    <div className="space-y-6">
                        <p className="text-[13px] font-black uppercase tracking-tighter">DATA INTEGRITY</p>
                        <p className="text-[11px] font-bold uppercase leading-relaxed tracking-widest text-black/40">
                           Your medical specification is encrypted and handled only by verified clinical staff in accordance with NDPA standards.
                        </p>
                    </div>
                </div>
                
                <div className="pt-12 border-t border-black/10 flex flex-col md:flex-row items-center justify-between gap-12">
                   <div className="flex items-center gap-4 text-black/40">
                      <ShieldCheck className="w-8 h-8 text-svz-red" />
                      <p className="text-[10px] font-black uppercase tracking-[0.2em]">Zero-Trust Verification Active</p>
                   </div>
                   <a href="https://wa.me/923251206427" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 bg-black text-white px-12 py-6 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-svz-red duration-500">
                      Initiate WhatsApp Node <ArrowRight className="w-4 h-4" />
                   </a>
                </div>
             </div>
         </div>
      </section>

    </div>
  );
}