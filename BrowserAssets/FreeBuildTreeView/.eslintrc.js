module.exports = {
	extends: '@tencent/eslint-config-futureedu',
	plugins: ['jest'],
	parser: 'babel-eslint',
	rules: {
		'react/sort-comp': 0
	},
	env: {
		browser: true,
		'jest/globals': true
	},
	globals: {
		Blockly: 'readonly'
	}
};
