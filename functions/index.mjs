// Passerelle HTTP d'AIDup : expose une API compatible OpenAI au frontend,
// et masque entièrement les sources IA utilisées derrière.
import { onRequest } from 'firebase-functions/v2/https';
import { route, RECIPES } from './router.mjs';

const SECRETS = [
  'GROQ_API_KEY',
  'CEREBRAS_API_KEY',
  'OPENROUTER_API_KEY',
  'TOGETHER_API_KEY',
  'HUGGINGFACE_API_KEY',
];

const cors = (res) => {
  res.set('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN || '*');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
};

export const chatCompletion = onRequest({ secrets: SECRETS, timeoutSeconds: 120 }, async (req, res) => {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(204).send('');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Méthode non autorisée' });

  const messages = req.body?.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages requis' });
  }

  const wantsStream = req.body?.stream !== false;

  try {
    if (!wantsStream) {
      const { content } = await route({ messages, temperature: req.body?.temperature });
      // `model` reste générique : le frontend ne doit rien apprendre de la source.
      return res.json({ model: 'aldup', choices: [{ message: { role: 'assistant', content } }] });
    }

    res.set('Content-Type', 'text/event-stream');
    res.set('Cache-Control', 'no-cache');
    res.set('Connection', 'keep-alive');

    const send = (delta) => res.write(`data: ${JSON.stringify({ choices: [{ delta }] })}\n\n`);

    await route({
      messages,
      temperature: req.body?.temperature,
      onToken: (chunk, { reset }) => {
        // Une bascule de source en cours de route : on demande au client de
        // repartir de zéro, sans lui dire pourquoi.
        if (reset) send({ content: '', reset: true });
        send({ content: chunk });
      },
    });

    res.write('data: [DONE]\n\n');
    return res.end();
  } catch (error) {
    console.error('[aldup] échec du routage', { code: error?.code, tried: error?.tried });
    if (res.headersSent) return res.end();
    return res.status(503).json({ error: 'Service momentanément indisponible' });
  }
});

/** Ping périodique : réchauffe les sources et journalise celles qui répondent. */
export const providerHealth = onRequest({ secrets: SECRETS }, async (_req, res) => {
  const results = await Promise.all(
    RECIPES.map(async (recipe) => {
      const startedAt = Date.now();
      try {
        await route({ messages: [{ role: 'user', content: 'ping' }] });
        return { id: recipe.id, ok: true, latencyMs: Date.now() - startedAt };
      } catch {
        return { id: recipe.id, ok: false, latencyMs: Date.now() - startedAt };
      }
    }),
  );
  res.json({ checkedAt: new Date().toISOString(), results });
});
