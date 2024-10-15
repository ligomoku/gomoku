import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { ClerkProvider } from "@clerk/clerk-react";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthTokenProvider } from "@/context";
import * as Sentry from "@sentry/react";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { messages } from "./locales/en/messages";
import ErrorBoundary from "@/features/ErrorBoundary/ErrorBoundary";
import { SwaggerServices } from "@/api";
import { NotificationProvider } from "@/shared/ui/notification";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (import.meta.env.MODE === "production") {
  Sentry.init({
    dsn: "https://7a6d12a23db1a817976baedbf4616ab2@o4508078485340160.ingest.de.sentry.io/4508078486913104",
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
    ],
    tracesSampleRate: 1.0,
    //TODO: check if passing from .env is needed
    tracePropagationTargets: [
      "localhost",
      /^https:\/\/gomoku-gi8o.onrender.com/,
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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <I18nProvider i18n={i18n}>
          <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
            <AuthTokenProvider>
              <NotificationProvider>
                <RouterProvider router={router} />
              </NotificationProvider>
            </AuthTokenProvider>
          </ClerkProvider>
        </I18nProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>,
);
