import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedText({ 
  text, 
  className = "", 
  once = true, 
  staggerDelay = 0.04,
  delay = 0,
  splitBy = "word" // "word" or "char"
}) {
  // Create an array of words or characters
  const elements = splitBy === "word" ? text.split(" ") : text.split("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const childVariants = {
    hidden: { 
      y: "120%", 
      rotate: 5,
      opacity: 0 
    },
    visible: {
      y: "0%",
      rotate: 0,
      opacity: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] 
      },
    },
  };

  return (
    <motion.div
      className={`inline-flex flex-wrap ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-10%" }}
    >
      {elements.map((el, index) => (
        <div key={index} className="overflow-hidden inline-block" style={{ paddingRight: splitBy === 'word' ? '0.25em' : '0' }}>
          <motion.span 
            className="inline-block origin-bottom-left" 
            variants={childVariants}
          >
            {el === " " && splitBy === "char" ? "\u00A0" : el}
          </motion.span>
        </div>
      ))}
    </motion.div>
  );
}
