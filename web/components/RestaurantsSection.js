'use client';

import { UtensilsCrossed, AlertCircle } from 'lucide-react';
import RestaurantCard from './RestaurantCard';
import ScrollReveal from './ScrollReveal';

export default function RestaurantsSection({ restaurants, error }) {
  return (
    <section id="restaurants" className="restaurants-section">
      <ScrollReveal>
        <div className="section__header" style={{ marginBottom: '48px' }}>
          <p className="section__eyebrow">Nos adresses</p>
          <h2 className="section__title">Restaurants partenaires</h2>
          <p className="section__desc">
            Sélectionnés pour la qualité de leurs plats et leur authenticité culinaire.
          </p>
        </div>
      </ScrollReveal>

      {error ? (
        <ScrollReveal>
          <div className="error-state">
            <div className="error-state__icon"><AlertCircle size={28} /></div>
            <p className="section__title" style={{ fontSize: '1.3rem' }}>Service temporairement indisponible</p>
            <p className="error-state__msg">{error}</p>
          </div>
        </ScrollReveal>
      ) : restaurants.length === 0 ? (
        <ScrollReveal>
          <div className="empty-state">
            <div className="empty-state__icon"><UtensilsCrossed size={32} /></div>
            <p className="empty-state__title">Aucun restaurant pour le moment</p>
            <p className="empty-state__desc">
              Lancez <code>npm run seed</code> dans le dossier <code>api/</code> pour ajouter des données de démonstration.
            </p>
          </div>
        </ScrollReveal>
      ) : (
        /* Bento asymétrique — card 0 : 8/12 cols, card 1 : 4/12, reste : 4/12 */
        <div className="restaurants-bento">
          {restaurants.map((restaurant, i) => (
            <ScrollReveal key={restaurant._id} delay={i * 0.07}>
              <RestaurantCard restaurant={restaurant} featured={i === 0} />
            </ScrollReveal>
          ))}
        </div>
      )}
    </section>
  );
}
