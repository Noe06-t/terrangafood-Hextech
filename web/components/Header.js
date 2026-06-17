'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, UtensilsCrossed } from 'lucide-react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = pathname === '/';
  const isSolid = !isHome || scrolled;

  return (
    <motion.header
      className={`site-header ${isSolid ? 'site-header--scrolled' : 'site-header--transparent'}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1], delay: isHome ? 2.6 : 0.1 }}
    >
      <div className="site-header__inner">
        <Link href="/" className="site-header__logo">
          <UtensilsCrossed size={20} className="site-header__logo-icon" />
          <span>Terranga<em>Food</em></span>
        </Link>

        <nav className="site-header__nav">
          {[
            { href: '/', label: 'Restaurants' },
            { href: '/mes-commandes', label: 'Mes commandes' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`site-header__link ${pathname === href ? 'site-header__link--active' : ''}`}
            >
              {label}
              {pathname === href && (
                <motion.span
                  className="site-header__link-dot"
                  layoutId="nav-dot"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        <button
          className="site-header__burger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="site-header__mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
          >
            <Link href="/" onClick={() => setMenuOpen(false)} className={pathname === '/' ? 'active' : ''}>Restaurants</Link>
            <Link href="/mes-commandes" onClick={() => setMenuOpen(false)} className={pathname === '/mes-commandes' ? 'active' : ''}>Mes commandes</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
