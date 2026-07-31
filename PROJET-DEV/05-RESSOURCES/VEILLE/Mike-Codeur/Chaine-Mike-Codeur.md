---
titre: Chaîne Mike Codeur — les 30 vidéos analysées
type: ressource
statut: actif
etiquettes: [dev/veille]
cree: 2026-07-31
maj: 2026-07-31
alias: [Mike Codeur, La chaîne, Les vidéos]
---

# Chaîne Mike Codeur

<https://www.youtube.com/@MikeCodeur_/videos>

Développeur full stack français, formateur, installé à Bali. La chaîne a changé
de sujet : ce n'était plus du tutoriel React, c'est aujourd'hui presque
exclusivement du **développement agentique avec Claude Code** — exactement notre
outil et notre façon de travailler.

Trente vidéos analysées le 31 juillet 2026, de « il y a 3 mois » à « il y a 1
jour ». Le tri ci-dessous est fait pour **nos** projets : deux entreprises, un
site Shopify, une application Firebase, un poste Windows, Claude Code comme
seul outil de dev.

## À voir en premier (3 vidéos)

Celles qui parlent directement de ce qu'on vient de construire dans les deux
autres coffres.

| Vidéo | Pourquoi elle nous concerne |
|---|---|
| [[Obsidian-memoire-partagee-des-agents]] | il fait exactement ce qu'on a fait : un coffre Obsidian comme mémoire des agents. Il va plus loin avec un graphe. |
| [[Le-systeme-memoire-d-un-agent]] | la théorie derrière : stockage, rappel, consolidation. Explique pourquoi `CLAUDE.md` seul ne suffit pas. |
| [[Les-ADR-la-memoire-des-decisions]] | on a déjà un dossier `06-DECISIONS` vide dans les deux coffres. Cette vidéo donne quoi mettre dedans. |

## Méthode de travail (4 vidéos)

| Vidéo | Ce qu'on en tire |
|---|---|
| [[Le-repo-de-reference-Claude-Code]] | le tour complet de Claude Code : commandes, skills, sous-agents, hooks, MCP. Une heure, c'est le socle. |
| [[Le-pipeline-killer-saas]] | la méthode en 7 étapes pour construire un produit du cadrage à la production. Trop lourde pour nous d'un bloc, deux étapes à voler. |
| [[Parallele-ou-sequentiel]] | quand lancer plusieurs agents et quand surtout pas. La règle des 3 axes. |
| [[Un-Agentic-OS-qui-fait-tourner-le-business]] | son système complet. Ambitieux, mais deux briques sont copiables tout de suite. |

## Outillage Claude Code (3 vidéos)

| Vidéo | Ce qu'on en tire |
|---|---|
| [[Les-15-nouvelles-commandes-Claude-Code]] | `/usage`, `/context`, `/doctor`, `/autofix-pr`. Directement utilisable. |
| [[Agent-View-le-multi-agent-natif]] | fermer le terminal sans tuer les agents. Utile le jour où on lancera plusieurs choses en parallèle. |
| [[Les-Dynamic-Workflows]] | l'orchestration multi-agent intégrée. À connaître, pas à installer aujourd'hui. |

## Sécurité (2 vidéos)

| Vidéo | Ce qu'on en tire |
|---|---|
| [[GStack-l-audit-de-Garry-Tan]] | une commande d'audit sécurité OWASP à lancer sur un dépôt. À faire avant le lancement OROSE. |
| [[Securiser-son-SaaS-en-agentique]] | les trois couches : audit du dépôt, veille des dépendances, surveillance des logs. |

## Argent et choix de modèle (2 vidéos)

| Vidéo | Ce qu'on en tire |
|---|---|
| [[La-facturation-Anthropic-du-15-juin]] | comment une facture part à 1 800 $ sans qu'on la voie venir. À lire avant d'automatiser quoi que ce soit. |
| [[Opus-5-contre-Fable-5]] | quel modèle pour quelle phase de projet. |

## Livrables et présentation (2 vidéos)

| Vidéo | Ce qu'on en tire |
|---|---|
| [[HTML-remplace-Markdown]] | pour les documents destinés à être lus par un humain, demander du HTML plutôt que du Markdown. |
| [[Claude-Design-refaire-un-onboarding]] | refaire une page d'accueil ou un tunnel d'inscription. Applicable à OROSE et à la boutique EOC. |

## Écartées, et pourquoi

Honnêtement, la moitié de la chaîne ne nous sert pas. Autant l'écrire.

| Vidéo | Pourquoi on passe |
|---|---|
| Hermes Agent : de zéro à ton assistant IA (1 h) | demande un serveur VPS loué, Linux, Tailscale. On n'a pas ce besoin et ça ouvre une surface de sécurité qu'on ne sait pas tenir. |
| Hermes Agent : tous les use cases & skills | même raison. |
| Le terminal pensé pour le dev agentique (cmux) | cmux et Ghostty sont des outils Mac/Linux. On est sur Windows. |
| Le workflow secret de Cloudflare avec Claude Mythos | sujet sécurité offensive, hors de notre périmètre. |
| Le NoCode est enfin mort ? | opinion. Intéressant mais rien à appliquer. |
| Il n'y a plus d'artisanat dans le métier de développeur | opinion sur le métier. |
| Les agents IA ont tué le SaaS / la suite | opinion et stratégie business d'un formateur. |
| Mais personne n'utilise l'IA en fait ?! | reportage sur les entreprises françaises. |
| Le Shadow AI est partout | problème d'équipe de 30 développeurs. On est deux. |
| On a hacké le SaaS de Benjamin Code | la partie « fait divers » ne sert pas, **mais** la seconde moitié est reprise dans [[Securiser-son-SaaS-en-agentique]]. |
| Fable 5 est de retour (×2) | fenêtre de tir expirée le 12 juillet, périmé. |
| Anthropic a tué CrewAI avec Opus 4.8 | repris en partie dans [[Les-Dynamic-Workflows]]. |
| GPT-5.5 vs Opus 4.7 | comparaison de modèles qui ne sont plus les derniers. |
| Anthropic vient de tuer le plan Claude Max ? | même annonce que [[La-facturation-Anthropic-du-15-juin]], en version réaction à chaud. |
| Agentic Dev : reproduire n'importe quel SaaS | c'est [[Le-pipeline-killer-saas]], gardée sous ce nom. |

## Un avertissement

Chaque vidéo se termine par un « pack gratuit » à télécharger contre une adresse
courriel. C'est le métier de l'auteur, il vend des formations. Le contenu des
vidéos est solide, les packs ne sont pas nécessaires — tout ce qui compte est
dans les notes de ce dossier.
