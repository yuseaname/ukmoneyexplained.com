#!/usr/bin/env bash
# UK Money Explained — Deploy to Hostinger Cloud Startup
# Builds the site and deploys via rsync over SSH.
#
# Prerequisites:
#   1. Copy .env.example to .env and fill in your Hostinger details
#   2. Set up SSH key authentication with your Hostinger server
#
# Usage: ./scripts/deploy.sh

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_ROOT"

# Load environment variables
ENV_FILE="$PROJECT_ROOT/.env"
if [ ! -f "$ENV_FILE" ]; then
    echo "ERROR: .env file not found. Copy .env.example to .env and configure it."
    exit 1
fi

set -a
source "$ENV_FILE"
set +a

# Validate required vars
for var in DEPLOY_HOST DEPLOY_USER DEPLOY_PATH; do
    if [ -z "${!var:-}" ]; then
        echo "ERROR: $var not set in .env"
        exit 1
    fi
done

DEPLOY_PORT="${DEPLOY_PORT:-22}"

echo "============================================"
echo " Deploying UK Money Explained"
echo " Host: $DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH"
echo "============================================"

# Step 1: Build
echo ""
echo "--- Building site ---"
bash "$SCRIPT_DIR/build.sh"

# Step 2: Deploy
echo ""
echo "--- Deploying via rsync ---"
rsync -avz --delete \
    -e "ssh -p $DEPLOY_PORT -o StrictHostKeyChecking=accept-new" \
    public/ \
    "$DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH/"

echo ""
echo "============================================"
echo " Deploy complete!"
echo " Site: https://ukmoneyexplained.com"
echo "============================================"
