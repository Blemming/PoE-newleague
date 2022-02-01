module.exports = {
	root: true,
	env: {
		browser: true,
		node: true
	},
	parserOptions: {
		parser: '@babel/eslint-parser',
		requireConfigFile: false
	},
	extends: ['@nuxtjs', 'plugin:nuxt/recommended'],
	// add your custom rules here
	rules: {
		'vue/multi-word-component-names': 0,
		'vue/html-indent': [
			'error',
			'tab',
			{
				attribute: 1,
				closeBracket: 0,
				ignores: []
			}
		],
		'vue/no-unused-components': [
			'error',
			{
				ignoreWhenBindingPresent: true
			}
		],
		'vue/no-v-html': 0,
		'no-tabs': 0,
		indent: [
			'error',
			'tab',
			{
				SwitchCase: 1,
				ArrayExpression: 1,
				ObjectExpression: 1
			}
		],
		'object-property-newline': [2, { allowAllPropertiesOnSameLine: true }],
		semi: [2, 'always'],
		'no-extra-semi': 'error',
		'computed-property-spacing': [2, 'never'],
		'no-multiple-empty-lines': [
			2,
			{
				max: 1,
				maxEOF: 0,
				maxBOF: 0
			}
		],
		'no-console': 'warn',
		'no-use-before-define': [
			2,
			{
				functions: false
			}
		],
		'prefer-const': 1
	}
};
