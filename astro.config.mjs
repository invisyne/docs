// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	// Set site and base for GitHub Pages.
	// For a project page (github.com/ORG/REPO): site='https://ORG.github.io', base='/REPO'
	// For an org page (github.com/ORG/ORG.github.io): site='https://ORG.github.io', no base needed
	site: 'https://invisyne.github.io',
	base: '/docs', // remove if using a custom domain

	integrations: [
		starlight({
			title: 'Invisyne Docs',
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/invisyne' },
			],
			defaultLocale: 'root',
			locales: {
				root: { label: 'English', lang: 'en' },
				de: { label: 'Deutsch', lang: 'de' },
			},
			sidebar: [
				{
					label: 'Hub',
					translations: { de: 'Hub' },
					items: [
						{ label: 'Overview', translations: { de: 'Übersicht' }, slug: 'hub' },
						{ label: 'Quickstart', translations: { de: 'Schnellstart' }, slug: 'hub/quickstart' },
						{
							label: 'How-To Guides',
							translations: { de: 'Anleitungen' },
							autogenerate: { directory: 'hub/how-to' },
						},
						{ label: 'Changelog', translations: { de: 'Changelog' }, slug: 'hub/changelog' },
					],
				},
				{
					label: 'Edge',
					translations: { de: 'Edge' },
					items: [
						{ label: 'Overview', translations: { de: 'Übersicht' }, slug: 'edge' },
						{ label: 'Quickstart', translations: { de: 'Schnellstart' }, slug: 'edge/quickstart' },
						{
							label: 'How-To Guides',
							translations: { de: 'Anleitungen' },
							autogenerate: { directory: 'edge/how-to' },
						},
						{ label: 'Changelog', translations: { de: 'Changelog' }, slug: 'edge/changelog' },
					],
				},
				{
					label: 'Companion',
					translations: { de: 'Companion' },
					items: [
						{ label: 'Overview', translations: { de: 'Übersicht' }, slug: 'companion' },
						{ label: 'Quickstart', translations: { de: 'Schnellstart' }, slug: 'companion/quickstart' },
						{
							label: 'How-To Guides',
							translations: { de: 'Anleitungen' },
							autogenerate: { directory: 'companion/how-to' },
						},
						{ label: 'Changelog', translations: { de: 'Changelog' }, slug: 'companion/changelog' },
					],
				},
			],
		}),
	],
});
