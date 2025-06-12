import type { NodePath } from '@babel/traverse';
import * as t from '@babel/types';
import Store from '@rsmax/build-store';
import insertImportDeclaration from './utils/insertImportDeclaration';

const PACKAGE_NAME = '@rsmax/runtime';
const FUNCTION_NAME = 'createNativeComponent';

function getName(callExpression: NodePath<t.CallExpression>) {
  const args = callExpression.node.arguments;
  const name = args[0] as t.StringLiteral;
  return name;
}

export default function requirePluginComponent(path: NodePath, state: any) {
  const importer = state.file.opts.filename;
  const program = state.file.path;
  const functionName = insertImportDeclaration(program, FUNCTION_NAME, PACKAGE_NAME);
  // @ts-ignore
  const callExpression = path.findParent(p => t.isCallExpression(p)) as NodePath<t.CallExpression>;
  const name = getName(callExpression);

  name.value = Store.registerPluginComponent(name.value, importer);
  callExpression.replaceWith(t.callExpression(t.identifier(functionName), [name]));
}
