# Étude design mobile — suggestions pour Échec O Cube

> Synthèse des bons principes de design d'application mobile (le type de contenu
> enseigné par des chaînes comme *Développeur Libre*), traduits en **suggestions
> concrètes** pour l'app Échec O Cube.
>
> Note d'honnêteté : YouTube bloque la lecture automatique de ses vidéos, donc ce
> document n'est pas la transcription mot à mot d'une vidéo. C'est une étude des
> **principes établis** (ergonomie, hiérarchie, lisibilité, performance) appliqués
> à ton app. Envoie-moi les points clés d'une vidéo précise et je l'intègre.

---

## Les 8 principes qui comptent (et ce qu'on en fait)

### 1. La zone du pouce (déjà appliqué)
49 % des gens jouent à une main. Les actions importantes vont **en bas**, à portée
du pouce ; le haut sert à l'information.
- **Fait** sur l'écran récompenses : bouton principal fixé en bas, cibles agrandies.
- **À faire dans le jeu** : garder les commandes de partie (placer, annuler, valider)
  dans le tiers inférieur de l'écran.

### 2. Un seul objectif par écran
Chaque écran doit avoir **une action principale évidente**. Trop de boutons = personne
ne sait quoi faire.
- **Suggestion** : sur l'écran de jeu, une seule action mise en avant à la fois
  (ex. « Valider mon coup »), le reste discret.

### 3. Hiérarchie visuelle claire
L'œil doit savoir où regarder en premier : gros titre, puis sous-texte, puis détails.
- **Suggestion** : titres de section en gras, textes secondaires en gris, un seul
  accent de couleur pour l'action. (Déjà le cas sur l'écran récompenses.)

### 4. Beaucoup d'espace (respiration)
Le vide n'est pas perdu : il rend l'app calme et facile à lire.
- **Suggestion** : ne pas remplir chaque coin. Marges généreuses autour du plateau
  et des menus.

### 5. Lisibilité avant tout
Texte assez gros (≥ 16 px pour le corps), fort contraste, éviter le gris pâle sur
blanc.
- **Suggestion** : vérifier que les scores et étiquettes du jeu restent lisibles sur
  les 5 thèmes (Bois, Chat, Néon, Érable, Océan), surtout en plein soleil.

### 6. Grosses cibles tactiles
Minimum **44–48 px** pour tout ce qui se touche. Espacer les boutons pour éviter les
fausses manip.
- **Suggestion** : sur le plateau, s'assurer que chaque case/pièce est assez grande
  au doigt, avec un léger retour visuel quand on la touche.

### 7. Retour immédiat (feedback)
Chaque action doit répondre : un bouton qui s'enfonce, une petite vibration, un message
de confirmation.
- **Fait** : messages de confirmation (« Lien copié », « Photo envoyée »).
- **Suggestion jeu** : animation légère quand une pièce se pose et quand un cube se
  ferme (la « réaction en chaîne » de ton slogan mérite d'être vue).

### 8. Chargement soigné (performance perçue)
Avant que le contenu arrive : afficher un **squelette** (shimmer) plutôt qu'un écran
blanc. Alléger les images.
- **Suggestion** : au démarrage, montrer tout de suite le plateau vide (ossature)
  pendant que les données chargent — l'app paraît plus rapide.

---

## Suggestions prioritaires pour Échec O Cube

| Priorité | Suggestion | Où |
|---|---|---|
| Haute | Commandes de jeu dans le bas de l'écran (zone du pouce) | Écran de partie |
| Haute | Une seule action principale mise en avant par écran | Partout |
| Haute | Cibles ≥ 44 px + retour visuel au toucher | Plateau |
| Moyenne | Animation « pose » et « fermeture du cube » | Écran de partie |
| Moyenne | Vérifier lisibilité des textes sur les 5 thèmes | Thèmes |
| Moyenne | Squelette de chargement au démarrage | Lancement |
| Basse | Écran d'accueil avec 1 message clair + 1 bouton « Jouer » | Accueil |

---

## Bon réflexe à garder

Continue d'envoyer des exemples d'apps que tu trouves belles ou des vidéos qui
t'inspirent. À chaque fois, on en tire **1 ou 2 idées applicables** et on les teste
sur ton app — c'est comme ça qu'un design s'améliore, petit à petit, avant de
« couler dans le béton ».

---

## Sources consultées

- *7 ASTUCES pour créer un design magnifique d'application mobile* — Développeur Libre
  (YouTube) : https://www.youtube.com/watch?v=t2ikO9jvB3M
- Design d'application mobile, le guide complet — codeur.com :
  https://www.codeur.com/blog/design-application-mobile/
- Le guide ultime du design d'application — 99designs :
  https://99designs.com/blog/web-digital/how-to-design-an-app/
