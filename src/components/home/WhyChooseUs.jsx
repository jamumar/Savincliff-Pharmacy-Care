import React from 'react';
import { motion } from 'framer-motion';
import SectionLabel from '@/components/shared/SectionLabel';

const reasons = [
  { num: '01', title: 'Licensed Pharmacists',         text: 'Every prescription is handled by PCN-registered professionals.' },
  { num: '02', title: 'Genuine Medications Only',      text: 'Sourced from verified manufacturers with strict supply-chain integrity.' },
  { num: '03', title: 'Personalized Patient Care',     text: 'Tailored counseling, follow-up, and medication adherence guidance.' },
  { num: '04', title: 'Convenient Gwarinpa Location',  text: 'Centrally located at Divib Plaza, 7th Avenue Junction for easy access.' },
  { num: '05', title: 'Fast Prescription Processing',  text: 'Rapid digital upload and verification — so you wait less.' },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-[#FAFAFA] py-32 md:py-40">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <SectionLabel number="03" label="Why Savincliff" />
        <h2 className="font-serif display-md mt-6 mb-20 font-light max-w-3xl">
          A standard of care that is{' '}
          <em className="not-italic text-[#1B6E8C]">uncompromisingly human</em>.
        </h2>

        <div className="border-t border-[#0A0A0A]/10">
          {reasons.map((r, i) => (
            <motion.div
              key={r.num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.07, duration: 0.7 }}
              className="group grid grid-cols-12 gap-4 py-7 md:py-9 border-b border-[#0A0A0A]/10 hover:bg-[#0A0A0A] hover:text-white transition-colors duration-700 cursor-default px-3 -mx-3"
            >
              <span className="col-span-2 md:col-span-1 font-serif text-sm text-[#0A0A0A]/35 group-hover:text-[#1B6E8C] transition-colors self-center">{r.num}</span>
              <h3 className="col-span-10 md:col-span-5 font-serif text-xl md:text-3xl lg:text-4xl font-light tracking-tight self-center">{r.title}</h3>
              <p className="col-span-12 md:col-span-6 text-sm md:text-base text-[#0A0A0A]/55 group-hover:text-white/65 leading-relaxed self-center">{r.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}