---
titre: Le système mémoire d'un agent
type: veille
statut: lu
etiquettes: [dev/veille, dev/memoire]
cree: 2026-07-31
maj: 2026-07-31
source: https://www.youtube.com/watch?v=oudywvjPCls
priorite: 1
---

# Le système mémoire d'un agent

*« Le système MEMOIRE derrière un Agentic OS »*

## L'idée centrale

Il n'y a pas *une* mémoire d'IA, il y en a trois, et on les confond tout le
temps :

**Stockage** — où vit l'information. Le fichier `CLAUDE.md`, la mémoire
automatique de l'outil, un coffre Obsidian.

**Rappel** — comment l'agent retrouve la bonne information au bon moment.
Recherche par mot, index, ou recherche par similarité de sens.

**Consolidation** — comment la mémoire se nettoie et mûrit. Sans ça, elle
grossit jusqu'à devenir inutilisable.

Son point le plus utile : **la recherche par similarité ne suffit pas**. Elle
ramène ce qui *ressemble* à la question, pas ce qui *répond* à la question. Une
décision tranchée il y a trois mois ne « ressemble » à rien — elle ne remonte
jamais. D'où les ADR.

## Ce que ça vaut pour nous

C'est le diagnostic de notre situation actuelle, poste par poste :

| Étage | Où on en est |
|---|---|
| Stockage | **fait.** Deux coffres, deux `CLAUDE.md`, des inventaires complets. |
| Rappel | **à moitié.** `OU-EST-QUOI` et les alias marchent bien. Mais je relis encore beaucoup de fichiers entiers. |
| Consolidation | **rien.** Aucune note n'est jamais nettoyée. Le journal grossit d'une note par jour, pour toujours. |

La consolidation est le trou. Concrètement : dans un an, `02-JOURNAL/2026/`
contiendra 200 notes et plus personne ne les lira. Il faut prévoir un résumé
mensuel qui remonte l'essentiel et laisse le détail derrière.

## À faire

- [ ] Ajouter une note de synthèse mensuelle dans les trois coffres — une page
      par mois qui dit ce qui a été décidé et ce qui reste ouvert
- [ ] Vérifier que `99-ARCHIVES` sert vraiment : une note morte doit y aller,
      pas rester dans le flux

## Chapitres utiles

- 02:35 stockage : `CLAUDE.md`, mémoire automatique, Obsidian
- 08:25 pourquoi la recherche par similarité ne suffit pas
- 10:35 la consolidation

## Liens

- [[Obsidian-memoire-partagee-des-agents]]
- [[Les-ADR-la-memoire-des-decisions]] — la réponse au trou de mémoire des décisions
- [[Memoire-et-contexte]]
