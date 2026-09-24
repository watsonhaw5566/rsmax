const fs = require('fs-extra');
const path = require('node:path');
const {logger} = require('rslog');

/**
 * 解析 .env 文件内容（极简 dotenv 语法，零第三方依赖）：
 * - KEY=VALUE 键值对
 * - # 开头的整行注释、空行
 * - 值两端的单/双引号会被去除
 * 不支持：export 前缀、行内注释、$VAR 变量展开。
 */
function parseEnvFile(content) {
  const result = {};
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    let value = trimmed.slice(eqIdx + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (key) result[key] = value;
  }
  return result;
}

/**
 * 按优先级加载环境变量（后者覆盖前者）：
 *   .env -> .env.local -> .env.<mode> -> .env.<mode>.local
 *   -> CLI mode 注入 NODE_ENV / MODE -> rsmax.config.js 的 define
 *
 * @param {string} projectRoot 项目根目录（与 rsmax.config.js 同级）
 * @param {string} [mode] 环境模式，默认 development
 * @param {Object} [define] rsmax.config.js 中的 define（最高优先级）
 * @returns {Promise<Object>} 合并后的编译期变量
 */
async function loadEnvConfig(projectRoot, mode = 'development', define = {}) {
  const env = {};
  const envFiles = ['.env', '.env.local', `.env.${mode}`, `.env.${mode}.local`];
  for (const fileName of envFiles) {
    try {
      const content = await fs.readFile(path.join(projectRoot, fileName), 'utf-8');
      Object.assign(env, parseEnvFile(content));
      logger.debug(`[rsmax] Loaded env file: ${fileName}`);
    } catch (e) {
      // 文件不存在属于正常情况，静默跳过；其他错误（如权限）才告警
      if (e.code !== 'ENOENT') {
        logger.warn(`[rsmax] Failed to read ${fileName}: ${e.message}`);
      }
    }
  }
  return {...env, NODE_ENV: mode, MODE: mode, ...define};
}

module.exports = {parseEnvFile, loadEnvConfig};
