# PostCSS 配置

在[项目路径](/v1/guide/config/rsmax#cwd)下新建 `postcss.config.js`，就可以修改 PostCSS 配置:

```js
// postcss.config.js
module.exports = ({ options }) => ({
  plugins: {
    // 继承 Rsmax 默认的插件配置
    ...options.plugins,
    // 添加其他插件
    'postcss-url': { url: 'inline', maxSize: 15 },
  },
});
```
