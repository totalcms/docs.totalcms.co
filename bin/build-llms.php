#!/usr/bin/env php
<?php

/**
 * Generate public/llms.txt — short index of every doc page, grouped by menu.
 *
 * Source:  <totalcms>/resources/docs/menu.php (+ per-page frontmatter)
 * Output:  public/llms.txt
 *
 * Usage: bin/build-llms.php /path/to/totalcms/resources/docs
 */

const SITE = 'https://docs.totalcms.co';

$srcDocs = $argv[1] ?? null;
if (!$srcDocs || !is_dir($srcDocs)) {
	fwrite(STDERR, "Usage: build-llms.php /path/to/totalcms/resources/docs\n");
	exit(1);
}

$menu = require rtrim($srcDocs, '/') . '/menu.php';

function frontmatter(string $path): array
{
	if (!is_file($path)) {
		return [];
	}
	$lines = file($path);
	if (!$lines || trim($lines[0]) !== '---') {
		return [];
	}
	$out = [];
	for ($i = 1; $i < count($lines); $i++) {
		if (trim($lines[$i]) === '---') {
			break;
		}
		if (preg_match('/^([a-zA-Z_]+):\s*"?(.*?)"?\s*$/', $lines[$i], $m)) {
			$out[$m[1]] = $m[2];
		}
	}
	return $out;
}

function bullet(array $entry, string $srcDocs): ?string
{
	$mdFile = rtrim($srcDocs, '/') . '/' . $entry['path'] . '.md';
	if (!is_file($mdFile)) {
		return null;
	}
	$fm = frontmatter($mdFile);
	$desc = $fm['description'] ?? '';
	$url = SITE . '/' . $entry['path'] . '/';
	$line = "- [{$entry['title']}]($url)";
	if ($desc !== '') {
		$line .= ": $desc";
	}
	return $line;
}

$out = [];
$out[] = '# Total CMS';
$out[] = '';
$out[] = '> Total CMS is a modern, flat-file content management system built with PHP. It uses JSON storage instead of a traditional database, Twig for templating, and provides a comprehensive REST API and admin dashboard.';
$out[] = '';
$out[] = 'Total CMS is designed for web designers and developers who want a powerful CMS without database complexity. Content is stored as JSON files, making it easy to version control, backup, and deploy. It runs on any PHP 8.2+ host with no database setup required.';
$out[] = '';
$out[] = '## Key Features';
$out[] = '';
$out[] = '- Flat-file JSON storage (no database required)';
$out[] = '- 24 reserved collection schemas plus unlimited custom schemas';
$out[] = '- Twig templating with 50+ custom filters and functions';
$out[] = '- Full REST API for headless CMS usage';
$out[] = '- Admin dashboard with 20+ form field types';
$out[] = '- Image processing with watermarking and OKLCH color handling';
$out[] = '- Multi-backend caching (APCu, Redis, Memcached, filesystem)';
$out[] = '- Access groups and role-based permissions';
$out[] = '- JumpStart data import/export with streaming for large datasets';
$out[] = '- Barcode and QR code generation';
$out[] = '- CSV/JSON import and export (incl. nested card fields)';
$out[] = '- White label admin customization (Pro edition)';
$out[] = '- CLI tool (`tcms`) for schema, collection, sync, and extension management';
$out[] = '- Extension system with capability-based permissions and event hooks';
$out[] = '- Site Builder for routing builder-pages collections, starter scaffolds, and Vite frontend';
$out[] = '- Setup wizard for first-run operator onboarding';
$out[] = '- Passkey (WebAuthn) authentication and public registration with opt-in allow-list';
$out[] = '- One-click updates with rollback and maintenance mode';
$out[] = '- Push/pull sync between development and production';
$out[] = '- Tiptap rich text editor and inline template designer';
$out[] = '';
$out[] = '## Documentation';

foreach ($menu as $group) {
	$out[] = '';
	$out[] = '### ' . $group['title'];
	if (!empty($group['sub'])) {
		foreach ($group['sub'] as $entry) {
			$line = bullet($entry, $srcDocs);
			if ($line !== null) {
				$out[] = $line;
			}
		}
	}
	if (!empty($group['groups'])) {
		foreach ($group['groups'] as $sub) {
			$out[] = '';
			$out[] = '#### ' . $sub['title'];
			foreach ($sub['sub'] as $entry) {
				$line = bullet($entry, $srcDocs);
				if ($line !== null) {
					$out[] = $line;
				}
			}
		}
	}
}

$out[] = '';
$out[] = '## AI Integration';
$out[] = '';
$out[] = 'Total CMS provides an MCP (Model Context Protocol) server for AI coding agents. Configure it once and get accurate Total CMS answers in Claude Code, Cursor, Windsurf, or any MCP-compatible tool.';
$out[] = '';
$out[] = '**MCP Server:** `https://mcp.totalcms.co/`';
$out[] = '';
$out[] = "Add to your AI tool's MCP config:";
$out[] = '```json';
$out[] = '{';
$out[] = '  "mcpServers": {';
$out[] = '    "totalcms-docs": {';
$out[] = '      "url": "https://mcp.totalcms.co/"';
$out[] = '    }';
$out[] = '  }';
$out[] = '}';
$out[] = '```';
$out[] = '';
$out[] = 'Available tools: `docs_search`, `docs_twig_function`, `docs_twig_filter`, `docs_field_type`, `docs_api_endpoint`, `docs_schema_config`, `docs_cli_command`, `docs_extension`, `docs_builder`';
$out[] = '';
$out[] = '## Optional';
$out[] = '';
$out[] = '- [Full documentation for LLMs](' . SITE . '/llms-full.txt)';
$out[] = '';

$outFile = dirname(__DIR__) . '/public/llms.txt';
file_put_contents($outFile, implode("\n", $out));
echo "Wrote $outFile (" . count($out) . " lines)\n";
