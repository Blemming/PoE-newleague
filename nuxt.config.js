export default {
	ssr: false,
	/*
	 ** Headers of the page
	 */
	head: {
		title: 'Path of Exile leveling',
		meta: [
			{ charset: 'utf-8' },
			{ 'http-equiv': 'x-ua-compatible', content: 'ie=edge' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
			{ hid: 'robots', name: 'robots', content: 'index,follow' },
			{ hid: 'googlebot', name: 'googlebot', content: 'index,follow' },
			{
				hid: 'description',
				name: 'description',
				content: process.env.npm_package_description || ''
			}
		],
		link: [
			{ rel: 'dns-prefetch', href: 'https://webcdn.pathofexile.com' },
			{ rel: 'preconnect', href: 'https://webcdn.pathofexile.com' },
			{ rel: 'stylesheet', type: 'text/css', href: 'https://rsms.me/inter/inter.css' },
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
		]
	},
	/*
	 ** Customize the progress-bar color
	 */
	loading: { color: '#fff' },
	/*
	 ** Global CSS
	 */
	css: [
		'@/assets/css/tailwind.css'
	],
	/*
	 ** Plugins to load before mounting the App
	 */
	plugins: [
		'~plugins/NuxtClientInit.client.js'
	],
	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,
	/*
	 ** Nuxt.js dev-modules
	 */
	buildModules: [
		// Doc: https://github.com/nuxt-community/eslint-module
		'@nuxtjs/eslint-module',
		'@nuxt/postcss8'
	],
	eslint: {
		cache: false
	},
	/*
	 ** Nuxt.js modules
	 */
	modules: ['@nuxtjs/markdownit'],
	// [optional] markdownit options
	// See https://github.com/markdown-it/markdown-it
	markdownit: {
		preset: 'default',
		html: true,
		linkify: true,
		breaks: true,
		injected: true,
		use: ['markdown-it-attrs']
	},
	/*
	 ** Build configuration
	 */
	build: {
		/*
		 ** You can extend webpack config here
		 */
		extend (config, ctx) {},
		postcss: { plugins: { tailwindcss: {}, autoprefixer: {} } }
	}
};
