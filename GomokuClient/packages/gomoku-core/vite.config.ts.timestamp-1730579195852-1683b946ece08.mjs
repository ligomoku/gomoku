// vite.config.ts
import {
  defineConfig,
  loadEnv,
} from "file:///C:/_projects/developing/gomoku/GomokuClient/node_modules/vite/dist/node/index.js";
import viteReact from "file:///C:/_projects/developing/gomoku/GomokuClient/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { TanStackRouterVite } from "file:///C:/_projects/developing/gomoku/GomokuClient/node_modules/@tanstack/router-plugin/dist/esm/vite.js";
import { sentryVitePlugin } from "file:///C:/_projects/developing/gomoku/GomokuClient/node_modules/@sentry/vite-plugin/dist/esm/index.mjs";
import path from "path";
var __vite_injected_original_dirname =
  "C:\\_projects\\developing\\gomoku\\GomokuClient\\packages\\gomoku-core";
var vite_config_default = ({ mode }) => {
  const envDirPath = path.resolve(
    __vite_injected_original_dirname,
    "../../../envs",
  );
  const srcPath = path.resolve(__vite_injected_original_dirname, "./src");
  const env = loadEnv(
    mode,
    path.resolve(__vite_injected_original_dirname, envDirPath),
  );
  return defineConfig({
    plugins: [
      TanStackRouterVite(),
      viteReact({
        babel: {
          plugins: ["macros"],
        },
      }),
      sentryVitePlugin({
        authToken: process.env.SENTRY_AUTH_TOKEN,
        org: "gomoku",
        project: "javascript-react",
      }),
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
export { vite_config_default as default };
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxfcHJvamVjdHNcXFxcZGV2ZWxvcGluZ1xcXFxnb21va3VcXFxcR29tb2t1Q2xpZW50XFxcXHBhY2thZ2VzXFxcXGdvbW9rdS1jb3JlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxfcHJvamVjdHNcXFxcZGV2ZWxvcGluZ1xcXFxnb21va3VcXFxcR29tb2t1Q2xpZW50XFxcXHBhY2thZ2VzXFxcXGdvbW9rdS1jb3JlXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9fcHJvamVjdHMvZGV2ZWxvcGluZy9nb21va3UvR29tb2t1Q2xpZW50L3BhY2thZ2VzL2dvbW9rdS1jb3JlL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCB2aXRlUmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XG4vLyBAdHMtZXhwZWN0LWVycm9yXG5pbXBvcnQgeyBUYW5TdGFja1JvdXRlclZpdGUgfSBmcm9tIFwiQHRhbnN0YWNrL3JvdXRlci1wbHVnaW4vdml0ZVwiO1xuaW1wb3J0IHsgc2VudHJ5Vml0ZVBsdWdpbiB9IGZyb20gXCJAc2VudHJ5L3ZpdGUtcGx1Z2luXCI7XG5cbi8vIEB0cy1leHBlY3QtZXJyb3JcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5cbmV4cG9ydCBkZWZhdWx0ICh7IG1vZGUgfTogeyBtb2RlOiBzdHJpbmcgfSkgPT4ge1xuICBjb25zdCBlbnZEaXJQYXRoID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuLi8uLi8uLi9lbnZzXCIpO1xuICBjb25zdCBzcmNQYXRoID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKTtcbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBlbnZEaXJQYXRoKSk7XG5cbiAgcmV0dXJuIGRlZmluZUNvbmZpZyh7XG4gICAgcGx1Z2luczogW1xuICAgICAgVGFuU3RhY2tSb3V0ZXJWaXRlKCksXG4gICAgICB2aXRlUmVhY3Qoe1xuICAgICAgICBiYWJlbDoge1xuICAgICAgICAgIHBsdWdpbnM6IFtcIm1hY3Jvc1wiXSxcbiAgICAgICAgfSxcbiAgICAgIH0pLFxuICAgICAgc2VudHJ5Vml0ZVBsdWdpbih7XG4gICAgICAgIGF1dGhUb2tlbjogcHJvY2Vzcy5lbnYuU0VOVFJZX0FVVEhfVE9LRU4sXG4gICAgICAgIG9yZzogXCJnb21va3VcIixcbiAgICAgICAgcHJvamVjdDogXCJqYXZhc2NyaXB0LXJlYWN0XCIsXG4gICAgICB9KSxcbiAgICBdLFxuICAgIGJ1aWxkOiB7XG4gICAgICBzb3VyY2VtYXA6IHRydWUsXG4gICAgfSxcbiAgICBlbnZEaXI6IGVudkRpclBhdGgsXG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXM6IHtcbiAgICAgICAgXCJAXCI6IHNyY1BhdGgsXG4gICAgICB9LFxuICAgIH0sXG4gICAgc2VydmVyOiB7XG4gICAgICBwb3J0OiBwYXJzZUludChlbnYuVklURV9MT0NBTEhPU1RfUE9SVCksXG4gICAgfSxcbiAgfSk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFnWSxTQUFTLGNBQWMsZUFBZTtBQUN0YSxPQUFPLGVBQWU7QUFFdEIsU0FBUywwQkFBMEI7QUFDbkMsU0FBUyx3QkFBd0I7QUFHakMsT0FBTyxVQUFVO0FBUGpCLElBQU0sbUNBQW1DO0FBU3pDLElBQU8sc0JBQVEsQ0FBQyxFQUFFLEtBQUssTUFBd0I7QUFDN0MsUUFBTSxhQUFhLEtBQUssUUFBUSxrQ0FBVyxlQUFlO0FBQzFELFFBQU0sVUFBVSxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUMvQyxRQUFNLE1BQU0sUUFBUSxNQUFNLEtBQUssUUFBUSxrQ0FBVyxVQUFVLENBQUM7QUFFN0QsU0FBTyxhQUFhO0FBQUEsSUFDbEIsU0FBUztBQUFBLE1BQ1AsbUJBQW1CO0FBQUEsTUFDbkIsVUFBVTtBQUFBLFFBQ1IsT0FBTztBQUFBLFVBQ0wsU0FBUyxDQUFDLFFBQVE7QUFBQSxRQUNwQjtBQUFBLE1BQ0YsQ0FBQztBQUFBLE1BQ0QsaUJBQWlCO0FBQUEsUUFDZixXQUFXLFFBQVEsSUFBSTtBQUFBLFFBQ3ZCLEtBQUs7QUFBQSxRQUNMLFNBQVM7QUFBQSxNQUNYLENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQSxPQUFPO0FBQUEsTUFDTCxXQUFXO0FBQUEsSUFDYjtBQUFBLElBQ0EsUUFBUTtBQUFBLElBQ1IsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLFFBQ0wsS0FBSztBQUFBLE1BQ1A7QUFBQSxJQUNGO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTixNQUFNLFNBQVMsSUFBSSxtQkFBbUI7QUFBQSxJQUN4QztBQUFBLEVBQ0YsQ0FBQztBQUNIOyIsCiAgIm5hbWVzIjogW10KfQo=
