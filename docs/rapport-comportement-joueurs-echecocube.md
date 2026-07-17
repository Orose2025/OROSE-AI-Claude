# Rapport — Comportement des joueurs & recommandations pour Échec O Cube

> Recherche approfondie multi-sources (6 angles, 27 sources, 127 affirmations
> extraites, 25 vérifiées de façon adversariale : 17 confirmées, 8 rejetées).
> Chaque conclusion indique son **niveau de confiance** et ses **sources**.
> Objectif : tirer du monde des applis de jeux des outils concrets pour faire
> grandir et fidéliser Échec O Cube (app + jeu physique), joueurs 14-40 ans.

---

## En bref — les 5 leviers

1. **Ton genre est un avantage.** Les jeux « classiques » (plateau, casse-tête,
   cartes) sont **les meilleurs en rétention moyen et long terme**. Ils accrochent
   un peu moins fort au jour 1, mais gardent leurs joueurs grâce à l'habitude et à
   la profondeur. → Vise **l'habitude et la profondeur**, pas un feu de paille au
   jour 1.
2. **Onboarding = un seul objectif à la fois.** Enseigner *placer → relier →
   observer → fermer le cube* une étape à la fois, en laissant vite jouer, avec un
   tutoriel qu'on peut **sauter**.
3. **Difficulté qui s'adapte.** Ajuster la difficulté selon le **risque de décrochage
   réel** du joueur (et non une rampe fixe) augmente le temps de jeu de façon
   mesurée (+30 %).
4. **Une raison de revenir chaque jour — mais SAINE.** Un défi/casse-tête quotidien
   (façon Chess.com / Wordle), pas des mécaniques culpabilisantes.
5. **Deux publics, deux besoins.** Les plus jeunes veulent compétition/social/
   multijoueur ; les plus vieux veulent se détendre et jouer en solo. → Offrir
   **les deux pistes**.

---

## Conclusions détaillées (avec confiance et sources)

### 1. Rétention : ton genre part avec une longueur d'avance — confiance ÉLEVÉE
Les jeux de plateau/casse-tête/cartes **surperforment sur la rétention moyen/long
terme** ; les jeux d'arcade ne gagnent qu'au jour 1. Pour Échec O Cube, l'atout
structurel est la **durée**, pas le pic initial.
*Sources : GameAnalytics (via appagent.com), gamigion.com.*

### 2. Chaque palier de rétention diagnostique un problème différent — confiance ÉLEVÉE
- **J1 faible** = problème d'**onboarding** / attentes mal calées.
- **Chute au J7** = échec de **formation d'habitude** (manque de progression et de
  social gratifiants).
- **J30 faible** = manque de **profondeur / nouveautés** (événements, variété).

→ On corrige **le palier qui décroche**, au lieu de tout changer.
*Sources : solsten.io, appagent.com.*

### 3. Repères chiffrés (à prendre comme ordres de grandeur) — confiance MOYENNE
- Médianes du marché mobile (tous genres, 2024) : **J1 ≈ 23 %, J7 ≈ 4 %, J30 < 1 %**.
- Rétention considérée « saine » : **J1 45 %+, J7 20 %+, J30 10 %+**.

⚠️ Ce sont des médianes **tous genres** (pas spécifiques stratégie/plateau) et
plusieurs seuils plus précis ont été **rejetés** par la vérification. À utiliser
comme bornes, pas comme cibles fines.
*Sources : GameAnalytics Q1 2024 (via gamedevreports, maf.ad).*

### 4. Onboarding d'un jeu de réflexion — confiance ÉLEVÉE
Règles vérifiées mot pour mot sur le **guide officiel d'Apple** :
- Enseigner **un objectif à la fois**, en instructions **courtes** qui s'empilent
  du simple au complexe ; demander de **réussir** avant d'avancer.
- Donner un **rôle actif** et amener le joueur en **jeu autonome le plus tôt possible**.
- **Rendre le tutoriel optionnel** (bouton « Jouer directement »). Le guide cite
  même Carcassonne, un jeu de plateau — directement analogue à ton cas.
*Source : developer.apple.com/app-store/onboarding-for-games.*

### 5. Difficulté adaptative — confiance ÉLEVÉE
Une étude contrôlée (100 participants, 7 genres dont la stratégie) montre qu'ajuster
la difficulté selon la **tendance au décrochage** du joueur augmente le temps de jeu
moyen de **181 → 237 min** et l'engagement (16,4 → 21,2). → Cale la difficulté sur
le risque d'abandon, pas sur une courbe fixe.
⚠️ La version *généralisée* de cette idée a été rejetée — on retient le **résultat
mesuré**, pas une loi absolue.
*Source : MDPI Applied Sciences 2025 (15/10/5610).*

### 6. Revenir chaque jour, sainement — confiance ÉLEVÉE
Le retour routinier s'encourage par des **récompenses quotidiennes / événements à
durée limitée** et des **fonctions sociales**. Une chute J1→J7 est le signal pour
revoir l'onboarding.
⚠️ **Attention** : ce sont exactement ces mécaniques qui glissent vers le *dark
pattern* si on les rend agressives. À doser.
*Source : Apple (onboarding-for-games).*

### 7. Les pièges à éviter — confiance ÉLEVÉE
Une étude sur 1 104 joueurs recense **35 techniques de monétisation** trompeuses/
agressives (8 familles). Les *dark patterns* vont **de pair avec la monétisation
agressive** : **96,8 %** des jeux « sombres » sont gratuits-avec-achats et **93,6 %**
ont des achats intégrés (contre 54 % des jeux « sains »). Ces tactiques **imitent le
jeu d'argent** et **ciblent surtout les jeunes (15-24 ans)**.
→ Comme Échec O Cube vise **dès 14 ans**, c'est un argument fort pour **rester
propre** : pas de loot boxes, pas de monnaies opaques, pas de minuteurs anti-fun,
pas de comptes à rebours culpabilisants.
*Sources : Journal of Business Ethics 2022 ; Tripodos 2026 ; arXiv 2412.05039.*

### 8. Âge & mode de jeu — confiance MOYENNE
- Motivations : **compétition / social / accomplissement** dominent chez les jeunes
  et **déclinent avec l'âge** ; « **se détendre** » monte avec l'âge (et reste la
  motivation n°1 pour tous).
- Mode : les plus jeunes jouent plus en **multijoueur**, les plus vieux en **solo**.

→ Offrir **une piste multijoueur compétitive** ET **un solo satisfaisant**, avec un
cadrage « détente » pour la moitié plus âgée du 14-40.
⚠️ Nuance importante : pour un jeu de **stratégie pure**, la motivation est « la plus
**stable** avec l'âge » — donc l'effet de séparation par âge est **plus faible** que
pour les autres genres. Recommandations directionnelles.
*Sources : Strive/Newzoo 2021, Quantic Foundry.*

---

## Recommandations priorisées pour Échec O Cube

| Priorité | Action | Pourquoi (appui) |
|---|---|---|
| **Haute** | Onboarding « un objectif à la fois » pour placer/relier/observer/fermer, jouable vite, **tutoriel sautable** | Apple (élevé) |
| **Haute** | Assumer le J1 modéré ; **optimiser J7/J30** (habitude, profondeur) | Genre classique (élevé) |
| **Haute** | **Défi quotidien** (un casse-tête/puzzle du jour), sain, sans culpabilisation | Retour routinier (élevé) |
| **Haute** | **Difficulté adaptative** (IA qui suit le risque de décrochage) | MDPI EDDA (élevé) |
| **Moyenne** | **Deux pistes** : multijoueur classé (jeunes) + solo vs IA « détente » (plus vieux) | Âge/mode (moyen) |
| **Moyenne** | **Progression visible** + social léger (classement amical, partage de partie) | Moteur du J7 (élevé) |
| **Moyenne** | **Diagnostiquer par palier** (J1 → onboarding ; J7 → habitude ; J30 → variété) | Rétention par intervalle (élevé) |
| **Garde-fou** | **Zéro dark pattern** (pas de loot boxes / monnaies opaques / minuteurs) | Protège les 14 ans (élevé) |

> Ton programme « Gagne un mois gratuit » (parrainage + photo) reste **sain** tant
> qu'il n'ajoute ni pression trompeuse ni fausse urgence — il coche la case
> « social/récompense » sans tomber dans le dark pattern.

---

## Ce que la recherche a REJETÉ (à ne pas croire)

- « Les jeux de casse-tête ont la meilleure rétention J7 » → **rejeté** (0-3).
- « La stratégie/casse-tête vise surtout les plus vieux » → **rejeté** (0-3) : tu
  peux viser les jeunes aussi.
- Plusieurs seuils de rétention « précis » (ex. J1 40 %/J7 20 %/J30 10 % comme
  standard) → **rejetés** : les chiffres exacts font débat, d'où « ordres de grandeur ».
- « Le jour 1 est LE moment décisif » → **nuancé/rejeté** (1-2) : pour ton genre,
  le moyen/long terme compte plus.

---

## Limites de l'étude (honnêteté)

- Plusieurs repères datent de **2024** (rétention) et **2021** (démographie) → ordres
  de grandeur, pas vérités figées.
- Peu de données **spécifiques à la stratégie abstraite** ; benchmarks surtout tous
  genres.
- Le lien « monétisation agressive → dark patterns » est une **corrélation** (avec
  biais d'échantillon militant), pas une causalité prouvée.
- **Aucune source** ne couvre précisément les PWA, les jeux à double version
  (app + physique), ni le marché québécois/francophone.

---

## Questions ouvertes / prochaines recherches utiles

1. Benchmarks de rétention **spécifiques stratégie abstraite / plateau** (idéalement
   sur PWA) pour caler des cibles réalistes.
2. Leviers viraux **sains** (sans dark pattern) qui marchent pour un jeu de stratégie
   pur et gratuit.
3. La **boucle app ↔ jeu physique** : lequel fait vendre l'autre, et comment
   l'exploiter dans l'onboarding.
4. Le **passage éventuel au payant au printemps 2027** : quel modèle sans dénaturer
   le jeu ni perdre les 14 ans.

---

## Sources principales

- Apple — *Onboarding for Games* : https://developer.apple.com/app-store/onboarding-for-games/
- MDPI Applied Sciences 2025 (difficulté adaptative EDDA) : https://www.mdpi.com/2076-3417/15/10/5610
- Journal of Business Ethics 2022 (monétisation prédatrice) : https://link.springer.com/article/10.1007/s10551-021-04970-6
- Tripodos 2026 (dark patterns & jeunes) : https://tripodos.com/index.php/Facultat_Comunicacio_Blanquerna/article/view/1738
- Solsten (drivers J1/J7/J30) : https://solsten.io/blog/d1-d7-d30-retention-in-gaming
- GameAnalytics benchmarks (via appagent) : https://appagent.com/blog/mobile-game-retention-benchmarks/
- gamigion (rétention par genre) : https://www.gamigion.com/mobile-gaming-benchmarks-2025/
- Chess.com case study : https://medium.com/@ismailadebiyi/how-chess-com-turned-a-64-square-board-into-a-retention-machine-44e6104fa39e
- Strive/Newzoo 2021 (générations & modes) : https://strivesponsorship.com/wp-content/uploads/2021/08/How-Different-Generations-Engage-with-Games-Report.pdf
