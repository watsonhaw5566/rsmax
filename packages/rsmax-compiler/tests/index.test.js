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
  compile
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
      expect(getFileType('/project/src/app.js')).toBe('app');
      expect(getFileType('/project/src/app.jsx')).toBe('app');
    });

    test('should detect component files in components directory', () => {
      expect(getFileType('/project/src/components/button/index.js')).toBe('component');
      expect(getFileType('/project/src/components/MyComponent.jsx')).toBe('component');
    });

    test('should detect page files', () => {
      expect(getFileType('/project/src/pages/index/index.js')).toBe('page');
      expect(getFileType('/project/src/home.jsx')).toBe('page');
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
});
