---
titre: Les workflows dynamiques
type: veille
statut: a-connaitre
etiquettes: [dev/veille, dev/claude-code]
cree: 2026-07-31
maj: 2026-07-31
source: https://www.youtube.com/watch?v=jud40rE312E
duree: 16 min
priorite: 3
---

# Les workflows dynamiques

*« Anthropic a tué CrewAI avec Opus 4.8 + Dynamic Workflows »*

## Ce que c'est

Une manière d'orchestrer plusieurs agents directement dans Claude Code, sans
outil extérieur. Il décrit une architecture en cinq temps : on amorce, les
agents travaillent en désaccord organisé, puis on converge vers une réponse.

L'exemple qu'il cite pour montrer l'échelle : un projet de 750 000 lignes traité
en onze jours.

Il insiste sur le **« quand surtout pas »** : ce n'est pas fait pour une tâche
simple. Sortir une flotte d'agents pour corriger une faute de frappe, c'est de
l'argent jeté.

## Ce que ça vaut pour nous

À connaître pour savoir que ça existe. Pas à utiliser aujourd'hui.

Notre échelle ne le justifie pas : les deux projets tiennent dans une tête, les
dépôts sont petits. Le jour où on voudra un audit complet croisé sur tout le
site OROSE avant le 26 août, ce sera le bon outil — et à ce moment-là il faudra
le demander explicitement, en connaissant le coût.

Sa phrase de fin est la bonne façon de voir les choses : **on redevient
architecte**. On décide quoi faire faire, pas comment le faire.

## Chapitres utiles

- 04:43 ce que sont les workflows dynamiques
- 12:55 quand utiliser, et quand surtout pas

## Liens

- [[Parallele-ou-sequentiel]]
- [[Couts-et-modeles]]
- [[Chaine-Mike-Codeur]]
