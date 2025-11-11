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

export function testBuildMiniPlugin(app: string, target: Platform = 'ali', outputPath?: string, options?: any) {
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
    // 统一 __webpack_require__(123) 的数字 ID
    .replace(/__webpack_require__\((\d+)\)/g, '__webpack_require__(<ID>)')
    // 统一 [123] 这类索引
    .replace(/\[(\d+)\]/g, '[<ID>]')
    // 统一长哈希为占位符
    .replace(/[a-f0-9]{20,}/gi, '<HASH>')
    // 统一 chunk 文件名中的数字片段
    .replace(/(-|\.)\d+(\.js)/g, '$1<ID>$2')
    // 统一 ESM import 变量名：去掉可能包含绝对路径/包名前缀，只保留 __WEBPACK_IMPORTED_MODULE_<ID>__
    .replace(/[A-Za-z0-9_\/\\.-]*(__WEBPACK_IMPORTED_MODULE_\d+__)/g, '$1');
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
