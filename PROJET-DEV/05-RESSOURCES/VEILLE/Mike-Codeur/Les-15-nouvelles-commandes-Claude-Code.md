---
titre: Les commandes Claude Code qui valent le coup
type: veille
statut: adopte
etiquettes: [dev/veille, dev/claude-code]
cree: 2026-07-31
maj: 2026-07-31
source: https://www.youtube.com/watch?v=SxJMQrlwADY
duree: 19 min
priorite: 2
---

# Les commandes Claude Code qui valent le coup

*« J'ai testé les 15 nouvelles commandes Claude Code »*

## Les commandes présentées

| Commande | Ce qu'elle fait |
|---|---|
| `/context` | montre combien de contexte est consommé, exactement |
| `/usage` | coût et statistiques d'usage, réunis |
| `/doctor` | diagnostic complet de la configuration |
| `/btw` | poser une question de côté sans polluer la conversation |
| `/effort` | régler le curseur entre vitesse et réflexion |
| `/autofix-pr` | corriger tout seul jusqu'à ce que les tests passent |
| `/ultrareview` | revue de code par plusieurs agents |
| `/task` | des tâches avec leurs dépendances |
| `/keybindings` | raccourcis clavier personnalisés |
| `/powerup` | des leçons interactives dans le terminal |
| `/color` | changer la couleur de la barre |

## Ce que ça vaut pour nous

**Les quatre à retenir tout de suite :**

`/usage` — on n'a aucune idée de ce que coûtent nos sessions. Une commande, la
réponse.

`/doctor` — la nuit du 30 juillet a été ralentie par un problème de
configuration (un fichier de script mal lu par Windows à cause d'un accent).
`/doctor` est fait pour trouver ce genre de chose avant qu'elle morde.

`/context` — utile quand une session devient lente ou confuse : c'est souvent
que le contexte est plein.

`/btw` — pour la question de côté qu'on hésite à poser parce qu'elle va faire
dérailler la conversation en cours.

**Les autres, plus tard.** `/autofix-pr` et `/ultrareview` supposent des tests
automatisés et un flux de revue qu'on n'a pas encore.

## À faire

- [ ] Lancer `/doctor` une fois sur le poste, noter ce qui remonte
- [ ] Finir chaque session par `/usage` pendant deux semaines, voir ce que ça
      donne

## Liens

- [[Claude-Code]]
- [[Couts-et-modeles]]
- [[Le-repo-de-reference-Claude-Code]]
