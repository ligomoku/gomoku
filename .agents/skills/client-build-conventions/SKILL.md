---
name: client-build-conventions
description: Load when building or changing `GomokuClient` — Yarn 4 workspaces, Turborepo tasks, tooling dependencies, Vite environment wiring, or debugging why a client build behaves differently locally and in CI.
---

# Client Build Conventions

Use this skill for anything under `GomokuClient/`.

## Start

- `GomokuClient` is the workspace root. Run commands from there, not from the repo root.
- Read `packages/gomoku-core/vite.config.ts` before touching env or alias behaviour.
- Read `references/routing-evals.md` only when changing this skill's routing.

## Layout

| Package | Role |
| --- | --- |
| `@gomoku/core` | The deployed app: React 19, Vite 6, TanStack Router. Build output `packages/gomoku-core/dist` is what the deploy job ships. |
| `@gomoku/story` | Storybook component library, built before `core` (`turbo.json` declares `gomoku-core#build` depends on `gomoku-story#build`). |
| `@gomoku/api` | kubb-generated API client. Source-only: it has no `build` script, consumers compile it directly. |
| `@gomoku/eslint-config`, `@gomoku/tailwind-config` | Shared config packages. |

Package manager is pinned by `"packageManager": "yarn@4.5.0"`. Node is pinned to
`20.11.0` by `engines` and by the CI setup step.

## Environment Wiring

- Vite's `envDir` points at the repo-level `envs/` directory, not the package.
- `envs/.env.prod` is the production file, and the .NET server reads it **by that exact
  name** (`EnvironmentLoader` maps `ASPNETCORE_ENVIRONMENT=production` → `.env.prod`).
  Do not rename it to `.env.production` to please Vite.
- Because of that name, production client builds must pass the matching mode:
  `vite build --mode prod`. Plain `vite build` runs in mode `production`, finds no
  `.env.production`, and silently falls back to `.env.local` — which points
  `VITE_API_URL` at `http://localhost:62411`.
- `.env.local` is loaded in every mode, so a missing mode file fails silently rather
  than loudly.

## Rules

- Every workspace that invokes a CLI in its own scripts must declare that CLI as its
  own dependency. Relying on hoisting works locally and breaks in CI, where a
  system-wide binary on `PATH` can win instead.
- Enable corepack (`corepack enable`) before `yarn install` in any automation, so the
  pinned Yarn 4 is used rather than a preinstalled Yarn Classic.
- Verify production builds by inspecting the bundle, not by trusting the config:

  ```bash
  grep -o "api.gomoku.app" packages/gomoku-core/dist/assets/index-*.js
  grep -o "localhost:62411" packages/gomoku-core/dist/assets/index-*.js
  ```

- Keep the deploy job's artifact path aligned with `packages/gomoku-core/dist`.

## Gotchas

- **Stale workspace symlinks.** If the repo was moved or re-cloned, `node_modules/@gomoku/*`
  can still point at the old absolute path, producing `TS2307: Cannot find module
  '@gomoku/api'` in every file. Fix by reinstalling, not by editing tsconfig:
  `rm -rf node_modules packages/*/node_modules .yarn/cache && yarn install`.
- **`yarn workspace <pkg> exec tsc --version` is not a reliable probe** — it can resolve
  a global binary. To check the version actually used, read
  `node_modules/typescript/package.json` or run `node node_modules/typescript/lib/tsc.js --version`.
- `YN0066: ... Cannot apply hunk` for the built-in TypeScript compat patch is a warning
  on a cold Yarn cache, not the cause of build failures.
- The root `build` script runs `yarn workspace @gomoku/story build` before
  `turbo run build`; keep that ordering in mind when changing task graphs.
