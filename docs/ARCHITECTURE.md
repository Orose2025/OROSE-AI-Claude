# Comment la bascule reste invisible

## Le principe

Une seule règle gouverne le code : **l'utilisateur ne doit jamais apprendre
quelle source d'IA lui a répondu.** Tout le reste en découle.

- L'interface appelle `askAldup()` et reçoit du texte. Rien d'autre.
- Le nom de la source (`providerId`) existe dans le routeur, dans les logs et
  dans les métriques — jamais dans un composant React ni dans une réponse HTTP
  destinée au navigateur.
- Le *system prompt* interdit explicitement au modèle de se nommer.
- La passerelle serveur renvoie toujours `"model": "aldup"`.

## L'ordre d'essai

`AIRouter.orderCandidates()` construit la file à chaque requête :

1. les sources **configurées** (une source à clé sans clé est ignorée) ;
2. d'abord celles qui sont **disponibles**, par ordre de priorité ;
3. puis celles **au repos**, de la plus proche du réveil à la plus lointaine.

Le troisième point est délibéré : mieux vaut déranger une source fatiguée que
de laisser l'utilisateur sans réponse.

## Le disjoncteur

Quand une source échoue, `HealthRegistry` la met au repos. La durée dépend de
la raison et double à chaque échec consécutif, plafonnée à une heure :

| Raison | Repos de base |
|--------|---------------|
| `quota` (429, crédits épuisés) | 10 min |
| `refused` (clé invalide, modèle retiré) | 30 min |
| `down` (5xx, réseau) | 1 min |
| `timeout` | 30 s |
| `empty` (réponse illisible) | 20 s |

Un header `Retry-After` plus long que le calcul l'emporte. Un succès efface le
compteur d'échecs de la source.

## Les délais

Deux chronomètres, pas un seul :

- **premier fragment** (12 s) — une source qui ne commence pas à écrire est
  abandonnée vite, avant que l'utilisateur ne s'impatiente ;
- **inactivité** (45 s) — réarmé à chaque fragment reçu, il coupe une source
  qui s'est figée en plein milieu.

## La bascule en cours de réponse

Le cas délicat : une source écrit trois phrases puis meurt. Le routeur passe à
la suivante et lui demande de repartir de zéro. Le premier fragment de la
nouvelle source porte alors `reset: true`, et l'interface remplace le contenu de
la bulle au lieu d'y ajouter la suite. Visuellement, la réponse se réécrit —
aucun message d'erreur, aucune mention d'un changement de source.

Ce signal traverse aussi la passerelle : quand elle bascule côté serveur, elle
émet `{ delta: { content: '', reset: true } }` dans le flux SSE, et le
parseur client vide ce qu'il avait accumulé.

## L'annulation

Une annulation de l'utilisateur (bouton stop) n'est **pas** un échec de source :
le routeur lève `CancelledError` sans basculer ni pénaliser la source en cours.
Sans cette distinction, chaque arrêt volontaire ferait défiler toute la chaîne
de secours pour rien.

## Où vivent les clés

Les sources à clé ne sont jamais instanciées côté navigateur : `browserProviders()`
ne renvoie que les sources sans clé. Les sources à clé passent par
`functions/router.mjs`, qui lit `process.env` alimenté par les secrets Firebase.
Le navigateur, lui, voit la passerelle comme une source ordinaire — la première
de la liste — et retombe sur les sources sans clé si elle est absente ou en panne.
