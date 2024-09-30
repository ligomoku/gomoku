import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { ClerkProvider } from "@clerk/clerk-react";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { client } from "@/api/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthTokenProvider, SignalRProvider } from "@/context";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const router = createRouter({ routeTree });

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

client.setConfig({ baseUrl: import.meta.env.VITE_API_URL });

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <AuthTokenProvider>
          <SignalRProvider>
            <RouterProvider router={router} />
          </SignalRProvider>
        </AuthTokenProvider>
      </ClerkProvider>
    </QueryClientProvider>
  </StrictMode>,
);
