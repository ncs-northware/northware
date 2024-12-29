/*
 * Use this Config with Internal Packages (Libraries) that do not utilize React
 * For Packages that use React use Configuration form react-internal.js instead.
 */

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['eslint:recommended', 'prettier', 'turbo'],
  plugins: ['only-warn'],
  globals: {
    React: true,
    JSX: true,
  },
  parser: 'babelParser',
  env: {
    node: true,
  },
  ignorePatterns: [
    // Ignore dotfiles
    '.*.js',
    'node_modules/',
    'dist/',
  ],
  overrides: [
    {
      files: ['*.js?(x)'],
    },
  ],
};
