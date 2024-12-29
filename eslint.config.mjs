import globals from 'globals';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import stylistic from '@stylistic/eslint-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
  stylistic.configs.customize({
    semi: true,
  }),
  {
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      '@stylistic/indent': ['error', 2],
      '@stylistic/quotes': ['error', 'single'],
      'no-restricted-imports': ['error', {
        patterns: [
          {
            group: ['**/index'],
            message: 'The index file is extraneous. Use the directory path instead.',
          },
          {
            group: ['**/infrastructure/**', '**/infrastructure'],
            message: 'Do not directly import from infrastructure. User @server instead.',
          },
          {
            group: ['@/types/**'],
            message: 'Do not import files inside types. Use @/types instead.',
          },
          {
            group: ['**/providers/**', '@providers/**'],
            message: 'Do not directly import from providers. Use @providers instead.',
          },
        ],
      }],
    },
  },
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
  ),
];

export default eslintConfig;
