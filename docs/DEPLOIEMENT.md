# Mettre AI Aldup en ligne

## Le plus rapide : tester sur votre machine

```bash
npm install
npm run dev
```

L'application s'ouvre sur http://localhost:3000 et fonctionne immédiatement :
sans configuration, elle utilise les sources IA qui ne demandent pas de clé.
C'est le vrai test du moteur de bascule.

## Déployer sur Firebase Hosting

### Option A — depuis votre machine (le plus simple pour la première fois)

```bash
npm install -g firebase-tools
firebase login
firebase use --add            # choisir le projet Firebase existant
npm run build
firebase deploy --only hosting
```

Firebase affiche alors l'adresse publique, du type
`https://VOTRE-PROJET.web.app`.

### Option B — automatiquement à chaque poussée sur `main`

Le workflow `.github/workflows/deploy.yml` s'en charge. Il attend :

| Nom | Type | Contenu |
|-----|------|---------|
| `FIREBASE_PROJECT_ID` | *variable* de dépôt | l'identifiant du projet Firebase |
| `FIREBASE_SERVICE_ACCOUNT` | *secret* de dépôt | le JSON d'un compte de service ayant le rôle « Firebase Hosting Admin » |
| `VITE_AI_GATEWAY_URL` | *variable* de dépôt (facultatif) | l'URL de la passerelle, une fois déployée |

Le compte de service se crée dans la console Google Cloud du projet
(IAM → Comptes de service → Clés → Ajouter une clé JSON). Tant que
`FIREBASE_PROJECT_ID` n'est pas renseignée, le workflow se saute lui-même au
lieu d'échouer.

## La passerelle (sources à clé)

Facultative : l'application marche sans elle. Elle ajoute les sources rapides
qui exigent une clé (Groq, OpenRouter, Together, Cerebras, HuggingFace).

**Elle demande le plan Blaze** — les Cloud Functions ne sont pas disponibles sur
le plan Spark gratuit. Le plan Blaze reste à 0 € tant que l'usage tient dans les
quotas gratuits, mais il exige une carte enregistrée.

```bash
cd functions && npm install && cd ..
firebase functions:secrets:set GROQ_API_KEY       # répéter par source
firebase deploy --only functions,hosting
```

Une fois déployée, renseignez l'URL de la fonction dans `VITE_AI_GATEWAY_URL`
(ou laissez la réécriture `/api/chat` de `firebase.json` faire le lien, et
mettez `VITE_AI_GATEWAY_URL=/api/chat`), puis reconstruisez.

## Ce qui ne marche pas comme lien de test

Un « artifact » hébergé sur claude.ai ne convient pas ici : sa politique de
sécurité bloque les appels réseau vers des domaines externes. L'interface
s'afficherait, mais le chat ne recevrait aucune réponse. Le test réel passe donc
par `npm run dev` ou par Firebase Hosting.
