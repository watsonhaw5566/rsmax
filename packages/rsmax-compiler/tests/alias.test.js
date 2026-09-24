const { describe, test, expect, beforeEach, afterEach } = require('@rstest/core');
const parser = require('@babel/parser');
const path = require('node:path');
const os = require('node:os');
const fs = require('fs-extra');
const {
  normalizeAliases,
  rewriteAliasRequest,
  rewriteAstAliases
} = require('../alias');
const { compile } = require('../index');

function parseCode(code) {
  return parser.parse(code, {
    sourceType: 'module',
    plugins: ['jsx', 'classProperties']
  });
}

describe('rsmax-compiler - alias', () => {
  describe('normalizeAliases', () => {
    test('默认内置 @ 指向 srcDir', () => {
      const aliases = normalizeAliases(undefined, '/proj/src', '/proj');
      expect(aliases['@']).toBe('/proj/src');
    });

    test('用户配置可覆盖默认 @', () => {
      const aliases = normalizeAliases({ '@': '/proj/app' }, '/proj/src', '/proj');
      expect(aliases['@']).toBe('/proj/app');
    });

    test('相对目标路径基于 projectRoot 解析', () => {
      const aliases = normalizeAliases({ '@c': 'src/components' }, '/proj/src', '/proj');
      expect(aliases['@c']).toBe(path.resolve('/proj/src/components'));
    });

    test('绝对路径会被规范化', () => {
      const aliases = normalizeAliases({ '@c': '/proj/src/components' }, '/proj/src', '/proj');
      expect(aliases['@c']).toBe('/proj/src/components');
    });

    test('忽略空值与非字符串目标', () => {
      const aliases = normalizeAliases({ '@': '', bad: 123, ok: '/proj/ok' }, '/proj/src', '/proj');
      expect(aliases['@']).toBeUndefined();
      expect(aliases.bad).toBeUndefined();
      expect(aliases.ok).toBe('/proj/ok');
    });
  });

  describe('rewriteAliasRequest', () => {
    const aliases = normalizeAliases({ '@u': 'src/utils' }, '/proj/src', '/proj');

    test('@/ 前缀改写为相对路径', () => {
      expect(rewriteAliasRequest('@/utils/a', '/proj/src/pages/home', aliases))
        .toBe('../../utils/a');
    });

    test('同目录引用补 ./ 前缀', () => {
      expect(rewriteAliasRequest('@/home', '/proj/src', aliases)).toBe('./home');
    });

    test('自定义别名前缀与精确匹配均生效', () => {
      expect(rewriteAliasRequest('@u/fmt', '/proj/src/pages/home', aliases))
        .toBe('../../utils/fmt');
      expect(rewriteAliasRequest('@u', '/proj/src/pages/home', aliases))
        .toBe('../../utils');
    });

    test('多个别名同时命中时取最长 key', () => {
      const merged = normalizeAliases({ '@u': '/proj/src/utils2' }, '/proj/src', '/proj');
      expect(rewriteAliasRequest('@u/fmt', '/proj/src/pages/home', merged))
        .toBe('../../utils2/fmt');
    });

    test('相对路径、npm 包与 scoped 包名保持原样', () => {
      expect(rewriteAliasRequest('./a', '/proj/src/pages/home', aliases)).toBe('./a');
      expect(rewriteAliasRequest('dayjs', '/proj/src/pages/home', aliases)).toBe('dayjs');
      expect(rewriteAliasRequest('@rsmax/runtime', '/proj/src/pages/home', aliases))
        .toBe('@rsmax/runtime');
      expect(rewriteAliasRequest('@babel/core', '/proj/src/pages/home', aliases))
        .toBe('@babel/core');
    });

    test('疑似前缀但非目录边界时不匹配', () => {
      const merged = normalizeAliases({ '@components': '/proj/src/components' }, '/proj/src', '/proj');
      expect(rewriteAliasRequest('@components-x/a', '/proj/src/pages', merged))
        .toBe('@components-x/a');
    });
  });

  describe('rewriteAstAliases', () => {
    test('改写 import / require / export-from，且返回改写数量', () => {
      const ast = parseCode(`
import a from '@/a';
import '@/side';
const b = require('@/b');
export { c } from '@/c';
export * from '@/d';
import r from '@rsmax/runtime';
import rel from './rel';
`);
      const aliases = normalizeAliases(undefined, '/proj/src', '/proj');
      const count = rewriteAstAliases(ast, '/proj/src/pages/home', aliases);
      expect(count).toBe(5);
      expect(ast.program.body[0].source.value).toBe('../../a');
      expect(ast.program.body[1].source.value).toBe('../../side');
      expect(ast.program.body[2].declarations[0].init.arguments[0].value).toBe('../../b');
      expect(ast.program.body[3].source.value).toBe('../../c');
      expect(ast.program.body[4].source.value).toBe('../../d');
      expect(ast.program.body[5].source.value).toBe('@rsmax/runtime');
      expect(ast.program.body[6].source.value).toBe('./rel');
    });

    test('空别名表为 no-op', () => {
      const ast = parseCode("import a from '@/a';");
      expect(rewriteAstAliases(ast, '/proj/src/pages', {})).toBe(0);
      expect(ast.program.body[0].source.value).toBe('@/a');
    });
  });

  describe('compile integration', () => {
    let tmpDir;
    let srcDir;
    let distDir;

    beforeEach(async () => {
      tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'rsmax-alias-test-'));
      srcDir = path.join(tmpDir, 'src');
      distDir = path.join(tmpDir, 'dist');
      await fs.ensureDir(srcDir);
    });

    afterEach(async () => {
      await fs.remove(tmpDir);
    });

    test('别名在页面 JS、样式引入与纯 CJS 文件中均生效', async () => {
      await fs.writeFile(path.join(tmpDir, 'rsmax.config.js'),
        'module.exports = { alias: { \'@data\': \'./src/data\' } };\n', 'utf-8');
      await fs.ensureDir(path.join(srcDir, 'utils'));
      await fs.ensureDir(path.join(srcDir, 'data'));
      await fs.ensureDir(path.join(srcDir, 'styles'));
      await fs.ensureDir(path.join(srcDir, 'lib'));
      await fs.ensureDir(path.join(srcDir, 'pages', 'home'));
      await fs.writeFile(path.join(srcDir, 'app.js'), 'App({})\n', 'utf-8');
      await fs.writeFile(path.join(srcDir, 'app.json'),
        JSON.stringify({ pages: ['pages/home/index'] }), 'utf-8');
      await fs.writeFile(path.join(srcDir, 'utils', 'helper.js'),
        'export const add = (a, b) => a + b;\n', 'utf-8');
      await fs.writeFile(path.join(srcDir, 'data', 'user.js'),
        'export const user = { name: \'rsmax\' };\n', 'utf-8');
      await fs.writeFile(path.join(srcDir, 'styles', 'common.less'),
        '.foo { color: red; }\n', 'utf-8');
      await fs.writeFile(path.join(srcDir, 'lib', 'legacy.js'),
        'module.exports = require(\'@/utils/helper\');\n', 'utf-8');
      await fs.writeFile(path.join(srcDir, 'pages', 'home', 'index.jsx'), `
import { useState } from '@rsmax/runtime';
import { add } from '@/utils/helper';
import { user } from '@data/user';
import '@/styles/common.less';
export default function Home() {
  const [n] = useState(0);
  return <view>{add(n, 1)}{user.name}</view>;
}
`, 'utf-8');

      await compile(srcDir, distDir);

      const pageJs = await fs.readFile(path.join(distDir, 'pages', 'home', 'index.js'), 'utf-8');
      expect(pageJs).toContain('require("../../utils/helper")');
      expect(pageJs).toContain('require("../../data/user")');
      expect(pageJs).toContain('require("../../rsmax-runtime.js")');
      expect(pageJs).not.toContain('@/');
      expect(pageJs).not.toContain('@data');

      const pageWxss = await fs.readFile(path.join(distDir, 'pages', 'home', 'index.wxss'), 'utf-8');
      expect(pageWxss).toContain('@import "../../styles/common.wxss";');
      expect(await fs.pathExists(path.join(distDir, 'styles', 'common.wxss'))).toBe(true);

      const legacyJs = await fs.readFile(path.join(distDir, 'lib', 'legacy.js'), 'utf-8');
      expect(legacyJs).toContain('require("../utils/helper")');
      expect(legacyJs).not.toContain('@/');
    });

    test('无 rsmax.config.js 时默认 @ 别名依然可用', async () => {
      await fs.ensureDir(path.join(srcDir, 'utils'));
      await fs.ensureDir(path.join(srcDir, 'pages', 'p'));
      await fs.writeFile(path.join(srcDir, 'app.js'), 'App({})\n', 'utf-8');
      await fs.writeFile(path.join(srcDir, 'utils', 'u.js'),
        'export const x = 1;\n', 'utf-8');
      await fs.writeFile(path.join(srcDir, 'pages', 'p', 'index.js'),
        'import { x } from \'@/utils/u\';\nconsole.log(x);\n', 'utf-8');

      await compile(srcDir, distDir);

      const out = await fs.readFile(path.join(distDir, 'pages', 'p', 'index.js'), 'utf-8');
      expect(out).toContain('require("../../utils/u")');
    });
  });
});
