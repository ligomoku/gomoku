// @ts-ignore
import path from "path";

import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    viteReact(),
    dts({
      tsconfigPath: path.resolve(__dirname, "tsconfig.app.json"), // Path to tsconfig file
      outDir: "dist", // Output directory for declaration files
      insertTypesEntry: true, // Automatically add a `types` field to package.json
      pathsToAliases: true, // Convert tsconfig paths to aliases in declarations
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"), // Entry point for the library
      name: "GomokuStory",
      fileName: (format) => `gomoku-story.${format}.js`,
      formats: ["es", "cjs"], // Output formats
    },
    rollupOptions: {
      external: ["react", "react-dom"], // Treat as peer dependencies
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
