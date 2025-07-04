const CACHE_NAME = 'chat-app-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/512.png',
  '/static/js/bundle.js', 
  '/static/js/main.chunk.js',
  '/static/css/main.chunk.css',
];

// Installation: pre-cache essential files
self.addEventListener('install', event => {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[Service Worker] Caching app shell');
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting(); // optional: activate service worker immediately
});

// Activation: delete old caches
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activating...');
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
  return self.clients.claim();
});

// Fetch: serve files from cache if offline
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(response => {
      return (
        response ||
        fetch(event.request).catch(() => {
          // Optional: return offline fallback page if available
        })
      );
    })
  );
});