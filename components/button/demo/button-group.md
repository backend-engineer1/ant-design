# 按钮组合

- order: 5

可以将多个 `Button` 放入 `ButtonGroup` 的容器中。

通过设置 `size` 为 `lg` `sm` 分别把按钮组合设为大、小尺寸。若不设置 `size`，则尺寸为中。

---

````jsx
var Button = antd.Button;
var ButtonGroup = antd.ButtonGroup;
var Icon = antd.Icon;

ReactDOM.render(<div>
<h4>基本组合</h4>
<ButtonGroup>
  <Button type="primary">确定</Button>
  <Button type="primary">取消</Button>
</ButtonGroup>
<ButtonGroup>
  <Button>左</Button>
  <Button>中</Button>
  <Button>右</Button>
</ButtonGroup>
<ButtonGroup>
  <Button type="primary">左</Button>
  <Button type="ghost">中</Button>
  <Button type="ghost">中</Button>
  <Button>右</Button>
</ButtonGroup>

<h4>带图标按钮组合 </h4>
<ButtonGroup>
  <Button type="primary">
    <Icon type="left" />
    <span>后退</span>
  </Button>
  <Button type="primary">
    前进
    <Icon type="right" />
  </Button>
</ButtonGroup>
<ButtonGroup>
  <Button type="primary">
    <Icon type="cloud" />
  </Button>
  <Button type="primary">
    <Icon type="cloud-download" />
  </Button>
</ButtonGroup>

<h4>多个组合</h4>
<ButtonGroup>
  <Button type="ghost">1</Button>
  <Button type="ghost">2</Button>
  <Button type="ghost">3</Button>
  <Button type="ghost">4</Button>
  <Button type="ghost">
    <span>前进</span>
    <Icon type="right" />
  </Button>
</ButtonGroup>

<h4>尺寸</h4>
<ButtonGroup size="lg">
  <Button type="ghost">大</Button>
  <Button type="ghost">大</Button>
  <Button type="ghost">大</Button>
</ButtonGroup>
<ButtonGroup>
  <Button type="ghost">默认</Button>
  <Button type="ghost">默认</Button>
  <Button type="ghost">默认</Button>
</ButtonGroup>
<ButtonGroup size="sm">
  <Button type="ghost">小</Button>
  <Button type="ghost">小</Button>
  <Button type="ghost">小</Button>
</ButtonGroup>
</div>
, document.getElementById('components-button-demo-button-group'));
````

<style>
.nico-insert-code h4 {
  margin: 8px 0;
  font-size: 12px;
  line-height: 12px;
  font-weight: normal;
}
.nico-insert-code h4:first-child {
  margin-top: 0;
}
.nico-insert-code .ant-btn {
  margin-bottom: 8px;
}
#components-button-demo-button-group .ant-btn-group {
  margin-right: 8px;
}
#components-button-demo-button-group .ant-btn {
  margin-bottom: 12px;
}
</style>
