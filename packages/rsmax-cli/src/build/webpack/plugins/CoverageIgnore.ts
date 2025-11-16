import { Compilation, type Compiler, sources } from '@rspack/core';

const { ConcatSource } = sources;

const PLUGIN_NAME = 'RsmaxCoverageIgnorePlugin';

/**
 * 伙伴会为每个小程序构建一个覆盖率包来统计测试覆盖率。
 * 由于我们把 node_modules 的依赖跟业务代码打包到一起了，导致测试覆盖率计算误差很大，
 * 所以为所有 node_modules 下的模块都加上忽略覆盖率的注释
 */
class CoverageIgnorePlugin {
  apply(compiler: Compiler): void {
    compiler.hooks.compilation.tap(PLUGIN_NAME, (compilation: Compilation) => {
      // 使用 processAssets hook 处理资源
      compilation.hooks.processAssets.tap(
        {
          name: PLUGIN_NAME,
          stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONS,
        },
        assets => {
          // 遍历所有资源
          for (const [filename, asset] of Object.entries(assets)) {
            if (filename.includes('node_modules')) {
              const newSource = new ConcatSource('/* istanbul ignore next */\n', asset as any);
              compilation.updateAsset(filename, newSource);
            }
          }
        }
      );
    });
  }
}

export default CoverageIgnorePlugin;
