---
category: Components
type: Data Display
title: Tooltip
---

A simple text popup tip.

## When To Use

- The tip shows while mouse enter, and hides while mouse leave. The ToolTip doesn't support complex text and operation.
- It can provide an explanation of `button/text/operation` that can cover the usage of the default system `title`.

## API

| Property      | Description                                     | Type       | Default |
|-----------|------------------------------------------|------------|--------|
| placement | to set the position, which can be one of `top` `left` `right` `bottom` `topLeft` `topRight` `bottomLeft` `bottomRight` `leftTop` `leftBottom` `rightTop` `rightBottom` | string     | top    |
| title     | prompt text                                 | string/React.Element | -     |
| getTooltipContainer | to set the container of the tip, while the default is to create a `div` element in `body` | Function(triggerNode) | () => document.body |
| arrowPointAtCenter | whether arrow pointed at the center of target, supported after `antd@1.11+` | Boolean | `false` |

You can visit https://github.com/react-component/tooltip for more API.
