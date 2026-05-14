#!/usr/bin/env php
<?php

/**
 * Generate Starlight sidebar JSON from the Total CMS docs menu.
 *
 * Source:  <totalcms>/resources/docs/menu.php
 * Output:  src/sidebar.json (imported by astro.config.mjs)
 *
 * Usage: bin/build-sidebar.php /path/to/totalcms/resources/docs
 */

$srcDocs = $argv[1] ?? null;
if (!$srcDocs || !is_dir($srcDocs)) {
	fwrite(STDERR, "Usage: build-sidebar.php /path/to/totalcms/resources/docs\n");
	exit(1);
}

$menuFile = rtrim($srcDocs, '/') . '/menu.php';
if (!is_file($menuFile)) {
	fwrite(STDERR, "menu.php not found at $menuFile\n");
	exit(1);
}

$menu = require $menuFile;
if (!is_array($menu)) {
	fwrite(STDERR, "menu.php did not return an array\n");
	exit(1);
}

function convertItems(array $entries, string $srcDocs): array
{
	$out = [];
	foreach ($entries as $e) {
		$mdFile = rtrim($srcDocs, '/') . '/' . $e['path'] . '.md';
		if (!is_file($mdFile)) {
			fwrite(STDERR, "  skipping menu entry (no .md): {$e['path']}\n");
			continue;
		}
		$out[] = ['label' => $e['title'], 'slug' => $e['path']];
	}
	return $out;
}

$sidebar = [];
foreach ($menu as $group) {
	$items = [];
	if (!empty($group['sub'])) {
		foreach (convertItems($group['sub'], $srcDocs) as $item) {
			$items[] = $item;
		}
	}
	if (!empty($group['groups'])) {
		foreach ($group['groups'] as $sub) {
			$subItems = convertItems($sub['sub'], $srcDocs);
			if ($subItems) {
				$items[] = ['label' => $sub['title'], 'items' => $subItems];
			}
		}
	}
	if ($items) {
		$sidebar[] = ['label' => $group['title'], 'items' => $items];
	}
}

$outFile = dirname(__DIR__) . '/src/sidebar.json';
file_put_contents($outFile, json_encode($sidebar, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) . "\n");
echo "Wrote $outFile (" . count($sidebar) . " top-level groups)\n";
