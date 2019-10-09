module.exports = {
	env: {
		browser: true,
		es6: true,
		node: true
	},
	extends: [
		"eslint:recommended",
		"plugin:prettier/recommended",
		"plugin:react/recommended",
		"prettier",
		"prettier/react",
		"prettier/standard"
	],
	globals: {
		Atomics: "readonly",
		SharedArrayBuffer: "readonly"
	},
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 2018
	},
	plugins: ["react"],
	rules: {
		"prettier/prettier": "error"
	}
};
