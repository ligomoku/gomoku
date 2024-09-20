import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Header } from "@/components/Header";

export const Route = createRootRoute({
  component: () => (
    <>
      <Header>
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
        <Link to="/game" className="[&.active]:font-bold">
          Game
        </Link>
      </Header>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
