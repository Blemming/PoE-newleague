/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
module.exports = {
	content: ['./components/**/*.{js,vue,ts}', './layouts/**/*.vue', './pages/**/*.vue', './plugins/**/*.{js,ts}', './nuxt.config.{js,ts}'],
	theme: {
		fontFamily: {
			serif: [
				'Fontin',
				'Georgia',
				'Cambria',
				'"Times New Roman"',
				'Times',
				'serif'
			],
			body: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
		},
		extend: {
			boxShadow: {
				black: '1px 1px 1px #000'
			},
			colors: {
				black: {
					50: 'rgba(0,0,0,0.5)',
					85: 'rgba(0,0,0,0.85)',
					100: 'rgba(0,0,0,1)'
				},
				'gem-poe': 'rgb(27,162,155)',
				'yellow-poe-light': '#cec59f',
				'yellow-poe-dark': '#B49E79',
				gray: {
					100: '#f8f9fa',
					200: '#e9ecef',
					300: '#dee2e6',
					400: '#ced4da',
					500: '#adb5bd',
					600: '#6c757d',
					700: '#495057',
					800: '#343a40;',
					900: '#212529',
					'poe-dark': '#050505'
				}
			},
			maxHeight: {
				20: '20rem',
				24: '24rem',
				56: '56rem',
				64: '64rem'
			},
			spacing: {
				80: '20rem',
				96: '24rem'
			}
		}
	},
	variants: {
		borderColor: ['responsive', 'hover', 'focus', 'focus-within'],
		opacity: ['responsive', 'hover', 'focus', 'group-hover']
	},
	plugins: []
};
