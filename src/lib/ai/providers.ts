import { callOpenAICompatible } from './openaiCompatible';
import type { CallOptions, Provider } from './types';

/**
 * Catalogue des sources IA gratuites.
 *
 * Deux familles :
 *  - sans clé  → appelables directement depuis le navigateur ;
 *  - avec clé  → réservées à la passerelle serveur (functions/), car une clé
 *                envoyée au navigateur est une clé publiée.
 */

const env = (key: string): string | undefined => {
  // Navigateur (Vite) puis Node (Cloud Function) : une seule lecture pour les deux.
  const viteEnv = (import.meta as unknown as { env?: Record<string, string> }).env;
  return viteEnv?.[key] ?? (globalThis as { process?: { env?: Record<string, string> } }).process?.env?.[key];
};

interface Recipe {
  id: string;
  priority: number;
  endpoint: string;
  model: string;
  needsKey: boolean;
  apiKeyEnv?: string;
  headers?: Record<string, string>;
  stream?: boolean;
  timeoutMs?: number;
  firstTokenTimeoutMs?: number;
}

/** Sources sans clé : utilisables partout, y compris dans le navigateur. */
export const KEYLESS_RECIPES: Recipe[] = [
  { id: 'pollinations-openai', priority: 10, endpoint: 'https://text.pollinations.ai/openai', model: 'openai', needsKey: false, stream: true },
  { id: 'pollinations-mistral', priority: 20, endpoint: 'https://text.pollinations.ai/openai', model: 'mistral', needsKey: false, stream: true },
  { id: 'pollinations-llama', priority: 30, endpoint: 'https://text.pollinations.ai/openai', model: 'llama', needsKey: false, stream: true },
  { id: 'pollinations-deepseek', priority: 40, endpoint: 'https://text.pollinations.ai/openai', model: 'deepseek', needsKey: false, stream: true },
];

/** Sources à clé : chargées uniquement côté serveur. */
export const KEYED_RECIPES: Recipe[] = [
  { id: 'groq-llama-70b', priority: 5, endpoint: 'https://api.groq.com/openai/v1/chat/completions', model: 'llama-3.3-70b-versatile', needsKey: true, apiKeyEnv: 'GROQ_API_KEY', stream: true },
  { id: 'cerebras-llama-70b', priority: 6, endpoint: 'https://api.cerebras.ai/v1/chat/completions', model: 'llama-3.3-70b', needsKey: true, apiKeyEnv: 'CEREBRAS_API_KEY', stream: true },
  { id: 'openrouter-free', priority: 15, endpoint: 'https://openrouter.ai/api/v1/chat/completions', model: 'meta-llama/llama-3.3-70b-instruct:free', needsKey: true, apiKeyEnv: 'OPENROUTER_API_KEY', stream: true },
  { id: 'together-free', priority: 25, endpoint: 'https://api.together.xyz/v1/chat/completions', model: 'meta-llama/Llama-3.3-70B-Instruct-Turbo-Free', needsKey: true, apiKeyEnv: 'TOGETHER_API_KEY', stream: true },
  { id: 'huggingface-router', priority: 35, endpoint: 'https://router.huggingface.co/v1/chat/completions', model: 'meta-llama/Llama-3.1-8B-Instruct', needsKey: true, apiKeyEnv: 'HUGGINGFACE_API_KEY', stream: true },
];

const DEFAULT_TIMEOUT_MS = 45_000;
const DEFAULT_FIRST_TOKEN_TIMEOUT_MS = 12_000;

function toProvider(recipe: Recipe): Provider {
  const timeoutMs = recipe.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  return {
    id: recipe.id,
    priority: recipe.priority,
    needsKey: recipe.needsKey,
    timeoutMs,
    isConfigured: () => !recipe.needsKey || Boolean(recipe.apiKeyEnv && env(recipe.apiKeyEnv)),
    complete: (options: CallOptions) =>
      callOpenAICompatible(
        {
          endpoint: recipe.endpoint,
          model: recipe.model,
          apiKey: recipe.apiKeyEnv ? env(recipe.apiKeyEnv) : undefined,
          headers: recipe.headers,
          stream: recipe.stream,
          timeoutMs,
          firstTokenTimeoutMs: recipe.firstTokenTimeoutMs ?? DEFAULT_FIRST_TOKEN_TIMEOUT_MS,
        },
        options,
      ),
  };
}

/** Sources appelables depuis le navigateur (aucune clé n'y transite). */
export function browserProviders(): Provider[] {
  return KEYLESS_RECIPES.map(toProvider).sort((a, b) => a.priority - b.priority);
}

/** Sources appelables depuis la Cloud Function : les clés + les gratuites en filet. */
export function serverProviders(): Provider[] {
  return [...KEYED_RECIPES, ...KEYLESS_RECIPES]
    .map(toProvider)
    .filter((provider) => provider.isConfigured())
    .sort((a, b) => a.priority - b.priority);
}

/**
 * La passerelle serveur vue comme une source parmi d'autres : le navigateur
 * l'essaie en premier quand elle est déployée, et retombe sur les sources
 * sans clé si elle est absente ou en panne.
 */
export function gatewayProvider(url: string): Provider {
  return toProvider({
    id: 'aldup-gateway',
    priority: 0,
    endpoint: url,
    model: 'aldup',
    needsKey: false,
    stream: true,
  });
}
