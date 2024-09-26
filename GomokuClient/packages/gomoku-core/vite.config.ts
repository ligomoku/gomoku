import { defineConfig, loadEnv } from "vite";
import viteReact from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import path from "path";

export default ({ mode }: { mode: string }) => {
  const envDirPath = path.resolve(__dirname, "../../../envs");
  const srcPath = path.resolve(__dirname, "./src");
  const env = loadEnv(mode, path.resolve(__dirname, envDirPath));

  return defineConfig({
    plugins: [
      TanStackRouterVite(),
      viteReact({
        babel: {
          plugins: ["macros"],
        },
      }),
    ],
    envDir: envDirPath,
    resolve: {
      alias: {
        "@": srcPath,
      },
    },
    server: {
      port: parseInt(env.VITE_LOCALHOST_PORT),
    },
  });
};
