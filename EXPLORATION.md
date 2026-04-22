# Rapport d'exploration -- Lab 0

## Équipe : Hextech

### Architecture Backend (par DB -- Absa)
- Nombre de modèles : 2 (Restaurant, Plat)
- Endpoints existants : GET /api/restaurants, GET /api/restaurants/:id
- Pattern utilisé : MVC

### Architecture Frontend (par DF -- Alpha)
- Nombre de pages : 2 (restaurants/[id]/page.js et page.js)
- Composants réutilisables : Header, RestaurantCard, PlatCard
- Méthode d'appel API : fetch dans lib/api.js

### Configuration (par DO -- Baye Cheikh)
- Variables d'environnement : MONGODB_URI, PORT
- Scripts npm : dev, start, seed
- Fichiers ignorés par Git : node_modules, .env, .next

### Tests fonctionnels (par QA -- Mariama)
- Fonctionnalités testées : [
  - Affichage de la liste des restaurants
  - Affichage des détails d'un restaurant
]
- Bugs trouvés : aucun

### Synthèse (par CP -- Noé)
- Ce qui fonctionne bien :
  - Architecture globale (MVC, Frontend/Backend séparé)
  - API REST avec endpoints GET basiques
  - Modèles de données (Restaurant, Plat)
  - Base de données connectée
  - Composants réutilisables au frontend
  - Système de seed pour les données initiales

- Ce qui manque (le 30%) :
  - Endpoints POST/PUT/PATCH/DELETE
  - Authentification et autorisation
  - Validation des données
  - Pagination et filtrage
  - Tests
