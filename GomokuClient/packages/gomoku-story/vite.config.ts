// @ts-ignore
import path from "path";

import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    viteReact(), // React plugin for Vite
    dts({
      tsconfigPath: path.resolve(__dirname, "tsconfig.app.json"), // Path to tsconfig for types
      outDir: "dist", // Directory to output declaration files
      insertTypesEntry: true, // Automatically add a "types" field to package.json
      pathsToAliases: true, // Convert tsconfig paths to aliases in declarations
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"), // Main entry point for the library
      name: "GomokuStory", // Global variable name for UMD builds
      fileName: (format) => `gomoku-story.${format}.js`, // File naming pattern
      formats: ["es", "cjs"], // Output module formats
    },
    rollupOptions: {
      external: ["react", "react-dom"], // Mark these as external to avoid bundling
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM", // Globals for UMD builds
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Alias "@" to "src" directory
    },
  },
  css: {
    postcss: path.resolve(__dirname, "postcss.config.js"), // Use PostCSS for Tailwind CSS
  },
});
