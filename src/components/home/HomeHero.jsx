import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MessageCircle, MapPin, ChevronDown } from 'lucide-react';

const LOGO_URL = "https://media.base44.com/images/public/user_69ce0b82ce527b933e7d53d5/b53ecab35_WhatsAppImage2026-04-20at045440.jpg";
const HERO_IMG = "/__generating__/img_da83ba50a230.png";

const words = ["Trusted", "Pharmacy", "&", "Wellness", "Center"];
const STATS = [
  { value: '10K+', label: 'Patients Served' },
  { value: '2,800+', label: 'Products in Stock' },
  { value: '100%', label: 'PCN Verified' },
];

export default function HomeHero() {
  const { scrollY } = useScroll();
  const imgY = useTransform(scrollY, [0, 700], [0, 120]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const [statIdx, setStatIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setStatIdx(i => (i + 1) % STATS.length), 2500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative min-h-screen bg-[#0A0A0A] text-white overflow-hidden">

      {/* Animated background orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-20 right-1/4 w-[600px] h-[600px] rounded-full bg-[#1B6E8C]/10 blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#0E4F73]/20 blur-[100px] pointer-events-none"
      />

      {/* Content */}
      <div className="relative max-w-[1600px] mx-auto px-6 md:px-10 pt-36 pb-20 min-h-screen grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
        
        {/* Left: text */}
        <div className="lg:col-span-7 pb-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="flex items-center gap-4 text-[10px] tracking-[0.35em] uppercase text-white/40 mb-8"
          >
            <span className="w-10 h-px bg-white/25" />
            <span>Est. Gwarinpa — Abuja, Nigeria</span>
          </motion.div>

          {/* Animated headline */}
          <h1 className="font-serif display-clamp font-light leading-[0.95]">
            {words.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom" style={{ marginRight: '0.22em' }}>
                <motion.span
                  className="inline-block"
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.3 + i * 0.07, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                  {word === '&' ? <em className="not-italic text-[#1B6E8C]">&</em> : word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="origin-left w-20 h-[2px] bg-[#1B6E8C] my-8"
          />

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.8 }}
            className="text-lg md:text-xl text-white/60 max-w-lg leading-relaxed"
          >
            Professional pharmaceutical care, genuine medications, and personalized health support — all in one place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="flex flex-wrap gap-3 mt-10"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/wholesale"
                className="group inline-flex items-center gap-3 bg-white text-[#0A0A0A] px-7 py-4 text-[11px] tracking-[0.2em] uppercase hover:bg-[#1B6E8C] hover:text-white transition-colors duration-500"
              >
                Upload Prescription
                <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-500" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 border border-white/25 px-7 py-4 text-[11px] tracking-[0.2em] uppercase hover:border-white/60 hover:bg-white/5 transition-all"
              >
                <MapPin className="w-3.5 h-3.5" />
                Visit Our Store
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <a
                href="https://wa.me/923251206427"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 px-4 py-4 text-[11px] tracking-[0.2em] uppercase text-white/70 hover:text-[#1B6E8C] transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Chat on WhatsApp
              </a>
            </motion.div>
          </motion.div>

          {/* Animated stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="mt-14 flex items-center gap-8 border-t border-white/8 pt-8"
          >
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7 + i * 0.1, duration: 0.6 }}
              >
                <p className="font-serif text-2xl font-light text-[#1B6E8C]">{s.value}</p>
                <p className="text-[10px] tracking-[0.25em] uppercase text-white/35 mt-1">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right: hero image */}
        <motion.div
          style={{ y: imgY }}
          className="lg:col-span-5 relative aspect-[4/5] w-full max-w-sm lg:max-w-none mx-auto lg:mx-0 lg:ml-auto"
        >
          {/* Reveal wipe */}
          <motion.div
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{ delay: 0.5, duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 bg-white origin-top z-10"
          />
          <img
            src={HERO_IMG}
            alt="Pharmacy"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/70 to-transparent" />
          {/* Badges */}
          <div className="absolute bottom-5 left-5 right-5 flex justify-between text-[9px] tracking-[0.25em] uppercase z-10">
            <span className="bg-[#0A0A0A]/80 backdrop-blur px-3 py-2 text-white/80">PCN · Licensed</span>
            <span className="bg-[#0A0A0A]/80 backdrop-blur px-3 py-2 text-white/80">Genuine · Verified</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-32 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5 text-white/20" />
        </motion.div>
      </motion.div>

      {/* Ticker */}
      <div className="border-t border-white/8 py-5 overflow-hidden">
        <div className="flex gap-12 marquee-track whitespace-nowrap text-[10px] tracking-[0.35em] uppercase text-white/30">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex gap-12 shrink-0">
              {['Chronic Care', 'Prescription Dispensing', 'Wellness & Supplements', 'Blood Pressure Monitoring', 'Family & Baby Care', 'Diabetes Support', 'Patient Counseling', 'Wholesale Program'].map((t, i) => (
                <span key={i} className="flex items-center gap-12">
                  {t}
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}