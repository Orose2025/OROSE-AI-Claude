---
titre: Mémoire et contexte
type: domaine
statut: actif
etiquettes: [dev/memoire]
cree: 2026-07-31
maj: 2026-07-31
alias: [Pourquoi il oublie, La mémoire]
---

# Mémoire et contexte

Pourquoi l'agent oublie, et ce qu'on fait pour que ça arrive moins.

## Les trois étages

D'après [[Le-systeme-memoire-d-un-agent]] :

| Étage | La question | Où on en est |
|---|---|---|
| **Stockage** | où vit l'information ? | fait — trois coffres, trois `CLAUDE.md` |
| **Rappel** | comment la retrouver au bon moment ? | à moitié — les index marchent, la recherche est lourde |
| **Consolidation** | comment elle se nettoie ? | rien — c'est notre trou |

## Notre dispositif actuel

**Les fichiers plutôt que l'application.** Tout est en Markdown, dans des
dossiers. Si Obsidian disparaît demain, les notes restent lisibles. Si Claude
disparaît, Alain peut tout lire. C'est le principe que
[[Obsidian-memoire-partagee-des-agents]] appelle *file over app*, et on l'avait
adopté sans le nommer.

**Un manuel par coffre.** Le `CLAUDE.md` dit comment travailler dans ce coffre.
C'est la première chose lue à chaque session.

**Un index par coffre.** La note `OU-EST-QUOI` permet de retrouver n'importe quoi
sans relire les 554 fichiers.

**Un journal par jour.** Avec un crochet automatique qui vérifie qu'il a été
écrit avant de terminer.

**Des alias.** Une note se retrouve en tapant la question qu'on se pose, pas son
titre exact.

## Les deux trous connus

**Les décisions ne sont écrites nulle part de façon retrouvable.** Elles sont
noyées dans le récit des journaux. Réponse : les ADR — voir
[[Les-ADR-la-memoire-des-decisions]] et le dossier `06-DECISIONS`.

**Rien n'est jamais consolidé.** Le journal grossit d'une note par jour, pour
toujours. Dans un an, personne ne relira 2026. Réponse envisagée : une synthèse
mensuelle qui remonte l'essentiel.

## À creuser

- [ ] Synthèse mensuelle dans les trois coffres
- [ ] Décider pour ou contre un graphe d'index (Graphify) — ça mérite un ADR

## Liens

- [[Le-systeme-memoire-d-un-agent]]
- [[Obsidian-memoire-partagee-des-agents]]
- [[Les-ADR-la-memoire-des-decisions]]
