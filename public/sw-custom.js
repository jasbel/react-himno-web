/* eslint-disable no-restricted-globals */
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'
import { registerRoute, Route } from 'workbox-routing'
import { CacheFirst, StaleWhileRevalidate, NetworkFirst } from 'workbox-strategies'
import { ExpirationPlugin } from 'workbox-expiration'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'

// Precache all assets
precacheAndRoute(self.__WB_MANIFEST)

// Clean up outdated caches
cleanupOutdatedCaches()

// Cache JSON files (songs data) with CacheFirst strategy
const jsonCache = new Route(
    ({ request }) => request.destination === 'json' || request.url.endsWith('.json'),
    new CacheFirst({
        cacheName: 'json-cache',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
            new ExpirationPlugin({
                maxEntries: 100,
                maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
            }),
        ],
    })
)

// Cache images with CacheFirst strategy
const imageCache = new Route(
    ({ request }) => request.destination === 'image',
    new CacheFirst({
        cacheName: 'image-cache',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
            new ExpirationPlugin({
                maxEntries: 100,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
            }),
        ],
    })
)

// Cache JavaScript and CSS files with StaleWhileRevalidate strategy
const staticAssetsCache = new Route(
    ({ request }) =>
        request.destination === 'script' ||
        request.destination === 'style',
    new StaleWhileRevalidate({
        cacheName: 'static-assets-cache',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
        ],
    })
)

// Cache API requests with NetworkFirst strategy (for Supabase)
const apiCache = new Route(
    ({ url }) => url.pathname.startsWith('/api/'),
    new NetworkFirst({
        cacheName: 'api-cache',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
            new ExpirationPlugin({
                maxEntries: 50,
                maxAgeSeconds: 24 * 60 * 60, // 1 day
            }),
        ],
    })
)

// Register all routes
registerRoute(jsonCache)
registerRoute(imageCache)
registerRoute(staticAssetsCache)
registerRoute(apiCache)

// Handle offline fallback
self.addEventListener('fetch', (event) => {
    if (event.request.mode === 'navigate') {
        event.respondWith(
            caches.match(event.request).then((response) => {
                return response || fetch(event.request).catch(() => {
                    return caches.match('/') // Fallback to index.html
                })
            })
        )
    }
})

// Skip waiting for new service worker
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting()
    }
})
