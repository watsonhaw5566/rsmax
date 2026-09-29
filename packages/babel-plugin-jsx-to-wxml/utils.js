const t = require('@babel/types');

const WX_NATIVE_TAGS = new Set([
  'view', 'text', 'image', 'input', 'button', 'scroll-view', 'swiper', 'swiper-item',
  'movable-view', 'movable-area', 'cover-view', 'cover-image', 'icon', 'text',
  'rich-text', 'progress', 'checkbox-group', 'checkbox', 'radio-group', 'radio',
  'form', 'input', 'textarea', 'label', 'picker', 'picker-view', 'picker-view-column',
  'slider', 'switch', 'editor', 'navigator', 'audio', 'image', 'video', 'camera',
  'live-player', 'live-pusher', 'map', 'canvas', 'open-data', 'web-view', 'ad',
  'official-account', 'ad-custom', 'page-meta', 'navigation-bar', 'page-container',
  'root-portal', 'block', 'slot',
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
  onError: 'binderror',
  // page-container events
  onBeforeEnter: 'bindbeforeenter',
  onEnter: 'bindenter',
  onAfterEnter: 'bindafterenter',
  onBeforeLeave: 'bindbeforeleave',
  onLeave: 'bindleave',
  onAfterLeave: 'bindafterleave',
  onClickOverlay: 'bindclickoverlay',
  // page-meta events
  onResize: 'bindresize'
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

// --- 内联箭头事件处理：onTap={(e) => fn(idx, e)} ---

const INLINE_HANDLER_PREFIX = '__rsmaxH';

function collectPatternIdNames(node, out) {
  if (!node) return;
  if (t.isIdentifier(node)) {
    out.add(node.name);
  } else if (t.isObjectPattern(node)) {
    node.properties.forEach(p => {
      if (t.isObjectProperty(p)) collectPatternIdNames(p.value, out);
      else if (t.isRestElement(p)) collectPatternIdNames(p.argument, out);
    });
  } else if (t.isArrayPattern(node)) {
    node.elements.forEach(el => { if (el) collectPatternIdNames(el, out); });
  } else if (t.isRestElement(node)) {
    collectPatternIdNames(node.argument, out);
  } else if (t.isAssignmentPattern(node)) {
    collectPatternIdNames(node.left, out);
  }
}

function isFunctionLikeNode(node) {
  return t.isArrowFunctionExpression(node) || t.isFunctionDeclaration(node) ||
         t.isFunctionExpression(node) || t.isObjectMethod(node) || t.isClassMethod(node);
}

/**
 * 收集箭头函数体内「引用了外层 wx:for 行变量（item/idx）」的标识符，
 * 按首次出现顺序返回。函数自身参数、内部函数参数与局部变量声明会遮蔽行变量。
 */
function collectCapturedNames(arrowNode, boundNames) {
  const found = [];
  const seen = new Set();
  const scopeStack = [];

  const isShadowed = name => scopeStack.some(s => s.has(name));

  const visit = (node, parent) => {
    if (!node || typeof node.type !== 'string') return;

    const isFn = isFunctionLikeNode(node);
    if (isFn) {
      const names = new Set();
      (node.params || []).forEach(p => collectPatternIdNames(p, names));
      if (node.id && t.isIdentifier(node.id)) names.add(node.id.name);
      scopeStack.push(names);
    }
    if (t.isVariableDeclarator(node)) {
      const scope = scopeStack[scopeStack.length - 1];
      if (scope) collectPatternIdNames(node.id, scope);
    }
    if (t.isCatchClause(node) && node.param) {
      const scope = scopeStack[scopeStack.length - 1];
      if (scope) collectPatternIdNames(node.param, scope);
    }
    if (t.isIdentifier(node)) {
      // 仅统计引用位置，跳过非计算属性名/定义位置；局部作用域中的同名绑定视为遮蔽
      if (boundNames.has(node.name) && !isShadowed(node.name) && t.isReferenced(node, parent)) {
        if (!seen.has(node.name)) {
          seen.add(node.name);
          found.push(node.name);
        }
      }
    }

    const keys = t.VISITOR_KEYS[node.type] || [];
    for (const key of keys) {
      const childValue = node[key];
      if (Array.isArray(childValue)) {
        childValue.forEach(child => visit(child, node));
      } else {
        visit(childValue, node);
      }
    }

    if (isFn) scopeStack.pop();
  };

  visit(arrowNode, null);
  return found;
}

/**
 * 注册一个内联箭头事件处理器，返回 WXML 侧需要的信息：
 * 生成唯一方法名 + 需要经 dataset 传递的行变量列表。
 */
function registerInlineHandler(arrowNode, loopScopes, ctx) {
  if (arrowNode.params.length > 1 ||
      (arrowNode.params.length === 1 && !t.isIdentifier(arrowNode.params[0]))) {
    throw new Error(
      'rsmax: 内联事件仅支持 0 或 1 个事件参数的箭头函数，如 onInput={(e) => fn(idx, e)}。' +
      '多参数或解构参数请改为具名方法，并通过 data-* 传递列表行数据。'
    );
  }

  // 由内层到外层收集 wx:for 作用域名（同名时内层遮蔽外层，与 WXML 取值一致）
  const boundNames = new Set();
  for (let i = loopScopes.length - 1; i >= 0; i--) {
    boundNames.add(loopScopes[i].itemName);
    boundNames.add(loopScopes[i].indexName);
  }

  const captured = collectCapturedNames(arrowNode, boundNames);
  const name = INLINE_HANDLER_PREFIX + ctx.counter++;
  const datasetKey = name.replace(/^__/, ''); // __rsmaxH0 -> rsmaxH0（对应 data-rsmax-h0）

  ctx.handlers.push({
    name,
    datasetKey,
    captured,
    node: t.cloneNode(arrowNode, true, true)
  });

  return {name, datasetKey, captured};
}

function buildAttributes(code, openingElement, tagName, isComponent, loopScopes = [], ctx = null) {
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
          } else if (t.isArrowFunctionExpression(handler) && ctx) {
            const reg = registerInlineHandler(handler, loopScopes, ctx);
            attributes += ` ${eventName}="${reg.name}"`;
            if (reg.captured.length > 0) {
              // 列表行变量经 dataset 数组传递，位置顺序与 captured 一致；
              // data-rsmax-h0 -> event.currentTarget.dataset.rsmaxH0
              const attrKey = reg.datasetKey.replace(/([A-Z])/g, '-$1').toLowerCase();
              attributes += ` data-${attrKey}="{{[${reg.captured.join(', ')}]}}"`;
            }
          } else {
            throw new Error(
              `rsmax: 事件属性 ${attrName} 仅支持具名方法（如 ${attrName}={handler}）、` +
              `this.method 或内联箭头函数（如 ${attrName}={(e) => fn(e)}），收到不支持的表达式。`
            );
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

function formatNode(code, node, indent, collectedComponents, loopScopes = [], ctx = null) {
  if (!node) return [];
  
  if (t.isJSXFragment(node)) {
    return formatChildren(code, node.children, indent, collectedComponents, loopScopes, ctx);
  }
  
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
  const attributes = buildAttributes(code, openingElement, tagName, isComponent, loopScopes, ctx);
  
  if (node.selfClosing || WX_VOID_TAGS.has(wxTag)) {
    return [`${indentStr}<${wxTag}${attributes} />`];
  }
  
  if (WX_INLINE_TAGS.has(wxTag)) {
    const inlineContent = collectInlineContent(code, node.children);
    return [`${indentStr}<${wxTag}${attributes}>${inlineContent}</${wxTag}>`];
  }
  
  const childLines = formatChildren(code, node.children, indent + 1, collectedComponents, loopScopes, ctx);
  
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

function formatChildren(code, children, indent, collectedComponents, loopScopes = [], ctx = null) {
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
          // 列表项内部进入新的 wx:for 作用域
          const innerScopes = loopScopes.concat([{itemName: listResult.itemName, indexName: listResult.indexName}]);
          lines.push(...formatNode(code, listResult.itemNode, indent + 1, collectedComponents, innerScopes, ctx));
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
          if (consequentIsJsx) lines.push(...formatNode(code, expr.consequent, indent + 1, collectedComponents, loopScopes, ctx));
          lines.push(`${getIndent(indent)}</block>`);
          
          if (expr.alternate && !t.isNullLiteral(expr.alternate)) {
            if (alternateIsJsx) {
              lines.push(`${getIndent(indent)}<block wx:else>`);
              lines.push(...formatNode(code, expr.alternate, indent + 1, collectedComponents, loopScopes, ctx));
              lines.push(`${getIndent(indent)}</block>`);
            } else if (t.isConditionalExpression(expr.alternate)) {
              let current = expr.alternate;
              while (current && t.isConditionalExpression(current)) {
                const elseTest = getExpressionCode(code, current.test);
                lines.push(`${getIndent(indent)}<block wx:elif="{{${elseTest}}}">`);
                if (t.isJSXElement(current.consequent)) lines.push(...formatNode(code, current.consequent, indent + 1, collectedComponents, loopScopes, ctx));
                lines.push(`${getIndent(indent)}</block>`);
                
                if (current.alternate && !t.isNullLiteral(current.alternate)) {
                  if (t.isJSXElement(current.alternate)) {
                    lines.push(`${getIndent(indent)}<block wx:else>`);
                    lines.push(...formatNode(code, current.alternate, indent + 1, collectedComponents, loopScopes, ctx));
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
      lines.push(...formatNode(code, child, indent, collectedComponents, loopScopes, ctx));
    }
  });
  
  return lines;
}

function jsxElementToWxml(code, node, indent = 0) {
  const collectedComponents = new Set();
  const ctx = {counter: 0, handlers: []};
  const lines = formatNode(code, node, indent, collectedComponents, [], ctx);
  return {
    wxml: lines.join('\n') + '\n',
    components: collectedComponents,
    inlineHandlers: ctx.handlers
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
  let inlineHandlers = [];
  
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
        inlineHandlers = result.inlineHandlers || [];
      }
    }
  });
  
  return { wxml, components, inlineHandlers };
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
