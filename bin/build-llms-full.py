#!/usr/bin/env python3
"""Build llms-full.txt from all documentation markdown files."""

import os
import re

DOCS_DIR = "/Users/joeworkman/Websites/docs.totalcms.co/src/content/docs"
OUT_FILE = "/Users/joeworkman/Websites/docs.totalcms.co/public/llms-full.txt"

# Section ordering
SECTIONS = [
    ("Getting Started", "getting-started"),
    ("Admin", "admin"),
    ("Authentication", "auth"),
    ("Collections", "collections"),
    ("Property Settings", "property-settings"),
    ("Property Options", "property-options"),
    ("Twig Templates", "twig"),
    ("API", "api"),
    ("Schemas", "schemas"),
    ("Advanced", "advanced"),
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

    for section_name, section_dir in SECTIONS:
        section_path = os.path.join(DOCS_DIR, section_dir)
        if not os.path.isdir(section_path):
            continue

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
