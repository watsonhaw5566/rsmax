const { describe, test, expect, beforeEach, afterEach } = require('@rstest/core');
const path = require('node:path');
const os = require('node:os');
const fs = require('fs-extra');
const { parseEnvFile, loadEnvConfig } = require('../index');

describe('rsmax-compiler - env vars', () => {
  describe('parseEnvFile', () => {
    test('should parse simple KEY=VALUE pairs', () => {
      const content = `
API_BASE=https://api.example.com
APP_NAME=MyApp
`;
      const result = parseEnvFile(content);
      expect(result.API_BASE).toBe('https://api.example.com');
      expect(result.APP_NAME).toBe('MyApp');
    });

    test('should ignore comments starting with #', () => {
      const content = `
# this is a comment
API_BASE=https://api.example.com
#APP_NAME=Ignored
`;
      const result = parseEnvFile(content);
      expect(result.API_BASE).toBe('https://api.example.com');
      expect(result.APP_NAME).toBeUndefined();
    });

    test('should support export prefix', () => {
      const content = `
export API_BASE=https://api.example.com
export APP_NAME=MyApp
`;
      const result = parseEnvFile(content);
      expect(result.API_BASE).toBe('https://api.example.com');
      expect(result.APP_NAME).toBe('MyApp');
    });

    test('should strip surrounding quotes (single and double)', () => {
      const content = `
SINGLE_QUOTED='hello world'
DOUBLE_QUOTED="hello world"
NO_QUOTES=hello
`;
      const result = parseEnvFile(content);
      expect(result.SINGLE_QUOTED).toBe('hello world');
      expect(result.DOUBLE_QUOTED).toBe('hello world');
      expect(result.NO_QUOTES).toBe('hello');
    });

    test('should strip inline comments (preceded by whitespace)', () => {
      const content = `
API_BASE=https://api.example.com # production endpoint
DEBUG=true # enable debug logs
URL_WITH_HASH=https://example.com/page#section
`;
      const result = parseEnvFile(content);
      expect(result.API_BASE).toBe('https://api.example.com');
      expect(result.DEBUG).toBe('true');
      // URL hash 无前置空格时不删除
      expect(result.URL_WITH_HASH).toBe('https://example.com/page#section');
    });

    test('should expand ${VAR} and $VAR references to same-file keys', () => {
      const content = `
HOST=localhost
PORT=8080
BASE_URL=http://\${HOST}:\${PORT}
FULL_URL=$BASE_URL/api
`;
      const result = parseEnvFile(content);
      expect(result.HOST).toBe('localhost');
      expect(result.PORT).toBe('8080');
      expect(result.BASE_URL).toBe('http://localhost:8080');
      expect(result.FULL_URL).toBe('http://localhost:8080/api');
    });

    test('should handle empty values and blank lines', () => {
      const content = `

EMPTY_VAL=

FOO=bar

`;
      const result = parseEnvFile(content);
      expect(result.EMPTY_VAL).toBe('');
      expect(result.FOO).toBe('bar');
    });

    test('should skip lines without =', () => {
      const content = `
JUST_A_LINE
FOO=bar
`;
      const result = parseEnvFile(content);
      expect(result.JUST_A_LINE).toBeUndefined();
      expect(result.FOO).toBe('bar');
    });
  });

  describe('loadEnvConfig', () => {
    let tempDir;

    beforeEach(async () => {
      tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'rsmax-env-test-'));
    });

    afterEach(async () => {
      await fs.remove(tempDir);
      // 清理测试时污染的 process.env
      Object.keys(process.env).forEach(k => {
        if (k.startsWith('RSMAX_TEST_')) delete process.env[k];
      });
      delete process.env.NODE_ENV;
      delete process.env.MODE;
    });

    test('should load from .env and .env.<mode> with correct priority', async () => {
      await fs.writeFile(path.join(tempDir, '.env'), `
APP_NAME=DefaultApp
API_BASE=https://default.example.com
SHARED_KEY=.env-value
`);
      await fs.writeFile(path.join(tempDir, '.env.production'), `
API_BASE=https://prod.example.com
`);

      const result = await loadEnvConfig(tempDir, 'production', {});
      expect(result.APP_NAME).toBe('DefaultApp'); // 来自 .env
      expect(result.API_BASE).toBe('https://prod.example.com'); // 来自 .env.production（覆盖）
      expect(result.NODE_ENV).toBe('production'); // mode 注入
      expect(result.MODE).toBe('production');
    });

    test('.env.local should override .env', async () => {
      await fs.writeFile(path.join(tempDir, '.env'), 'KEY=base');
      await fs.writeFile(path.join(tempDir, '.env.local'), 'KEY=local');

      const result = await loadEnvConfig(tempDir, 'development', {});
      expect(result.KEY).toBe('local');
    });

    test('.env.<mode>.local should have highest priority among env files', async () => {
      await fs.writeFile(path.join(tempDir, '.env'), 'KEY=1');
      await fs.writeFile(path.join(tempDir, '.env.local'), 'KEY=2');
      await fs.writeFile(path.join(tempDir, '.env.development'), 'KEY=3');
      await fs.writeFile(path.join(tempDir, '.env.development.local'), 'KEY=4');

      const result = await loadEnvConfig(tempDir, 'development', {});
      expect(result.KEY).toBe('4');
    });

    test('should pick RSMAX_* prefixed vars from process.env', async () => {
      process.env.RSMAX_TEST_FOO = 'hello';
      process.env.RSMAX_TEST_BAR = '123';
      process.env.RANDOM_VAR = 'should-not-appear';

      const result = await loadEnvConfig(tempDir, 'test', {});
      expect(result.RSMAX_TEST_FOO).toBe('hello');
      expect(result.RSMAX_TEST_BAR).toBe('123');
      expect(result.RANDOM_VAR).toBeUndefined();
    });

    test('process.env NODE_ENV/ENV/MODE whitelist should pass through', async () => {
      process.env.NODE_ENV = 'staging';
      process.env.MODE = 'staging';

      const result = await loadEnvConfig(tempDir, undefined, {});
      expect(result.NODE_ENV).toBe('staging');
      expect(result.MODE).toBe('staging');
    });

    test('config.define should override process.env and .env files', async () => {
      await fs.writeFile(path.join(tempDir, '.env'), 'API_BASE=from-env-file');
      process.env.RSMAX_TEST_API_BASE = 'from-process';

      const result = await loadEnvConfig(tempDir, 'development', {
        API_BASE: 'from-define',
        NEW_KEY: 'brand-new'
      });
      expect(result.API_BASE).toBe('from-define');
      expect(result.NEW_KEY).toBe('brand-new');
    });

    test('should default NODE_ENV/MODE to development when nothing is provided', async () => {
      const result = await loadEnvConfig(tempDir, undefined, {});
      expect(result.NODE_ENV).toBe('development');
      expect(result.MODE).toBe('development');
    });

    test('should not throw if env files do not exist', async () => {
      const result = await loadEnvConfig(tempDir, 'production', {});
      expect(typeof result).toBe('object');
      expect(result.NODE_ENV).toBe('production');
    });
  });
});
