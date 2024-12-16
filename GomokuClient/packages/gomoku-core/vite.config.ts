// @ts-ignore
import path from "path";

// @ts-ignore
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default ({ mode }: { mode: string }) => {
  const envDirPath = path.resolve(__dirname, "../../../envs");
  const srcPath = path.resolve(__dirname, "./src");
  const rootDir = path.resolve(__dirname);
  const env = loadEnv(mode, path.resolve(__dirname, envDirPath));
  const isProd = mode === "production";

  return defineConfig({
    plugins: [
      TanStackRouterVite(),
      viteReact({
        babel: {
          plugins: ["macros"],
        },
      }),
    ],
    define: {
      BETA_FEATURES: !isProd,
    },
    build: {
      sourcemap: true,
      cssCodeSplit: true,
      rollupOptions: {
        external: isProd ? [/\.beta\.(jsx?|tsx?)$/] : [],
      },
    },
    envDir: envDirPath,
    resolve: {
      alias: {
        "@": srcPath,
      },
    },
    worker: {
      format: "es",
      rollupOptions: {
        output: {
          entryFileNames: "[name].js",
        },
      },
    },
    server: {
      port: parseInt(env.VITE_LOCALHOST_PORT) || 4200,
      fs: {
        allow: [
          rootDir,
          path.resolve(__dirname, "public"),
          // path.resolve(__dirname, "../../../"),
        ],
      },
    },
  });
};
