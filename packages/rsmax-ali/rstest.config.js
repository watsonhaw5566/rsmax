import { defineConfig } from '@rstest/core';

export default defineConfig({
  globals: true,
  exclude: ['cjs/', 'esm/', 'node_modules/'],
});
