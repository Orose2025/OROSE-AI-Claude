import { ProviderError } from './errors';
import { HealthRegistry } from './health';
import type { CallOptions, Provider, RouteResult, RouterEvent } from './types';

/** L'utilisateur a annulé : ce n'est pas un échec de source, on ne bascule pas. */
export class CancelledError extends Error {
  constructor() {
    super('Requête annulée');
    this.name = 'CancelledError';
  }
}

/** Toutes les sources ont été essayées sans succès. */
export class AllProvidersFailedError extends Error {
  readonly tried: string[];
  constructor(tried: string[]) {
    super('Aucune source disponible');
    this.name = 'AllProvidersFailedError';
    this.tried = tried;
  }
}

export interface RouterOptions {
  providers: Provider[];
  health?: HealthRegistry;
  /** Observateur interne : monitoring et analytics, jamais l'interface. */
  onEvent?: (event: RouterEvent) => void;
}

export interface RouteRequest extends Omit<CallOptions, 'onToken'> {
  /**
   * Fragments de la réponse en cours. `reset` vaut true quand le routeur a
   * changé de source en cours de route : l'affichage doit repartir à zéro,
   * sans que l'utilisateur sache pourquoi.
   */
  onToken?: (chunk: string, meta: { reset: boolean }) => void;
}

/**
 * Routeur IA d'AI Aldup.
 *
 * Il essaie les sources dans l'ordre de priorité, saute celles qui sont au
 * repos, et passe silencieusement à la suivante dès qu'une source est épuisée,
 * en panne ou trop lente. Côté utilisateur, il n'existe qu'un seul assistant.
 */
export class AIRouter {
  private providers: Provider[];
  private health: HealthRegistry;
  private onEvent?: (event: RouterEvent) => void;

  constructor({ providers, health, onEvent }: RouterOptions) {
    this.providers = [...providers].sort((a, b) => a.priority - b.priority);
    this.health = health ?? new HealthRegistry();
    this.onEvent = onEvent;
  }

  /** État interne des sources — pour la supervision, pas pour l'écran. */
  status() {
    return this.health.snapshot();
  }

  async route(request: RouteRequest): Promise<RouteResult> {
    const candidates = this.orderCandidates();
    if (candidates.length === 0) {
      this.onEvent?.({ type: 'exhausted', tried: [] });
      throw new AllProvidersFailedError([]);
    }

    const skipped: string[] = [];
    let attempt = 0;
    // Vrai dès qu'une tentative précédente a déjà affiché du texte : la
    // suivante doit alors demander à l'interface de repartir de zéro.
    let needsReset = false;

    for (const provider of candidates) {
      if (request.signal?.aborted) throw new CancelledError();

      attempt += 1;
      this.onEvent?.({ type: 'attempt', providerId: provider.id, attempt });
      const startedAt = Date.now();
      let emitted = false;

      try {
        const content = await provider.complete({
          messages: request.messages,
          signal: request.signal,
          temperature: request.temperature,
          onToken: request.onToken
            ? (chunk, meta) => {
                // reset : soit le routeur vient de changer de source, soit la
                // source (passerelle) signale qu'elle a changé de la sienne.
                const reset = (needsReset && !emitted) || Boolean(meta?.reset);
                request.onToken?.(chunk, { reset });
                emitted = true;
              }
            : undefined,
        });

        this.health.recordSuccess(provider.id);
        this.onEvent?.({
          type: 'success',
          providerId: provider.id,
          latencyMs: Date.now() - startedAt,
          chars: content.length,
        });
        return { content, providerId: provider.id, latencyMs: Date.now() - startedAt, skipped };
      } catch (error) {
        // Une annulation utilisateur n'est jamais une bascule.
        if (request.signal?.aborted) throw new CancelledError();

        const failure =
          error instanceof ProviderError
            ? error
            : new ProviderError({
                kind: 'down',
                message: error instanceof Error ? error.message : 'Échec inconnu',
              });

        this.health.recordFailure(provider.id, failure.kind, failure.retryAfterMs);
        skipped.push(provider.id);
        // Du texte partiel a pu s'afficher : la source suivante devra l'effacer.
        if (emitted) needsReset = true;

        const next = candidates[attempt] ?? null;
        this.onEvent?.({ type: 'switch', from: provider.id, to: next?.id ?? null, reason: failure.kind });
      }
    }

    this.onEvent?.({ type: 'exhausted', tried: skipped });
    throw new AllProvidersFailedError(skipped);
  }

  /**
   * Sources disponibles d'abord, sources au repos ensuite en dernier recours :
   * mieux vaut déranger une source fatiguée que ne rien répondre du tout.
   */
  private orderCandidates(): Provider[] {
    const usable = this.providers.filter((p) => p.isConfigured());
    const ready = usable.filter((p) => this.health.isAvailable(p.id));
    const resting = usable
      .filter((p) => !this.health.isAvailable(p.id))
      .sort((a, b) => this.health.cooldownRemaining(a.id) - this.health.cooldownRemaining(b.id));
    return [...ready, ...resting];
  }
}
