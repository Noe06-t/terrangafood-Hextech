import { Clock, CheckCircle, Truck, Package, XCircle } from 'lucide-react';

const config = {
  'en attente':   { cls: 'statut-en-attente',   Icon: Clock },
  'confirmée':    { cls: 'statut-confirmee',     Icon: CheckCircle },
  'en livraison': { cls: 'statut-en-livraison',  Icon: Truck },
  'livrée':       { cls: 'statut-livree',        Icon: Package },
  'annulée':      { cls: 'statut-annulee',       Icon: XCircle },
};

export default function StatutBadge({ statut }) {
  const { cls, Icon } = config[statut] || { cls: '', Icon: Clock };
  return (
    <span className={`statut-badge ${cls}`}>
      <Icon size={11} />
      {statut}
    </span>
  );
}
