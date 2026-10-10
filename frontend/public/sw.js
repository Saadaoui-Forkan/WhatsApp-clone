// Service Worker for Chat App PWA - Installable only (no offline caching)
const CACHE_NAME = 'chat-app-v1';

// Minimal install - just skip waiting
self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

// Minimal activate - just claim clients
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Pass-through fetch handler - no caching, just network
self.addEventListener('fetch', (event) => {
  // Let all requests pass through to network
  // This is intentional for "installable only" PWA
});

// Handle messages from main thread
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});