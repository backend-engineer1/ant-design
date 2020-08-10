---
category: Components
type: General
title: Typography
cols: 1
cover: https://gw.alipayobjects.com/zos/alicdn/GOM1KQ24O/Typography.svg
---

Basic text writing, including headings, body text, lists, and more.

## When To Use

- When need to display a title or paragraph contents in Articles/Blogs/Notes.
- When you need copyable/editable/ellipsis texts.

## API

### Typography.Text

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| code | Code style | boolean | false |  |
| copyable | Whether to be copyable, customize it via setting an object | boolean \| { text: string, onCopy: function, icon: ReactNode, tooltips: boolean \| ReactNode } | false | See [below](#copyable) |
| delete | Deleted line style | boolean | false |  |
| disabled | Disabled content | boolean | false |  |
| editable | If editable. Can control edit state when is object | boolean \| { editing: boolean, maxLength: number, autoSize: true \| false \| { minRows: number, maxRows: number }, onStart: function, onChange: function(string), icon: ReactNode, tooltip: boolean \| ReactNode } | false | See [below](#editable) |
| ellipsis | Display ellipsis when text overflows. Should set width when ellipsis needed | boolean | false |  |
| mark | Marked style | boolean | false |  |
| keyboard | Keyboard style | boolean | false | 4.3.0 |
| underline | Underlined style | boolean | false |  |
| onChange | Trigger when user edits the content | function(string) | - |  |
| strong | Bold style | boolean | false |  |
| type | Content type | `secondary` \| `warning` \| `danger` | - |  |

### Typography.Title

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| code | Code style | boolean | false |  |
| copyable | Whether to be copyable, customize it via setting an object | boolean \| { text: string, onCopy: function, icon: ReactNode, tooltips: boolean \| ReactNode } | false | See [below](#copyable) |
| delete | Deleted line style | boolean | false |  |
| disabled | Disabled content | boolean | false |  |
| editable | If editable. Can control edit state when is object | boolean \| { editing: boolean, maxLength: number, autoSize: true \| false \| { minRows: number, maxRows: number }, onStart: function, onChange: function(string), icon: ReactNode, tooltip: boolean \| ReactNode } | false | See [below](#editable) |
| ellipsis | Display ellipsis when text overflows. Can configure rows and expandable by using object | boolean \| { rows: number, expandable: boolean, onExpand: function(event), onEllipsis: function(ellipsis) } | false | onEllipsis: 4.2.0 |
| level | Set content importance. Match with `h1`, `h2`, `h3`, `h4`, `h5` | number: 1, 2, 3, 4, 5 | 1 | 5: 4.6.0 |
| mark | Marked style | boolean | false |  |
| underline | Underlined style | boolean | false |  |
| onChange | Trigger when user edits the content | function(string) | - |  |
| type | Content type | `secondary` \| `warning` \| `danger` | - |  |

### Typography.Paragraph

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| code | Code style | boolean | false |  |
| copyable | Whether to be copyable, customize it via setting an object | boolean \| { text: string, onCopy: function, icon: ReactNode, tooltips: boolean \| ReactNode } | false | See [below](#copyable) |
| delete | Deleted line style | boolean | false |  |
| disabled | Disabled content | boolean | false |  |
| editable | If editable. Can control edit state when is object | boolean \| { editing: boolean, maxLength: number, autoSize: true \| false \| { minRows: number, maxRows: number }, onStart: function, onChange: function(string), icon: ReactNode, tooltip: boolean \| ReactNode } | false | See [below](#editable) |
| ellipsis | Display ellipsis when text overflows. Can configure rows expandable and suffix by using object | boolean \| { rows: number, expandable: boolean, suffix: string, symbol: React.ReactNode, onExpand: function(event), onEllipsis: function(ellipsis) } | false | onEllipsis: 4.2.0 |
| mark | Marked style | boolean | false |  |
| underline | Underlined style | boolean | false |  |
| onChange | Trigger when user edits the content | function(string) | - |  |
| strong | Bold style | boolean | false |  |
| type | Content type | `secondary` \| `warning` \| `danger` | - |  |

### copyable

`copyable` supports `{ icon: <SmileOutlined /> }` to customize copy icon since `4.4.0`.

`copyable` supports `{ tooltips: ['click here', 'you clicked!!'] }` to replace tooltips text since `4.4.0`.

`copyable` supports `{ icon: [<SmileOutlined key="copy-icon" />, <SmileFilled key="copied-icon" />] }` to customize copy and copied icon since `4.6.0`.

`copyable` supports `{ tooltips: false }` to hide tooltips since `4.6.0`.

### editable

`editable` supports `{ maxLength: 50 }` to config TextArea `maxLength` props since `4.6.0`.

`editable` supports `{ autoSize: { maxRows: 5, minRows: 3 } }` to config TextArea `autoSize` props since `4.6.0`.

`editable` supports `{ icon: <HighlightOutlined /> }` to customize edit icon since `4.6.0`.

`editable` supports `{ tooltips: 'click to edit text' }` to replace tooltip text since `4.6.0`.

## FAQ

### How to use Typography.Link in react-router?

`react-router` support [customize](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/api/Link.md#component-reactcomponent) render component:

```tsx
<Link to="/" component={Typography.Link} />
```
