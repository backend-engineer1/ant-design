---
category: Components
subtitle: 全局化配置
cols: 1
type: 其他
title: ConfigProvider
---

为组件提供统一的全局化配置。

## 使用

ConfigProvider 使用 React 的 [context](https://facebook.github.io/react/docs/context.html) 特性，只需在应用外围包裹一次即可全局生效。

```jsx
import { ConfigProvider } from 'antd';

// ...

return (
  <ConfigProvider {...yourConfig}>
    <App />
  </ConfigProvider>
);
```

### Content Security Policy

部分组件为了支持波纹效果，使用了动态样式。如果开启了 Content Security Policy (CSP)，你可以通过 `csp` 属性来进行配置：

```jsx
<ConfigProvider csp={{ nonce: 'YourNonceCode' }}>
  <Button>My Button</Button>
</ConfigProvider>
```

## API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| autoInsertSpaceInButton | 设置为 `false` 时，移除按钮中 2 个汉字之间的空格 | boolean | true | 3.13.0 |
| csp | 设置 [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) 配置 | { nonce: string } | - | 3.13.1 |
| renderEmpty | 自定义组件空状态。参考 [空状态](/components/empty/) | Function(componentName: string): ReactNode | - | 3.12.2 |
| getPopupContainer | 弹出框（Select, Tooltip, Menu 等等）渲染父节点，默认渲染到 body 上。 | Function(triggerNode) | () => document.body | 3.11.0 |
| locale | 语言包配置，语言包可到 [antd/es/locale](http://unpkg.com/antd/es/locale/) 目录下寻找 | object | - | 3.21.0 |
| prefixCls | 设置统一样式前缀 | string | ant | 3.12.0 |
| pageHeader | 统一设置 pageHeader 的 ghost，参考 [pageHeader](<(/components/page-header)>) | { ghost: boolean } | 'true' | 3.24.0 |

## FAQ

#### 为什么我使用了 ConfigProvider `locale`，时间类组件的国际化还有问题？

请检查是否设置了 `moment.locale('zh-cn')`，或者是否有两个版本的 moment 共存。
