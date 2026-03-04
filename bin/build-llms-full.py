#!/usr/bin/env python3
"""Build llms-full.txt from all documentation markdown files."""

import os
import re

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOCS_DIR = os.path.join(PROJECT_ROOT, "src", "content", "docs")
OUT_FILE = os.path.join(PROJECT_ROOT, "public", "llms-full.txt")

# Section ordering: (section_name, directory OR None for root-level files, [optional file list])
SECTIONS = [
    ("Start Here", None, ["getting-started.md", "installation.md"]),
    ("Dashboard", "admin", None),
    ("Collections", "collections", None),
    ("Property Settings", "property-settings", None),
    ("Property Options", "property-options", None),
    ("Schemas", "schemas", None),
    ("Twig Language", "twig", ["overview.md", "filters.md", "functions.md", "variables.md", "conditionals.md", "markdown.md", "factory.md", "templates.md"]),
    ("CMS Content", "twig", ["totalcms.md", "collections.md", "collection-filtering.md", "data.md", "media.md", "render.md", "cmsgrid-tag.md", "object-linking.md", "locale.md", "localization.md", "views.md", "qrcodes.md", "barcodes.md", "forms.md"]),
    ("CMS Admin", "twig", ["admin.md", "auth.md", "edition.md", "schemas.md"]),
    ("Authentication", "auth", None),
    ("API", "api", None),
    ("Behind the Scenes", "advanced", None),
]

def extract_frontmatter_and_content(filepath):
    with open(filepath) as f:
        content = f.read()

    title = ""
    body = content

    # Extract from frontmatter
    fm_match = re.match(r'^---\s*\n(.*?)\n---\s*\n(.*)', content, re.DOTALL)
    if fm_match:
        fm = fm_match.group(1)
        body = fm_match.group(2)
        tm = re.search(r'^title:\s*"(.+?)"', fm, re.M)
        if tm:
            title = tm.group(1)

    return title, body.strip()

header = """# Total CMS - Complete Documentation

> Total CMS is a modern, flat-file content management system built with PHP. It uses JSON storage instead of a traditional database, Twig for templating, and provides a comprehensive REST API and admin dashboard.

This document contains the complete Total CMS documentation for LLM consumption.

---

"""

with open(OUT_FILE, 'w') as out:
    out.write(header)

    for section_name, section_dir, file_list in SECTIONS:
        if section_dir:
            section_path = os.path.join(DOCS_DIR, section_dir)
        else:
            section_path = DOCS_DIR

        if not os.path.isdir(section_path):
            continue

        if file_list:
            files = [f for f in file_list if os.path.isfile(os.path.join(section_path, f))]
        else:
            files = sorted([f for f in os.listdir(section_path) if f.endswith('.md')])

        if not files:
            continue

        out.write(f"\n{'='*60}\n")
        out.write(f"# {section_name}\n")
        out.write(f"{'='*60}\n\n")

        for fname in files:
            fpath = os.path.join(section_path, fname)
            title, body = extract_frontmatter_and_content(fpath)

            out.write(f"## {title}\n\n")
            out.write(body)
            out.write("\n\n---\n\n")

size = os.path.getsize(OUT_FILE)
print(f"Generated {OUT_FILE}")
print(f"Size: {size / 1024:.0f} KB")
