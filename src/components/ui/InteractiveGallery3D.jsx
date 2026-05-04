import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const MOCK_IMAGES = [
  '/images/product1.png',
  '/images/product2.png',
  '/images/product3.png',
  '/images/hq.png',
  '/images/pharmacist.png',
  '/images/lab.png',
  'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1563213126-a4273aed2016?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=800&auto=format&fit=crop',
];

// Shuffle and duplicate to populate a rich 3D grid
const GALLERY = [...MOCK_IMAGES, ...MOCK_IMAGES, ...MOCK_IMAGES].sort(() => Math.random() - 0.5);

export default function InteractiveGallery3D() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 100, mass: 1.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Map normalized mouse position (-0.5 to 0.5) to degrees/pixels
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-15, 15]);
  const translateX = useTransform(smoothX, [-0.5, 0.5], [-80, 80]);
  const translateY = useTransform(smoothY, [-0.5, 0.5], [-80, 80]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      // Normalize position to a range of -0.5 to +0.5
      const x = (e.clientX / innerWidth) - 0.5;
      const y = (e.clientY / innerHeight) - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="relative w-full h-[100svh] bg-[#0A0A0A] overflow-hidden flex items-center justify-center border-t border-white/5" style={{ perspective: '1200px' }}>
      
      {/* HUD Info */}
      <div className="absolute top-10 left-6 md:left-12 z-50">
         <p className="text-[10px] md:text-[11px] font-black tracking-[0.4em] uppercase text-white/50 mb-2">Architectural Directory</p>
         <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tighter">Clinical<br/>Index</h2>
      </div>

      {/* 3D Rotating & Translating Container */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          x: translateX,
          y: translateY,
          transformStyle: "preserve-3d"
        }}
        className="w-[180vw] h-[180vh] flex flex-wrap gap-4 md:gap-8 justify-center items-center content-center opacity-80"
      >
        {GALLERY.map((img, i) => {
          // Deterministic pseudo-random depth based on index to prevent layout jumps on re-renders
          const depth = ((i * 137) % 300) - 150;
          return (
            <motion.div
              key={i}
              className="w-[40vw] md:w-[22vw] lg:w-[16vw] aspect-[3/4] relative bg-white/5 shadow-2xl"
              style={{
                translateZ: depth // Fixed deep Z-axis scatter for pure 3D parallax
              }}
            >
              <img 
                src={img} 
                alt={`Gallery Index ${i}`} 
                className="absolute inset-0 w-full h-full object-cover opacity-60 hover:opacity-100 transition-all duration-1000 ease-out" 
              />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Vignette Shadow Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,#0A0A0A_85%)]" />
    </section>
  );
}
