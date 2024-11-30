// @ts-ignore
import path from "path";

import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    viteReact(),
    dts({
      tsconfigPath: path.resolve(__dirname, "tsconfig.app.json"),
      outDir: "dist",
      insertTypesEntry: true,
      pathsToAliases: true,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "GomokuStory",
      fileName: (format) => `gomoku-story.${format}.js`,
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css") return "gomoku-story.css";
          return assetInfo.name;
        },
      },
    },
    cssCodeSplit: false, // Keep all CSS in one file
    cssMinify: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  css: {
    postcss: path.resolve(__dirname, "postcss.config.js"),
  },
});
