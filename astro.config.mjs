// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sidebar from './src/sidebar.json' with { type: 'json' };

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
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/totalcms/cms' },
			],
			components: {
				PageTitle: './src/components/PageTitle.astro',
			},
			customCss: [
				'./src/styles/custom.css',
			],
			sidebar,
		}),
	],
});
