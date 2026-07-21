import { buildApp, JEST_BUILD_TIMEOUT, buildMiniPlugin, buildMiniComponent } from './build';
import type { Platform } from '@rsmax/types';
import Store from '@rsmax/build-store';
import * as eol from 'eol';
import { sortBy } from 'lodash';
import { slash } from '@rsmax/shared';
import * as crypto from 'crypto';

export function testBuildApp(
  app: string,
  target: Platform = 'ali',
  outputPath?: string,
  options?: any,
  extraRemaxOptions?: any
) {
  it(
    `build ${app} on target ${target}`,
    async () => {
      Store.reset();
      const result = await buildApp(app, target, options, extraRemaxOptions);
      // 使用原生快照
      expect(buildSnapshotText(result as any)).toMatchSnapshot();
    },
    JEST_BUILD_TIMEOUT
  );
}

export function testBuildMiniPlugin(app: string, target: Platform = 'ali', options?: any) {
  it(
    `build ${app} on target ${target}`,
    async () => {
      Store.reset();
      const result = await buildMiniPlugin(app, target, options);
      // 使用原生快照
      expect(buildSnapshotText(result as any)).toMatchSnapshot();
    },
    JEST_BUILD_TIMEOUT
  );
}

type Inputs = { [k: string]: string };

export function testBuildMiniComponent(
  app: string,
  inputs: Inputs,
  targets: Platform[] = ['ali'],
  outputPath?: string,
  options: any = {}
) {
  targets.forEach(target => {
    it(
      `build ${app} on target ${target}`,
      async () => {
        Store.reset();
        const result = await buildMiniComponent(app, inputs, target, options);
        // 使用原生快照
        expect(buildSnapshotText(result as any)).toMatchSnapshot();
      },
      JEST_BUILD_TIMEOUT
    );
  });
}

type Received = Array<{
  fileName: string;
  code: Buffer;
}>;

function createHash(content: Buffer) {
  const hash = crypto.createHash('sha256');
  hash.update(content);
  return hash.digest('hex');
}

function normalizeJsContent(input: string) {
  return input
    // 1. rspack 内部标识归一化（抹平 1.6/1.7 内部命名差异）
    .replace(/__rspack_jsonp/g, 'webpackJsonpCallback')
    .replace(/__unused_rspack_module/g, '__unused_webpack_module')
    .replace(/__unused_rspack_exports/g, '__unused_webpack_exports')

    // 2. rspack 版本号归一化（仅在 rspack 专属位置匹配，避免误伤 React 18.2.0 等）
    .replace(/rspack@\d+\.\d+\.\d+/gi, 'rspack@<VERSION>')
    .replace(/(rv = \(\) => \("\d+\.\d+\.\d+")/g, 'rv = () => ("<VERSION>")')

    // 3. 模块 ID 与 require/exec 归一化
    //    3a. 简写方法定义 `1234(params) {` → ` <ID>: (function (params) {`（rspack 1.7 新格式）
    .replace(/(^|[\s,;])(\d+)\(([^)]*)\)\s*\{/gm, '$1<ID>: (function ($3) {')
    //    3b. 对象属性键 `1834: (function ...` / `92: function(...` → `<ID>: (function...`
    .replace(/(^|[\s,;])(\d+):(\s+(?:\(|function\b))/gm, '$1<ID>:$3')
    //    3c. 模块结尾 `},` → `}),` 仅当后面紧跟另一个 <ID>: (function 模块定义
    .replace(/(\})(,\s*\n\s*<ID>:\s*\(function)/g, '$1)$2')
    //    3d. 模块结尾 `},` → `}),` 仅当后面是模块对象结尾 `}]`
    .replace(/(\})(,\s*\n\s*\}\])/g, '$1)$2')
    //    3e. 模块结尾 `},` → `}),` 仅当后面是 chunk loading 函数 `,function(`（同一行）
    .replace(/(\})(,\s*function\()/g, '$1)$2')
    //    3f. __webpack_require__(N) / __webpack_exec__(N) / [N] 索引
    .replace(/__webpack_require__\((\d+)\)/g, '__webpack_require__(<ID>)')
    .replace(/__webpack_exec__\((\d+)\)/g, '__webpack_exec__(<ID>)')
    .replace(/\[(\d+)\]/g, '[<ID>]')

    // 4. ESM import 变量名归一化
    //    4a. rspack 1.7 格式 `path__rspack_import_N_default` → `__WEBPACK_IMPORTED_MODULE_N___default`
    .replace(/[A-Za-z0-9_\/\\.-]*__rspack_import_(\d+)_default/g, '__WEBPACK_IMPORTED_MODULE_$1___default')
    //    4b. rspack 1.7 格式 `path__rspack_import_N` → `__WEBPACK_IMPORTED_MODULE_N__`
    .replace(/[A-Za-z0-9_\/\\.-]*__rspack_import_(\d+)\b/g, '__WEBPACK_IMPORTED_MODULE_$1__')
    //    4c. 传统格式：去掉变量名前的绝对路径/包名前缀
    .replace(/[A-Za-z0-9_\/\\.-]*(__WEBPACK_IMPORTED_MODULE_\d+__)/g, '$1')
    //    4d. import 注释后的空格 `/* import */ var` → `/* import */var`
    .replace(/\/\* import \*\/\s+var/g, '/* import */var')

    // 5. 哈希和文件名归一化
    .replace(/[a-f0-9]{20,}/gi, '<HASH>')
    .replace(/(-|\.)\d+(\.js)/g, '$1<ID>$2')

    // 6. 空白字符归一化
    //    6a. `})()\n;` → `})();`（rspack 输出会把尾部分号拆到下一行）
    .replace(/\}\)\(\n;/g, '})();')
    //    6b. 将 3 个或更多连续换行合并为 2 个（即保留一个空行）
    .replace(/\n{3,}/g, '\n\n')
    //    6c. 去除每行尾部空格
    .split(/\r?\n/)
    .map(line => line.replace(/[ \t]+$/g, ''))
    .join('\n');
}

function buildSnapshotText(files: Received) {
  return sortBy(
    files.map(f => ({
      ...f,
      fileName: slash(f.fileName),
    })),
    ['fileName']
  )
    .reduce((acc: string[], f) => {
      const isBinary = /\.(png|jpg)$/.test(f.fileName);
      const codeStr = isBinary ? undefined : normalizeJsContent(f.code.toString());
      const text = isBinary ? [createHash(f.code)] : eol.split(codeStr!).map(l => `${f.fileName}: ${l}`);

      acc.push(`file: ${f.fileName}`, Array(80).join('-'), ...text, Array(80).join('-'));
      return acc;
    }, [])
    .join(eol.auto.toString());
}
