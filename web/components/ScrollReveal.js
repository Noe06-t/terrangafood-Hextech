'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  once = true,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: '-80px 0px' });

  const offset = direction === 'up' ? 28 : direction === 'down' ? -28 : 0;
  const xOffset = direction === 'left' ? 28 : direction === 'right' ? -28 : 0;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: offset, x: xOffset }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: offset, x: xOffset }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 20,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
