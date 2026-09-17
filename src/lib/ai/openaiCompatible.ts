import { ProviderError, kindFromStatus, parseRetryAfter } from './errors';
import type { CallOptions } from './types';

export interface OpenAICompatibleConfig {
  endpoint: string;
  model: string;
  apiKey?: string;
  /** En-têtes additionnels exigés par certaines passerelles (OpenRouter, etc.). */
  headers?: Record<string, string>;
  stream?: boolean;
  timeoutMs: number;
  /** Délai max avant le tout premier fragment : détecte une source qui traîne. */
  firstTokenTimeoutMs?: number;
}

/**
 * Transport commun à toutes les sources exposant une API compatible OpenAI
 * (/chat/completions). Renvoie le texte complet et pousse les fragments au fur
 * et à mesure via onToken quand le streaming est actif.
 */
export async function callOpenAICompatible(
  config: OpenAICompatibleConfig,
  { messages, signal, onToken, temperature = 0.7 }: CallOptions,
): Promise<string> {
  const controller = new AbortController();
  const abortOuter = () => controller.abort();
  signal?.addEventListener('abort', abortOuter, { once: true });

  let timer: ReturnType<typeof setTimeout> | undefined;
  const arm = (ms: number) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => controller.abort('timeout'), ms);
  };
  arm(config.firstTokenTimeoutMs ?? config.timeoutMs);

  try {
    const response = await fetch(config.endpoint, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...(config.apiKey ? { Authorization: `Bearer ${config.apiKey}` } : {}),
        ...config.headers,
      },
      body: JSON.stringify({
        model: config.model,
        messages,
        temperature,
        stream: config.stream ?? false,
      }),
    });

    if (!response.ok) {
      throw new ProviderError({
        kind: kindFromStatus(response.status),
        status: response.status,
        message: `HTTP ${response.status} sur ${config.model}`,
        retryAfterMs: parseRetryAfter(response.headers.get('retry-after')),
      });
    }

    const text = config.stream && response.body
      ? await readStream(response.body, onToken, () => arm(config.timeoutMs))
      : await readJson(response, onToken);

    if (!text.trim()) {
      throw new ProviderError({ kind: 'empty', message: `Réponse vide de ${config.model}` });
    }
    return text;
  } catch (error) {
    throw normalize(error, config.model);
  } finally {
    if (timer) clearTimeout(timer);
    signal?.removeEventListener('abort', abortOuter);
  }
}

async function readJson(response: Response, onToken?: CallOptions['onToken']): Promise<string> {
  const data = await response.json();
  const content: string =
    data?.choices?.[0]?.message?.content ?? data?.choices?.[0]?.text ?? '';
  if (content && onToken) onToken(content);
  return content;
}

/** Lit un flux SSE compatible OpenAI et réarme le chronomètre à chaque fragment. */
async function readStream(
  body: ReadableStream<Uint8Array>,
  onToken: CallOptions['onToken'],
  keepAlive: () => void,
): Promise<string> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let full = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    keepAlive();
    buffer += decoder.decode(value, { stream: true });

    const lines = buffer.split('\n');
    buffer = lines.pop() ?? '';

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith('data:')) continue;
      const payload = trimmed.slice(5).trim();
      if (!payload || payload === '[DONE]') continue;
      try {
        const delta = JSON.parse(payload)?.choices?.[0]?.delta;
        // La passerelle signale ainsi qu'elle a changé de source : tout ce qui
        // a été affiché jusqu'ici doit être effacé.
        if (delta?.reset) {
          full = '';
          onToken?.('', { reset: true });
        }
        if (typeof delta?.content === 'string' && delta.content) {
          full += delta.content;
          onToken?.(delta.content);
        }
      } catch {
        // Fragment SSE tronqué : il sera complété au tour suivant.
      }
    }
  }
  return full;
}

function normalize(error: unknown, model: string): ProviderError {
  if (error instanceof ProviderError) return error;
  if (error instanceof DOMException && error.name === 'AbortError') {
    return new ProviderError({ kind: 'timeout', message: `Délai dépassé sur ${model}` });
  }
  return new ProviderError({
    kind: 'down',
    message: error instanceof Error ? error.message : `Échec réseau sur ${model}`,
  });
}
