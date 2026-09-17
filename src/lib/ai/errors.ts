import type { FailureKind, ProviderFailure } from './types';

/** Erreur interne du moteur : porte la raison de l'échec pour le routeur. */
export class ProviderError extends Error {
  readonly kind: FailureKind;
  readonly status?: number;
  readonly retryAfterMs?: number;

  constructor(failure: ProviderFailure) {
    super(failure.message);
    this.name = 'ProviderError';
    this.kind = failure.kind;
    this.status = failure.status;
    this.retryAfterMs = failure.retryAfterMs;
  }
}

/** Traduit un statut HTTP en raison d'échec exploitable par le routeur. */
export function kindFromStatus(status: number): FailureKind {
  if (status === 429 || status === 402) return 'quota';
  if (status >= 500) return 'down';
  return 'refused';
}

/** Lit le header Retry-After (secondes ou date HTTP) et renvoie des millisecondes. */
export function parseRetryAfter(header: string | null): number | undefined {
  if (!header) return undefined;
  const seconds = Number(header);
  if (Number.isFinite(seconds)) return Math.max(0, seconds * 1000);
  const date = Date.parse(header);
  if (Number.isNaN(date)) return undefined;
  return Math.max(0, date - Date.now());
}
