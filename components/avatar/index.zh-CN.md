---
category: Components
subtitle: 头像
type: 数据展示
title: Avatar
---

用来代表用户或事物，支持图片、图标或字符展示。

## 设计师专属

安装 [Kitchen Sketch 插件 💎](https://kitchen.alipay.com)，一键填充高逼格头像和文本.

## API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| icon | 设置头像的图标类型，可设为 Icon 的 `type` 或 ReactNode | string \| ReactNode | - |  |
| shape | 指定头像的形状 | Enum{ 'circle', 'square' } | `circle` |  |
| size | 设置头像的大小 | number \| Enum{ 'large', 'small', 'default' } | `default` |  |
| src | 图片类头像的资源地址 | string | - |  |
| srcSet | 设置图片类头像响应式资源地址 | string | - | 3.11.0 |
| alt | 图像无法显示时的替代文本 | string | - | 3.7.0 |
| onError | 图片加载失败的事件，返回 false 会关闭组件默认的 fallback 行为 | () => boolean | - | 3.8.0 |
