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
			pagination: false,
			components: {
				Header: './src/components/Header.astro',
				LanguageSelect: './src/components/LanguageSelect.astro',
				ThemeSelect: './src/components/ThemeSelect.astro',
				Sidebar: './src/components/Sidebar.astro',
			},
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
				replacesTitle: true,
			},
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
						{ label: 'Quickstart', translations: { de: 'Schnellstart' }, slug: 'edge/quickstart' },
						{ label: 'Changelog', translations: { de: 'Changelog' }, slug: 'edge/changelog' },
						{
							label: 'How-To Guides',
							translations: { de: 'How-To\'s' },
							autogenerate: { directory: 'edge/how-to' },
						},
						{
							label: 'UI Reference',
							translations: { de: 'Benutzeroberfläche' },
							autogenerate: { directory: 'edge/ui' },
						},
						{
							label: 'Technical Reference',
							translations: { de: 'Technische Referenz' },
							autogenerate: { directory: 'edge/overview' },
						},
						{ label: 'Download PDF', translations: { de: 'PDF-Download' }, link: '/downloads/edge.pdf', attrs: { target: '_blank' } },
					],
				},
				{
					label: 'Companion',
					translations: { de: 'Companion' },
					collapsed: true,
					items: [
						{ label: 'Overview', translations: { de: 'Übersicht' }, slug: 'companion' },
						{ label: 'Quickstart', translations: { de: 'Schnellstart' }, slug: 'companion/quickstart' },
						{ label: 'Changelog', translations: { de: 'Changelog' }, slug: 'companion/changelog' },
						{
							label: 'How-To Guides',
							translations: { de: 'How-To\'s' },
							autogenerate: { directory: 'companion/how-to' },
						},
						{
							label: 'UI Reference',
							translations: { de: 'Benutzeroberfläche' },
							autogenerate: { directory: 'companion/ui' },
						},
						{
							label: 'Technical Reference',
							translations: { de: 'Technische Referenz' },
							autogenerate: { directory: 'companion/technical' },
						},
						{ label: 'Download PDF', translations: { de: 'PDF-Download' }, link: '/downloads/companion.pdf', attrs: { target: '_blank' } },
					],
				},
				{
					label: 'Hub',
					translations: { de: 'Hub' },
					collapsed: true,
					items: [
						{ label: 'Overview', translations: { de: 'Übersicht' }, slug: 'hub' },
						{ label: 'Quickstart', translations: { de: 'Schnellstart' }, slug: 'hub/quickstart' },
						{ label: 'Changelog', translations: { de: 'Changelog' }, slug: 'hub/changelog' },
						{
							label: 'How-To Guides',
							translations: { de: 'How-To\'s' },
							autogenerate: { directory: 'hub/how-to' },
						},
						{
							label: 'UI Reference',
							translations: { de: 'Benutzeroberfläche' },
							autogenerate: { directory: 'hub/ui' },
						},
						{
							label: 'Technical Reference',
							translations: { de: 'Technische Referenz' },
							autogenerate: { directory: 'hub/technical' },
						},
						{ label: 'Download PDF', translations: { de: 'PDF-Download' }, link: '/downloads/hub.pdf', attrs: { target: '_blank' } },
					],
				},
			],
		}),
	],
});
