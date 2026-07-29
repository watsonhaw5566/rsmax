/**
 * Rsmax JSX 配置文件
 * 放在小程序项目根目录（sourceDir 的父目录）
 */
module.exports = {
  components: {
    // 前缀映射：<demo-xxx> 标签 → /components/xxx/index
    'demo': {
      resolve(tagName) {
        // demo-header → /components/header/index
        const compName = tagName.replace(/^demo-/, '');
        return `/components/${compName}/index`;
      }
    }
  }
};
