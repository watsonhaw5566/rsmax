import { defineConfig } from '@rstest/core';

export default defineConfig({
  globals: true,
  exclude: ['lib/', 'node_modules/'],
  setupFiles: ['./tests/setup.ts'],
});
