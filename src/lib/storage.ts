// Persistance des conversations dans le navigateur.
// Rien n'est envoyé ailleurs : le stockage reste local à l'appareil.

export interface MessageStocke {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  /** Date ISO : JSON ne sait pas transporter un objet Date. */
  timestamp: string;
}

export interface SessionStockee {
  id: string;
  title: string;
  createdAt: string;
  messages: MessageStocke[];
}

const CLE = 'aldup:sessions';
/** Au-delà, on ne garde que les conversations les plus récentes. */
const MAX_SESSIONS = 50;

function estMessage(v: unknown): v is MessageStocke {
  const m = v as MessageStocke;
  return !!m && typeof m.id === 'string'
    && (m.role === 'user' || m.role === 'assistant')
    && typeof m.content === 'string'
    && typeof m.timestamp === 'string';
}

function estSession(v: unknown): v is SessionStockee {
  const s = v as SessionStockee;
  return !!s && typeof s.id === 'string' && typeof s.title === 'string'
    && typeof s.createdAt === 'string'
    && Array.isArray(s.messages) && s.messages.every(estMessage);
}

/** Lit les conversations enregistrées. Ne lève jamais : au pire, liste vide. */
export function chargerSessions(): SessionStockee[] {
  try {
    const brut = localStorage.getItem(CLE);
    if (!brut) return [];
    const donnees: unknown = JSON.parse(brut);
    return Array.isArray(donnees) ? donnees.filter(estSession) : [];
  } catch {
    return [];
  }
}

/** Enregistre les conversations. Un stockage plein ou refusé est sans effet. */
export function sauverSessions(sessions: SessionStockee[]): void {
  try {
    localStorage.setItem(CLE, JSON.stringify(sessions.slice(0, MAX_SESSIONS)));
  } catch {
    // Navigation privée, quota atteint : l'application continue sans historique.
  }
}
