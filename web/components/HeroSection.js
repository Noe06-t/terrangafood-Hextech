'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 2.9 } },
};

// Spring physics — stiffness:100, damping:20 (design-taste-frontend spec)
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 20 },
  },
};

export default function HeroSection({ count = 0 }) {
  const imgRef = useRef(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    if (imgRef.current?.complete) setImgLoaded(true);
  }, []);

  return (
    <section className="hero">
      <div className="hero__bg">
        <img
          ref={imgRef}
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&q=80&auto=format&fit=crop"
          alt=""
          className={`hero__bg-img ${imgLoaded ? 'loaded' : ''}`}
          onLoad={() => setImgLoaded(true)}
          aria-hidden="true"
        />
        <div className="hero__overlay" />
        <div className="hero__noise" />
      </div>

      <motion.div
        className="hero__content"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="hero__eyebrow" variants={fadeUp}>
          <span className="hero__eyebrow-dot" />
          Livraison à Dakar
        </motion.div>

        <motion.h1 className="hero__headline" variants={fadeUp}>
          La cuisine
          <br />
          <em className="hero__headline-accent">dakaroise,</em>
          <br />
          livrée chez vous
        </motion.h1>

        <motion.p className="hero__sub" variants={fadeUp}>
          Découvrez les meilleurs restaurants de Dakar et commandez vos plats préférés en quelques clics. Saveurs authentiques, livraison rapide.
        </motion.p>

        <motion.div className="hero__actions" variants={fadeUp}>
          <Link href="#restaurants" className="btn-primary">
            Commander maintenant
            <ArrowRight size={17} />
          </Link>
          <Link href="#restaurants" className="btn-ghost">
            Explorer les restaurants
          </Link>
        </motion.div>

        {count > 0 && (
          <motion.div className="hero__stats" variants={fadeUp}>
            <div>
              <div className="hero__stat-value">{count}</div>
              <div className="hero__stat-label">Restaurants</div>
            </div>
            <div>
              <div className="hero__stat-value">30min</div>
              <div className="hero__stat-label">Livraison moy.</div>
            </div>
            <div>
              <div className="hero__stat-value">100%</div>
              <div className="hero__stat-label">Fait maison</div>
            </div>
          </motion.div>
        )}
      </motion.div>

      <motion.div
        className="hero__scroll-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 3.8 }}
      >
        <div className="hero__scroll-line" />
        <ChevronDown size={14} />
      </motion.div>
    </section>
  );
}
