import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const base = isGitHubPages ? "/kickflip-calendar/" : "/";

export default defineConfig({
  base,
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "pwa-192x192.png", "pwa-512x512.png", "apple-touch-icon.png"],
      manifest: {
        name: "KickFlip Calendar",
        short_name: "KickFlip",
        description: "KickFlip schedule calendar for 2026 May",
        theme_color: "#ffe58a",
        background_color: "#fff8d6",
        display: "standalone",
        orientation: "portrait-primary",
        start_url: base,
        scope: base,
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
        navigateFallback: "index.html",
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
  server: {
    host: "127.0.0.1",
    port: 5174,
    strictPort: true,
  },
});
