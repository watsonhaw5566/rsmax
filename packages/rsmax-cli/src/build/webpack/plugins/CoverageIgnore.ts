import { Compilation, type Compiler, sources } from '@rspack/core';

const { ConcatSource, RawSource } = sources;

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
            // 检查是否是 node_modules 中的文件
            if (filename.includes('node_modules')) {
              // 获取原始源代码
              const originalSource = asset.source();

              // 创建新的源代码，添加覆盖率忽略注释
              const newSource = new ConcatSource(
                '/* istanbul ignore next */\n',
                originalSource instanceof Buffer ? new RawSource(originalSource) : originalSource
              );

              // 更新资源
              compilation.updateAsset(filename, newSource);
            }
          }
        }
      );
    });
  }
}

export default CoverageIgnorePlugin;
