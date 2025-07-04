import path from 'node:path';
import { rspack } from '@rspack/core';
import type Config from 'rspack-chain';
import type Builder from '../Builder';
import alias from '../utils/alias';
import getEnvironment from '../utils/env';

export default function baseConfig(config: Config, builder: Builder) {
  config.resolveLoader.modules
    .merge(['node_modules', path.join(__dirname, './loaders')])
    .end()
    .extensions.merge(['.js', '.ts']);

  config.mode(process.env.NODE_ENV === 'production' ? 'production' : 'development');

  config.context(builder.options.cwd);

  config.resolve.alias.merge(alias(builder.options, builder.target));

  config.output.path(path.join(builder.options.cwd, builder.options.output));

  const env = getEnvironment(builder.options, builder.target);

  config.plugin('rspack-define-plugin').use(rspack.DefinePlugin, [env.stringified]);
  config.plugin('provide-regeneratorRuntime').use(rspack.ProvidePlugin, [
    {
      regeneratorRuntime: 'regenerator-runtime',
    },
  ]);

  if (process.env.NODE_ENV === 'production') {
    config.output.clear();
  }

  config.devServer
    .publicPath(config.get('publicPath'))
    .compress(true)
    .hot(true)
    .open(false)
    .historyApiFallback(true)
    .noInfo(true);

  return config;
}
