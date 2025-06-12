import { buildDsl } from './buildDsl';
import { buildEsm } from './buildEsm';
import { type IOptions, getConfig } from './getConfig';
import type { IArgv } from './types';

export default function build(cwd: string, argv: IArgv) {
  const options = getConfig(argv, { cwd });
  buildComponent(cwd, options);
}

// 组件构建
export function buildComponent(cwd: string, options: IOptions) {
  const { type, sourceDir, output, onTargetDir, watch, babelrc, mini = {}, esm = {} } = options;

  if (type === 'esm') {
    return buildEsm({
      cwd,
      rootPath: sourceDir,
      output,
      watch,
      babelrc,
      onTargetDir,
      esmOptions: esm,
    });
  }if (type === 'ali' || type === 'wechat') {
    return buildDsl({
      cwd,
      sourceDir,
      output,
      watch,
      onTargetDir,
      babelrc,
      type,
      miniOptions: mini,
    });
  }
    throw Error('未知构建类型');
}
