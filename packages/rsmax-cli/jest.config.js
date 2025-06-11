/** @type {import('jest').Config} */
const config = {
  testRegex: '.*\\.test\\.ts$',
  testPathIgnorePatterns: ['/lib/'],
  coveragePathIgnorePatterns: ['/src/__tests__/'],
  transform: {
    '\\.[jt]sx?$': '@swc/jest',
  },
  setupFilesAfterEnv: ['./tests/setup.ts'],
};
module.exports = config;
