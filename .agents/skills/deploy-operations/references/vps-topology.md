# VPS Topology

Host facts verified while moving gomoku off Vercel onto the shared VPS.

## Host

- IP `89.167.121.81`, hostname `pet-projects-vps`, Ubuntu 24.04 LTS.
- 2 vCPU (Xeon Skylake), 3.7 GiB RAM, 38 GB disk.
- CPU is mostly idle; **RAM is the binding constraint** when adding services.
- Neighbouring projects run as plain Node processes under PM2 (`~/.npm-global/bin/pm2`,
  not on the default `PATH` for non-login shells) plus one `x-ui` panel as root.
- Docker was installed for gomoku; the account is in the `docker` group, so plain
  `docker`/`docker compose` work over SSH without sudo.

## Port Convention

One numeric block per project. Production ends in `1`, dev ends in `3`.

| Block | Project |
| --- | --- |
| 3xxx | market-intelligence (`3001` prod, `3003` dev) |
| 4xxx | market-research (`4001` prod, `4003` dev) |
| 5xxx | chek-shik-bot (`5001` prod, `5003` dev) |
| 6xxx | construction-estimate (`6003` dev; `6001` freed when amp-analyzer was removed) |
| 7xxx | **gomoku** (`7001` prod) |

Pick the next free block for a new project rather than reusing a freed port.

## Gomoku Layout

- `/home/aleksandrs/gomoku/client` — static client, served directly by nginx.
- `/home/aleksandrs/gomoku/compose` — `docker-compose.yml` plus generated `.env`.
- nginx sites: `/etc/nginx/sites-available/gomoku.app` and `.../api.gomoku.app`,
  symlinked into `sites-enabled`, TLS issued by certbot (`--nginx`).
- Containers: `compose-gomoku-server-1` (published on `127.0.0.1:7001`) and
  `compose-rapfi-1` (no published port).

## Inspection Commands

```bash
ssh <user>@89.167.121.81 "free -h; df -h /; docker ps"
ssh <user>@89.167.121.81 "export PATH=\$PATH:~/.npm-global/bin; pm2 list"
ssh <user>@89.167.121.81 "docker logs compose-rapfi-1 --tail 30"
```

Privileged inspection (`nginx -t`, `certbot certificates`, reading `/var/log/nginx`,
`/etc/letsencrypt`) requires an interactive sudo password — ask the user to run it.
