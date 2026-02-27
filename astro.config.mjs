// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://docs.totalcms.co',
	integrations: [
		starlight({
			title: 'Total CMS',
			logo: {
				src: './src/assets/totalcms.svg',
			},
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/nickyoung87/total-cms' },
			],
			customCss: [
				'./src/styles/custom.css',
			],
			sidebar: [
				{
					label: 'Getting Started',
					items: [
						{ label: 'Introduction', slug: 'getting-started/getting-started' },
						{ label: 'Installation', slug: 'getting-started/installation' },
					],
				},
				{
					label: 'Admin',
					items: [
						{ label: 'Dashboard', slug: 'admin/dashboard' },
						{ label: 'White Label', slug: 'admin/whitelabel' },
					],
				},
				{
					label: 'Authentication',
					items: [
						{ label: 'Page Lock', slug: 'auth/auth' },
						{ label: 'Access Groups', slug: 'auth/access-groups' },
						{ label: 'Password Reset', slug: 'auth/password-reset' },
					],
				},
				{
					label: 'Collections',
					items: [
						{ label: 'Settings', slug: 'collections/settings' },
						{ label: 'Form Settings', slug: 'collections/form-settings' },
						{ label: 'Form Grid', slug: 'collections/formgrid' },
						{ label: 'Data Views', slug: 'collections/data-views' },
						{ label: 'Import', slug: 'collections/import' },
						{ label: 'Export', slug: 'collections/export' },
						{ label: 'Load More', slug: 'collections/load-more' },
					],
				},
				{
					label: 'Property Settings',
					collapsed: true,
					items: [
						{ label: 'All Fields', slug: 'property-settings/all-fields' },
						{ label: 'Text & Textarea', slug: 'property-settings/text-inputs' },
						{ label: 'Styled Text', slug: 'property-settings/styled-text' },
						{ label: 'Code Editor', slug: 'property-settings/code-editor' },
						{ label: 'Select & Multiselect', slug: 'property-settings/select' },
						{ label: 'Radio & Multicheckbox', slug: 'property-settings/radio-multicheckbox' },
						{ label: 'Number & Range', slug: 'property-settings/number-range' },
						{ label: 'Date', slug: 'property-settings/date' },
						{ label: 'Price', slug: 'property-settings/price' },
						{ label: 'Password', slug: 'property-settings/password' },
						{ label: 'Image & Gallery', slug: 'property-settings/image-gallery' },
						{ label: 'File & Depot', slug: 'property-settings/file-depot' },
						{ label: 'SVG', slug: 'property-settings/svg' },
						{ label: 'Deck', slug: 'property-settings/deck' },
						{ label: 'Lists', slug: 'property-settings/lists' },
						{ label: 'ID', slug: 'property-settings/id' },
					],
				},
				{
					label: 'Property Options',
					collapsed: true,
					items: [
						{ label: 'Overview', slug: 'property-options/property-options' },
						{ label: 'Static Options', slug: 'property-options/static-options' },
						{ label: 'Relational Options', slug: 'property-options/relational-options' },
						{ label: 'Sorting Options', slug: 'property-options/sorting-options' },
						{ label: 'Access Group Options', slug: 'property-options/access-group-options' },
					],
				},
				{
					label: 'Twig Templates',
					items: [
						{ label: 'Overview', slug: 'twig/overview' },
						{ label: 'CMS Adapter', slug: 'twig/totalcms' },
						{ label: 'Filters', slug: 'twig/filters' },
						{ label: 'Functions', slug: 'twig/functions' },
						{ label: 'Variables', slug: 'twig/variables' },
						{ label: 'Conditionals', slug: 'twig/conditionals' },
						{ label: 'Collection Filtering', slug: 'twig/collection-filtering' },
						{ label: 'Forms', slug: 'twig/forms' },
						{ label: 'CMS Grid Tag', slug: 'twig/cmsgrid-tag' },
						{ label: 'Object Linking', slug: 'twig/object-linking' },
						{ label: 'Markdown', slug: 'twig/markdown' },
						{ label: 'Localization', slug: 'twig/localization' },
						{ label: 'Factory', slug: 'twig/factory' },
						{ label: 'Barcodes', slug: 'twig/barcodes' },
						{ label: 'QR Codes', slug: 'twig/qrcodes' },
					],
				},
				{
					label: 'API',
					items: [
						{ label: 'REST API', slug: 'api/rest-api' },
						{ label: 'PHP API', slug: 'api/php-api' },
						{ label: 'API Keys', slug: 'api/api-keys' },
						{ label: 'Templates', slug: 'api/templates' },
						{ label: 'Index Filtering', slug: 'api/index-filter' },
						{ label: 'Downloads', slug: 'api/download' },
					],
				},
				{
					label: 'Schemas',
					items: [
						{ label: 'Validation', slug: 'schemas/validation' },
					],
				},
				{
					label: 'Advanced',
					collapsed: true,
					items: [
						{ label: 'Configuration', slug: 'advanced/configuration' },
						{ label: 'Data Model', slug: 'advanced/data-model' },
						{ label: 'Filesystem', slug: 'advanced/filesystem' },
						{ label: 'Security', slug: 'advanced/security' },
						{ label: 'Deployment', slug: 'advanced/deployment' },
						{ label: 'Server Sizing', slug: 'advanced/server-sizing' },
						{ label: 'JumpStart', slug: 'advanced/jumpstart' },
						{ label: 'Search', slug: 'advanced/search' },
						{ label: 'Sitemap Builder', slug: 'advanced/sitemap-builder' },
						{ label: 'Licenses', slug: 'advanced/licenses' },
						{ label: 'Migration from v1', slug: 'advanced/migration-total-cms-one' },
					],
				},
			],
		}),
	],
});
