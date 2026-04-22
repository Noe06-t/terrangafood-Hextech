# Rapport de tests -- Lab 1

## Équipe : Hextech
## Testeur : Noé (QA)

| # | Test | Résultat | Notes |
|----|------------------------------------------|------------|--------|
| 1 | POST commande valide | 201 | Commande créée avec statut "en attente" |
| 2 | POST commande sans client | 400 | Validation: Bad Request (client obligatoire) |
| 3 | GET toutes les commandes | 200 | Retourne tableau avec populate restaurant et plats |
| 4 | GET commande par ID | 200 | Détail commande avec restaurant et plats populés |
| 5 | GET commande ID inexistant | 404 | Not Found |
| 6 | PATCH en attente → confirmée | 200 | Transition autorisée, statut mis à jour |
| 7 | PATCH confirmée → en livraison | 200 | Transition autorisée, statut mis à jour |
| 8 | PATCH en livraison → livrée | 200 | Transition autorisée, statut mis à jour |
| 9 | PATCH transition interdite | 400 | Validation: Bad Request (ex: confirmée → livrée directement) |
| 10 | PATCH commande livrée | 400 | Pas de transition possible, Bad Request |
| 11 | DELETE commande || |
| 12 | Populate restaurant visible |  | |
| 13 | Populate plats visible | |  |
