---
titre: ADR-0001 — Un troisième coffre pour le développement
type: decision
statut: accepte
etiquettes: [dev/decision]
cree: 2026-07-31
maj: 2026-07-31
---

# ADR-0001 — Un troisième coffre pour le développement

**Date :** 31 juillet 2026
**Statut :** accepté
**Décidé par :** Alain

## Contexte

Il existe deux coffres Obsidian, un par entreprise : `Bureau\ÉCHEC O CUBE` et
`Bureau\OROSE`. La règle posée le 30 juillet est claire : deux entreprises, deux
coffres, on ne mélange pas.

Le 31 juillet, Alain demande d'analyser une chaîne de veille technique et de
ranger le résultat quelque part. Ce contenu ne parle ni du jeu ni des
cosmétiques : il parle de *la manière de développer*. Le mettre dans l'un des
deux coffres, c'est le rendre invisible depuis l'autre — et faux dans les deux.

## Décision

Créer un troisième coffre, `PROJET-DEV`, pour tout ce qui concerne la façon de
travailler : méthodes, outils, veille, décisions techniques réutilisables.

La règle de tri : **une note va dans PROJET-DEV si elle reste vraie le jour où
ÉCHEC O CUBE et OROSE n'existent plus.**

## Options écartées

**Un dossier `DEV/` dans le coffre EOC.** Écarté : la veille technique servira
autant à OROSE. La ranger côté EOC crée exactement le mélange que la règle du
30 juillet interdit, et personne n'irait la chercher là depuis OROSE.

**Un dossier dans les deux coffres, en double.** Écarté d'office. Deux copies
d'une même note divergent en trois semaines. Et on vient de passer une nuit à
supprimer des coffres en double : recommencer volontairement serait absurde.

**Ne rien créer, tout mettre dans la boîte de réception d'EOC.** Écarté : ça
marche pour trois notes, pas pour vingt. Et ça reporte le problème.

**Un quatrième coffre plus tard, par sujet.** Écarté par avance. Trois coffres
est déjà la limite de ce qu'un humain garde en tête. Tout nouveau sujet
technique va dans PROJET-DEV, pas dans un nouveau coffre.

## Conséquences

**Bien :** la veille est au même endroit pour les deux entreprises. Les
décisions techniques ont enfin un domicile. Les deux coffres métier restent
propres.

**Moins bien :** un coffre de plus à ouvrir, et le risque de se tromper d'endroit
au moment d'écrire. C'est pour ça que la règle de tri est en tête du
`CLAUDE.md`.

**Attention :** trois coffres veut dire trois `OU-EST-QUOI` à tenir à jour. Si
l'un des trois pourrit, c'est celui-là qu'on ne consultera plus.

## Liens

- [[Les-ADR-la-memoire-des-decisions]] — d'où vient ce format
- [[CLAUDE]]
