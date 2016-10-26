---
order: 4
title:
  zh-CN: 不堆叠
  en-US: Unstack
debug: true
---

## zh-CN

使每条 message 从上到下排列。

## en-US

List the messages without stack.

````jsx
import { message, Button } from 'antd';

const success = function () {
  message.config({ stack: false });
  message.success('This is a unstack message');

  // Should not affect other demos
  message.config({ stack: true });
};

ReactDOM.render(
  <Button onClick={success}>unstack messages</Button>,
  mountNode
);
````
