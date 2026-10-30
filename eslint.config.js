import js from '@eslint/js';
import globals from 'globals';
import astro from 'eslint-plugin-astro';

export default [
  { ignores: ['dist/', '.astro/', 'node_modules/', 'test-results/', 'playwright-report/'] },
  js.configs.recommended,
  ...astro.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser },
    },
  },
  // Tooling config runs in Node, not the browser.
  { files: ['*.config.{js,mjs}'], languageOptions: { globals: { ...globals.node } } },
];
