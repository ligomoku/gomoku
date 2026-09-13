# CI Failure Playbook

Failures already diagnosed on this repo, with the fix that actually worked.

## `build_node` / `build_csharp` fail in ~2 seconds

**Symptom:** `This request has been automatically failed because it uses a deprecated
version of actions/upload-artifact: v3`.

**Cause:** GitHub hard-fails runs using deprecated artifact actions, before any project
step executes.

**Fix:** bump to `actions/upload-artifact@v4` (and `download-artifact@v4`).

**Note:** this masked every later failure in `build-test.yml`, which had been red on
`master` for months. Fixing it surfaced the real breakages below.

## Client build: `Option 'baseUrl' has been removed` / `moduleResolution=node10 has been removed`

**Symptom:** `tsc` rejects `tsconfig.json` options that are valid for the TypeScript
version pinned in `yarn.lock` (5.7.2). Cannot be reproduced locally.

**Cause:** `@gomoku/story` runs bare `tsc` in its `build` script but did not declare
`typescript` as its own dependency. On the runner, PATH resolution fell through to the
system-wide `/usr/local/bin/tsc` shipped in the GitHub image — a much newer compiler.

**Fix:** declare the tool in the workspace that invokes it
(`"typescript": "^5.7.2"` in `packages/gomoku-story/package.json`).

**Debug trick:** add a temporary step printing `which tsc`,
`node_modules/typescript/package.json` version and `yarn --version`, run it via
`workflow_dispatch`, then remove it.

## Client build resolves the wrong Yarn

**Symptom:** dependency resolution in CI differs from local, warnings about the
lockfile, unexpected package versions.

**Cause:** `corepack` is not enabled by default on runners, so `yarn` resolves to the
preinstalled Yarn Classic instead of the `packageManager`-pinned Yarn 4.5.0.

**Fix:** add a `corepack enable` step after `actions/setup-node` and before
`yarn install`.

**Note:** enabling corepack alone did not fix the TypeScript failure above — the two
issues looked identical from the check name but were independent.

## rapfi image fails to compile

**Symptom:** `static assertion failed: Failed to find a supported instruction set` in
`eval/mix10nnue.cpp` during `cmake --build`.

**Cause:** the Dockerfile disabled every SIMD instruction set; the mix10 NNUE code
requires at least one.

**Fix:** `-DUSE_SSE=ON`. SSE is available both on GitHub runners and on the target VPS;
AVX2/AVX512 are not safe to assume.

## rapfi container crash-loops after a successful build

**Symptom:** `SyntaxError: Unexpected token '.'` from `body-parser` at startup.

**Cause:** `apt-get install nodejs` on `ubuntu:22.04` installs Node 12, which predates
optional chaining used by the Express dependency tree.

**Fix:** install a modern runtime via NodeSource (`setup_20.x`) instead of the distro
package.

## Deployed client calls `http://localhost:62411`

**Symptom:** the production bundle points at a dev API host.

**Cause:** `vite build` defaults to mode `production` and therefore loads
`.env.production`, but the repo's production file is `envs/.env.prod` (the server's
`EnvironmentLoader` hardcodes that name). Vite silently fell back to `.env.local`,
which is loaded in every mode.

**Fix:** build with `vite build --mode prod` so Vite loads `envs/.env.prod`. Do not
rename the file — the .NET server reads it by name.

**Verification:** grep the built bundle, and the deployed one, for the expected host:

```bash
grep -o "api.gomoku.app" GomokuClient/packages/gomoku-core/dist/assets/index-*.js
```
