# Timepicker

-	category: Components
-	chinese: 时间选择框
-	type: 表单

---

输入或选择时间的控件。

何时使用
--------

当用户需要输入一个时间，可以点击标准输入框，弹出时间面板进行选择。

API
---

```html
<Timepicker value="13:30:56" />
```

| 参数            | 说明 | 类型 | 默认值 |
|-----------------|-----|-----|-------|
| defaultValue    | 默认时间 | string | 无 |
| placeholder     | 没有值的时候显示的内容 | string | "请选择时间" |
| onChange        | 时间发生变化的回调     | function(Date value) | 无           |
| format          | 展示的时间格式 | string | "HH:mm:ss"、"HH:mm"、"mm:ss" |
| disabled        | 禁用 | bool | false |
| hourOptions     | 特定可选择的小时 | array | 0 到 24 组成的数组 |
| minuteOptions   | 特定可选择的分钟 | array | 0 到 60 组成的数组 |
| secondOptions   | 特定可选择的秒 | array | 0 到 60 组成的数组 |
| inputClassName  | 输入框的样式 | string |  |
| placement       | 显示位置 | string | bottomLeft |
| transitionName  | 显示动画 | string | slide-up |

<style> .code-box-demo .ant-timepicker-picker { margin: 0 12px 12px 0; }</style>
