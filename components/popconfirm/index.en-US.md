---
category: Components
type: Feedback
title: Popconfirm
cover: https://gw.alipayobjects.com/zos/alicdn/fjMCD9xRq/Popconfirm.svg
---

A simple and compact confirmation dialog of an action.

## When To Use

A simple and compact dialog used for asking for user confirmation.

The difference with the `confirm` modal dialog is that it's more lightweight than the static popped full-screen confirm modal.

## API

| Param | Description | Type | Default value |
| --- | --- | --- | --- |
| cancelText | The text of the Cancel button | string | `Cancel` |
| okText | The text of the Confirm button | string | `OK` |
| okType | Button `type` of the Confirm button | string | `primary` |
| okButtonProps | The ok button props | [ButtonProps](/components/button/#API) | - |
| cancelButtonProps | The cancel button props | [ButtonProps](/components/button/#API) | - |
| title | The title of the confirmation box | ReactNode \| () => ReactNode | - |
| onCancel | A callback of cancel | function(e) | - |
| onConfirm | A callback of confirmation | function(e) | - |
| icon | Customize icon of confirmation | ReactNode | &lt;ExclamationCircle /> |
| disabled | Whether show popconfirm when click its childrenNode | boolean | false |

Consult [Tooltip's documentation](/components/tooltip/#API) to find more APIs.

## Note

Please ensure that the child node of `Popconfirm` accepts `onMouseEnter`, `onMouseLeave`, `onFocus`, `onClick` events.
