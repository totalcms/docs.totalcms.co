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
					label: 'Start Here',
					items: [
						{ label: 'Getting Started', slug: 'getting-started' },
						{ label: 'Installation', slug: 'installation' },
					],
				},
				{
					label: 'Dashboard',
					items: [
						{ label: 'Overview', slug: 'admin/dashboard' },
						{ label: 'White Label', slug: 'admin/whitelabel' },
					],
				},
				{
					label: 'Collections',
					items: [
						{ label: 'Collection Settings', slug: 'collections/settings' },
						{ label: 'Form Settings', slug: 'collections/form-settings' },
						{ label: 'Pushover Notifications', slug: 'notifications/pushover' },
						{ label: 'Form Grid Layout', slug: 'collections/formgrid' },
						{ label: 'Importing Data', slug: 'collections/import' },
						{ label: 'Exporting Data', slug: 'collections/export' },
						{ label: 'Sitemap Builder', slug: 'advanced/sitemap-builder' },
						{ label: 'Data Views', slug: 'collections/data-views' },
					],
				},
				{
					label: 'Property Settings',
					items: [
						{ label: 'All Fields', slug: 'property-settings/all-fields' },
						{ label: 'Code', slug: 'property-settings/code-editor' },
						{ label: 'Date', slug: 'property-settings/date' },
						{ label: 'Deck', slug: 'property-settings/deck' },
						{ label: 'File & Depot', slug: 'property-settings/file-depot' },
						{ label: 'ID', slug: 'property-settings/id' },
						{ label: 'Image & Gallery', slug: 'property-settings/image-gallery' },
						{ label: 'Lists', slug: 'property-settings/lists' },
						{ label: 'Number & Range', slug: 'property-settings/number-range' },
						{ label: 'Password', slug: 'property-settings/password' },
						{ label: 'Price', slug: 'property-settings/price' },
						{ label: 'Radio & Multicheckbox', slug: 'property-settings/radio-multicheckbox' },
						{ label: 'Select', slug: 'property-settings/select' },
						{ label: 'Styled Text', slug: 'property-settings/styled-text' },
						{ label: 'SVG', slug: 'property-settings/svg' },
						{ label: 'Text & Textarea', slug: 'property-settings/text-inputs' },
					],
				},
				{
					label: 'Property Options',
					items: [
						{ label: 'Static Options', slug: 'property-options/static-options' },
						{ label: 'Property Options', slug: 'property-options/property-options' },
						{ label: 'Relational Options', slug: 'property-options/relational-options' },
						{ label: 'Sorting Options', slug: 'property-options/sorting-options' },
						{ label: 'Access Group Options', slug: 'property-options/access-group-options' },
					],
				},
				{
					label: 'Schemas',
					items: [
						{ label: 'Schema Validation', slug: 'schemas/validation' },
					],
				},
				{
					label: 'Twig Language',
					items: [
						{ label: 'Overview', slug: 'twig/overview' },
						{ label: 'Filters', slug: 'twig/filters' },
						{ label: 'Functions', slug: 'twig/functions' },
						{ label: 'Variables', slug: 'twig/variables' },
						{ label: 'Conditionals', slug: 'twig/conditionals' },
						{ label: 'Markdown', slug: 'twig/markdown' },
						{ label: 'Factory', slug: 'twig/factory' },
						{ label: 'Templates', slug: 'twig/templates' },
					],
				},
				{
					label: 'CMS Content',
					items: [
						{ label: 'CMS Content', slug: 'twig/totalcms' },
						{ label: 'Collections', slug: 'twig/collections' },
						{ label: 'Collection Filtering', slug: 'twig/collection-filtering' },
						{ label: 'Data', slug: 'twig/data' },
						{ label: 'Media', slug: 'twig/media' },
						{ label: 'Render', slug: 'twig/render' },
						{ label: 'ImageWorks', slug: 'twig/imageworks' },
						{ label: 'CMS Grid Tag', slug: 'twig/cmsgrid-tag' },
						{ label: 'Load More', slug: 'twig/load-more' },
						{ label: 'Object Linking', slug: 'twig/object-linking' },
						{ label: 'Locale', slug: 'twig/locale' },
						{ label: 'Localization', slug: 'twig/localization' },
						{ label: 'Views', slug: 'twig/views' },
						{ label: 'QR Codes', slug: 'twig/qrcodes' },
						{ label: 'Bar Codes', slug: 'twig/barcodes' },
					],
				},
				{
					label: 'CMS Admin',
					items: [
						{ label: 'Admin', slug: 'twig/admin' },
						{ label: 'Auth', slug: 'twig/auth' },
						{ label: 'Edition', slug: 'twig/edition' },
						{ label: 'Schemas', slug: 'twig/schemas' },
						{ label: 'Forms Overview', slug: 'twig/forms/overview' },
						{ label: 'Form Builder', slug: 'twig/forms/builder' },
						{ label: 'Deck Forms', slug: 'twig/forms/deck' },
						{ label: 'Form Options', slug: 'twig/forms/options' },
						{ label: 'Field Settings', slug: 'twig/forms/fields' },
						{ label: 'Select & List Options', slug: 'twig/forms/select-options' },
						{ label: 'Validation Patterns', slug: 'twig/forms/patterns' },
						{ label: 'Report Form', slug: 'twig/forms/report' },
						{ label: 'Specialized Forms', slug: 'twig/forms/specialized' },
					],
				},
				{
					label: 'Authentication',
					items: [
						{ label: 'Authentication', slug: 'auth/auth' },
						{ label: 'Access Groups', slug: 'auth/access-groups' },
						{ label: 'Password Reset', slug: 'auth/password-reset' },
					],
				},
				{
					label: 'API',
					items: [
						{ label: 'REST API', slug: 'api/rest-api' },
						{ label: 'API Keys', slug: 'api/api-keys' },
						{ label: 'Index Filter', slug: 'api/index-filter' },
						{ label: 'PHP API', slug: 'api/php-api' },
						{ label: 'Download', slug: 'api/download' },
					],
				},
				{
					label: 'Behind the Scenes',
					items: [
						{ label: 'AI Integration', slug: 'advanced/ai-integration' },
						{ label: 'Configuration', slug: 'advanced/configuration' },
						{ label: 'Data Model', slug: 'advanced/data-model' },
						{ label: 'Deployment', slug: 'advanced/deployment' },
						{ label: 'Filesystem', slug: 'advanced/filesystem' },
						{ label: 'JumpStart', slug: 'advanced/jumpstart' },
						{ label: 'Licenses', slug: 'advanced/licenses' },
						{ label: 'Migration from v1', slug: 'advanced/migration-total-cms-one' },
						{ label: 'Nginx', slug: 'advanced/nginx' },
						{ label: 'Search', slug: 'advanced/search' },
						{ label: 'Security', slug: 'advanced/security' },
						{ label: 'Server Sizing', slug: 'advanced/server-sizing' },
					],
				},
			],
		}),
	],
});
