/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** URL de la passerelle serveur ; absente, l'app utilise les sources sans clé. */
  readonly VITE_AI_GATEWAY_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
