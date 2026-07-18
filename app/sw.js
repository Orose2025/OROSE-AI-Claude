/* ECHEC O CUBE - service worker v33 (palette officielle Alain + Atelier textes + adresse unique)
   Page du jeu : RESEAU D'ABORD (les mises a jour arrivent tout de suite), cache de secours hors ligne.
   Images et fichiers fixes : cache d'abord (rapide), mis a jour en arriere-plan. */
const CACHE = 'eoc-v42';
const FICHIERS = ['./', './index.html', './logo-eoc.png', './icon-192.png', './icon-512.png', './manifest.json'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FICHIERS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  const estPage = e.request.mode === 'navigate' || url.pathname === '/' || url.pathname.endsWith('.html');
  if (estPage) {
    /* Reseau d'abord : version la plus recente garantie; cache seulement si hors ligne. */
    e.respondWith(fetch(e.request).then(rep => {
      if (rep.ok && url.origin === location.origin) {
        const copie = rep.clone();
        caches.open(CACHE).then(c => c.put(e.request, copie));
      }
      return rep;
    }).catch(() => caches.match(e.request).then(r => r || caches.match('./index.html'))));
  } else {
    /* Cache d'abord pour le reste, avec mise a jour en arriere-plan. */
    e.respondWith(caches.match(e.request).then(r => {
      const maj = fetch(e.request).then(rep => {
        if (rep.ok && url.origin === location.origin) {
          const copie = rep.clone();
          caches.open(CACHE).then(c => c.put(e.request, copie));
        }
        return rep;
      }).catch(() => r);
      return r || maj;
    }));
  }
});
