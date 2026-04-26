import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedHeading({ children, text, className = "", level = 1, delay = 0 }) {
  const Tag = `h${level}`;
  const content = text || children;

  // Render static content if not a string, or simplified animation to avoid layout issues
  if (typeof content !== 'string') {
    return (
      <Tag className={className}>
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: delay, duration: 0.5 }}
        >
          {content}
        </motion.div>
      </Tag>
    );
  }

  const words = content.split(' ');
  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom" style={{ marginRight: '0.25em' }}>
          <motion.span
            className="inline-block"
            initial={{ y: '105%' }}
            animate={{ y: 0 }}
            transition={{ delay: delay + i * 0.03, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}