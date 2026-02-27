# CLAUDE.md

## Project Overview

This is the public documentation website for [Total CMS](https://totalcms.co), built with [Astro Starlight](https://starlight.astro.build/).

Total CMS is a modern, flat-file PHP content management system. This site serves as the user-facing documentation at `docs.totalcms.co`.

## Technology Stack

- **Framework**: Astro with Starlight documentation theme
- **Content**: Markdown files in `src/content/docs/`
- **Search**: Pagefind (built-in with Starlight)
- **Build output**: Static HTML in `dist/`

## Project Structure

- `src/content/docs/` - All documentation pages (markdown with YAML frontmatter)
- `src/assets/` - Images and logos (totalcms.svg)
- `src/styles/custom.css` - Custom CSS overrides
- `astro.config.mjs` - Starlight configuration including sidebar navigation
- `build.sh` - Build script (syncs docs from totalcms repo + builds site)
- `bin/sync-from-totalcms.sh` - Syncs markdown from the main Total CMS repo

## Documentation Source

The canonical source for documentation content is the main Total CMS repo at `/Users/joeworkman/Developer/totalcms/resources/docs/`. The sync script processes these files by:

1. Extracting the H1 title into Starlight frontmatter
2. Removing the duplicate H1 (Starlight renders it from frontmatter)
3. Converting internal links from `docs/path/to/file` to `/path/to/file/`

## Common Commands

```bash
# Local development
npm run dev

# Sync docs from totalcms repo and build
./build.sh

# Sync from a custom path
./build.sh /path/to/totalcms

# Build only (no sync, for server deploys)
# Just runs when totalcms repo path doesn't exist at default location
./build.sh
```

## Sidebar Configuration

The sidebar is manually configured in `astro.config.mjs`. When adding new documentation pages, you must also add them to the sidebar config.

## Deployment

The site is deployed via a GitHub webhook. On push, the server pulls changes and runs `./build.sh`. The web server document root points to `./dist/`.
