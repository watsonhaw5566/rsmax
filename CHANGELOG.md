# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.3.1](https://github.com/watsonhaw5566/rsmax/compare/v1.1.2...v1.3.1) (2025-05-29)

### Bug Fixes

- **cli:** 使用 rspack-plugin-virtual-module 1.0.1 版本 ([a4aa86c](https://github.com/watsonhaw5566/rsmax/commit/a4aa86ceca16179184c0cbdebd6056016a07cfb5))
- **cli:** 修复 rsdoctor 路径应为动态路径，而不是固定值 ([46a339a](https://github.com/watsonhaw5566/rsmax/commit/46a339a5bf989be0a8c61ceb2dd99a6b05376292))
- **cli:** 修复生产环境下配置移除问题 ([5dad658](https://github.com/watsonhaw5566/rsmax/commit/5dad658ca17bc8a087334a11f174eb7966bd12dc))
- **cli:** 原生组件 entry 需要 fs 写入 ([af18664](https://github.com/watsonhaw5566/rsmax/commit/af18664d3f808bc40fb89bf6b157c8943f9fed00))
- **cli:** 恢复使用 watch ([78970c7](https://github.com/watsonhaw5566/rsmax/commit/78970c74e88737cf44d2c615346ab91c677c5747))
- **cli:** 更新 yargs-parser 到 17.0.0 ([c95a95f](https://github.com/watsonhaw5566/rsmax/commit/c95a95fbc0bf4da38fcaf1d7afb57cc559232373))
- **plugin-error-screen:** 修复 pnpm 循环依赖问题 ([a27349e](https://github.com/watsonhaw5566/rsmax/commit/a27349e401fd22c3ffeddc05d2d4cce67bfc3645))
- 修复 tsconfig.json xhs 配置错误问题 ([8c2656b](https://github.com/watsonhaw5566/rsmax/commit/8c2656b0515be4ffe2c28d060367beab1823ef7b))
- 修改基础版本为 1.3.0 版本 ([e3e3b11](https://github.com/watsonhaw5566/rsmax/commit/e3e3b1105d6aca6af7a21460a7442e7ad191f069))
- 开启 devtool ([7e4b781](https://github.com/watsonhaw5566/rsmax/commit/7e4b781982e61fe4aa50199c13a87900b93cce9e))

# [1.1.0](https://github.com/watsonhaw5566/rsmax/compare/v1.0.13...v1.1.0) (2025-05-22)

### Bug Fixes

- **cli:** 加入 node: 前缀 ([62c50a2](https://github.com/watsonhaw5566/rsmax/commit/62c50a2966d298dc174fbe6ed0a5fb65e525c394))
- **cli:** 虚拟模块加入 reject ([b3f9b47](https://github.com/watsonhaw5566/rsmax/commit/b3f9b47aa75c9ae1569f4b7b45c190b4265656f6))
- **cli:** 重命名 remax.config.js 为 rsmax.config.js ([498a2c8](https://github.com/watsonhaw5566/rsmax/commit/498a2c80a5845d6a1a4cd483a0ffdeb6b424adb6))
- **preset-rsmax:** 修正 PresetOptions 选项 ([7be9245](https://github.com/watsonhaw5566/rsmax/commit/7be9245a1f2b42d1f74f6469b113b093ba0f74ab))
- **rsmax/plugin-error-screen:** 修复 plugin-error-screen 依赖关系 ([b71fa37](https://github.com/watsonhaw5566/rsmax/commit/b71fa3750b496baac493544414542fcd89f68c9b))
- **rsmax:** 修复 ali.d.ts 类型引用 ([8d5c1ff](https://github.com/watsonhaw5566/rsmax/commit/8d5c1ff704a4c8465f93275ccbcf7772695c99a0))
- **types:** 移除 webpack-chian ([db95786](https://github.com/watsonhaw5566/rsmax/commit/db95786cecfa0cceeb34eda6d699d0d3372f6e0d))
- 修复 cssPlugin index 查找问题 ([0148033](https://github.com/watsonhaw5566/rsmax/commit/0148033d2d7206920064f056aa92d9309907bc6f))
- 修复 vitest 配置 ([2b34227](https://github.com/watsonhaw5566/rsmax/commit/2b3422783254140f2296b7b8460e109a372e0e7a))
- 修复无法构建原生组件问题 ([e317322](https://github.com/watsonhaw5566/rsmax/commit/e317322bafdf629154e1176ae63729666101f521))
- 修正 compilation.addEntry 问题 ([01e8e2c](https://github.com/watsonhaw5566/rsmax/commit/01e8e2c740150d506aaa8aaee1333a5e2237633d))
- 标记废弃函数 ([49ae28c](https://github.com/watsonhaw5566/rsmax/commit/49ae28c8f6f8e38804b138a6e10e246b25565e65))
- 移除 \* 号全量引入 ([65645e0](https://github.com/watsonhaw5566/rsmax/commit/65645e02a0d75f2729777510f49199110db578c3))
- 移除 \* 号全量引入 ([fe3476c](https://github.com/watsonhaw5566/rsmax/commit/fe3476c036b12e45d06ec8d12f9e99aea6e461f4))

### Features

- 使用 rspack 构建 ([755dfa8](https://github.com/watsonhaw5566/rsmax/commit/755dfa893218cc389be88b3217646d9cdcb693ea))
- 加入 rsdoctor 进行产物分析 ([cc9d719](https://github.com/watsonhaw5566/rsmax/commit/cc9d719fc84a3e106fb78e3383516f73f979ab1a))
- 加入 rsdoctor 进行产物分析 ([905c219](https://github.com/watsonhaw5566/rsmax/commit/905c219cef0d13410d2feb4c831a5ab627de13bc))

## [1.0.13](https://github.com/watsonhaw5566/rsmax/compare/v1.0.12...v1.0.13) (2025-05-12)

### Bug Fixes

- **toutiao:** 加入 jsHelper ([d749d21](https://github.com/watsonhaw5566/rsmax/commit/d749d216459b42a9708626aaa44e4061ce9045df))
- **xhs:** 修复小红书样式解析问题 ([8e1ca8b](https://github.com/watsonhaw5566/rsmax/commit/8e1ca8bd136157c26b9753ac2d183bdd6b2e8fa4))
- **xhs:** 加入 jsHelper ([ba9cf0c](https://github.com/watsonhaw5566/rsmax/commit/ba9cf0cdb4c6c1d199cba3cfb8bcc25d0f615be0))
- 移除小红书 sjs 脚本优化 ([9a0ae7d](https://github.com/watsonhaw5566/rsmax/commit/9a0ae7df3b022f7e5fd0ec60afebc9f1cbcbc6c6))

**Note:** Version bump only for package root

## [1.0.11](https://github.com/watsonhaw5566/rsmax/compare/v1.0.12...v1.0.11) (2025-05-12)

### Bug Fixes

- **toutiao:** 加入 jsHelper ([d749d21](https://github.com/watsonhaw5566/rsmax/commit/d749d216459b42a9708626aaa44e4061ce9045df))
- **xhs:** 修复小红书样式解析问题 ([8e1ca8b](https://github.com/watsonhaw5566/rsmax/commit/8e1ca8bd136157c26b9753ac2d183bdd6b2e8fa4))
- **xhs:** 加入 jsHelper ([ba9cf0c](https://github.com/watsonhaw5566/rsmax/commit/ba9cf0cdb4c6c1d199cba3cfb8bcc25d0f615be0))
- 移除小红书 sjs 脚本优化 ([9a0ae7d](https://github.com/watsonhaw5566/rsmax/commit/9a0ae7df3b022f7e5fd0ec60afebc9f1cbcbc6c6))

## [1.0.12](https://github.com/watsonhaw5566/rsmax/compare/v1.0.11...v1.0.12) (2025-05-12)

**Note:** Version bump only for package root

## [1.0.11](https://github.com/watsonhaw5566/rsmax/compare/v1.0.10...v1.0.11) (2025-05-12)

### Bug Fixes

- **rsmax-plugin-error-screen:** 修改 configWebpack 的命名 ([58ada46](https://github.com/watsonhaw5566/rsmax/commit/58ada46df6a46105ce2f8fc9d238af3c886220ed))

## [1.0.10](https://github.com/watsonhaw5566/rsmax/compare/v1.0.9...v1.0.10) (2025-05-11)

**Note:** Version bump only for package root

## [1.0.9](https://github.com/watsonhaw5566/rsmax/compare/v1.0.8...v1.0.9) (2025-05-11)

**Note:** Version bump only for package root

## [1.0.8](https://github.com/watsonhaw5566/rsmax/compare/v1.0.7...v1.0.8) (2025-05-11)

### Bug Fixes

- **one:** 修复 @rsmax/redbox-react 丢失问题 ([5810302](https://github.com/watsonhaw5566/rsmax/commit/581030286d05a1e9c4411e17d8bdd75f56527653))

## [1.0.7](https://github.com/watsonhaw5566/rsmax/compare/v1.0.6...v1.0.7) (2025-05-11)

### Bug Fixes

- **one:** 修复 @rsmax/redbox-react 丢失问题 ([e2f6174](https://github.com/watsonhaw5566/rsmax/commit/e2f6174ed7225f511771af715b65416501c04b8d))

## [1.0.6](https://github.com/watsonhaw5566/rsmax/compare/v1.0.5...v1.0.6) (2025-05-11)

### Bug Fixes

- **one:** 修复 @rsmax/redbox-react 丢失问题 ([21c6051](https://github.com/watsonhaw5566/rsmax/commit/21c605113dc0f85eabca55ae6b04f490caebabd6))

## [1.0.5](https://github.com/watsonhaw5566/rsmax/compare/v1.0.4...v1.0.5) (2025-05-11)

### Bug Fixes

- **cli:** 修复 babel-preset-rsmax 问题 ([75b501b](https://github.com/watsonhaw5566/rsmax/commit/75b501b452a76f3f4083e1af61d824972c58ac99))

## [1.0.4](https://github.com/watsonhaw5566/rsmax/compare/v1.0.3...v1.0.4) (2025-05-11)

### Bug Fixes

- **remax:** 修正 rsmax 命令无法相应问题 ([9dd31a2](https://github.com/watsonhaw5566/rsmax/commit/9dd31a2da94b9fbdfadac16c346915a9a3b7310a))

## 1.0.3 (2025-05-11)

### Bug Fixes

- 修复 package.json 版本变更问题 workspace ([fa166c4](https://github.com/watsonhaw5566/rsmax/commit/fa166c4bfd9adfe7e4f2e061a44d9f90a4ca914d))

### Reverts

- Revert "chore: 更新 pnpm-lock.yaml" ([e6ece5f](https://github.com/watsonhaw5566/rsmax/commit/e6ece5fcc2345fbfd41228057b12d23a64841fa9))

## 1.0.2 (2025-05-11)

### Bug Fixes

- 修复 package.json 版本变更问题 workspace ([fa166c4](https://github.com/watsonhaw5566/rsmax/commit/fa166c4bfd9adfe7e4f2e061a44d9f90a4ca914d))

**Note:** Version bump only for package root

## 1.0.1 (2025-05-11)

**Note:** Version bump only for package root
