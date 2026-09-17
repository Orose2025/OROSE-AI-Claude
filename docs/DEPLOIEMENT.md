# Mettre AI Aldup en ligne

## Tester sur votre machine

```bash
npm install
npm run dev
```

L'application s'ouvre sur http://localhost:3000 et fonctionne immédiatement :
sans configuration, elle utilise les sources IA qui ne demandent pas de clé.

## Le déploiement automatique

Un seul workflow s'occupe de tout :
`.github/workflows/firebase-hosting-ai-aldup.yml`

| Ce qui se passe dans GitHub | Résultat |
|---|---|
| Push sur `main` | L'app est construite (`npm run build` → `dist/`) et publiée sur ai-aldup |
| Ouverture d'une Pull Request | Un lien d'aperçu privé est publié en commentaire (7 jours) |
| Bouton « Run workflow » | Déploiement manuel |

### Où ça se déploie

- Projet Firebase : `alaindupont-projet`
- Site : **`ai-aldup` uniquement**

La cible est écrite directement dans `.firebaserc`, donc **aucune commande
`firebase target:apply` n'est nécessaire**.

### Les sites protégés

`alaindupont-projet` (jeu.echecocube.ca) et `associe-numerique` ne sont jamais
touchés. Trois protections :

1. `.firebaserc` ne déclare que la cible `ai-aldup`
2. `firebase.json` ne contient qu'une seule cible hosting
3. Une étape « Garde-fou » arrête le déploiement si un nom de site interdit
   apparaît, s'il y a plus d'une cible, ou si la cible n'est pas `ai-aldup`

## La seule chose à configurer : le secret

1. https://console.cloud.google.com/iam-admin/serviceaccounts?project=alaindupont-projet
2. « Créer un compte de service » → nom : `github-deploy-ai-aldup`
3. Rôles : **Firebase Hosting Admin** + **Lecteur de l'API Firebase**
4. Onglet « Clés » → « Ajouter une clé » → « Créer une clé » → **JSON**
5. Dans GitHub : Settings → Secrets and variables → Actions → « New repository secret »
   - Nom : `FIREBASE_SERVICE_ACCOUNT_ALAINDUPONT_PROJET`
   - Valeur : tout le contenu du fichier JSON

Tant que le secret n'est pas ajouté : sur une Pull Request l'aperçu est
simplement sauté (le workflow reste vert) ; sur `main` le déploiement échoue
avec un message clair, pour que ça ne passe pas inaperçu.

## La passerelle (sources à clé) — facultative

L'application marche sans elle. Elle ajoute les sources rapides qui exigent une
clé (Groq, OpenRouter, Together, Cerebras, HuggingFace) et **demande le plan
Blaze** (les Cloud Functions ne sont pas sur le plan Spark gratuit).

```bash
cd functions && npm install && cd ..
firebase functions:secrets:set GROQ_API_KEY       # répéter par source
firebase deploy --only functions
```

Une fois la fonction déployée, indiquez son URL dans la *variable* de dépôt
`VITE_AI_GATEWAY_URL` (Settings → Secrets and variables → Actions → onglet
« Variables »). Le workflow la passe au build.

> **Note.** La réécriture `/api/chat` → fonction `chatCompletion` a été retirée
> de `firebase.json`. Le workflow ne déploie que l'hébergement ; une réécriture
> vers une fonction absente ferait échouer le déploiement. L'URL complète dans
> `VITE_AI_GATEWAY_URL` remplit le même rôle.
