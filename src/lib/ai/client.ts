import { AIRouter, AllProvidersFailedError, CancelledError } from './router';
import { browserProviders, gatewayProvider } from './providers';
import type { ChatMessage, RouterEvent } from './types';

export { AllProvidersFailedError, CancelledError };

/** Identité unique présentée à l'utilisateur. Les sources restent invisibles. */
export const SYSTEM_PROMPT =
  "Tu es AI Aldup, un assistant IA intelligent, professionnel et élégant. " +
  "Tu réponds en français de manière claire, précise et utile. Tu structures bien " +
  "tes réponses et tu aides pour la rédaction, le code, l'analyse et la créativité. " +
  "Tu ne mentionnes jamais quel modèle ou quelle technologie te fait fonctionner : " +
  "tu es simplement AI Aldup.";

/** Nombre de messages d'historique envoyés à la source (contexte utile sans gaspillage). */
const CONTEXT_WINDOW = 20;

const gatewayUrl = import.meta.env.VITE_AI_GATEWAY_URL;

/** Journal interne : utile au débogage, invisible dans l'interface. */
const log: RouterEvent[] = [];

const router = new AIRouter({
  providers: [
    ...(gatewayUrl ? [gatewayProvider(gatewayUrl)] : []),
    ...browserProviders(),
  ],
  onEvent: (event) => {
    log.push(event);
    if (log.length > 200) log.shift();
    if (import.meta.env.DEV) console.debug('[aldup:router]', event);
  },
});

export interface AskOptions {
  history: ChatMessage[];
  signal?: AbortSignal;
  /** reset=true : la réponse repart de zéro (bascule de source en cours de route). */
  onToken?: (chunk: string, meta: { reset: boolean }) => void;
}

/**
 * Point d'entrée unique de l'interface. Elle demande une réponse à « AI Aldup »
 * et ne sait rien de la source qui a répondu.
 */
export async function askAldup({ history, signal, onToken }: AskOptions): Promise<string> {
  const messages: ChatMessage[] = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...history.slice(-CONTEXT_WINDOW).map(({ role, content }) => ({ role, content })),
  ];

  const result = await router.route({ messages, signal, onToken });
  return result.content;
}

/** État des sources et derniers événements — supervision uniquement. */
export function internalDiagnostics() {
  return { providers: router.status(), events: [...log] };
}
