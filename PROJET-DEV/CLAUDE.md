# Coffre PROJET-DEV — manuel

Ce coffre est le troisième d'Alain Dupont. Il ne remplace ni ne double les deux
autres.

| Coffre | Ce qu'il contient |
|---|---|
| `Bureau\ÉCHEC O CUBE` | tout le jeu, la Fédération, l'application, la boutique |
| `Bureau\OROSE` | la marque de cosmétiques, le lancement du 26 août 2026 |
| `Bureau\PROJET-DEV` | **ici** : la manière de développer, pas ce qu'on développe |

## La règle qui décide où va une note

Une note va dans PROJET-DEV si elle reste vraie le jour où ÉCHEC O CUBE et OROSE
n'existent plus : une méthode, un outil, une commande, une décision technique
réutilisable, une veille.

Une note qui parle d'un prix, d'un client, d'une recette, d'une règle du jeu ou
d'une date de lancement n'a rien à faire ici. Elle va dans le coffre de son
entreprise.

En cas de doute : est-ce que je réutiliserais ça sur un projet complètement
différent ? Oui → PROJET-DEV. Non → l'autre coffre.

## Les dossiers

| Dossier | Contenu |
|---|---|
| `00-ACCUEIL` | le tableau de bord et l'index. Point d'entrée. |
| `01-BOITE-DE-RECEPTION` | ce qui arrive et qu'on n'a pas encore rangé |
| `02-JOURNAL` | une note par jour de travail, rangée par année |
| `03-PROJETS` | un projet = une note, avec un début et une fin |
| `04-DOMAINES` | les sujets permanents : Claude Code, mémoire, sécurité, coûts |
| `05-RESSOURCES` | la veille et la documentation. `VEILLE/` par source. |
| `06-DECISIONS` | les ADR : une décision technique = un fichier numéroté |
| `07-MODELES` | les gabarits de notes |
| `99-ARCHIVES` | ce qui est mort mais qu'on garde |

## Comment j'écris ici

- Français, phrases courtes, pas de jargon inutile. Alain n'est pas développeur
  de métier : une note qu'il ne comprend pas est une note ratée.
- Un fichier = une idée. Les liens entre doubles crochets font le reste.
- Toute note porte un en-tête `titre / type / statut / etiquettes / cree / maj`.
- Je ne renomme jamais un fichier référencé par un script ou une tâche
  planifiée : je documente au lieu de renommer.

## Les décisions (ADR)

Chaque fois qu'on tranche une question technique, on écrit un ADR dans
`06-DECISIONS`, à partir de `07-MODELES/Modele-ADR.md`. Le champ important est
**les options écartées** : c'est ce qui empêche un agent IA — ou moi dans trois
mois — de reproposer une piste déjà testée et jetée.

Voir [[ADR-0001-un-troisieme-coffre-pour-le-dev]].

## Fin de session

Comme dans les deux autres coffres : avant de terminer, j'écris la note du jour
dans `02-JOURNAL/2026/` avec objectif, fait, décidé, bloqué, prochain pas.
