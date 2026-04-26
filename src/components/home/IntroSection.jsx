import React from 'react';
import { motion } from 'framer-motion';
import SectionLabel from '@/components/shared/SectionLabel';

export default function IntroSection() {
  return (
    <section className="bg-[#FAFAFA] py-32 md:py-48">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <SectionLabel number="01" label="Our Ethos" />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-1" />
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-11 font-serif text-3xl md:text-5xl lg:text-[3.5rem] leading-[1.1] tracking-tight font-light"
          >
            <span className="text-[#0A0A0A]">At Savincliff Pharmacy & Chronic Care Centre,</span>{' '}
            <span className="text-[#0A0A0A]/35">we are committed to delivering safe, reliable, and accessible healthcare solutions</span>{' '}
            <span className="text-[#0A0A0A]">— a modern pharmacy experience built on trust and professionalism.</span>
          </motion.p>
        </div>
      </div>
    </section>
  );
}