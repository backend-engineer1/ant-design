---
category: Components
title: Anchor
subtitle: 锚点
cover: https://gw.alipayobjects.com/zos/bmw-prod/669b87c5-7b44-4c99-a5ea-4c38f8004788.svg
demo:
  cols: 2
group:
  title: 导航
  order: 3
---

用于跳转到页面指定位置。

## 何时使用

需要展现当前页面上可供跳转的锚点链接，以及快速在锚点之间跳转。

> 开发者注意事项：
>
> 自 `4.24.0` 起，由于组件从 class 重构成 FC，之前一些获取 `ref` 并调用内部实例方法的写法都会失效

## 代码演示

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">基本</code>
<code src="./demo/static.tsx">静态位置</code>
<code src="./demo/onClick.tsx">自定义 onClick 事件</code>
<code src="./demo/customizeHighlight.tsx">自定义锚点高亮</code>
<code src="./demo/targetOffset.tsx">设置锚点滚动偏移量</code>
<code src="./demo/onChange.tsx">监听锚点链接改变</code>

## API

### Anchor Props

| 成员 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| affix | 固定模式 | boolean | true |  |
| bounds | 锚点区域边界 | number | 5 |  |
| getContainer | 指定滚动的容器 | () => HTMLElement | () => window |  |
| getCurrentAnchor | 自定义高亮的锚点 | (activeLink: string) => string | - |  |
| offsetTop | 距离窗口顶部达到指定偏移量后触发 | number |  |  |
| showInkInFixed | `affix={false}` 时是否显示小圆点 | boolean | false |  |
| targetOffset | 锚点滚动偏移量，默认与 offsetTop 相同，[例子](#components-anchor-demo-targetOffset) | number | - |  |
| onChange | 监听锚点链接改变 | (currentActiveLink: string) => void | - |  |
| onClick | `click` 事件的 handler | function(e: Event, link: Object) | - |  |

### Link Props

| 成员   | 说明                             | 类型      | 默认值 | 版本 |
| ------ | -------------------------------- | --------- | ------ | ---- |
| href   | 锚点链接                         | string    | -      |      |
| target | 该属性指定在何处显示链接的资源。 | string    | -      |      |
| title  | 文字内容                         | ReactNode | -      |      |
