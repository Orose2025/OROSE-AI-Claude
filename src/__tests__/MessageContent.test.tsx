// @vitest-environment jsdom
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import MessageContent from '../components/MessageContent';

afterEach(cleanup);

describe('le rendu du texte des réponses', () => {
  it('rend les titres markdown comme des titres, pas comme du texte brut', () => {
    render(<MessageContent text={'### En résumé\n\nVoilà.'} />);
    // Avant correctif, « ### En résumé » s'affichait tel quel à l'écran.
    expect(screen.queryByText(/### En résumé/)).toBeNull();
    expect(screen.getByRole('heading', { name: 'En résumé' })).toBeTruthy();
  });

  it('rend les listes à puces et numérotées', () => {
    const { container } = render(
      <MessageContent text={'- rouge\n- bleu\n\n1. un\n2. deux'} />,
    );
    expect(container.querySelectorAll('ul li')).toHaveLength(2);
    expect(container.querySelectorAll('ol li')).toHaveLength(2);
  });

  it('rend les blocs de code', () => {
    const { container } = render(
      <MessageContent text={'```js\nconst a = 1;\n```'} />,
    );
    expect(container.querySelector('pre code')).toBeTruthy();
    expect(container.textContent).toContain('const a = 1;');
  });

  // Le texte vient d'une source IA externe : il ne doit jamais être interprété
  // comme du HTML. L'ancien rendu l'injectait via dangerouslySetInnerHTML.
  it("n'exécute pas le HTML contenu dans une réponse", () => {
    const { container } = render(
      <MessageContent text={'<img src=x onerror="window.__xss=1"> et <script>window.__xss=2</script>'} />,
    );
    expect(container.querySelector('img')).toBeNull();
    expect(container.querySelector('script')).toBeNull();
    expect((window as unknown as { __xss?: number }).__xss).toBeUndefined();
  });

  it('ouvre les liens externes sans exposer la page d\'origine', () => {
    const { container } = render(<MessageContent text={'[site](https://exemple.fr)'} />);
    const lien = container.querySelector('a');
    expect(lien?.getAttribute('target')).toBe('_blank');
    expect(lien?.getAttribute('rel')).toContain('noopener');
  });
});
