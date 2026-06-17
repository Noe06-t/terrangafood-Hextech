import Link from 'next/link';
import CommandeForm from '../../../components/commandeform';
import { getRestaurant, getPlatsByRestaurant } from '../../../lib/api';
import { ArrowLeft, AlertCircle } from 'lucide-react';

export default async function CommanderPage({ params }) {
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
      <div className="commande-page">
        <Link href="/" className="commande-back">
          <ArrowLeft size={16} /> Retour aux restaurants
        </Link>
        <div className="error-state" style={{ marginTop: 40 }}>
          <div className="error-state__icon"><AlertCircle size={28} /></div>
          <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 700 }}>Erreur</p>
          <p className="error-state__msg">{error || 'Restaurant non trouvé'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="commande-page">
      <Link href={`/restaurants/${id}`} className="commande-back">
        <ArrowLeft size={16} /> Retour au restaurant
      </Link>
      <CommandeForm
        restaurant={restaurant}
        plats={plats.filter((p) => p.disponible)}
      />
    </div>
  );
}
