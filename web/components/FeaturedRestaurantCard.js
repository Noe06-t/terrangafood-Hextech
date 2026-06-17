import Link from 'next/link';

const cuisineColor = {
  'Sénégalaise traditionnelle': '#b8c4bc',
  'Africaine fusion':           '#b8b4c4',
  'Grillades sénégalaises':     '#c4b8b4',
  'Fruits de mer':              '#b4bcc4',
  'Café & snacks':              '#c0bbb4',
};

export default function FeaturedRestaurantCard({ restaurant }) {
  const bg = cuisineColor[restaurant.cuisine] || '#bbbbb6';

  return (
    <Link
      href={`/restaurants/${restaurant._id}`}
      className="group relative flex cursor-pointer overflow-hidden border transition-all duration-300 hover:-translate-y-0.5"
      style={{
        borderColor: 'var(--color-border)',
        borderRadius: 8,
        minHeight: 280,
        background: bg,
      }}
    >
      {/* Nom cuisine — watermark typographique géant */}
      <span
        className="pointer-events-none absolute -right-4 -bottom-4 select-none leading-none text-black/[0.07] transition-all duration-500 group-hover:text-black/[0.1]"
        style={{
          fontFamily: 'var(--font-heading)',
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 'clamp(5rem, 12vw, 9rem)',
          letterSpacing: '-0.04em',
        }}
        aria-hidden="true"
      >
        {restaurant.cuisine.split(' ')[0]}
      </span>

      {/* Contenu — aligné bas gauche */}
      <div className="relative z-10 flex flex-col justify-between p-8 md:p-10" style={{ maxWidth: 600 }}>
        <div>
          {/* Label cuisine */}
          <p
            className="mb-4 text-[11px] font-light uppercase tracking-[0.2em]"
            style={{ color: 'rgba(26,26,26,0.45)' }}
          >
            {restaurant.cuisine}
          </p>

          {/* Nom */}
          <h3
            className="font-light leading-[1.05] tracking-tight"
            style={{
              fontFamily: 'var(--font-heading)',
              fontStyle: 'italic',
              color: 'var(--color-ink)',
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              letterSpacing: '-0.02em',
            }}
          >
            {restaurant.nom}
          </h3>

          {restaurant.description && (
            <p
              className="mt-3 max-w-sm text-sm font-light leading-relaxed"
              style={{ color: 'rgba(26,26,26,0.55)' }}
            >
              {restaurant.description}
            </p>
          )}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-6">
          <span className="text-xs font-light" style={{ color: 'rgba(26,26,26,0.45)' }}>
            {restaurant.note}/5
          </span>
          <span className="text-xs font-light" style={{ color: 'rgba(26,26,26,0.45)' }}>
            {restaurant.adresse}
          </span>
          <span
            className="text-xs font-medium"
            style={{ color: restaurant.estOuvert ? 'var(--color-brand-700)' : 'var(--color-accent-700)' }}
          >
            {restaurant.estOuvert ? 'Ouvert' : 'Fermé'}
          </span>

          <span
            className="ml-auto inline-flex items-center gap-2 border px-5 py-2.5 text-sm font-medium text-black/70 transition-all duration-150 group-hover:bg-black/5"
            style={{ borderColor: 'rgba(26,26,26,0.2)', borderRadius: 3 }}
          >
            Voir le menu
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
