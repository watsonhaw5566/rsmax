# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.3.7](https://github.com/remaxjs/remax/compare/v1.3.6...v1.3.7) (2025-06-03)

### Bug Fixes

- **cli:** 新增 @swc/core 依赖 ([94cdc66](https://github.com/remaxjs/remax/commit/94cdc6638927ac23d12f4ef1f70cc3b343354e71))

## [1.3.6](https://github.com/remaxjs/remax/compare/v1.3.5...v1.3.6) (2025-06-03)

### Bug Fixes

- **cli:** 使用 swc-loader 解析 js(x)/ts(x) ([b3447d9](https://github.com/remaxjs/remax/commit/b3447d9447c2b141d2283b4d1fd41cdbdaecf54a))
- **web:** [#10](https://github.com/remaxjs/remax/issues/10) ([44ea6ee](https://github.com/remaxjs/remax/commit/44ea6ee67d2529611142ca802563526cf7323551))

## [1.3.5](https://github.com/remaxjs/remax/compare/v1.3.4...v1.3.5) (2025-06-02)

### Bug Fixes

- **cli:** 恢复 getModules ([9ec8977](https://github.com/remaxjs/remax/commit/9ec8977433406858cc671827704a6c75d85403e1))

## [1.3.4](https://github.com/remaxjs/remax/compare/v1.3.3...v1.3.4) (2025-06-02)

### Bug Fixes

- **web:** 修复 web 平台无法启动 ([567d4b8](https://github.com/remaxjs/remax/commit/567d4b88d99f3c2770336619d62197db16199e49))

## [1.3.3](https://github.com/remaxjs/remax/compare/v1.3.2...v1.3.3) (2025-05-30)

### Bug Fixes

- **cli:** 原生组件 entry 需要 fs 写入 ([baca6f7](https://github.com/remaxjs/remax/commit/baca6f70a8511ec93a28cd8ee06850c2862f0d88))

## [1.3.2](https://github.com/remaxjs/remax/compare/v1.3.1...v1.3.2) (2025-05-30)

### Bug Fixes

- **cli:** 修复 app.json 生成时延时 500ms ([634dceb](https://github.com/remaxjs/remax/commit/634dceb1dd057916536d88c82e7f514b87ac3d6c))
- **cli:** 修复 rsdoctor 路径应为动态路径，而不是固定值 ([eafb6ae](https://github.com/remaxjs/remax/commit/eafb6aec8cf01ffe5e304ebe5fb099cb59ea78a7))
- **cli:** 修复热监听时候失效问题 ([d5e4b94](https://github.com/remaxjs/remax/commit/d5e4b9496342124430a3542d7f2571cc4876d078))
- **cli:** 修热监听失效问题 ([9baaf3e](https://github.com/remaxjs/remax/commit/9baaf3e496eda8bb0895c2e93daf57b517fbbeba))
- **cli:** 移除 watch.ts 中的 addEntry 参数 ([19dd6e9](https://github.com/remaxjs/remax/commit/19dd6e92c0b7d22e62493b1637d51b999cb92de2))

## [1.3.1](https://github.com/remaxjs/remax/compare/v1.1.2...v1.3.1) (2025-05-29)

### Bug Fixes

- **cli:** 使用 rspack-plugin-virtual-module 1.0.1 版本 ([a4aa86c](https://github.com/remaxjs/remax/commit/a4aa86ceca16179184c0cbdebd6056016a07cfb5))
- **cli:** 修复 rsdoctor 路径应为动态路径，而不是固定值 ([46a339a](https://github.com/remaxjs/remax/commit/46a339a5bf989be0a8c61ceb2dd99a6b05376292))
- **cli:** 修复生产环境下配置移除问题 ([5dad658](https://github.com/remaxjs/remax/commit/5dad658ca17bc8a087334a11f174eb7966bd12dc))
- **cli:** 原生组件 entry 需要 fs 写入 ([af18664](https://github.com/remaxjs/remax/commit/af18664d3f808bc40fb89bf6b157c8943f9fed00))
- **cli:** 恢复使用 watch ([78970c7](https://github.com/remaxjs/remax/commit/78970c74e88737cf44d2c615346ab91c677c5747))
- **cli:** 更新 yargs-parser 到 17.0.0 ([c95a95f](https://github.com/remaxjs/remax/commit/c95a95fbc0bf4da38fcaf1d7afb57cc559232373))
- 开启 devtool ([7e4b781](https://github.com/remaxjs/remax/commit/7e4b781982e61fe4aa50199c13a87900b93cce9e))

# [1.1.0](https://github.com/remaxjs/remax/compare/v1.0.13...v1.1.0) (2025-05-22)

### Bug Fixes

- **cli:** 加入 node: 前缀 ([62c50a2](https://github.com/remaxjs/remax/commit/62c50a2966d298dc174fbe6ed0a5fb65e525c394))
- **cli:** 虚拟模块加入 reject ([b3f9b47](https://github.com/remaxjs/remax/commit/b3f9b47aa75c9ae1569f4b7b45c190b4265656f6))
- **cli:** 重命名 remax.config.js 为 rsmax.config.js ([498a2c8](https://github.com/remaxjs/remax/commit/498a2c80a5845d6a1a4cd483a0ffdeb6b424adb6))
- 修复 cssPlugin index 查找问题 ([0148033](https://github.com/remaxjs/remax/commit/0148033d2d7206920064f056aa92d9309907bc6f))
- 修复 vitest 配置 ([2b34227](https://github.com/remaxjs/remax/commit/2b3422783254140f2296b7b8460e109a372e0e7a))
- 修复无法构建原生组件问题 ([e317322](https://github.com/remaxjs/remax/commit/e317322bafdf629154e1176ae63729666101f521))
- 修正 compilation.addEntry 问题 ([01e8e2c](https://github.com/remaxjs/remax/commit/01e8e2c740150d506aaa8aaee1333a5e2237633d))
- 移除 \* 号全量引入 ([65645e0](https://github.com/remaxjs/remax/commit/65645e02a0d75f2729777510f49199110db578c3))
- 移除 \* 号全量引入 ([fe3476c](https://github.com/remaxjs/remax/commit/fe3476c036b12e45d06ec8d12f9e99aea6e461f4))

### Features

- 使用 rspack 构建 ([755dfa8](https://github.com/remaxjs/remax/commit/755dfa893218cc389be88b3217646d9cdcb693ea))
- 加入 rsdoctor 进行产物分析 ([cc9d719](https://github.com/remaxjs/remax/commit/cc9d719fc84a3e106fb78e3383516f73f979ab1a))
- 加入 rsdoctor 进行产物分析 ([905c219](https://github.com/remaxjs/remax/commit/905c219cef0d13410d2feb4c831a5ab627de13bc))

## [1.0.13](https://github.com/remaxjs/remax/compare/v1.0.12...v1.0.13) (2025-05-12)

### Bug Fixes

- **xhs:** 修复小红书样式解析问题 ([8e1ca8b](https://github.com/remaxjs/remax/commit/8e1ca8bd136157c26b9753ac2d183bdd6b2e8fa4))

**Note:** Version bump only for package @rsmax/cli

## [1.0.11](https://github.com/remaxjs/remax/compare/v1.0.12...v1.0.11) (2025-05-12)

### Bug Fixes

- **xhs:** 修复小红书样式解析问题 ([8e1ca8b](https://github.com/remaxjs/remax/commit/8e1ca8bd136157c26b9753ac2d183bdd6b2e8fa4))

## [1.0.12](https://github.com/remaxjs/remax/compare/v1.0.11...v1.0.12) (2025-05-12)

**Note:** Version bump only for package @rsmax/cli

## [1.0.11](https://github.com/remaxjs/remax/compare/v1.0.10...v1.0.11) (2025-05-12)

**Note:** Version bump only for package @rsmax/cli

## [1.0.10](https://github.com/remaxjs/remax/compare/v1.0.9...v1.0.10) (2025-05-11)

**Note:** Version bump only for package @rsmax/cli

## [1.0.9](https://github.com/remaxjs/remax/compare/v1.0.8...v1.0.9) (2025-05-11)

**Note:** Version bump only for package @rsmax/cli

## [1.0.8](https://github.com/remaxjs/remax/compare/v1.0.7...v1.0.8) (2025-05-11)

### Bug Fixes

- **one:** 修复 @rsmax/redbox-react 丢失问题 ([5810302](https://github.com/remaxjs/remax/commit/581030286d05a1e9c4411e17d8bdd75f56527653))

## [1.0.7](https://github.com/remaxjs/remax/compare/v1.0.6...v1.0.7) (2025-05-11)

### Bug Fixes

- **one:** 修复 @rsmax/redbox-react 丢失问题 ([e2f6174](https://github.com/remaxjs/remax/commit/e2f6174ed7225f511771af715b65416501c04b8d))

## [1.0.6](https://github.com/remaxjs/remax/compare/v1.0.5...v1.0.6) (2025-05-11)

**Note:** Version bump only for package @rsmax/cli

## [1.0.5](https://github.com/remaxjs/remax/compare/v1.0.4...v1.0.5) (2025-05-11)

### Bug Fixes

- **cli:** 修复 babel-preset-rsmax 问题 ([75b501b](https://github.com/remaxjs/remax/commit/75b501b452a76f3f4083e1af61d824972c58ac99))

## [1.0.4](https://github.com/remaxjs/remax/compare/v1.0.3...v1.0.4) (2025-05-11)

**Note:** Version bump only for package @rsmax/cli

## 1.0.3 (2025-05-11)

### Bug Fixes

- 修复 package.json 版本变更问题 workspace ([fa166c4](https://github.com/remaxjs/remax/commit/fa166c4bfd9adfe7e4f2e061a44d9f90a4ca914d))

## 1.0.2 (2025-05-11)

### Bug Fixes

- 修复 package.json 版本变更问题 workspace ([fa166c4](https://github.com/remaxjs/remax/commit/fa166c4bfd9adfe7e4f2e061a44d9f90a4ca914d))

**Note:** Version bump only for package @rsmax/cli
