import type { FailureKind } from './types';

/**
 * Disjoncteur par source. Une source qui vient d'échouer est mise au repos ;
 * plus elle échoue d'affilée, plus le repos est long. Tout est en mémoire :
 * aucun état n'a besoin d'être partagé avec l'interface.
 */

/** Repos de base selon la raison de l'échec (ms). */
const BASE_COOLDOWN: Record<FailureKind, number> = {
  quota: 10 * 60_000,
  down: 60_000,
  timeout: 30_000,
  empty: 20_000,
  refused: 30 * 60_000,
};

const MAX_COOLDOWN = 60 * 60_000;

interface HealthEntry {
  consecutiveFailures: number;
  availableAt: number;
  lastKind?: FailureKind;
}

export class HealthRegistry {
  private entries = new Map<string, HealthEntry>();
  private now: () => number;

  constructor(now: () => number = Date.now) {
    this.now = now;
  }

  isAvailable(providerId: string): boolean {
    const entry = this.entries.get(providerId);
    return !entry || entry.availableAt <= this.now();
  }

  /** Temps restant avant qu'une source redevienne utilisable (ms). */
  cooldownRemaining(providerId: string): number {
    const entry = this.entries.get(providerId);
    if (!entry) return 0;
    return Math.max(0, entry.availableAt - this.now());
  }

  recordFailure(providerId: string, kind: FailureKind, retryAfterMs?: number): void {
    const entry = this.entries.get(providerId) ?? { consecutiveFailures: 0, availableAt: 0 };
    entry.consecutiveFailures += 1;
    entry.lastKind = kind;

    const backoff = BASE_COOLDOWN[kind] * 2 ** (entry.consecutiveFailures - 1);
    const cooldown = Math.min(MAX_COOLDOWN, Math.max(retryAfterMs ?? 0, backoff));
    entry.availableAt = this.now() + cooldown;

    this.entries.set(providerId, entry);
  }

  recordSuccess(providerId: string): void {
    this.entries.delete(providerId);
  }

  /** Vue interne de l'état des sources (monitoring, jamais l'interface). */
  snapshot(): Record<string, { availableIn: number; failures: number; lastKind?: FailureKind }> {
    const out: Record<string, { availableIn: number; failures: number; lastKind?: FailureKind }> = {};
    for (const [id, entry] of this.entries) {
      out[id] = {
        availableIn: Math.max(0, entry.availableAt - this.now()),
        failures: entry.consecutiveFailures,
        lastKind: entry.lastKind,
      };
    }
    return out;
  }

  reset(): void {
    this.entries.clear();
  }
}
