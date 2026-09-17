// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import type { ChatMessage } from '../lib/ai/types';

// On intercepte le moteur : ce test ne vérifie pas la qualité de la réponse,
// mais que le message de l'utilisateur arrive bien jusqu'à lui.
const askAldup = vi.fn(async () => 'réponse');

vi.mock('../lib/ai/client', () => ({
  askAldup: (...args: unknown[]) => askAldup(...(args as [])),
  AllProvidersFailedError: class extends Error {},
  CancelledError: class extends Error {},
}));

import App from '../App';

// jsdom n'implémente pas scrollIntoView, utilisé par l'auto-défilement.
beforeEach(() => {
  Element.prototype.scrollIntoView = vi.fn();
});

// Sans globals, @testing-library ne démonte pas automatiquement entre les cas.
afterEach(cleanup);

/** Historique réellement transmis au moteur lors du dernier appel. */
function dernierHistorique(): ChatMessage[] {
  const call = askAldup.mock.calls.at(-1) as unknown as [{ history: ChatMessage[] }];
  return call[0].history;
}

async function envoyer(texte: string) {
  render(<App />);
  fireEvent.click(screen.getAllByText(/Commencer/i)[0]);
  const zone = await screen.findByPlaceholderText('Écrivez votre message...');
  fireEvent.change(zone, { target: { value: texte } });
  fireEvent.click(screen.getByLabelText('Envoyer le message'));
  await waitFor(() => expect(askAldup).toHaveBeenCalled());
}

describe("l'historique envoyé au moteur", () => {
  beforeEach(() => {
    askAldup.mockClear();
  });

  it("contient la question de l'utilisateur", async () => {
    await envoyer('Combien font 12 fois 8 ?');

    const history = dernierHistorique();
    // Sans le message utilisateur, la source ne reçoit que le system prompt et
    // répond par une formule d'accueil générique, quelle que soit la question.
    expect(history).toHaveLength(1);
    expect(history[0]).toMatchObject({
      role: 'user',
      content: 'Combien font 12 fois 8 ?',
    });
  });

  it("ne transmet aucun message au contenu vide", async () => {
    await envoyer('Quelle est la capitale du Canada ?');

    for (const message of dernierHistorique()) {
      expect(typeof message.content).toBe('string');
      expect(message.content.trim()).not.toBe('');
    }
  });
});
