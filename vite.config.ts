import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { ManifestOptions, VitePWA, VitePWAOptions } from "vite-plugin-pwa";
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path';


import { cloudflare } from "@cloudflare/vite-plugin";


const pwaOptions: Partial<VitePWAOptions> = {
  // mode: "development",
  registerType: 'autoUpdate',
  devOptions: {
    enabled: true,
  },
  base: "/",
  includeAssets: ["favicon.svg", "*.png", "*.jpg", "*.ico", "*.svg"],
  manifest: {
    name: "Himnos Web",
    short_name: "Himnos",
    // start_url: '/?source=pwa',
    description: "Esta app cuenta con canticos y alabanzas",
    theme_color: "#ffffff",
    background_color: "#ffffff",
    display: "standalone",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
  },
  workbox: {
    globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,json}'],
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/.*\.(?:png|jpg|jpeg|svg|gif|webp)$/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'images-cache',
          expiration: {
            maxEntries: 100,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
          },
        },
      },
      {
        urlPattern: /\.json$/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'json-cache',
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
          },
        },
      },
      {
        urlPattern: /\.(?:js|css)$/i,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'static-resources',
        },
      },
    ],
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  // base: process.env.BASE_URL || 'https://github.com/',
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
  },
  build: {
    sourcemap: process.env.SOURCE_MAP === "true",
  },
  plugins: [react(), tailwindcss(), VitePWA(pwaOptions), cloudflare()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      // '@src': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, './src/components'),
      '@hooks': resolve(__dirname, './src/hooks'),
      '@ui': resolve(__dirname, './src/components/ui'),
    },
  },
});