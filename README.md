# AIDup

Un seul assistant à l'écran. Plusieurs IA gratuites derrière.

L'utilisateur écrit à « AIDup ». En arrière-plan, l'application interroge des
sources d'IA gratuites une par une : dès que l'une est épuisée, en panne ou trop
lente, elle passe à la suivante **sans jamais le signaler à l'utilisateur**.
Aucun abonnement, aucune inscription obligatoire.

## Démarrer

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # tests du routeur
npm run typecheck
npm run build
```

Sans aucune configuration, l'application fonctionne déjà : elle utilise les
sources qui ne demandent pas de clé.

## Les deux modes

| Mode | Configuration | Sources utilisées |
|------|---------------|-------------------|
| **Direct** (par défaut) | aucune | sources sans clé, appelées depuis le navigateur |
| **Passerelle** | `VITE_AI_GATEWAY_URL` + Cloud Function déployée | sources à clé (Groq, OpenRouter, Together…) puis les sources sans clé en filet |

Une clé d'API ne doit **jamais** être préfixée `VITE_` : tout ce qui porte ce
préfixe finit dans le bundle envoyé au navigateur. Les clés vivent uniquement
dans les secrets Firebase, lues par `functions/`.

```bash
cp .env.example .env
firebase functions:secrets:set GROQ_API_KEY
npm run build && firebase deploy
```

## Structure

```
src/lib/ai/
  types.ts              contrats partagés
  errors.ts             classification des échecs (quota / panne / délai…)
  health.ts             disjoncteur : met au repos une source qui vient d'échouer
  openaiCompatible.ts   transport commun (streaming SSE) des API façon OpenAI
  providers.ts          catalogue des sources, avec et sans clé
  router.ts             cœur du système : l'ordre d'essai et la bascule
  client.ts             façade utilisée par l'interface : askAldup()
src/App.tsx             interface de chat (landing, sessions, streaming)
functions/              passerelle Firebase : même routeur, côté serveur, avec les clés
docs/ARCHITECTURE.md    comment la bascule reste invisible
```

L'interface n'appelle qu'une seule fonction, `askAldup()`, et ne reçoit jamais
le nom de la source qui a répondu.

## Ce qui reste à faire

- Persistance Firestore des conversations (aujourd'hui en mémoire de session)
- Authentification anonyme + Google
- Intégration Stripe pour les dons
- PWA (manifest + service worker)
