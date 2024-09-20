import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [TanStackRouterVite(), viteReact()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    hmr: {
      overlay: false, // Disables the HMR overlay, which may fix HMR-related conflicts
    },
    port: 4200,
  },
});
