import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    timeout: 5000,
  },
});
