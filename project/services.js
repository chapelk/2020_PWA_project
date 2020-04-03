var cacheName = 'guideDuConfinement';
var filesToCache = [
  '/',
  '/list',
  '/create',
  // '/html/index.html',
  // '/html/list.html',
  // '/html/create.html',
  '/css/style.css',
  '/css/bootstrap.min.css',
  '/js/jquery.js',
  '/js/bootstrap.min.js',
  '/js/popper.js',
  '/allJoke',
  '/js/main.js',
  '/images/hello-icon-128.png',
  '/images/hello-icon-144.png',
  '/images/hello-icon-152.png',
  '/images/hello-icon-192.png',
  '/images/hello-icon-256.png',
  '/images/hello-icon-512.png',
  '/images/profile_400x400.png',
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});