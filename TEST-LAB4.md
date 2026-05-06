# Rapport de tests — Lab 4 (Production)

## Équipe : [Nom de guerre]
## Testeur : ABSA (QA)

## URLs de production
- Frontend : https://terrangafood-Hextech.vercel.app
- API : https://terrangafood-api-Hextech.onrender.com
- Atlas : cluster0.xxxxx.mongodb.net

## Résultats
| ID  | Endpoint              | Méthode | Données envoyées        | Résultat attendu     | Résultat obtenu              | Statut |
|-----|----------------------|--------|--------------------------|----------------------|------------------------------|--------|
| T1  | /api/restaurants     | GET    | -                        | 200 + JSON           | 200 OK + liste récupérée     | ✅     |
| T2  | /api/restaurants/{id}| GET    | id valide                | 200 + objet          | 200 OK + objet retourné      | ✅     |
| T3  | /api/restaurants     | POST   | { nom, adresse }         | 201 Created          | 201 Created                  | ✅     |
| T4  | /api/restaurants/{id}| PUT    | { nom modifié }          | 200 Updated          | 200 OK + modification faite  | ✅     |
| T5  | /api/restaurants/{id}| DELETE | id valide                | 200 Deleted          | 200 OK + suppression faite   | ✅     |
| T6  | /api/restaurants/{id}| GET    | id invalide              | 404 Not Found        | 404 Not Found                | ✅     |

---

Architecture Logicielle 2 — L3 GL — Lab 4 — Déploiement Production

## Notes
- Temps de cold start API Render : ~ XX secondes
- Bugs trouvés : [liste ou "aucun"]