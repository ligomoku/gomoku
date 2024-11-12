import { ClerkProvider } from "@clerk/clerk-react";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import * as Sentry from "@sentry/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { messages } from "./locales/en/messages";
import { routeTree } from "./routeTree.gen";

import { SwaggerServices } from "@/api";
import { AuthTokenProvider, SignalRProvider } from "@/context";
import ErrorBoundary from "@/features/ErrorBoundary/ErrorBoundary";
import { ToasterProvider } from "@/shared/ui/toaster";

import "./styles/index.css";
import { v4 as uuidv4 } from "uuid";
import { typedSessionStorage } from "@/shared/lib/utils";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (import.meta.env.MODE === "production") {
  Sentry.init({
    dsn: "https://7a6d12a23db1a817976baedbf4616ab2@o4508078485340160.ingest.de.sentry.io/4508078486913104",
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
    ],
    tracesSampleRate: 1.0,
    tracePropagationTargets: [
      "localhost",
      new RegExp(
        `^${import.meta.env.VITE_API_URL.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
      ),
    ],
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });
}

const router = createRouter({ routeTree });

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

SwaggerServices.client.setConfig({ baseUrl: import.meta.env.VITE_API_URL });

const queryClient = new QueryClient();

i18n.load("en", messages);
i18n.activate("en");

if (!typedSessionStorage.getItem("anonymousPlayerID")) {
  typedSessionStorage.setItem("anonymousPlayerID", uuidv4()); //TODO: Check if this is ok to generate here
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <I18nProvider i18n={i18n}>
          <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
            <AuthTokenProvider>
              <ToasterProvider>
                <SignalRProvider>
                  <RouterProvider router={router} />
                </SignalRProvider>
              </ToasterProvider>
            </AuthTokenProvider>
          </ClerkProvider>
        </I18nProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>,
);
