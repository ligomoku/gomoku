import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
  publicDir: false,
  build: {
    target: "es2015",
    outDir: "./dist",
    lib: {
      entry: "./index.ts",
      formats: ["es", "cjs", "umd"],
      name: "patterns",
      fileName: (format) => `${format}/index.js`,
    },
  },
});
