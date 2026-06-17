'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState(0); // 0: counting, 1: reveal, 2: exit

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1800);
    const t2 = setTimeout(() => setPhase(2), 2200);
    const t3 = setTimeout(() => setVisible(false), 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          className="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Curtain panels */}
          <motion.div
            className="preloader-panel preloader-panel-left"
            initial={{ scaleX: 1 }}
            animate={phase >= 2 ? { scaleX: 0 } : { scaleX: 1 }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
          />
          <motion.div
            className="preloader-panel preloader-panel-right"
            initial={{ scaleX: 1 }}
            animate={phase >= 2 ? { scaleX: 0 } : { scaleX: 1 }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Center content */}
          <div className="preloader-center">
            <motion.div
              className="preloader-wordmark"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1], delay: 0.2 }}
            >
              <span className="preloader-logo-t">T</span>
              <span className="preloader-logo-rest">erranga</span>
              <span className="preloader-logo-food">Food</span>
            </motion.div>

            <motion.div
              className="preloader-tagline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              Dakar · Livraison · Saveurs
            </motion.div>

            {/* Progress line */}
            <motion.div className="preloader-progress-track">
              <motion.div
                className="preloader-progress-fill"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: phase >= 1 ? 1 : 0.65 }}
                transition={{
                  duration: phase >= 1 ? 0.4 : 1.6,
                  ease: phase >= 1 ? [0.76, 0, 0.24, 1] : 'easeInOut',
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
