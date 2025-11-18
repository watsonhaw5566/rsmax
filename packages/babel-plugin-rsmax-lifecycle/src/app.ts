import { declare } from '@babel/helper-plugin-utils';
import type { NodePath } from '@babel/traverse';
import type * as t from '@babel/types';
import Store from '@rsmax/build-store';
import { slash } from '@rsmax/shared';

const defaultLifecycleEvents = ['onShareAppMessage', 'onShareTimeline'];

interface Options {
  test: (file: string) => boolean;
  events?: string[];
}

export default (options: Options) => {
  let skip = false;
  const events = new Set(options.events ?? defaultLifecycleEvents);
  function record(importer: string, name: string) {
    if (!events.has(name)) return;
    Store.appEvents.set(importer, Store.appEvents.get(importer)?.add(name) ?? new Set([name]));
  }
  return declare(() => {
    return {
      name: 'babel-plugin-rsmax-lifecycle-app',
      pre(state: any) {
        const importer = slash(state.opts.filename);
        skip = !options.test(importer);
        if (skip) return;
        Store.appEvents.delete(importer);
      },
      visitor: {
        ClassMethod(path: NodePath<t.ClassMethod>, state: any) {
          if (skip) return;
          const importer = slash(state.file.opts.filename);
          const key = path.node.key;
          if (key && key.type === 'Identifier') {
            record(importer, key.name);
          }
        },
        ObjectMethod(path: NodePath<t.ObjectMethod>, state: any) {
          if (skip) return;
          const importer = slash(state.file.opts.filename);
          const key = path.node.key;
          if (key && key.type === 'Identifier') {
            record(importer, key.name);
          }
        },
        CallExpression(path: NodePath<t.CallExpression>, state: any) {
          if (skip) return;
          const importer = slash(state.file.opts.filename);
          const callee = path.node.callee;
          if (callee.type === 'Identifier' && callee.name === 'useAppEvent') {
            const firstArg = path.node.arguments[0];
            if (firstArg?.type === 'StringLiteral') record(importer, firstArg.value);
            if (firstArg?.type === 'Identifier') record(importer, firstArg.name);
          }
        },
        StringLiteral(path: NodePath<t.StringLiteral>, state: any) {
          if (skip) return;
          const importer = slash(state.file.opts.filename);
          const { node, parent } = path;
          if (
            parent &&
            parent.type === 'CallExpression' &&
            (parent.callee as t.Identifier)?.type === 'Identifier' &&
            (parent.callee as t.Identifier).name === 'useAppEvent' &&
            parent.arguments[0] === node
          ) {
            record(importer, node.value);
          }
        },
      },
    };
  });
};
