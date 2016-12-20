---
order: 4
title:
  zh-CN: 动态
  en-US: Dynamic
---

## zh-CN

展示动态变化的效果。

## en-US

The count will be animated as it changes.

````jsx
import { Badge, Button, Icon, Switch } from 'antd';
const ButtonGroup = Button.Group;

const Test = React.createClass({
  getInitialState() {
    return {
      count: 5,
      show: true,
    };
  },
  increase() {
    const count = this.state.count + 1;
    this.setState({ count });
  },
  decline() {
    let count = this.state.count - 1;
    if (count < 0) {
      count = 0;
    }
    this.setState({ count });
  },
  onChange(show) {
    this.setState({ show });
  },
  render() {
    return (
      <div>
        <div>
          <Badge count={this.state.count}>
            <a href="#" className="head-example" />
          </Badge>
          <ButtonGroup>
            <Button type="ghost" onClick={this.decline}>
              <Icon type="minus" />
            </Button>
            <Button type="ghost" onClick={this.increase}>
              <Icon type="plus" />
            </Button>
          </ButtonGroup>
        </div>
        <div style={{ marginTop: 10 }}>
          <Badge dot={this.state.show}>
            <a href="#" className="head-example" />
          </Badge>
          <Switch onChange={this.onChange} />
        </div>
      </div>
    );
  },
});

ReactDOM.render(<Test />, mountNode);
````
