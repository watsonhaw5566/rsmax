import { defineConfig } from 'vitepress';

// ============================================================
// v2（当前版本）侧边栏
// ============================================================
const guideSidebar = [
  {
    text: '开始',
    collapsed: false,
    items: [
      { text: '简介', link: '/guide/introduction' },
      { text: '快速开始', link: '/guide/getting-started' },
      { text: 'CLI 命令', link: '/guide/cli' },
    ],
  },
  {
    text: '核心指南',
    collapsed: false,
    items: [
      { text: 'JSX 语法', link: '/guide/jsx' },
      { text: '组件', link: '/guide/components' },
      { text: 'Hooks API', link: '/guide/hooks' },
      { text: '样式', link: '/guide/styles' },
      { text: '状态管理（Store）', link: '/guide/store' },
      { text: '国际化（i18n）', link: '/guide/i18n' },
      { text: '环境变量', link: '/guide/env' },
      { text: '静态资源', link: '/guide/assets' },
      { text: '分包加载', link: '/guide/subpackages' },
      { text: '第三方 UI 库', link: '/guide/ui-libraries' },
    ],
  },
  {
    text: '进阶',
    collapsed: false,
    items: [
      { text: '渐进式迁移', link: '/guide/migration' },
      { text: '配置参考', link: '/guide/config' },
    ],
  },
];

// ============================================================
// v1（旧版）侧边栏
// ============================================================
const v1GuideSidebar = [
  {
    text: '开始',
    collapsed: false,
    items: [
      { text: '快速上手', link: '/v1/guide/quick-start' },
      { text: '常见问题', link: '/v1/faq' },
    ],
  },
  {
    text: '基础指南',
    collapsed: false,
    items: [
      { text: 'CLI 命令行', link: '/v1/guide/basic/cli' },
      { text: 'React', link: '/v1/guide/basic/react' },
      { text: 'public 目录', link: '/v1/guide/basic/public' },
      { text: '调试工具', link: '/v1/guide/basic/devtools' },
      { text: '错误处理', link: '/v1/guide/basic/error-handling' },
      { text: '小程序自定义组件', link: '/v1/guide/basic/custom-component' },
      { text: '使用小程序插件', link: '/v1/guide/basic/plugin' },
    ],
  },
  {
    text: '进阶指南',
    collapsed: false,
    items: [
      { text: '混合开发', link: '/v1/guide/advanced/hybrid' },
      { text: '性能优化', link: '/v1/guide/advanced/performance' },
      { text: '使用插件', link: '/v1/guide/advanced/plugin' },
      { text: '状态共享', link: '/v1/guide/advanced/sharing-state' },
      { text: 'TypeScript 支持', link: '/v1/guide/advanced/typescript' },
    ],
  },
  {
    text: '框架',
    collapsed: false,
    items: [
      { text: 'App', link: '/v1/guide/framework/app' },
      { text: '页面', link: '/v1/guide/framework/page' },
      { text: '组件', link: '/v1/guide/framework/component' },
      { text: '事件', link: '/v1/guide/framework/event' },
      { text: 'API', link: '/v1/guide/framework/api' },
      { text: '样式', link: '/v1/guide/framework/style' },
    ],
  },
  {
    text: '跨平台开发',
    collapsed: false,
    items: [
      { text: 'Rsmax One', link: '/v1/guide/one/' },
      { text: 'Web 同构', link: '/v1/guide/one/web' },
    ],
  },
  {
    text: '配置',
    collapsed: false,
    items: [
      { text: 'Rsmax 配置', link: '/v1/guide/config/rsmax' },
      { text: '环境变量', link: '/v1/guide/config/environment-variables' },
      { text: 'PostCSS 配置', link: '/v1/guide/config/postcss' },
    ],
  },
  {
    text: '其他',
    collapsed: false,
    items: [
      { text: '小程序插件开发', link: '/v1/guide/writing-mini-plugins' },
      { text: '实现原理', link: '/v1/guide/implementation-notes' },
    ],
  },
];

const v1ApiSidebar = [
  {
    text: 'API',
    collapsed: false,
    items: [
      { text: 'rsmax', link: '/v1/api/rsmax' },
      { text: 'rsmax / build', link: '/v1/api/rsmax-build' },
      { text: 'rsmax / macro', link: '/v1/api/rsmax-macro' },
    ],
  },
  {
    text: 'rsmax / one',
    collapsed: false,
    items: [
      { text: 'API', link: '/v1/api/rsmax-one/api' },
      { text: '组件', link: '/v1/api/rsmax-one/components' },
      { text: '事件', link: '/v1/api/rsmax-one/event' },
      { text: '生命周期', link: '/v1/api/rsmax-one/lifecycle' },
    ],
  },
  {
    text: 'rsmax / [平台]',
    collapsed: false,
    items: [
      { text: 'API', link: '/v1/api/rsmax-platform/api' },
      { text: '组件', link: '/v1/api/rsmax-platform/component' },
    ],
  },
];

export default defineConfig({
  lang: 'zh-CN',
  title: 'Rsmax',
  description: '基于 Babel 的 JSX 微信小程序开发框架',
  cleanUrls: true,
  lastUpdated: true,
  head: [['link', { rel: 'icon', href: '/rsmax.png' }]],
  themeConfig: {
    logo: '/rsmax.png',

    nav: [
      { text: '指南', link: '/guide/introduction', activeMatch: '/guide/' },
      {
        text: 'v2.x',
        items: [
          { text: 'v2.x', link: '/' },
          { text: 'v1.x', link: '/v1/' },
        ],
      },
    ],

    // 更具体的前缀需放在前面
    sidebar: {
      '/v1/api/': v1ApiSidebar,
      '/v1/': v1GuideSidebar,
      '/guide/': guideSidebar,
    },

    outline: {
      level: [2, 3],
      label: '本页目录',
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },

    darkModeSwitchLabel: '外观',
    darkModeSwitchTitle: '切换深色 / 浅色模式',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '回到顶部',
    langMenuLabel: '切换语言',
    lastUpdatedText: '最后更新',

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档',
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭',
            },
          },
        },
      },
    },
  },
});
