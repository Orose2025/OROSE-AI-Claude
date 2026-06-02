# ÉCHEC O CUBE — Site Officiel (Thème Shopify / Shopify Theme)

> Le jeu de stratégie où la physique valide chaque coup.
> *The strategy game where physics validates every move.*

Thème Shopium premium, bilingue FR/EN, entièrement éditable depuis l'admin
Shopify — construit sur la base **Dawn**. Aucun code requis après livraison.

---

## 🎨 Palette de marque (modifiable: Réglages › Réglages du thème)

| Rôle | Hex |
|------|-----|
| Fond principal | `#1A1008` |
| Fond secondaire | `#0D0705` |
| Or bronze (logo ÉCHEC, CTA) | `#C9982F` |
| Or miel (pâle) | `#E8C96A` |
| Crème parchemin (texte) | `#F5ECD7` |
| Rouge crimson (pièce rouge) | `#B22222` |
| Bois chêne | `#8B6914` |
| Rainure / bordure | `#2C1F0E` |

Polices Google : **Playfair Display** (titres), **Libre Baskerville** (corps),
**Cinzel** (étiquettes/UI).

---

## 📁 Structure du thème

```
layout/theme.liquid          Mise en page : nav fixe, pied de page, polices, variables CSS
sections/
  eoc-hero.liquid            Section 1 — Héros plein écran
  eoc-concept.liquid         Section 2 — Le concept + statistiques animées
  eoc-game.liquid            Section 3 — Les 3 pièces (PÂLE / FONCÉ / ROUGE)
  eoc-experience.liquid      Section 4 — L'expérience (lifestyle)
  eoc-rules.liquid           Section 5 — Comment jouer (3 étapes)
  eoc-product.liquid         Section 6 — Produit Shopify natif (panier réel)
  eoc-community.liquid       Section 7 — Capture courriel (liste clients native)
  eoc-rules-page.liquid      Page /rules — règlement complet bilingue
  eoc-about.liquid           Page /about — histoire de l'inventeur
  eoc-collection.liquid      Page /shop — grille de collection
  eoc-product-page.liquid    Page produit native
  eoc-cart.liquid            Panier
  eoc-page.liquid            Page générique
  eoc-404.liquid             404
templates/
  index.json                 Accueil (7 sections dans l'ordre)
  page.rules.json            Modèle page Règles
  page.about.json            Modèle page À propos
  collection.json product.json cart.json page.json 404.json
assets/
  eoc-theme.css              Variables de marque, typographie, styles, responsive
  eoc-animations.js          Reveal au défilement + compteurs + menu mobile (vanilla)
config/
  settings_schema.json       Sélecteurs de couleur, polices, nav, pied de page
  settings_data.json         Valeurs par défaut = palette de marque
locales/
  en.default.json  fr.json
```

---

## 🖼️ Images à téléverser (Admin › Contenu › Fichiers, puis sélectionner dans le Customizer)

Chaque image est un réglage **image_picker** — aucune image n'est codée en dur.

| Réglage | Image source | Section |
|---------|--------------|---------|
| Image héros | `AffichePub.png` | Héros |
| Image macro | `IMG_20931.jpg` | Concept |
| Image plein largeur | `IMG_20861.jpg` | Le Jeu |
| Image de fond | `PARTI2JOUEURS.png` | Expérience |
| Diagramme de pointage | `IMG_E21161.jpg` | Comment jouer |
| Photos produit | `IMG_20801`, `IMG_20861`, `IMG_20931`, série `IMG_19xxx–21xxx` | Produit / galerie |

---

## 🚀 Installation

Ces fichiers constituent une **surcouche éditoriale du thème Dawn**.

1. Boutique Shopify (`echecocube.com`) › **Boutique en ligne › Thèmes**
2. Ajoutez le thème **Dawn** (dernière version) puis **Modifier le code**.
3. Téléversez/remplacez les fichiers de ce dépôt (mêmes chemins).
4. Renommez le thème : **« ÉCHEC O CUBE — Site Officiel »**.
5. Créez les pages **Règles** (modèle `rules`), **À propos** (modèle `about`).
6. **Navigation** : créez le menu `main-menu` (Règles, Boutique, Communauté, À propos)
   et `footer`. Tous les liens sont éditables dans *Navigation*.
7. **Produit** : créez le produit « ÉCHEC O CUBE — Édition Bois », puis liez-le
   dans la Section 6 (réglage *Produit lié*). Prix, variantes et panier deviennent réels.
8. **Liste courriel** : les inscriptions (Section 7) créent un client taggé
   `newsletter, EOC-founder` → Shopify Email / Klaviyo.

---

## ✅ Conforme au cahier des charges

- Bilingue FR/EN sur chaque bloc · 100 % éditable au Customizer (texte, image, couleur)
- Section 6 = produit Shopify **natif** (panier/checkout réels)
- Section 7 = formulaire client **natif** Shopify (aucun script externe)
- Mobile-first responsive · lazy-loading · `preconnect` Google Fonts · CDN images
- Animations CSS + ~30 lignes de JS vanilla (Intersection Observer, compteurs)
- Nav fixe `#0D0705` 90 % + backdrop-blur · sélecteur FR/EN

© 1999–2026 Alain Dupont. Droit d'auteur OPIC Canada No. 477714.
