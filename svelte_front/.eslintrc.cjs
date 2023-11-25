// module.exports = {
// 	// ...
// 	extends: ['plugin:svelte/recommended', 'prettier'],
// 	// ...
// 	parser: '@typescript-eslint/parser',
// 	parserOptions: {
// 		// ...
// 		project: './tsconfig.json',
// 		extraFileExtensions: ['.svelte'] // This is a required setting in `@typescript-eslint/parser` v4.24.0.
// 	},
// 	overrides: [
// 		{
// 			files: ['*.svelte', '*.js', '*.ts'],
// 			parser: 'svelte-eslint-parser',
// 			// Parse the `<script>` in `.svelte` as TypeScript by adding the following configuration.
// 			parserOptions: {
// 				parser: {
// 					// Specify a parser for each lang.
// 					ts: '@typescript-eslint/parser',
// 					js: 'espree',
// 					typescript: '@typescript-eslint/parser',
// 					sourceType: 'module',
// 					ecmaVersion: 2020
// 				}
// 			}
// 		}
// 	],
// 	env: {
// 		browser: true,
// 		es2017: true,
// 		node: true
// 	}
// };

module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'svelte'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte'],
		project: './tsconfig.json'
	},
	env: {
		browser: true,
		es2020: true,
		node: true
	},
	extends: ['plugin:svelte/recommended', 'prettier'],
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser', // Use the Svelte parser for Svelte files
			parserOptions: {
				parser: '@typescript-eslint/parser' // Use the TypeScript parser for script tags in Svelte files
			}
		}
	]
};
