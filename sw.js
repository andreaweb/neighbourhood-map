let CURRENT_CACHES = {
  offline: 'offline-v1'
}

// //first event of service worker lifecycle
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CURRENT_CACHES.offline).then(function(cache) {
      return cache.addAll([
        '../src/',
        '../public/'
      ]).then(() => console.log('Assets added to cache'))
     .catch(err => console.log('Error while fetching assets', err));
    })
  );
});

// //deletes oudated/unused caches because a sw can only be activated if all tabs of an earlier version are closed
self.addEventListener('activate', event => {
  let expectedCacheNames = Object.keys(CURRENT_CACHES).map(function(key) {
    return CURRENT_CACHES[key];
  });
  //confirms whether all required assets are already cached or not
  //the service worker will only be installed when all files are cached
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (expectedCacheNames.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

//caches all links
self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.open("response-cache").then(function(cache) {
      return cache
        .match(event.request)
        .then(function(response) {
          if (response) {
            return response;
          }
          return fetch(event.request).then(function(networkResponse) {
            cache.put(event.request, networkResponse.clone());

            return networkResponse;
          });
        })
        .catch(function(error) {
          console.error("Error in fetch handler:", error);
          throw error;
        });
    })
  );
});