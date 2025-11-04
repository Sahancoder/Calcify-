import nextPWA from 'next-pwa'

const withPWA = nextPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
  buildExclusions: [/middleware-manifest\.json$/],
  runtimeCaching: [
    // App shell & static assets
    {
      urlPattern: ({ request }) =>
        request.destination === 'document' ||
        request.destination === 'script' ||
        request.destination === 'style' ||
        request.destination === 'image' ||
        request.destination === 'font',
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'static-assets',
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 60 * 60 * 24 * 30,
        },
      },
    },
    // API cache for /solve (fallback when offline)
    {
      urlPattern: new RegExp(process.env.NEXT_PUBLIC_API_URL?.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') ?? ''),
      handler: 'NetworkFirst',
      options: {
        cacheName: 'api-cache',
        networkTimeoutSeconds: 5,
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 60 * 60 * 24 * 7,
        },
      },
    },
  ],
})

/** @type {import('next').NextConfig} */
const baseConfig = {
  experimental: { appDir: true },
}

export default withPWA(baseConfig)
