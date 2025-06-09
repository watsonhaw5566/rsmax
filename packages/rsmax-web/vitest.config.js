import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'happy-dom',
    snapshotFormat: {
      printBasicPrototype: false,
      escapeString: false,
    },
    setupFiles: ['./vitest.setup.js'],
  },
});
