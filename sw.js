const CACHE_NAME = 'rjn-online-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  // Aap yahan apne zaroori CSS ya Images ke links bhi add kar sakte hain
];

// Service Worker Install ho raha hai
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Requests ko fetch karna
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache mein mil gaya toh wahi return karo, nahi toh network se lo
        return response || fetch(event.request);
      })
  );
});

// Purane cache ko delete karna
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
