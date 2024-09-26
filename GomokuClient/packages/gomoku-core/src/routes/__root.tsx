import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Header } from "@/shared/ui/Header";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { LoadedClerk } from "@clerk/types";

interface MyRouterContext {
  isSignedIn: boolean;
  auth?: LoadedClerk;
}

export const Route = createRootRoute<MyRouterContext>({
  component: () => (
    <>
      <Header />
      <Outlet />
      <TanStackRouterDevtools />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  ),
});
