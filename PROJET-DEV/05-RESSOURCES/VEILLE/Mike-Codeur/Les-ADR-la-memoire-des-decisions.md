---
titre: Les ADR, la mémoire des décisions
type: veille
statut: adopte
etiquettes: [dev/veille, dev/methode, dev/memoire]
cree: 2026-07-31
maj: 2026-07-31
source: https://www.youtube.com/watch?v=0CZtRw0KrXo
duree: 15 min
priorite: 1
---

# Les ADR, la mémoire des décisions

*« ADR : le seul truc que ton agent IA ne devinera jamais »*

## Le problème

L'agent repart de zéro à chaque session. Il repropose une approche qu'on a déjà
testée et jetée le mois dernier. Sa formule : **le code ne dit jamais les
décisions**. Il montre ce qu'on a choisi, jamais ce qu'on a refusé ni pourquoi.

Avec un humain ça se rattrape — quelqu'un se souvient. Avec un agent qui
recommence chaque matin, l'information est perdue pour de bon.

## La solution : l'ADR

Un ADR, c'est *Architecture Decision Record*. Une décision technique = un
fichier court et numéroté. Il démystifie le terme au passage : lire plutôt
**Any Decision Record**, n'importe quelle décision. Pas besoin que ce soit
grandiose.

**Le champ qui change tout : les options écartées.** Pas seulement « on a choisi
X », mais « on a regardé Y et Z, voilà pourquoi on les a écartés ». C'est ce
champ-là que l'agent lit pour ne pas reproposer Y.

Il sépare aussi deux choses : le PRD dit *ce qu'on veut construire*, l'ADR dit
*comment on a tranché et pourquoi*.

## Ce que ça vaut pour nous

**C'est la note la plus directement applicable des trente.** Les deux coffres du
Bureau ont déjà un dossier `06-DECISIONS`. Il est vide.

Et on a déjà des décisions qui auraient dû y être écrites :

- deux entreprises = deux coffres séparés
- un seul coffre ÉCHEC O CUBE, tout doublon est une copie accidentelle à
  supprimer
- ne jamais renommer un fichier référencé par un outil, documenter à la place
- les clés vivent dans `DOCUMENT OFFICIAL/CLES-ET-SECRETS/`, hors recherche

Ces quatre-là ont été prises dans la nuit du 30 juillet. Elles sont dans le
journal, noyées dans le récit de la session. Un agent qui arrive demain ne les
retrouvera pas.

## Décidé

On adopte les ADR dans les trois coffres. Gabarit : [[Modele-ADR]]. Premier
écrit : [[ADR-0001-un-troisieme-coffre-pour-le-dev]].

## À faire

- [ ] Rapatrier les quatre décisions du 30 juillet en ADR dans le coffre EOC
- [ ] Ajouter au `CLAUDE.md` des trois coffres : « une décision tranchée = un
      ADR, pas une ligne de journal »

## Chapitres utiles

- 03:40 le code ne dit jamais les décisions
- 06:35 ce qu'est un ADR
- 09:20 le champ qui change tout : les options écartées
- 10:45 PRD contre ADR, et où ça vit

## Liens

- [[Modele-ADR]]
- [[Le-systeme-memoire-d-un-agent]]
- [[Chaine-Mike-Codeur]]
