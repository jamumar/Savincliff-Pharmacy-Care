import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const LOGOS = [
  { id: 1, src: '/logo.svg', size: 'w-[40vw] md:w-[35vw]', x: '20%', y: '10%', speed: 100, opacity: 0.08 },
  { id: 2, src: '/favicon.png', size: 'w-[25vw] md:w-[20vw]', x: '60%', y: '20%', speed: -120, opacity: 0.12 },
  { id: 3, src: '/logo_full.png', size: 'w-[35vw] md:w-[30vw]', x: '35%', y: '50%', speed: 80, opacity: 0.06 },
  { id: 4, src: '/logo_alt.svg', size: 'w-[55vw] md:w-[45vw]', x: '10%', y: '40%', speed: -90, opacity: 0.04 },
  { id: 5, src: '/faviconwhite.png', size: 'w-[18vw] md:w-[15vw]', x: '75%', y: '65%', speed: 140, opacity: 0.1 },
];

export default function InteractiveLogoHero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120, mass: 1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) - 0.5;
      const y = (e.clientY / innerHeight) - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="relative w-full min-h-[100vh] bg-black overflow-hidden flex flex-col items-center justify-center py-40">
      
      {/* ── Background Floating Logos (Parallax) ── */}
      <div className="absolute inset-0 pointer-events-none">
        {LOGOS.map((logo) => (
          <LogoItem key={logo.id} logo={logo} smoothX={smoothX} smoothY={smoothY} />
        ))}
      </div>

      {/* ── Main Content ── */}
      <div className="relative z-10 w-full max-w-[1600px] px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6 md:space-y-10"
        >
          <h2 className="text-white text-[10vw] md:text-[8.5vw] font-black uppercase tracking-[-0.04em] leading-[0.85]">
            BRIDGING THE GAP
          </h2>
          
          <div className="flex flex-col items-center gap-4">
            <span className="text-white/40 text-[12px] md:text-[16px] font-black tracking-[0.6em] uppercase">
              BETWEEN
            </span>
            <h2 className="text-white text-[10vw] md:text-[8.5vw] font-black uppercase tracking-[-0.04em] leading-[0.85]">
              TECHNOLOGY AND ARTISTRY
            </h2>
          </div>

          <div className="pt-16">
            <Link 
              to="/register" 
              className="group relative inline-flex items-center gap-6 border border-white/20 px-12 md:px-20 py-6 md:py-10 hover:bg-white hover:text-black transition-all duration-700"
            >
              <span className="text-[12px] md:text-[14px] font-black uppercase tracking-[0.4em]">Discovery Call</span>
              <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Vignette Shadow Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,black_85%)] opacity-60" />
    </section>
  );
}

function LogoItem({ logo, smoothX, smoothY }) {
  const x = useTransform(smoothX, [-0.5, 0.5], [logo.speed, -logo.speed]);
  const y = useTransform(smoothY, [-0.5, 0.5], [logo.speed * 0.8, -logo.speed * 0.8]);

  return (
    <motion.div
      style={{
        x,
        y,
        left: logo.x,
        top: logo.y,
        opacity: logo.opacity,
      }}
      animate={{
        x: [0, 30, -30, 0],
        y: [0, -40, 40, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 15 + logo.id * 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`absolute ${logo.size} pointer-events-none`}
    >
      <img 
        src={logo.src} 
        alt="Savincliff Logo Form" 
        className="w-full h-full object-contain filter grayscale brightness-200" 
      />
    </motion.div>
  );
}
