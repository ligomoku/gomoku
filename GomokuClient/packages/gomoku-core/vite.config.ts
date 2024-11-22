// @ts-ignore
import path from "path";

import viteReact from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default ({ mode }: { mode: string }) => {
  const envDirPath = path.resolve(process.cwd(), "../../../envs");
  const srcPath = path.resolve(__dirname, "src");
  const env = loadEnv(mode, envDirPath);

  console.debug("Environment Directory Path:", envDirPath);
  console.debug("Source Path:", srcPath);
  console.debug("Env:", env);

  return defineConfig({
    plugins: [
      viteReact({
        babel: {
          plugins: ["macros"],
        },
      }),
    ],
    build: {
      sourcemap: true,
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
        },
      },
    },
    envDir: envDirPath,
    resolve: {
      alias: {
        "@": srcPath,
      },
    },
    server: {
      port: parseInt(env.VITE_LOCALHOST_PORT) || 3000,
    },
  });
};
