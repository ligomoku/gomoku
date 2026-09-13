#!/usr/bin/env bash
# One-time setup for hosting gomoku on this VPS.
# Run manually on the server (needs your sudo password):
#   scp this file up, then: bash vps-setup.sh
set -euo pipefail

DOMAIN_CLIENT="gomoku.app"
DOMAIN_API="api.gomoku.app"
CLIENT_PATH="/home/$USER/gomoku/client"
CERTBOT_EMAIL="aleksandrs.vaguscenko@gmail.com"

echo "--- Installing Docker ---"
if ! command -v docker >/dev/null 2>&1; then
  curl -fsSL https://get.docker.com | sudo sh
fi
sudo usermod -aG docker "$USER"

echo "--- Creating directories ---"
mkdir -p "$CLIENT_PATH"
mkdir -p "/home/$USER/gomoku/compose"

echo "--- Creating nginx config for client ($DOMAIN_CLIENT) ---"
sudo tee /etc/nginx/sites-available/$DOMAIN_CLIENT > /dev/null << NGINXEOF
server {
    listen 80;
    server_name $DOMAIN_CLIENT;

    root $CLIENT_PATH;
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }
}
NGINXEOF

echo "--- Creating nginx upstream + websocket map (http context) ---"
# Lives in conf.d because map/upstream must sit in the http context, which is
# included before sites-enabled. keepalive lets nginx reuse connections to
# Kestrel instead of opening a new TCP connection per request; the map makes
# sure only real WebSocket requests (SignalR game hubs) get "Connection: upgrade".
sudo tee /etc/nginx/conf.d/gomoku-upstream.conf > /dev/null << 'NGINXEOF'
map $http_upgrade $connection_upgrade {
    default upgrade;
    ''      "";
}

upstream gomoku_api {
    server 127.0.0.1:7001;
    keepalive 32;
}
NGINXEOF

echo "--- Creating nginx config for api ($DOMAIN_API -> 127.0.0.1:7001) ---"
sudo tee /etc/nginx/sites-available/$DOMAIN_API > /dev/null << NGINXEOF
server {
    listen 80;
    server_name $DOMAIN_API;

    location / {
        proxy_pass http://gomoku_api;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection \$connection_upgrade;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;

        # SignalR game hubs hold long-lived connections; the 60s default would
        # drop them whenever pings stall.
        proxy_read_timeout 3600s;
        proxy_send_timeout 3600s;
    }
}
NGINXEOF

echo "--- Enabling nginx sites ---"
sudo ln -sf /etc/nginx/sites-available/$DOMAIN_CLIENT /etc/nginx/sites-enabled/
sudo ln -sf /etc/nginx/sites-available/$DOMAIN_API /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

echo "--- Installing certbot (if needed) ---"
sudo apt-get update -qq
sudo apt-get install -y -qq certbot python3-certbot-nginx > /dev/null 2>&1 || true

echo "--- Issuing SSL certs ---"
sudo certbot --nginx -d $DOMAIN_CLIENT -d $DOMAIN_API --noninteractive --agree-tos -m $CERTBOT_EMAIL --redirect

sudo systemctl reload nginx

echo "=== Done ==="
echo "NOTE: you must log out and back in (or run 'newgrp docker') for the docker group membership to take effect in your current shell."
