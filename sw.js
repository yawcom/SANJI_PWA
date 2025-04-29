const CACHE_NAME = 'sanji-game-v1';
const urlsToCache = [
  './',
  './index.html',
  './game.js',
  './recipes.js',
  './manifest.json',
  './assets/bg.png',
  './assets/bgStart.png',
  './assets/bgGameOver.png',
  './assets/bgWin.png',
  './assets/Copy.png',
  './assets/icons/icon-192x192.png',
  './assets/icons/icon-512x512.png'
];

/// Install service worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch from cache first, then network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// Update cache when new version is available
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});