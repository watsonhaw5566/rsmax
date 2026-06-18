import { defineConfig, ts } from '@rslint/core';

export default defineConfig([
  {
    ignores: [
      '**/tests/**',
      '**/__tests__/**',
      '**/lib/**',
      '**/cjs/**',
      '**/dist/**',
      '**/node_modules/**',
      '**/*.d.ts',
      '**/e2e/**',
      '**/typings/**',
      'e2e/**',
    ],
  },
  ts.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      'no-useless-escape': 'off',
    },
  },
]);
