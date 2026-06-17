'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ShoppingBag, CheckCircle, XCircle, User, Phone, MapPin, MessageSquare } from 'lucide-react';
import { creerCommande } from '../lib/api';

export default function CommandeForm({ restaurant, plats }) {
  const [client, setClient] = useState('');
  const [telephone, setTelephone] = useState('');
  const [adresse, setAdresse] = useState('');
  const [commentaire, setCommentaire] = useState('');
  const [platsChoisis, setPlatsChoisis] = useState([]);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const togglePlat = (platId) => {
    setPlatsChoisis((prev) =>
      prev.includes(platId) ? prev.filter((id) => id !== platId) : [...prev, platId]
    );
  };

  const total = plats
    .filter((p) => platsChoisis.includes(p._id))
    .reduce((sum, p) => sum + p.prix, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      await creerCommande({
        client,
        telephone,
        adresseLivraison: adresse,
        restaurant: restaurant._id,
        plats: platsChoisis,
        montantTotal: total,
        commentaire,
      });

      setMessage({ type: 'success', text: 'Commande envoyée avec succès !' });
      setClient(''); setTelephone(''); setAdresse('');
      setCommentaire(''); setPlatsChoisis([]);
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="commande-form">
      {/* Header */}
      <div className="commande-form__header">
        <p className="commande-form__restaurant-sub">Passer commande</p>
        <h2 className="commande-form__restaurant-name">{restaurant.nom}</h2>
      </div>

      <div className="commande-form__body">
        <AnimatePresence>
          {message && (
            <motion.div
              className={`form-message form-message--${message.type}`}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
            >
              {message.type === 'success' ? <CheckCircle size={18} /> : <XCircle size={18} />}
              {message.text}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit}>
          {/* Section 1 — Coordonnées */}
          <div className="form-section">
            <h3 className="form-section__title">
              <span className="form-section__num">1</span>
              Vos coordonnées
            </h3>

            <div className="form-row">
              <div className="form-group">
                <label>
                  <User size={13} style={{ display: 'inline', marginRight: 5, verticalAlign: 'middle' }} />
                  Votre nom
                </label>
                <input
                  type="text"
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  placeholder="ex : Moussa Diop"
                  required
                />
              </div>
              <div className="form-group">
                <label>
                  <Phone size={13} style={{ display: 'inline', marginRight: 5, verticalAlign: 'middle' }} />
                  Téléphone
                </label>
                <input
                  type="tel"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  placeholder="ex : +221 77 123 45 67"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>
                <MapPin size={13} style={{ display: 'inline', marginRight: 5, verticalAlign: 'middle' }} />
                Adresse de livraison
              </label>
              <input
                type="text"
                value={adresse}
                onChange={(e) => setAdresse(e.target.value)}
                placeholder="ex : Keur Gorgui, Villa 12"
                required
              />
            </div>
          </div>

          {/* Section 2 — Sélection plats */}
          <div className="form-section">
            <h3 className="form-section__title">
              <span className="form-section__num">2</span>
              Choisissez vos plats
              {platsChoisis.length > 0 && (
                <span style={{
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  color: 'var(--brand)',
                  background: 'var(--brand-glow)',
                  padding: '2px 10px',
                  borderRadius: '999px',
                }}>
                  {platsChoisis.length} sélectionné{platsChoisis.length > 1 ? 's' : ''}
                </span>
              )}
            </h3>

            {plats.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Aucun plat disponible.</p>
            ) : (
              <div className="plats-selection">
                {plats.map((plat) => {
                  const selected = platsChoisis.includes(plat._id);
                  return (
                    <label key={plat._id} className="plat-checkbox-label">
                      <motion.div
                        className={`plat-checkbox-card ${selected ? 'plat-checkbox-card--selected' : ''}`}
                        whileTap={{ scale: 0.97 }}
                        transition={{ duration: 0.15 }}
                      >
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={() => togglePlat(plat._id)}
                        />
                        <div className="plat-checkbox-check">
                          <Check size={12} color="white" strokeWidth={3} />
                        </div>
                        <div className="plat-checkbox-info">
                          <div className="plat-checkbox-name">{plat.nom}</div>
                          <div className="plat-checkbox-price">
                            {plat.prix.toLocaleString('fr-SN')} FCFA
                          </div>
                        </div>
                      </motion.div>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {/* Section 3 — Commentaire */}
          <div className="form-section">
            <h3 className="form-section__title">
              <span className="form-section__num">3</span>
              Commentaire
              <span style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', fontWeight: 400 }}>optionnel</span>
            </h3>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>
                <MessageSquare size={13} style={{ display: 'inline', marginRight: 5, verticalAlign: 'middle' }} />
                Instructions spéciales
              </label>
              <textarea
                value={commentaire}
                onChange={(e) => setCommentaire(e.target.value)}
                placeholder="ex : Sans piment, allergie aux arachides..."
                rows={3}
              />
            </div>
          </div>

          {/* Total */}
          <AnimatePresence>
            {platsChoisis.length > 0 && (
              <motion.div
                className="commande-total"
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }}
              >
                <div>
                  <div className="commande-total__label">Total estimé</div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>
                    {platsChoisis.length} plat{platsChoisis.length > 1 ? 's' : ''}
                  </div>
                </div>
                <div>
                  <span className="commande-total__amount">
                    {total.toLocaleString('fr-SN')}
                  </span>
                  <span className="commande-total__currency">FCFA</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            type="submit"
            className="btn-commander"
            disabled={loading || platsChoisis.length === 0}
            whileTap={platsChoisis.length > 0 ? { scale: 0.98 } : {}}
          >
            <ShoppingBag size={18} />
            {loading ? 'Envoi en cours...' : 'Confirmer la commande'}
          </motion.button>
        </form>
      </div>
    </div>
  );
}
