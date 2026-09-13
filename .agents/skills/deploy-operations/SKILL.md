---
name: deploy-operations
description: Load when deploying gomoku.app or api.gomoku.app, editing `.github/workflows/deploy.yml`, `docker-compose.prod.yml` or `deploy/vps-setup.sh`, changing Docker/nginx/certbot state on the VPS, choosing a port on the shared VPS, or checking container and API health.
---

# Deploy Operations

Use this skill for anything that touches the live gomoku environment.

## Start

- Read `.github/workflows/deploy.yml` and `docker-compose.prod.yml` before changing
  deployment behaviour.
- Read `references/vps-topology.md` for host layout, port blocks, and neighbours.
- Prefer the GitHub Actions deployment for reproducible changes. Use direct SSH for
  inspection, emergency repair, or explicit user-authorised host work.
- Read `references/routing-evals.md` only when changing this skill's routing.

## Known Environment

- Client: `https://gomoku.app` → nginx static root `/home/aleksandrs/gomoku/client`.
- API: `https://api.gomoku.app` → nginx proxy → `127.0.0.1:7001` → `gomoku-server`
  container port `8080`.
- AI: `rapfi` container, no published host port, reached as `http://rapfi:5005`.
- Compose files live in `/home/aleksandrs/gomoku/compose` (`docker-compose.yml` plus a
  generated `.env` holding `DOCKERHUB_USERNAME`).
- Images: `<DOCKER_USERNAME>/gomoku-server:latest`, `<DOCKER_USERNAME>/gomoku-rapfi:latest`.
- Health: `curl https://api.gomoku.app/health` → `{"status":"Healthy"}`. The route is
  header-versioned (`X-Version`), so a plain request works without extra headers.
- `/etc/nginx/conf.d/gomoku-upstream.conf` holds the `gomoku_api` upstream
  (`keepalive 32`) and the `$connection_upgrade` map. `map`/`upstream` must live in the
  http context, and `conf.d` is included before `sites-enabled`.
- One-time host setup lives in `deploy/vps-setup.sh` (Docker, nginx vhosts, certbot).
- CI secrets: `VPS_SSH_KEY`, `DOCKER_USERNAME`, `DOCKER_PASSWORD`. The old
  `VERCEL_TOKEN` / `VERCEL_ORG_ID` / `VERCEL_PROJECT_ID` secrets are obsolete.

## Rules

- Port convention on this VPS: production services end in `1`, dev services end in `3`,
  one numeric block per project. Gomoku owns the `7xxx` block; production is `7001`.
  Check `references/vps-topology.md` before claiming a new port.
- Bind service ports to `127.0.0.1` in compose and let host nginx terminate TLS.
  Do not publish container ports on `0.0.0.0`.
- Keep deploy verification hard-failing on the API health check. A deploy job must not
  pass while the API or a container is crash-looping.
- After triggering a deploy, find the run for that commit, wait for the `deploy` job,
  then report what is actually live — or report the failing step's logs.
- Reference secret names only. Never store key material, private-key paths, or raw
  credential output in the repo, logs, or PR bodies.
- The VPS is shared with unrelated pet projects. Never stop, delete, or reconfigure a
  neighbour's PM2 process, container, nginx site, or data directory without explicit
  user confirmation, and report freed RAM/disk afterwards.

## Gotchas

- **nginx cannot traverse the home directory by default.** `/home/aleksandrs` is mode
  `750`; nginx runs as `www-data` and returns 500 for the static client until the
  directory is traversable (`chmod o+x /home/aleksandrs`). This needs no sudo — the
  owner can do it over plain SSH.
- **`sudo` on the VPS requires a password.** The agent cannot run privileged commands.
  Hand the user a copy-pasteable block (nginx config changes, certbot, Docker install).
- **RAM is the binding constraint**, not disk or CPU. The host has 3.7 GiB total and
  neighbours consume most of it; check `free -h` before adding services.
- `rapfi` must not be published to the host; only `gomoku-server` talks to it.
- **SignalR game hubs run through `api.gomoku.app`.** nginx's default
  `proxy_read_timeout` of 60s would drop idle game sockets, so the API vhost raises the
  read/send timeouts. Never hardcode `proxy_set_header Connection "upgrade"` — use the
  `$connection_upgrade` map, otherwise plain HTTP requests also claim an upgrade and
  upstream keepalive cannot work.
- HTTP/2 is not enabled. On nginx 1.24 it is a `listen 443 ssl http2;` parameter, and
  the socket is shared with neighbouring projects' vhosts — treat it as a change that
  needs user confirmation.
- The compose file is copied to the VPS as `docker-compose.yml`; `DOCKERHUB_USERNAME`
  is written into a sibling `.env` by the deploy job, because the compose file
  interpolates it into image names.
- DNS for both hostnames is served by Vercel nameservers even though hosting moved to
  the VPS — the A records already point at the VPS, so a hosting change needs no DNS
  work.
