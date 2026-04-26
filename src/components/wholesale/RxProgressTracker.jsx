import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Stethoscope, ShieldCheck, Package } from 'lucide-react';

const steps = [
  { icon: Upload,       title: 'Upload',             desc: 'Drag, drop or browse — securely submit your prescription file.' },
  { icon: Stethoscope, title: 'Pharmacist Review',   desc: 'A licensed pharmacist verifies dosage, interactions, and validity.' },
  { icon: ShieldCheck, title: 'Validation',          desc: 'We confirm availability and prepare your tailored order.' },
  { icon: Package,     title: 'Fulfillment',         desc: 'Pickup in-store at Gwarinpa or we arrange delivery to you.' },
];

export default function RxProgressTracker() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 border-t border-l border-[#0A0A0A]/10">
      {steps.map((s, i) => {
        const Icon = s.icon;
        return (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
            className="group p-8 md:p-10 border-r border-b border-[#0A0A0A]/10 hover:bg-[#0A0A0A] hover:text-white transition-colors duration-500"
          >
            <div className="flex items-center justify-between mb-14">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#0A0A0A]/35 group-hover:text-[#1B6E8C] transition-colors">
                Step 0{i + 1}
              </span>
              <div
                className="w-10 h-10 border rounded-full flex items-center justify-center transition-colors"
                style={{ borderColor: 'rgba(10,10,10,0.15)' }}
              >
                <Icon className="w-4 h-4 group-hover:text-[#1B6E8C] transition-colors" strokeWidth={1.5} />
              </div>
            </div>
            <h3 className="font-serif text-2xl md:text-3xl font-light">{s.title}</h3>
            <p className="mt-3 text-sm text-[#0A0A0A]/55 group-hover:text-white/65 leading-relaxed">{s.desc}</p>
          </motion.div>
        );
      })}
    </div>
  );
}