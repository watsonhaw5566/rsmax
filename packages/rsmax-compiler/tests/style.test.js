const { test, expect, describe, beforeEach, afterEach } = require('@rstest/core');
const fs = require('fs-extra');
const path = require('node:path');
const os = require('node:os');
const { compileStyle, compileStyleFile, compile, compileFile, processStyle, isModuleFile } = require('../index');

describe('@rsmax/compiler style processing', () => {
  let tempDir;

  beforeEach(async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'rsmax-test-'));
  });

  afterEach(async () => {
    await fs.remove(tempDir);
  });

  describe('compileStyle', () => {
    test('should compile wxss with px to rpx conversion', async () => {
      const wxss = `
.container {
  width: 750px;
  height: 200px;
  border: 1PX solid #ccc;
}
      `;
      const filePath = path.join(tempDir, 'test.wxss');
      await fs.writeFile(filePath, wxss, 'utf-8');

      const result = await compileStyle(filePath);
      expect(result).toContain('width: 750rpx');
      expect(result).toContain('height: 200rpx');
      expect(result).toContain('border: 1px solid #ccc');
    });

    test('should compile less files with variables', async () => {
      const less = `
@primary-color: #ff0000;
@size: 100px;
.container {
  width: 750px;
  .title {
    color: @primary-color;
    font-size: 32px;
    border: 2PX solid #000;
    width: @size;
  }
}
      `;
      const filePath = path.join(tempDir, 'test.less');
      await fs.writeFile(filePath, less, 'utf-8');

      const result = await compileStyle(filePath);
      expect(result).toContain('width: 750rpx');
      expect(result).toContain('color: #ff0000');
      expect(result).toContain('font-size: 32rpx');
      expect(result).toContain('border: 2px solid #000');
      expect(result).toContain('width: 100rpx');
    });

    test('should compile scss files with mixins', async () => {
      const scss = `
$primary-color: #00ff00;
@mixin flex {
  display: flex;
}
.container {
  width: 375px;
  @include flex;
  .box {
    width: 100px;
    height: 100PX;
    background: $primary-color;
  }
}
      `;
      const filePath = path.join(tempDir, 'test.scss');
      await fs.writeFile(filePath, scss, 'utf-8');

      const result = await compileStyle(filePath);
      expect(result).toContain('width: 375rpx');
      expect(result).toContain('display: flex');
      expect(result).toContain('width: 100rpx');
      expect(result).toContain('height: 100px');
      expect(result).toContain('background: #00ff00');
    });

    test('should compile sass (indented syntax) files', async () => {
      const sassContent = `
.primary
  color: #0000ff
  width: 200px
  border: 1Px solid red
      `;
      const filePath = path.join(tempDir, 'test.sass');
      await fs.writeFile(filePath, sassContent, 'utf-8');

      const result = await compileStyle(filePath);
      expect(result).toContain('color: #0000ff');
      expect(result).toContain('width: 200rpx');
      expect(result).toContain('border: 1px solid red');
    });

    test('should handle less @import', async () => {
      const variables = `
@base-padding: 20px;
      `;
      const mainLess = `
@import "variables";
.container {
  padding: @base-padding;
  width: 100px;
}
      `;
      await fs.writeFile(path.join(tempDir, 'variables.less'), variables, 'utf-8');
      const mainPath = path.join(tempDir, 'main.less');
      await fs.writeFile(mainPath, mainLess, 'utf-8');

      const result = await compileStyle(mainPath);
      expect(result).toContain('padding: 20rpx');
      expect(result).toContain('width: 100rpx');
    });
  });

  describe('compileFile', () => {
    test('should compile wxss files to wxss with px conversion', async () => {
      const sourceDir = path.join(tempDir, 'src');
      const distDir = path.join(tempDir, 'dist');
      await fs.ensureDir(sourceDir);

      const wxssContent = `.box { width: 100px; border: 1PX solid #000; }`;
      await fs.writeFile(path.join(sourceDir, 'test.wxss'), wxssContent, 'utf-8');

      await compileFile(
        path.join(sourceDir, 'test.wxss'),
        path.join(distDir, 'test.wxss'),
        { targetRoot: distDir }
      );

      const output = await fs.readFile(path.join(distDir, 'test.wxss'), 'utf-8');
      expect(output).toContain('width: 100rpx');
      expect(output).toContain('border: 1px solid #000');
    });

    test('should compile less files to wxss', async () => {
      const sourceDir = path.join(tempDir, 'src');
      const distDir = path.join(tempDir, 'dist');
      await fs.ensureDir(sourceDir);

      const lessContent = `.box { width: 200px; height: 100PX; }`;
      await fs.writeFile(path.join(sourceDir, 'test.less'), lessContent, 'utf-8');

      await compileFile(
        path.join(sourceDir, 'test.less'),
        path.join(distDir, 'test.less'),
        { targetRoot: distDir }
      );

      const output = await fs.readFile(path.join(distDir, 'test.wxss'), 'utf-8');
      expect(output).toContain('width: 200rpx');
      expect(output).toContain('height: 100px');
    });
  });

  describe('compile directory', () => {
    test('should compile a project with less styles', async () => {
      const sourceDir = path.join(tempDir, 'src');
      const distDir = path.join(tempDir, 'dist');

      await fs.ensureDir(path.join(sourceDir, 'pages/index'));

      await fs.writeFile(path.join(sourceDir, 'app.js'), `
App({
  onLaunch() {}
})
      `, 'utf-8');

      await fs.writeFile(path.join(sourceDir, 'app.json'), JSON.stringify({
        pages: ['pages/index/index']
      }), 'utf-8');

      await fs.writeFile(path.join(sourceDir, 'app.wxss'), `
page {
  font-size: 28px;
  background: #f5f5f5;
}
      `, 'utf-8');

      await fs.writeFile(path.join(sourceDir, 'pages/index/index.jsx'), `
export default function Index() {
  return <view class="container">Hello</view>;
}
      `, 'utf-8');

      await fs.writeFile(path.join(sourceDir, 'pages/index/index.json'), JSON.stringify({}), 'utf-8');

      await fs.writeFile(path.join(sourceDir, 'pages/index/index.less'), `
@bg: #ffffff;
.container {
  width: 750px;
  padding: 40px;
  background: @bg;
  border: 1PX solid #eee;
}
      `, 'utf-8');

      await compile(sourceDir, distDir);

      const appWxss = await fs.readFile(path.join(distDir, 'app.wxss'), 'utf-8');
      expect(appWxss).toContain('font-size: 28rpx');

      const pageWxss = await fs.readFile(path.join(distDir, 'pages/index/index.wxss'), 'utf-8');
      expect(pageWxss).toContain('width: 750rpx');
      expect(pageWxss).toContain('padding: 40rpx');
      expect(pageWxss).toContain('background: #ffffff');
      expect(pageWxss).toContain('border: 1px solid #eee');

      expect(await fs.pathExists(path.join(distDir, 'pages/index/index.js'))).toBe(true);
      expect(await fs.pathExists(path.join(distDir, 'pages/index/index.wxml'))).toBe(true);
    });
  });

  describe('css support', () => {
    test('should compile plain .css files like wxss', async () => {
      const css = `.container { width: 750px; height: 200px; border: 1PX solid #ccc; }`;
      const filePath = path.join(tempDir, 'test.css');
      await fs.writeFile(filePath, css, 'utf-8');

      const result = await compileStyle(filePath);
      expect(result).toContain('width: 750rpx');
      expect(result).toContain('height: 200rpx');
      expect(result).toContain('border: 1px solid #ccc');
    });

    test('should compile .css file to .wxss via compileFile', async () => {
      const sourceDir = path.join(tempDir, 'src');
      const distDir = path.join(tempDir, 'dist');
      await fs.ensureDir(sourceDir);

      const cssContent = `.box { width: 300px; }`;
      await fs.writeFile(path.join(sourceDir, 'test.css'), cssContent, 'utf-8');

      await compileFile(
        path.join(sourceDir, 'test.css'),
        path.join(distDir, 'test.css'),
        { targetRoot: distDir }
      );

      const output = await fs.readFile(path.join(distDir, 'test.wxss'), 'utf-8');
      expect(output).toContain('width: 300rpx');
    });

    test('should use .css as same-name style for jsx pages', async () => {
      const sourceDir = path.join(tempDir, 'src');
      const distDir = path.join(tempDir, 'dist');

      await fs.ensureDir(path.join(sourceDir, 'pages/index'));

      await fs.writeFile(path.join(sourceDir, 'app.js'), `App({ onLaunch() {} })`, 'utf-8');
      await fs.writeFile(path.join(sourceDir, 'app.json'), JSON.stringify({ pages: ['pages/index/index'] }), 'utf-8');
      await fs.writeFile(path.join(sourceDir, 'pages/index/index.jsx'), `
export default function Index() {
  return <view class="container">Hello</view>;
}
      `, 'utf-8');
      await fs.writeFile(path.join(sourceDir, 'pages/index/index.json'), JSON.stringify({}), 'utf-8');
      await fs.writeFile(path.join(sourceDir, 'pages/index/index.css'), `
.container {
  width: 750px;
  padding: 20px;
}
      `, 'utf-8');

      await compile(sourceDir, distDir);

      const pageWxss = await fs.readFile(path.join(distDir, 'pages/index/index.wxss'), 'utf-8');
      expect(pageWxss).toContain('width: 750rpx');
      expect(pageWxss).toContain('padding: 20rpx');
    });
  });

  describe('css modules', () => {
    test('isModuleFile should detect .module.css/less/scss/sass', () => {
      expect(isModuleFile('index.module.css')).toBe(true);
      expect(isModuleFile('index.module.less')).toBe(true);
      expect(isModuleFile('index.module.scss')).toBe(true);
      expect(isModuleFile('index.module.sass')).toBe(true);
      expect(isModuleFile('index.css')).toBe(false);
      expect(isModuleFile('index.less')).toBe(false);
      expect(isModuleFile('styles.css')).toBe(false);
      expect(isModuleFile('module.css')).toBe(false);
    });

    test('should hash class names in .module.css and return classNames map', async () => {
      const css = `.container { width: 750px; } .title { font-size: 32px; }`;
      const filePath = path.join(tempDir, 'index.module.css');
      await fs.writeFile(filePath, css, 'utf-8');

      const { css: outputCss, classNames } = await compileStyleFile(filePath);
      expect(outputCss).toContain('width: 750rpx');
      expect(outputCss).toContain('font-size: 32rpx');
      expect(classNames).toBeDefined();
      expect(classNames.container).toBeDefined();
      expect(classNames.title).toBeDefined();
      expect(classNames.container).not.toBe('container');
      expect(classNames.container).toMatch(/^container__/);
      expect(outputCss).toContain('.' + classNames.container);
      expect(outputCss).not.toContain('.container ');
    });

    test('should hash class names in .module.less', async () => {
      const less = `
@color: #ff0000;
.wrapper {
  width: 100px;
  .text {
    color: @color;
    font-size: 28px;
  }
}
      `;
      const filePath = path.join(tempDir, 'comp.module.less');
      await fs.writeFile(filePath, less, 'utf-8');

      const { css: outputCss, classNames } = await compileStyleFile(filePath);
      expect(classNames.wrapper).toMatch(/^wrapper__/);
      expect(classNames.text).toMatch(/^text__/);
      expect(outputCss).toContain('.' + classNames.wrapper);
      expect(outputCss).toContain('.' + classNames.text);
      expect(outputCss).toContain('width: 100rpx');
      expect(outputCss).toContain('color: #ff0000');
    });

    test('should hash class names in .module.scss', async () => {
      const scss = `
.box {
  width: 200px;
  .inner {
    height: 100px;
  }
}
      `;
      const filePath = path.join(tempDir, 'style.module.scss');
      await fs.writeFile(filePath, scss, 'utf-8');

      const { css: outputCss, classNames } = await compileStyleFile(filePath);
      expect(classNames.box).toMatch(/^box__/);
      expect(classNames.inner).toMatch(/^inner__/);
      expect(outputCss).toContain('.' + classNames.box);
      expect(outputCss).toContain('.' + classNames.inner);
      expect(outputCss).toContain('width: 200rpx');
    });

    test('should replace CSS Modules import with const styles = {...}', async () => {
      const sourceDir = path.join(tempDir, 'src');
      const distDir = path.join(tempDir, 'dist');

      await fs.ensureDir(path.join(sourceDir, 'pages/index'));

      await fs.writeFile(path.join(sourceDir, 'app.js'), `App({ onLaunch() {} })`, 'utf-8');
      await fs.writeFile(path.join(sourceDir, 'app.json'), JSON.stringify({ pages: ['pages/index/index'] }), 'utf-8');

      await fs.writeFile(path.join(sourceDir, 'pages/index/index.jsx'), `
import styles from './index.module.css';
export default function Index() {
  return <view className={styles.container}>
    <text className={styles.title}>Hello</text>
  </view>;
}
      `, 'utf-8');
      await fs.writeFile(path.join(sourceDir, 'pages/index/index.json'), JSON.stringify({}), 'utf-8');

      await fs.writeFile(path.join(sourceDir, 'pages/index/index.module.css'), `
.container {
  width: 750px;
  padding: 20px;
}
.title {
  font-size: 32px;
  color: #333;
}
      `, 'utf-8');

      await compile(sourceDir, distDir);

      const pageWxss = await fs.readFile(path.join(distDir, 'pages/index/index.wxss'), 'utf-8');
      expect(pageWxss).toContain('@import');
      expect(pageWxss).toContain('index.module.wxss');

      const moduleWxss = await fs.readFile(path.join(distDir, 'pages/index/index.module.wxss'), 'utf-8');
      expect(moduleWxss).toContain('width: 750rpx');
      expect(moduleWxss).toContain('font-size: 32rpx');
      expect(moduleWxss).not.toMatch(/\.container\s*\{/);

      const pageJs = await fs.readFile(path.join(distDir, 'pages/index/index.js'), 'utf-8');
      expect(pageJs).toContain('const styles = {');
      expect(pageJs).not.toContain("require('./index.module.css')");
      expect(pageJs).not.toContain("from './index.module.css'");
      expect(pageJs).toMatch(/container:\s*"container__/);
      expect(pageJs).toMatch(/title:\s*"title__/);

      const pageWxml = await fs.readFile(path.join(distDir, 'pages/index/index.wxml'), 'utf-8');
      expect(pageWxml).toContain('class="{{styles.container}}"');
      expect(pageWxml).toContain('class="{{styles.title}}"');
    });

    test('should handle plain css import (remove import and @import wxss)', async () => {
      const sourceDir = path.join(tempDir, 'src');
      const distDir = path.join(tempDir, 'dist');

      await fs.ensureDir(path.join(sourceDir, 'pages/index'));

      await fs.writeFile(path.join(sourceDir, 'app.js'), `App({ onLaunch() {} })`, 'utf-8');
      await fs.writeFile(path.join(sourceDir, 'app.json'), JSON.stringify({ pages: ['pages/index/index'] }), 'utf-8');

      await fs.writeFile(path.join(sourceDir, 'pages/index/index.jsx'), `
import './common.css';
export default function Index() {
  return <view className="box">Hello</view>;
}
      `, 'utf-8');
      await fs.writeFile(path.join(sourceDir, 'pages/index/index.json'), JSON.stringify({}), 'utf-8');
      await fs.writeFile(path.join(sourceDir, 'pages/index/index.wxss'), `
.box { width: 100px; }
      `, 'utf-8');
      await fs.writeFile(path.join(sourceDir, 'pages/index/common.css'), `
.common {
  color: red;
  font-size: 28px;
}
      `, 'utf-8');

      await compile(sourceDir, distDir);

      const pageWxss = await fs.readFile(path.join(distDir, 'pages/index/index.wxss'), 'utf-8');
      expect(pageWxss).toContain('@import "./common.wxss";');
      expect(pageWxss).toContain('width: 100rpx');

      const commonWxss = await fs.readFile(path.join(distDir, 'pages/index/common.wxss'), 'utf-8');
      expect(commonWxss).toContain('color: red');
      expect(commonWxss).toContain('font-size: 28rpx');

      const pageJs = await fs.readFile(path.join(distDir, 'pages/index/index.js'), 'utf-8');
      expect(pageJs).not.toContain("common.css");
      expect(pageJs).not.toContain("require('./common.css')");
    });

    test('should support CSS Modules with less and custom localName', async () => {
      const sourceDir = path.join(tempDir, 'src');
      const distDir = path.join(tempDir, 'dist');

      await fs.ensureDir(path.join(sourceDir, 'pages/index'));

      await fs.writeFile(path.join(sourceDir, 'app.js'), `App({ onLaunch() {} })`, 'utf-8');
      await fs.writeFile(path.join(sourceDir, 'app.json'), JSON.stringify({ pages: ['pages/index/index'] }), 'utf-8');

      await fs.writeFile(path.join(sourceDir, 'pages/index/index.jsx'), `
const cls = require('./index.module.less');
export default function Index() {
  return <view className={cls.wrapper}><text className={cls.hi}>Hi</text></view>;
}
      `, 'utf-8');
      await fs.writeFile(path.join(sourceDir, 'pages/index/index.json'), JSON.stringify({}), 'utf-8');

      await fs.writeFile(path.join(sourceDir, 'pages/index/index.module.less'), `
@bg: #f0f0f0;
.wrapper {
  background: @bg;
  width: 750px;
}
.hi {
  color: blue;
  font-size: 30px;
}
      `, 'utf-8');

      await compile(sourceDir, distDir);

      const pageJs = await fs.readFile(path.join(distDir, 'pages/index/index.js'), 'utf-8');
      expect(pageJs).toContain('const cls = {');
      expect(pageJs).toMatch(/wrapper:\s*"wrapper__/);
      expect(pageJs).toMatch(/hi:\s*"hi__/);

      const pageWxml = await fs.readFile(path.join(distDir, 'pages/index/index.wxml'), 'utf-8');
      expect(pageWxml).toContain('class="{{cls.wrapper}}"');
      expect(pageWxml).toContain('class="{{cls.hi}}"');
    });

    test('should not apply CSS Modules to non-module .css files', async () => {
      const css = `.box { width: 100px; } .title { color: red; }`;
      const filePath = path.join(tempDir, 'normal.css');
      await fs.writeFile(filePath, css, 'utf-8');

      const { css: outputCss, classNames } = await compileStyleFile(filePath);
      expect(classNames).toBeNull();
      expect(outputCss).toContain('.box {');
      expect(outputCss).toContain('.title {');
      expect(outputCss).toContain('width: 100rpx');
    });
  });
});
