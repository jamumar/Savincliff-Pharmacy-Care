import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';

function LogoModel() {
  const { scene } = useGLTF('/models/opt_savincliff_pill.glb');

  return (
    <group scale={1.65} position={[-0.85, 0.08, 0]} rotation={[0, 0, 0]}>
      <primitive object={scene} />
    </group>
  );
}

export default function Logo({ className = "", variant = "dark", scrolled = false }) {
  return (
    <div className={`flex items-center relative transition-all duration-500 ${!scrolled ? 'h-[95px] md:h-[135px] w-auto' : 'h-[65px] md:h-[80px] w-[80px] md:w-[100px]'} ${className}`}>
      {/* ── Image Logo (Text Logo) ── */}
      <motion.img
        src="/logo.png"
        alt="Savincliff"
        className="h-full w-auto object-contain select-none"
        animate={{ 
          opacity: !scrolled ? 1 : 0,
          scale: !scrolled ? 1 : 0.95,
        }}
        transition={{ duration: 0.3 }}
        style={{
          pointerEvents: !scrolled ? 'auto' : 'none'
        }}
      />

      {/* ── 3D Model Logo ── */}
      <motion.div
        className="absolute left-0 top-0 w-[80px] h-[80px] md:w-[100px] md:h-[100px] flex items-center justify-center cursor-pointer"
        animate={{ 
          opacity: scrolled ? 1 : 0,
          scale: scrolled ? 1 : 0.8,
        }}
        transition={{ duration: 0.3 }}
        style={{
          pointerEvents: scrolled ? 'auto' : 'none'
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 4.5], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
          frameloop="demand"
        >
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} intensity={2.0} color="#ffffff" />
          <directionalLight position={[-5, -3, -5]} intensity={0.8} color="#1B6E8C" />
          <Suspense fallback={null}>
            <Environment preset="studio" />
            <LogoModel />
          </Suspense>
        </Canvas>
      </motion.div>
    </div>
  );
}

useGLTF.preload('/models/opt_savincliff_pill.glb');