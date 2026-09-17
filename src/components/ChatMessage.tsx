import { memo, useState, lazy, Suspense } from 'react';

// Le moteur markdown pèse plus que le reste de l'application réunie. Il n'est
// chargé qu'à la première réponse affichée : la page d'accueil reste légère.
const MessageContent = lazy(() => import('./MessageContent'));

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AvatarAldup = () => (
  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-purple-500/10">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-white">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor" />
    </svg>
  </div>
);

const AvatarUtilisateur = () => (
  <div className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center shrink-0 border border-white/10">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-300">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  </div>
);

interface Props {
  msg: Message;
  /** Les actions n'apparaissent que sous la dernière réponse terminée. */
  actionsVisibles: boolean;
  onRegenerer: () => void;
}

function ChatMessage({ msg, actionsVisibles, onRegenerer }: Props) {
  const [copie, setCopie] = useState(false);
  const estUtilisateur = msg.role === 'user';

  const copier = async () => {
    try {
      await navigator.clipboard.writeText(msg.content);
      setCopie(true);
      setTimeout(() => setCopie(false), 1600);
    } catch {
      // Presse-papiers indisponible : on n'interrompt pas la lecture.
    }
  };

  return (
    <div className={`flex gap-4 ${estUtilisateur ? 'justify-end' : 'justify-start'}`}>
      {!estUtilisateur && <AvatarAldup />}

      <div className="max-w-[85%] min-w-0">
        <div
          className={
            estUtilisateur
              ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white px-5 py-3.5 rounded-2xl rounded-br-md shadow-lg shadow-blue-600/10'
              : 'bg-white/[0.04] text-gray-200 px-5 py-4 rounded-2xl rounded-bl-md border border-white/5'
          }
        >
          {estUtilisateur ? (
            <p className="text-[0.9375rem] leading-relaxed whitespace-pre-wrap break-words">
              {msg.content}
            </p>
          ) : (
            <Suspense
              fallback={
                <p className="text-[0.9375rem] leading-relaxed whitespace-pre-wrap break-words">
                  {msg.content}
                </p>
              }
            >
              <MessageContent text={msg.content} />
            </Suspense>
          )}
        </div>

        {actionsVisibles && (
          <div className="flex gap-1 mt-2">
            <button
              type="button"
              onClick={copier}
              aria-label="Copier la réponse"
              className="px-2.5 py-1.5 rounded-lg text-xs text-gray-500 hover:text-gray-200
                         hover:bg-white/5 transition-colors"
            >
              {copie ? 'Copié' : 'Copier'}
            </button>
            <button
              type="button"
              onClick={onRegenerer}
              aria-label="Régénérer la réponse"
              className="px-2.5 py-1.5 rounded-lg text-xs text-gray-500 hover:text-gray-200
                         hover:bg-white/5 transition-colors"
            >
              Régénérer
            </button>
          </div>
        )}
      </div>

      {estUtilisateur && <AvatarUtilisateur />}
    </div>
  );
}

// Pendant le streaming, seule la dernière bulle change : les autres ne sont
// pas re-rendues à chaque fragment reçu.
export default memo(ChatMessage);
