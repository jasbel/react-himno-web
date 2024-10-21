import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { ManifestOptions, VitePWA, VitePWAOptions } from "vite-plugin-pwa";
import { resolve } from 'path';


const pwaOptions: Partial<VitePWAOptions> = {
  // mode: "development",
  base: "/",
  includeAssets: ["favicon.svg"],
  manifest: {
    name: "Himno Web",
    short_name: "Himnos",
    start_url: '/?source=pwa',
    description: "Esta app cuenta con canticos y alabanzas",
    theme_color: "#ffffff",
    icons: [
      {
        src: "android-chrome-192x192.png", // <== don't add slash, for testing
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png", // <== don't remove slash, for testing
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "android-chrome-512x512.png", // <== don't add slash, for testing
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
  }
};

// https://vitejs.dev/config/
export default defineConfig({
  // base: process.env.BASE_URL || 'https://github.com/',
  build: {
    sourcemap: process.env.SOURCE_MAP === "true",
  },
  plugins: [react(), VitePWA(pwaOptions)],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@hooks': resolve(__dirname, 'src/hooks'),
      '@ui': resolve(__dirname, 'src/components/ui'),
    },
  },
});
