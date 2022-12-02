---
category: Components
group: Data Display
title: Tour
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*8CC_Tbe3_e4AAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

A popup component for guiding users through a product. Available since `5.0.0`.

## When To Use

Use when you want to guide users through a product.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic</code>
<code src="./demo/non-modal.tsx">Non-modal</code>
<code src="./demo/placement.tsx">Placement</code>
<code src="./demo/render-panel.tsx" debug>\_InternalPanelDoNotUseOrYouWillBeFired</code>

## API

### Tour

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| arrow | Whether to show the arrow, including the configuration whether to point to the center of the element | `boolean`\|`{ pointAtCenter: boolean}` | `true` |  |
| placement | Position of the guide card relative to the target element | `left` `leftTop` `leftBottom` `right` `rightTop` `rightBottom` `top` `topLeft` `topRight` `bottom` `bottomLeft` `bottomRight` | `bottom` |  |
| onClose | Callback function on shutdown | `Function` | - |  |
| mask | Whether to enable masking | `boolean` | `true` |  |
| type | Type, affects the background color and text color | `default` `primary` | `default` |  |
| open | Open tour | `boolean` | - |  |
| onChange | Callback when the step changes. Current is the previous step | `(current: number) => void` | - |  |
| current | What is the current step | `number` | - |  |

### TourStep

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| target | Get the element the guide card points to. Empty makes it show in center of screen | `() => HTMLElement` `HTMLElement` | - |  |
| arrow | Whether to show the arrow, including the configuration whether to point to the center of the element | `boolean` `{ pointAtCenter: boolean}` | `true` |  |
| cover | Displayed pictures or videos | `ReactNode` | - |  |
| title | title | `ReactNode` | - |  |
| description | description | `ReactNode` | - |  |
| placement | Position of the guide card relative to the target element | `left` `leftTop` `leftBottom` `right` `rightTop` `rightBottom` `top` `topLeft` `topRight` `bottom` `bottomLeft` `bottomRight` | `bottom` |  |
| onClose | Callback function on shutdown | `Function` | - |  |
| mask | Whether to enable masking, the default follows the `mask` property of Tour | `boolean` | `true` |  |
| type | Type, affects the background color and text color | `default` `primary` | `default` |  |
| nextButtonProps | Properties of the Next button | `{ children: ReactNode; onClick: Function }` | - |  |
| prevButtonProps | Properties of the previous button | `{ children: ReactNode; onClick: Function }` | - |  |
