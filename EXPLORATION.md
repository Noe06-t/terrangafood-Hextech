# Rapport d'exploration -- Lab 0

## Équipe : [Nom de guerre]

### Architecture Backend (par DB -- [Prénom])
- Nombre de modèles : ...
- Endpoints existants : GET /api/restaurants, GET /api/restaurants/:id
- Pattern utilisé : MVC

### Architecture Frontend (par DF -- [Prénom])
- Nombre de pages : ...
- Composants réutilisables : Header, RestaurantCard, PlatCard
- Méthode d'appel API : fetch dans lib/api.js

### Configuration (par DO -- [Prénom])
- Variables d'environnement : MONGODB_URI, PORT
- Scripts npm : dev, start, seed
- Fichiers ignorés par Git : node_modules, .env, .next

### Tests fonctionnels (par QA -- [Prénom])
- Fonctionnalités testées : [liste]
- Bugs trouvés : [liste ou "aucun"]

### Synthèse (par CP -- [Noé])
- Ce qui fonctionne bien :
  - Architecture globale (MVC, Frontend/Backend séparé)
  - API REST avec endpoints GET basiques
  - Modèles de données (Restaurant, Plat)
  - Base de données connectée
  - Composants réutilisables au frontend
  - Système de seed pour les données initiales

- Ce qui manque (le 30%) :
  - Endpoints POST/PUT/DELETE
  - Authentification et autorisation
  - Validation des données
  - Pagination et filtrage
  - Tests
