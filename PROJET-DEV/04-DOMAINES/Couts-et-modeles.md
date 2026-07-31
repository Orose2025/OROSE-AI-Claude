---
titre: Coûts et choix de modèle
type: domaine
statut: actif
etiquettes: [dev/couts]
cree: 2026-07-31
maj: 2026-07-31
alias: [Combien ça coûte, Les coûts]
---

# Coûts et choix de modèle

## Le principe à ne pas oublier

Il y a deux façons de payer : **l'abonnement** et **l'usage facturé à l'appel**.
Le même travail peut relever de l'un ou de l'autre selon la manière dont il est
lancé.

Travailler en conversation, comme aujourd'hui, reste dans l'abonnement.
Automatiser — faire tourner quelque chose tout seul, sur horaire, sans personne
devant l'écran — peut basculer du côté facturé sans prévenir.

Détail dans [[La-facturation-Anthropic-du-15-juin]].

## La règle du coffre

**Avant d'automatiser quoi que ce soit :** vérifier de quel côté ça tombe, puis
contrôler avec `/usage` après le premier tour. Une facture surprise à trois
semaines d'un lancement, ce n'est pas le moment.

## Quel modèle pour quelle phase

D'après [[Opus-5-contre-Fable-5]], en laissant de côté les noms qui changent tous
les mois :

| Phase | Ce qu'on veut |
|---|---|
| explorer, réfléchir, décider | le plus solide — on paie pour le raisonnement |
| écrire du code répétitif | le rapide suffit |
| relire, auditer | le solide, et si possible un second regard pour croiser |

C'est le sens de la commande `/effort` : régler le curseur selon la phase, au
lieu de tout faire au maximum.

## Ce qu'on ne sait pas

On ne mesure rien aujourd'hui. Premier pas : finir chaque session par `/usage`
pendant deux semaines et noter. On décidera après, avec des chiffres.

## Liens

- [[La-facturation-Anthropic-du-15-juin]]
- [[Opus-5-contre-Fable-5]]
- [[Les-15-nouvelles-commandes-Claude-Code]]
