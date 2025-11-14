import fs from 'node:fs';
import path from 'node:path';

import crypto from 'crypto';
import fg from 'fast-glob';
import { diff } from 'jest-diff';
import { sortBy } from 'lodash';
import eol from 'eol';
import { slash } from '@rsmax/shared';
import { logger } from 'rslog';

type Received = Array<{
  fileName: string;
  code: Buffer;
}>;

function createHash(content: Buffer) {
  const hash = crypto.createHash('sha256');
  hash.update(content);
  return hash.digest('hex');
}

// 新增：统一归一化构建产物中的不稳定片段（moduleId、长哈希、chunk 文件名等）
function normalizeJsContent(input: string) {
  return input
    // 针对 __webpack_require__(123) 之类的调用，把数字 ID 替换为占位符
    .replace(/__webpack_require__\((\d+)\)/g, '__webpack_require__(<ID>)')
    // 替换形如 "modules[123]" 或 "installedChunks[3]" 的索引写法
    .replace(/\[(\d+)\]/g, '[<ID>]')
    // 替换可能出现的长内容哈希（20+位十六进制）为占位符
    .replace(/[a-f0-9]{20,}/gi, '<HASH>')
    // 替换 chunk 文件名中常见的 id/hash 片段，比如 vendors-abc123.js
    .replace(/(-|\.)\d+(\.js)/g, '$1<ID>$2')
    // 统一规范 ESM import 变量名：去掉前缀（可能包含绝对路径或包名），只保留 __WEBPACK_IMPORTED_MODULE_<ID>__ 后缀
    .replace(/[A-Za-z0-9_\/\\.-]*(__WEBPACK_IMPORTED_MODULE_\d+__)/g, '$1');
}

function buildText(files: Received) {
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

expect.extend({
  toMatchOutput(received: Received, output) {
    const { isNot } = this;
    const snapshotState = (this as any).snapshotState;
    const actual = buildText(received);

    const options = {
      // Options for jest-diff
      diff: Object.assign({
        expand: false,
        contextLines: 5,
        aAnnotation: 'Snapshot',
      }),
    };

    if (fs.existsSync(output)) {
      const expected = buildText(
        fg.sync('**/*', { cwd: output, dot: true, onlyFiles: true }).map(fileName => ({
          fileName,
          code: fs.readFileSync(path.join(output, fileName)),
        }))
      );

      if (isNot) {
        // The matcher is being used with `.not`

        if (!this.equals(actual, expected)) {
          // The value of `pass` is reversed when used with `.not`
          return { pass: false, message: () => '' };
        } else {
          snapshotState.unmatched++;

          return {
            pass: true,
            message: () =>
              `Expected received content ${logger.error('to not match')} the output ${logger.info(output)}.`,
          };
        }
      } else {
        if (this.equals(actual, expected)) {
          return { pass: true, message: () => '' };
        } else {
          if (snapshotState._updateSnapshot === 'all') {
            fs.rmSync(output, { recursive: true, force: true });
            received.forEach(file => {
              const target = path.join(output, file.fileName);
              fs.mkdirSync(path.dirname(target), { recursive: true });
              fs.writeFileSync(target, file.code);
            });

            snapshotState.updated++;

            return { pass: true, message: () => '' };
          } else {
            snapshotState.unmatched++;

            return {
              pass: false,
              message: () =>
                `Received content ${logger.error("doesn't match")} the output ${output}.\n\n${diff(
                  expected,
                  actual,
                  options.diff
                )}`,
            };
          }
        }
      }
    } else {
      if (!isNot && (snapshotState._updateSnapshot === 'new' || snapshotState._updateSnapshot === 'all')) {
        received.forEach(file => {
          const target = path.join(output, file.fileName);
          fs.mkdirSync(path.dirname(target), { recursive: true });
          fs.writeFileSync(target, file.code);
        });
        snapshotState.added++;

        return { pass: true, message: () => '' };
      } else {
        snapshotState.unmatched++;

        return {
          pass: true,
          message: () => `The output file ${logger.info(output)} ${logger.error("doesn't exist")}.`,
        };
      }
    }
  },
});
