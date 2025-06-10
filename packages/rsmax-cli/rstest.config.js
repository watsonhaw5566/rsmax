import { defineConfig } from 'vitest/config';

export default defineConfig({
  globals: true,
  setupFiles: ['./tests/setup.ts'],
  include: ['./**/*.test.ts'],
  exclude: ['lib/', 'node_modules/'],
});
