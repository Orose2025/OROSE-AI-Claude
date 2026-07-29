# OROSE-AI
Conseillere OROSE

## Configuration des clés

Les clés d'API ne sont jamais stockées dans le dépôt. Elles se placent dans un
fichier `.env` local (ignoré par git) ou dans les variables d'environnement de
la plateforme d'hébergement.

1. Copier le modèle :

   ```bash
   cp .env.example .env
   ```

2. Ouvrir `.env` et coller les valeurs réelles.

### Stripe

| Variable | Où la trouver | Exposable côté client |
| --- | --- | --- |
| `STRIPE_SECRET_KEY` | Dashboard Stripe → Developers → API keys | Non — serveur uniquement |
| `STRIPE_PUBLISHABLE_KEY` | Dashboard Stripe → Developers → API keys | Oui |
| `STRIPE_WEBHOOK_SECRET` | Dashboard Stripe → Developers → Webhooks | Non |

Commencer avec les clés de test (`sk_test_…`, `pk_test_…`) et ne passer en
`sk_live_…` qu'une fois l'intégration validée.

Si une clé secrète a été exposée (commit, capture d'écran, message), la révoquer
immédiatement dans le Dashboard Stripe et en générer une nouvelle.
