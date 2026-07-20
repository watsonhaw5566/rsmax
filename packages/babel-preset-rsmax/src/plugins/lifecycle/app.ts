import { declare } from '@babel/helper-plugin-utils';
import type { NodePath } from '@babel/traverse';
import type * as t from '@babel/types';
import Store from '@rsmax/build-store';
import { slash } from '@rsmax/shared';

const lifecycleEvents = ['onShareAppMessage', 'onShareTimeline'];

interface Options {
  test: (file: string) => boolean;
}

export default (options: Options) => {
  let skip = false;
  return declare(() => {
    return {
      pre(state: any) {
        const importer = slash(state.opts.filename);
        skip = !options.test(importer);
        if (skip) {
          return;
        }
        Store.appEvents.delete(importer);
      },
      visitor: {
        StringLiteral: (path: NodePath<t.StringLiteral>, state: any) => {
          if (skip) {
            return;
          }
          const importer = slash(state.file.opts.filename);
          const { node } = path;
          if (!lifecycleEvents.includes(node.value)) {
            return;
          }
          Store.appEvents.set(importer, Store.appEvents.get(importer)?.add(node.value) ?? new Set([node.value]));
        },
        Identifier: (path: NodePath<t.Identifier>, state: any) => {
          if (skip) {
            return;
          }
          const importer = slash(state.file.opts.filename);
          const { node } = path;
          if (!lifecycleEvents.includes(node.name)) {
            return;
          }
          Store.appEvents.set(importer, Store.appEvents.get(importer)?.add(node.name) ?? new Set([node.name]));
        },
      },
    };
  });
};
