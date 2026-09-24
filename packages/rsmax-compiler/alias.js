const path = require('node:path');
const traverse = require('@babel/traverse').default;
const t = require('@babel/types');

/**
 * 规范化路径别名配置：
 * - 内置默认别名 '@' -> srcDir，用户可在 rsmax.config.js 中覆盖
 * - 相对目标路径基于 projectRoot（rsmax.config.js 所在目录）解析
 * - 空值 / 非字符串目标忽略
 *
 * @param {Object} [rawAliases] rsmax.config.js 的 alias 字段
 * @param {string} srcDir 源码目录（'@' 的默认目标）
 * @param {string} projectRoot 项目根目录
 * @returns {Object<string, string>} 别名 -> 绝对目录
 */
function normalizeAliases(rawAliases, srcDir, projectRoot) {
    const merged = {'@': srcDir, ...(rawAliases || {})};
    const aliases = {};
    for (const [key, target] of Object.entries(merged)) {
        if (!key || typeof target !== 'string' || !target) continue;
        aliases[key] = path.isAbsolute(target)
            ? path.resolve(target)
            : path.resolve(projectRoot, target);
    }
    return aliases;
}

/**
 * 匹配别名：与 key 完全相等，或以 key + '/' 开头。
 * 多个 key 同时命中时取最长者（如 '@utils' 优先于 '@'）。
 * 注意 '@' 不会误匹配 '@rsmax/runtime'、'@babel/core' 等 scoped 包名。
 *
 * @returns {{target: string, rest: string}|null}
 */
function matchAlias(request, aliases) {
    const keys = Object.keys(aliases).sort((a, b) => b.length - a.length);
    for (const key of keys) {
        if (request === key) return {target: aliases[key], rest: ''};
        if (request.startsWith(key + '/')) {
            return {target: aliases[key], rest: request.slice(key.length)};
        }
    }
    return null;
}

/**
 * 将别名引用改写为相对 importerDir 的 POSIX 风格相对路径。
 * dist 与 src 目录结构镜像，因此该相对路径在产物中同样成立。
 * 未命中任何别名时原样返回。
 */
function rewriteAliasRequest(request, importerDir, aliases) {
    if (!request || typeof request !== 'string' || !aliases) return request;
    const matched = matchAlias(request, aliases);
    if (!matched) return request;
    const absoluteTarget = matched.rest
        ? path.join(matched.target, matched.rest)
        : matched.target;
    let rel = path.relative(importerDir, absoluteTarget).split(path.sep).join('/');
    if (rel && !rel.startsWith('.')) rel = './' + rel;
    return rel;
}

/**
 * 就地改写 AST 中所有模块引用的来源路径：
 *   import x from '...' / import '...'
 *   require('...')
 *   export { x } from '...' / export * from '...'
 * 需在 analyzeFileCombined 之前执行，使样式 / WXS 等后续分析直接拿到相对路径。
 *
 * @returns {number} 实际改写的节点数量
 */
function rewriteAstAliases(ast, importerDir, aliases) {
    if (!ast || !aliases || Object.keys(aliases).length === 0) return 0;
    let count = 0;
    const rewriteSource = (sourceNode) => {
        if (sourceNode && t.isStringLiteral(sourceNode)) {
            const rewritten = rewriteAliasRequest(sourceNode.value, importerDir, aliases);
            if (rewritten !== sourceNode.value) {
                sourceNode.value = rewritten;
                count++;
            }
        }
    };
    traverse(ast, {
        ImportDeclaration(nodePath) {
            rewriteSource(nodePath.node.source);
        },
        ExportNamedDeclaration(nodePath) {
            if (nodePath.node.source) rewriteSource(nodePath.node.source);
        },
        ExportAllDeclaration(nodePath) {
            rewriteSource(nodePath.node.source);
        },
        CallExpression(nodePath) {
            const node = nodePath.node;
            if (t.isIdentifier(node.callee, {name: 'require'}) &&
                node.arguments.length === 1 &&
                t.isStringLiteral(node.arguments[0])) {
                rewriteSource(node.arguments[0]);
            }
        }
    });
    return count;
}

module.exports = {
    normalizeAliases,
    rewriteAliasRequest,
    rewriteAstAliases
};
