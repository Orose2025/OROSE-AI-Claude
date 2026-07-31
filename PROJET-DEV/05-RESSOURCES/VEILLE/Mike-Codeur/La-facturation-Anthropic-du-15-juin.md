---
titre: Le piège de facturation du 15 juin
type: veille
statut: lu
etiquettes: [dev/veille, dev/couts]
cree: 2026-07-31
maj: 2026-07-31
source: https://www.youtube.com/watch?v=eq1BHKRqW4A
duree: 15 min
priorite: 2
---

# Le piège de facturation du 15 juin

*« La solution pour ne pas être surfacturé après le 15 juin »*

## Le fait

Depuis le 15 juin 2026, Anthropic sépare deux façons de payer : ce qui passe par
l'abonnement, et ce qui passe par l'API, facturée à l'usage. Son accroche : une
facture de 1 800 $ que personne n'avait vue venir.

La cause : certaines façons de lancer Claude Code automatiquement — sans
terminal, depuis un script — ne comptent plus dans l'abonnement. Elles tapent
l'API plein tarif. Le même travail, fait à la main dans le terminal, ne coûte
rien de plus.

Sa parade technique consiste à faire croire à l'outil qu'il tourne dans un vrai
terminal. Il reconnaît lui-même les limites de l'astuce.

## Ce que ça vaut pour nous

**Ce n'est pas un problème aujourd'hui, ça le devient dès qu'on automatise.**

Tant qu'Alain travaille en conversation, tout est dans l'abonnement. Mais deux
choses sur la table changeraient ça :

- faire tourner le tri du courrier tout seul sur horaire
- un audit de sécurité automatique sur le dépôt

Ce sont exactement les cas qui basculent du côté facturé.

**La règle à retenir** : avant d'automatiser quoi que ce soit, poser la question
« est-ce que ça passe par l'abonnement ou par l'API ? » et vérifier avec
`/usage` après le premier tour. Une facture surprise à trois chiffres, à trois
semaines d'un lancement, c'est le genre de chose qui fait mal.

Il reste que la vidéo date de deux mois et que les conditions bougent vite. Le
principe tient, les détails sont à revérifier au moment de s'en servir.

## À faire

- [ ] Avant toute automatisation : vérifier le mode de facturation, puis
      contrôler avec `/usage`

## Liens

- [[Couts-et-modeles]]
- [[Un-Agentic-OS-qui-fait-tourner-le-business]]
- [[Les-15-nouvelles-commandes-Claude-Code]]
