#!/usr/bin/env bash
# UK Money Explained — Build Script
# Builds the Hugo site with minification and fingerprinting.
#
# Usage: ./scripts/build.sh

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_ROOT"

echo "Building UK Money Explained..."
echo "Hugo version: $(hugo version)"

# Clean previous build
rm -rf public/

# Build with minification and garbage collection
hugo --minify --gc

# Count output
PAGE_COUNT=$(find public -name "*.html" | wc -l)
echo ""
echo "Build complete!"
echo "  Output: public/"
echo "  Pages:  $PAGE_COUNT"
echo "  Size:   $(du -sh public/ | cut -f1)"
