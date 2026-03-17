#!/usr/bin/env bash
# Bootstrap a Hostinger cloud VPS for this Hugo site.
# Usage: sudo ./scripts/setup_hostinger.sh ukmoneyexplained.com deployuser

set -euo pipefail

if [ "${EUID:-$(id -u)}" -ne 0 ]; then
    echo "ERROR: Run this script as root or with sudo."
    exit 1
fi

if [ "$#" -ne 2 ]; then
    echo "Usage: sudo ./scripts/setup_hostinger.sh <domain> <deploy-user>"
    exit 1
fi

DOMAIN="$1"
DEPLOY_USER="$2"
WEB_ROOT="/var/www/$DOMAIN/current"
NGINX_CONF="/etc/nginx/sites-available/$DOMAIN"

apt-get update
apt-get install -y nginx certbot python3-certbot-nginx rsync ufw

mkdir -p "$WEB_ROOT"
chown -R "$DEPLOY_USER:$DEPLOY_USER" "/var/www/$DOMAIN"

cat > "$NGINX_CONF" <<EOF
server {
    listen 80;
    listen [::]:80;
    server_name $DOMAIN www.$DOMAIN;

    root $WEB_ROOT;
    index index.html;

    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "geolocation=(), camera=(), microphone=()" always;

    gzip on;
    gzip_vary on;
    gzip_min_length 256;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/javascript
        application/json
        application/xml
        application/rss+xml
        image/svg+xml;

    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    location / {
        try_files \$uri \$uri/ \$uri/index.html =404;
    }

    error_page 404 /404.html;
    location = /404.html {
        internal;
    }
}
EOF

ln -sf "$NGINX_CONF" "/etc/nginx/sites-enabled/$DOMAIN"
rm -f /etc/nginx/sites-enabled/default

nginx -t
systemctl enable nginx
systemctl reload nginx

ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

echo ""
echo "Base server setup complete."
echo "Next steps:"
echo "1. Point A records for $DOMAIN and www.$DOMAIN to this server IP."
echo "2. Run: certbot --nginx -d $DOMAIN -d www.$DOMAIN"
echo "3. Set DEPLOY_PATH=$WEB_ROOT in your local .env and run ./scripts/deploy.sh"