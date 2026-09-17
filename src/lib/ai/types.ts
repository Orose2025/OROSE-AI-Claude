// Types partagés du moteur AI Aldup.
// Règle d'or : rien de ce qui identifie une source IA ne doit remonter à l'écran.

export type ChatRole = 'system' | 'user' | 'assistant';

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

/** Raison pour laquelle une source a été écartée. Usage interne (logs/analytics). */
export type FailureKind =
  | 'quota'      // 429, crédits épuisés → cooldown long
  | 'down'       // 5xx, DNS, réseau → cooldown court
  | 'timeout'    // pas de réponse dans le délai imparti
  | 'empty'      // réponse vide ou illisible
  | 'refused';   // 4xx autre que 429 (clé invalide, modèle retiré)

export interface ProviderFailure {
  kind: FailureKind;
  status?: number;
  message: string;
  /** Délai imposé par la source (header Retry-After), en millisecondes. */
  retryAfterMs?: number;
}

export interface CallOptions {
  messages: ChatMessage[];
  signal?: AbortSignal;
  /**
   * Appelé pour chaque fragment de texte reçu en streaming. `reset` indique que
   * le texte déjà affiché doit être effacé (la source a changé en cours de route).
   */
  onToken?: (chunk: string, meta?: { reset?: boolean }) => void;
  temperature?: number;
}

export interface Provider {
  /** Identifiant interne. N'apparaît jamais dans l'interface. */
  id: string;
  /** Plus la valeur est basse, plus la source est essayée tôt. */
  priority: number;
  /** true si la source exige une clé (donc interdite côté navigateur). */
  needsKey: boolean;
  /** Délai max avant d'abandonner cette source (ms). */
  timeoutMs: number;
  /** true si la source n'est utilisable que lorsque sa configuration est présente. */
  isConfigured(): boolean;
  complete(options: CallOptions): Promise<string>;
}

/** Événement interne du routeur — pour le monitoring, jamais pour l'utilisateur. */
export type RouterEvent =
  | { type: 'attempt'; providerId: string; attempt: number }
  | { type: 'success'; providerId: string; latencyMs: number; chars: number }
  | { type: 'switch'; from: string; to: string | null; reason: FailureKind }
  | { type: 'exhausted'; tried: string[] };

export interface RouteResult {
  /** Le texte de la réponse. C'est la seule chose que l'utilisateur verra. */
  content: string;
  /** Source réellement utilisée — interne, à ne jamais afficher. */
  providerId: string;
  latencyMs: number;
  /** Sources écartées avant d'y arriver — interne. */
  skipped: string[];
}
