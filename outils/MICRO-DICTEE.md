# Micro / dictée qui ne fonctionne plus

Marche à suivre quand le micro de l'app Claude cesse de fonctionner alors que rien n'a été
modifié. Dans la quasi-totalité des cas, c'est une autorisation qui a été réinitialisée par une
mise à jour du navigateur ou du système, pas une panne matérielle.

## Étape 0 — Isoler la panne

Ouvre `outils/test-micro.html` dans le **même navigateur** que celui où la dictée ne marche
plus (double-clic sur le fichier suffit), puis lance le test.

- La barre bouge quand tu parles → le micro, les pilotes et le navigateur vont bien.
  La panne est côté app Claude : passe à l'étape 1.
- La barre ne bouge pas, ou une erreur s'affiche → la panne est côté navigateur ou système :
  passe directement à l'étape 2. La page indique l'erreur exacte et quoi faire.

## Étape 1 — Autorisation du site

Sur `claude.ai` : clique sur le cadenas (ou l'icône de réglages) à gauche de la barre
d'adresse → **Microphone** → **Autoriser**, puis recharge la page.

Si l'entrée « Microphone » est absente, c'est que le site n'a jamais eu à la demander depuis la
réinitialisation : lance la dictée une fois, la demande d'autorisation réapparaîtra.

## Étape 2 — Autorisation du système

Le navigateur lui-même doit avoir le droit d'utiliser le micro.

- **macOS** : Réglages → Confidentialité et sécurité → Microphone → active le navigateur.
  Une mise à jour de macOS réinitialise régulièrement cette liste.
- **Windows** : Paramètres → Confidentialité et sécurité → Microphone → active
  « Autoriser les applications de bureau à accéder à votre micro ».
- **iOS / Android** : Réglages → Applications → Claude → Microphone.

Après un changement ici, **quitte complètement le navigateur et relance-le** : l'autorisation
n'est relue qu'au démarrage.

## Étape 3 — Périphérique et conflits

- Une autre application peut monopoliser le micro : Zoom, Teams, Meet, Discord, OBS.
  Ferme-la entièrement (pas seulement la fenêtre) et réessaie.
- Un casque Bluetooth connecté devient le micro par défaut, même hors de portée.
  Vérifie le périphérique d'entrée sélectionné dans les réglages du système.
- Une extension de blocage (uBlock, Privacy Badger, boucliers Brave) peut couper l'accès :
  teste en navigation privée avec les extensions désactivées.

## Étape 4 — Si rien ne débloque

Teste `claude.ai` dans un autre navigateur (Chrome, Edge, Safari). Si le micro y fonctionne, le
profil du navigateur d'origine est en cause : vider les données du site pour `claude.ai` remet
les autorisations à zéro et force une nouvelle demande.
