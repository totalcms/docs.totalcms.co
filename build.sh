#!/bin/bash
# Total CMS Documentation - Build Script
#
# Usage:
#   ./build.sh                          # Build only (for server deploys)
#   ./build.sh /path/to/totalcms        # Sync docs from totalcms repo, then build

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

TOTALCMS_REPO="${1:-/Users/joeworkman/Developer/totalcms}"
TOTALCMS_DOCS="$TOTALCMS_REPO/resources/docs"
if [ -d "$TOTALCMS_DOCS" ]; then
    echo "==> Syncing docs from $TOTALCMS_DOCS..."
    bash bin/sync-from-totalcms.sh "$TOTALCMS_DOCS"
    echo ""
else
    echo "==> Skipping doc sync (not found: $TOTALCMS_DOCS)"
fi

echo "==> Installing dependencies..."
npm ci --production=false

echo "==> Generating llms-full.txt..."
python3 bin/build-llms-full.py

echo "==> Building documentation site..."
npx astro build

echo "==> Build complete! Static site is in ./dist/"
