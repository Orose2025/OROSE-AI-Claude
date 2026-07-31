---
titre: Le dépôt de référence Claude Code
type: veille
statut: a-regarder
etiquettes: [dev/veille, dev/claude-code]
cree: 2026-07-31
maj: 2026-07-31
source: https://www.youtube.com/watch?v=j1JDl_As-dY
duree: 45 min
priorite: 2
---

# Le dépôt de référence Claude Code

*« Ce repo te met 6 mois d'avance sur 90 % des devs »*

## De quoi il s'agit

Un dépôt GitHub qui récapitule tout l'usage avancé de Claude Code, partagé par
le créateur de l'outil chez Anthropic. La vidéo en fait le tour en 45 minutes.

## Les briques passées en revue

| Brique | À quoi ça sert |
|---|---|
| **Commandes personnalisées** | une tâche répétitive devient `/ma-commande` |
| **Skills** | un dossier d'instructions que l'agent charge quand le sujet tombe |
| **Sous-agents** | déléguer un morceau de travail en parallèle |
| **Hooks** | du code qui se déclenche automatiquement à un moment précis |
| **Rules** | les règles que l'agent ne doit pas enfreindre |
| **MCP** | brancher l'agent sur des services extérieurs |
| **Cross-modèle** | faire relire le travail d'un modèle par un autre |

Et la méthode en cinq temps qui revient dans toute la chaîne :
**Recherche → Plan → Exécution → Revue → Livraison**.

## Ce que ça vaut pour nous

On en utilise déjà trois sans les avoir nommées :

- **un hook** : le crochet de fin de session installé le 30 juillet, qui vérifie
  que le journal du jour a été écrit
- **des skills** : celle du tri du courrier, celle de l'analyse OROSE
- **MCP** : Gmail, Drive, Shopify, GitHub sont déjà branchés

Ce qu'on n'utilise pas et qui vaudrait le coup : **les commandes
personnalisées**. Chaque semaine, on refait les mêmes demandes à la main. Une
commande `/journal-du-jour` ou `/audit-avant-lancement` supprimerait la
répétition.

La méthode en cinq temps mérite d'être écrite dans les `CLAUDE.md` : c'est
exactement l'ordre qu'on suit déjà en désordre.

## À faire

- [ ] Regarder les 45 minutes en une fois, avec de quoi noter
- [ ] Lister les 3 demandes qu'on répète le plus souvent → les transformer en
      commandes personnalisées
- [ ] Écrire la méthode Recherche → Plan → Exécution → Revue → Livraison dans
      [[Claude-Code]]

## Liens

- [[Claude-Code]]
- [[Les-15-nouvelles-commandes-Claude-Code]]
- [[Chaine-Mike-Codeur]]
