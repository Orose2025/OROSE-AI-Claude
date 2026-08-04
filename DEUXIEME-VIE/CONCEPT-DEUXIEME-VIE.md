# Deuxième Vie — concept et première tranche jouable

**Auteur de l'idée :** Alain Dupont
**Origine :** quatre feuilles manuscrites (croquis du village + trois pages de texte)
**Décision du 3 août 2026 :** le décor est arrêté — *réaliste futuriste mélangé à la naissance
du Moyen Âge*.
**État :** concept arrêté, tranche verticale jouable livrée dans `prototype/`.

---

## 1. Le jeu en une phrase

Des naufragés d'une civilisation avancée s'écrasent sur une planète vierge, perdent toute
leur énergie, et doivent tout recommencer avec les moyens du Moyen Âge naissant — sauf
qu'ils ont encore, dans la carcasse du vaisseau, quelques morceaux d'un futur que personne
ne saura jamais refaire.

Pas de guerre. Pas de bagarre. Ce qui remplace le combat, c'est le voisinage, l'amitié,
le commerce et l'amour.

---

## 2. L'univers : le mélange

C'est la décision qui rend le jeu reconnaissable au premier coup d'œil. Elle tient dans
une seule règle, et cette règle vaut pour le décor, les objets, les sons et les costumes :

> **Tout ce qui vient de la planète est médiéval.
> Tout ce qui vient de l'épave est futuriste.
> Rien ne mélange les deux sans passer par l'atelier.**

C'est ça qui donne la signature visuelle : une charrette en chêne dont l'essieu est un
tube d'alliage. Une forge de pierre chauffée par une cellule d'énergie. Une lanterne à
diode montée sur un manche taillé au couteau. Un moulin à eau avec un roulement volé au
train d'atterrissage.

### La fiction de départ

An 2387. Le vaisseau-arche **Deuxième Vie** transportait des colons vers une planète
habitable. Il s'écrase. Les réacteurs meurent, les batteries se vident, les imprimantes
moléculaires n'ont plus de matière. Les survivants se réveillent avec : une planète
généreuse, deux mains, et une épave qui ne redonnera jamais deux fois la même chose.

Ce n'est donc pas une copie de l'Empire romain ni un décor de château fort. C'est
**l'humanité qui recommence son Moyen Âge, en se souvenant du futur.** Le joueur sait
ce qu'est un moteur — il n'a simplement plus de quoi en faire un.

### Les cinq âges

| Âge | Ce que le joueur fait | Le mélange |
|---|---|---|
| 1. Le Naufrage | Survivre : bois, baies, eau, feu | Il fouille encore l'épave |
| 2. Le Feu | Cabane, potager, premiers outils | Une lame d'alliage sur un manche de bois |
| 3. Le Village | Voisins, marché, métiers | Un puits, une cloche, une lanterne à diode |
| 4. La Forge | Pierre, métal, atelier, moulin | La forge tourne à la cellule d'énergie |
| 5. La Renaissance hybride | Le village devient une petite ville | Des machines de bois qui pensent |

L'épave est une ressource **finie**. Il n'y a pas de deuxième vaisseau. C'est ce qui
empêche le jeu de glisser vers la science-fiction : plus on avance, plus le futur
s'épuise et plus le savoir-faire médiéval compte.

---

## 3. Ce qui remplace la guerre

C'est le cœur de l'idée d'Alain, et c'est ce qui distingue le jeu des autres jeux de
survie. On ne retire pas le conflit, on le déplace :

- **Le voisinage.** Un autre joueur bâtit trop près, coupe ton bois, ouvre le même
  commerce que toi. La tension est réelle, la réponse n'est jamais la violence.
- **Le commerce.** La demande est finie (section 5). Un commerce de trop et quelqu'un
  ferme.
- **La réputation.** Ce que le village pense de toi ouvre ou ferme des portes.
- **La relation.** Amitié, voisinage, amour. C'est la vraie progression longue du jeu.

Un joueur ne peut jamais détruire ce qu'un autre a bâti. C'est une règle dure et elle
ne doit jamais bouger : c'est elle qui rend le monde vivable sans modération constante.

---

## 4. Les trois piliers de jeu

1. **Survivre et bâtir** — récolter, cuisiner, dormir, construire. C'est ce que le
   joueur fait avec ses mains.
2. **Commercer** — vendre au marché, acheter des outils, payer un droit de commerce,
   ouvrir son étal. C'est ce que le joueur fait avec sa tête.
3. **Lier** — parler, offrir, aider, aimer. C'est ce que le joueur fait avec son cœur,
   et c'est ce qui le fait revenir demain.

Un joueur qui n'aime que le pilier 1 a un jeu de survie honnête. Un joueur qui aime les
trois a une deuxième vie.

---

## 5. L'économie à demande limitée

**C'est la meilleure idée des quatre feuilles.** Presque aucun jeu n'ose ça : dans la
plupart, on peut vendre 10 000 bois au même prix. Ici non.

Chaque ressource a un **appétit du marché** — une quantité que le village veut bien
acheter aujourd'hui. Plus tu vends, plus le prix descend. À zéro, plus personne n'en
veut : reviens demain.

La formule utilisée dans le prototype :

```
prix = prix_de_base × (0,25 + 0,75 × (demande_restante / demande_totale) ^ 0,7)
```

- Le plancher à 25 % évite que le prix tombe à zéro et décourage.
- L'exposant 0,7 fait chuter le prix vite au début, doucement ensuite : le joueur *sent*
  la saturation avant qu'elle ne soit totale.
- La demande se refait pendant la nuit (+55 % au réveil, +35 % au passage naturel du jour).

Ce que ça produit, testé dans le prototype : le bois passe de **6 or à 3 or** en une
vingtaine de ventes, puis le marché ferme. Le joueur comprend en une minute, sans
tutoriel, qu'il doit **diversifier ou attendre**.

C'est aussi ce qui donne son sens à la phrase d'Alain : *s'il y a trop de commerce, les
ventes seront rares et la fermeture pour certains joueurs.* Le jour où le jeu est
multijoueur, cette même formule fait que deux marchands du même bois se nuisent
réellement. C'est la meilleure machine à conversation entre joueurs qu'on puisse mettre
dans ce jeu.

---

## 6. Monétisation

### Ce qui reste vrai des quatre feuilles

- Le jeu est **gratuit** pour tout le monde.
- Sans payer, la vie est plus dure et l'avancement plus lent — jamais bloqué.
- On vend : des pièces d'or, des outils, des droits de commerce, l'embellissement de
  l'avatar et de la maison.

### Le barème de pièces, corrigé

Le barème des feuilles (1 $ = 10, 5 $ = 60, 10 $ = 130) donne 10, 12 et 13 pièces par
dollar. Un joueur ne monte pas de palier pour 30 % de plus — il achète le plus petit et
recommence. Il faut creuser la courbe :

| Prix | Pièces | Par dollar | Bonus |
|---|---|---|---|
| 1,99 $ | 20 | 10,0 | — |
| 4,99 $ | 55 | 11,0 | +10 % |
| 9,99 $ | 130 | 13,0 | +30 % |
| 24,99 $ | 375 | 15,0 | +50 % |
| 49,99 $ | 850 | 17,0 | +70 % |

Le gros palier doit être **visiblement** le meilleur marché. C'est là que se fait le
chiffre d'affaires dans tous les jeux de ce type.

Note : sur l'App Store et Google Play, la plateforme prend 30 %. Sur le web, un
processeur ordinaire prend environ 3 %. Le même achat rapporte donc près de 40 % de plus
s'il est fait depuis un navigateur. Ça oriente le premier lancement : **le web d'abord.**

### Ce qu'on ne vend jamais

Ni la puissance, ni le terrain, ni l'avantage en commerce sur un autre joueur. On vend du
temps gagné et de la beauté. Le jour où un joueur peut acheter la faillite d'un voisin,
le jeu est mort.

---

## 7. Le contenu adulte — décision en attente

Alain n'a pas encore tranché. J'ai donc bâti tout ce qui précède de façon à ce que la
décision **n'invalide rien** :

- Ce qui est livré aujourd'hui est **classé 17+** : la romance est présente, montée par
  paliers (amitié → complicité → attachement), et rien d'explicite n'est montré.
- Publiable et annonçable partout, encaissable par un processeur ordinaire.
- Une extension adulte séparée, sur le web, reste possible plus tard — sans rien
  reprendre du travail fait.

Les faits qui n'ont pas changé depuis mon analyse : les magasins d'applications
interdisent la pornographie sans exception ; Stripe, PayPal et Shopify Payments refusent
le contenu adulte (10 à 15 % de frais chez un processeur spécialisé au lieu de 2,9 %) ;
aucune publicité possible sur Facebook, Google ou TikTok. Et la marque Échec O Cube, qui
s'adresse aux familles et aux écoles, ne doit jamais pouvoir être reliée à ce projet :
entité séparée, marque séparée, site séparé.

---

## 8. La tranche verticale livrée

`prototype/index.html` — un seul fichier, aucune dépendance, s'ouvre dans n'importe quel
navigateur. Environ dix minutes de jeu.

### Ce qui est jouable

- Une île générée toujours identique, avec l'épave de l'arche au centre.
- Cinq ressources : bois, pierre, fibre, vivres, **fragments de technologie** (l'épave).
- Récolte, faim, énergie, cycle jour/nuit avec vraie obscurité et lumières du feu.
- Cinq constructions : feu de camp, cabane, atelier, potager, étal.
- **Bram le colporteur** et le marché à demande limitée — la formule de la section 5,
  avec la barre d'appétit du marché visible.
- Cinq outils à acheter, dont le **droit de commerce** (l'idée d'Alain : payer pour avoir
  le droit d'être commerçant, et vendre 25 % plus cher).
- **Nova**, l'ingénieure de bord : dialogue, cadeaux, relation de 0 à 100, trois paliers.
  Elle te suit à partir de l'amitié, elle veille la nuit à partir de la complicité.
- Dormir, passer au lendemain, voir le marché reprendre son appétit.
- Huit objectifs qui mènent au « Jour 1 de ta Deuxième Vie ».
- Clavier sur ordinateur, manette tactile sur téléphone.

### Ce qui n'y est pas, et c'est voulu

Pas de multijoueur, pas de voisins, pas de vrai village, pas d'achats en argent réel,
pas de sauvegarde. Ce sont exactement les choses qu'il ne faut pas construire avant de
savoir si les dix premières minutes donnent envie de la onzième.

### Vérifié

Testé dans un navigateur réel : aucune erreur JavaScript, les huit objectifs se
complètent, l'écran de fin s'affiche, la courbe de prix du marché descend bien de 6 à 3
or puis sature.

---

## 9. Ce qu'on mesure ensuite

Faire jouer vingt personnes. Une seule question compte :

> **Reviennent-elles le lendemain ?**

Si oui, on bâtit le village et le multijoueur. Si non, on change la boucle avant d'avoir
dépensé un sou. Tout le reste — les graphismes, la musique, les métiers, la taille du
monde — se décide après cette réponse-là.

Deux chiffres secondaires à noter pendant les tests : combien de minutes avant le premier
abandon, et à quel objectif les gens sèchent.

---

## 10. Ce qui reste à trancher

1. **Le coffre.** Un quatrième monde `Bureau\DEUXIEME-VIE`, séparé d'EOC et d'OROSE ?
   Rien n'a été déplacé sans accord.
2. **Le classement.** 17+ d'abord (c'est ce qui est bâti), ou explicite dès le départ
   malgré les portes fermées ?
3. **Le nom.** « Deuxième Vie » est excellent et dit le jeu en deux mots. Il reste à
   vérifier du côté des marques de commerce — la proximité avec « Second Life » n'est
   pas un détail juridique.

---

## Sur le plagiat, une bonne fois

Les mécaniques — bûcher, récolter, bâtir, faire monter un village — ne sont protégées
par aucun droit. Ce qui l'est : le nom, les images, la musique, l'interface exacte, les
textes. S'inspirer de la façon dont *Age of Empires* fait ressentir la survie et la
montée d'une civilisation est parfaitement légal.

Et de toute façon, le décor arrêté le 3 août 2026 règle la question : des naufragés du
futur qui refont le Moyen Âge avec de l'alliage dans les mains, ça n'existe nulle part
ailleurs.
