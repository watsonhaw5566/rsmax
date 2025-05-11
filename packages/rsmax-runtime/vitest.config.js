import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    // todo 这里的 cjs 包存在问题
    exclude: ['cjs/**/*', 'esm/**/*', 'node_modules/**/*'],
  },
});
