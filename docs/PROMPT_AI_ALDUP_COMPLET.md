# 🚀 AIDUP — PROMPT DE CONCEPTION COMPLÈTE (A à Z)

---

## 📌 1. CONCEPT GLOBAL

**Nom de l'application :** AIDup
**Type :** Application Web (SaaS)
**Plateforme :** Firebase (Google)
**Langue principale :** Français (multi-langue possible)

### 🎯 Vision
AIDup est une application web qui regroupe toutes les intelligences artificielles gratuites disponibles sur le marché (ChatGPT free, Claude free, Gemini free, Mistral, Llama, DeepSeek, Qwen, Phi, etc.) en une seule interface unifiée. L'utilisateur ne voit qu'un seul assistant : "AIDup". En arrière-plan, l'application puise dans toutes les sources IA gratuites et switch automatiquement d'une source à l'autre quand l'une est épuisée ou indisponible.

### 💡 Proposition de valeur
- **Pour l'utilisateur :** Un seul accès, une seule interface, 100% gratuit, sans abonnement, sans limite apparente
- **Pour AIDup :** Agrégation intelligente de toutes les IA gratuites, optimisation des ressources, service fiable et continu

### 🔐 Principe fondamental
L'utilisateur ne doit JAMAIS savoir quelles sources d'IA sont utilisées en arrière-plan. Pour lui, c'est "AIDup" qui répond. Les sources sont totalement invisibles.

---

## 🏗️ 2. ARCHITECTURE TECHNIQUE

### Frontend
- **Framework :** React.js avec Vite
- **Styling :** Tailwind CSS (design premium, dark mode)
- **State management :** React Context / Zustand
- **Routing :** React Router
- **Animations :** Framer Motion (transitions fluides)
- **Responsive :** Mobile-first, adaptatif desktop/tablette/mobile
- **PWA :** Progressive Web App (installable sur mobile)

### Backend — Firebase
- **Firebase Authentication :** Connexion anonyme + Google + Email/Password
- **Firestore Database :** Stockage des conversations, sessions, préférences utilisateur
- **Firebase Cloud Functions :** Backend serverless pour :
  - Gestion des appels API vers les sources IA
  - Logique de switch automatique entre sources
  - Rate limiting et gestion des quotas
  - Agrégation des réponses
- **Firebase Hosting :** Hébergement de l'application web
- **Firebase Storage :** Stockage des fichiers/images partagés
- **Firebase Analytics :** Suivi des performances et usage
- **Firebase Cloud Messaging :** Notifications push

### Sources IA (backends gratuits agrégés)
| Source | API | Limite gratuite | Usage |
|--------|-----|-----------------|-------|
| Pollinations.ai | REST (OpenAI-compatible) | Illimité | Principal |
| HuggingFace Inference | REST | Rate-limited | Fallback |
| Groq Free Tier | REST | Tokens/jour | Rapide |
| OpenRouter Free | REST | Modèles gratuits | Variété |
| Together.ai Free | REST | Credits limités | Backup |

### Architecture du switch automatique
```
Utilisateur → AIDup Frontend → Cloud Function → Router IA
                                                      ↓
                                              ┌───────────────┐
                                              │  Source 1     │ → Épuisée?
                                              │  (GPT-Free)   │    ↓
                                              └───────────────┘  Switch
                                              ┌───────────────┐
                                              │  Source 2     │ → Épuisée?
                                              │  (Mistral)    │    ↓
                                              └───────────────┘  Switch
                                              ┌───────────────┐
                                              │  Source 3     │ → etc.
                                              │  (Gemini)     │
                                              └───────────────┘
```

---

## 🎨 3. DESIGN & UI/UX

### Identité visuelle
- **Logo :** Éclair stylisé dans un dégradé bleu → violet → rose
- **Couleurs principales :**
  - Fond : #0a0a0f (noir profond)
  - Accent 1 : #3b82f6 (bleu)
  - Accent 2 : #8b5cf6 (violet)
  - Accent 3 : #ec4899 (rose)
  - Texte : #ffffff (blanc)
  - Texte secondaire : #9ca3af (gris)
- **Typographie :** Inter (Google Fonts)
- **Style :** Premium, minimaliste, glassmorphism, dark mode uniquement
- **Bordures :** Blanc semi-transparent (rgba 255,255,255,0.05-0.1)
- **Effets :** Blur, gradients subtils, ombres colorées

### Pages de l'application

#### A. Page d'accueil (Landing)
- Hero section avec titre accrocheur + gradient text
- Badge "100% Gratuit • Sans inscription"
- Bouton CTA principal "Commencer à discuter"
- Bouton secondaire "Soutenir le projet"
- 3 cartes de features (Rapide, Gratuit, Confidentiel)
- Footer minimaliste

#### B. Interface de Chat (page principale)
- **Sidebar gauche :**
  - Logo AIDup
  - Bouton "Nouvelle conversation"
  - Liste des conversations précédentes (avec titre auto-généré)
  - Bouton supprimer par conversation
  - Bouton "Soutenir AIDup" en bas
- **Zone centrale :**
  - Header minimal avec logo + statut "En ligne"
  - Zone de messages (bulles style moderne)
  - Suggestions de démarrage si conversation vide
  - Zone de saisie en bas avec textarea auto-resize + bouton envoyer
- **Responsive :** Sidebar masquée sur mobile, toggle hamburger

#### C. Modal "Soutenir"
- 3 options de don : Café (3€), Pizza (10€), Mensuel (5€/mois)
- Design premium avec gradient
- Message de remerciement

---

## ⚙️ 4. FONCTIONNALITÉS DÉTAILLÉES

### Fonctionnalités utilisateur
1. **Chat en temps réel** avec IA (réponses streaming si possible)
2. **Historique des conversations** sauvegardé dans Firestore
3. **Multi-sessions** — plusieurs conversations en parallèle
4. **Titre auto-généré** pour chaque conversation (basé sur le premier message)
5. **Suppression de conversations**
6. **Mode anonyme** — pas besoin de compte pour utiliser
7. **Connexion optionnelle** — pour sauvegarder l'historique dans le cloud
8. **Export de conversation** (copier le texte)
9. **Suggestions de prompts** au démarrage
10. **Mode sombre permanent** (identité de marque)

### Fonctionnalités backend (invisibles)
1. **Router IA intelligent** — choisit la meilleure source disponible
2. **Switch automatique** — quand une source est épuisée, passe à la suivante
3. **Retry automatique** — si une source échoue, tente la suivante
4. **Rate limiting** — gestion des quotas par source
5. **Cache des réponses** — pour les questions fréquentes
6. **Contexte conversationnel** — envoie l'historique à l'IA pour des réponses cohérentes
7. **System prompt personnalisé** — "Tu es AIDup, un assistant intelligent..."
8. **Monitoring des sources** — détecte les sources indisponibles
9. **Fallback chain** — ordre de priorité des sources
10. **Logs et analytics** — pour optimiser les performances

### Fonctionnalités de financement
1. **Bannières discrètes** — messages rotatifs en bas du chat
2. **Modal de dons** — accessible depuis la sidebar et la landing
3. **Compteur de messages** — gamification légère
4. **Partage social** — bouton pour partager l'app

---

## 🗄️ 5. STRUCTURE FIRESTORE (Base de données)

```
users/
  {userId}/
    profile/
      - displayName: string
      - email: string
      - isAnonymous: boolean
      - createdAt: timestamp
      - totalMessages: number
      - plan: "free" | "supporter"

    settings/
      - theme: "dark"
      - language: "fr"
      - notifications: boolean

sessions/
  {sessionId}/
    - userId: string (ref)
    - title: string
    - createdAt: timestamp
    - updatedAt: timestamp
    - messageCount: number
    - messages/ (subcollection)
      {messageId}/
        - role: "user" | "assistant"
        - content: string
        - timestamp: timestamp
        - provider: string (interne, jamais affiché)
        - tokensUsed: number

analytics/
  {date}/
    - totalMessages: number
    - activeUsers: number
    - providerUsage/
      - pollinations: number
      - huggingface: number
      - groq: number
      - ...
    - switchCount: number
```

---

## 🔧 6. CLOUD FUNCTIONS (Backend)

### Function 1: `chatCompletion`
```
Trigger: HTTP Request (appelé par le frontend)
Input: { messages[], sessionId, userId }
Process:
  1. Récupérer le contexte de la session
  2. Ajouter le system prompt "AIDup"
  3. Router vers la meilleure source IA disponible
  4. Si échec → switch vers source suivante
  5. Sauvegarder la réponse dans Firestore
  6. Retourner la réponse au frontend
Output: { response: string, provider: string (interne) }
```

### Function 2: `checkProviderHealth`
```
Trigger: Cloud Scheduler (toutes les 5 minutes)
Process:
  1. Tester chaque source IA avec un ping
  2. Mettre à jour le statut dans Firestore
  3. Désactiver les sources indisponibles
  4. Réactiver celles qui reviennent
```

### Function 3: `cleanupOldSessions`
```
Trigger: Cloud Scheduler (quotidien)
Process:
  1. Supprimer les sessions de plus de 90 jours (anonymes)
  2. Garder les sessions des utilisateurs connectés
```

---

## 🔐 7. SÉCURITÉ & PRIVACITÉ

1. **Règles Firestore :**
   - Un utilisateur ne peut lire/écrire que ses propres données
   - Les sessions sont privées par utilisateur
   - Les messages sont chiffrés en transit (HTTPS)

2. **API Keys :**
   - Toutes les clés API sont dans les variables d'environnement Firebase
   - Jamais exposées au frontend
   - Rotation régulière des clés

3. **Données utilisateur :**
   - Pas de collecte de données personnelles
   - Mode anonyme par défaut
   - Suppression des données sur demande

---

## 💰 8. MODÈLE DE FINANCEMENT

### Revenus
| Source | Description | Estimation |
|--------|-------------|------------|
| Dons ponctuels | Café (3€), Pizza (10€) | Variable |
| Abonnement supporter | 5€/mois | Récurrent |
| Bannières publicitaires | Discrètes, non-intrusives | ~50-200€/mois |
| Sponsorships | Partenariats avec outils dev | Variable |

### Dépenses à couvrir
| Poste | Coût mensuel estimé |
|-------|-------------------|
| Firebase (Spark/Blaze) | 0-25€ |
| Cloud Functions | 0-10€ |
| Firestore | 0-15€ |
| Hosting | 0€ (inclus) |
| Domaine | ~1€/mois |
| **Total** | **~15-50€/mois** |

---

## 🚀 9. DÉPLOIEMENT

### Étapes de déploiement
1. **Firebase Setup :**
   - Créer un projet Firebase
   - Activer Authentication (Anonymous + Google)
   - Créer la base Firestore
   - Configurer le Hosting
   - Déployer les Cloud Functions

2. **Variables d'environnement :**
   ```
   POLLINATIONS_API_KEY=...
   HUGGINGFACE_API_KEY=...
   GROQ_API_KEY=...
   OPENROUTER_API_KEY=...
   ```

3. **Commandes de déploiement :**
   ```bash
   npm run build
   firebase deploy
   ```

4. **Domaine personnalisé :**
   - ai-aldup.com ou ai-aldup.app
   - Configuration DNS
   - SSL automatique via Firebase

---

## 📱 10. ROADMAP & ÉVOLUTIONS

### Phase 1 — MVP (Actuel)
- ✅ Chat basique avec IA
- ✅ Design premium
- ✅ Switch automatique
- ✅ Historique local

### Phase 2 — Firebase Integration
- [ ] Authentification utilisateur
- [ ] Sauvegarde cloud des conversations
- [ ] Synchronisation multi-appareils
- [ ] Cloud Functions pour le routing IA

### Phase 3 — Fonctionnalités avancées
- [ ] Génération d'images (via sources gratuites)
- [ ] Mode vocal (speech-to-text + text-to-speech)
- [ ] Upload de fichiers (PDF, images à analyser)
- [ ] Mode collaboration (partage de conversations)

### Phase 4 — Monétisation
- [ ] Intégration Stripe pour les dons
- [ ] Plan "Supporter" avec avantages
- [ ] Bannières publicitaires ciblées
- [ ] Programme de parrainage

### Phase 5 — Scale
- [ ] Application mobile native (React Native)
- [ ] Extension navigateur
- [ ] API publique pour développeurs
- [ ] Marketplace de plugins

---

## 📋 11. RÉSUMÉ EN UNE PHRASE

> **AIDup est une application web hébergée sur Firebase qui offre un assistant IA gratuit et élégant en agrégeant toutes les sources d'IA gratuites disponibles, avec un switch automatique invisible entre les sources quand l'une est épuisée, le tout dans une interface premium dark mode où l'utilisateur ne voit que "AIDup" — sans jamais connaître les sources en arrière-plan.**

---

## 🎯 STACK TECHNIQUE RÉCAPITULATIVE

| Couche | Technologie |
|--------|-------------|
| Frontend | React + Vite + Tailwind CSS |
| Backend | Firebase Cloud Functions (Node.js) |
| Base de données | Firestore |
| Auth | Firebase Authentication |
| Hosting | Firebase Hosting |
| IA Sources | Pollinations, HuggingFace, Groq, OpenRouter |
| Routing IA | Cloud Function avec logique de fallback |
| Design | Dark mode, glassmorphism, gradient bleu/violet/rose |
| Typographie | Inter (Google Fonts) |
| Animations | Framer Motion |
| PWA | Service Worker + manifest.json |

---

*Document de conception complet — AIDup v1.0*
*Dernière mise à jour : 2024*
