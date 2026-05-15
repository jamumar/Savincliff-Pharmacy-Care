import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';

function LogoModel() {
  const { scene } = useGLTF('/models/opt_savincliff_pill.glb');

  return (
    <group scale={1.65} position={[-0.2, 0.08, 0]} rotation={[0, 0, 0]}>
      <primitive object={scene} />
    </group>
  );
}

export default function Logo({ className = "", variant = "dark", scrolled = false }) {
  return (
    <div className={`flex items-center relative transition-all duration-500 ${!scrolled ? 'h-[60px] md:h-[80px]' : 'h-[40px] md:h-[45px]'} ${className}`}>
      <AnimatePresence mode="wait">
        {!scrolled ? (
          <motion.img
            key="image-logo"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            src="/logo.png"
            alt="Savincliff"
            className="h-full w-auto object-contain select-none"
          />
        ) : (
          <motion.div
            key="model-logo"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-0 w-[65px] h-[65px] md:w-[75px] md:h-[75px] flex items-center justify-center cursor-pointer"
          >
            <Canvas
              camera={{ position: [0, 0, 4.5], fov: 45 }}
              gl={{ antialias: true, alpha: true }}
              dpr={[1, 2]}
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
        )}
      </AnimatePresence>
    </div>
  );
}

useGLTF.preload('/models/opt_savincliff_pill.glb');