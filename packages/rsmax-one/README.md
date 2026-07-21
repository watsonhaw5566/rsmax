# Rsmax One

是 Rsmax 的一个子包，专注于构建跨平台小程序。 rsmax 依赖中已包含该子包，无需单独安装。

## 🎯 特性

- **统一组件**: 提供 38 个跨平台统一组件，自动适配不同平台
- **平台特定组件**: 支持访问各平台独有组件
- **统一 API**: 通过代理模式自动路由到平台特定 API
- **完整类型提示**: 提供详细的 TypeScript 类型定义
- **Tree Shaking 支持**: 通过 `sideEffects: false` 优化构建

## 🚀 快速开始

### 基础用法

```tsx
import { View, Text, Image, Button } from '@rsmax/one';

function App() {
  return (
    <View className="container">
      <Text>Hello Rsmax One!</Text>
      <Image src="https://example.com/logo.png" mode="aspectFit" />
      <Button onClick={() => console.log('Clicked!')}>Click Me</Button>
    </View>
  );
}
```

## 🧩 统一组件

`@rsmax/one` 提供 38 个跨平台统一组件，无需关心平台差异：

### 基础组件

| 组件       | 说明       |
| ---------- | ---------- |
| `View`     | 视图容器   |
| `Text`     | 文本组件   |
| `Image`    | 图片组件   |
| `Button`   | 按钮组件   |
| `Input`    | 输入框     |
| `Textarea` | 多行输入框 |
| `Form`     | 表单组件   |
| `Label`    | 标签组件   |

### 导航组件

| 组件            | 说明                  |
| --------------- | --------------------- |
| `Navigator`     | 页面导航              |
| `WebView`       | 网页视图              |
| `PageContainer` | 页面容器（弹窗/抽屉） |

### 滚动与滑块

| 组件         | 说明       |
| ------------ | ---------- |
| `ScrollView` | 滚动视图   |
| `Swiper`     | 轮播图     |
| `SwiperItem` | 轮播项     |
| `Slider`     | 滑动选择器 |

### 表单组件

| 组件               | 说明       |
| ------------------ | ---------- |
| `Switch`           | 开关组件   |
| `Radio`            | 单选框     |
| `RadioGroup`       | 单选框组   |
| `Checkbox`         | 复选框     |
| `CheckboxGroup`    | 复选框组   |
| `Picker`           | 选择器     |
| `PickerView`       | 滚动选择器 |
| `PickerViewColumn` | 选择器列   |
| `Progress`         | 进度条     |

### 媒体组件

| 组件       | 说明     |
| ---------- | -------- |
| `Video`    | 视频组件 |
| `Canvas`   | 画布组件 |
| `Camera`   | 相机组件 |
| `Map`      | 地图组件 |
| `RichText` | 富文本   |
| `Icon`     | 图标组件 |

### 容器组件

| 组件           | 说明       |
| -------------- | ---------- |
| `CoverView`    | 覆盖视图   |
| `CoverImage`   | 覆盖图片   |
| `MovableArea`  | 可移动区域 |
| `MovableView`  | 可移动视图 |
| `ShareElement` | 共享元素   |
| `RootPortal`   | 根级门户   |
| `PageMeta`     | 页面元信息 |

### 广告与适配

| 组件         | 说明           |
| ------------ | -------------- |
| `Ad`         | 广告组件       |
| `MatchMedia` | 响应式媒体查询 |

## 📱 平台特定组件

除了统一组件外，`@rsmax/one` 还导出各平台特定的组件：

```tsx
import { wechat, ali, toutiao } from '@rsmax/one';

// 使用微信特有组件
function WechatOnly() {
  return <wechat.Ad unitId="ad-unit-id" />;
}

// 使用支付宝特有组件
function AliOnly() {
  return <ali.ContactButton />;
}

// 使用头条特有组件
function ToutiaoOnly() {
  return <toutiao.RtcRoom />;
}
```

### 平台特定组件列表

**微信 (wechat)**

- `Ad`, `AdCustom`, `Audio`, `ChannelLive`, `ChannelVideo`, `Editor`, `EditorPortal`, `FunctionalPageNavigator`,
  `LivePlayer`, `LivePusher`, `OpenData`, `OfficialAccount`, `OfficialAccountPublish`, `StoreCoupon`, `StoreGift`,
  `StoreHome`, `StoreProduct`, `VoipRoom`, 以及各种手势处理器

**支付宝 (ali)**

- `Ad`, `ContactButton`, `ErrorView`, `JoinGroupChat`, `Lifestyle`, `Lottie`, `SubscribeMessage`

**头条 (toutiao)**

- `Ad`, `LivePlayer`, `LivePreview`, `Mask`, `RtcRoom`

## 🔌 统一 API

`@rsmax/one` 提供统一的 API 接口，自动适配不同平台：

```tsx
import { api } from '@rsmax/one';

// 调用统一 API，自动路由到对应平台
api.navigateTo({ url: '/pages/index' });
api.showToast({ title: 'Hello!' });
api.request({ url: 'https://api.example.com' });
```

### API 使用示例

```tsx
// 页面导航
api.navigateTo({ url: '/pages/detail' });
api.navigateBack();
api.switchTab({ url: '/pages/home' });

// 弹窗提示
api.showToast({ title: '成功', icon: 'success' });
api.showModal({ title: '提示', content: '确定删除？' });

// 网络请求
api.request({
  url: 'https://api.example.com/data',
  method: 'GET',
  success: res => console.log(res.data),
});

// 数据存储
api.setStorageSync('key', 'value');
const data = api.getStorageSync('key');
```

### 平台特定 API

如果需要访问平台特定 API，可以使用平台特定的 API 对象：

```tsx
import { wechatAPI, aliAPI, toutiaoAPI, getCurrentPlatform } from '@rsmax/one';

const platform = getCurrentPlatform(); // 'wechat' | 'ali' | 'toutiao'

if (platform === 'wechat') {
  wechatAPI.startRecord();
} else if (platform === 'ali') {
  aliAPI.chooseImage();
}
```

## 📋 类型定义

`@rsmax/one` 提供完整的 TypeScript 类型定义：

```tsx
import type { ViewProps, TextProps, ImageProps, ButtonProps, UnifiedAPI } from '@rsmax/one';

interface MyComponentProps {
  viewProps?: ViewProps;
  api?: UnifiedAPI;
}
```

### 常用类型

| 类型          | 说明                                        |
| ------------- | ------------------------------------------- |
| `ViewProps`   | View 组件属性                               |
| `TextProps`   | Text 组件属性                               |
| `ImageProps`  | Image 组件属性                              |
| `ButtonProps` | Button 组件属性                             |
| `BaseProps`   | 基础属性接口                                |
| `Platform`    | 平台类型 (`'wechat' \| 'ali' \| 'toutiao'`) |
| `UnifiedAPI`  | 统一 API 类型                               |

## 🏗️ 架构设计

### 组件工厂模式

```
createUnifiedComponent('View')
    │
    ▼
┌─────────────────────────────────────────────────────┐
│           ComponentFactory.ts                       │
│  ┌─────────────────┐                               │
│  │ detectPlatform() │ ──► 检测运行平台              │
│  └────────┬────────┘                               │
│           │                                        │
│           ▼                                        │
│  ┌─────────────────────────────────┐               │
│  │ platformComponentProps[platform]│ ──► 获取平台  │
│  │   ['View']                     │     默认属性    │
│  └──────────────┬────────────────┘               │
│                 │                                  │
│                 ▼                                  │
│  ┌─────────────────────────────────┐               │
│  │ componentConfigs['View']        │ ──► 获取组件  │
│  │   .tagName = 'view'             │     配置       │
│  │   .eventHandlers = [...]        │               │
│  └──────────────┬────────────────┘               │
│                 │                                  │
│                 ▼                                  │
│  React.createElement(tagName, props)               │
└─────────────────────────────────────────────────────┘
```

### API 代理模式

```
api.navigateTo(options)
    │
    ▼
┌─────────────────────────────────────────────────────┐
│           UnifiedAPI Proxy                          │
│  ┌─────────────────┐                               │
│  │ get(target, prop)│                               │
│  └────────┬────────┘                               │
│           │                                        │
│           ▼                                        │
│  getCurrentAPI() ──► wechatAPI / aliAPI / toutiaoAPI
│           │                                        │
│           ▼                                        │
│  return currentAPI[prop]                           │
│           │                                        │
│           ▼                                        │
│  wx.navigateTo / my.navigateTo / tt.navigateTo     │
└─────────────────────────────────────────────────────┘
```

## 📝 示例项目

```tsx
import { View, Text, Image, Button, ScrollView, Swiper, SwiperItem, api } from '@rsmax/one';

function HomePage() {
  const handleClick = () => {
    api.showToast({ title: '欢迎使用 Rsmax One!' });
  };

  return (
    <ScrollView scrollY className="page">
      <View className="header">
        <Image src="/logo.png" mode="aspectFit" className="logo" />
        <Text className="title">Rsmax One</Text>
        <Text className="subtitle">一次编写，多端运行</Text>
      </View>

      <Swiper className="banner" indicatorDots autoplay>
        <SwiperItem>
          <Image src="/banner1.png" mode="aspectFill" />
        </SwiperItem>
        <SwiperItem>
          <Image src="/banner2.png" mode="aspectFill" />
        </SwiperItem>
      </Swiper>

      <View className="content">
        <Button type="primary" onClick={handleClick}>
          开始体验
        </Button>
      </View>
    </ScrollView>
  );
}
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License
