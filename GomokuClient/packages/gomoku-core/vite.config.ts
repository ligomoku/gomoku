// @ts-ignore
import path from "path";

// @ts-ignore
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

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
      //TODO: after multi-package support is added stoped correctly wrapping sentry
      // sentryVitePlugin({
      //   authToken: process.env.SENTRY_AUTH_TOKEN,
      //   org: "gomoku",
      //   project: "javascript-react",
      // }),
    ],
    build: {
      sourcemap: true,
    },
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
