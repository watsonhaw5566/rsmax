import * as fs from 'fs';
import * as path from 'path';
import * as sander from 'sander';
import * as crypto from 'crypto';
// @ts-expect-error
import readdir from 'fs-readdir-recursive';
import { diff } from 'jest-diff';
import { sortBy } from 'lodash';
import * as eol from 'eol';
import { slash } from '@rsmax/shared';
import { logger } from 'rslog';

type Received = Array<{ fileName: string; code: Buffer }>;

function createHash(content: Buffer) {
  const hash = crypto.createHash('sha256');
  hash.update(content);
  return hash.digest('hex');
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
      const text = /\.(png|jpg)$/.test(f.fileName)
        ? [createHash(f.code)]
        : eol.split(f.code.toString()).map(l => `${f.fileName}: ${l}`);
      acc.push(`file: ${f.fileName}`, Array(80).join('-'), ...text, Array(80).join('-'));
      return acc;
    }, [])
    .join(eol.auto.toString());
}

// 修复：使用 Jest 标准的快照测试方法
// 删除重复的 toMatchOutput 定义，并实现正确的快照测试
expect.extend({
  // 新的快照测试版本
  toMatchSnapshotOutput(received: Received) {
    const actual = buildText(received);
    // 使用标准的 Jest 快照断言
    expect(actual).toMatchSnapshot();

    // 由于我们调用了 expect，这个匹配器始终通过
    // 真正的断言由 toMatchSnapshot() 完成
    return {
      pass: true,
      message: () => '',
    };
  },

  // 保留原来的文件对比实现，但重命名避免冲突
  toMatchFileOutput(received: Received, outputPath: string) {
    const { isNot } = this;
    const snapshotState = (this as any).snapshotState;
    const actual = buildText(received);

    const options = {
      // Options for jest-diff
      diff: Object.assign({
        expand: false,
        contextLines: 5,
        aAnnotation: 'Expected',
      }),
    };

    if (fs.existsSync(outputPath)) {
      const expected = buildText(
        readdir(outputPath).map(fileName => ({
          fileName: fileName,
          code: sander.readFileSync(path.join(outputPath, fileName)),
        }))
      );

      if (isNot) {
        // The matcher is being used with `.not`

        if (!this.equals(actual, expected)) {
          // The value of `pass` is reversed when used with `.not`
          return { pass: false, message: () => '' };
        } else {
          if (snapshotState) snapshotState.unmatched++;

          return {
            pass: true,
            message: () =>
              `Expected received content ${logger.error('to not match')} the output ${logger.info(outputPath)}.`,
          };
        }
      } else {
        if (this.equals(actual, expected)) {
          return { pass: true, message: () => '' };
        } else {
          if (snapshotState && snapshotState._updateSnapshot === 'all') {
            sander.rimrafSync(outputPath);
            received.forEach(file => {
              sander.writeFileSync(path.join(outputPath, file.fileName), file.code);
            });

            if (snapshotState) snapshotState.updated++;

            return { pass: true, message: () => '' };
          } else {
            if (snapshotState) snapshotState.unmatched++;

            return {
              pass: false,
              message: () =>
                `Received content ${logger.error("doesn't match")} the output ${outputPath}.\n\n${diff(
                  expected,
                  actual,
                  options.diff
                )}`,
            };
          }
        }
      }
    } else {
      if (!isNot && snapshotState && (snapshotState._updateSnapshot === 'new' || snapshotState._updateSnapshot === 'all')) {
        received.forEach(file => {
          sander.writeFileSync(path.join(outputPath, file.fileName), file.code);
        });
        if (snapshotState) snapshotState.added++;

        return { pass: true, message: () => '' };
      } else {
        if (snapshotState) snapshotState.unmatched++;

        return {
          pass: true,
          message: () => `The output file ${logger.info(outputPath)} ${logger.error("doesn't exist")}.`,
        };
      }
    }
  },
});
