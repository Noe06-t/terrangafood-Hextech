import { CheckCircle, XCircle } from 'lucide-react';

export default function PlatCard({ plat }) {
  return (
    <div className="plat-card">
      <span className="plat-card__category">{plat.categorie}</span>
      <h4 className="plat-card__name">{plat.nom}</h4>
      <p className="plat-card__desc">{plat.description}</p>
      <div className="plat-card__footer">
        <span className="plat-card__price">
          {plat.prix.toLocaleString('fr-SN')}
          <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-muted)', marginLeft: 4 }}>FCFA</span>
        </span>
        <span className={`plat-card__avail ${plat.disponible ? 'plat-card__avail--yes' : 'plat-card__avail--no'}`}>
          {plat.disponible
            ? <><CheckCircle size={13} /> Disponible</>
            : <><XCircle size={13} /> Indisponible</>
          }
        </span>
      </div>
    </div>
  );
}
