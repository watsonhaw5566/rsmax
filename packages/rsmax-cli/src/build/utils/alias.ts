import path from 'node:path';
import { slash } from '@rsmax/shared';
import type { Options, Platform } from '@rsmax/types';

interface Alias {
  [key: string]: string;
}

const resolveReact = (options: Options): string => {
  let react: string;
  try {
    react = require.resolve(`${options.cwd}/node_modules/react/`);
  } catch (e) {
    react = require.resolve('react');
  }
  return path.dirname(slash(react));
};

const rsmaxOneRoot = path.dirname(require.resolve('@rsmax/one'));

export default (options: Options, _target: Platform) => {
  const config: Alias = {
    'regenerator-runtime': require.resolve('regenerator-runtime'),
    // 防止 link 开发时加载多个 React
    '@': path.resolve(options.cwd, options.rootDir),
    react: resolveReact(options),
    'react-reconciler': 'react-reconciler/cjs/react-reconciler.production.min.js',
    '@rsmax/runtime': require.resolve('@rsmax/runtime'),
    '@rsmax/shared': require.resolve('@rsmax/shared'),
    // 按需：当前构建目标的 API 和 host 组件，直接 alias 到目标平台文件
    // rspack 在依赖图分析阶段就不会接触到非目标平台的代码
    '@rsmax/one/api/adapters': path.join(rsmaxOneRoot, `api/adapters/${_target}.js`),
    '@rsmax/one/api/current': path.join(rsmaxOneRoot, `api/adapters/${_target}.js`),
    '@rsmax/one/adapter/current': path.join(rsmaxOneRoot, `adapters/${_target}.js`),
    '@rsmax/one/components/current': path.join(rsmaxOneRoot, `hostComponents/${_target}/index.js`),
    'rsmax/one/api/adapters': path.join(rsmaxOneRoot, `api/adapters/${_target}.js`),
    'rsmax/one/api/current': path.join(rsmaxOneRoot, `api/adapters/${_target}.js`),
    'rsmax/one/adapter/current': path.join(rsmaxOneRoot, `adapters/${_target}.js`),
    'rsmax/one/components/current': path.join(rsmaxOneRoot, `hostComponents/${_target}/index.js`),
  };

  if (options.renderer === 'light') {
    const runtimeRenderPath = slash(path.resolve(require.resolve('@rsmax/runtime'), '../render.js'));
    config[runtimeRenderPath] = slash(
      path.resolve(require.resolve('@rsmax/runtime'), '../render-light-classic-shim.js')
    );
  }

  return config;
};
