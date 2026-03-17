#!/usr/bin/env bash
# UK Money Explained — Batch Generation Runner
# Generates articles, validates them, and builds the site.
#
# Usage:
#   ./run_batch.sh                    # Generate all pending priority 1 articles
#   ./run_batch.sh --batch 5          # Generate 5 articles
#   ./run_batch.sh --dry-run          # Dry run only
#   ./run_batch.sh --priority 2       # Priority 2 articles

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_ROOT"

echo "============================================"
echo " UK Money Explained — Batch Generation"
echo " $(date)"
echo "============================================"

# Pass all arguments through to generate.py
echo ""
echo "--- Step 1: Generate Articles ---"
python3 pipeline/generate.py "$@"

# Skip validation and build on dry-run
if [[ " $* " == *"--dry-run"* ]]; then
    echo ""
    echo "Dry run complete. Skipping validation and build."
    exit 0
fi

echo ""
echo "--- Step 2: Validate Articles ---"
python3 pipeline/validate.py --all || true

echo ""
echo "--- Step 3: Build Site ---"
hugo --minify --gc 2>&1

echo ""
echo "============================================"
echo " Batch complete!"
echo " Site built in: public/"
echo "============================================"
