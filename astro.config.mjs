// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	// Set site and base for GitHub Pages.
	// For a project page (github.com/ORG/REPO): site='https://ORG.github.io', base='/REPO'
	// For an org page (github.com/ORG/ORG.github.io): site='https://ORG.github.io', no base needed
	site: 'https://docs.invisyne.com',
	image: {
		// Allow large animated GIFs (screen recordings) that exceed Sharp's default pixel limit
		service: {
			entrypoint: 'astro/assets/services/sharp',
			config: { limitInputPixels: false },
		},
	},

	integrations: [
		starlight({
			title: {
				en: 'Documentation',
				de: 'Dokumentation',
			},
			customCss: ['./src/styles/custom.css'],
			favicon: '/favicon.png',
			logo: {
				dark: './src/assets/logo.png',
				light: './src/assets/logo-light.png',
				alt: 'Invisyne',
				replacesTitle: false,
			},
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
					label: 'Edge (Crawler)',
					translations: { de: 'Edge (Crawler)' },
					collapsed: true,
					items: [
						{ label: 'Overview', translations: { de: 'Übersicht' }, slug: 'edge' },
						{
							label: 'More Overview',
							translations: { de: 'Weitere Infos' },
							autogenerate: { directory: 'edge/overview' },
						},
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
					collapsed: true,
					items: [
						{ label: 'Overview', translations: { de: 'Übersicht' }, slug: 'companion' },
						{
							label: 'More Overview',
							translations: { de: 'Weitere Infos' },
							autogenerate: { directory: 'companion/overview' },
						},
						{ label: 'Quickstart', translations: { de: 'Schnellstart' }, slug: 'companion/quickstart' },
						{
							label: 'UI Reference',
							translations: { de: 'Benutzeroberfläche' },
							autogenerate: { directory: 'companion/ui' },
						},
						{
							label: 'How-To Guides',
							translations: { de: 'Anleitungen' },
							autogenerate: { directory: 'companion/how-to' },
						},
						{ label: 'Changelog', translations: { de: 'Changelog' }, slug: 'companion/changelog' },
					],
				},
				{
					label: 'Hub',
					translations: { de: 'Hub' },
					collapsed: true,
					items: [
						{ label: 'Overview', translations: { de: 'Übersicht' }, slug: 'hub' },
						{
							label: 'More Overview',
							translations: { de: 'Weitere Infos' },
							autogenerate: { directory: 'hub/overview' },
						},
						{ label: 'Quickstart', translations: { de: 'Schnellstart' }, slug: 'hub/quickstart' },
						{
							label: 'UI Reference',
							translations: { de: 'Benutzeroberfläche' },
							autogenerate: { directory: 'hub/ui' },
						},
						{ label: 'Changelog', translations: { de: 'Changelog' }, slug: 'hub/changelog' },
					],
				},
				{
					label: 'Downloads',
					translations: { de: 'Downloads' },
					items: [
						{ label: 'Edge (Crawler) PDF', link: '/downloads/edge.pdf', attrs: { target: '_blank' } },
						{ label: 'Companion PDF', link: '/downloads/companion.pdf', attrs: { target: '_blank' } },
						{ label: 'Hub PDF', link: '/downloads/hub.pdf', attrs: { target: '_blank' } },
					],
				},
			],
		}),
	],
});
