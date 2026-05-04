import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Info, FileText, ArrowRight } from 'lucide-react';

const PROTOCOLS = [
    {
        id: '01',
        title: 'NON-RETURNABLE PROTOCOL',
        icon: <ShieldCheck className="w-8 h-8 text-brand-teal" />,
        body: 'Medications cannot be returned once they have exited the custodial chain. Storage conditions (thermal, humidity) can no longer be verified, making redistribution a clinical risk.'
    },
    {
        id: '02',
        title: 'DISPENSING ERROR AUDIT',
        icon: <Info className="w-8 h-8 text-brand-teal" />,
        body: 'In cases of verified dispensing errors or damaged seals, a full credit node or replacement will be initiated. Notifications must be committed within 24 hours of delivery.'
    },
    {
        id: '03',
        title: 'CANCELLATION NODES',
        icon: <FileText className="w-8 h-8 text-brand-teal" />,
        body: 'Prescription orders cannot be cancelled once the verification sequence has been finalized by a licensed pharmacist. Professional dispense time is non-recoverable.'
    }
];

export default function RefundPolicy() {
  return (
    <div className="bg-white min-h-screen pt-40">
      
      {/* High-Impact Heading */}
      <section className="px-6 md:px-12 mb-20 lg:mb-40">
         <div className="max-w-[1800px] mx-auto border-b border-black pb-12">
            <h1 className="display-svz uppercase">CARE<br />PROTOCOLS</h1>
            <p className="text-[11px] font-black tracking-[0.4em] text-black/40 mt-4 uppercase underline underline-offset-8">Custodial Chain and Refund Specification</p>
         </div>
      </section>

      {/* Protocol Nodes */}
      <section className="px-6 md:px-12 pb-40">
        <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
            <div className="lg:col-span-8 space-y-24">
                {PROTOCOLS.map((p) => (
                    <div key={p.id} className="space-y-8 group">
                        <div className="flex items-center gap-6">
                            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-brand-teal">Protocol {p.id}</span>
                            <div className="h-px bg-black/10 flex-1" />
                        </div>
                        <h2 className="text-4xl font-black uppercase tracking-tighter leading-none group-hover:text-brand-teal transition-colors duration-500">{p.title}</h2>
                        <p className="text-xl md:text-2xl text-black/60 font-medium leading-tight tracking-tight uppercase max-w-4xl">
                           {p.body}
                        </p>
                    </div>
                ))}
            </div>

            <div className="lg:col-span-4 bg-black text-white p-12 lg:p-20 space-y-12 relative overflow-hidden">
                <div className="relative z-10 space-y-8">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-teal">Pharmacist Audit</p>
                    <p className="text-[13px] font-bold uppercase leading-relaxed tracking-widest text-white/50 italic">
                        "Clinical safety is our priority. By adhering to these protocols, we guarantee that every medication reaching a patient is in its original, safe, and effective state."
                    </p>
                    <div className="flex flex-col">
                        <span className="text-[11px] font-black tracking-widest uppercase">Superintendent Pharmacist</span>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-white/30">SAVINCLIFF CLINICAL / 2026</span>
                    </div>
                </div>
                {/* Decoration */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-brand-teal/20 blur-[60px] rounded-full" />
            </div>
        </div>
      </section>

      {/* Regulatory Strip */}
      <section className="bg-black text-white py-32 px-6 md:px-12 text-center pointer-events-none select-none overflow-hidden">
          <div className="max-w-[1800px] mx-auto opacity-10 flex flex-wrap justify-center gap-12 md:gap-24">
             {['PCN COMPLIANT', 'NAFDAC VERIFIED', 'GPP STANDARDS', 'NDPA PROTECTED'].map(node => (
                 <span key={node} className="display-svz text-white">{node}</span>
             ))}
          </div>
      </section>

    </div>
  );
}
