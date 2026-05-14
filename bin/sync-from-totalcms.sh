#!/bin/bash
# Sync documentation from Total CMS source repo into Starlight content.
#
# Usage: bin/sync-from-totalcms.sh /path/to/totalcms/resources/docs
#
# This processes markdown files by:
# 1. Adding Starlight-compatible frontmatter (title extracted from H1)
# 2. Fixing internal cross-reference links
# 3. Skipping index.md (homepage is maintained separately) and internal/ docs

set -e

SRC="${1:?Usage: $0 /path/to/totalcms/resources/docs}"
DEST="$(cd "$(dirname "$0")/.." && pwd)/src/content/docs"

if [ ! -d "$SRC" ]; then
    echo "Error: Source directory not found: $SRC"
    exit 1
fi

echo "Syncing docs from $SRC to $DEST"

# Remove existing synced docs so deleted/renamed files don't linger.
# Preserve index.md (homepage maintained separately).
find "$DEST" -name '*.md' ! -name 'index.md' -type f -delete
# Drop synced image dirs so renames/removals don't linger; we'll re-copy fresh below.
find "$DEST" -type d -name images -prune -exec rm -rf {} + 2>/dev/null || true
# Clean up any empty directories left behind
find "$DEST" -type d -empty -delete 2>/dev/null || true

process_file() {
    local src_file="$1"
    local rel_path="${src_file#$SRC/}"
    local dest_file="$DEST/$rel_path"

    # Skip files we don't want
    if [[ "$rel_path" == "index.md" ]] || [[ "$rel_path" == internal/* ]] || [[ "$rel_path" == *.json ]]; then
        return
    fi

    mkdir -p "$(dirname "$dest_file")"

    # Extract title from first H1 or H2
    local title
    title=$(grep -m1 '^#\{1,2\} ' "$src_file" | sed 's/^#\{1,2\} //')

    if [ -z "$title" ]; then
        title=$(basename "$src_file" .md | sed 's/-/ /g' | awk '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) tolower(substr($i,2))}1')
    fi

    # Escape quotes in title for YAML
    title=$(echo "$title" | sed "s/'/\\\\'/g" | sed 's/"/\\"/g')

    # Check if file already has frontmatter
    local first_line
    first_line=$(head -1 "$src_file")

    if [[ "$first_line" == "---" ]]; then
        # Has frontmatter — preserve it but strip the H1 (Starlight renders title from frontmatter)
        awk '
            BEGIN { in_fm=0; past_fm=0; skipped_h1=0 }
            !past_fm && /^---$/ { in_fm=!in_fm; if(!in_fm) past_fm=1; print; next }
            !past_fm { print; next }
            past_fm && !skipped_h1 && /^$/ { next }
            past_fm && !skipped_h1 && /^# / { skipped_h1=1; next }
            past_fm && skipped_h1==1 && /^$/ { skipped_h1=2; next }
            { skipped_h1=2; print }
        ' "$src_file" > "$dest_file"
    else
        {
            echo "---"
            echo "title: \"$title\""
            echo "---"
            echo ""
            # Skip the first H1 line and any blank line right after it
            awk '
                BEGIN { skipped=0 }
                skipped==0 && /^# / { skipped=1; next }
                skipped==1 && /^$/ { skipped=2; next }
                { skipped=2; print }
            ' "$src_file"
        } > "$dest_file"
    fi

    # Rewrite image refs first: docs/<section>/images/<file> -> ./images/<file>
    # (markdown lives at <section>/<page>.md so a relative ./images path resolves correctly)
    # Then rewrite remaining page refs: docs/<path> -> /<path>/
    if [[ "$(uname)" == "Darwin" ]]; then
        sed -i '' -E 's|\(docs/[^/)]+/images/([^)]+)\)|(./images/\1)|g' "$dest_file"
        sed -i '' -E 's|\(docs/([^)"]+)\)|(/\1/)|g' "$dest_file"
    else
        sed -i -E 's|\(docs/[^/)]+/images/([^)]+)\)|(./images/\1)|g' "$dest_file"
        sed -i -E 's|\(docs/([^)"]+)\)|(/\1/)|g' "$dest_file"
    fi

    echo "  $rel_path"
}

# Process all markdown files
find "$SRC" -name '*.md' -type f | sort | while read -r file; do
    process_file "$file"
done

# Copy co-located image directories (resources/docs/<section>/images/ -> src/content/docs/<section>/images/)
echo "Copying images..."
find "$SRC" -type d -name images | sort | while read -r imagedir; do
    rel_dir="${imagedir#$SRC/}"
    dest_dir="$DEST/$rel_dir"
    mkdir -p "$dest_dir"
    # Copy contents (not the dir itself) so re-runs are idempotent
    cp -R "$imagedir"/. "$dest_dir"/
    count=$(find "$imagedir" -type f | wc -l | tr -d ' ')
    echo "  $rel_dir/ ($count files)"
done

# Regenerate Starlight sidebar + llms files from menu.php so everything stays in lockstep with the
# in-admin viewer. These walk the source menu, not the synced content, so run them after the .md
# files are in place but they only depend on $SRC.
BIN="$(cd "$(dirname "$0")" && pwd)"
echo "Regenerating sidebar..."
php "$BIN/build-sidebar.php" "$SRC"
echo "Regenerating llms.txt..."
php "$BIN/build-llms.php" "$SRC"
echo "Regenerating llms-full.txt..."
php "$BIN/build-llms-full.php" "$SRC"

echo "Sync complete!"
