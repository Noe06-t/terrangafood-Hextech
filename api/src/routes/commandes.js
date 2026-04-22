const express = require('express');
const router = express.Router();
const commandeController = require('../controllers/commandeController');

// POST /api/commandes Créer une commande
router.post('/', commandeController.create);

// GET /api/commandes Lister les commandes
router.get('/', commandeController.getAll);

// GET /api/commandes/:id Détail d’une commande
router.get('/:id', commandeController.getById);

// PATCH /api/commandes/:id/statut Changer le statut
router.patch('/:id/statut', commandeController.updateStatut);

// DELETE /api/commandes/:id Supprimer une commande
router.delete('/:id', commandeController.delete);

module.exports = router;