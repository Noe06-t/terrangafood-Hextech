import Link from 'next/link';
import { getCommandes } from '../../lib/api';
import StatutBadge from '../../components/StatutBadge';
import ScrollReveal from '../../components/ScrollReveal';
import { ArrowLeft, User, MapPin, Phone, ShoppingBag, AlertCircle } from 'lucide-react';

export default async function MesCommandesPage() {
  let commandes = [];
  let error = null;

  try {
    commandes = await getCommandes();
  } catch (err) {
    error = err.message;
  }

  return (
    <div className="commandes-page">
      <Link href="/" className="commande-back">
        <ArrowLeft size={16} /> Retour aux restaurants
      </Link>

      <ScrollReveal>
        <div className="commandes-page__header">
          <h1 className="commandes-page__title">Mes commandes</h1>
          {!error && (
            <p className="commandes-page__sub">
              {commandes.length} commande{commandes.length !== 1 ? 's' : ''} au total
            </p>
          )}
        </div>
      </ScrollReveal>

      {error ? (
        <ScrollReveal>
          <div className="error-state">
            <div className="error-state__icon"><AlertCircle size={28} /></div>
            <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 700 }}>
              Service indisponible
            </p>
            <p className="error-state__msg">{error}</p>
          </div>
        </ScrollReveal>
      ) : commandes.length === 0 ? (
        <ScrollReveal>
          <div className="empty-state">
            <div className="empty-state__icon">
              <ShoppingBag size={32} />
            </div>
            <p className="empty-state__title">Aucune commande pour le moment</p>
            <p className="empty-state__desc">
              Parcourez nos restaurants et passez votre première commande.
            </p>
            <Link href="/" className="empty-state__action">
              Découvrir les restaurants
            </Link>
          </div>
        </ScrollReveal>
      ) : (
        <div className="commandes-list">
          {commandes.map((cmd, i) => (
            <ScrollReveal key={cmd._id} delay={i * 0.06}>
              <div className="commande-card">
                <div className="commande-card__header">
                  <h3 className="commande-card__restaurant">
                    {cmd.restaurant?.nom || 'Restaurant'}
                  </h3>
                  <StatutBadge statut={cmd.statut} />
                </div>

                <div className="commande-card__details">
                  <div className="commande-card__detail-row">
                    <User size={14} style={{ color: 'var(--brand)', flexShrink: 0 }} />
                    {cmd.client}
                  </div>
                  <div className="commande-card__detail-row">
                    <MapPin size={14} style={{ color: 'var(--brand)', flexShrink: 0 }} />
                    {cmd.adresseLivraison}
                  </div>
                  {cmd.telephone && (
                    <div className="commande-card__detail-row">
                      <Phone size={14} style={{ color: 'var(--brand)', flexShrink: 0 }} />
                      {cmd.telephone}
                    </div>
                  )}
                  {cmd.plats && (
                    <div className="commande-card__detail-row">
                      <ShoppingBag size={14} style={{ color: 'var(--brand)', flexShrink: 0 }} />
                      {cmd.plats.length} plat{cmd.plats.length !== 1 ? 's' : ''}
                    </div>
                  )}
                </div>

                <div className="commande-card__footer">
                  <span className="commande-card__amount">
                    {cmd.montantTotal?.toLocaleString('fr-SN')}
                    <span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-muted)', marginLeft: 4 }}>FCFA</span>
                  </span>
                  <span className="commande-card__date">
                    {new Date(cmd.createdAt).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      )}
    </div>
  );
}
