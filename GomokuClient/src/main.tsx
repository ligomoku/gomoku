import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { ClerkProvider } from "@clerk/clerk-react";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>,
);
