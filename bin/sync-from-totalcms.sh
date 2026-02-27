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
        cp "$src_file" "$dest_file"
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

    # Fix internal links: docs/path/to/file -> /path/to/file/
    if [[ "$(uname)" == "Darwin" ]]; then
        sed -i '' -E 's|\(docs/([^)"]+)\)|(/\1/)|g' "$dest_file"
    else
        sed -i -E 's|\(docs/([^)"]+)\)|(/\1/)|g' "$dest_file"
    fi

    echo "  $rel_path"
}

# Process all markdown files
find "$SRC" -name '*.md' -type f | sort | while read -r file; do
    process_file "$file"
done

echo "Sync complete!"
