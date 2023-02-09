---
category: Components
group: 数据展示
subtitle: 日历
title: Calendar
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*nF6_To7pDSAAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*-p-wQLik200AAAAAAAAAAAAADrJ8AQ/original
---

按照日历形式展示数据的容器。

## 何时使用

当数据是日期或按照日期划分时，例如日程、课表、价格日历等，农历等。目前支持年/月切换。

## 代码演示

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">基本</code>
<code src="./demo/notice-calendar.tsx">通知事项日历</code>
<code src="./demo/card.tsx">卡片模式</code>
<code src="./demo/select.tsx">选择功能</code>
<code src="./demo/customize-header.tsx">自定义头部</code>

## API

**注意**：Calendar 部分 locale 是从 value 中读取，所以请先正确设置 dayjs 的 locale。

```jsx
// 默认语言为 en-US，所以如果需要使用其他语言，推荐在入口文件全局设置 locale
// import dayjs from 'dayjs';
// import 'dayjs/locale/zh-cn';
// dayjs.locale('zh-cn');

<Calendar
  dateCellRender={dateCellRender}
  monthCellRender={monthCellRender}
  onPanelChange={onPanelChange}
  onSelect={onSelect}
/>
```

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| dateCellRender | 自定义渲染日期单元格，返回内容会被追加到单元格 | function(date: Dayjs): ReactNode | - |  |
| dateFullCellRender | 自定义渲染日期单元格，返回内容覆盖单元格 | function(date: Dayjs): ReactNode | - |  |
| defaultValue | 默认展示的日期 | [dayjs](https://day.js.org/) | - |  |
| disabledDate | 不可选择的日期，参数为当前 `value`，注意使用时[不要直接修改](https://github.com/ant-design/ant-design/issues/30987) | (currentDate: Dayjs) => boolean | - |  |
| fullscreen | 是否全屏显示 | boolean | true |  |
| headerRender | 自定义头部内容 | function(object:{value: Dayjs, type: string, onChange: f(), onTypeChange: f()}) | - |  |
| locale | 国际化配置 | object | [(默认配置)](https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json) |  |
| mode | 初始模式 | `month` \| `year` | `month` |  |
| monthCellRender | 自定义渲染月单元格，返回内容会被追加到单元格 | function(date: Dayjs): ReactNode | - |  |
| monthFullCellRender | 自定义渲染月单元格，返回内容覆盖单元格 | function(date: Dayjs): ReactNode | - |  |
| validRange | 设置可以显示的日期 | \[[dayjs](https://day.js.org/), [dayjs](https://day.js.org/)] | - |  |
| value | 展示日期 | [dayjs](https://day.js.org/) | - |  |
| onChange | 日期变化回调 | function(date: Dayjs) | - |  |
| onPanelChange | 日期面板变化回调 | function(date: Dayjs, mode: string) | - |  |
| onSelect | 点击选择日期回调 | function(date: Dayjs） | - |  |

## FAQ

### 如何在 Calendar 中使用自定义日期库

参考 [使用自定义日期库](/docs/react/use-custom-date-library#calendar)。

### 如何给日期类组件配置国际化？

参考 [如何给日期类组件配置国际化](/components/date-picker-cn#%E5%9B%BD%E9%99%85%E5%8C%96%E9%85%8D%E7%BD%AE)。

### 为什么时间类组件的国际化 locale 设置不生效？

参考 FAQ [为什么时间类组件的国际化 locale 设置不生效？](/docs/react/faq#为什么时间类组件的国际化-locale-设置不生效)。
