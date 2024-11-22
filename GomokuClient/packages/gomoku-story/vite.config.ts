// @ts-ignore
import path from "path";
import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [viteReact()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"), // Replace with the actual entry point of your library
      name: "GomokuStory",
      fileName: (format) => `gomoku-story.${format}.js`,
      formats: ["es", "cjs"], // ES module and CommonJS formats
    },
    rollupOptions: {
      // Ensure dependencies are not bundled
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
