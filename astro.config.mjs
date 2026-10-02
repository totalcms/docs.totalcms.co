// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sidebar from './src/sidebar.json' with { type: 'json' };

// https://astro.build/config
export default defineConfig({
	site: 'https://docs.totalcms.co',
	// Pages moved when the docs were reorganised into get-started/, fields/,
	// apis/, operations/, site-builder/ and friends. Search Console still
	// reports the old paths as 404s, and old links on forums and other sites
	// still point at them. A static build emits each as an instant
	// meta-refresh page with a canonical link, which search engines follow
	// like a permanent redirect.
	redirects: {
		'/installation': '/get-started/installation/',
		'/requirements': '/get-started/requirements/',
		'/getting-started': '/get-started/welcome/',
		'/getting-started/getting-started': '/get-started/welcome/',
		'/getting-started/configuration': '/operations/configuration/',
		'/templating': '/twig/overview/',

		'/property-settings/all-fields': '/fields/all-fields/',
		'/property-settings/card': '/fields/card/',
		'/property-settings/date': '/fields/date/',
		'/property-settings/deck': '/fields/deck/',
		'/property-settings/file-depot': '/fields/file-depot/',
		'/property-settings/number-range': '/fields/number-range/',
		'/property-settings/password': '/fields/password/',
		'/property-settings/price': '/fields/price/',
		'/property-settings/radio-multicheckbox': '/fields/radio-checklist/',
		'/property-settings/secret': '/fields/secret/',
		'/property-settings/select': '/fields/select/',
		'/property-settings/styled-text': '/fields/styled-text/',
		'/property-settings/svg': '/fields/svg/',
		'/property-settings/text-inputs': '/fields/text-inputs/',
		'/property-options/property-options': '/fields/property-options/',
		'/property-options/relational-options': '/fields/relational-options/',
		'/property-options/sorting-options': '/fields/sorting-options/',
		'/fields/radio-multicheckbox': '/fields/radio-checklist/',

		'/api/api-keys': '/apis/api-keys/',
		'/api/php-api': '/apis/php-api/',
		'/api/rest-api': '/apis/rest-api/',
		'/api/rss-feeds': '/twig/feeds/',

		'/advanced/ai-integration': '/extensions/ai-integration/',
		'/advanced/deployment': '/operations/deployment/',
		'/advanced/filesystem': '/operations/filesystem/',
		'/advanced/jumpstart': '/operations/jumpstart/',
		'/advanced/licenses': '/operations/licenses/',
		'/advanced/migration-total-cms-one': '/operations/migration-total-cms-one/',
		'/advanced/search': '/operations/search/',
		'/advanced/security': '/operations/security/',
		'/advanced/server-sizing': '/operations/server-sizing/',
		'/advanced/sitemap-builder': '/collections/sitemap-builder/',
		'/advanced/updates': '/operations/updates/',

		'/builder/overview': '/site-builder/overview/',
		'/builder/admin': '/site-builder/admin/',
		'/builder/cli': '/site-builder/cli/',
		'/builder/frontend': '/site-builder/frontend/',
		'/builder/starters': '/site-builder/starters/',

		'/twig/admin': '/admin/twig/',
		'/twig/auth': '/auth/twig/',
		'/twig/builder': '/site-builder/twig/',
		'/twig/schemas': '/schemas/twig/',
		'/twig/forms/builder': '/forms/builder/',
		'/twig/forms/fields': '/forms/fields/',
		'/twig/forms/report': '/forms/report/',
		'/twig/forms/specialized': '/forms/specialized/',

		'/collections/formgrid': '/schemas/formgrid/',
		'/extensions/bundled/ab-split': '/extensions/ab-split/',
		'/extensions/bundled/geo-redirect': '/extensions/geo-redirect/',
		'/docs/dataviews': '/collections/data-views/',
		'/admin/utils/jumpstart': '/operations/jumpstart/',
	},
	integrations: [
		starlight({
			title: 'Total CMS',
			logo: {
				src: './src/assets/totalcms.svg',
			},
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/totalcms/cms' },
			],
			components: {
				PageTitle: './src/components/PageTitle.astro',
			},
			customCss: [
				'./src/styles/custom.css',
			],
			// Matomo Tag Manager container, injected into every page's <head>.
			head: [
				{
					tag: 'script',
					content: `var _mtm = window._mtm = window._mtm || [];
_mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});
(function() {
	var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
	g.async=true; g.src='https://matomo.totalcms.co/js/container_R0RCCzub.js'; s.parentNode.insertBefore(g,s);
})();`,
				},
			],
			sidebar,
		}),
	],
});
