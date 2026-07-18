const CACHE_NAME = "ciudad-trueque-cache-v1";
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
  "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500&display=swap"
];

// Install Event - Pre-cache App Shell resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[Service Worker] Caching app shell and static assets");
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// Activate Event - Clear old caches and take control
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("[Service Worker] Clearing old cache:", cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event with Network-First fallback to Cache
self.addEventListener("fetch", (event) => {
  // Only handle local requests and specific CDN requests (like fonts, Leaflet CSS)
  const url = new URL(event.request.url);
  const isLocalOrCDN = 
    url.origin === self.location.origin || 
    url.hostname.includes("unpkg.com") || 
    url.hostname.includes("fonts.googleapis.com") || 
    url.hostname.includes("fonts.gstatic.com");

  if (event.request.method !== "GET" || !isLocalOrCDN) {
    return;
  }

  // Skip caching for API calls if we want fresh responses, or let them fall back
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(
      fetch(event.request).catch(() => {
        console.log("[Service Worker] API Fetch failed, looking for cached version of:", event.request.url);
        return caches.match(event.request);
      })
    );
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // If request is valid, clone and cache it
        if (response && response.status === 200) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        // Fallback to cache if network fails
        console.log("[Service Worker] Fetch failed, falling back to cache for:", event.request.url);
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // If it's a navigation request and not cached, return index.html / root
          if (event.request.mode === "navigate") {
            return caches.match("/");
          }
        });
      })
  );
});

// ==========================================
// Firebase Cloud Messaging (FCM) Integration
// ==========================================

importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDW9eUWum36KpyYywtFF85f4YTcGZYZSCw",
  authDomain: "utility-sunbeam-r07pf.firebaseapp.com",
  projectId: "utility-sunbeam-r07pf",
  storageBucket: "utility-sunbeam-r07pf.firebasestorage.app",
  messagingSenderId: "633978869738",
  appId: "1:633978869738:web:06822ac2da76bb1ee2c493"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("[Service Worker] Received background message:", payload);
  const notificationTitle = payload.notification?.title || payload.data?.title || "Nuevo mensaje en Ciudad-Trueque 🤝";
  const notificationOptions = {
    body: payload.notification?.body || payload.data?.body || "Tenés un nuevo trueque o mensaje pendiente.",
    icon: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    badge: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    data: {
      url: payload.data?.url || "/"
    }
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", function(event) {
  event.notification.close();
  const urlToOpen = event.notification.data?.url || "/";
  event.waitUntil(
    clients.matchAll({
      type: "window",
      includeUncontrolled: true
    }).then(function(windowClients) {
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];
        if (client.url.includes(urlToOpen) && "focus" in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});

