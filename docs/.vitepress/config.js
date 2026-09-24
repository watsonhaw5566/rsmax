import { defineConfig } from 'vitepress';

// ============================================================
// 侧边栏
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
    ],

    sidebar: {
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
