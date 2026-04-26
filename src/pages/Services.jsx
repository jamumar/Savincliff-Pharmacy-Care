import React from 'react';
import { motion } from 'framer-motion';
import PageHero from '@/components/shared/PageHero';
import SectionLabel from '@/components/shared/SectionLabel';
import ServiceAccordion from '@/components/services/ServiceAccordion';

const chronicConditions = ['Hypertension management', 'Diabetes care plans', 'Asthma & respiratory support', 'Long-term condition coaching'];

export default function Services() {
  return (
    <>
      <PageHero
        number="04"
        label="Services"
        title="Clinical services designed around you."
        subtitle="From prescription dispensing to long-term wellness — meeting you exactly where your health is."
      />

      {/* Intro visual */}
      <section className="bg-[#FAFAFA] py-24 md:py-32">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-10 items-end">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="md:col-span-6 aspect-[4/3] overflow-hidden bg-[#0A0A0A]/5"
          >
            <img
              src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=900&q=80"
              alt="Health monitoring"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="md:col-span-6 md:pl-6">
            <SectionLabel number="01" label="Service Portfolio" />
            <h2 className="font-serif display-md mt-6 font-light">
              A portfolio that{' '}
              <em className="not-italic text-[#1B6E8C]">spans a lifetime</em> of care.
            </h2>
            <p className="mt-6 text-base md:text-lg text-[#0A0A0A]/55 leading-relaxed">
              Explore the full spectrum of clinical and wellness services at Savincliff — every service delivered by registered, empathetic professionals.
            </p>
          </div>
        </div>
      </section>

      {/* Accordion */}
      <section className="bg-[#FAFAFA] pb-32 md:pb-40">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10">
          <ServiceAccordion />
        </div>
      </section>

      {/* Chronic Care */}
      <section className="bg-[#0A0A0A] text-white py-32 md:py-40">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-6 md:pr-10">
            <SectionLabel number="02" label="Chronic Care Hub" variant="light" />
            <h2 className="font-serif display-md mt-6 font-light">
              Living better,{' '}
              <em className="not-italic text-[#1B6E8C]">longer</em>, together.
            </h2>
            <p className="mt-6 text-white/55 leading-relaxed">
              Our chronic care program supports patients managing hypertension, diabetes, asthma and long-term conditions — combining medication management, monitoring, and wellness products into an integrated plan.
            </p>
            <ul className="mt-8 space-y-0 border-t border-white/10">
              {chronicConditions.map((t, i) => (
                <li key={i} className="flex items-center gap-5 py-4 border-b border-white/10">
                  <span className="text-xs text-[#1B6E8C] tracking-wider shrink-0">0{i + 1}</span>
                  <span className="text-white/80">{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="md:col-span-6 aspect-[4/3] overflow-hidden bg-white/5"
          >
            <img
              src="https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=900&q=80"
              alt="Chronic care"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>
    </>
  );
}