import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    exclude: ['cjs/**/*', 'esm/**/*', 'node_modules/**/*'],
  },
});
