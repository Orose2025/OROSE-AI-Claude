# DEUXIÈME VIE — La Belle Vie

## Prompt Lovable.ai

**Source du concept** : note manuscrite d'Alain Dupont + coffre Obsidian `DEUXIEME-VIE`
(créé le 3 août 2026). Analyse et rédaction : 4 août 2026.

---

## 1. Ce que dit ta note, traduit en concept

Ta note tient en cinq décisions, et elles sont toutes structurantes :

| Ce que tu as écrit | Ce que ça veut dire pour le produit |
|---|---|
| « Le jeu est gratuit pour tout monde » | Free-to-play intégral. Aucun mur payant. Personne n'achète l'accès. |
| « en jouant la Vie est plus dur, moins ÉVOLUÉ » | On démarre primitif et pauvre. La difficulté est le point de départ, pas une punition. |
| « les joueurs et joueuse vont payé pour EMBELLIR leurs AVATAR » | Monétisation **100 % cosmétique**. L'avatar est le produit. |
| « tout est comme AOE » | Progression par âges, récolte de ressources, construction, évolution technologique. |
| « sauf la Vie amoureuse, AMITIÉ Homme–femme, voisinage, SEX » | La couche qu'AOE n'a jamais eue : les relations humaines sont le vrai moteur du jeu. |

**Le pitch en une phrase** : *Age of Empires rencontre Les Sims* — tu commences une
deuxième vie au bas de l'échelle, tu évolues à travers les âges, et ce qui te fait
avancer, ce ne sont pas les ressources, ce sont les gens.

**Le nom complet** : DEUXIÈME VIE — *La Belle Vie*.

---

## 2. À lire avant de coller (important)

Lovable construit des **applications web React**. Il ne construira pas un MMO 3D à
l'échelle d'Age of Empires — ni Lovable ni aucun outil de ce type ne le fera.

Ce que Lovable **peut** livrer, et c'est déjà énorme :

- un jeu **2D navigateur** jouable, en vue de dessus sur grille
- tout le système d'avatar et sa **boutique de cosmétiques** — donc ton modèle d'affaires au complet, testable
- le système de **relations** : rencontre, amitié, romance, couple, voisinage
- la **progression par âges** avec ressources et construction
- les **profils joueurs** et la couche sociale en ligne

Mon conseil : sers-toi de Lovable pour bâtir le **prototype jouable et la boutique**.
C'est ce qui te dira si le concept accroche et si les gens paient — avant d'investir
dans un vrai moteur de jeu. Tu valides l'économie du jeu avant de dépenser sur le 3D.

---

## ▶️ PROMPT À COLLER DANS LOVABLE

Copie tout ce qui suit, de `Tu es` jusqu'à `--- FIN DU PROMPT ---`.

---

Tu es un développeur de jeux web senior. Construis **DEUXIÈME VIE — La Belle Vie**,
un jeu de simulation de vie jouable dans le navigateur, **entièrement en français**,
responsive, qui fonctionne aussi bien sur ordinateur que sur téléphone.

### LE CONCEPT

Le joueur recommence une vie à zéro. Il arrive dans un monde primitif où tout est
difficile : il a faim, il a froid, il n'a rien. En récoltant, en construisant et en
tissant des liens avec les autres habitants, il fait évoluer sa vie et son voisinage
à travers cinq âges successifs, jusqu'à la belle vie.

La structure de progression est celle d'Age of Empires : ressources, construction,
avancement d'âge. Mais le cœur du jeu, c'est ce qu'Age of Empires n'a jamais eu —
les relations humaines. L'amitié, l'amour, le voisinage, l'intimité. On n'évolue pas
seul dans Deuxième Vie : on évolue **parce qu'on est entouré**.

**Le jeu est entièrement gratuit.** Aucun contenu de jeu n'est vendu. La seule chose
qui s'achète, ce sont les cosmétiques d'avatar. Un joueur qui ne paie jamais doit
pouvoir atteindre l'âge final sans jamais être bloqué ni ralenti.

### STACK TECHNIQUE

React + TypeScript + Vite, Tailwind CSS + shadcn/ui, Supabase (Postgres, auth,
stockage, Row Level Security sur toutes les tables), Zustand pour l'état du jeu,
TanStack Query pour l'état serveur. Rendu du monde en CSS Grid et divs positionnées —
pas de moteur 3D, pas de WebGL.

### LES CINQ ÂGES

Chaque âge change visuellement le monde, débloque des bâtiments, des métiers, des
vêtements et des interactions sociales.

1. **Âge de la Survie** — abri de branches, cueillette, feu. La vie est dure. On a
   faim tout le temps. Une seule relation possible : le compagnonnage de survie.
2. **Âge du Village** — cabane, agriculture, troc. Les voisins apparaissent. L'amitié
   devient possible.
3. **Âge du Métier** — maison de bois, artisanat, monnaie. Les métiers arrivent.
   La séduction et les fréquentations deviennent possibles.
4. **Âge de la Cité** — maison de pierre, commerce, culture. Vie de couple, mariage,
   famille, réputation dans le quartier.
5. **Âge de la Belle Vie** — demeure, loisirs, abondance. Tout est débloqué. C'est le
   titre du jeu : on y est arrivé.

**Condition d'avancement** : chaque âge exige à la fois un seuil de ressources **et**
un seuil relationnel. On ne passe pas à l'âge suivant seul, même riche. C'est la règle
la plus importante du jeu.

### BESOINS DU PERSONNAGE

Six jauges qui descendent avec le temps : **faim, énergie, hygiène, humeur, santé,
lien social**. Elles descendent vite à l'Âge de la Survie et de plus en plus lentement
à mesure qu'on évolue — c'est ça, « la vie est plus dure quand on est moins évolué ».
Une jauge au plancher entraîne des conséquences : maladie, épuisement, isolement,
mais jamais la mort permanente ni la perte de progression.

### RESSOURCES ET CONSTRUCTION

Cinq ressources : **bois, pierre, nourriture, tissu, pièces**. On récolte en cliquant
sur les éléments du monde (arbres, rochers, buissons, champs), avec un temps de
recharge. On construit et on améliore : abri, feu, réserve, atelier, jardin, puits,
maison. Chaque bâtiment améliore la régénération d'un besoin ou débloque une action.

### LE SYSTÈME DE RELATIONS — le cœur du jeu

Le monde est peuplé de **personnages non-joueurs** avec un prénom, un âge, un métier,
un caractère (parmi : chaleureux, réservé, taquin, travaillant, rêveur, franc) et des
goûts propres. Ils vivent leur vie, se déplacent, et réagissent différemment selon leur
caractère.

Chaque relation a **deux jauges distinctes** : `affection` et `confiance`. La confiance
monte lentement et se perd vite. L'affection dépend des affinités.

**Les paliers de relation** :
`inconnu → connaissance → voisin → ami → ami proche → fréquentation → couple → conjoint`

**Les interactions disponibles** évoluent avec le palier et avec l'âge en cours :
saluer, jaser, offrir quelque chose, aider au travail, inviter chez soi, complimenter,
taquiner, se confier, séduire, prendre la main, embrasser, emménager ensemble, se marier.

**Le voisinage** est une entité en soi : chaque maison voisine a ses habitants, et
l'ensemble du quartier a une **jauge de réputation** collective. Bien traiter ses
voisins ouvre des avantages de quartier — entraide, prêts de ressources, fêtes de rue.
Mal les traiter isole.

**L'amitié entre hommes et femmes** est modélisée comme une relation à part entière
qui n'a pas à devenir romantique. Une amitié profonde homme-femme est une trajectoire
valide et récompensée par le jeu, pas une étape vers autre chose.

### INTIMITÉ — implémentation

Le jeu comporte une dimension intime dans les relations de couple, à traiter ainsi :

- **Réservé aux comptes majeurs**, avec vérification d'âge à l'inscription.
- **Contenu suggéré, pas explicite** : fondu au noir. L'intimité est représentée par
  ses effets — humeur, lien, complicité, évolution de la relation — jamais par des
  visuels explicites.
- **Consentement systématique** : toute avance peut être refusée par le personnage
  non-joueur selon sa confiance et son caractère. Un refus est une réponse normale du
  jeu, jamais un échec à contourner.
- **Interrupteur dans les réglages** : « contenu adulte » activable ou désactivable,
  désactivé par défaut. Désactivé, le jeu reste complet — les couples existent, les
  scènes intimes sont simplement omises.

Note pratique à retenir : ce cadrage est ce qui permet au jeu de passer sur les
boutiques d'applications et chez les processeurs de paiement. Du contenu explicite
fermerait ces deux portes d'un coup.

### AVATAR ET BOUTIQUE — le modèle d'affaires

L'avatar est ce que le joueur regarde le plus. Soigne cet écran plus que tout autre.

**Création d'avatar** : silhouette, teint, visage, yeux, cheveux (coupe et couleur),
pilosité, taille, morphologie, voix. Tout ce qui touche au corps est **gratuit et
illimité** — on ne fait jamais payer pour se ressembler.

**Boutique de cosmétiques** — la seule chose qui s'achète :

- **Vêtements** — hauts, bas, robes, manteaux, chaussures, par collection saisonnière
- **Coiffures et couleurs** rares
- **Accessoires** — bijoux, chapeaux, lunettes, sacs, tatouages, maquillage
- **Décoration d'habitation** — meubles, tapisseries, éclairage, jardin
- **Effets** — auras, traces de pas, animations d'entrée, cadres de profil
- **Émotes** et poses pour les photos

**Deux monnaies** :
- **Écus** — gagnés en jouant, gratuits. Achètent le catalogue de base.
- **Éclats** — achetés avec de l'argent réel. Achètent l'exclusif, le rare, le saisonnier.

**Règles absolues de la monétisation** :
- Rien de vendu ne donne le moindre avantage de jeu. Aucun. Un cosmétique ne change
  ni une jauge, ni une récolte, ni une relation.
- Aucun coffre surprise, aucune boîte aléatoire. Le joueur voit exactement ce qu'il
  achète avant de payer.
- Aucune pression temporelle agressive. Les rotations saisonnières reviennent.
- Un joueur qui ne dépense jamais un sou doit pouvoir atteindre l'Âge de la Belle Vie
  et avoir l'air bien.

Construis la boutique avec un panier fonctionnel et un solde simulé. **N'intègre
aucun paiement réel pour l'instant** — prévois seulement l'emplacement pour Stripe.

### MODÈLE DE DONNÉES (Supabase, RLS sur tout)

**`profils`** — `id` (= auth.users.id), `pseudo` (unique), `avatar_apercu_url`,
`majeur_verifie` (bool), `contenu_adulte_actif` (bool, défaut faux), `cree_le`.

**`personnages`** — `id`, `profil_id`, `prenom`, `age_en_cours` (1 à 5), `apparence`
(jsonb), `tenue_equipee` (jsonb), `faim`, `energie`, `hygiene`, `humeur`, `sante`,
`lien_social` (tous numeric 0-100), `metier`, `derniere_tick`, `cree_le`.

**`ressources_joueur`** — `personnage_id`, `bois`, `pierre`, `nourriture`, `tissu`,
`pieces`, `ecus`, `eclats`.

**`batiments`** — `id`, `personnage_id`, `type`, `niveau`, `position_x`, `position_y`,
`construit_le`.

**`pnj`** — `id`, `prenom`, `genre`, `age`, `metier`, `caractere`, `gouts` (jsonb),
`apparence` (jsonb), `maison_id`, `age_apparition` (1 à 5).

**`relations`** — `id`, `personnage_id`, `pnj_id`, `affection` (0-100),
`confiance` (0-100), `palier` (enum), `derniere_interaction`, `cree_le`.
Unicité sur (personnage_id, pnj_id).

**`journal_relations`** — `id`, `relation_id`, `type_interaction`, `resultat`
(enum : reussi, refuse, neutre), `effet_affection`, `effet_confiance`, `cree_le`.

**`voisinage`** — `id`, `personnage_id`, `reputation` (0-100), `pnj_voisins` (jsonb),
`avantages_debloques` (jsonb).

**`articles_boutique`** — `id`, `nom`, `categorie`, `rarete` (enum : commun, rare,
epique, saisonnier), `prix_ecus`, `prix_eclats`, `apercu_url`, `age_minimum`,
`collection`, `actif`.

**`inventaire`** — `id`, `profil_id`, `article_id`, `obtenu_le`, `equipe` (bool).

**`progression`** — `id`, `personnage_id`, `age_atteint`, `seuil_ressources_atteint`
(bool), `seuil_relationnel_atteint` (bool), `debloque_le`.

**Règles RLS** : chacun ne lit et n'écrit que ses propres personnages, ressources,
bâtiments, relations et inventaire. Les tables `pnj` et `articles_boutique` sont en
lecture publique. Les profils exposent uniquement `pseudo` et `avatar_apercu_url` aux
autres joueurs — jamais l'état des jauges ni les relations.

### LES ÉCRANS

1. **Accueil / connexion** — présentation courte du jeu, inscription, connexion, et
   confirmation de majorité.
2. **Création d'avatar** — écran soigné, aperçu en direct, toutes les options de corps
   gratuites, bouton « Commencer ma deuxième vie ».
3. **Le monde** — écran principal. Vue de dessus sur grille. Le décor change selon
   l'âge. On clique pour récolter, pour se déplacer, pour aborder un personnage.
   En surimpression : les six jauges de besoins, les ressources, l'âge en cours.
4. **Mon habitation** — construction et amélioration, placement de meubles, aperçu
   des décorations achetées.
5. **Relations** — liste de tous les personnages connus, avec leur palier, leurs deux
   jauges, la date du dernier contact. Fiche détaillée par personne avec son caractère,
   ses goûts découverts, et l'historique des moments partagés.
6. **Panneau d'interaction** — s'ouvre quand on aborde quelqu'un : les actions
   disponibles selon le palier et l'âge, avec le résultat de l'échange affiché.
7. **Voisinage** — le quartier, ses habitants, la jauge de réputation collective, les
   avantages débloqués.
8. **Boutique** — onglets par catégorie, filtres par rareté et collection, essayage
   en direct sur l'avatar avant l'achat, panier, solde des deux monnaies.
9. **Ma garde-robe** — tout ce que je possède, tenues enregistrées, équipement.
10. **Progression** — les cinq âges en ligne du temps, ce qui est atteint, ce qui
    manque pour avancer, en distinguant clairement le seuil de ressources et le seuil
    relationnel.
11. **Réglages** — contenu adulte, son, vitesse du temps, compte.

### BOUCLE DE JEU

Le temps avance par **ticks de 30 secondes**. À chaque tick : les besoins descendent
selon l'âge en cours, les ressources passives se génèrent, les personnages non-joueurs
se déplacent et peuvent initier un contact. **Sauvegarde continue dans Supabase.**
Quand le joueur revient après une absence, calcule le temps écoulé et applique la
dérive des jauges — mais plafonne-la, pour qu'une absence de trois jours ne détruise
pas une partie.

### DIRECTION ARTISTIQUE

- **Style** : illustration 2D chaleureuse, plate, aux formes rondes et lisibles.
  Pas de pixel art, pas de réalisme, pas de style « corporatif ».
- **Palette qui évolue avec l'âge** : terre et ocre à la Survie, verts et bruns au
  Village, tons chauds au Métier, pierre et or à la Cité, lumière et pastels à la
  Belle Vie. Le joueur doit **voir** sa progression au premier coup d'œil.
- **Avatars** : proportions stylisées, expressifs, avec une vraie diversité de teints,
  de morphologies et d'âges dès le départ.
- **Ton des textes** : français québécois naturel et chaleureux. Le jeu parle comme
  un ami, pas comme un manuel.
- **Retours visuels** : chaque récolte, chaque montée de jauge, chaque avancement de
  relation doit produire une petite animation satisfaisante. C'est ce qui donne envie
  de continuer.
- **Mobile** : tout jouable au pouce. Barre de navigation fixe en bas — Monde, Maison,
  Relations, Boutique, Moi.

### PÉRIMÈTRE

**Version 1, à construire maintenant** : création d'avatar, monde jouable sur les
cinq âges, six jauges de besoins, récolte et construction, personnages non-joueurs
avec caractères, système de relations complet jusqu'au mariage, voisinage et réputation,
boutique fonctionnelle avec solde simulé, garde-robe, progression, sauvegarde.

**Plus tard, ne construis pas mais laisse la place** : paiement réel par Stripe,
multijoueur en direct entre joueurs, visites d'habitations entre amis, enfants et
générations, métiers approfondis, événements saisonniers, application mobile native.

### LIVRAISON ATTENDUE

Un jeu **réellement jouable** de bout en bout, avec :
- au moins **12 personnages non-joueurs** distincts, prénoms québécois, caractères et
  goûts variés, répartis sur les cinq âges
- au moins **40 articles de boutique** répartis sur toutes les catégories et raretés
- une partie de démonstration déjà avancée à l'Âge du Métier, pour que je puisse voir
  le jeu en pleine forme sans devoir tout rejouer
- des images d'espace réservé cohérentes partout

Je veux ouvrir l'application et **jouer**, pas regarder des écrans vides.

--- FIN DU PROMPT ---

---

## 3. Trois choses que ta note ne tranche pas encore

Je les ai décidées pour toi dans le prompt afin qu'il soit utilisable tout de suite.
Corrige-moi si tu voyais ça autrement.

**Solo ou multijoueur ?** Ta note dit « les joueurs **et joueuses** », ce qui laisse
entendre du monde réel. J'ai mis en V1 un jeu **solo avec des personnages non-joueurs**,
et le multijoueur en V2. Raison : un système de relations se règle beaucoup plus vite
contre des PNJ que contre de vrais joueurs, et si les relations ne sont pas bonnes,
le jeu ne vaut rien. On valide le cœur d'abord.

**« Tout est comme AOE » — jusqu'où ?** J'ai gardé d'AOE la **progression par âges,
les ressources et la construction**, à l'échelle d'**une personne et son quartier**,
pas d'une civilisation avec une armée. Un jeu de vie qui demande de gérer des troupes
perdrait ce que ta note met en avant : l'amour, l'amitié, le voisinage.

**L'intimité.** Je l'ai cadrée en suggéré plutôt qu'en explicite, avec consentement et
interrupteur. Ce n'est pas de la pudeur : c'est la seule version qui passe sur l'App
Store, le Play Store et chez Stripe. Du contenu explicite te ferme ces trois portes
en même temps — et ton modèle d'affaires repose entièrement sur des paiements de
cosmétiques.

---

## 4. Ce que je n'ai pas pu lire

Ton coffre `DEUXIEME-VIE` est sur ton PC — cette session tourne dans un conteneur
distant et ne voit pas ton Bureau. J'ai travaillé à partir de ta note manuscrite et
de la capture du dossier, rien d'autre.

Non lus, et probablement pleins de décisions déjà prises : `CLAUDE.md`, `03-PROJETS`,
`04-DOMAINES`, `06-DECISIONS`, `05-RESSOURCES`, `00-ACCUEIL`.

**Pour que je travaille sur la matière réelle** : dépose le dossier `DEUXIEME-VIE`
dans Google Drive et dis-le-moi. Je lis tout et je reprends ce prompt en repartant de
ce que tu as déjà écrit, au lieu de reconstruire à partir d'une feuille.
