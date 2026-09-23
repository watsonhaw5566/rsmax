# CLI 命令

`rsmax` 提供三个命令：`build`、`dev`、`clean`。

## build

构建项目，将源码编译输出到产物目录。编译前会清空输出目录，但保留 `miniprogram_npm`。

```bash
rsmax build <source> -o <output> [-m, --mode <mode>]
```

| 参数 | 别名 | 说明 | 默认值 |
|------|------|------|--------|
| `-o, --output <output>` | — | 输出目录 | `dist` |
| `-m, --mode <mode>` | — | 环境模式（development / production / test 等任意自定义），决定加载的 `.env.<mode>` 文件和注入的 `process.env.NODE_ENV` / `process.env.MODE` | `production` |

```bash
# 生产环境构建（默认）
rsmax build src -o dist

# 预发环境构建
rsmax build src -o dist -m staging
```

## dev

监听源文件变化并增量编译，适合日常开发。

```bash
rsmax dev <source> -o <output> [-m, --mode <mode>]
```

| 参数 | 别名 | 说明 | 默认值 |
|------|------|------|--------|
| `-o, --output <output>` | — | 输出目录 | `dist` |
| `-m, --mode <mode>` | — | 环境模式，决定加载的 `.env.<mode>` 文件 | `development` |

```bash
# 开发模式（默认 mode=development）
rsmax dev src -o dist

# 开发模式下使用预发环境接口
rsmax dev src -o dist --mode staging
```

监听模式覆盖的内容包括：

- JSX / JS 文件变化 → 增量重新编译
- `.env` 文件变化 → 重新计算环境变量
- `public/` 目录增删改 → 自动同步到产物目录
- `locales/` 语言包变化 → 重新生成语言包模块

## clean

清理输出目录。

```bash
rsmax clean [output]
```

```bash
# 默认清理 dist
rsmax clean

# 清理指定目录
rsmax clean e2e/dist
```

也可以通过 `-o, --output` 指定目录：

```bash
rsmax clean -o e2e/dist
```

## 在 package.json 中使用

```json
{
  "scripts": {
    "dev": "rsmax dev src -o dist",
    "build": "rsmax build src -o dist",
    "clean": "rsmax clean dist"
  }
}
```

## 退出码

- 构建 / 监听启动失败时进程以非零状态码退出，可直接用于 CI/CD 流水线。
