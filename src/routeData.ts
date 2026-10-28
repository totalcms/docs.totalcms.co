import { defineRouteMiddleware } from '@astrojs/starlight/route-data';

// With build.format 'file', Starlight emits canonical, og:url, site title, sidebar, and pagination links
// as <path>.html. The site is served slashless without the extension (see public/.htaccess),
// so strip it. Search results (Pagefind) still carry .html and go through the .htaccess 301.
const stripHtml = (url: string) => url.replace(/(\/index)?\.html(?=$|[?#])/, '');

type SidebarEntry = { type: 'link'; href: string } | { type: 'group'; entries: SidebarEntry[] };

const stripSidebar = (entries: SidebarEntry[]) => {
	for (const entry of entries) {
		if (entry.type === 'link') {
			entry.href = stripHtml(entry.href);
		} else {
			stripSidebar(entry.entries);
		}
	}
};

export const onRequest = defineRouteMiddleware((context) => {
	const route = context.locals.starlightRoute;

	for (const entry of route.head) {
		if (entry.tag === 'link' && entry.attrs?.rel === 'canonical' && typeof entry.attrs.href === 'string') {
			entry.attrs.href = stripHtml(entry.attrs.href);
		}
		if (entry.tag === 'meta' && entry.attrs?.property === 'og:url' && typeof entry.attrs.content === 'string') {
			entry.attrs.content = stripHtml(entry.attrs.content);
		}
	}

	route.siteTitleHref = stripHtml(route.siteTitleHref) || '/';
	stripSidebar(route.sidebar as SidebarEntry[]);

	if (route.pagination.prev) {
		route.pagination.prev.href = stripHtml(route.pagination.prev.href);
	}
	if (route.pagination.next) {
		route.pagination.next.href = stripHtml(route.pagination.next.href);
	}
});
