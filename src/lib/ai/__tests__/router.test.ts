import { describe, expect, it, vi } from 'vitest';
import { AIRouter, AllProvidersFailedError, CancelledError } from '../router';
import { HealthRegistry } from '../health';
import { ProviderError } from '../errors';
import type { CallOptions, Provider } from '../types';

/** Source de test : répond, échoue, ou écrit du texte avant d'échouer. */
function fakeProvider(
  id: string,
  priority: number,
  behaviour: (options: CallOptions) => Promise<string>,
): Provider {
  return { id, priority, needsKey: false, timeoutMs: 1000, isConfigured: () => true, complete: behaviour };
}

const ok = (id: string, priority: number, text: string) =>
  fakeProvider(id, priority, async ({ onToken }) => {
    onToken?.(text);
    return text;
  });

const fails = (id: string, priority: number, kind: 'quota' | 'down' = 'quota') =>
  fakeProvider(id, priority, async () => {
    throw new ProviderError({ kind, message: `${id} indisponible` });
  });

describe('AIRouter', () => {
  it('utilise la source la plus prioritaire quand elle répond', async () => {
    const router = new AIRouter({ providers: [ok('b', 20, 'B'), ok('a', 10, 'A')] });
    const result = await router.route({ messages: [{ role: 'user', content: 'salut' }] });
    expect(result.content).toBe('A');
    expect(result.providerId).toBe('a');
    expect(result.skipped).toEqual([]);
  });

  it('bascule sur la source suivante quand la première est épuisée', async () => {
    const router = new AIRouter({ providers: [fails('a', 10), ok('b', 20, 'réponse B')] });
    const result = await router.route({ messages: [{ role: 'user', content: 'salut' }] });
    expect(result.content).toBe('réponse B');
    expect(result.skipped).toEqual(['a']);
  });

  it("n'expose jamais la source dans le texte renvoyé", async () => {
    const router = new AIRouter({ providers: [fails('groq-llama-70b', 5), ok('pollinations-openai', 10, 'Bonjour !')] });
    const result = await router.route({ messages: [{ role: 'user', content: 'salut' }] });
    expect(result.content).toBe('Bonjour !');
    expect(result.content).not.toMatch(/groq|pollinations/i);
  });

  it('demande un reset quand la bascule survient après un début de réponse', async () => {
    const partial = fakeProvider('a', 10, async ({ onToken }) => {
      onToken?.('début coupé');
      throw new ProviderError({ kind: 'down', message: 'coupure' });
    });
    const router = new AIRouter({ providers: [partial, ok('b', 20, 'réponse complète')] });

    const chunks: Array<{ chunk: string; reset: boolean }> = [];
    await router.route({
      messages: [{ role: 'user', content: 'salut' }],
      onToken: (chunk, meta) => chunks.push({ chunk, reset: meta.reset }),
    });

    expect(chunks[0]).toEqual({ chunk: 'début coupé', reset: false });
    expect(chunks[1]).toEqual({ chunk: 'réponse complète', reset: true });
  });

  it('met une source en repos après un échec et la saute au tour suivant', async () => {
    const health = new HealthRegistry();
    const first = vi.fn(async () => {
      throw new ProviderError({ kind: 'quota', message: 'épuisée' });
    });
    const router = new AIRouter({
      providers: [fakeProvider('a', 10, first), ok('b', 20, 'B')],
      health,
    });

    await router.route({ messages: [{ role: 'user', content: '1' }] });
    await router.route({ messages: [{ role: 'user', content: '2' }] });

    expect(first).toHaveBeenCalledTimes(1);
    expect(health.isAvailable('a')).toBe(false);
  });

  it('réessaie une source au repos plutôt que de ne rien répondre', async () => {
    const health = new HealthRegistry();
    health.recordFailure('a', 'quota');
    const router = new AIRouter({ providers: [ok('a', 10, 'A malgré tout')], health });
    const result = await router.route({ messages: [{ role: 'user', content: 'salut' }] });
    expect(result.content).toBe('A malgré tout');
  });

  it('remet une source en service après un succès', async () => {
    const health = new HealthRegistry();
    health.recordFailure('a', 'down');
    const router = new AIRouter({ providers: [ok('a', 10, 'A')], health });
    await router.route({ messages: [{ role: 'user', content: 'salut' }] });
    expect(health.isAvailable('a')).toBe(true);
  });

  it('échoue explicitement quand toutes les sources sont hors service', async () => {
    const router = new AIRouter({ providers: [fails('a', 10), fails('b', 20, 'down')] });
    await expect(router.route({ messages: [{ role: 'user', content: 'salut' }] })).rejects.toBeInstanceOf(
      AllProvidersFailedError,
    );
  });

  it("traite l'annulation utilisateur comme un arrêt, pas comme une bascule", async () => {
    const controller = new AbortController();
    const second = vi.fn(async () => 'ne devrait pas être appelé');
    const aborting = fakeProvider('a', 10, async () => {
      controller.abort();
      throw new Error('aborted');
    });
    const router = new AIRouter({ providers: [aborting, fakeProvider('b', 20, second)] });

    await expect(
      router.route({ messages: [{ role: 'user', content: 'salut' }], signal: controller.signal }),
    ).rejects.toBeInstanceOf(CancelledError);
    expect(second).not.toHaveBeenCalled();
  });

  it('ignore les sources non configurées', async () => {
    const unconfigured: Provider = {
      ...ok('a', 10, 'A'),
      isConfigured: () => false,
    };
    const router = new AIRouter({ providers: [unconfigured, ok('b', 20, 'B')] });
    const result = await router.route({ messages: [{ role: 'user', content: 'salut' }] });
    expect(result.providerId).toBe('b');
  });
});
