import * as path from 'node:path';
import * as fs from 'node:fs';
import VirtualModulesPlugin from 'webpack-virtual-modules';
import { slash } from '@rsmax/shared';

export default (_: any, { cwd, rootDir }: { cwd: string; rootDir: string }) => {
  const searchCustomErrorFile = () => {
    const extensions = ['.js', '.jsx', '.ts', '.tsx'];
    for (const ext of extensions) {
      const file = path.join(cwd, rootDir, `_error${ext}`);
      if (fs.existsSync(file)) {
        return file;
      }
    }
  };

  let errorScreenFile;
  if (process.env.NODE_ENV !== 'production') {
    errorScreenFile = path.resolve(__dirname, './ErrorScreen.development.js');
  } else {
    const customErrorFile = searchCustomErrorFile();
    errorScreenFile = customErrorFile ?? path.resolve(__dirname, './ErrorScreen.js');
  }
  const errorBoundaryFile = path.resolve(__dirname, './ErrorBoundary.js');

  const virtualModules = new VirtualModulesPlugin({
    'node_modules/@rsmax/plugin-error-screen/runtime.js': `
        import React from 'react';
        import { View } from 'rsmax/one';
        import ErrorScreen from '${slash(errorScreenFile)}';
        import ErrorBoundary from '${slash(errorBoundaryFile)}';

        export default {
          onPageComponent({ component }) {
            function ErrorBoundaryWrap(props, ref) {
              return React.createElement(
                ErrorBoundary,
                { errorScreen: ErrorScreen },
                React.createElement(component, { ...props, ref })
              );
            }
            ErrorBoundaryWrap.displayName = 'ErrorBoundary'
            return React.forwardRef(ErrorBoundaryWrap);
          },
        };
      `,
  });

  return {
    configWebpack({ config }: { config: any }) {
      config.plugin('rsmax-plugin-error-screen-virtual-modules').use(virtualModules);
    },
    registerRuntimePlugin() {
      return '@rsmax/plugin-error-screen/runtime.js';
    },
  };
};
