import path from 'node:path';

import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import { configs, plugins } from 'eslint-config-airbnb-extended';
import { rules as prettierConfigRules } from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

const gitignorePath = path.resolve('.', '.gitignore');

const jsConfig = defineConfig([
  // ESLint recommended config
  {
    name: 'js/config',
    ...js.configs.recommended,
  },
  // Stylistic plugin
  plugins.stylistic,
  // Import X plugin
  plugins.importX,
  // Airbnb base recommended config
  ...configs.base.recommended,
]);

const nextConfig = defineConfig([
  // React plugin
  plugins.react,
  // React hooks plugin
  plugins.reactHooks,
  // React JSX A11y plugin
  plugins.reactA11y,
  // Next.js plugin
  plugins.next,
  // Airbnb Next.js recommended config
  ...configs.next.recommended,
]);

const typescriptConfig = defineConfig([
  // TypeScript ESLint plugin
  plugins.typescriptEslint,
  // Airbnb base TypeScript config
  ...configs.base.typescript,
  // Airbnb Next.js TypeScript config
  ...configs.next.typescript,
]);

const prettierConfig = defineConfig([
  // Prettier plugin
  {
    name: 'prettier/plugin/config',
    plugins: {
      prettier: prettierPlugin,
    },
  },
  // Prettier config
  {
    name: 'prettier/config',
    rules: {
      ...prettierConfigRules,
      'prettier/prettier': 'error',
    },
  },
]);

const projectOverrides = defineConfig([
  {
    name: 'project/overrides',
    rules: {
      // React 19 dropped defaultProps support for function components; parameter defaults replace it.
      'react/require-default-props': ['error', { ignoreFunctionalComponents: true }],
      // CSS imports are resolved by the Next.js bundler, not Node module resolution.
      'import-x/no-unresolved': ['error', { ignore: ['\\.css$'] }],
    },
  },
  {
    // Service worker scripts run in the Worker global scope, where `self` is
    // the legitimate top-level object (not the window/self ambiguity the rule guards against).
    name: 'project/service-worker',
    files: ['public/sw.js'],
    rules: {
      'no-restricted-globals': 'off',
    },
  },
]);

export default defineConfig([
  // Ignore files and folders listed in .gitignore
  includeIgnoreFile(gitignorePath),
  // JavaScript config
  ...jsConfig,
  // Next.js config
  ...nextConfig,
  // TypeScript config
  ...typescriptConfig,
  // Prettier config
  ...prettierConfig,
  // Project-specific overrides
  ...projectOverrides,
]);
