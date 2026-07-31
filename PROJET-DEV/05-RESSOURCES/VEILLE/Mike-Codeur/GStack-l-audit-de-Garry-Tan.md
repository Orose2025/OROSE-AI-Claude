---
titre: GStack, la config de Garry Tan passée au banc d'essai
type: veille
statut: a-tester
etiquettes: [dev/veille, dev/securite, dev/claude-code]
cree: 2026-07-31
maj: 2026-07-31
source: https://www.youtube.com/watch?v=f7Ztngv_ADA
duree: 16 min
priorite: 2
---

# GStack, la config de Garry Tan passée au banc d'essai

*« Le setup Claude Code que Garry Tan (YC) vient de leak »*

## De quoi il s'agit

Le patron de Y Combinator a publié sa configuration Claude Code complète : une
vingtaine de compétences et une poignée d'outils. Mike Codeur la teste sur son
vrai produit en production et donne un verdict honnête — ce qu'il garde et ce
qu'il jette.

Les quatre qu'il essaie :

| Commande | Ce qu'elle fait | Son verdict |
|---|---|---|
| `/office-hours` | challenger l'idée avant d'écrire une ligne | utile en amont |
| `/cso` | audit de sécurité complet du dépôt | **la meilleure du lot** |
| `/qa` | un vrai navigateur qui clique dans les parcours du site | impressionnant |
| `/review` + croisement | faire relire par un second modèle | bon filet |

Son conseil : ne pas tout installer, en prendre trois ou quatre si on a déjà ses
habitudes.

## Ce que ça vaut pour nous

**L'audit de sécurité, c'est notre sujet du moment.** Le 30 juillet a mis au
jour des clés éparpillées dans le coffre EOC, dont une copie oubliée de la clé
Google Play. On a rangé, on n'a jamais audité. Une commande qui passe un dépôt
au peigne fin avant une mise en ligne, c'est exactement ce qu'il faut avant le
26 août.

**Le test en navigateur** est intéressant pour la boutique : un agent qui clique
réellement dans le parcours d'achat trouve ce qu'une relecture de code ne trouve
pas.

Précaution : installer une configuration entière venue d'ailleurs, c'est
accorder sa confiance à du code qu'on n'a pas lu. On prend les commandes une par
une, en regardant ce qu'elles font.

## À faire

- [ ] Lancer un audit de sécurité sur le dépôt EOC **avant** le lancement OROSE
- [ ] Regarder 05:00 → 10:30 (l'audit et le test navigateur) sans le reste

## Liens

- [[Securiser-son-SaaS-en-agentique]]
- [[Securite-agentique]]
- [[Chaine-Mike-Codeur]]
