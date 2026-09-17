import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Sur GitHub Pages, le site est servi depuis /OROSE-AI-Claude/ et non depuis la
// racine du domaine. Le workflow Pages renseigne VITE_BASE_PATH ; partout
// ailleurs (dev local, Firebase Hosting) la base reste « / ».
const base = process.env.VITE_BASE_PATH || '/';

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  server: { host: '0.0.0.0', port: 3000, strictPort: true },
});
