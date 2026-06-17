'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Star, ArrowRight } from 'lucide-react';

const cuisineBg = {
  'Sénégalaise traditionnelle': 'linear-gradient(135deg, #1A6B3C 0%, #2D9A55 100%)',
  'Africaine fusion':           'linear-gradient(135deg, #C05621 0%, #DD6B20 100%)',
  'Grillades sénégalaises':     'linear-gradient(135deg, #B7410E 0%, #D4623A 100%)',
  'Fruits de mer':              'linear-gradient(135deg, #0E5F7A 0%, #1A85A8 100%)',
  'Café & snacks':              'linear-gradient(135deg, #78350F 0%, #92400E 100%)',
};

const cuisineIcon = {
  'Sénégalaise traditionnelle': (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="44" height="44" aria-hidden="true">
      <circle cx="20" cy="20" r="16" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
      <path d="M12 24c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M16 24v-3M20 24v-5M24 24v-3" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  'Africaine fusion': (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="44" height="44" aria-hidden="true">
      <circle cx="20" cy="20" r="16" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
      <path d="M14 20c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="20" cy="20" r="3" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5"/>
      <path d="M20 17v-3M20 26v-3M13 20h3M24 20h3" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  ),
  'Grillades sénégalaises': (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="44" height="44" aria-hidden="true">
      <circle cx="20" cy="20" r="16" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
      <path d="M12 22h16M14 19l2 3M18 19l2 3M22 19l2 3M26 19l2 3" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M16 16c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v3H16v-3z" stroke="rgba(255,255,255,0.55)" strokeWidth="1.2"/>
    </svg>
  ),
  'Fruits de mer': (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="44" height="44" aria-hidden="true">
      <circle cx="20" cy="20" r="16" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
      <path d="M20 14c-4 0-7 2.7-7 6s3 6 7 6 7-2.7 7-6-3-6-7-6z" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5"/>
      <path d="M20 14v-2M20 28v-2" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeLinecap="round"/>
      <circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.5)"/>
    </svg>
  ),
  'Café & snacks': (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="44" height="44" aria-hidden="true">
      <circle cx="20" cy="20" r="16" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
      <path d="M15 17h10v6a4 4 0 01-4 4h-2a4 4 0 01-4-4v-6z" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5"/>
      <path d="M25 19h2a2 2 0 110 4h-2" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M17 14c0-1 1-2 1-2s1 1 1 2M21 14c0-1 1-2 1-2s1 1 1 2" stroke="rgba(255,255,255,0.45)" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  ),
};

export default function RestaurantCard({ restaurant, featured = false }) {
  const bg   = cuisineBg[restaurant.cuisine]  || 'linear-gradient(135deg, #1A6B3C 0%, #2D9A55 100%)';
  const icon = cuisineIcon[restaurant.cuisine] || null;

  return (
    <Link
      href={`/restaurants/${restaurant._id}`}
      className={`restaurant-card ${featured ? 'restaurant-card--featured' : ''}`}
    >
      <div
        className="restaurant-card__visual"
        style={{
          background: bg,
          // Featured : visuel plus grand pour occuper la hauteur bento
          height: featured ? '260px' : '200px',
        }}
      >
        <div
          className="restaurant-card__visual-placeholder"
          style={{ fontSize: featured ? '4.5rem' : undefined }}
        >
          {icon}
        </div>

        <div className="restaurant-card__badge">
          <Star size={11} className="restaurant-card__badge-star" fill="#FBBF24" />
          {restaurant.note}/5
        </div>

        <div
          className={`restaurant-card__status-dot ${
            restaurant.estOuvert
              ? 'restaurant-card__status-dot--open'
              : 'restaurant-card__status-dot--closed'
          }`}
          title={restaurant.estOuvert ? 'Ouvert' : 'Fermé'}
        />
      </div>

      <div className="restaurant-card__body">
        <div className="restaurant-card__cuisine-tag">
          {restaurant.cuisine}
        </div>

        <h3 className={`restaurant-card__name ${featured ? 'restaurant-card__name--featured' : ''}`}>
          {restaurant.nom}
        </h3>

        <p className="restaurant-card__address">
          <MapPin size={13} />
          {restaurant.adresse}
        </p>

        {featured && restaurant.description && (
          <p className="restaurant-card__desc">{restaurant.description}</p>
        )}

        <div className="restaurant-card__footer">
          <span
            className={`restaurant-card__status-text ${
              restaurant.estOuvert
                ? 'restaurant-card__status-text--open'
                : 'restaurant-card__status-text--closed'
            }`}
          >
            {restaurant.estOuvert ? 'Ouvert maintenant' : 'Fermé'}
          </span>

          <span className="restaurant-card__cta">
            Voir le menu <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
}
