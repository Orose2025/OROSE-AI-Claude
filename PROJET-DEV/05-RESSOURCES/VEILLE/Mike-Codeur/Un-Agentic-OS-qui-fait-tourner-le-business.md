---
titre: Un système d'agents qui fait tourner le business
type: veille
statut: inspiration
etiquettes: [dev/veille, dev/methode]
cree: 2026-07-31
maj: 2026-07-31
source: https://www.youtube.com/watch?v=mlp4UN4OIGM
duree: 17 min
priorite: 3
---

# Un système d'agents qui fait tourner le business

*« Mon Agentic OS fait tourner TOUT mon business »*

## De quoi il s'agit

Il a construit un tableau de bord au-dessus de Claude Code qui pilote son
activité : agents visualisés en direct, mémoire éditable à la main, tâches
récurrentes, tableau de suivi, coûts détaillés par mission.

Un point mérite d'être retenu : il dit avoir d'abord regardé des solutions
tierces, puis être revenu à Claude Code seul **pour éviter tout appel facturé à
l'API**. Sa raison est la même que celle de
[[La-facturation-Anthropic-du-15-juin]] : dès qu'un outil extérieur pilote
l'agent, la facture change de nature.

## Ce que ça vaut pour nous

Le tableau de bord complet n'est pas pour nous. Deux briques le sont :

**Les tâches récurrentes.** Il a des routines qui se déclenchent seules — un
briefing chaque matin, une veille. On a déjà ça en germe avec la skill de tri du
courrier, mais elle est lancée à la main. C'est le premier chantier réaliste.

**Le suivi des coûts par mission.** Il voit ce que chaque tâche lui coûte. On ne
voit rien. La commande `/usage` de [[Les-15-nouvelles-commandes-Claude-Code]]
donne déjà une partie de la réponse, gratuitement.

**Réserve :** c'est un projet de développeur à temps plein qui construit son
outil de travail. Nous, on a un lancement le 26 août. À garder pour plus tard —
d'où le statut « inspiration » et pas « à faire ».

## À faire

- [ ] Faire tourner le tri du courrier tout seul, sur horaire, au lieu de le
      lancer à la main
- [ ] Prendre l'habitude de `/usage` en fin de session

## Chapitres utiles

- 03:00 l'architecture en briques
- 10:30 les missions et leurs coûts
- 12:30 les tâches récurrentes

## Liens

- [[La-facturation-Anthropic-du-15-juin]]
- [[Le-systeme-memoire-d-un-agent]]
- [[Chaine-Mike-Codeur]]
