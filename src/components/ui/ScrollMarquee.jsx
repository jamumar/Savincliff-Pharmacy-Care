import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionValue, useVelocity, useAnimationFrame } from 'framer-motion';

export default function ScrollMarquee({ children, baseVelocity = 5 }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);
  const directionFactor = useRef(1);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    
    // Add velocity scroll factor
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    
    baseX.set(baseX.get() + moveBy);
  });

  // A simple wrap function
  function wrap(min, max, v) {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
  }

  return (
    <div className="overflow-hidden m-0 whitespace-nowrap flex flex-nowrap w-full">
      <motion.div className="flex whitespace-nowrap flex-nowrap" style={{ x }}>
        <span className="block">{children} </span>
        <span className="block">{children} </span>
        <span className="block">{children} </span>
        <span className="block">{children} </span>
      </motion.div>
    </div>
  );
}
