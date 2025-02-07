module.exports = {
  root: true,
  extends: ['@tencent/eslint-config-tencent', '@tencent/eslint-config-tencent/ts'],
  ignorePatterns: ['node_modules', 'dist', 'build', ".eslintrc.js", "assets", "public"],
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
  },
}