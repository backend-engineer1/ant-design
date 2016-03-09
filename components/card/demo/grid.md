# 栅格卡片

- order: 3

在系统概览页面常常和栅格进行配合。

---

````jsx
import { Card, Col, Row } from 'antd';

ReactDOM.render(
  <Row>
    <Col span="8">
      <Card title="卡片标题">卡片的内容</Card>
    </Col>
    <Col span="8">
      <Card title="卡片标题">卡片的内容</Card>
    </Col>
    <Col span="8">
      <Card title="卡片标题">卡片的内容</Card>
    </Col>
  </Row>
, mountNode);
````

````css
/* 增加 16px 栅格间距 */
.row {
  margin-left: -8px;
  margin-right: -8px;
}
.row > div {
  padding: 0 8px;
}
````
