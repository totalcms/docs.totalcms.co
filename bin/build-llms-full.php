#!/usr/bin/env php
<?php

/**
 * Generate public/llms-full.txt — concatenated body of every doc page, in menu order.
 *
 * Source:  <totalcms>/resources/docs/menu.php (+ per-page .md)
 * Output:  public/llms-full.txt
 *
 * Usage: bin/build-llms-full.php /path/to/totalcms/resources/docs
 */

$srcDocs = $argv[1] ?? null;
if (!$srcDocs || !is_dir($srcDocs)) {
	fwrite(STDERR, "Usage: build-llms-full.php /path/to/totalcms/resources/docs\n");
	exit(1);
}

$menu = require rtrim($srcDocs, '/') . '/menu.php';

function readPage(string $mdFile): ?array
{
	if (!is_file($mdFile)) {
		return null;
	}
	$content = file_get_contents($mdFile);
	$title = '';
	$body = $content;

	if (preg_match('/\A---\s*\n(.*?)\n---\s*\n(.*)/s', $content, $m)) {
		$fm = $m[1];
		$body = $m[2];
		if (preg_match('/^title:\s*"?([^"\n]+?)"?\s*$/m', $fm, $tm)) {
			$title = trim($tm[1]);
		}
	}

	// Strip a leading H1 — title is already emitted as a section heading.
	$body = preg_replace('/^\s*#\s+[^\n]+\n+/', '', $body, 1);

	return ['title' => $title, 'body' => trim($body)];
}

function emitSection(&$out, string $heading): void
{
	$out[] = '';
	$out[] = str_repeat('=', 60);
	$out[] = '# ' . $heading;
	$out[] = str_repeat('=', 60);
	$out[] = '';
}

function emitPage(&$out, array $entry, string $srcDocs): void
{
	$mdFile = rtrim($srcDocs, '/') . '/' . $entry['path'] . '.md';
	$page = readPage($mdFile);
	if ($page === null) {
		return;
	}
	$title = $page['title'] !== '' ? $page['title'] : $entry['title'];
	$out[] = '## ' . $title;
	$out[] = '';
	$out[] = $page['body'];
	$out[] = '';
	$out[] = '---';
	$out[] = '';
}

$out = [];
$out[] = '# Total CMS - Complete Documentation';
$out[] = '';
$out[] = '> Total CMS is a modern, flat-file content management system built with PHP. It uses JSON storage instead of a traditional database, Twig for templating, and provides a comprehensive REST API and admin dashboard.';
$out[] = '';
$out[] = 'This document contains the complete Total CMS documentation for LLM consumption.';
$out[] = '';
$out[] = '---';

foreach ($menu as $group) {
	emitSection($out, $group['title']);
	if (!empty($group['sub'])) {
		foreach ($group['sub'] as $entry) {
			emitPage($out, $entry, $srcDocs);
		}
	}
	if (!empty($group['groups'])) {
		foreach ($group['groups'] as $sub) {
			emitSection($out, $group['title'] . ' / ' . $sub['title']);
			foreach ($sub['sub'] as $entry) {
				emitPage($out, $entry, $srcDocs);
			}
		}
	}
}

$outFile = dirname(__DIR__) . '/public/llms-full.txt';
file_put_contents($outFile, implode("\n", $out));
$size = filesize($outFile);
echo "Wrote $outFile (" . round($size / 1024) . " KB)\n";
