# Déployer la nouvelle version d'Échec O Cube

Ce dossier `app/` contient la version améliorée de l'application
(zoom 50%-160% + cadran de partie), prête à publier sur Firebase Hosting.

## Modifications apportées (18 juillet 2026)
1. **Zoom** : A− descend maintenant jusqu'à 50 % (avant : minimum 100 %).
   À 50-90 %, tout le plateau est visible d'un coup. Choix mémorisé (clé eocTaille2,
   migration automatique de l'ancienne préférence).
2. **Cadran numérique EOC** : nouveau bouton « Cadran » dans les contrôles.
   Un chrono par joueur (5/10/15 min), suit le tour automatiquement,
   toucher un cadran bascule aussi manuellement, alerte rouge sous 30 s.
   Optionnel : masqué par défaut, n'impose rien à ceux qui n'en veulent pas.

## Publier (une des deux façons)
A. Depuis l'outil où l'app a été créée (Firebase Studio / Antigravity) :
   remplacer index.html par celui-ci, puis Déployer.
B. En ligne de commande (une fois connecté avec `firebase login`) :
   cd app && npx firebase-tools deploy --only hosting --project <ton-projet>
