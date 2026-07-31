---
titre: Claude Code
type: domaine
statut: actif
etiquettes: [dev/claude-code]
cree: 2026-07-31
maj: 2026-07-31
alias: [L'outil, Claude Code]
---

# Claude Code

L'outil avec lequel tout est fait. Cette note dit comment on s'en sert, pas ce
qu'il sait faire en général.

## La méthode en cinq temps

Reprise du [[Le-repo-de-reference-Claude-Code]]. C'est l'ordre qu'on suivait
déjà, en désordre :

1. **Recherche** — comprendre avant de toucher. Lire les fichiers, poser les
   questions.
2. **Plan** — dire ce qu'on va faire, avant de le faire.
3. **Exécution** — écrire.
4. **Revue** — relire, si possible avec un regard différent.
5. **Livraison** — pousser, et écrire ce qui a été fait.

Le pas le plus souvent sauté est le 2. C'est aussi celui qui coûte le moins
cher et rapporte le plus.

## Les commandes qu'on utilise

| Commande | Quand |
|---|---|
| `/usage` | en fin de session, pour savoir ce que ça a coûté |
| `/doctor` | quand quelque chose se comporte bizarrement |
| `/context` | quand la session devient lente ou confuse |
| `/btw` | question de côté, sans faire dérailler le sujet |
| `/effort` | régler vitesse contre réflexion selon la phase |

Détail dans [[Les-15-nouvelles-commandes-Claude-Code]].

## Ce qu'on a déjà installé

| Brique | Où | Ce qu'elle fait |
|---|---|---|
| Crochet de fin de session | `.claude/` des coffres EOC et OROSE | vérifie que le journal du jour est écrit |
| Skill tri du courrier | plugin | classe les courriels, sépare EOC et personnel |
| Skill analyse OROSE | plugin | rapport quotidien sur les dossiers OROSE |
| Connecteurs | Gmail, Drive, Agenda, Shopify, GitHub, Figma | accès direct aux services |

## Les règles du poste

- **Un seul agent par dépôt à la fois.** Le parallèle est réservé à deux projets
  qui ne se touchent pas — voir [[Parallele-ou-sequentiel]].
- **Windows, pas Linux.** Une bonne partie de ce qui se dit en ligne suppose un
  Mac ou un serveur Linux. Vérifier avant d'installer.
- **Attention aux accents dans les scripts.** Le 30 juillet, un `É` dans un
  chemin a cassé un script PowerShell — le fichier était lu dans le mauvais
  encodage. Le caractère est maintenant construit par code.

## À creuser

- [ ] Transformer les trois demandes les plus répétées en commandes
      personnalisées
- [ ] Écrire une « loi du dépôt » pour le code, comme le `CLAUDE.md` en est une
      pour les notes

## Liens

- [[Le-repo-de-reference-Claude-Code]]
- [[Memoire-et-contexte]]
- [[Couts-et-modeles]]
