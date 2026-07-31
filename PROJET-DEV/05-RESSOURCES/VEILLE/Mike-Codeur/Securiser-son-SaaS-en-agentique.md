---
titre: Sécuriser un service en ligne, les trois couches
type: veille
statut: a-tester
etiquettes: [dev/veille, dev/securite]
cree: 2026-07-31
maj: 2026-07-31
source: https://www.youtube.com/watch?v=WAsmcwBIqVc
duree: 30 min
priorite: 2
---

# Sécuriser un service en ligne, les trois couches

*« On a HACKÉ le SaaS de Benjamin Code (et le mien) »*

## Le contexte, en deux lignes

Un développeur a testé la sécurité du site de quelqu'un d'autre sans
autorisation, pour faire une vidéo. Il s'est fait repérer par ses propres
traces. Mike Codeur rappelle que sans accord écrit, c'est un délit — « pour
aider » n'y change rien.

**La première moitié de la vidéo est un fait divers.** Ce qui nous intéresse
commence à 19:20.

## Les trois couches qu'il met en place

**Couche 1 — audit continu du dépôt.** Un passage régulier sur le code à la
recherche de failles et de secrets oubliés. Pas une fois avant la mise en ligne :
en continu.

**Couche 2 — veille sur les dépendances.** Les bibliothèques qu'on utilise ont
des failles découvertes après coup. Sans surveillance, on tourne pendant des
mois avec un trou connu de tous.

**Couche 3 — un agent qui lit les journaux de production.** C'est celle-là qui
l'a alerté. Le motif suspect était visible dans ses journaux ; personne ne les
lisait. Un agent qui les parcourt et signale l'anormal, c'est peu coûteux et ça
marche.

## Ce que ça vaut pour nous

Les trois nous concernent, dans cet ordre :

**Couche 2 en premier.** L'application EOC et le site sont en ligne, avec des
dépendances jamais mises à jour. C'est le risque le plus concret et le moins
glamour.

**Couche 1 ensuite**, avec la commande d'audit de [[GStack-l-audit-de-Garry-Tan]].

**Couche 3 quand il y aura du trafic.** Aujourd'hui il n'y a presque personne
sur le site ; en lire les journaux ne dirait pas grand-chose. Après le
26 août, oui.

À rattacher aux points en suspens du coffre EOC : la clé Firebase à régénérer et
la clé Google Play à copier sur une clé USB. Ces deux-là passent avant tout le
reste de cette note.

## À faire

- [ ] Vérifier les dépendances de l'application EOC et du site
- [ ] Reprendre les deux points de clés en attente dans le coffre EOC

## Chapitres utiles

- 19:20 le vrai sujet commence ici
- 20:00 couche 1 : audit du dépôt
- 25:00 couche 2 : veille des dépendances
- 28:30 couche 3 : l'agent qui lit les journaux

## Liens

- [[GStack-l-audit-de-Garry-Tan]]
- [[Securite-agentique]]
- [[Chaine-Mike-Codeur]]
