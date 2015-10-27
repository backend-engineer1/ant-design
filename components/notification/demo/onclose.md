# 回调函数

- order: 3

点击关闭按钮时触发回调函数。

---

````jsx
var notification = antd.Notification;
var Button = antd.Button;

var close = function() {
  console.log("我被默认的关闭按钮关闭了！");
};

var openNotification = function() {
  var args = {
    message: "这是标题",
    description: "这是提示框的文案这是提示框示框的文案这是提示是提示框的文案这是提示框的文案",
    onClose: close
  };
  notification.open(args);
};

ReactDOM.render(
  <div>
    <Button type="primary" onClick={openNotification}>打开通知提醒框</Button>
  </div>,
document.getElementById('components-notification-demo-onclose'));
````
