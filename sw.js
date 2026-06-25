// Wierszyki service worker.
// IMPORTANT: bump CACHE_VERSION on every deploy so installed copies fetch the new build.
const CACHE_VERSION = 'wierszyki-v7';
const CORE = ['./', './index.html', './manifest.json'];

self.addEventListener('install', (e) => {
  // Do NOT skipWaiting automatically — the app shows a "new version" prompt and
  // the user taps Reload, which posts SKIP_WAITING (handled below).
  e.waitUntil(caches.open(CACHE_VERSION).then(c => c.addAll(CORE).catch(() => {})));
});

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('message', (e) => {
  if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Leave cross-origin requests (Babel CDN, OpenAI, etc.) to the network.
  if (url.origin !== self.location.origin) return;

  // Navigations: network-first so new deploys are picked up; fall back to cache offline.
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE_VERSION).then(c => c.put('./index.html', copy));
        return res;
      }).catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Other same-origin GETs: cache-first, then network (and cache the result).
  e.respondWith(
    caches.match(req).then(cached => cached || fetch(req).then(res => {
      const copy = res.clone();
      caches.open(CACHE_VERSION).then(c => c.put(req, copy));
      return res;
    }).catch(() => cached))
  );
});
