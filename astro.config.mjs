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
						{ label: 'Quickstart', translations: { de: 'Schnellstart' }, slug: 'deepview/quickstart' },
						{
							label: 'UI Reference',
							translations: { de: 'Benutzeroberfläche' },
							items: [
								{ label: 'Overview', translations: { de: 'Übersicht' }, slug: 'deepview/overview-dashboards' },
								{
									label: 'Analysis',
									translations: { de: 'Analyse' },
									collapsed: true,
									items: [
										{ label: 'Overview', translations: { de: 'Übersicht' }, slug: 'deepview/analysis' },
										{ label: 'Add Data Sets', translations: { de: 'Datensätze hinzufügen' }, slug: 'deepview/analysis/add-data-sets' },
										{ label: 'Signal List', translations: { de: 'Signalliste' }, slug: 'deepview/analysis/signal-list' },
										{
											label: 'Functions',
											translations: { de: 'Funktionen' },
											collapsed: true,
											items: [
												{ label: 'Overview', translations: { de: 'Übersicht' }, slug: 'deepview/analysis/functions' },
												{ label: 'Functions Overview', translations: { de: 'Funktionsübersicht' }, slug: 'deepview/analysis/functions/functions-overview' },
												{ label: 'Built-in functions', translations: { de: 'Integrierte Funktionen' }, slug: 'deepview/analysis/functions/built-in-functions' },
												{ label: 'Custom functions', translations: { de: 'Benutzerdefinierte Funktionen' }, slug: 'deepview/analysis/functions/custom-functions' },
											],
										},
										{
											label: 'Dataset Modes',
											translations: { de: 'Datensatz-Modi' },
											collapsed: true,
											items: [
												{ label: 'Overview', translations: { de: 'Übersicht' }, slug: 'deepview/analysis/dataset-modes' },
												{ label: 'Overlay', translations: { de: 'Overlay' }, slug: 'deepview/analysis/dataset-modes/overlay' },
												{ label: 'Merge', translations: { de: 'Zusammenführen' }, slug: 'deepview/analysis/dataset-modes/merge' },
												{ label: 'Chain', translations: { de: 'Verkettung' }, slug: 'deepview/analysis/dataset-modes/chain' },
											],
										},
										{
											label: 'Plot Types',
											translations: { de: 'Diagrammtypen' },
											collapsed: true,
											items: [
												{ label: 'Overview', translations: { de: 'Übersicht' }, slug: 'deepview/analysis/plot-types' },
												{
													label: 'Time Series',
													translations: { de: 'Zeitreihe' },
													collapsed: true,
													items: [
														{ label: 'Overview', translations: { de: 'Übersicht' }, slug: 'deepview/analysis/plot-types/time-series' },
														{ label: 'Axes', translations: { de: 'Achsen' }, slug: 'deepview/analysis/plot-types/time-series/axes' },
														{ label: 'Cursors', translations: { de: 'Cursor' }, slug: 'deepview/analysis/plot-types/time-series/cursors' },
														{ label: 'Legend', translations: { de: 'Legende' }, slug: 'deepview/analysis/plot-types/time-series/legend' },
														{ label: 'Limits and Stacking', translations: { de: 'Grenzwerte und Stapelung' }, slug: 'deepview/analysis/plot-types/time-series/limits-and-stacking' },
														{ label: 'Signal Settings', translations: { de: 'Signaleinstellungen' }, slug: 'deepview/analysis/plot-types/time-series/signal-settings' },
														{ label: 'State background', translations: { de: 'Status-Hintergrund' }, slug: 'deepview/analysis/plot-types/time-series/state-background' },
														{ label: 'Text data', translations: { de: 'Textdaten' }, slug: 'deepview/analysis/plot-types/time-series/text-data' },
														{ label: 'Zooming', translations: { de: 'Zoomen' }, slug: 'deepview/analysis/plot-types/time-series/zooming' },
													],
												},
												{ label: 'Scatter', translations: { de: 'Streudiagramm' }, slug: 'deepview/analysis/plot-types/scatter' },
												{ label: 'Map', translations: { de: 'Karte' }, slug: 'deepview/analysis/plot-types/map' },
												{ label: 'Frequency (FFT)', translations: { de: 'Frequenz (FFT)' }, slug: 'deepview/analysis/plot-types/frequency-fft' },
												{ label: 'Heatmap', translations: { de: 'Heatmap' }, slug: 'deepview/analysis/plot-types/heatmap' },
												{ label: 'Metadata', translations: { de: 'Metadaten' }, slug: 'deepview/analysis/plot-types/metadata' },
												{ label: 'State', translations: { de: 'Status' }, slug: 'deepview/analysis/plot-types/state' },
												{ label: 'Message', translations: { de: 'Nachricht' }, slug: 'deepview/analysis/plot-types/message' },
												{ label: 'Aggregates', translations: { de: 'Aggregate' }, slug: 'deepview/analysis/plot-types/aggregates' },
											],
										},
										{ label: 'Mouse Actions', translations: { de: 'Mausaktionen' }, slug: 'deepview/analysis/mouse-actions' },
										{ label: 'Tabs', translations: { de: 'Tabs' }, slug: 'deepview/analysis/tabs' },
										{ label: 'Reorganise Plots', translations: { de: 'Diagramme neu anordnen' }, slug: 'deepview/analysis/reorganise-plots' },
										{ label: 'Realtime', translations: { de: 'Echtzeit' }, slug: 'deepview/analysis/realtime' },
										{ label: 'Export image', translations: { de: 'Bild exportieren' }, slug: 'deepview/analysis/export-image' },
										{ label: 'Resampling', translations: { de: 'Resampling' }, slug: 'deepview/analysis/resampling' },
										{ label: 'Annotations', translations: { de: 'Anmerkungen' }, slug: 'deepview/analysis/annotations' },
									],
								},
								{ label: 'Database', translations: { de: 'Datenbank' }, slug: 'deepview/database' },
								{ label: 'Reports', translations: { de: 'Berichte' }, slug: 'deepview/reports' },
								{ label: 'Projects', translations: { de: 'Projekte' }, slug: 'deepview/projects' },
								{ label: 'Workspace Customization', translations: { de: 'Arbeitsbereich anpassen' }, slug: 'deepview/workspace-customization' },
								{ label: 'User Preferences', translations: { de: 'Benutzereinstellungen' }, slug: 'deepview/user-preferences' },
								{ label: 'Keyboard Shortcuts', translations: { de: 'Tastenkürzel' }, slug: 'deepview/keyboard-shortcuts' },
							],
						},
						{
							label: 'Technical Reference',
							translations: { de: 'Technische Referenz' },
							autogenerate: { directory: 'deepview/technical-reference' },
						},
					],
				},
			],
		}),
	],
});
