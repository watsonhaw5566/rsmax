const { describe, test, expect, beforeEach, afterEach } = require('@rstest/core');
const path = require('node:path');
const os = require('node:os');
const fs = require('fs-extra');
const { buildNpm } = require('../npm');

let tmpRoot;
let projectRoot;
let distDir;

async function mkTmpProject() {
  tmpRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'rsmax-npm-test-'));
  projectRoot = tmpRoot;
  distDir = path.join(tmpRoot, 'dist');
  await fs.ensureDir(distDir);
  return { tmpRoot, projectRoot, distDir };
}

async function cleanup() {
  if (tmpRoot) await fs.remove(tmpRoot);
}

// 在 projectRoot 下创建一个 npm 包（模拟 node_modules 中的包）
async function writePkg(name, files, pkgJson = {}) {
  const dir = path.join(projectRoot, 'node_modules', ...name.split('/'));
  await fs.ensureDir(dir);
  for (const [rel, content] of Object.entries(files)) {
    await fs.outputFile(path.join(dir, rel), content, 'utf8');
  }
  await fs.writeJson(path.join(dir, 'package.json'), {
    name,
    version: '1.0.0',
    ...pkgJson,
  });
}

async function writeProjectPkg(dependencies, extra = {}) {
  await fs.writeJson(path.join(projectRoot, 'package.json'), {
    name: 'demo',
    version: '1.0.0',
    dependencies,
    ...extra,
  });
}

function readDistFile(...segments) {
  return fs.readFile(path.join(distDir, 'miniprogram_npm', ...segments), 'utf8');
}

describe('rsmax-compiler - npm build (built-in)', () => {
  beforeEach(async () => {
    await mkTmpProject();
  });
  afterEach(async () => {
    await cleanup();
  });

  describe('config resolution', () => {
    test('npm: false 跳过构建', async () => {
      await writeProjectPkg({ foo: '1.0.0' });
      await writePkg('foo', { 'index.js': 'module.exports = 1;' });
      const ran = await buildNpm({
        projectRoot, targetDir: distDir,
        projectPkg: { dependencies: { foo: '1.0.0' } },
        npmConfig: false,
      });
      expect(ran).toBe(false);
      expect(await fs.pathExists(path.join(distDir, 'miniprogram_npm'))).toBe(false);
    });

    test('npm: { enable: false } 跳过构建', async () => {
      await writeProjectPkg({ foo: '1.0.0' });
      await writePkg('foo', { 'index.js': 'module.exports = 1;' });
      const ran = await buildNpm({
        projectRoot, targetDir: distDir,
        projectPkg: { dependencies: { foo: '1.0.0' } },
        npmConfig: { enable: false },
      });
      expect(ran).toBe(false);
    });

    test('无 dependencies 跳过构建', async () => {
      await writeProjectPkg({});
      const ran = await buildNpm({
        projectRoot, targetDir: distDir,
        projectPkg: { dependencies: {} },
      });
      expect(ran).toBe(false);
    });

    test('package.json 不存在时跳过', async () => {
      // 不写 package.json
      const ran = await buildNpm({
        projectRoot, targetDir: distDir,
        projectPkg: { dependencies: { foo: '1.0.0' } },
      });
      expect(ran).toBe(false);
    });

    test('devDependencies 不会被打包', async () => {
      await writeProjectPkg({ prod: '1.0.0' }, { devDependencies: { dev: '1.0.0' } });
      await writePkg('prod', { 'index.js': 'module.exports = "p";' });
      await writePkg('dev', { 'index.js': 'module.exports = "d";' });
      await buildNpm({
        projectRoot, targetDir: distDir,
        projectPkg: { dependencies: { prod: '1.0.0' }, devDependencies: { dev: '1.0.0' } },
      });
      expect(await fs.pathExists(path.join(distDir, 'miniprogram_npm', 'prod'))).toBe(true);
      expect(await fs.pathExists(path.join(distDir, 'miniprogram_npm', 'dev'))).toBe(false);
    });
  });

  describe('CJS 包打包', () => {
    test('单文件 CJS 包产物可执行且语义正确', async () => {
      await writeProjectPkg({ adder: '1.0.0' });
      await writePkg('adder', {
        'index.js': 'module.exports = function(a, b) { return a + b; };',
      });
      await buildNpm({
        projectRoot, targetDir: distDir,
        projectPkg: { dependencies: { adder: '1.0.0' } },
      });
      const mod = require(path.join(distDir, 'miniprogram_npm', 'adder', 'index.js'));
      expect(mod(2, 3)).toBe(5);
    });

    test('包内相对 require 与 JSON require 正常工作', async () => {
      await writeProjectPkg({ math: '1.0.0' });
      await writePkg('math', {
        'index.js': `
          const add = require('./lib/add');
          const meta = require('./meta.json');
          module.exports = { add, meta };
        `,
        'lib/add.js': 'module.exports = (a, b) => a + b;',
        'meta.json': JSON.stringify({ version: '1.0.0' }),
      });
      await buildNpm({
        projectRoot, targetDir: distDir,
        projectPkg: { dependencies: { math: '1.0.0' } },
      });
      const mod = require(path.join(distDir, 'miniprogram_npm', 'math', 'index.js'));
      expect(mod.add(1, 2)).toBe(3);
      expect(mod.meta.version).toBe('1.0.0');
    });

    test('入口为目录时自动解析 index.js', async () => {
      await writeProjectPkg({ dirpkg: '1.0.0' });
      await writePkg('dirpkg', {
        'index.js': 'module.exports = 42;',
      }, { main: './' });
      await buildNpm({
        projectRoot, targetDir: distDir,
        projectPkg: { dependencies: { dirpkg: '1.0.0' } },
      });
      const mod = require(path.join(distDir, 'miniprogram_npm', 'dirpkg', 'index.js'));
      expect(mod).toBe(42);
    });

    test('循环依赖不会导致无限递归', async () => {
      await writeProjectPkg({ circular: '1.0.0' });
      await writePkg('circular', {
        'index.js': `
          const b = require('./b');
          module.exports = { from: 'a', b };
        `,
        'b.js': `
          const a = require('./index');
          module.exports = { from: 'b', aName: a.from };
        `,
      });
      await buildNpm({
        projectRoot, targetDir: distDir,
        projectPkg: { dependencies: { circular: '1.0.0' } },
      });
      const mod = require(path.join(distDir, 'miniprogram_npm', 'circular', 'index.js'));
      expect(mod.from).toBe('a');
      expect(mod.b.from).toBe('b');
    });
  });

  describe('ESM 包打包（含 __esModule interop）', () => {
    test('default export 与命名 export 正常', async () => {
      await writeProjectPkg({ esm: '1.0.0' });
      await writePkg('esm', {
        'index.js': `
          export const a = 1;
          export function b() { return 2; }
          export default function defaultFn() { return 3; }
        `,
      });
      await buildNpm({
        projectRoot, targetDir: distDir,
        projectPkg: { dependencies: { esm: '1.0.0' } },
      });
      const mod = require(path.join(distDir, 'miniprogram_npm', 'esm', 'index.js'));
      expect(mod.__esModule).toBe(true);
      expect(mod.a).toBe(1);
      expect(mod.b()).toBe(2);
      expect(mod.default()).toBe(3);
    });

    test('import default / named / namespace 互操作', async () => {
      await writeProjectPkg({ esm2: '1.0.0' });
      await writePkg('esm2', {
        'helper.js': `
          export const named = 'named';
          export default function def() { return 'def'; }
        `,
        'index.js': `
          import def from './helper';
          import { named } from './helper';
          import * as ns from './helper';
          export default { def: def(), named, nsDefault: ns.default(), nsNamed: ns.named };
        `,
      });
      await buildNpm({
        projectRoot, targetDir: distDir,
        projectPkg: { dependencies: { esm2: '1.0.0' } },
      });
      const mod = require(path.join(distDir, 'miniprogram_npm', 'esm2', 'index.js'));
      expect(mod.default.def).toBe('def');
      expect(mod.default.named).toBe('named');
      expect(mod.default.nsDefault).toBe('def');
      expect(mod.default.nsNamed).toBe('named');
    });

    test('export * from 与 re-export 正常', async () => {
      await writeProjectPkg({ esm3: '1.0.0' });
      await writePkg('esm3', {
        'sub.js': 'export const x = 10; export const y = 20;',
        'index.js': `
          export { x } from './sub';
          export * from './sub';
        `,
      });
      await buildNpm({
        projectRoot, targetDir: distDir,
        projectPkg: { dependencies: { esm3: '1.0.0' } },
      });
      const mod = require(path.join(distDir, 'miniprogram_npm', 'esm3', 'index.js'));
      expect(mod.x).toBe(10);
      expect(mod.y).toBe(20);
    });
  });

  describe('scoped 包与传递依赖', () => {
    test('scoped 包输出路径正确', async () => {
      await writeProjectPkg({ '@scope/lib': '1.0.0' });
      await writePkg('@scope/lib', {
        'index.js': 'module.exports = "scoped";',
      });
      await buildNpm({
        projectRoot, targetDir: distDir,
        projectPkg: { dependencies: { '@scope/lib': '1.0.0' } },
      });
      const mod = require(path.join(distDir, 'miniprogram_npm', '@scope', 'lib', 'index.js'));
      expect(mod).toBe('scoped');
    });

    test('传递依赖被自动收集并打包', async () => {
      await writeProjectPkg({ top: '1.0.0' });
      await writePkg('top', {
        'index.js': 'module.exports = require("child");',
      }, { dependencies: { child: '1.0.0' } });
      await writePkg('child', {
        'index.js': 'module.exports = "child";',
      });
      await buildNpm({
        projectRoot, targetDir: distDir,
        projectPkg: { dependencies: { top: '1.0.0' } },
      });
      expect(await fs.pathExists(path.join(distDir, 'miniprogram_npm', 'top', 'index.js'))).toBe(true);
      expect(await fs.pathExists(path.join(distDir, 'miniprogram_npm', 'child', 'index.js'))).toBe(true);
      const top = require(path.join(distDir, 'miniprogram_npm', 'top', 'index.js'));
      expect(top).toBe('child');
    });

    test('跨包 require 作为 outsideDeps 保留，由原生 require 解析', async () => {
      await writeProjectPkg({ useschild: '1.0.0' });
      await writePkg('useschild', {
        'index.js': 'module.exports = require("child").value;',
      }, { dependencies: { child: '1.0.0' } });
      await writePkg('child', {
        'index.js': 'module.exports = { value: 42 };',
      });
      await buildNpm({
        projectRoot, targetDir: distDir,
        projectPkg: { dependencies: { useschild: '1.0.0' } },
      });
      const code = await readDistFile('useschild', 'index.js');
      expect(code).toContain('//miniprogram-npm-outsideDeps=["child"]');
    });
  });

  describe('小程序组件包（miniprogram_dist / miniprogram 字段）', () => {
    test('miniprogram_dist 整目录拷贝', async () => {
      await writeProjectPkg({ 'van-button': '1.0.0' });
      await writePkg('van-button', {
        'miniprogram_dist/index.js': 'Component({});',
        'miniprogram_dist/index.json': '{}',
        'miniprogram_dist/index.wxml': '<view></view>',
        'miniprogram_dist/index.wxss': 'view{}',
      });
      await buildNpm({
        projectRoot, targetDir: distDir,
        projectPkg: { dependencies: { 'van-button': '1.0.0' } },
      });
      expect(await fs.pathExists(path.join(distDir, 'miniprogram_npm', 'van-button', 'index.js'))).toBe(true);
      expect(await fs.pathExists(path.join(distDir, 'miniprogram_npm', 'van-button', 'index.wxml'))).toBe(true);
      expect(await fs.pathExists(path.join(distDir, 'miniprogram_npm', 'van-button', 'index.wxss'))).toBe(true);
    });

    test('自定义 miniprogram 字段目录被拷贝', async () => {
      await writeProjectPkg({ custom: '1.0.0' });
      await writePkg('custom', {
        'dist/comp.js': 'Component({});',
      }, { miniprogram: 'dist' });
      await buildNpm({
        projectRoot, targetDir: distDir,
        projectPkg: { dependencies: { custom: '1.0.0' } },
      });
      expect(await fs.pathExists(path.join(distDir, 'miniprogram_npm', 'custom', 'comp.js'))).toBe(true);
    });

    test('组件包内 node_modules 不被拷贝', async () => {
      await writeProjectPkg({ comp: '1.0.0' });
      await writePkg('comp', {
        'miniprogram_dist/index.js': 'Component({});',
        'miniprogram_dist/node_modules/inner/index.js': 'module.exports = 1;',
      });
      await buildNpm({
        projectRoot, targetDir: distDir,
        projectPkg: { dependencies: { comp: '1.0.0' } },
      });
      expect(await fs.pathExists(path.join(distDir, 'miniprogram_npm', 'comp', 'node_modules'))).toBe(false);
    });
  });

  describe('ignores', () => {
    test('ignores 可排除某个包', async () => {
      await writeProjectPkg({ keep: '1.0.0', drop: '1.0.0' });
      await writePkg('keep', { 'index.js': 'module.exports = 1;' });
      await writePkg('drop', { 'index.js': 'module.exports = 2;' });
      await buildNpm({
        projectRoot, targetDir: distDir,
        projectPkg: { dependencies: { keep: '1.0.0', drop: '1.0.0' } },
        npmConfig: { ignores: ['node_modules/drop/**'] },
      });
      expect(await fs.pathExists(path.join(distDir, 'miniprogram_npm', 'keep'))).toBe(true);
      expect(await fs.pathExists(path.join(distDir, 'miniprogram_npm', 'drop'))).toBe(false);
    });
  });

  describe('pnpm symlink 布局', () => {
    test('通过 symlink 解析到真实包目录', async () => {
      await writeProjectPkg({ sympkg: '1.0.0' });
      // 真实包放在 .pnpm 目录（模拟 pnpm 真实存储）
      const realDir = path.join(projectRoot, 'node_modules', '.pnpm', 'sympkg@1.0.0', 'node_modules', 'sympkg');
      await fs.outputFile(path.join(realDir, 'index.js'), 'module.exports = "real";', 'utf8');
      await fs.writeJson(path.join(realDir, 'package.json'), { name: 'sympkg', version: '1.0.0' });
      // 顶层软链
      const linkPath = path.join(projectRoot, 'node_modules', 'sympkg');
      await fs.symlink(realDir, linkPath, 'dir');

      await buildNpm({
        projectRoot, targetDir: distDir,
        projectPkg: { dependencies: { sympkg: '1.0.0' } },
      });
      const mod = require(path.join(distDir, 'miniprogram_npm', 'sympkg', 'index.js'));
      expect(mod).toBe('real');
    });
  });

  describe('多版本冲突与错误隔离', () => {
    test('同名多版本时首次解析胜出并告警（不抛错）', async () => {
      // 顶层同时依赖 a 和 child；a 内部又嵌套了一份不同版本的 child。
      // BFS 从 projectRoot 出发，顶层 child 应先于 a 内嵌套 child 被解析。
      await writeProjectPkg({ a: '1.0.0', child: '1.0.0' });
      await writePkg('a', { 'index.js': 'module.exports = "a";' }, { dependencies: { child: '1.0.0' } });
      // 顶层 child（真实版本）
      await writePkg('child', { 'index.js': 'module.exports = "top-child";' });
      // a 内嵌套的 child（不同版本）
      await writePkg('a/node_modules/child', { 'index.js': 'module.exports = "nested-child";' });

      await buildNpm({
        projectRoot, targetDir: distDir,
        projectPkg: { dependencies: { a: '1.0.0', child: '1.0.0' } },
      });
      const child = require(path.join(distDir, 'miniprogram_npm', 'child', 'index.js'));
      // 顶层 child 先被解析，应胜出
      expect(child).toBe('top-child');
    });

    test('单个包打包失败不影响其他包', async () => {
      await writeProjectPkg({ bad: '1.0.0', good: '1.0.0' });
      // bad 的入口文件不存在
      await writePkg('bad', {}, { main: 'nonexistent.js' });
      await writePkg('good', { 'index.js': 'module.exports = "good";' });

      await buildNpm({
        projectRoot, targetDir: distDir,
        projectPkg: { dependencies: { bad: '1.0.0', good: '1.0.0' } },
      });
      expect(await fs.pathExists(path.join(distDir, 'miniprogram_npm', 'good', 'index.js'))).toBe(true);
      const good = require(path.join(distDir, 'miniprogram_npm', 'good', 'index.js'));
      expect(good).toBe('good');
    });
  });
});
