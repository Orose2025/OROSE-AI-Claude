---
titre: Le pipeline en 7 étapes pour construire un produit
type: veille
statut: partiellement-adopte
etiquettes: [dev/veille, dev/methode]
cree: 2026-07-31
maj: 2026-07-31
source: https://www.youtube.com/watch?v=G3JN9X2Uiio
duree: 1 h 45
priorite: 2
---

# Le pipeline en 7 étapes pour construire un produit

*« Agentic Dev : copie ma méthode pour reproduire n'importe quel SaaS »*

## De quoi il s'agit

Le point de départ est financier : il paie 2 000 € par an un outil de formation
et 4 000 € un outil d'emailing. Il montre comment reconstruire l'équivalent avec
des agents, en sept étapes.

| Étape | Ce qu'elle produit |
|---|---|
| 1 | **PRD** — le cadrage. Et un « cimetière » : ce qu'on ne fera pas. |
| 2 | Découper en petits lots qu'un agent peut traiter seul |
| 3 | Relecture de ce découpage avant de coder |
| 4 | Architecture et « loi du dépôt » — les règles que le code doit respecter |
| 5 | Système de design — couleurs, composants, cohérence |
| 6 | Les écrans, en recherche puis conception |
| 7 | La boucle : planifier, exécuter, relire, livrer |

## Ce que ça vaut pour nous

**Ne pas prendre le pipeline entier.** Il est calibré pour reconstruire un
produit complet en partant de rien. Nos deux projets existent déjà.

**Deux morceaux valent le détour :**

**Le cimetière du PRD** (étape 1). Écrire noir sur blanc ce qu'on ne fera *pas*.
C'est le même principe que les options écartées d'un ADR, appliqué au produit.
Pour OROSE au 26 août, ça vaut de l'or : la liste de ce qui n'est pas dans le
lancement évite les trois semaines de dérive.

**La loi du dépôt** (étape 4). Les règles que le code doit respecter, écrites
une fois, relues par l'agent à chaque fois. On a ça pour les notes — le
`CLAUDE.md` — on ne l'a pas pour le code.

**Réserve honnête :** 1 h 45 de vidéo, et la méthode suppose un projet neuf, un
dépôt propre et des revues automatisées. C'est un objectif, pas une recette
pour demain.

## À faire

- [ ] Écrire le cimetière du lancement OROSE : ce qui n'est **pas** dans le
      26 août → ça va dans le coffre OROSE, pas ici
- [ ] Regarder 14:39 → 22:12 (le PRD et le cimetière) sans le reste

## Chapitres utiles

- 07:30 les trois règles de la méthode
- 14:39 le PRD : cadrage et cimetière
- 31:29 architecture et loi du dépôt

## Liens

- [[Les-ADR-la-memoire-des-decisions]]
- [[Parallele-ou-sequentiel]]
- [[Chaine-Mike-Codeur]]
