import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, FileText, CheckCircle, AlertCircle } from 'lucide-react';

const badges = [
  {
    id: 'PCN',
    title: 'PCN REGISTRY',
    body: 'Savincliff is duly registered with the Pharmacists Council of Nigeria. Every professional node holds a valid, current practicing license.',
  },
  {
    id: 'NDC',
    title: 'NAFDAC NODE',
    body: 'Total compliance with the National Agency for Food and Drug Administration. We source exclusively from verified, approved distributors.',
  },
  {
    id: 'GPP',
    title: 'GPP PROTOCOL',
    body: 'Absolute adherence to WHO and PCN Good Pharmacy Practice guidelines. Precision dispensing and ethical conduct are standard specifications.',
  },
  {
    id: 'SCI',
    title: 'CHAIN ARCH',
    body: 'Our supply chain is a project of traceability. Every pharmaceutical unit is recorded with documented clinical audit trails.',
  },
  {
    id: 'ADR',
    title: 'PVG TERMINAL',
    body: 'Integrated pharmacovigilance protocols for monitoring adverse reactions. Safety is an active clinical process, not a static metric.',
  },
];

const commitments = [
    'PCN Clinical License Validation',
    'NAFDAC Product Specification Audits',
    'Thermal Logistics Monitoring',
    'Encrypted Secure Health Records',
    'Batch-Level Audit Recalls',
    'NDPA Data Privacy Compliance',
    'Mandatory Clinical Re-Training',
    'Counterfeit Detection Algorithms',
];

export default function Compliance() {
  return (
    <div className="bg-white min-h-screen pt-40">
      
      {/* High-Impact Heading */}
      <section className="px-6 md:px-12 mb-20 lg:mb-40">
         <div className="max-w-[1800px] mx-auto border-b border-black pb-12">
            <h1 className="display-svz uppercase">REGULATION</h1>
            <p className="text-[11px] font-bold tracking-[0.4em] text-black/40 mt-4 uppercase">CLINICAL COMPLIANCE NODES / AUDIT 2026</p>
         </div>
      </section>

      {/* Intro Narrative */}
      <section className="px-6 md:px-12 pb-40">
         <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
             <div className="lg:col-span-8">
                 <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-12">
                    THE LEGAL<br />FRAMEWORK
                 </h2>
                 <p className="text-xl md:text-2xl text-black font-medium leading-tight tracking-tight uppercase max-w-3xl">
                    Compliance is the structural foundation of Savincliff. We dismantle the ambiguity of healthcare regulation to build a platform of primary-source clinical certainty.
                 </p>
             </div>
             <div className="lg:col-span-4 self-end">
                 <p className="text-[11px] font-bold uppercase tracking-widest text-black/40 leading-relaxed">
                    Savincliff operates under the full pharmaceutical regulatory framework of the Federal Republic of Nigeria — anchored by PCN and NAFDAC international standards.
                 </p>
             </div>
         </div>
      </section>

      {/* Certification Grid */}
      <section className="bg-black text-white py-40 px-6 md:px-12">
         <div className="max-w-[1800px] mx-auto">
            <p className="text-[10px] font-black tracking-[0.4em] uppercase text-brand-teal mb-12">Verification Systems</p>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 border border-white/10">
                {badges.map((b, i) => (
                    <motion.div
                        key={b.id}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.8 }}
                        className="p-12 border-b md:border-r border-white/10 hover:bg-white/5 transition-all duration-700 min-h-[350px] flex flex-col justify-between"
                    >
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-teal mb-8">{b.id} / NODE</p>
                            <h3 className="text-2xl font-black uppercase tracking-tighter mb-6">{b.title}</h3>
                            <p className="text-[11px] font-bold uppercase tracking-widest text-white/40 leading-relaxed">{b.body}</p>
                        </div>
                        <CheckCircle className="w-6 h-6 text-white/10" strokeWidth={1} />
                    </motion.div>
                ))}
            </div>
         </div>
      </section>

      {/* Pillars Section */}
      <section className="py-40 px-6 md:px-12 bg-white">
         <div className="max-w-[1800px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
                <div className="lg:col-span-4">
                    <h2 className="text-4xl font-black uppercase tracking-tighter leading-none mb-12">
                       EIGHT PILLARS<br />OF INTEGRITY
                    </h2>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-black/40 leading-relaxed max-w-xs">
                       Our operational protocol is a sequence of eight non-negotiable medical requirements.
                    </p>
                </div>
                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-0 border border-black/10">
                    {commitments.map((c, i) => (
                        <div key={i} className="p-10 border-b border-r border-black/10 hover:bg-black hover:text-white transition-all duration-700 flex items-center justify-between group">
                            <span className="text-[11px] font-black uppercase tracking-widest group-hover:text-brand-teal transition-colors">0{i + 1} / {c}</span>
                            <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    ))}
                </div>
            </div>
         </div>
      </section>

      {/* Footer Strip */}
      <section className="bg-black text-white py-32 px-6 md:px-12 text-center pointer-events-none select-none overflow-hidden">
          <div className="max-w-[1800px] mx-auto opacity-10 flex flex-wrap justify-center gap-12 md:gap-24">
             {['PCN', 'NAFDAC', 'GPP', 'WHO', 'ISO', 'NDPA'].map(node => (
                 <span key={node} className="display-svz text-white">{node}</span>
             ))}
          </div>
      </section>

    </div>
  );
}