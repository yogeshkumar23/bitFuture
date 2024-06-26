import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/web/",
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: "DooWorld",
        short_name: "DooWorld",
        description:
          "Join millions of people worldwide in purchasing and selling digital assets in a convenient, quick, and safe environment.",
        display: "fullscreen",
        theme_color: "#2E3192",
        background_color: "#2E3192",
      },
      registerType: "autoUpdate",
      workbox: {
        cleanupOutdatedCaches: true,
      },
    }),
  ],
  resolve: {
    alias: {
      src: __dirname + "/src",
    },
  },
});
