---
order: 7
title:
    zh-CN: 数值输入框
    en-US: Numeric Input
---

## zh-CN

结合 [Tooltip](/components/tooltip) 组件，实现一个数值输入框，方便内容超长时的全量展现。

## en-US

You can use the Input in conjunction with [Tooltip](/components/tooltip) component to create a Numeric Input, which can provide a good experience for extra-long content display.

````jsx
import { Input, Tooltip } from 'antd';

function formatNumber(value) {
  value += '';
  const list = value.split('.');
  const prefix = list[0].charAt(0) === '-' ? '-' : '';
  let num = prefix ? list[0].slice(1) : list[0];
  let result = '';
  while (num.length > 3) {
    result = `,${num.slice(-3)}${result}`;
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    result = num + result;
  }
  return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
}

class NumericInput extends React.Component {
  onChange = (e) => {
    const { value } = e.target;
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      this.props.onChange(value);
    }
  }

  // '.' at the end or only '-' in the input box.
  onBlur = () => {
    const { value } = this.props;
    if (value.charAt(value.length - 1) === '.' || value === '-') {
      this.props.onChange({ value: value.slice(0, -1) });
    }
    if (this.props.onBlur) {
      this.props.onBlur();
    }
  }

  render() {
    const { value } = this.props;
    const title = (value ?
      (<span className="numeric-input-title">
        {value !== '-' ? formatNumber(value) : '-'}
      </span>) : '');
    return (
      <div>
        <Tooltip
          trigger={['focus']}
          title={title}
          placement="topLeft"
          overlayClassName="numeric-input"
        >
          <Input
            {...this.props}
            onChange={this.onChange}
            onBlur={this.onBlur}
            placeholder="input a number"
            maxLength="25"
          />
        </Tooltip>
      </div>
    );
  }
}

class NumericInputDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }
  onChange = (value) => {
    this.setState({ value });
  }
  render() {
    const { value } = this.state;
    return (
      <div className="numeric-input-demo">
        <NumericInput value={value} onChange={this.onChange} />
      </div>
    );
  }
}

ReactDOM.render(<NumericInputDemo />, mountNode);
````

````css
/* to prevent the arrow overflow the popup container, 
or the height is not enough when content is empty */
.numeric-input .ant-tooltip-inner {
  min-width: 32px;
  min-height: 37px;
}

.numeric-input .numeric-input-title {
  font-size: 14px;
}

.numeric-input-demo {
  width: 120px;
}
````
