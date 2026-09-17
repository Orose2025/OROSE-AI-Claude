import { describe, it, expect, beforeAll } from 'vitest';
import { build } from 'vite';
import { readFileSync, readdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';

// Construit réellement le projet et inspecte la feuille de style produite :
// c'est le seul moyen de vérifier ce que le navigateur recevra en production.
const OUT = 'dist-test-styles';
let css = '';
let fichiers: string[] = [];

beforeAll(async () => {
  rmSync(OUT, { recursive: true, force: true });
  // Vitest impose NODE_ENV=test, ce qui ferait embarquer la version de
  // développement de React et fausserait la mesure de poids. On construit
  // dans les mêmes conditions que la CI, puis on restaure.
  const envInitial = process.env.NODE_ENV;
  process.env.NODE_ENV = 'production';
  try {
    await build({
      logLevel: 'silent',
      build: { outDir: OUT, emptyOutDir: true },
    });
  } finally {
    process.env.NODE_ENV = envInitial;
  }
  const dir = join(OUT, 'assets');
  fichiers = readdirSync(dir);
  const nom = fichiers.find((f: string) => f.endsWith('.css'));
  if (!nom) throw new Error(`Aucun fichier CSS produit dans ${dir}`);
  css = readFileSync(join(dir, nom), 'utf8');
}, 120_000);

describe('la feuille de style de production', () => {
  it('contient les utilitaires Tailwind', () => {
    expect(css).toContain('.flex{display:flex}');
    expect(css).toContain('.min-h-screen{min-height:100vh}');
  });

  // Sans le preflight, les boutons et les champs gardent l'apparence native du
  // navigateur : bordure grise, police système. C'est le symptôme signalé.
  it('contient le preflight qui neutralise le style natif des contrôles', () => {
    expect(css).toMatch(/button[^{]*\{[^}]*appearance:button/);
    expect(css).toMatch(/font:inherit/);
  });

  it('réinitialise les marges et les listes', () => {
    expect(css).toMatch(/margin:0/);
    expect(css).toMatch(/list-style:none/);
  });

  // Le preflight met list-style:none sur ul/ol ; sans ces règles, les puces
  // et les numéros des réponses disparaissent.
  it('rend leurs puces aux listes des réponses', () => {
    expect(css).toContain('.aldup-prose ul{list-style-type:disc}');
    expect(css).toContain('.aldup-prose ol{list-style-type:decimal}');
  });
});

describe('le découpage du bundle', () => {
  // Le moteur markdown pèse plus que l'application elle-même. S'il retombait
  // dans le point d'entrée, l'ouverture de la page ralentirait d'autant.
  it('sort le moteur markdown du point d\'entrée', () => {
    const entree = fichiers.filter((f) => f.startsWith('index-') && f.endsWith('.js'));
    expect(entree).toHaveLength(1);
    const taille = readFileSync(join(OUT, 'assets', entree[0]), 'utf8').length;
    expect(taille).toBeLessThan(220_000);

    expect(fichiers.some((f) => f.startsWith('MessageContent-') && f.endsWith('.js'))).toBe(true);
  });
});
