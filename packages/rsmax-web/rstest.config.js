import { defineConfig } from '@rstest/core';

export default defineConfig({
  globals: true,
  testEnvironment: 'happy-dom',
  exclude: ['cjs/', 'esm/', 'node_modules/'],
});
