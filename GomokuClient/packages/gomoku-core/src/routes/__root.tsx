import { createRootRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { Header } from "@/shared/ui/Header";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { LoadedClerk } from "@clerk/types";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  useAuth,
  UserButton,
} from "@clerk/clerk-react";
import { lazy } from "react";

export interface MyRouterContext {
  isSignedIn: boolean;
  auth?: LoadedClerk;
}

const RootComponent = () => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <Header
        onSignInClick={() => {}}
        isSignedIn={isSignedIn || false}
        searchPlaceholder={"Search"}
        logoText={"gomoku.org"}
        logoOnClick={() => navigate({ to: "/" })}
        menuItems={[
          { label: "LEARN", onClick: () => alert("Learn clicked!") },
          { label: "WATCH", onClick: () => alert("Watch clicked!") },
          { label: "COMMUNITY", onClick: () => alert("Community clicked!") },
        ]}
        SignedInComponent={<SignedIn>Signed In</SignedIn>}
        SignedOutComponent={<SignedOut>Sign Out</SignedOut>}
        SignInButtonComponent={
          <SignInButton>
            <span
              className={
                "cursor-pointer text-lg uppercase text-[#dc9a3c] hover:underline sm:text-xl"
              }
            >
              Sign In
            </span>
          </SignInButton>
        }
        UserButtonComponent={<UserButton />}
      />
      <Outlet />
      <TanStackRouterDevtools />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
};

export const Route = createRootRoute<MyRouterContext>({
  component: RootComponent,
});

const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null
    : lazy(() =>
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
        })),
      );
