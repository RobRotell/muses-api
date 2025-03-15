import globals from 'globals'
import pluginJs from '@eslint/js'
// import importPlugin from 'eslint-plugin-import'


/** @type {import('eslint').Linter.Config[]} */
export default [
	pluginJs.configs.recommended,
	// importPlugin.flatConfigs.recommended,
	{
		files: [
			'**/*.{js,mjs,cjs,jsx}' 
		],
		rules: {
			'arrow-parens': [
				'error',
				'as-needed'
			],
			'array-element-newline': [
				'error',
				'always'
			],
			'array-bracket-newline': [
				'error',
				{
					'minItems': 1
				}
			],
			'array-bracket-spacing': [
				'error',
				'always', // This ensures a space after the opening bracket and before the closing bracket
			],
			'object-property-newline': [
				'error',
				{
					'allowAllPropertiesOnSameLine': false
				}
			],
			'object-curly-spacing': [
				'error',
				'always',
			],
			'object-curly-newline': [
				'error',
				{
					ObjectExpression: {
						multiline: true,
						minProperties: 1
					},
					ObjectPattern: {
						multiline: true,
						minProperties: 1
					},
				},
			],
			'max-len': [
				'error',
				{
					code: 120,
				},
			],
			'no-multiple-empty-lines': [
				'error',
				{
					max: 2,
				},
			],
			'no-plusplus': [
				'error',
				{
					allowForLoopAfterthoughts: true,
				},
			],
			'no-tabs': [
				'error',
				{
					allowIndentationTabs: true,
				},
			],
			'padded-blocks': [
				'error',
				{
					classes: 'always',
				},
			],
			'space-in-parens': [
				'error',
				'always',
				{
					exceptions: [
						'{}' 
					],
				},
			],
			indent: [
				'error',
				'tab'
			],
			semi: [
				'error',
				'never'
			],
			yoda: [
				'error',
				'always'
			],
			quotes: [
				'error',
				'single'
			],
			// 'import/named': 'warn',
			// 'import/prefer-default-export': 0,
			// 'import/extensions': [
			// 	'error',
			// 	'always',
			// 	{
			// 		js: 'always',
			// 		jsx: 'always',
			// 	},
			// ],
		},
	},
	{
		languageOptions: {
			globals: globals.browser,
			ecmaVersion: 'latest',
			sourceType: 'module', // Ensure the code is treated as a module (needed for ESM imports)
		},
	},
	{
		settings: {
			// 'import/extensions': [
			// 	'.js',
			// 	'.jsx'
			// ],
			// 'import/resolver': {
			// 	node: {
			// 		extensions: [
			// 			'.js',
			// 			'.jsx'
			// 		],
			// 	},
			// },
		},
	},
]
