// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest';
import { chargerSessions, sauverSessions, type SessionStockee } from '../lib/storage';

const exemple: SessionStockee[] = [
  {
    id: 'session-1',
    title: 'Capitale du Canada',
    createdAt: new Date('2026-01-02T03:04:05Z').toISOString(),
    messages: [
      { id: 'u1', role: 'user', content: 'Quelle est la capitale du Canada ?', timestamp: new Date('2026-01-02T03:04:05Z').toISOString() },
      { id: 'a1', role: 'assistant', content: 'Ottawa.', timestamp: new Date('2026-01-02T03:04:06Z').toISOString() },
    ],
  },
];

describe('la persistance des conversations', () => {
  beforeEach(() => localStorage.clear());

  it('relit ce qui a été écrit', () => {
    sauverSessions(exemple);
    const relu = chargerSessions();
    expect(relu).toHaveLength(1);
    expect(relu[0].messages[1].content).toBe('Ottawa.');
    expect(relu[0].title).toBe('Capitale du Canada');
  });

  it('renvoie une liste vide quand rien n\'a été enregistré', () => {
    expect(chargerSessions()).toEqual([]);
  });

  it('ignore un contenu illisible au lieu de faire planter la page', () => {
    localStorage.setItem('aldup:sessions', '{ceci n\'est pas du JSON');
    expect(chargerSessions()).toEqual([]);
  });

  it('écarte les entrées mal formées', () => {
    localStorage.setItem('aldup:sessions', JSON.stringify([{ pasUneSession: true }, exemple[0]]));
    expect(chargerSessions()).toHaveLength(1);
  });

  it('ne fait pas planter quand le stockage est indisponible', () => {
    const origine = Storage.prototype.setItem;
    Storage.prototype.setItem = () => { throw new Error('quota'); };
    expect(() => sauverSessions(exemple)).not.toThrow();
    Storage.prototype.setItem = origine;
  });
});
