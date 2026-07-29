const { extractWxmlFromCode, jsxElementToWxml } = require('./utils');
const t = require('@babel/types');

function findRenderInClass(classDecl) {
  for (const member of classDecl.body.body) {
    if (t.isClassMethod(member) && t.isIdentifier(member.key, { name: 'render' })) {
      return member;
    }
  }
  return null;
}

function findRenderInObject(objExpr) {
  for (const prop of objExpr.properties) {
    if ((t.isObjectMethod(prop) || t.isObjectProperty(prop)) && 
        t.isIdentifier(prop.key, { name: 'render' })) {
      return prop;
    }
  }
  return null;
}

function findJsxInFunction(fn) {
  let body = fn.body;
  
  if (t.isArrowFunctionExpression(fn)) {
    if (t.isJSXElement(body) || t.isJSXFragment(body)) {
      return body;
    }
  }
  
  if (t.isBlockStatement(body)) {
    for (const stmt of body.body) {
      if (t.isReturnStatement(stmt) && (t.isJSXElement(stmt.argument) || t.isJSXFragment(stmt.argument))) {
        return stmt.argument;
      }
    }
  }
  return null;
}

function getJsxNode(renderMethod) {
  if (t.isClassMethod(renderMethod) || t.isObjectMethod(renderMethod)) {
    return findJsxInFunction(renderMethod);
  }
  if (t.isObjectProperty(renderMethod) && t.isArrowFunctionExpression(renderMethod.value)) {
    return findJsxInFunction(renderMethod.value);
  }
  return null;
}

module.exports = function() {
  return {
    name: 'babel-plugin-jsx-to-wxml',
    visitor: {
      ExportDefaultDeclaration(path, state) {
        const declaration = path.node.declaration;
        let jsxNode = null;
        
        if (t.isClassDeclaration(declaration)) {
          const renderMethod = findRenderInClass(declaration);
          if (renderMethod) {
            jsxNode = getJsxNode(renderMethod);
          }
        } else if (t.isObjectExpression(declaration)) {
          const renderMethod = findRenderInObject(declaration);
          if (renderMethod) {
            jsxNode = getJsxNode(renderMethod);
          }
        } else if (t.isFunctionDeclaration(declaration) || t.isArrowFunctionExpression(declaration)) {
          jsxNode = findJsxInFunction(declaration);
        }
        
        if (jsxNode && state.file && state.file.code) {
          const result = jsxElementToWxml(state.file.code, jsxNode);
          state.wxmlTemplate = result.wxml;
          state.customComponents = result.components;
        }
      }
    }
  };
};

module.exports.jsxToWxml = function(ast, code) {
  return extractWxmlFromCode(ast, code);
};

module.exports.utils = require('./utils');
module.exports.findJsxInFunction = findJsxInFunction;
