---
category: Components
group: Data Display
title: Popover
cover: https://gw.alipayobjects.com/zos/alicdn/1PNL1p_cO/Popover.svg
demo:
  cols: 2
---

The floating card popped by clicking or hovering.

## When To Use

A simple popup menu to provide extra information or operations.

Comparing with `Tooltip`, besides information `Popover` card can also provide action elements like links and buttons.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic</code>
<code src="./demo/triggerType.tsx">Three ways to trigger</code>
<code src="./demo/placement.tsx">Placement</code>
<code src="./demo/control.tsx">Controlling the close of the dialog</code>
<code src="./demo/arrow-point-at-center.tsx">Arrow pointing</code>
<code src="./demo/hover-with-click.tsx">Hover with click popover</code>
<code src="./demo/render-panel.tsx" debug>_InternalPanelDoNotUseOrYouWillBeFired</code>

## API

| Param   | Description         | Type                         | Default value | Version |
| ------- | ------------------- | ---------------------------- | ------------- | ------- |
| content | Content of the card | ReactNode \| () => ReactNode | -             |         |
| title   | Title of the card   | ReactNode \| () => ReactNode | -             |         |

Consult [Tooltip's documentation](/components/tooltip/#API) to find more APIs.

## Note

Please ensure that the child node of `Popover` accepts `onMouseEnter`, `onMouseLeave`, `onFocus`, `onClick` events.
