import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Upload, MessageCircle } from 'lucide-react';

export default function KineticSideRail() {
  return (
    <motion.div
      initial={{ x: 30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.8 }}
      className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-3"
    >
      <Link
        to="/wholesale"
        className="group relative h-12 w-12 bg-[#0A0A0A] text-white rounded-full flex items-center justify-center overflow-hidden shadow-xl hover:w-40 transition-all duration-500 ease-in-out"
        title="Upload Rx"
      >
        <Upload className="w-4 h-4 shrink-0 absolute left-4" />
        <span className="absolute left-10 text-[10px] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity delay-200 whitespace-nowrap">
          Upload Rx
        </span>
      </Link>

      <a
        href="https://wa.me/923251206427"
        target="_blank"
        rel="noreferrer"
        className="group relative h-12 w-12 bg-[#1B6E8C] text-white rounded-full flex items-center justify-center overflow-hidden shadow-xl hover:w-40 transition-all duration-500 ease-in-out pulse-ring"
        title="WhatsApp"
      >
        <MessageCircle className="w-4 h-4 shrink-0 absolute left-4" />
        <span className="absolute left-10 text-[10px] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity delay-200 whitespace-nowrap">
          WhatsApp
        </span>
      </a>

      <div className="w-px h-14 bg-black/15 mt-1" />
      <span
        className="text-[8px] tracking-[0.35em] uppercase text-black/30"
        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
      >
        PCN Licensed
      </span>
    </motion.div>
  );
}