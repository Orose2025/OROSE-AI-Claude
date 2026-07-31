---
titre: Sécurité
type: domaine
statut: actif
etiquettes: [dev/securite]
cree: 2026-07-31
maj: 2026-07-31
alias: [Les clés, Sécurité]
---

# Sécurité

## Les trois couches

D'après [[Securiser-son-SaaS-en-agentique]] :

1. **Audit du dépôt** — chercher les failles et les secrets oubliés, en continu
2. **Veille des dépendances** — les bibliothèques prennent des failles avec le
   temps
3. **Lecture des journaux de production** — c'est là qu'on voit passer ce qui ne
   devrait pas

## Où on en est

| Couche | État | Priorité |
|---|---|---|
| Audit du dépôt | jamais fait | à faire avant le 26 août |
| Dépendances | jamais vérifiées | **le plus urgent** — l'appli est en ligne |
| Journaux | pas de trafic aujourd'hui | après le lancement |

## Les clés

Elles ne sont **jamais** dans ce coffre. Elles vivent dans
`ÉCHEC O CUBE/DOCUMENT OFFICIAL/CLES-ET-SECRETS/`, dossier exclu de la recherche
Obsidian. Le détail de ce que chacune ouvre est dans la note
`Securite-des-cles-EOC` du coffre EOC.

Deux points en attente depuis le 30 juillet, et ils passent avant tout le reste :

1. **Régénérer la clé Firebase** — c'est celle qui a le plus de chances d'avoir
   circulé
2. **Copier la clé Google Play sur une clé USB** — c'est la seule qui ne se
   remplace pas. Si elle est perdue, l'application ne peut plus être mise à jour.

## La règle

Avant toute mise en ligne : audit du dépôt, vérification des dépendances, et
personne ne pousse une clé dans un dépôt, jamais, même privé.

## Liens

- [[Securiser-son-SaaS-en-agentique]]
- [[GStack-l-audit-de-Garry-Tan]]
