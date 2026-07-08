// Kill switch: this project never registers a service worker. This file
// exists only so a stale worker left behind by a different local project
// (also served from this origin/port) finds real content on its next
// update check instead of a 404, installs, wipes every cache, unregisters
// itself, and reloads the clients it controlled.
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
      await self.registration.unregister();

      const clients = await self.clients.matchAll({ type: 'window' });
      clients.forEach((client) => client.navigate(client.url));
    })(),
  );
});
