# 环境变量

Rsmax 提供**零依赖、无运行时开销**的变量注入方案：所有 `process.env.XXX` 在编译阶段被静态替换为字面量，小程序运行时无需加载任何 dotenv 库。

> 设计原则：编译时静态替换（类似 Vite 的 `import.meta.env` / webpack 的 DefinePlugin），不是运行时读取。

## 来源与优先级

优先级从低到高，后者覆盖前者：

```
.env 文件（.env → .env.local → .env.<mode> → .env.<mode>.local）
   ↓
CLI --mode 注入 NODE_ENV / MODE
   ↓
rsmax.config.js 的 define（最高优先级，可覆盖一切）
```

## 第一层：.env 文件

在项目根目录（与 `rsmax.config.js` 同级）创建，支持四种加载类型：

| 文件名 | 说明 | 何时加载 |
|--------|------|----------|
| `.env` | 公共默认配置 | 始终加载 |
| `.env.local` | 本地个人覆盖，不应提交 git | 始终加载 |
| `.env.<mode>` | 指定环境配置 | `--mode <mode>` 匹配时加载 |
| `.env.<mode>.local` | 指定环境的本地覆盖 | `--mode <mode>` 匹配时加载，优先级最高 |

语法保持极简：

```dotenv
# 简单键值对
API_BASE=https://api.example.com
APP_NAME=我的应用

# 引号包裹（值含空格时使用，单/双引号均可）
MOTTO="Hello World"
```

> 仅支持 `KEY=VALUE`、`#` 整行注释与单/双引号包裹；不支持 `export` 前缀、行内注释、`${VAR}` 变量展开。值中的 `#` 始终按字面量保留（不会被当作注释截断）。

## 第二层：define 配置

在 `rsmax.config.js` 中通过 `define` 注入或覆盖任意变量，优先级最高：

```js
module.exports = {
  define: {
    API_BASE: 'https://api.rsmax.dev',
    TIMEOUT: 10000,
    DEBUG: true,
    FEATURE_FLAGS: {
      enableNewUserGuide: true,
      enableDarkMode: false,
    },
  },
};
```

支持 `string` / `number` / `boolean` / `null` / `undefined` 及可 JSON 序列化的对象与数组。

## 在代码中使用

### 点访问 / 方括号访问（推荐）

```jsx
useEffect(async () => {
  const resp = await wx.request({
    url: process.env.API_BASE + '/users',
    timeout: process.env.TIMEOUT,
  });
}, []);

return (
  <view>
    <text>当前环境：{process.env.NODE_ENV}</text>
    {process.env.DEBUG && <text>调试模式</text>}
  </view>
);
```

### 解构赋值

```js
const { API_BASE, DEBUG, TIMEOUT } = process.env;
```

### 内置的 NODE_ENV / MODE

两者始终可用：

- `rsmax dev` 默认 `development`，`rsmax build` 默认 `production`；
- `rsmax dev src -m staging` 时，`NODE_ENV` 与 `MODE` 都是 `'staging'`。

```js
if (process.env.NODE_ENV === 'production') {
  wx.reportMonitor('perf_page_load', duration);
}
```

## 典型场景

### 多环境接口切换

```dotenv
# .env.development
API_BASE=https://dev-api.example.com
DEBUG=true
```

```dotenv
# .env.production
API_BASE=https://api.example.com
DEBUG=false
```

```bash
rsmax dev src -o dist      # 加载 .env.development
rsmax build src -o dist    # 加载 .env.production
```

### CI/CD 注入版本号

系统环境变量不会自动注入，可在 `rsmax.config.js` 的 `define` 中显式读取：

```js
module.exports = {
  define: {
    BUILD_VERSION: process.env.BUILD_VERSION,
  },
};
```

```bash
BUILD_VERSION="v1.2.3-$(git rev-parse --short HEAD)" rsmax build src -o dist -m production
```

```js
console.log(process.env.BUILD_VERSION); // v1.2.3-a1b2c3d
```

## 注意事项

1. **纯编译时替换**，不支持动态键名：

   ```js
   process.env.API_BASE;        // ✅ 静态键名，会被替换
   const key = 'API_BASE';
   process.env[key];            // ❌ 无法静态分析
   ```

2. **对象 / 数组**会以 `JSON.parse(...)` 形式注入，开销可忽略；如需更轻量可在 `define` 中扁平化为多个标量。

3. **不要注入密码、私钥等高敏感信息**：编译产物中的值是明文，任何人反编译都可见。仅适合接口域名、功能开关、版本号等非敏感配置。
