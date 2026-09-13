---
name: ci-pipeline
description: Load when a GitHub Actions run fails, when a PR is blocked by DCO, PR-title validation or branch protection, or when changing workflows under `.github/workflows/`.
---

# CI Pipeline

Use this skill to diagnose and fix CI, and to get a PR into a mergeable state.

## Start

- Get the real state first: `gh pr checks <pr>` and `gh run view <id> --log-failed`.
  Do not guess from the check name.
- Distinguish pre-existing red checks on `master` from breakage introduced by the PR:
  `gh run list --branch master --workflow <file>`.
- Read `references/failure-playbook.md` for failures already diagnosed once.
- Read `references/routing-evals.md` only when changing this skill's routing.

## Workflows

| File | What it does |
| --- | --- |
| `build-test.yml` | `build_node` (client lint/format/build/typecheck) and `build_csharp` (dotnet format, build, test). Runs on push and PR to `master`. |
| `deploy.yml` | Builds and pushes `gomoku-server` and `gomoku-rapfi` images, builds the client, rsyncs to the VPS, runs `docker compose pull/up`, health-checks the API. Push to `master` plus `workflow_dispatch`. |
| `docker-integration-test.yml` | Docker-level integration checks. |
| `rapfi-test.yml` | Rapfi engine checks. |
| `contribution-guidelines-check.yml` | Includes `Validate PR Title`. |

## Merge Requirements

- **DCO**: every commit in the PR needs a `Signed-off-by` trailer. Use
  `git commit --signoff`. Adding a new signed commit on top does **not** clear an
  earlier unsigned commit — squash or amend the branch and force-push
  (`git reset --soft origin/master && git commit --signoff && git push --force-with-lease`).
- **Validate PR Title**: the title must be `type(scope): summary` and the scope is
  required. Allowed scopes: `client`, `server`, `fullstack`, `devops`.
- **Branch protection** on `master`: an approving review plus passing checks. Never
  merge with `--admin` unless the user explicitly asks for it.

## Rules

- Fix the root cause of a red check; do not disable or skip the check to go green.
- When a fix cannot be reproduced locally, add a temporary debug step to the workflow,
  run it via `workflow_dispatch`, read the output, then remove the debug step in the
  same PR.
- Prefer `workflow_dispatch` for iterating on `deploy.yml` from a branch instead of
  merging to `master` to test.
- Do not report a workflow as fixed until a full run is green.

## Gotchas

- A job that fails in 2–3 seconds usually failed before running anything — deprecated
  action versions, a missing action, or a permission problem, not the project's code.
- A workflow that was failing instantly can hide *real* downstream failures. Expect new
  red checks to appear right after fixing the trivial one.
- Local reproduction can differ from CI for environment reasons (tool versions resolved
  differently, stale `node_modules`). Compare tool versions in CI before assuming the
  code is at fault — see `client-build-conventions`.
