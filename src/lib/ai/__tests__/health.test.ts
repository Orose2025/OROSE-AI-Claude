import { describe, expect, it } from 'vitest';
import { HealthRegistry } from '../health';

describe('HealthRegistry', () => {
  it('considère une source inconnue comme disponible', () => {
    expect(new HealthRegistry().isAvailable('a')).toBe(true);
  });

  it('allonge le repos à chaque échec consécutif', () => {
    let now = 0;
    const health = new HealthRegistry(() => now);

    health.recordFailure('a', 'down');
    const first = health.cooldownRemaining('a');
    health.recordFailure('a', 'down');
    const second = health.cooldownRemaining('a');

    expect(second).toBeGreaterThan(first);
  });

  it("respecte le délai imposé par la source quand il est plus long", () => {
    let now = 0;
    const health = new HealthRegistry(() => now);
    health.recordFailure('a', 'down', 2 * 60 * 60_000);
    // Plafonné à une heure, même si la source en demande deux.
    expect(health.cooldownRemaining('a')).toBe(60 * 60_000);
  });

  it('redevient disponible une fois le repos écoulé', () => {
    let now = 0;
    const health = new HealthRegistry(() => now);
    health.recordFailure('a', 'timeout');
    expect(health.isAvailable('a')).toBe(false);
    now += 60 * 60_000;
    expect(health.isAvailable('a')).toBe(true);
  });

  it('efface le compteur après un succès', () => {
    const health = new HealthRegistry();
    health.recordFailure('a', 'quota');
    health.recordSuccess('a');
    expect(health.isAvailable('a')).toBe(true);
    expect(health.snapshot()).toEqual({});
  });
});
