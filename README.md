# Total CMS Documentation

Public documentation site for [Total CMS](https://totalcms.co), built with [Astro Starlight](https://starlight.astro.build/).

## Development

```bash
npm install
npm run dev
```

## Building for Production

```bash
./build.sh
```

The built site outputs to `./dist/`. Point your web server document root there.

## Syncing Docs from Total CMS

Documentation source files live in the main Total CMS repo at `resources/docs/`. To sync them into this site:

```bash
bin/sync-from-totalcms.sh /path/to/totalcms/resources/docs
```

This is also automated via the GitHub Action in `.github/workflows/sync-docs.yml` (runs in the totalcms repo on push to main).
