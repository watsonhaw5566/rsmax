declare module 'webpack/lib/*';
declare module 'babel-loader';
declare module 'memory-fs/lib/join';
declare module '@rsmax/postcss-px2units';
declare module 'postcss-url';
declare module 'postcss-preset-env';
declare module '@babel/helper-module-imports';
declare module 'scheduler';

declare module 'webpack-node-externals';

declare namespace jest {
  interface Matchers<R, T> {
    toMatchOutput: (output: string) => R;
  }
}
