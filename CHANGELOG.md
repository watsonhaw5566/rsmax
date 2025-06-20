# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.3.13](https://github.com/watsonhaw5566/rsmax/compare/v1.3.12...v1.3.13) (2025-06-16)

### Bug Fixes

- **ali:** Button 组件 补充 open-type 'chooseAvatar' 类型 和 onChooseAvatar 事件 ([5f5a0ce](https://github.com/watsonhaw5566/rsmax/commit/5f5a0cee2a8883d03b029c2513c2a1816c7b585a))
- **ali:** 补充 Ad 组件 ([159403e](https://github.com/watsonhaw5566/rsmax/commit/159403e86e5034550cda0fde7cebb80c106dab39))
- **ali:** 补充 ErrorView 组件 ([a7cc6eb](https://github.com/watsonhaw5566/rsmax/commit/a7cc6eb3cea806b412fde47cca91497fb2e2c193))
- **ali:** 补充 JoinGroupChat 组件 ([299efc6](https://github.com/watsonhaw5566/rsmax/commit/299efc61a813dabbeaf51db97d269024f25f4011))
- **ali:** 补充 MatchMedia 组件 ([cfe5414](https://github.com/watsonhaw5566/rsmax/commit/cfe5414d76c4107fb883327130e419ffcc43e9a6))
- **ali:** 补充 PageContainer 组件 ([0c797dc](https://github.com/watsonhaw5566/rsmax/commit/0c797dcde779cf4d68adfdadef11169b3a537d71))
- **ali:** 补充 PageMeta 组件 ([54e2aa1](https://github.com/watsonhaw5566/rsmax/commit/54e2aa13d1a8df70513c36adb4361b3d9fff497a))
- **ali:** 补充 RootPortal 组件 ([54d06d0](https://github.com/watsonhaw5566/rsmax/commit/54d06d067fbfa3903f4750d9cb915b3acf3c97a6))
- **ali:** 补充 RootPortal 组件 ([198e97e](https://github.com/watsonhaw5566/rsmax/commit/198e97ef568cf66ada477debee2b5a558e277b6e))
- **ali:** 补充 ShareElement 组件 ([18f8c0e](https://github.com/watsonhaw5566/rsmax/commit/18f8c0e5653746341c9fd15533d9a7d5b5b85991))
- **ali:** 补充 SubscribeMessage 组件 ([52c6f49](https://github.com/watsonhaw5566/rsmax/commit/52c6f4958569ccc49c30193bf384cad2ccb04940))
- **ali:** 补充 阿里系小程序缺失的 api ([7c6e38e](https://github.com/watsonhaw5566/rsmax/commit/7c6e38e8560316c51ebd94ddb1929cc9ff76ddd3))
- **cli:** 修复 web 构建 ([#32](https://github.com/watsonhaw5566/rsmax/issues/32)) ([1c61ff6](https://github.com/watsonhaw5566/rsmax/commit/1c61ff6479be00e455c689e4a444555c213b6e4b))
- **cli:** 修复小程序插件 ([#29](https://github.com/watsonhaw5566/rsmax/issues/29)) ([771e3de](https://github.com/watsonhaw5566/rsmax/commit/771e3dee7194c0101eff29bd538739b3444b4f53))
- **framework-shared:** 修复 promisify 的返回类型定义 ([#25](https://github.com/watsonhaw5566/rsmax/issues/25)) ([9a7d38d](https://github.com/watsonhaw5566/rsmax/commit/9a7d38d2a6f40eb6994903730bec4456e504159a))
- **toutiao:** 修复 MatchMedia 组件缺失属性 ([7abfece](https://github.com/watsonhaw5566/rsmax/commit/7abfece2a75978a0e4b977ddfdec10ba33734f71))

## [1.3.12](https://github.com/watsonhaw5566/rsmax/compare/v1.3.11...v1.3.12) (2025-06-08)

### Bug Fixes

- **cli:** devtool 工具默认为关闭 ([60406ca](https://github.com/watsonhaw5566/rsmax/commit/60406cae90f75dbca4b0234a6ce9c7c97d4790c2))
- **cli:** swc js rule 名称为 swc ([531383c](https://github.com/watsonhaw5566/rsmax/commit/531383c73f7970ac67b5b6192e042f3b1538846a))
- **cli:** 生产之前应该 clean 之前产物 ([964c0a6](https://github.com/watsonhaw5566/rsmax/commit/964c0a6491b7fc4931ea6c33d899202e70909e89))
- **cli:** 移除 output.target 为 node 平台 ([9f619df](https://github.com/watsonhaw5566/rsmax/commit/9f619dfc9d59a0710095947bd96aab181ea82652))
- **postcss-tag:** 修复 rsmax 文档位置与 remax 替换为 rsmax ([84941a2](https://github.com/watsonhaw5566/rsmax/commit/84941a27551ade8b0c85d8873715aad6980ffdcc))

## [1.3.11](https://github.com/watsonhaw5566/rsmax/compare/v1.3.8...v1.3.11) (2025-06-04)

### Bug Fixes

- **toutiao:** 修复 arrowOption 为非必填 ([525206c](https://github.com/watsonhaw5566/rsmax/commit/525206c8a03af12703db5d257c376cd1656b7ce0))
- **toutiao:** 修复 camera 文档问题 ([3849261](https://github.com/watsonhaw5566/rsmax/commit/384926153153a010e53ac0451803f9f15afd243c))
- **toutiao:** 修复 objectFit 字段存在空格 ([9a70b70](https://github.com/watsonhaw5566/rsmax/commit/9a70b70a6dd63e717a7e9a0278f25d3c26386986))
- **toutiao:** 修复 onUserScreenRecord 接口错误赋值 ([bf64edf](https://github.com/watsonhaw5566/rsmax/commit/bf64edf39c601d40f6511bafc823135674496d9d))
- **toutiao:** 修复 重复导出 setPageInfo ([e54da71](https://github.com/watsonhaw5566/rsmax/commit/e54da71c2607094c2b893360d2ac07a6079deaba))
- **toutiao:** 更新 MovableView 、MovableArea 文档地址 ([20a4863](https://github.com/watsonhaw5566/rsmax/commit/20a48639a294f97678395912c845f72b685a972c))
- **toutiao:** 补充 Ad / Mask 组件 ([fdeadc6](https://github.com/watsonhaw5566/rsmax/commit/fdeadc63cef2092ffab7461f27316adfbd96a5d3))
- **toutiao:** 补充 Camera 组件 ([50ae417](https://github.com/watsonhaw5566/rsmax/commit/50ae4171de84a0f327b0542a8e8002cb35b5b50f))
- **toutiao:** 补充 LivePlayer 组件 ([41523f4](https://github.com/watsonhaw5566/rsmax/commit/41523f40c8daf2fbc2c7174fbf725548f00a3bf7))
- **toutiao:** 补充 LivePreview 组件 ([62cddba](https://github.com/watsonhaw5566/rsmax/commit/62cddba50f38b8d0959198733b9fe9b493f7c6db))
- **toutiao:** 补充 Map 组件 ([3cac5bb](https://github.com/watsonhaw5566/rsmax/commit/3cac5bb292bdccb479ca38731514df70bc370646))
- **toutiao:** 补充 MatchMedia 组件 ([f8b7e12](https://github.com/watsonhaw5566/rsmax/commit/f8b7e123fe36772c6aae6e555a8e3849a393bdcb))
- **toutiao:** 补充 Progress 组件 duration 属性 ([8064a9f](https://github.com/watsonhaw5566/rsmax/commit/8064a9f5956392a0ab7a9f4216915df5121a64cd))
- **toutiao:** 补充 RichText 组件 space 属性 ([c957999](https://github.com/watsonhaw5566/rsmax/commit/c957999d120551eb79377c7f13196684057f0d68))
- **toutiao:** 补充 RtcRoom 组件 ([813319c](https://github.com/watsonhaw5566/rsmax/commit/813319ccbbaeecf7009b16aa78ebcdd04f3bcd57))
- **toutiao:** 补充 缺失的 api ([727425f](https://github.com/watsonhaw5566/rsmax/commit/727425f20e98b6a2f909e89606ba71244fa8c0a3))

## [1.3.10](https://github.com/watsonhaw5566/rsmax/compare/v1.3.9...v1.3.10) (2025-06-04)

**Note:** Version bump only for package root

## [1.3.9](https://github.com/watsonhaw5566/rsmax/compare/v1.3.8...v1.3.9) (2025-06-04)

### Bug Fixes

- **toutiao:** 修复 arrowOption 为非必填 ([525206c](https://github.com/watsonhaw5566/rsmax/commit/525206c8a03af12703db5d257c376cd1656b7ce0))
- **toutiao:** 修复 camera 文档问题 ([3849261](https://github.com/watsonhaw5566/rsmax/commit/384926153153a010e53ac0451803f9f15afd243c))
- **toutiao:** 修复 objectFit 字段存在空格 ([9a70b70](https://github.com/watsonhaw5566/rsmax/commit/9a70b70a6dd63e717a7e9a0278f25d3c26386986))
- **toutiao:** 修复 onUserScreenRecord 接口错误赋值 ([bf64edf](https://github.com/watsonhaw5566/rsmax/commit/bf64edf39c601d40f6511bafc823135674496d9d))
- **toutiao:** 修复 重复导出 setPageInfo ([e54da71](https://github.com/watsonhaw5566/rsmax/commit/e54da71c2607094c2b893360d2ac07a6079deaba))
- **toutiao:** 更新 MovableView 、MovableArea 文档地址 ([20a4863](https://github.com/watsonhaw5566/rsmax/commit/20a48639a294f97678395912c845f72b685a972c))
- **toutiao:** 补充 Ad / Mask 组件 ([fdeadc6](https://github.com/watsonhaw5566/rsmax/commit/fdeadc63cef2092ffab7461f27316adfbd96a5d3))
- **toutiao:** 补充 Camera 组件 ([50ae417](https://github.com/watsonhaw5566/rsmax/commit/50ae4171de84a0f327b0542a8e8002cb35b5b50f))
- **toutiao:** 补充 LivePlayer 组件 ([41523f4](https://github.com/watsonhaw5566/rsmax/commit/41523f40c8daf2fbc2c7174fbf725548f00a3bf7))
- **toutiao:** 补充 LivePreview 组件 ([62cddba](https://github.com/watsonhaw5566/rsmax/commit/62cddba50f38b8d0959198733b9fe9b493f7c6db))
- **toutiao:** 补充 Map 组件 ([3cac5bb](https://github.com/watsonhaw5566/rsmax/commit/3cac5bb292bdccb479ca38731514df70bc370646))
- **toutiao:** 补充 MatchMedia 组件 ([f8b7e12](https://github.com/watsonhaw5566/rsmax/commit/f8b7e123fe36772c6aae6e555a8e3849a393bdcb))
- **toutiao:** 补充 Progress 组件 duration 属性 ([8064a9f](https://github.com/watsonhaw5566/rsmax/commit/8064a9f5956392a0ab7a9f4216915df5121a64cd))
- **toutiao:** 补充 RichText 组件 space 属性 ([c957999](https://github.com/watsonhaw5566/rsmax/commit/c957999d120551eb79377c7f13196684057f0d68))
- **toutiao:** 补充 RtcRoom 组件 ([813319c](https://github.com/watsonhaw5566/rsmax/commit/813319ccbbaeecf7009b16aa78ebcdd04f3bcd57))
- **toutiao:** 补充 缺失的 api ([727425f](https://github.com/watsonhaw5566/rsmax/commit/727425f20e98b6a2f909e89606ba71244fa8c0a3))

## [1.3.8](https://github.com/watsonhaw5566/rsmax/compare/v1.3.7...v1.3.8) (2025-06-04)

### Bug Fixes

- **wechat:** api 补充缺失接口 ([e1f285f](https://github.com/watsonhaw5566/rsmax/commit/e1f285f147527b8061f1a44d2c9d8d0e6a3ef1b2))
- **wechat:** 移除 vitest 快照更新 ([a61752f](https://github.com/watsonhaw5566/rsmax/commit/a61752f7188f0f37566943a4f8dcf3fdffc1b272))
- **wechat:** 补充 Button 组件 getRealtimePhoneNumber、agreePrivacyAuthorization、createLiveActivity、phoneNumberNoQuotaToast、needShowEntrance、entrancePath 事件 ([ea6b9b0](https://github.com/watsonhaw5566/rsmax/commit/ea6b9b09a8654332c88352452171759996f9f1fa))
- **wechat:** 补充 cover-image referrer-policy 属性 ([f1f7e65](https://github.com/watsonhaw5566/rsmax/commit/f1f7e6543f9c2012eec6c0bf00379b7d2fa49a61))
- **wechat:** 补充 EditorPortal 组件 ([89f9ed8](https://github.com/watsonhaw5566/rsmax/commit/89f9ed8b88ab06c7cb9e2a4ae4f51d5be3d93b71))
- **wechat:** 补充 rich-text userSelect 属性 ([5e53df7](https://github.com/watsonhaw5566/rsmax/commit/5e53df7112ab7a9f724be8d07a531c69032e92de))
- **wechat:** 补充 scroll-view scrollIntoViewOffset、enablePassive 属性 ([0a39e25](https://github.com/watsonhaw5566/rsmax/commit/0a39e25b140a6f3b895f01f54675ae07f8c0e302))
- **wechat:** 补充 Selection 组件 ([635099d](https://github.com/watsonhaw5566/rsmax/commit/635099db667af1e745a741e6423bdb7f9c408994))

## [1.3.7](https://github.com/watsonhaw5566/rsmax/compare/v1.3.6...v1.3.7) (2025-06-03)

### Bug Fixes

- **cli:** 修复 RouterType 为枚举类型 ([3f24bc7](https://github.com/watsonhaw5566/rsmax/commit/3f24bc7b1d7c79922fcafcda73ff4badbf37e501))
- **cli:** 新增 @swc/core 依赖 ([94cdc66](https://github.com/watsonhaw5566/rsmax/commit/94cdc6638927ac23d12f4ef1f70cc3b343354e71))

## [1.3.6](https://github.com/watsonhaw5566/rsmax/compare/v1.3.5...v1.3.6) (2025-06-03)

### Bug Fixes

- **cli:** 使用 swc-loader 解析 js(x)/ts(x) ([b3447d9](https://github.com/watsonhaw5566/rsmax/commit/b3447d9447c2b141d2283b4d1fd41cdbdaecf54a))
- **web:** [#10](https://github.com/watsonhaw5566/rsmax/issues/10) ([44ea6ee](https://github.com/watsonhaw5566/rsmax/commit/44ea6ee67d2529611142ca802563526cf7323551))

## [1.3.5](https://github.com/watsonhaw5566/rsmax/compare/v1.3.4...v1.3.5) (2025-06-02)

### Bug Fixes

- **cli:** 恢复 getModules ([9ec8977](https://github.com/watsonhaw5566/rsmax/commit/9ec8977433406858cc671827704a6c75d85403e1))

## [1.3.4](https://github.com/watsonhaw5566/rsmax/compare/v1.3.3...v1.3.4) (2025-06-02)

### Bug Fixes

- **web:** 修复 web 平台无法启动 ([567d4b8](https://github.com/watsonhaw5566/rsmax/commit/567d4b88d99f3c2770336619d62197db16199e49))
- **web:** 修复测试 ([31d6c23](https://github.com/watsonhaw5566/rsmax/commit/31d6c23d9da225bfe75eb696c6baeadf436e2554))

## [1.3.3](https://github.com/watsonhaw5566/rsmax/compare/v1.3.2...v1.3.3) (2025-05-30)

### Bug Fixes

- **cli:** 原生组件 entry 需要 fs 写入 ([baca6f7](https://github.com/watsonhaw5566/rsmax/commit/baca6f70a8511ec93a28cd8ee06850c2862f0d88))

## [1.3.2](https://github.com/watsonhaw5566/rsmax/compare/v1.3.1...v1.3.2) (2025-05-30)

### Bug Fixes

- **cli:** 修复 app.json 生成时延时 500ms ([634dceb](https://github.com/watsonhaw5566/rsmax/commit/634dceb1dd057916536d88c82e7f514b87ac3d6c))
- **cli:** 修复 rsdoctor 路径应为动态路径，而不是固定值 ([eafb6ae](https://github.com/watsonhaw5566/rsmax/commit/eafb6aec8cf01ffe5e304ebe5fb099cb59ea78a7))
- **cli:** 修复热监听时候失效问题 ([d5e4b94](https://github.com/watsonhaw5566/rsmax/commit/d5e4b9496342124430a3542d7f2571cc4876d078))
- **cli:** 修热监听失效问题 ([9baaf3e](https://github.com/watsonhaw5566/rsmax/commit/9baaf3e496eda8bb0895c2e93daf57b517fbbeba))
- **cli:** 移除 watch.ts 中的 addEntry 参数 ([19dd6e9](https://github.com/watsonhaw5566/rsmax/commit/19dd6e92c0b7d22e62493b1637d51b999cb92de2))

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
