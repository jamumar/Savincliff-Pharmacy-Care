import React from 'react';
import { motion } from 'framer-motion';
import AnimatedHeading from './AnimatedHeading';
import SectionLabel from './SectionLabel';

export default function PageHero({ label, number, title, subtitle }) {
  return (
    <section className="bg-[#0A0A0A] text-white pt-40 pb-28 md:pb-36 relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <div className="max-w-5xl">
          <SectionLabel number={number} label={label} variant="light" />
          <AnimatedHeading text={title} className="display-clamp mt-8 font-light text-white" delay={0.1} />
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.8 }}
              className="mt-10 text-lg md:text-xl text-white/55 max-w-2xl leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
    </section>
  );
}