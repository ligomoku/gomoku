/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as GameGameIDImport } from './routes/game/$gameID'

// Create Virtual Routes

const ProfileLazyImport = createFileRoute('/profile')()
const GameLazyImport = createFileRoute('/game')()
const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const ProfileLazyRoute = ProfileLazyImport.update({
  path: '/profile',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/profile.lazy').then((d) => d.Route))

const GameLazyRoute = GameLazyImport.update({
  path: '/game',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/game.lazy').then((d) => d.Route))

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const GameGameIDRoute = GameGameIDImport.update({
  path: '/$gameID',
  getParentRoute: () => GameLazyRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/game': {
      id: '/game'
      path: '/game'
      fullPath: '/game'
      preLoaderRoute: typeof GameLazyImport
      parentRoute: typeof rootRoute
    }
    '/profile': {
      id: '/profile'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof ProfileLazyImport
      parentRoute: typeof rootRoute
    }
    '/game/$gameID': {
      id: '/game/$gameID'
      path: '/$gameID'
      fullPath: '/game/$gameID'
      preLoaderRoute: typeof GameGameIDImport
      parentRoute: typeof GameLazyImport
    }
  }
}

// Create and export the route tree

interface GameLazyRouteChildren {
  GameGameIDRoute: typeof GameGameIDRoute
}

const GameLazyRouteChildren: GameLazyRouteChildren = {
  GameGameIDRoute: GameGameIDRoute,
}

const GameLazyRouteWithChildren = GameLazyRoute._addFileChildren(
  GameLazyRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/game': typeof GameLazyRouteWithChildren
  '/profile': typeof ProfileLazyRoute
  '/game/$gameID': typeof GameGameIDRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/game': typeof GameLazyRouteWithChildren
  '/profile': typeof ProfileLazyRoute
  '/game/$gameID': typeof GameGameIDRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/game': typeof GameLazyRouteWithChildren
  '/profile': typeof ProfileLazyRoute
  '/game/$gameID': typeof GameGameIDRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/game' | '/profile' | '/game/$gameID'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/game' | '/profile' | '/game/$gameID'
  id: '__root__' | '/' | '/game' | '/profile' | '/game/$gameID'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  GameLazyRoute: typeof GameLazyRouteWithChildren
  ProfileLazyRoute: typeof ProfileLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  GameLazyRoute: GameLazyRouteWithChildren,
  ProfileLazyRoute: ProfileLazyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/game",
        "/profile"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/game": {
      "filePath": "game.lazy.tsx",
      "children": [
        "/game/$gameID"
      ]
    },
    "/profile": {
      "filePath": "profile.lazy.tsx"
    },
    "/game/$gameID": {
      "filePath": "game/$gameID.tsx",
      "parent": "/game"
    }
  }
}
ROUTE_MANIFEST_END */
