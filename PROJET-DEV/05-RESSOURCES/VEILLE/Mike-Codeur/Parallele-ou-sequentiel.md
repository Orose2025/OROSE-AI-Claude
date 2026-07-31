---
titre: Parallèle ou séquentiel
type: veille
statut: adopte
etiquettes: [dev/veille, dev/methode]
cree: 2026-07-31
maj: 2026-07-31
source: https://www.youtube.com/watch?v=yNZeBi2Y-9k
duree: 12 min
priorite: 2
---

# Parallèle ou séquentiel

*« Agents IA parallèle vs séquentiel : l'erreur à ne pas commettre »*

## Le propos

Tout le monde pousse au parallèle : lancez cinq agents, allez cinq fois plus
vite. Il raconte le contraire — deux heures perdues avec trois agents lancés
ensemble sur le même projet neuf. Ils se sont marchés dessus.

Sa formule de fin : **le bon développeur sait quand, pas combien.**

## La règle des trois axes

Avant de lancer plusieurs agents en même temps, vérifier trois choses :

| Axe | La question | Si la réponse est oui |
|---|---|---|
| **Fichiers** | vont-ils toucher les mêmes fichiers ? | séquentiel |
| **Dépendances** | le travail de l'un attend-il celui de l'autre ? | séquentiel |
| **État partagé** | partagent-ils une base, une config, un jeu de types ? | séquentiel |

Trois « non » → parallèle sans risque. Un seul « oui » → en file, l'un après
l'autre.

## Ce que ça vaut pour nous

Direct et applicable. Nos deux projets sont des cas d'école :

- **EOC et OROSE en parallèle : oui.** Deux dépôts, deux coffres, rien de
  commun. Aucun des trois axes ne se croise.
- **Deux agents sur le site OROSE en même temps : non.** Même dépôt, mêmes
  fichiers de configuration, même feuille de style. C'est exactement le cas qui
  lui a coûté deux heures.

Il mentionne les *worktrees* comme contournement propre : chaque agent travaille
dans sa propre copie du dépôt. C'est ce qu'il faut demander explicitement si un
jour on veut vraiment paralléliser sur un même projet.

## Décidé

Règle du coffre : **un seul agent par dépôt à la fois.** Le parallèle est
réservé à deux projets qui ne se touchent pas.

## Chapitres utiles

- 04:00 la règle des trois axes
- 06:00 la matrice de décision en dix secondes
- 07:30 les cinq façons dont le parallèle échoue

## Liens

- [[Agent-View-le-multi-agent-natif]]
- [[Claude-Code]]
- [[Chaine-Mike-Codeur]]
