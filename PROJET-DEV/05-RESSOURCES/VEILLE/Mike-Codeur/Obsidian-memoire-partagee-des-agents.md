---
titre: Obsidian comme mémoire partagée des agents
type: veille
statut: a-tester
etiquettes: [dev/veille, dev/memoire, dev/obsidian]
cree: 2026-07-31
maj: 2026-07-31
source: https://www.youtube.com/watch?v=3RuzdZZQ8no
duree: 13 min
priorite: 1
---

# Obsidian comme mémoire partagée des agents

*« J'ai branché tous mes agents IA sur le même Obsidian (Graphify) »*

## Le problème qu'il décrit

Il utilise plusieurs assistants. Chacun a sa propre mémoire, dans son propre
format. Changer d'outil, c'est repartir de zéro. Cinq agents, cinq mémoires
isolées.

## Sa réponse en deux couches

**Couche 1 — Obsidian, la mémoire humaine.** Des fichiers Markdown dans un
dossier. Sa formule : *« ta mémoire ne vit pas dans l'outil »* — le principe du
fichier plutôt que de l'application. Si l'outil disparaît, les notes restent.

**Couche 2 — Graphify, un graphe interrogeable.** Un index construit à partir
des notes, que l'agent questionne au lieu de relire les fichiers un par un. Le
chiffre qu'il annonce : une question qui coûtait 20 000 unités de contexte en
coûte environ 280.

Puis un enchaînement en trois temps quand l'agent cherche quelque chose :
**graphe → index → fichier**. Il ne lit le fichier complet qu'en dernier
recours.

## Ce que ça vaut pour nous

**On a déjà fait la couche 1, sans le savoir.** Les deux coffres du Bureau, avec
leur `CLAUDE.md`, leurs inventaires et leur note `OU-EST-QUOI`, sont exactement
ça : une mémoire en fichiers, lisible par Alain comme par n'importe quelle IA.
La décision du 30 juillet — *« les fichiers restent où ils sont, ce sont les
notes qui savent »* — est le même principe, formulé autrement.

**La couche 2, on ne l'a pas.** Aujourd'hui, quand je cherche quelque chose dans
le coffre EOC, je relis les notes d'inventaire en entier. Ça marche parce qu'il
n'y a que 554 fichiers. Ça coûtera cher quand il y en aura trois fois plus.

Nuance honnête : Graphify est un outil tiers, jeune, et l'installer sur les
trois coffres est un engagement. La note `OU-EST-QUOI` fait déjà 80 % du travail
pour 0 % du risque.

## À faire

- [ ] Regarder la vidéo en entier (13 min), surtout 11:30 — l'enchaînement
      graphe → index → fichier
- [ ] Décider si on installe Graphify → ça mérite un ADR, pas une décision de
      couloir
- [ ] En attendant : garder `OU-EST-QUOI` à jour dans les trois coffres. C'est
      notre index, et il est gratuit.

## Chapitres utiles

- 02:00 la philosophie : le fichier plutôt que l'application
- 03:20 Obsidian comme mémoire humaine
- 06:30 pourquoi un graphe économise le contexte
- 11:30 l'enchaînement graphe → index → fichier

## Liens

- [[Le-systeme-memoire-d-un-agent]] — la théorie derrière
- [[Memoire-et-contexte]] — notre domaine
- [[Chaine-Mike-Codeur]]
