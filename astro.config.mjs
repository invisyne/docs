// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	// Set site and base for GitHub Pages.
	// For a project page (github.com/ORG/REPO): site='https://ORG.github.io', base='/REPO'
	// For an org page (github.com/ORG/ORG.github.io): site='https://ORG.github.io', no base needed
	// Overridable so the preview-deploy workflow can build against docs-preview.invisyne.com.
	site: process.env.SITE_URL ?? 'https://docs.invisyne.com',
	redirects: {},
	markdown: {
		// Astro leaves this unset by default; @astrojs/mdx reads it directly to decide
		// whether to enable GFM tables, so without this .mdx tables silently fall back
		// to plain text while .md tables keep working via a different internal default.
		gfm: true,
	},
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
				Head: './src/components/Head.astro',
				Header: './src/components/Header.astro',
				SiteTitle: './src/components/SiteTitle.astro',
				LanguageSelect: './src/components/LanguageSelect.astro',
				ThemeSelect: './src/components/ThemeSelect.astro',
				Sidebar: './src/components/Sidebar.astro',
				PageTitle: './src/components/PageTitle.astro',
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
							label: 'UI Reference',
							translations: { de: 'Benutzeroberfläche' },
							autogenerate: { directory: 'edge/ui' },
						},
						{
							label: 'How-To Guides',
							translations: { de: 'How-To\'s' },
							autogenerate: { directory: 'edge/how-to' },
						},
						{
							label: 'Field Devices',
							translations: { de: 'Feldgeräte' },
							autogenerate: { directory: 'edge/field-devices' },
						},
						{
							label: 'Technical Reference',
							translations: { de: 'Technische Referenz' },
							autogenerate: { directory: 'edge/technical-reference' },
						},
						{ label: 'Download PDF', translations: { de: 'PDF herunterladen' }, slug: 'edge/download', attrs: { class: 'sidebar-pdf-link' } },
					],
				},
				{
					label: 'Companion',
					translations: { de: 'Companion' },
					collapsed: true,
					items: [
						{ label: 'Overview', translations: { de: 'Übersicht' }, slug: 'companion' },
						{ label: 'Installation', translations: { de: 'Installation' }, slug: 'companion/installation' },
						{ label: 'Quickstart', translations: { de: 'Schnellstart' }, slug: 'companion/quickstart' },
						{ label: 'Changelog', translations: { de: 'Changelog' }, slug: 'companion/changelog' },
						{
							label: 'UI Reference',
							translations: { de: 'Benutzeroberfläche' },
							autogenerate: { directory: 'companion/ui' },
						},
						{
							label: 'How-To Guides',
							translations: { de: 'How-To\'s' },
							autogenerate: { directory: 'companion/how-to' },
						},
						{
							label: 'Technical Reference',
							translations: { de: 'Technische Referenz' },
							autogenerate: { directory: 'companion/technical-reference' },
						},
						{ label: 'Download PDF', translations: { de: 'PDF herunterladen' }, slug: 'companion/download', attrs: { class: 'sidebar-pdf-link' } },
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
							label: 'UI Reference',
							translations: { de: 'Benutzeroberfläche' },
							autogenerate: { directory: 'hub/ui' },
						},
						{
							label: "How-To's",
							translations: { de: "How-To's" },
							collapsed: false,
							items: [
								// Geräte
								{ label: 'Edit an Edge Device', translations: { de: 'Edge-Gerät bearbeiten' }, slug: 'hub/how-to/edit-device' },
								// Software
{ label: 'Download Software', translations: { de: 'Software herunterladen' }, slug: 'hub/how-to/download-firmware' },
								// Benutzer
								{ label: 'Manage Users', translations: { de: 'Benutzer verwalten' }, slug: 'hub/how-to/invite-user' },
								// Kontoeinstellungen
								{ label: 'Change My Password', translations: { de: 'Mein Passwort ändern' }, slug: 'hub/how-to/change-password' },
{ label: 'Filter, Search and Sort', translations: { de: 'Filtern, Suchen und Sortieren' }, slug: 'hub/how-to/search-filter' },
							],
						},
						{
							label: 'Technical Reference',
							translations: { de: 'Technische Referenz' },
							autogenerate: { directory: 'hub/technical-reference' },
						},
						{ label: 'Download PDF', translations: { de: 'PDF herunterladen' }, slug: 'hub/download', attrs: { class: 'sidebar-pdf-link' } },
					],
				},
				{
					label: 'Deepview',
					translations: { de: 'Deepview' },
					collapsed: true,
					items: [
						{ label: 'Overview', translations: { de: 'Übersicht' }, slug: 'deepview' },
					],
				},
			],
		}),
	],
});
