import { memo, useState, type ReactNode } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

/** Bouton « Copier » posé sur les blocs de code. */
function CopierCode({ code }: { code: string }) {
  const [copie, setCopie] = useState(false);

  const copier = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopie(true);
      setTimeout(() => setCopie(false), 1600);
    } catch {
      // Presse-papiers refusé (contexte non sécurisé) : on n'alerte pas.
    }
  };

  return (
    <button
      type="button"
      onClick={copier}
      aria-label="Copier le code"
      className="absolute top-2 right-2 px-2 py-1 rounded-md text-xs text-gray-400
                 bg-white/5 border border-white/10 opacity-0 group-hover:opacity-100
                 focus-visible:opacity-100 hover:text-white hover:bg-white/10 transition"
    >
      {copie ? 'Copié' : 'Copier'}
    </button>
  );
}

/** Extrait le texte brut d'un nœud React, pour alimenter le presse-papiers. */
function texteDe(node: ReactNode): string {
  if (node == null || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(texteDe).join('');
  if (typeof node === 'object' && 'props' in node) {
    return texteDe((node as { props: { children?: ReactNode } }).props.children);
  }
  return '';
}

/**
 * Affiche le texte d'une réponse en markdown.
 *
 * Le texte provient d'une source IA externe : il n'est jamais injecté comme
 * HTML. react-markdown n'interprète pas les balises brutes, ce qui écarte
 * toute exécution de script venue d'une réponse.
 */
function MessageContent({ text }: { text: string }) {
  return (
    <div className="aldup-prose text-[0.9375rem] leading-relaxed">
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ children, ...props }) => (
            <a {...props} target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),
          pre: ({ children }) => (
            <div className="group relative">
              <pre>{children}</pre>
              <CopierCode code={texteDe(children)} />
            </div>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto">
              <table>{children}</table>
            </div>
          ),
        }}
      >
        {text}
      </Markdown>
    </div>
  );
}

// Le texte grandit fragment par fragment pendant le streaming : sans memo,
// toutes les bulles de la conversation seraient re-rendues à chaque fragment.
export default memo(MessageContent);
