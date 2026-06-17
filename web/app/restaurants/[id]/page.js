import Link from 'next/link';
import PlatCard from '../../../components/PlatCard';
import ScrollReveal from '../../../components/ScrollReveal';
import { getRestaurant, getPlatsByRestaurant } from '../../../lib/api';
import { MapPin, Phone, Clock, Star, UtensilsCrossed, ArrowLeft, AlertCircle, ShoppingBag } from 'lucide-react';

const cuisineBg = {
  'Sénégalaise traditionnelle': 'linear-gradient(135deg, #1A6B3C 0%, #2D9A55 100%)',
  'Africaine fusion':           'linear-gradient(135deg, #C05621 0%, #DD6B20 100%)',
  'Grillades sénégalaises':     'linear-gradient(135deg, #B7410E 0%, #D4623A 100%)',
  'Fruits de mer':              'linear-gradient(135deg, #0E5F7A 0%, #1A85A8 100%)',
  'Café & snacks':              'linear-gradient(135deg, #78350F 0%, #92400E 100%)',
};

export default async function RestaurantDetailPage({ params }) {
  const { id } = params;
  let restaurant = null;
  let plats = [];
  let error = null;

  try {
    restaurant = await getRestaurant(id);
    plats = await getPlatsByRestaurant(id);
  } catch (err) {
    error = err.message;
  }

  if (error || !restaurant) {
    return (
      <div className="commandes-page">
        <Link href="/" className="back-link">
          <ArrowLeft size={16} /> Retour aux restaurants
        </Link>
        <div className="error-state" style={{ marginTop: '40px' }}>
          <div className="error-state__icon"><AlertCircle size={28} /></div>
          <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 700 }}>Restaurant introuvable</p>
          <p className="error-state__msg">{error || "Ce restaurant n'existe pas."}</p>
        </div>
      </div>
    );
  }

  const bg = cuisineBg[restaurant.cuisine] || 'linear-gradient(135deg, #1A6B3C 0%, #2D9A55 100%)';

  return (
    <div className="restaurant-page">
      {/* Hero */}
      <div className="restaurant-hero" style={{ background: bg }}>
        <div className="restaurant-hero__overlay" />
        <div className="restaurant-hero__content">
          <p className="restaurant-hero__cuisine">
            <UtensilsCrossed size={12} />
            {restaurant.cuisine}
          </p>
          <h1 className="restaurant-hero__name">{restaurant.nom}</h1>
          <div className="restaurant-hero__meta">
            <span className="restaurant-hero__meta-item">
              <Star size={14} fill="#FBBF24" color="#FBBF24" /> {restaurant.note}/5
            </span>
            <span className="restaurant-hero__meta-item">
              <MapPin size={14} /> {restaurant.adresse}
            </span>
            {restaurant.horaires && (
              <span className="restaurant-hero__meta-item">
                <Clock size={14} /> {restaurant.horaires.ouverture} — {restaurant.horaires.fermeture}
              </span>
            )}
            <span style={{
              padding: '3px 10px',
              borderRadius: '999px',
              background: restaurant.estOuvert ? 'rgba(34,197,94,0.25)' : 'rgba(248,113,113,0.25)',
              color: restaurant.estOuvert ? '#4ADE80' : '#F87171',
              fontSize: '0.78rem',
              fontWeight: 700,
            }}>
              {restaurant.estOuvert ? 'Ouvert' : 'Fermé'}
            </span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="restaurant-body">
        <Link href="/" className="restaurant-body__back">
          <ArrowLeft size={16} /> Retour aux restaurants
        </Link>

        {/* Menu principal */}
        <div>
          <ScrollReveal>
            <div className="menu-section__title">
              Menu
              <span className="menu-section__count">{plats.length} plat{plats.length !== 1 ? 's' : ''}</span>
            </div>
          </ScrollReveal>

          {plats.length === 0 ? (
            <div className="empty-state" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
              <div className="empty-state__icon"><UtensilsCrossed size={28} /></div>
              <p className="empty-state__title">Menu en cours de préparation</p>
              <p className="empty-state__desc">Aucun plat n'est encore disponible pour ce restaurant.</p>
            </div>
          ) : (
            <div className="plats-grid">
              {plats.map((plat, i) => (
                <ScrollReveal key={plat._id} delay={i * 0.06}>
                  <PlatCard plat={plat} />
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="restaurant-sidebar">
          <p className="restaurant-sidebar__title">Informations</p>
          <div className="restaurant-sidebar__info">
            {restaurant.description && (
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '8px' }}>
                {restaurant.description}
              </p>
            )}
            <div className="restaurant-sidebar__row">
              <MapPin size={15} className="restaurant-sidebar__row-icon" />
              <span>{restaurant.adresse}</span>
            </div>
            {restaurant.telephone && (
              <div className="restaurant-sidebar__row">
                <Phone size={15} className="restaurant-sidebar__row-icon" />
                <span>{restaurant.telephone}</span>
              </div>
            )}
            {restaurant.horaires && (
              <div className="restaurant-sidebar__row">
                <Clock size={15} className="restaurant-sidebar__row-icon" />
                <span>{restaurant.horaires.ouverture} — {restaurant.horaires.fermeture}</span>
              </div>
            )}
            <div className="restaurant-sidebar__row">
              <Star size={15} className="restaurant-sidebar__row-icon" fill="var(--brand)" />
              <span>{restaurant.note}/5 — Note moyenne</span>
            </div>
          </div>

          <Link href={`/commander/${restaurant._id}`} className="restaurant-sidebar__cta">
            <ShoppingBag size={17} />
            Commander ici
          </Link>
        </aside>
      </div>
    </div>
  );
}
