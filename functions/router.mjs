// Version Node du routeur : mêmes règles que le navigateur, mais avec les
// sources à clé. Les clés restent ici, jamais dans le bundle client.

const BASE_COOLDOWN = {
  quota: 10 * 60_000,
  down: 60_000,
  timeout: 30_000,
  empty: 20_000,
  refused: 30 * 60_000,
};
const MAX_COOLDOWN = 60 * 60_000;
const DEFAULT_TIMEOUT_MS = 45_000;
const FIRST_TOKEN_TIMEOUT_MS = 12_000;

/** Sources serveur, de la plus rapide à la plus tolérante. */
export const RECIPES = [
  { id: 'groq-llama-70b', priority: 5, endpoint: 'https://api.groq.com/openai/v1/chat/completions', model: 'llama-3.3-70b-versatile', keyEnv: 'GROQ_API_KEY' },
  { id: 'cerebras-llama-70b', priority: 6, endpoint: 'https://api.cerebras.ai/v1/chat/completions', model: 'llama-3.3-70b', keyEnv: 'CEREBRAS_API_KEY' },
  { id: 'openrouter-free', priority: 15, endpoint: 'https://openrouter.ai/api/v1/chat/completions', model: 'meta-llama/llama-3.3-70b-instruct:free', keyEnv: 'OPENROUTER_API_KEY' },
  { id: 'together-free', priority: 25, endpoint: 'https://api.together.xyz/v1/chat/completions', model: 'meta-llama/Llama-3.3-70B-Instruct-Turbo-Free', keyEnv: 'TOGETHER_API_KEY' },
  { id: 'huggingface-router', priority: 35, endpoint: 'https://router.huggingface.co/v1/chat/completions', model: 'meta-llama/Llama-3.1-8B-Instruct', keyEnv: 'HUGGINGFACE_API_KEY' },
  { id: 'pollinations-openai', priority: 40, endpoint: 'https://text.pollinations.ai/openai', model: 'openai' },
  { id: 'pollinations-mistral', priority: 50, endpoint: 'https://text.pollinations.ai/openai', model: 'mistral' },
];

/** État de santé partagé entre les invocations chaudes de la fonction. */
const health = new Map();

const available = (id) => {
  const entry = health.get(id);
  return !entry || entry.availableAt <= Date.now();
};

const recordFailure = (id, kind, retryAfterMs = 0) => {
  const entry = health.get(id) ?? { failures: 0, availableAt: 0 };
  entry.failures += 1;
  const backoff = BASE_COOLDOWN[kind] * 2 ** (entry.failures - 1);
  entry.availableAt = Date.now() + Math.min(MAX_COOLDOWN, Math.max(retryAfterMs, backoff));
  health.set(id, entry);
};

const kindFromStatus = (status) =>
  status === 429 || status === 402 ? 'quota' : status >= 500 ? 'down' : 'refused';

function retryAfterMs(response) {
  const header = response.headers.get('retry-after');
  if (!header) return 0;
  const seconds = Number(header);
  if (Number.isFinite(seconds)) return Math.max(0, seconds * 1000);
  const date = Date.parse(header);
  return Number.isNaN(date) ? 0 : Math.max(0, date - Date.now());
}

function usableRecipes() {
  const configured = RECIPES.filter((r) => !r.keyEnv || process.env[r.keyEnv]);
  const ready = configured.filter((r) => available(r.id));
  const resting = configured.filter((r) => !available(r.id));
  return [...ready, ...resting].sort((a, b) =>
    available(a.id) === available(b.id) ? a.priority - b.priority : available(a.id) ? -1 : 1,
  );
}

/**
 * Essaie les sources une à une et renvoie la première réponse complète.
 * `onToken` reçoit les fragments ; `reset` signale une bascule en cours de route.
 */
export async function route({ messages, temperature = 0.7, onToken }) {
  const tried = [];
  let needsReset = false;

  for (const recipe of usableRecipes()) {
    const controller = new AbortController();
    let emitted = false;
    let timer = setTimeout(() => controller.abort(), FIRST_TOKEN_TIMEOUT_MS);
    const keepAlive = () => {
      clearTimeout(timer);
      timer = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);
    };

    try {
      const response = await fetch(recipe.endpoint, {
        method: 'POST',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...(recipe.keyEnv ? { Authorization: `Bearer ${process.env[recipe.keyEnv]}` } : {}),
        },
        body: JSON.stringify({ model: recipe.model, messages, temperature, stream: true }),
      });

      if (!response.ok) {
        recordFailure(recipe.id, kindFromStatus(response.status), retryAfterMs(response));
        tried.push(recipe.id);
        continue;
      }

      let full = '';
      let buffer = '';
      for await (const chunk of response.body) {
        keepAlive();
        buffer += Buffer.from(chunk).toString('utf8');
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith('data:')) continue;
          const payload = trimmed.slice(5).trim();
          if (!payload || payload === '[DONE]') continue;
          try {
            const delta = JSON.parse(payload)?.choices?.[0]?.delta?.content;
            if (typeof delta === 'string' && delta) {
              full += delta;
              onToken?.(delta, { reset: needsReset && !emitted });
              emitted = true;
            }
          } catch {
            // Fragment SSE coupé en deux : complété au tour suivant.
          }
        }
      }

      if (!full.trim()) {
        recordFailure(recipe.id, 'empty');
        tried.push(recipe.id);
        if (emitted) needsReset = true;
        continue;
      }

      health.delete(recipe.id);
      return { content: full, providerId: recipe.id, tried };
    } catch (error) {
      recordFailure(recipe.id, error?.name === 'AbortError' ? 'timeout' : 'down');
      tried.push(recipe.id);
      if (emitted) needsReset = true;
    } finally {
      clearTimeout(timer);
    }
  }

  const error = new Error('Aucune source disponible');
  error.code = 'ALL_PROVIDERS_FAILED';
  error.tried = tried;
  throw error;
}
