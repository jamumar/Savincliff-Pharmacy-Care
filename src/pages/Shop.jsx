import React, { useState, useEffect, useRef, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/lib/CartContext';
import ProductDetailModal from '@/components/shop/ProductDetailModal';
import { Plus, Check, ArrowUpRight } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';

const easeQuint = [0.16, 1, 0.3, 1];

const MOCK_PRODUCTS = [
  { id: 1, name: 'NEUROGEN AXON', brand: 'SVZ PHARMA', price: 15400, img: '/images/product2.png', unit: '30 CAPS', category: 'Cognitive' },
  { id: 2, name: 'SPECTRUM DROPS', brand: 'CLINICAL SPEC', price: 8900, img: '/images/product1.png', unit: '10 ML', category: 'Ophthalmic' },
  { id: 3, name: 'AURUM REGEN', brand: 'AURUM LABS', price: 24500, img: '/images/product3.png', unit: '30 ML', category: 'Topical' },
  { id: 4, name: 'VERIFY COMPLEX', brand: 'SYNTHETIC NODE', price: 12000, img: '/images/product2.png', unit: '60 TABS', category: 'Audit' },
  { id: 5, name: 'DISPENSE PRIMARY', brand: 'SVZ PHARMA', price: 32000, img: '/images/product1.png', unit: '100 ML', category: 'Clinical' },
  { id: 6, name: 'PROTOCOL SYNC', brand: 'CLINICAL SPEC', price: 18500, img: '/images/product3.png', unit: '15 ML', category: 'Verfied' },
  { id: 7, name: 'VITA D3+K2', brand: 'ESSENTIALS', price: 9200, img: '/images/vitamins.png', unit: '60 CAPS', category: 'Supplement' },
  { id: 8, name: 'PHARMA NOIR', brand: 'PHARMACOPIA', price: 28000, img: '/images/capsules.png', unit: '90 CAPS', category: 'Premium' },
  { id: 9, name: 'AETERNA SERUM', brand: 'AETERNA LABS', price: 35000, img: '/images/skincare.png', unit: '50 ML', category: 'Dermal' },
];

/* ─── 3D Hero Model ─────────────────────────────────────────────────────── */
function ShopHeroModel({ mouse }) {
  const groupRef = useRef();
  const { scene } = useGLTF('/models/opt_savincliff_pill.glb');

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Smooth cursor tracking across 180 degree sweeps
    const targetY = mouse.current[0] * (Math.PI / 2);
    const targetX = mouse.current[1] * (Math.PI / 4);

    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.1;
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.1;

    // Subtle premium idle float
    groupRef.current.position.y = Math.sin(t * 0.8) * 0.08;
  });

  return (
    <group ref={groupRef} scale={1.3} position={[0, 0, 0]}>
      <primitive object={scene} />
    </group>
  );
}

/* ─── Hero Section mimicking SVZ reference layout ───────────────────────── */
function ShopHero() {
  const mouse = useRef([0, 0]);
  const [time, setTime] = useState('');

  // Track mouse
  useEffect(() => {
    const onMove = (e) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      mouse.current = [
        (e.clientX / w - 0.5) * 2,
        (e.clientY / h - 0.5) * 2,
      ];
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Live time
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative w-full bg-black overflow-hidden select-none" style={{ height: '100svh' }}>
      {/* Deep vignette background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,_rgba(20,20,20,0.6)_0%,_rgba(0,0,0,1)_100%)] z-[1]" />

      {/* 3D Canvas Container */}
      <div className="absolute inset-0 z-[2]">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
          <directionalLight position={[-5, -3, -5]} intensity={0.5} color="#22D3EE" />
          <pointLight position={[0, 2, 3]} intensity={2.0} color="#ffffff" />
          <Suspense fallback={null}>
            <Environment preset="studio" />
            <ShopHeroModel mouse={mouse} />
          </Suspense>
        </Canvas>
      </div>

      {/* Text Overlay mimicking SVZ Capabilities Hero layout */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
        {/* Big stylized Headline: PRIMARY SoURCE */}
        <div className="text-center flex items-center justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: easeQuint }}
            className="font-black uppercase tracking-[-0.04em] leading-[0.88] text-white flex items-center justify-center"
            style={{ fontSize: 'clamp(3rem, 8vw, 8.5rem)' }}
          >
            PRIMARY S<span className="font-serif italic lowercase font-light mx-1">o</span>URCE
          </motion.h1>
        </div>
      </div>

      {/* Bottom indicators */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-0 right-0 z-30 px-8 md:px-12 flex items-end justify-between pointer-events-none select-none"
      >
        {/* Left: Scroll */}
        <div className="flex items-center gap-4">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-white/50">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12h6m6 0h-6m0 0V6m0 6v6" />
          </svg>
          <div className="flex flex-col gap-0.5">
            <span className="text-[9px] font-black tracking-[0.35em] text-white/40 uppercase">SCROLL &amp; EXPLORE</span>
            <span className="text-[9px] font-black tracking-[0.3em] text-white/25 uppercase">THE SAVINCLIFF REALM</span>
          </div>
        </div>

        {/* Right: Location + time */}
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end gap-0.5">
            <span className="text-[9px] font-black tracking-[0.35em] text-white/40 uppercase">ABUJA, NIGERIA</span>
            <div className="flex gap-2 items-center">
              <span className="text-[9px] font-black tracking-[0.25em] text-white/25 uppercase">Local time:</span>
              <span className="text-[9px] font-black tracking-[0.25em] text-white/50 uppercase">{time}</span>
            </div>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-white/50">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12h6m6 0h-6m0 0V6m0 6v6" />
          </svg>
        </div>
      </motion.div>
    </section>
  );
}

export default function Shop() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { add, items } = useCart();

  const isAdded = (id) => items.some(item => item.id === id);

  return (
    <div className="bg-white min-h-screen">
      
      {/* Premium Dark Hero Section */}
      <ShopHero />

      {/* Reduced Heading moved to a new standalone section above products */}
      <section className="pt-20 md:pt-32 px-5 md:px-12 mb-8 md:mb-16 bg-white">
         <div className="max-w-[1800px] mx-auto border-b border-black/10 pb-6 md:pb-8 overflow-hidden">
            <motion.h2 
               initial={{ y: 50, opacity: 0 }}
               whileInView={{ y: 0, opacity: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, ease: easeQuint }}
               className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none text-black"
            >
               INVENTORY
            </motion.h2>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-3 mt-4 md:mt-6">
               <p className="text-[9px] md:text-[11px] font-black tracking-[0.3em] md:tracking-[0.4em] uppercase text-black/40">Clinical Manifest / Synchronized 2026</p>
               <span className="text-[9px] md:text-[11px] font-black tracking-[0.3em] md:tracking-[0.4em] uppercase text-brand-teal sm:px-4 sm:border-l border-brand-teal">Total: {MOCK_PRODUCTS.length} NODES</span>
            </div>
         </div>
      </section>

      {/* Product Grid */}
      <section className="px-5 md:px-12 pb-20 md:pb-40">
          <div className="max-w-[1800px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border border-black/10">
              {MOCK_PRODUCTS.map((p, i) => (
                  <motion.div
                      key={p.id}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05, duration: 0.8 }}
                      className="group relative border-b border-r border-black/10 cursor-pointer overflow-hidden flex flex-col justify-between h-[50vh] sm:h-[55vh] lg:h-[65vh]"
                      onClick={() => setSelectedProduct(p)}
                  >
                      {/* Image Layer */}
                      <div className="absolute inset-0 z-0 bg-[#FAFAFA] svz-image-reveal">
                          <img 
                              src={p.img} 
                              alt={p.name} 
                              className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105" 
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-700" />
                      </div>

                      {/* Content Layer */}
                      <div className="relative z-10 w-full p-6 md:p-12 flex flex-col justify-between h-full">
                          <div className="flex justify-between items-start">
                             <div className="space-y-2 md:space-y-4">
                                <p className="text-[9px] md:text-[10px] font-black tracking-[0.3em] md:tracking-[0.4em] uppercase text-black/20 group-hover:text-brand-teal transition-all duration-500">Node 0{p.id}</p>
                                <h3 className="text-lg md:text-2xl font-black uppercase tracking-tighter leading-none group-hover:translate-x-2 md:group-hover:translate-x-4 transition-all duration-700">{p.name}</h3>
                             </div>
                             <span className="text-[8px] md:text-[9px] font-black tracking-[0.3em] uppercase text-black/30 opacity-0 group-hover:opacity-100 transition-all duration-700 border-b border-black hidden sm:inline">View Spec</span>
                          </div>

                          <div className="flex justify-between items-end">
                              <div className="space-y-1">
                                 <p className="text-[8px] md:text-[10px] font-black tracking-[0.3em] md:tracking-[0.4em] uppercase text-black/40">{p.brand}</p>
                                 <p className="text-xl md:text-3xl font-black tracking-tighter transition-all duration-700 group-hover:text-brand-teal">₦{p.price.toLocaleString()}</p>
                              </div>
                              
                              <button 
                                 onClick={(e) => { e.stopPropagation(); add(p); }}
                                 className={`w-10 h-10 md:w-14 md:h-14 flex items-center justify-center transition-all duration-700 ${
                                    isAdded(p.id) ? 'bg-brand-teal text-white' : 'bg-black text-white group-hover:bg-brand-teal'
                                 }`}
                              >
                                 {isAdded(p.id) ? <Check className="w-4 h-4 md:w-5 md:h-5" /> : <Plus className="w-4 h-4 md:w-5 md:h-5" />}
                              </button>
                          </div>
                      </div>
                  </motion.div>
              ))}
          </div>
      </section>

      {/* Footer Ticker */}
      <section className="bg-black py-12 md:py-24 overflow-hidden select-none pointer-events-none">
          <div className="animate-marquee whitespace-nowrap">
             {Array(8).fill("").map((_, i) => (
                <span key={i} className="text-[15vw] md:text-[12vw] font-black uppercase tracking-[-0.05em] text-white/5 mx-6 md:mx-12">
                   INVENTORY SYNC / CLINICAL SPECIFICATIONS / SAVINCLIFF PRIMARY / 
                </span>
             ))}
          </div>
      </section>

      <ProductDetailModal 
         product={selectedProduct} 
         onClose={() => setSelectedProduct(null)} 
      />
    </div>
  );
}