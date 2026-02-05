const js = require("@eslint/js");
const globals = require("globals");
const tseslint = require("typescript-eslint");

module.exports = [
	js.configs.recommended,
	...tseslint.configs.recommended,
	{
		languageOptions: {
			ecmaVersion: "latest",
			sourceType: "module",
			globals: {
				...globals.node
			},
			parser: tseslint.parser,
			parserOptions: {
				project: "./tsconfig.json"
			}
		},
		files: ["src/**/*.ts"],
		rules: {
			"no-unused-vars": "off",
			"@typescript-eslint/no-unused-vars": "warn",
			"no-console": "off",
			"semi": ["error", "always"],
			"indent": ["error", "tab", { "SwitchCase": 1 }],
			"quotes": ["error", "double", { "avoidEscape": false }],
			"curly": ["error", "all"],
			"object-curly-spacing": ["error", "always"],
			"@typescript-eslint/no-require-imports": "off"
		}
	},
	{
		ignores: ["dist/**", "node_modules/**", "*.js"]
	}
];
