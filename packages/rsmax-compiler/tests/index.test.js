const { describe, test, expect, beforeEach, afterEach } = require('@rstest/core');
const parser = require('@babel/parser');
const path = require('node:path');
const os = require('node:os');
const fs = require('fs-extra');
const {
  parseFile,
  extractWxml,
  transformJsCode,
  calculateRuntimePath,
  calculateStorePath,
  calculateStoreMiddlewarePath,
  calculateI18nPath,
  getFileType,
  isModuleFile,
  isStyleFile,
  compile,
  parseSubPackages,
  findSubPackageForFile,
  getEffectiveTargetRoot
} = require('../index');

function parseCode(code) {
  return parser.parse(code, {
    sourceType: 'module',
    plugins: ['jsx', 'classProperties']
  });
}

describe('rsmax-compiler', () => {
  describe('path calculations', () => {
    test('calculateRuntimePath should return correct relative path', () => {
      expect(calculateRuntimePath('/project/dist', '/project/dist')).toBe('./rsmax-runtime.js');
      expect(calculateRuntimePath('/project/dist/pages', '/project/dist')).toBe('../rsmax-runtime.js');
      expect(calculateRuntimePath('/project/dist/pages/home', '/project/dist')).toBe('../../rsmax-runtime.js');
    });

    test('calculateStorePath should return correct relative path', () => {
      expect(calculateStorePath('/project/dist', '/project/dist')).toBe('./rsmax-store.js');
      expect(calculateStorePath('/project/dist/pages', '/project/dist')).toBe('../rsmax-store.js');
    });

    test('calculateStoreMiddlewarePath should return correct relative path', () => {
      expect(calculateStoreMiddlewarePath('/project/dist', '/project/dist')).toBe('./rsmax-store-middleware.js');
      expect(calculateStoreMiddlewarePath('/project/dist/pages', '/project/dist')).toBe('../rsmax-store-middleware.js');
    });

    test('calculateI18nPath should return correct relative path', () => {
      expect(calculateI18nPath('/project/dist', '/project/dist')).toBe('./rsmax-i18n.js');
      expect(calculateI18nPath('/project/dist/pages', '/project/dist')).toBe('../rsmax-i18n.js');
      expect(calculateI18nPath('/project/dist/pages/home', '/project/dist')).toBe('../../rsmax-i18n.js');
    });
  });

  describe('getFileType', () => {
    test('should detect app files', () => {
      expect(getFileType('/project/src/app.js', '/project/src')).toBe('app');
      expect(getFileType('/project/src/app.jsx', '/project/src')).toBe('app');
    });

    test('should detect component files in components directory', () => {
      expect(getFileType('/project/src/components/button/index.js', '/project/src')).toBe('component');
      expect(getFileType('/project/src/components/MyComponent.jsx', '/project/src')).toBe('component');
    });

    test('should detect component files inside sub-package components/ directory', () => {
      const subPackages = [{ root: 'packageA', pages: ['pages/detail/index'], independent: false }];
      expect(getFileType('/project/src/packageA/components/badge/index.js', '/project/src', subPackages)).toBe('component');
      expect(getFileType('/project/src/packageA/components/card/index.jsx', '/project/src', subPackages)).toBe('component');
    });

    test('should detect page files', () => {
      expect(getFileType('/project/src/pages/index/index.js', '/project/src')).toBe('page');
      expect(getFileType('/project/src/home.jsx', '/project/src')).toBe('page');
    });

    test('should detect page files inside sub-packages', () => {
      const subPackages = [{ root: 'packageA', pages: ['pages/detail/index'], independent: false }];
      expect(getFileType('/project/src/packageA/pages/detail/index.js', '/project/src', subPackages)).toBe('page');
    });
  });

  describe('subPackages utilities', () => {
    test('findSubPackageForFile should match files inside a sub-package root', () => {
      const subPackages = [
        { root: 'packageA', pages: ['pages/detail/index'], independent: false },
        { root: 'pkgB', pages: ['pages/home/index'], independent: true }
      ];
      expect(findSubPackageForFile('packageA/pages/detail/index.js', subPackages)).not.toBeNull();
      expect(findSubPackageForFile('packageA/pages/detail/index.js', subPackages).root).toBe('packageA');
      expect(findSubPackageForFile('pkgB/pages/home/index.js', subPackages).root).toBe('pkgB');
      expect(findSubPackageForFile('pages/index/index.js', subPackages)).toBeNull();
      expect(findSubPackageForFile('app.js', subPackages)).toBeNull();
    });

    test('findSubPackageForFile should handle nested sub-package roots', () => {
      const subPackages = [{ root: 'modules/profile', pages: ['pages/index/index'], independent: false }];
      const result = findSubPackageForFile('modules/profile/pages/index/index.js', subPackages);
      expect(result).not.toBeNull();
      expect(result.root).toBe('modules/profile');
    });

    test('getEffectiveTargetRoot should return main root for regular sub-packages', () => {
      const sp = { root: 'packageA', independent: false };
      expect(getEffectiveTargetRoot('/dist/packageA/pages/detail', '/dist', sp)).toBe('/dist');
    });

    test('getEffectiveTargetRoot should return sub-package root for independent sub-packages', () => {
      const sp = { root: 'pkgB', independent: true };
      expect(getEffectiveTargetRoot('/dist/pkgB/pages/home', '/dist', sp)).toBe(path.join('/dist', 'pkgB'));
    });

    test('getEffectiveTargetRoot should return main root for non-sub-package files', () => {
      expect(getEffectiveTargetRoot('/dist/pages/index', '/dist', null)).toBe('/dist');
    });
  });

  describe('isModuleFile and isStyleFile (re-exported)', () => {
    test('should identify module files', () => {
      expect(isModuleFile('styles.module.css')).toBe(true);
      expect(isModuleFile('styles.css')).toBe(false);
    });

    test('should identify style files', () => {
      expect(isStyleFile('styles.css')).toBe(true);
      expect(isStyleFile('app.wxss')).toBe(true);
      expect(isStyleFile('index.js')).toBe(false);
    });
  });

  describe('extractWxml', () => {
    test('should extract wxml from JSX code', () => {
      const code = 'export default { render() { return <view class="container"><text>Hello</text></view>; } }';
      const ast = parseCode(code);
      const result = extractWxml(ast, code);

      expect(result.wxml).toContain('<view');
      expect(result.wxml).toContain('class="container"');
      expect(result.wxml).toContain('<text>Hello</text>');
      expect(result.components).toBeDefined();
    });

    test('should handle functional component', () => {
      const code = 'export default () => <view>Functional</view>;';
      const ast = parseCode(code);
      const result = extractWxml(ast, code);

      expect(result.wxml).toContain('<view>Functional</view>');
    });
  });

  describe('transformJsCode', () => {
    test('should transform object component to Page call', () => {
      const code = 'export default { data: { count: 0 } };';
      const ast = parseCode(code);
      const result = transformJsCode(ast, code, 'page', { runtimePath: './rsmax-runtime.js' });

      expect(result).toContain('Page(');
      expect(result).toContain('data:');
    });

    test('should rewrite @rsmax/i18n imports when i18nPath is provided', () => {
      const code = [
        'import { useI18n, t } from "@rsmax/i18n";',
        'export default function Index() {',
        '  const { t: i18nT } = useI18n();',
        '  return <view>{t("hello")}</view>;',
        '}'
      ].join('\n');
      const ast = parseCode(code);
      const result = transformJsCode(ast, code, 'page', {
        runtimePath: './rsmax-runtime.js',
        i18nPath: './rsmax-i18n.js'
      });

      expect(result).toContain('./rsmax-i18n.js');
      expect(result).not.toContain('@rsmax/i18n');
    });
  });

  describe('parseFile', () => {
    test('should parse a JS file', async () => {
      const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'rsmax-test-'));
      const tmpFile = path.join(tmpDir, 'test.js');
      await fs.writeFile(tmpFile, 'export default { data: { count: 0 } };', 'utf-8');

      try {
        const { ast, code } = await parseFile(tmpFile);
        expect(ast).toBeDefined();
        expect(code).toContain('export default');
      } finally {
        await fs.remove(tmpDir);
      }
    });
  });

  describe('public directory support', () => {
    let tmpDir;
    let srcDir;
    let distDir;
    let projectRoot;

    beforeEach(async () => {
      tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'rsmax-public-test-'));
      projectRoot = tmpDir;
      srcDir = path.join(tmpDir, 'src');
      distDir = path.join(tmpDir, 'dist');
      await fs.ensureDir(srcDir);
      // Minimal app.js and app.json so compilation succeeds
      await fs.writeFile(path.join(srcDir, 'app.js'), 'App({})', 'utf-8');
      await fs.writeFile(path.join(srcDir, 'app.json'), JSON.stringify({pages: []}), 'utf-8');
    });

    afterEach(async () => {
      await fs.remove(tmpDir);
    });

    test('should copy public/ from project root (sibling of src/) to dist root', async () => {
      const publicDir = path.join(projectRoot, 'public');
      await fs.ensureDir(publicDir);
      await fs.writeFile(path.join(publicDir, 'sitemap.json'), JSON.stringify({desc: 'test'}), 'utf-8');
      await fs.writeFile(path.join(publicDir, 'project.config.json'), JSON.stringify({appid: 'test'}), 'utf-8');
      await fs.ensureDir(path.join(publicDir, 'images'));
      await fs.writeFile(path.join(publicDir, 'images', 'logo.png'), 'fake-png-bytes', 'utf-8');

      await compile(srcDir, distDir);

      // Public assets copied to dist root
      expect(await fs.pathExists(path.join(distDir, 'sitemap.json'))).toBe(true);
      expect(await fs.pathExists(path.join(distDir, 'project.config.json'))).toBe(true);
      expect(await fs.pathExists(path.join(distDir, 'images', 'logo.png'))).toBe(true);
      // Compiled source files still exist
      expect(await fs.pathExists(path.join(distDir, 'app.js'))).toBe(true);
      expect(await fs.pathExists(path.join(distDir, 'app.json'))).toBe(true);
    });

    test('should copy public/ from inside src/ to dist root when no project-root public exists', async () => {
      const publicDir = path.join(srcDir, 'public');
      await fs.ensureDir(publicDir);
      await fs.writeFile(path.join(publicDir, 'sitemap.json'), JSON.stringify({desc: 'src-public'}), 'utf-8');

      await compile(srcDir, distDir);

      expect(await fs.pathExists(path.join(distDir, 'sitemap.json'))).toBe(true);
      const sitemap = await fs.readJson(path.join(distDir, 'sitemap.json'));
      expect(sitemap.desc).toBe('src-public');
      // src/public should NOT appear as a subdirectory in dist
      expect(await fs.pathExists(path.join(distDir, 'public'))).toBe(false);
    });

    test('should prefer project-root public/ over src/public (project root takes priority)', async () => {
      const projectPublic = path.join(projectRoot, 'public');
      const srcPublic = path.join(srcDir, 'public');
      await fs.ensureDir(projectPublic);
      await fs.ensureDir(srcPublic);
      await fs.writeFile(path.join(projectPublic, 'test.txt'), 'from-project-root', 'utf-8');
      await fs.writeFile(path.join(srcPublic, 'test.txt'), 'from-src', 'utf-8');

      await compile(srcDir, distDir);

      const content = await fs.readFile(path.join(distDir, 'test.txt'), 'utf-8');
      expect(content).toBe('from-project-root');
    });

    test('should not fail when no public directory exists', async () => {
      await expect(compile(srcDir, distDir)).resolves.toBeUndefined();
    });

    test('should copy nested directories in public/', async () => {
      const publicDir = path.join(projectRoot, 'public');
      await fs.ensureDir(path.join(publicDir, 'images', 'icons'));
      await fs.writeFile(path.join(publicDir, 'images', 'icons', 'tab-home.png'), 'tab-home', 'utf-8');
      await fs.writeFile(path.join(publicDir, 'images', 'bg.jpg'), 'bg', 'utf-8');

      await compile(srcDir, distDir);

      expect(await fs.pathExists(path.join(distDir, 'images', 'icons', 'tab-home.png'))).toBe(true);
      expect(await fs.pathExists(path.join(distDir, 'images', 'bg.jpg'))).toBe(true);
    });
  });

  describe('WXS support', () => {
    let tmpDir;
    let srcDir;
    let distDir;

    beforeEach(async () => {
      tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'rsmax-wxs-test-'));
      srcDir = path.join(tmpDir, 'src');
      distDir = path.join(tmpDir, 'dist');
      await fs.ensureDir(path.join(srcDir, 'pages', 'wxs-demo'));
      // Minimal app files
      await fs.writeFile(path.join(srcDir, 'app.js'), 'App({})', 'utf-8');
      await fs.writeFile(path.join(srcDir, 'app.json'), JSON.stringify({pages: ['pages/wxs-demo/index']}), 'utf-8');
    });

    afterEach(async () => {
      await fs.remove(tmpDir);
    });

    test('should inject wxs tags in WXML when importing .wxs file', async () => {
      const pageJsx = `import tools from './tools.wxs';
export default {
  data: { name: 'World' },
  render() {
    return <view><text>{tools.greet(this.data.name)}</text></view>;
  }
};`;
      const toolsWxs = `function greet(name) { return 'Hello, ' + name + '!'; }
module.exports = { greet: greet };`;
      await fs.writeFile(path.join(srcDir, 'pages', 'wxs-demo', 'index.jsx'), pageJsx, 'utf-8');
      await fs.writeFile(path.join(srcDir, 'pages', 'wxs-demo', 'tools.wxs'), toolsWxs, 'utf-8');

      await compile(srcDir, distDir);

      // WXS file should be copied to dist
      expect(await fs.pathExists(path.join(distDir, 'pages', 'wxs-demo', 'tools.wxs'))).toBe(true);

      // WXML should contain the wxs tag injected at the top
      const wxml = await fs.readFile(path.join(distDir, 'pages', 'wxs-demo', 'index.wxml'), 'utf-8');
      expect(wxml).toContain('<wxs module="tools" src="./tools.wxs" />');
      expect(wxml).toContain('<view');
      expect(wxml).toContain('{{tools.greet(name)}}');

      // JS should NOT contain .wxs import
      const js = await fs.readFile(path.join(distDir, 'pages', 'wxs-demo', 'index.js'), 'utf-8');
      expect(js).not.toContain("import tools from './tools.wxs'");
      expect(js).not.toContain("require('./tools.wxs')");
    });

    test('should copy .wxs files placed alongside pages to dist', async () => {
      await fs.writeFile(path.join(srcDir, 'pages', 'wxs-demo', 'index.js'),
        'Page({ data: {} })', 'utf-8');
      const utilsWxs = `function format(n) { return n + ''; }
module.exports = { format: format };`;
      await fs.writeFile(path.join(srcDir, 'pages', 'wxs-demo', 'helpers.wxs'), utilsWxs, 'utf-8');

      await compile(srcDir, distDir);

      expect(await fs.pathExists(path.join(distDir, 'pages', 'wxs-demo', 'helpers.wxs'))).toBe(true);
    });
  });

  describe('subPackages compilation', () => {
    let tmpDir;
    let srcDir;
    let distDir;
    let projectRoot;

    beforeEach(async () => {
      tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'rsmax-subpkg-test-'));
      projectRoot = tmpDir;
      srcDir = path.join(tmpDir, 'src');
      distDir = path.join(tmpDir, 'dist');
      await fs.ensureDir(srcDir);
      // Main app
      await fs.writeFile(path.join(srcDir, 'app.js'), 'App({})', 'utf-8');
      await fs.writeFile(path.join(srcDir, 'app.wxss'), '', 'utf-8');
      // Main package page
      await fs.ensureDir(path.join(srcDir, 'pages', 'index'));
      await fs.writeFile(path.join(srcDir, 'pages', 'index', 'index.jsx'),
        'import { useState } from "@rsmax/runtime";\n' +
        'export default function Index() {\n' +
        '  const [msg] = useState("hello");\n' +
        '  return <view><text>{msg}</text></view>;\n' +
        '}\n', 'utf-8');
    });

    afterEach(async () => {
      await fs.remove(tmpDir);
    });

    test('should compile sub-package pages with correct relative runtime paths', async () => {
      await fs.writeFile(path.join(srcDir, 'app.json'), JSON.stringify({
        pages: ['pages/index/index'],
        subPackages: [
          { root: 'packageA', pages: ['pages/detail/index'] }
        ]
      }), 'utf-8');

      const subPageDir = path.join(srcDir, 'packageA', 'pages', 'detail');
      await fs.ensureDir(subPageDir);
      await fs.writeFile(path.join(subPageDir, 'index.jsx'),
        'import { useState } from "@rsmax/runtime";\n' +
        'export default function Detail() {\n' +
        '  const [count] = useState(0);\n' +
        '  return <view><text>{count}</text></view>;\n' +
        '}\n', 'utf-8');
      await fs.writeFile(path.join(subPageDir, 'index.wxss'), '.container{padding:20rpx;}', 'utf-8');

      await compile(srcDir, distDir);

      expect(await fs.pathExists(path.join(distDir, 'app.js'))).toBe(true);
      expect(await fs.pathExists(path.join(distDir, 'pages', 'index', 'index.js'))).toBe(true);
      expect(await fs.pathExists(path.join(distDir, 'rsmax-runtime.js'))).toBe(true);
      expect(await fs.pathExists(path.join(distDir, 'packageA', 'pages', 'detail', 'index.js'))).toBe(true);
      expect(await fs.pathExists(path.join(distDir, 'packageA', 'pages', 'detail', 'index.wxml'))).toBe(true);
      expect(await fs.pathExists(path.join(distDir, 'packageA', 'pages', 'detail', 'index.wxss'))).toBe(true);
      // Regular sub-package shares main runtime, no copy in sub-package root
      expect(await fs.pathExists(path.join(distDir, 'packageA', 'rsmax-runtime.js'))).toBe(false);

      const subJs = await fs.readFile(path.join(distDir, 'packageA', 'pages', 'detail', 'index.js'), 'utf-8');
      expect(subJs).toContain('../../../rsmax-runtime.js');
      expect(subJs).toContain('Page(');
    });

    test('should copy independent sub-package runtime to its own root', async () => {
      await fs.writeFile(path.join(srcDir, 'app.json'), JSON.stringify({
        pages: ['pages/index/index'],
        subPackages: [
          { root: 'pkgIndep', pages: ['pages/home/index'], independent: true }
        ]
      }), 'utf-8');

      const subPageDir = path.join(srcDir, 'pkgIndep', 'pages', 'home');
      await fs.ensureDir(subPageDir);
      await fs.writeFile(path.join(subPageDir, 'index.jsx'),
        'import { useState } from "@rsmax/runtime";\n' +
        'export default function Home() {\n' +
        '  return <view><text>Independent</text></view>;\n' +
        '}\n', 'utf-8');

      await compile(srcDir, distDir);

      expect(await fs.pathExists(path.join(distDir, 'pkgIndep', 'rsmax-runtime.js'))).toBe(true);
      expect(await fs.pathExists(path.join(distDir, 'pkgIndep', 'pages', 'home', 'index.js'))).toBe(true);

      const subJs = await fs.readFile(path.join(distDir, 'pkgIndep', 'pages', 'home', 'index.js'), 'utf-8');
      expect(subJs).toContain('../../rsmax-runtime.js');
    });

    test('should recognize sub-package components as Component type', async () => {
      await fs.writeFile(path.join(srcDir, 'app.json'), JSON.stringify({
        pages: ['pages/index/index'],
        subPackages: [
          { root: 'packageA', pages: ['pages/detail/index'] }
        ]
      }), 'utf-8');

      const compDir = path.join(srcDir, 'packageA', 'components', 'tag');
      await fs.ensureDir(compDir);
      await fs.writeFile(path.join(compDir, 'index.jsx'),
        'export default function Tag({ label }) {\n' +
        '  return <view class="tag"><text>{label}</text></view>;\n' +
        '}\n', 'utf-8');
      await fs.writeFile(path.join(compDir, 'index.json'), JSON.stringify({component: true}), 'utf-8');

      const pageDir = path.join(srcDir, 'packageA', 'pages', 'detail');
      await fs.ensureDir(pageDir);
      await fs.writeFile(path.join(pageDir, 'index.jsx'),
        'export default function Detail() { return <view><text>hi</text></view>; }\n', 'utf-8');

      await compile(srcDir, distDir);

      const compJs = await fs.readFile(path.join(distDir, 'packageA', 'components', 'tag', 'index.js'), 'utf-8');
      expect(compJs).toContain('Component(');
      expect(compJs).not.toContain('Page(');

      const compJson = await fs.readJson(path.join(distDir, 'packageA', 'components', 'tag', 'index.json'));
      expect(compJson.component).toBe(true);
    });

    test('should support both subpackages and subPackages aliases in app.json', async () => {
      await fs.writeFile(path.join(srcDir, 'app.json'), JSON.stringify({
        pages: ['pages/index/index'],
        subpackages: [
          { root: 'pkgAlias', pages: ['pages/p/index'] }
        ]
      }), 'utf-8');

      const pDir = path.join(srcDir, 'pkgAlias', 'pages', 'p');
      await fs.ensureDir(pDir);
      await fs.writeFile(path.join(pDir, 'index.jsx'),
        'export default function P() { return <view><text>P</text></view>; }\n', 'utf-8');

      await compile(srcDir, distDir);
      expect(await fs.pathExists(path.join(distDir, 'pkgAlias', 'pages', 'p', 'index.js'))).toBe(true);
    });
  });

  describe('plugin component support', () => {
    let tmpDir;
    let srcDir;
    let distDir;
    let projectRoot;

    beforeEach(async () => {
      tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'rsmax-plugin-test-'));
      projectRoot = tmpDir;
      srcDir = path.join(tmpDir, 'src');
      distDir = path.join(tmpDir, 'dist');
      await fs.ensureDir(srcDir);
      await fs.writeFile(path.join(srcDir, 'app.js'), 'App({})', 'utf-8');
      await fs.writeFile(path.join(srcDir, 'app.json'), JSON.stringify({
        pages: ['pages/index/index'],
        plugins: {
          myPlugin: { version: '1.0.0', provider: 'wxid_demo' }
        }
      }), 'utf-8');
      await fs.ensureDir(path.join(srcDir, 'pages', 'index'));
    });

    afterEach(async () => {
      await fs.remove(tmpDir);
    });

    test('should auto-register exact plugin:// components in page JSON via rsmax.config.js', async () => {
      // rsmax.config.js with exact plugin component mapping
      await fs.writeFile(path.join(projectRoot, 'rsmax.config.js'),
        'module.exports = {\n' +
        '  components: {\n' +
        "    'hello-comp': 'plugin://myPlugin/hello-component'\n" +
        '  }\n' +
        '};\n', 'utf-8');

      await fs.writeFile(path.join(srcDir, 'pages', 'index', 'index.jsx'),
        'export default function Index() {\n' +
        '  return <view><hello-comp name="world" /></view>;\n' +
        '}\n', 'utf-8');

      await compile(srcDir, distDir);

      const pageJson = await fs.readJson(path.join(distDir, 'pages', 'index', 'index.json'));
      expect(pageJson.usingComponents).toBeDefined();
      expect(pageJson.usingComponents['hello-comp']).toBe('plugin://myPlugin/hello-component');
    });

    test('should auto-register prefix-mapped plugin components', async () => {
      await fs.writeFile(path.join(projectRoot, 'rsmax.config.js'),
        'module.exports = {\n' +
        '  components: {\n' +
        "    'mp': { plugin: 'myPlugin' }\n" +
        '  }\n' +
        '};\n', 'utf-8');

      await fs.writeFile(path.join(srcDir, 'pages', 'index', 'index.jsx'),
        'export default function Index() {\n' +
        '  return <view><mp-hello /><mp-list /></view>;\n' +
        '}\n', 'utf-8');

      await compile(srcDir, distDir);

      const pageJson = await fs.readJson(path.join(distDir, 'pages', 'index', 'index.json'));
      expect(pageJson.usingComponents['mp-hello']).toBe('plugin://myPlugin/hello');
      expect(pageJson.usingComponents['mp-list']).toBe('plugin://myPlugin/list');
    });

    test('should preserve user-written usingComponents and merge auto-resolved ones', async () => {
      await fs.writeFile(path.join(projectRoot, 'rsmax.config.js'),
        'module.exports = {\n' +
        '  components: {\n' +
        "    'mp': { plugin: 'myPlugin' }\n" +
        '  }\n' +
        '};\n', 'utf-8');

      // Page with its own json declaring a local component
      await fs.writeFile(path.join(srcDir, 'pages', 'index', 'index.json'),
        JSON.stringify({ usingComponents: { 'local-comp': '../../components/local/index' } }), 'utf-8');

      await fs.writeFile(path.join(srcDir, 'pages', 'index', 'index.jsx'),
        'export default function Index() {\n' +
        '  return <view><local-comp /><mp-hello /></view>;\n' +
        '}\n', 'utf-8');

      await compile(srcDir, distDir);

      const pageJson = await fs.readJson(path.join(distDir, 'pages', 'index', 'index.json'));
      expect(pageJson.usingComponents['local-comp']).toBe('../../components/local/index');
      expect(pageJson.usingComponents['mp-hello']).toBe('plugin://myPlugin/hello');
    });

    test('should not interfere with non-plugin kebab-case tags not in config', async () => {
      // No rsmax.config.js — custom kebab tags without config will be collected
      // but resolveComponents will produce empty entries (resolver returns null)
      await fs.writeFile(path.join(srcDir, 'pages', 'index', 'index.jsx'),
        'export default function Index() {\n' +
        '  return <view><unknown-tag /></view>;\n' +
        '}\n', 'utf-8');

      await compile(srcDir, distDir);

      const jsonPath = path.join(distDir, 'pages', 'index', 'index.json');
      if (await fs.pathExists(jsonPath)) {
        const pageJson = await fs.readJson(jsonPath);
        // Either no usingComponents, or unknown-tag is not present
        if (pageJson.usingComponents) {
          expect(pageJson.usingComponents['unknown-tag']).toBeUndefined();
        }
      }
      // Compilation succeeds
      expect(await fs.pathExists(path.join(distDir, 'pages', 'index', 'index.js'))).toBe(true);
    });
  });

  describe('plugin component support', () => {
    let tmpDir;
    let srcDir;
    let distDir;
    let projectRoot;

    beforeEach(async () => {
      tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'rsmax-plugin-test-'));
      projectRoot = tmpDir;
      srcDir = path.join(tmpDir, 'src');
      distDir = path.join(tmpDir, 'dist');
      await fs.ensureDir(srcDir);
      await fs.writeFile(path.join(srcDir, 'app.js'), 'App({})', 'utf-8');
      await fs.writeFile(path.join(srcDir, 'app.json'), JSON.stringify({
        pages: ['pages/index/index'],
        plugins: {
          myPlugin: { version: '1.0.0', provider: 'wxid_demo' }
        }
      }), 'utf-8');
      await fs.ensureDir(path.join(srcDir, 'pages', 'index'));
    });

    afterEach(async () => {
      await fs.remove(tmpDir);
    });

    test('should auto-register exact plugin:// components in page JSON via rsmax.config.js', async () => {
      // rsmax.config.js with exact plugin component mapping
      await fs.writeFile(path.join(projectRoot, 'rsmax.config.js'),
        'module.exports = {\n' +
        '  components: {\n' +
        "    'hello-comp': 'plugin://myPlugin/hello-component'\n" +
        '  }\n' +
        '};\n', 'utf-8');

      await fs.writeFile(path.join(srcDir, 'pages', 'index', 'index.jsx'),
        'export default function Index() {\n' +
        '  return <view><hello-comp name="world" /></view>;\n' +
        '}\n', 'utf-8');

      await compile(srcDir, distDir);

      const pageJson = await fs.readJson(path.join(distDir, 'pages', 'index', 'index.json'));
      expect(pageJson.usingComponents).toBeDefined();
      expect(pageJson.usingComponents['hello-comp']).toBe('plugin://myPlugin/hello-component');
    });

    test('should auto-register prefix-mapped plugin components', async () => {
      await fs.writeFile(path.join(projectRoot, 'rsmax.config.js'),
        'module.exports = {\n' +
        '  components: {\n' +
        "    'mp': { plugin: 'myPlugin' }\n" +
        '  }\n' +
        '};\n', 'utf-8');

      await fs.writeFile(path.join(srcDir, 'pages', 'index', 'index.jsx'),
        'export default function Index() {\n' +
        '  return <view><mp-hello /><mp-list /></view>;\n' +
        '}\n', 'utf-8');

      await compile(srcDir, distDir);

      const pageJson = await fs.readJson(path.join(distDir, 'pages', 'index', 'index.json'));
      expect(pageJson.usingComponents['mp-hello']).toBe('plugin://myPlugin/hello');
      expect(pageJson.usingComponents['mp-list']).toBe('plugin://myPlugin/list');
    });

    test('should preserve user-written usingComponents and merge auto-resolved ones', async () => {
      await fs.writeFile(path.join(projectRoot, 'rsmax.config.js'),
        'module.exports = {\n' +
        '  components: {\n' +
        "    'mp': { plugin: 'myPlugin' }\n" +
        '  }\n' +
        '};\n', 'utf-8');

      // Page with its own json declaring a local component
      await fs.writeFile(path.join(srcDir, 'pages', 'index', 'index.json'),
        JSON.stringify({ usingComponents: { 'local-comp': '../../components/local/index' } }), 'utf-8');

      await fs.writeFile(path.join(srcDir, 'pages', 'index', 'index.jsx'),
        'export default function Index() {\n' +
        '  return <view><local-comp /><mp-hello /></view>;\n' +
        '}\n', 'utf-8');

      await compile(srcDir, distDir);

      const pageJson = await fs.readJson(path.join(distDir, 'pages', 'index', 'index.json'));
      expect(pageJson.usingComponents['local-comp']).toBe('../../components/local/index');
      expect(pageJson.usingComponents['mp-hello']).toBe('plugin://myPlugin/hello');
    });

    test('should not interfere with non-plugin kebab-case tags not in config', async () => {
      // No rsmax.config.js — custom kebab tags without config will be collected
      // but resolveComponents will produce empty entries (resolver returns null)
      await fs.writeFile(path.join(srcDir, 'pages', 'index', 'index.jsx'),
        'export default function Index() {\n' +
        '  return <view><unknown-tag /></view>;\n' +
        '}\n', 'utf-8');

      await compile(srcDir, distDir);

      const jsonPath = path.join(distDir, 'pages', 'index', 'index.json');
      if (await fs.pathExists(jsonPath)) {
        const pageJson = await fs.readJson(jsonPath);
        // Either no usingComponents, or unknown-tag is not present
        if (pageJson.usingComponents) {
          expect(pageJson.usingComponents['unknown-tag']).toBeUndefined();
        }
      }
      // Compilation succeeds
      expect(await fs.pathExists(path.join(distDir, 'pages', 'index', 'index.js'))).toBe(true);
    });
  });

  describe('i18n in subPackages', () => {
    let tmpDir;
    let srcDir;
    let distDir;
    let projectRoot;

    beforeEach(async () => {
      tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'rsmax-i18n-subpkg-test-'));
      projectRoot = tmpDir;
      srcDir = path.join(tmpDir, 'src');
      distDir = path.join(tmpDir, 'dist');
      await fs.ensureDir(srcDir);

      // App entry (no i18n import in app.js itself)
      await fs.writeFile(path.join(srcDir, 'app.js'), 'App({})', 'utf-8');
      await fs.writeFile(path.join(srcDir, 'app.wxss'), '', 'utf-8');

      // Locales directory at project root
      const localesDir = path.join(projectRoot, 'locales');
      await fs.ensureDir(localesDir);
      await fs.writeFile(path.join(localesDir, 'zh-CN.js'),
        'module.exports = { hello: "你好", sub: { title: "分包标题" } };\n', 'utf-8');
      await fs.writeFile(path.join(localesDir, 'en.js'),
        'module.exports = { hello: "Hello", sub: { title: "Sub Title" } };\n', 'utf-8');
    });

    afterEach(async () => {
      await fs.remove(tmpDir);
    });

    test('regular sub-package page using i18n should resolve to main root runtime', async () => {
      await fs.writeFile(path.join(srcDir, 'app.json'), JSON.stringify({
        pages: ['pages/index/index'],
        subPackages: [
          { root: 'packageA', pages: ['pages/detail/index'] }
        ]
      }), 'utf-8');

      // Main page with no i18n
      await fs.ensureDir(path.join(srcDir, 'pages', 'index'));
      await fs.writeFile(path.join(srcDir, 'pages', 'index', 'index.jsx'),
        'export default function Index() { return <view><text>Main</text></view>; }\n', 'utf-8');

      // Sub-package page uses i18n
      const subPageDir = path.join(srcDir, 'packageA', 'pages', 'detail');
      await fs.ensureDir(subPageDir);
      await fs.writeFile(path.join(subPageDir, 'index.jsx'),
        'import { t } from "@rsmax/i18n";\n' +
        'export default function Detail() {\n' +
        '  return <view><text>{t("hello")}</text></view>;\n' +
        '}\n', 'utf-8');

      await compile(srcDir, distDir);

      // i18n runtime placed in MAIN root (regular sub-package shares main runtime)
      expect(await fs.pathExists(path.join(distDir, 'rsmax-i18n.js'))).toBe(true);
      expect(await fs.pathExists(path.join(distDir, 'rsmax-i18n-locales.js'))).toBe(true);
      expect(await fs.pathExists(path.join(distDir, 'locales', 'zh-CN.js'))).toBe(true);
      expect(await fs.pathExists(path.join(distDir, 'locales', 'en.js'))).toBe(true);

      // i18n runtime NOT copied into sub-package root
      expect(await fs.pathExists(path.join(distDir, 'packageA', 'rsmax-i18n.js'))).toBe(false);
      expect(await fs.pathExists(path.join(distDir, 'packageA', 'locales'))).toBe(false);

      // Sub-package page JS should require i18n from main root (3 levels up)
      const subJs = await fs.readFile(path.join(distDir, 'packageA', 'pages', 'detail', 'index.js'), 'utf-8');
      expect(subJs).toContain('../../../rsmax-i18n.js');
      expect(subJs).not.toContain('@rsmax/i18n');

      // Locales module lazy-requires are relative to rsmax-i18n-locales.js (main root)
      const localesModule = await fs.readFile(path.join(distDir, 'rsmax-i18n-locales.js'), 'utf-8');
      expect(localesModule).toContain("require('./locales/zh-CN.js')");
      expect(localesModule).toContain("require('./locales/en.js')");
    });

    test('independent sub-package page using i18n should have its own i18n copy', async () => {
      await fs.writeFile(path.join(srcDir, 'app.json'), JSON.stringify({
        pages: ['pages/index/index'],
        subPackages: [
          { root: 'pkgIndep', pages: ['pages/home/index'], independent: true }
        ]
      }), 'utf-8');

      await fs.ensureDir(path.join(srcDir, 'pages', 'index'));
      await fs.writeFile(path.join(srcDir, 'pages', 'index', 'index.jsx'),
        'export default function Index() { return <view><text>Main</text></view>; }\n', 'utf-8');

      // Independent sub-package page uses i18n
      const subPageDir = path.join(srcDir, 'pkgIndep', 'pages', 'home');
      await fs.ensureDir(subPageDir);
      await fs.writeFile(path.join(subPageDir, 'index.jsx'),
        'import { t, useI18n } from "@rsmax/i18n";\n' +
        'export default function Home() {\n' +
        '  const { t: i18nT } = useI18n();\n' +
        '  return <view><text>{t("sub.title")}</text></view>;\n' +
        '}\n', 'utf-8');

      await compile(srcDir, distDir);

      // Main root should NOT have i18n files (no main-page uses i18n, but independent
      // subpackage pre-creates runtime only; i18n is copied per-demand)
      // Actually: independent sub-package ensureIndependentSubPackageRuntimes only copies runtime,
      // not i18n. So i18n should ONLY be in the sub-package root because only the sub-package uses it.
      expect(await fs.pathExists(path.join(distDir, 'pkgIndep', 'rsmax-i18n.js'))).toBe(true);
      expect(await fs.pathExists(path.join(distDir, 'pkgIndep', 'rsmax-i18n-locales.js'))).toBe(true);
      expect(await fs.pathExists(path.join(distDir, 'pkgIndep', 'locales', 'zh-CN.js'))).toBe(true);
      expect(await fs.pathExists(path.join(distDir, 'pkgIndep', 'locales', 'en.js'))).toBe(true);

      // Sub-package page JS should require i18n relative to sub-package root (2 levels up)
      const subJs = await fs.readFile(path.join(distDir, 'pkgIndep', 'pages', 'home', 'index.js'), 'utf-8');
      expect(subJs).toContain('../../rsmax-i18n.js');
      expect(subJs).not.toContain('@rsmax/i18n');

      // Locales module in sub-package root uses correct relative path
      const localesModule = await fs.readFile(path.join(distDir, 'pkgIndep', 'rsmax-i18n-locales.js'), 'utf-8');
      expect(localesModule).toContain("require('./locales/zh-CN.js')");
    });

    test('both main package and independent sub-package using i18n get separate copies', async () => {
      await fs.writeFile(path.join(srcDir, 'app.json'), JSON.stringify({
        pages: ['pages/index/index'],
        subPackages: [
          { root: 'pkgIndep', pages: ['pages/home/index'], independent: true }
        ]
      }), 'utf-8');

      // Main page ALSO uses i18n
      await fs.ensureDir(path.join(srcDir, 'pages', 'index'));
      await fs.writeFile(path.join(srcDir, 'pages', 'index', 'index.jsx'),
        'import { t } from "@rsmax/i18n";\n' +
        'export default function Index() { return <view><text>{t("hello")}</text></view>; }\n', 'utf-8');

      const subPageDir = path.join(srcDir, 'pkgIndep', 'pages', 'home');
      await fs.ensureDir(subPageDir);
      await fs.writeFile(path.join(subPageDir, 'index.jsx'),
        'import { t } from "@rsmax/i18n";\n' +
        'export default function Home() { return <view><text>{t("hello")}</text></view>; }\n', 'utf-8');

      await compile(srcDir, distDir);

      // Both roots should have i18n runtime and locales
      expect(await fs.pathExists(path.join(distDir, 'rsmax-i18n.js'))).toBe(true);
      expect(await fs.pathExists(path.join(distDir, 'rsmax-i18n-locales.js'))).toBe(true);
      expect(await fs.pathExists(path.join(distDir, 'locales', 'zh-CN.js'))).toBe(true);

      expect(await fs.pathExists(path.join(distDir, 'pkgIndep', 'rsmax-i18n.js'))).toBe(true);
      expect(await fs.pathExists(path.join(distDir, 'pkgIndep', 'rsmax-i18n-locales.js'))).toBe(true);
      expect(await fs.pathExists(path.join(distDir, 'pkgIndep', 'locales', 'zh-CN.js'))).toBe(true);

      // Main page uses ./rsmax-i18n.js
      const mainJs = await fs.readFile(path.join(distDir, 'pages', 'index', 'index.js'), 'utf-8');
      expect(mainJs).toContain('./rsmax-i18n.js');

      // Sub page uses ../../rsmax-i18n.js (relative to sub-package root)
      const subJs = await fs.readFile(path.join(distDir, 'pkgIndep', 'pages', 'home', 'index.js'), 'utf-8');
      expect(subJs).toContain('../../rsmax-i18n.js');
    });

    test('sub-package component using i18n resolves path correctly', async () => {
      await fs.writeFile(path.join(srcDir, 'app.json'), JSON.stringify({
        pages: ['pages/index/index'],
        subPackages: [
          { root: 'packageA', pages: ['pages/detail/index'] }
        ]
      }), 'utf-8');

      await fs.ensureDir(path.join(srcDir, 'pages', 'index'));
      await fs.writeFile(path.join(srcDir, 'pages', 'index', 'index.jsx'),
        'export default function Index() { return <view><text>Main</text></view>; }\n', 'utf-8');

      // Sub-package page
      const subPageDir = path.join(srcDir, 'packageA', 'pages', 'detail');
      await fs.ensureDir(subPageDir);
      await fs.writeFile(path.join(subPageDir, 'index.jsx'),
        'import { t } from "@rsmax/i18n";\n' +
        'export default function Detail() { return <view><text>{t("hello")}</text></view>; }\n', 'utf-8');

      // Sub-package component deeper in tree also uses i18n
      const subCompDir = path.join(srcDir, 'packageA', 'components', 'tag');
      await fs.ensureDir(subCompDir);
      await fs.writeFile(path.join(subCompDir, 'index.jsx'),
        'import { t } from "@rsmax/i18n";\n' +
        'export default function Tag() { return <view><text>{t("hello")}</text></view>; }\n', 'utf-8');
      await fs.writeFile(path.join(subCompDir, 'index.json'), JSON.stringify({ component: true }), 'utf-8');

      await compile(srcDir, distDir);

      // Sub-package component path: packageA/components/tag → relative to main root is ../../..
      const compJs = await fs.readFile(path.join(distDir, 'packageA', 'components', 'tag', 'index.js'), 'utf-8');
      expect(compJs).toContain('../../../rsmax-i18n.js');
      expect(compJs).toContain('Component(');
    });
  });

  describe('app global styles compilation', () => {
    let tmpDir;
    let srcDir;
    let distDir;

    beforeEach(async () => {
      tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'rsmax-appstyle-test-'));
      srcDir = path.join(tmpDir, 'src');
      distDir = path.join(tmpDir, 'dist');
      await fs.ensureDir(srcDir);
      await fs.ensureDir(path.join(srcDir, 'pages', 'index'));
      await fs.writeFile(path.join(srcDir, 'pages', 'index', 'index.jsx'),
        'export default function Index() { return <view><text>Hello</text></view>; }\n', 'utf-8');
      await fs.writeFile(path.join(srcDir, 'app.json'), JSON.stringify({pages: ['pages/index/index']}), 'utf-8');
    });

    afterEach(async () => {
      await fs.remove(tmpDir);
    });

    test('should copy app.wxss to dist/app.wxss', async () => {
      await fs.writeFile(path.join(srcDir, 'app.js'), 'App({})', 'utf-8');
      await fs.writeFile(path.join(srcDir, 'app.wxss'), 'page { background: #fff; }', 'utf-8');

      await compile(srcDir, distDir);

      expect(await fs.pathExists(path.join(distDir, 'app.wxss'))).toBe(true);
      const content = await fs.readFile(path.join(distDir, 'app.wxss'), 'utf-8');
      expect(content).toContain('background');
    });

    test('should compile app.less to dist/app.wxss', async () => {
      await fs.writeFile(path.join(srcDir, 'app.js'), 'App({})', 'utf-8');
      await fs.writeFile(path.join(srcDir, 'app.less'),
        '@bg: #f5f5f5;\npage { background-color: @bg; }\n.container { padding: 20px; }', 'utf-8');

      await compile(srcDir, distDir);

      expect(await fs.pathExists(path.join(distDir, 'app.wxss'))).toBe(true);
      const content = await fs.readFile(path.join(distDir, 'app.wxss'), 'utf-8');
      expect(content).toContain('#f5f5f5');
      expect(content).toContain('padding: 20rpx'); // px→rpx conversion
    });

    test('should compile app.css to dist/app.wxss', async () => {
      await fs.writeFile(path.join(srcDir, 'app.js'), 'App({})', 'utf-8');
      await fs.writeFile(path.join(srcDir, 'app.css'), 'page { color: red; }', 'utf-8');

      await compile(srcDir, distDir);

      expect(await fs.pathExists(path.join(distDir, 'app.wxss'))).toBe(true);
      const content = await fs.readFile(path.join(distDir, 'app.wxss'), 'utf-8');
      expect(content).toContain('color: red');
    });

    test('should compile app.scss to dist/app.wxss', async () => {
      await fs.writeFile(path.join(srcDir, 'app.js'), 'App({})', 'utf-8');
      await fs.writeFile(path.join(srcDir, 'app.scss'),
        '$color: #333;\npage { color: $color; }', 'utf-8');

      await compile(srcDir, distDir);

      expect(await fs.pathExists(path.join(distDir, 'app.wxss'))).toBe(true);
      const content = await fs.readFile(path.join(distDir, 'app.wxss'), 'utf-8');
      expect(content).toContain('#333');
    });

    test('should compile app.wxss when app.js uses ES module syntax (import) but no export default', async () => {
      // This is the case for e2e/src/app.js which uses import but no export default
      await fs.writeFile(path.join(srcDir, 'app.js'),
        'import { initI18n } from "@rsmax/i18n";\ninitI18n({ locale: "zh-CN" });\nApp({})', 'utf-8');
      await fs.writeFile(path.join(srcDir, 'app.wxss'), 'page { background: #f5f5f5; }', 'utf-8');

      await compile(srcDir, distDir);

      expect(await fs.pathExists(path.join(distDir, 'app.wxss'))).toBe(true);
      const content = await fs.readFile(path.join(distDir, 'app.wxss'), 'utf-8');
      expect(content).toContain('background: #f5f5f5');
    });
  });

  describe('standalone config files', () => {
    let tmpDir;
    let srcDir;
    let distDir;

    beforeEach(async () => {
      tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'rsmax-config-test-'));
      srcDir = path.join(tmpDir, 'src');
      distDir = path.join(tmpDir, 'dist');
      await fs.ensureDir(srcDir);
      await fs.ensureDir(path.join(srcDir, 'pages', 'index'));
      await fs.writeFile(path.join(srcDir, 'pages', 'index', 'index.js'),
        'Page({ data: {} })', 'utf-8');
      await fs.writeFile(path.join(srcDir, 'pages', 'index', 'index.wxml'),
        '<view>Hello</view>', 'utf-8');
      await fs.writeFile(path.join(srcDir, 'app.js'), 'App({})', 'utf-8');
      await fs.writeFile(path.join(srcDir, 'app.json'),
        JSON.stringify({pages: ['pages/index/index']}), 'utf-8');
    });

    afterEach(async () => {
      await fs.remove(tmpDir);
    });

    test('should copy theme.json to dist root', async () => {
      await fs.writeFile(path.join(srcDir, 'theme.json'),
        JSON.stringify({light: {bgColor: '#fff'}, dark: {bgColor: '#000'}}), 'utf-8');

      await compile(srcDir, distDir);

      expect(await fs.pathExists(path.join(distDir, 'theme.json'))).toBe(true);
      const content = await fs.readJson(path.join(distDir, 'theme.json'));
      expect(content.light.bgColor).toBe('#fff');
    });

    test('should copy sitemap.json to dist root', async () => {
      await fs.writeFile(path.join(srcDir, 'sitemap.json'),
        JSON.stringify({desc: 'about', rules: []}), 'utf-8');

      await compile(srcDir, distDir);

      expect(await fs.pathExists(path.join(distDir, 'sitemap.json'))).toBe(true);
    });

    test('should copy standalone .json files in pages directory (not paired with JS)', async () => {
      // A standalone JSON config file without a same-named JS should be copied
      const pageDir = path.join(srcDir, 'pages', 'index');
      await fs.writeFile(path.join(pageDir, 'extra.json'),
        JSON.stringify({key: 'value'}), 'utf-8');

      await compile(srcDir, distDir);

      expect(await fs.pathExists(path.join(distDir, 'pages', 'index', 'extra.json'))).toBe(true);
    });
  });
});
