# CLI 命令行
## rsmax build

编译项目，生成构建产物，存放在 `dist/${target}` 目录下。

```bash
Rsmax build

编译项目

选项：
      --version    显示版本号                                             [布尔]
      --help       显示帮助信息                                           [布尔]
  -w, --watch      监听文件变化                           [布尔] [默认值: false]
  -t, --target     目标平台                             [字符串] [默认值: "ali"]
  -p, --port       指定端口号                                             [数字]
  -m, --minimize   最小化文件                             [布尔] [默认值: false]
  -a, --analyze    编译分析                               [布尔] [默认值: false]
```

### --target

目标平台，支持选项：

- `ali` 支付宝小程序
- `toutiao` 头条小程序
- `wechat` 微信小程序
- `web` web 浏览器

### --watch

监听文件变化实时构建，调试模式开启。

### --port

指定端口号, `--target=web` 模式下有效。

## --minimize

最小化构建产物，`--watch` 模式下默认不压缩文件以保证快速的响应文件变更，如需在开发模式进行真机调试（压缩文件），可以使用　`--minimize` 或 `-m` 参数开启，会增加整体构建时间，请酌情使用。

> minimize 压缩不等同于生产模式！ 在 wechat 平台上使用 --minimize 参数预览时，需要在开发工具 IDE 本地设置中关闭"上传代码压缩混淆"选项，否则 Webpack 和 IDE 的双重压缩会导致编译器无法解析语法而报错。

## --analyze

Rsmax 使用 rsdoctor [编译分析](https://rsdoctor.dev/)，开启后可分析构建产物的具体内容组成。
