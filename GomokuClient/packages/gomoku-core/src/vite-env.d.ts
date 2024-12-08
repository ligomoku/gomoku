/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_CLERK_PUBLISHABLE_KEY: string;
  VITE_API_URL: string;
  ASPNETCORE_CLIENT_APP_BASE_URL: string;
  ASPNETCORE_CLERK_FRONTEND_API_BASE_URL: string;
  ASPNETCORE_CLERK_BACKEND_API_BASE_URL: string;
  ASPNETCORE_CLERK_BACKEND_API_SECRET: string;
  VITE_LOCALHOST_PORT: string;
}

interface ImportMeta {
  env: ImportMetaEnv;
}

declare const BETA_FEATURES: boolean;
