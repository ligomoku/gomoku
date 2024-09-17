import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { client } from "./api/client";
import packageJson from "../package.json";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

client.setConfig({
  baseUrl: import.meta.env.VITE_API_URL,
  headers: {
    "X-Version": packageJson.apiVersion || "2",
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      onError: (error) => {
        console.error("Mutation error:", error);
      },
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <App />
      </ClerkProvider>
    </QueryClientProvider>
  </StrictMode>,
);
