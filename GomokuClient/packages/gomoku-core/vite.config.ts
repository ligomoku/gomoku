import { defineConfig, loadEnv } from "vite";
import viteReact from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import path from "path";

export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, path.resolve(__dirname, "../envs"));

  return defineConfig({
    plugins: [
      TanStackRouterVite(),
      viteReact({
        babel: {
          plugins: ["macros"],
        },
      }),
    ],
    envDir: path.resolve(__dirname, "../../../envs"),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      port: parseInt(env.VITE_LOCALHOST_PORT),
    },
  });
};
