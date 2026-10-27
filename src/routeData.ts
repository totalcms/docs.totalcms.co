import { defineRouteMiddleware } from '@astrojs/starlight/route-data';

// With build.format 'file', Starlight emits canonical and og:url as <path>.html.
// The site is served slashless without the extension (see public/.htaccess), so strip it.
const stripHtml = (url: string) => url.replace(/(\/index)?\.html$/, '');

export const onRequest = defineRouteMiddleware((context) => {
	for (const entry of context.locals.starlightRoute.head) {
		if (entry.tag === 'link' && entry.attrs?.rel === 'canonical' && typeof entry.attrs.href === 'string') {
			entry.attrs.href = stripHtml(entry.attrs.href);
		}
		if (entry.tag === 'meta' && entry.attrs?.property === 'og:url' && typeof entry.attrs.content === 'string') {
			entry.attrs.content = stripHtml(entry.attrs.content);
		}
	}
});
