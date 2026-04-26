import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function HomeCTA() {
  return (
    <section className="bg-[#0A0A0A] text-white py-32 md:py-48 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[10px] tracking-[0.45em] uppercase text-white/35"
        >
          — Next Step —
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif font-light mt-8"
          style={{ fontSize: 'clamp(2.5rem, 9vw, 7.5rem)', lineHeight: '0.95', letterSpacing: '-0.04em' }}
        >
          Need medication<br />
          <em className="not-italic text-[#1B6E8C]">or advice?</em>
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-3 mt-14"
        >
          <Link
            to="/wholesale"
            className="group inline-flex items-center gap-3 bg-white text-[#0A0A0A] px-8 py-5 text-[11px] tracking-[0.2em] uppercase hover:bg-[#1B6E8C] hover:text-white transition-colors duration-500"
          >
            Upload Prescription
            <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-500" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 border border-white/25 px-8 py-5 text-[11px] tracking-[0.2em] uppercase hover:border-white/60 hover:bg-white/5 transition-all"
          >
            Visit Us Today
          </Link>
        </motion.div>
      </div>
    </section>
  );
}