/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from "@tanstack/react-router";

// Import Routes

import { Route as rootRoute } from "./routes/__root";
import { Route as GameJoinGameIDImport } from "./routes/game/join/$gameID";

// Create Virtual Routes

const TestLazyImport = createFileRoute("/test")();
const ProfileLazyImport = createFileRoute("/profile")();
const IndexLazyImport = createFileRoute("/")();

// Create/Update Routes

const TestLazyRoute = TestLazyImport.update({
  id: "/test",
  path: "/test",
  getParentRoute: () => rootRoute,
} as any).lazy(() => import("./routes/test.lazy").then((d) => d.Route));

const ProfileLazyRoute = ProfileLazyImport.update({
  id: "/profile",
  path: "/profile",
  getParentRoute: () => rootRoute,
} as any).lazy(() => import("./routes/profile.lazy").then((d) => d.Route));

const IndexLazyRoute = IndexLazyImport.update({
  id: "/",
  path: "/",
  getParentRoute: () => rootRoute,
} as any).lazy(() => import("./routes/index.lazy").then((d) => d.Route));

const GameJoinGameIDRoute = GameJoinGameIDImport.update({
  id: "/game/join/$gameID",
  path: "/game/join/$gameID",
  getParentRoute: () => rootRoute,
} as any);

// Populate the FileRoutesByPath interface

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/": {
      id: "/";
      path: "/";
      fullPath: "/";
      preLoaderRoute: typeof IndexLazyImport;
      parentRoute: typeof rootRoute;
    };
    "/profile": {
      id: "/profile";
      path: "/profile";
      fullPath: "/profile";
      preLoaderRoute: typeof ProfileLazyImport;
      parentRoute: typeof rootRoute;
    };
    "/test": {
      id: "/test";
      path: "/test";
      fullPath: "/test";
      preLoaderRoute: typeof TestLazyImport;
      parentRoute: typeof rootRoute;
    };
    "/game/join/$gameID": {
      id: "/game/join/$gameID";
      path: "/game/join/$gameID";
      fullPath: "/game/join/$gameID";
      preLoaderRoute: typeof GameJoinGameIDImport;
      parentRoute: typeof rootRoute;
    };
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  "/": typeof IndexLazyRoute;
  "/profile": typeof ProfileLazyRoute;
  "/test": typeof TestLazyRoute;
  "/game/join/$gameID": typeof GameJoinGameIDRoute;
}

export interface FileRoutesByTo {
  "/": typeof IndexLazyRoute;
  "/profile": typeof ProfileLazyRoute;
  "/test": typeof TestLazyRoute;
  "/game/join/$gameID": typeof GameJoinGameIDRoute;
}

export interface FileRoutesById {
  __root__: typeof rootRoute;
  "/": typeof IndexLazyRoute;
  "/profile": typeof ProfileLazyRoute;
  "/test": typeof TestLazyRoute;
  "/game/join/$gameID": typeof GameJoinGameIDRoute;
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath;
  fullPaths: "/" | "/profile" | "/test" | "/game/join/$gameID";
  fileRoutesByTo: FileRoutesByTo;
  to: "/" | "/profile" | "/test" | "/game/join/$gameID";
  id: "__root__" | "/" | "/profile" | "/test" | "/game/join/$gameID";
  fileRoutesById: FileRoutesById;
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute;
  ProfileLazyRoute: typeof ProfileLazyRoute;
  TestLazyRoute: typeof TestLazyRoute;
  GameJoinGameIDRoute: typeof GameJoinGameIDRoute;
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  ProfileLazyRoute: ProfileLazyRoute,
  TestLazyRoute: TestLazyRoute,
  GameJoinGameIDRoute: GameJoinGameIDRoute,
};

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>();

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/profile",
        "/test",
        "/game/join/$gameID"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/profile": {
      "filePath": "profile.lazy.tsx"
    },
    "/test": {
      "filePath": "test.lazy.tsx"
    },
    "/game/join/$gameID": {
      "filePath": "game/join/$gameID.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
