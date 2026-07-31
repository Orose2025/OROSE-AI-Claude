---
titre: Comment installer ce coffre sur le Bureau
type: accueil
statut: actif
etiquettes: [dev]
cree: 2026-07-31
maj: 2026-07-31
alias: [Installer, Le mettre sur mon PC]
---

# Comment installer ce coffre sur le Bureau

Ce coffre a été créé depuis une session Claude Code qui tourne dans le nuage.
Elle n'a pas accès au disque du PC : elle ne peut pas déposer un dossier sur le
Bureau toute seule. Il y a donc une étape manuelle, une seule fois.

## Le chemin le plus simple

1. Ouvrir la page de la branche sur GitHub :
   `Orose2025/OROSE-AI-Claude`, branche `claude/obsidian-videos-missing-1gfr8m`
2. Bouton vert **Code** → **Download ZIP**
3. Ouvrir le ZIP, prendre **uniquement** le dossier `PROJET-DEV`
4. Le glisser sur le **Bureau**, à côté de `ÉCHEC O CUBE` et de `OROSE`
5. Dans Obsidian : nom du coffre en bas à gauche → **Ouvrir un autre coffre** →
   **Ouvrir un dossier comme coffre** → choisir `Bureau\PROJET-DEV`

C'est tout. La configuration Obsidian est déjà dedans : le journal quotidien
pointe sur `02-JOURNAL/2026`, les modèles sur `07-MODELES`.

## Vérifier que c'est bon

Trois signes que l'installation a marché :

- le dossier caché `.obsidian` est bien présent dans `PROJET-DEV`
- Obsidian affiche neuf dossiers numérotés dans l'explorateur
- taper `Au secours` dans la recherche rapide ouvre le tableau de bord

Si le dossier `.obsidian` manque, c'est que Windows a filtré les fichiers cachés
à l'extraction. Ce n'est pas grave : Obsidian en recrée un, il faudra juste
régler le journal quotidien et les modèles à la main.

## Après l'installation

Le coffre vit sur le Bureau. Le dépôt GitHub n'est qu'un moyen de transport —
une fois le dossier en place, c'est la version du Bureau qui fait foi, comme
pour les deux autres coffres.

## Liens

- [[TABLEAU-DE-BORD]]
- [[CLAUDE]]
