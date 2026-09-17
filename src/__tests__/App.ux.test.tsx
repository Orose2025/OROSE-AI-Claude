// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import type { ChatMessage } from '../lib/ai/types';

const askAldup = vi.fn(async () => 'Ottawa est la capitale du Canada.');

vi.mock('../lib/ai/client', () => ({
  askAldup: (...args: unknown[]) => askAldup(...(args as [])),
  AllProvidersFailedError: class extends Error {},
  CancelledError: class extends Error {},
}));

import App from '../App';

beforeEach(() => {
  Element.prototype.scrollIntoView = vi.fn();
  localStorage.clear();
  askAldup.mockClear();
});
afterEach(cleanup);

function historique(appel = -1): ChatMessage[] {
  const calls = askAldup.mock.calls as unknown as [{ history: ChatMessage[] }][];
  return calls.at(appel)![0].history;
}

async function poserUneQuestion(texte: string) {
  fireEvent.click(screen.getAllByText(/Commencer/i)[0]);
  const zone = await screen.findByPlaceholderText('Écrivez votre message...');
  fireEvent.change(zone, { target: { value: texte } });
  fireEvent.click(screen.getByLabelText('Envoyer le message'));
}

describe('la conversation survit au rechargement', () => {
  it('réaffiche les messages après remontage de la page', async () => {
    render(<App />);
    await poserUneQuestion('Quelle est la capitale du Canada ?');
    await screen.findByText(/Ottawa est la capitale du Canada\./);

    // Remontage : équivalent d'un rechargement de l'onglet.
    cleanup();
    render(<App />);

    // La question apparaît deux fois : dans la bulle et comme titre de la
    // conversation en barre latérale.
    expect(await screen.findAllByText('Quelle est la capitale du Canada ?')).not.toHaveLength(0);
    expect(screen.getByText(/Ottawa est la capitale du Canada\./)).toBeTruthy();
    // Et on est bien dans la conversation, pas sur la page de présentation.
    expect(screen.getByPlaceholderText('Écrivez votre message...')).toBeTruthy();
  });
});

describe('régénérer la dernière réponse', () => {
  it('repose la même question sans empiler les réponses précédentes', async () => {
    render(<App />);
    await poserUneQuestion('Quelle est la capitale du Canada ?');
    await screen.findByText(/Ottawa est la capitale du Canada\./);

    const premier = historique();
    expect(premier).toHaveLength(1);

    fireEvent.click(await screen.findByLabelText('Régénérer la réponse'));
    await waitFor(() => expect(askAldup).toHaveBeenCalledTimes(2));

    // L'historique envoyé doit être identique au premier envoi : la question
    // seule, sans la réponse qu'on est justement en train de refaire.
    const second = historique();
    expect(second).toHaveLength(1);
    expect(second[0]).toMatchObject({
      role: 'user',
      content: 'Quelle est la capitale du Canada ?',
    });
  });
});

describe('le rendu des réponses dans la page', () => {
  it('affiche un titre markdown comme un titre', async () => {
    askAldup.mockResolvedValueOnce('### En résumé\n\nOttawa.');
    render(<App />);
    await poserUneQuestion('Résume.');
    expect(await screen.findByRole('heading', { name: 'En résumé' })).toBeTruthy();
    expect(screen.queryByText(/### En résumé/)).toBeNull();
  });
});
