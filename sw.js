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

// Aggiungi qui tutte le immagini delle ricette e degli ingredienti
// Esempio: './assets/recipes/recipe1.png', ecc.

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache opened');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

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