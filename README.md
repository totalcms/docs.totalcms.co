# Total CMS Documentation

Source for [docs.totalcms.co](https://docs.totalcms.co), the public documentation site for [Total CMS](https://totalcms.co). Built with [Astro Starlight](https://starlight.astro.build/).

## Content Source

Documentation content lives in the main [totalcms/cms](https://github.com/totalcms/cms) repo at `resources/docs/`. This site syncs from that source:

```bash
bin/sync-from-totalcms.sh /path/to/totalcms/resources/docs
```

The sync extracts frontmatter, converts internal links, and copies files into `src/content/docs/`.

## Development

```bash
npm install
npm run dev
```

## Building for Production

```bash
bin/build.sh /path/to/totalcms
```

The built site outputs to `./dist/`. Point your web server document root there.

## Links

- [docs.totalcms.co](https://docs.totalcms.co)
- [Total CMS](https://totalcms.co)
- [totalcms/cms](https://github.com/totalcms/cms)
