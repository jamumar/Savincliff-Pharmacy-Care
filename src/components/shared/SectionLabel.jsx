import React from 'react';
import { motion } from 'framer-motion';

export default function SectionLabel({ number, label, variant = "dark" }) {
  const color = variant === "light" ? "text-white/50" : "text-[#0A0A0A]/50";
  const lineColor = variant === "light" ? "bg-white/25" : "bg-[#0A0A0A]/25";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`flex items-center gap-4 text-[10px] tracking-[0.35em] uppercase ${color}`}
    >
      <span className={`w-8 h-px ${lineColor}`} />
      <span>{number}</span>
      <span>{label}</span>
    </motion.div>
  );
}