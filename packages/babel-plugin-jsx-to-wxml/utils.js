const t = require('@babel/types');

const WX_NATIVE_TAGS = new Set([
  'view', 'text', 'image', 'input', 'button', 'scroll-view', 'swiper', 'swiper-item',
  'movable-view', 'movable-area', 'cover-view', 'cover-image', 'icon', 'text',
  'rich-text', 'progress', 'checkbox-group', 'checkbox', 'radio-group', 'radio',
  'form', 'input', 'textarea', 'label', 'picker', 'picker-view', 'picker-view-column',
  'slider', 'switch', 'editor', 'navigator', 'audio', 'image', 'video', 'camera',
  'live-player', 'live-pusher', 'map', 'canvas', 'open-data', 'web-view', 'ad',
  'official-account', 'ad-custom', 'page-meta', 'block', 'slot',
  'import', 'include', 'template', 'wxs'
]);

const WX_VOID_TAGS = new Set([
  'input', 'image', 'import', 'include'
]);

const WX_INLINE_TAGS = new Set([
  'text'
]);

const EVENT_MAP = {
  onClick: 'bindtap',
  onTap: 'bindtap',
  onInput: 'bindinput',
  onChange: 'bindchange',
  onBlur: 'bindblur',
  onFocus: 'bindfocus',
  onConfirm: 'bindconfirm',
  onSubmit: 'bindsubmit',
  onLongPress: 'bindlongpress',
  onTouchStart: 'bindtouchstart',
  onTouchMove: 'bindtouchmove',
  onTouchEnd: 'bindtouchend',
  onScroll: 'bindscroll',
  onLoad: 'bindload',
  onError: 'binderror'
};

function getNodeCode(code, node) {
  if (!code || !node.start || !node.end) return '';
  return code.substring(node.start, node.end);
}

function stripThisPrefix(exprCode) {
  let result = exprCode.replace(/this\.data\./g, '');
  result = result.replace(/\bthis\./g, '');
  return result;
}

function getExpressionCode(code, expr) {
  if (t.isTemplateLiteral(expr)) {
    return convertTemplateLiteral(code, expr);
  }
  if (t.isCallExpression(expr)) {
    const i18nKey = extractI18nKey(expr);
    if (i18nKey) {
      return "__i18n['" + i18nKey.replace(/'/g, "\\'") + "']";
    }
  }
  const raw = getNodeCode(code, expr);
  return stripThisPrefix(raw);
}

function extractI18nKey(callExpr) {
  if (!t.isCallExpression(callExpr)) return null;
  if (callExpr.arguments.length === 0) return null;
  const firstArg = callExpr.arguments[0];
  if (!t.isStringLiteral(firstArg)) return null;
  const callee = callExpr.callee;
  if (t.isIdentifier(callee, { name: 't' })) {
    return firstArg.value;
  }
  if (t.isMemberExpression(callee) && !callee.computed && t.isIdentifier(callee.property, { name: 't' }) && t.isIdentifier(callee.object)) {
    return firstArg.value;
  }
  return null;
}

function convertTemplateLiteral(code, node) {
  let parts = [];
  let currentStr = '';
  const quasis = node.quasis;
  const expressions = node.expressions;
  
  quasis.forEach((quasi, i) => {
    const text = quasi.value.raw;
    currentStr += text;
    if (i < expressions.length) {
      if (currentStr) {
        parts.push("'" + currentStr.replace(/'/g, "\\'") + "'");
      }
      const expr = expressions[i];
      if (t.isStringLiteral(expr)) {
        parts.push("'" + expr.value.replace(/'/g, "\\'") + "'");
      } else {
        parts.push('(' + getNodeCode(code, expr) + ')');
      }
      currentStr = '';
    } else {
      if (currentStr) {
        parts.push("'" + currentStr.replace(/'/g, "\\'") + "'");
      }
    }
  });
  
  return parts.filter(p => p !== "''").join(' + ');
}

function convertStyleObject(expr, code) {
  if (t.isObjectExpression(expr)) {
    const styles = [];
    expr.properties.forEach(prop => {
      if (t.isObjectProperty(prop)) {
        let key = prop.key.name || prop.key.value;
        key = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        let value = '';
        if (t.isStringLiteral(prop.value)) {
          value = prop.value.value;
        } else if (t.isNumericLiteral(prop.value)) {
          value = prop.value.value + 'px';
        } else {
          return null;
        }
        styles.push(`${key}:${value}`);
      }
    });
    return styles.join(';');
  }
  return null;
}

function isComponentName(tagName) {
  return /^[A-Z]/.test(tagName);
}

function isNativeTag(tagName) {
  return WX_NATIVE_TAGS.has(tagName);
}

function isCustomComponent(tagName) {
  if (isNativeTag(tagName)) return false;
  if (isComponentName(tagName)) return false;
  return tagName.includes('-');
}

function getWxTagName(tagName) {
  return tagName;
}

function convertExpression(code, container) {
  const expr = container.expression;
  if (!expr || t.isJSXEmptyExpression(expr)) return '';
  if (t.isStringLiteral(expr)) return expr.value;
  if (t.isNumericLiteral(expr)) return String(expr.value);
  return `{{${getExpressionCode(code, expr)}}}`;
}

function getIndent(level) {
  return '  '.repeat(level);
}

function isOnlyWhitespace(text) {
  return /^\s*$/.test(text);
}

function isListRenderCall(callNode) {
  if (!t.isCallExpression(callNode) || !t.isMemberExpression(callNode.callee)) return false;
  const prop = callNode.callee.property;
  if (!t.isIdentifier(prop, { name: 'map' })) return false;
  const args = callNode.arguments;
  if (args.length === 0) return false;
  const callback = args[0];
  if (!t.isArrowFunctionExpression(callback) && !t.isFunctionExpression(callback)) return false;
  const body = callback.body;
  if (t.isJSXElement(body)) return true;
  if (t.isBlockStatement(body)) {
    const returnStmt = body.body.find(s => t.isReturnStatement(s));
    if (returnStmt && t.isJSXElement(returnStmt.argument)) return true;
  }
  return false;
}

function handleListRendering(code, callNode) {
  if (!t.isCallExpression(callNode) || !t.isMemberExpression(callNode.callee)) return null;
  const prop = callNode.callee.property;
  if (!t.isIdentifier(prop, { name: 'map' })) return null;
  
  const args = callNode.arguments;
  if (args.length === 0) return null;
  const callback = args[0];
  if (!t.isArrowFunctionExpression(callback) && !t.isFunctionExpression(callback)) return null;
  
  const listSource = getExpressionCode(code, callNode.callee.object);
  let itemName = 'item';
  let indexName = 'index';
  let itemNode = null;
  
  if (callback.params.length > 0) {
    if (t.isIdentifier(callback.params[0])) itemName = callback.params[0].name;
    if (callback.params.length > 1 && t.isIdentifier(callback.params[1])) indexName = callback.params[1].name;
  }
  
  const body = callback.body;
  if (t.isJSXElement(body)) {
    itemNode = body;
  } else if (t.isBlockStatement(body)) {
    const returnStmt = body.body.find(s => t.isReturnStatement(s));
    if (returnStmt && t.isJSXElement(returnStmt.argument)) itemNode = returnStmt.argument;
  }
  
  return { listSource, itemName, indexName, itemNode };
}

function buildAttributes(code, openingElement, tagName, isComponent) {
  let attributes = '';
  const wxTag = tagName === 'navigator' ? 'view' : getWxTagName(tagName);
  
  openingElement.attributes.forEach(attr => {
    if (t.isJSXAttribute(attr)) {
      let attrName;
      if (t.isJSXNamespacedName(attr.name)) {
        attrName = attr.name.namespace.name + ':' + attr.name.name.name;
      } else {
        attrName = attr.name.name;
      }
      
      if (tagName === 'navigator' && attrName === 'url') return;
      
      if (EVENT_MAP[attrName]) {
        const eventName = EVENT_MAP[attrName];
        if (t.isJSXExpressionContainer(attr.value)) {
          const handler = attr.value.expression;
          if (t.isIdentifier(handler)) {
            attributes += ` ${eventName}="${handler.name}"`;
          } else if (t.isMemberExpression(handler) && t.isThisExpression(handler.object) && t.isIdentifier(handler.property)) {
            attributes += ` ${eventName}="${handler.property.name}"`;
          } else if (t.isStringLiteral(handler)) {
            attributes += ` ${eventName}="${handler.value}"`;
          }
        } else if (t.isStringLiteral(attr.value)) {
          attributes += ` ${eventName}="${attr.value.value}"`;
        }
      } else if (attrName === 'className' || attrName === 'class') {
        if (t.isStringLiteral(attr.value)) {
          attributes += ` class="${attr.value.value}"`;
        } else if (t.isJSXExpressionContainer(attr.value)) {
          attributes += ` class="{{${getExpressionCode(code, attr.value.expression)}}}"`;
        }
      } else if (attrName === 'style') {
        if (t.isJSXExpressionContainer(attr.value)) {
          const styleStr = convertStyleObject(attr.value.expression, code);
          attributes += styleStr
            ? ` style="${styleStr}"`
            : ` style="{{${getExpressionCode(code, attr.value.expression)}}}"`;
        } else if (t.isStringLiteral(attr.value)) {
          attributes += ` style="${attr.value.value}"`;
        }
      } else if (attrName === 'wx:if' || attrName === 'wx:elif' || attrName === 'hidden') {
        if (t.isJSXExpressionContainer(attr.value)) {
          attributes += ` ${attrName}="{{${getExpressionCode(code, attr.value.expression)}}}"`;
        }
      } else if (attrName === 'wx:else') {
        attributes += ' wx:else';
      } else if (attrName === 'wx:for' || attrName === 'wx:key') {
        if (t.isStringLiteral(attr.value)) {
          attributes += ` ${attrName}="${attr.value.value}"`;
        } else if (t.isJSXExpressionContainer(attr.value)) {
          attributes += ` ${attrName}="{{${getExpressionCode(code, attr.value.expression)}}}"`;
        }
      } else if (attrName === 'key' || attrName === 'wxKey') {
        if (t.isStringLiteral(attr.value)) {
          attributes += ` wx:key="${attr.value.value}"`;
        }
      } else if (attrName === 'src') {
        if (t.isStringLiteral(attr.value)) {
          attributes += ` ${attrName}="${attr.value.value}"`;
        } else if (t.isJSXExpressionContainer(attr.value)) {
          attributes += ` ${attrName}="{{${getExpressionCode(code, attr.value.expression)}}}"`;
        }
      } else if (isComponent) {
        const propName = /[A-Z]/.test(attrName)
          ? attrName.replace(/([A-Z])/g, '-$1').toLowerCase()
          : attrName;
        if (attr.value === null) {
          attributes += ` ${propName}`;
        } else if (t.isJSXExpressionContainer(attr.value)) {
          if (t.isBooleanLiteral(attr.value.expression)) {
            if (attr.value.expression.value) {
              attributes += ` ${propName}`;
            }
          } else {
            attributes += ` ${propName}="{{${getExpressionCode(code, attr.value.expression)}}}"`;
          }
        } else if (t.isStringLiteral(attr.value)) {
          attributes += ` ${propName}="${attr.value.value}"`;
        } else if (t.isBooleanLiteral(attr.value)) {
          if (attr.value.value) attributes += ` ${propName}`;
        }
      } else {
        if (attrName.startsWith('data-')) {
          if (t.isStringLiteral(attr.value)) {
            attributes += ` ${attrName}="${attr.value.value}"`;
          } else if (t.isJSXExpressionContainer(attr.value)) {
            attributes += ` ${attrName}="{{${getExpressionCode(code, attr.value.expression)}}}"`;
          } else if (attr.value === null) {
            attributes += ` ${attrName}="true"`;
          }
        } else if (attr.value === null) {
          attributes += ` ${attrName}`;
        } else if (t.isJSXExpressionContainer(attr.value)) {
          if (t.isBooleanLiteral(attr.value.expression)) {
            if (attr.value.expression.value) {
              attributes += ` ${attrName}`;
            }
          } else {
            attributes += ` ${attrName}="{{${getExpressionCode(code, attr.value.expression)}}}"`;
          }
        } else if (t.isStringLiteral(attr.value)) {
          attributes += ` ${attrName}="${attr.value.value}"`;
        } else if (t.isBooleanLiteral(attr.value)) {
          if (attr.value.value) attributes += ` ${attrName}`;
        }
      }
    }
  });
  return attributes;
}

function collectInlineContent(code, children) {
  let rawContent = '';
  children.forEach(child => {
    if (t.isJSXText(child)) {
      rawContent += child.value;
    } else if (t.isJSXExpressionContainer(child)) {
      rawContent += ' ' + convertExpression(code, child) + ' ';
    }
  });
  return rawContent.replace(/\s+/g, ' ').trim();
}

function formatNode(code, node, indent, collectedComponents) {
  if (!node) return [];
  
  const openingElement = node.openingElement;
  let tagName = '';
  
  if (t.isJSXIdentifier(openingElement.name)) {
    tagName = openingElement.name.name;
  } else if (t.isJSXMemberExpression(openingElement.name)) {
    tagName = openingElement.name.property.name;
  }
  
  if (collectedComponents && isCustomComponent(tagName)) {
    collectedComponents.add(tagName);
  }

  const isComponent = isComponentName(tagName) || isCustomComponent(tagName);
  const wxTag = tagName === 'navigator' ? 'view' : getWxTagName(tagName);
  const indentStr = getIndent(indent);
  const attributes = buildAttributes(code, openingElement, tagName, isComponent);
  
  if (node.selfClosing || WX_VOID_TAGS.has(wxTag)) {
    return [`${indentStr}<${wxTag}${attributes} />`];
  }
  
  if (WX_INLINE_TAGS.has(wxTag)) {
    const inlineContent = collectInlineContent(code, node.children);
    return [`${indentStr}<${wxTag}${attributes}>${inlineContent}</${wxTag}>`];
  }
  
  const childLines = formatChildren(code, node.children, indent + 1, collectedComponents);
  
  if (childLines.length === 0) {
    return [`${indentStr}<${wxTag}${attributes}></${wxTag}>`];
  }
  
  const onlyText = childLines.length === 1 && !childLines[0].includes('<');
  if (onlyText) {
    return [`${indentStr}<${wxTag}${attributes}>${childLines[0].trim()}</${wxTag}>`];
  }
  
  const lines = [`${indentStr}<${wxTag}${attributes}>`];
  lines.push(...childLines);
  lines.push(`${indentStr}</${wxTag}>`);
  return lines;
}

function formatChildren(code, children, indent, collectedComponents) {
  const lines = [];
  
  children.forEach(child => {
    if (t.isJSXText(child)) {
      const text = child.value;
      if (isOnlyWhitespace(text)) return;
      const cleaned = text.replace(/\s+/g, ' ').trim();
      if (cleaned) lines.push(`${getIndent(indent)}${cleaned}`);
    } else if (t.isJSXExpressionContainer(child)) {
      const expr = child.expression;
      const listResult = handleListRendering(code, expr);
      
      if (listResult) {
        lines.push(`${getIndent(indent)}<block wx:for="{{${listResult.listSource}}}" wx:for-item="${listResult.itemName}" wx:for-index="${listResult.indexName}" wx:key="*this">`);
        if (listResult.itemNode) {
          lines.push(...formatNode(code, listResult.itemNode, indent + 1, collectedComponents));
        }
        lines.push(`${getIndent(indent)}</block>`);
        return;
      }
      
      if (t.isConditionalExpression(expr)) {
        const consequentIsJsx = t.isJSXElement(expr.consequent);
        const alternateIsJsx = t.isJSXElement(expr.alternate);
        
        if (consequentIsJsx || alternateIsJsx) {
          const test = getExpressionCode(code, expr.test);
          lines.push(`${getIndent(indent)}<block wx:if="{{${test}}}">`);
          if (consequentIsJsx) lines.push(...formatNode(code, expr.consequent, indent + 1, collectedComponents));
          lines.push(`${getIndent(indent)}</block>`);
          
          if (expr.alternate && !t.isNullLiteral(expr.alternate)) {
            if (alternateIsJsx) {
              lines.push(`${getIndent(indent)}<block wx:else>`);
              lines.push(...formatNode(code, expr.alternate, indent + 1, collectedComponents));
              lines.push(`${getIndent(indent)}</block>`);
            } else if (t.isConditionalExpression(expr.alternate)) {
              let current = expr.alternate;
              while (current && t.isConditionalExpression(current)) {
                const elseTest = getExpressionCode(code, current.test);
                lines.push(`${getIndent(indent)}<block wx:elif="{{${elseTest}}}">`);
                if (t.isJSXElement(current.consequent)) lines.push(...formatNode(code, current.consequent, indent + 1, collectedComponents));
                lines.push(`${getIndent(indent)}</block>`);
                
                if (current.alternate && !t.isNullLiteral(current.alternate)) {
                  if (t.isJSXElement(current.alternate)) {
                    lines.push(`${getIndent(indent)}<block wx:else>`);
                    lines.push(...formatNode(code, current.alternate, indent + 1, collectedComponents));
                    lines.push(`${getIndent(indent)}</block>`);
                  } else if (!t.isConditionalExpression(current.alternate)) {
                    break;
                  }
                }
                current = current.alternate;
              }
            }
          }
          return;
        }
      }
      
      const exprText = convertExpression(code, child);
      if (exprText) lines.push(`${getIndent(indent)}${exprText}`);
    } else if (t.isJSXElement(child)) {
      lines.push(...formatNode(code, child, indent, collectedComponents));
    }
  });
  
  return lines;
}

function jsxElementToWxml(code, node, indent = 0) {
  const collectedComponents = new Set();
  const lines = formatNode(code, node, indent, collectedComponents);
  return {
    wxml: lines.join('\n') + '\n',
    components: collectedComponents
  };
}

function findJsxInFunction(fn) {
  let body = fn.body;
  if (t.isArrowFunctionExpression(fn)) {
    if (t.isJSXElement(body) || t.isJSXFragment(body)) return body;
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

function extractWxmlFromCode(ast, code) {
  let wxml = '';
  let components = new Set();
  
  babelTraverse(ast, {
    ExportDefaultDeclaration(path) {
      const declaration = path.node.declaration;
      let jsxNode = null;
      
      if (t.isClassDeclaration(declaration)) {
        for (const member of declaration.body.body) {
          if (t.isClassMethod(member) && t.isIdentifier(member.key, { name: 'render' })) {
            jsxNode = findJsxInFunction(member);
            break;
          }
        }
      } else if (t.isObjectExpression(declaration)) {
        for (const prop of declaration.properties) {
          if ((t.isObjectMethod(prop) || t.isObjectProperty(prop)) && t.isIdentifier(prop.key, { name: 'render' })) {
            if (t.isObjectMethod(prop) || t.isClassMethod(prop)) {
              jsxNode = findJsxInFunction(prop);
            } else if (t.isObjectProperty(prop) && (t.isArrowFunctionExpression(prop.value) || t.isFunctionExpression(prop.value))) {
              jsxNode = findJsxInFunction(prop.value);
            }
            break;
          }
        }
      } else if (t.isFunctionDeclaration(declaration) || t.isArrowFunctionExpression(declaration)) {
        jsxNode = findJsxInFunction(declaration);
      }
      
      if (jsxNode) {
        const result = jsxElementToWxml(code, jsxNode, 0);
        wxml = result.wxml;
        components = result.components;
      }
    }
  });
  
  return { wxml, components };
}

function babelTraverse(ast, visitors) {
  const babel = require('@babel/core');
  babel.traverse(ast, visitors);
}

module.exports = {
  extractWxmlFromCode,
  jsxElementToWxml,
  getExpressionCode,
  convertStyleObject,
  handleListRendering,
  WX_VOID_TAGS,
  WX_NATIVE_TAGS,
  EVENT_MAP,
  isNativeTag,
  isCustomComponent
};
