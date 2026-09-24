const { describe, test, expect, beforeEach, afterEach } = require('@rstest/core');
const path = require('node:path');
const os = require('node:os');
const fs = require('fs-extra');
const { parseEnvFile, loadEnvConfig } = require('../env');

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

    test('should ignore comments starting with # and blank lines', () => {
      const content = `
# this is a comment

API_BASE=https://api.example.com
#APP_NAME=Ignored
`;
      const result = parseEnvFile(content);
      expect(result.API_BASE).toBe('https://api.example.com');
      expect(result.APP_NAME).toBeUndefined();
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

    test('should keep mismatched quotes as literal value', () => {
      const content = `
MIXED="hello'
ONLY_LEADING="hello
`;
      const result = parseEnvFile(content);
      expect(result.MIXED).toBe('"hello\'');
      expect(result.ONLY_LEADING).toBe('"hello');
    });

    test('should trim whitespace around key and value', () => {
      const content = `
  API_BASE =   https://api.example.com
`;
      const result = parseEnvFile(content);
      expect(result.API_BASE).toBe('https://api.example.com');
    });

    test('should support CRLF line endings', () => {
      const content = 'A=1\r\nB=2\r\n';
      const result = parseEnvFile(content);
      expect(result.A).toBe('1');
      expect(result.B).toBe('2');
    });

    test('should keep hash in values verbatim (no inline comment support)', () => {
      const content = `
URL_WITH_HASH=https://example.com/page#section
WITH_SPACE=https://example.com/a # production endpoint
`;
      const result = parseEnvFile(content);
      expect(result.URL_WITH_HASH).toBe('https://example.com/page#section');
      // 轻量化后不支持行内注释，# 及后续内容按字面值保留
      expect(result.WITH_SPACE).toBe('https://example.com/a # production endpoint');
    });

    test('should not treat backticks as quotes', () => {
      const content = 'API_BASE=`https://api.example.com`';
      const result = parseEnvFile(content);
      expect(result.API_BASE).toBe('`https://api.example.com`');
    });

    test('should not support export prefix or $VAR expansion', () => {
      const content = `
export DEBUG=true
HOST=localhost
PORT=8080
BASE_URL=http://\${HOST}:\${PORT}
`;
      const result = parseEnvFile(content);
      expect(result.DEBUG).toBeUndefined();
      expect(result['export DEBUG']).toBe('true');
      expect(result.BASE_URL).toBe('http://${HOST}:${PORT}');
    });

    test('should handle empty values', () => {
      const content = `
EMPTY_VAL=
FOO=bar
`;
      const result = parseEnvFile(content);
      expect(result.EMPTY_VAL).toBe('');
      expect(result.FOO).toBe('bar');
    });

    test('should skip lines without = and lines with empty key', () => {
      const content = `
JUST_A_LINE
=value-without-key
FOO=bar
`;
      const result = parseEnvFile(content);
      expect(result.JUST_A_LINE).toBeUndefined();
      expect(result.FOO).toBe('bar');
      expect(Object.keys(result)).toHaveLength(1);
    });

    test('should return empty object for empty input', () => {
      expect(parseEnvFile('')).toEqual({});
      expect(parseEnvFile('   \n  \n')).toEqual({});
    });
  });

  describe('loadEnvConfig', () => {
    let tempDir;

    beforeEach(async () => {
      tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'rsmax-env-test-'));
    });

    afterEach(async () => {
      await fs.remove(tempDir);
      delete process.env.RSMAX_TEST_SHOULD_NOT_LEAK;
    });

    test('should load from .env and .env.<mode> with correct priority', async () => {
      await fs.writeFile(path.join(tempDir, '.env'), `
APP_NAME=DefaultApp
API_BASE=https://default.example.com
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

    test('should not load .env.<mode> files of other modes', async () => {
      await fs.writeFile(path.join(tempDir, '.env'), 'API_BASE=https://default.example.com');
      await fs.writeFile(path.join(tempDir, '.env.production'), 'API_BASE=https://prod.example.com');

      const result = await loadEnvConfig(tempDir, 'development', {});
      expect(result.API_BASE).toBe('https://default.example.com');
      expect(result.NODE_ENV).toBe('development');
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

    test('should default mode to development when omitted', async () => {
      await fs.writeFile(path.join(tempDir, '.env.development'), 'KEY=dev');

      const result = await loadEnvConfig(tempDir);
      expect(result.NODE_ENV).toBe('development');
      expect(result.MODE).toBe('development');
      expect(result.KEY).toBe('dev');
    });

    test('should not throw and only inject NODE_ENV/MODE if env files do not exist', async () => {
      const result = await loadEnvConfig(tempDir, 'production', {});
      expect(result).toEqual({ NODE_ENV: 'production', MODE: 'production' });
    });

    test('config.define should override .env files and inject new keys', async () => {
      await fs.writeFile(path.join(tempDir, '.env'), 'API_BASE=from-env-file');

      const result = await loadEnvConfig(tempDir, 'development', {
        API_BASE: 'from-define',
        NEW_KEY: 'brand-new'
      });
      expect(result.API_BASE).toBe('from-define');
      expect(result.NEW_KEY).toBe('brand-new');
    });

    test('config.define should be able to override injected NODE_ENV/MODE', async () => {
      const result = await loadEnvConfig(tempDir, 'development', { NODE_ENV: 'custom' });
      expect(result.NODE_ENV).toBe('custom');
      expect(result.MODE).toBe('development');
    });

    test('should not pass through arbitrary process.env vars (even with RSMAX_ prefix)', async () => {
      process.env.RSMAX_TEST_SHOULD_NOT_LEAK = 'hello';
      process.env.RANDOM_ENV_VAR = 'should-not-appear';

      const result = await loadEnvConfig(tempDir, 'test', {});
      expect(result.RSMAX_TEST_SHOULD_NOT_LEAK).toBeUndefined();
      expect(result.RANDOM_ENV_VAR).toBeUndefined();
      delete process.env.RANDOM_ENV_VAR;
    });

    test('should parse quoted values across loaded files', async () => {
      await fs.writeFile(path.join(tempDir, '.env'), `
MOTTO="Hello World"
API_BASE='https://api.example.com'
`);

      const result = await loadEnvConfig(tempDir, 'development');
      expect(result.MOTTO).toBe('Hello World');
      expect(result.API_BASE).toBe('https://api.example.com');
    });
  });
});
