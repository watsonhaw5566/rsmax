import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    exclude: ['cjs/', 'esm/', 'node_modules/'],
  },
});
