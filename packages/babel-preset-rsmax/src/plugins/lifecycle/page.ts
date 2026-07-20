import type { NodePath } from '@babel/traverse';
import type * as t from '@babel/types';
import Store from '@rsmax/build-store';
import { slash } from '@rsmax/shared';

const lifecycleEvents = ['onPageScroll', 'onShareAppMessage', 'onShareTimeline'];

interface Options {
  test: (file: string) => boolean;
}

export default (options: Options) => {
  let skip = false;
  return {
    pre(state: any) {
      const importer = slash(state.opts.filename);
      skip = !options.test(importer);
      if (skip) {
        return;
      }
      Store.pageEvents.delete(importer);
    },
    visitor: {
      StringLiteral: (path: NodePath<t.StringLiteral>, state: any) => {
        if (skip) {
          return;
        }
        const { node } = path;
        const importer = slash(state.file.opts.filename);
        if (!lifecycleEvents.includes(node.value)) {
          return;
        }
        Store.pageEvents.set(importer, Store.pageEvents.get(importer)?.add(node.value) ?? new Set([node.value]));
      },
      Identifier: (path: NodePath<t.Identifier>, state: any) => {
        if (skip) {
          return;
        }
        const { node } = path;
        const importer = slash(state.file.opts.filename);
        if (!lifecycleEvents.includes(node.name)) {
          return;
        }
        Store.pageEvents.set(importer, Store.pageEvents.get(importer)?.add(node.name) ?? new Set([node.name]));
      },
    },
  };
};
