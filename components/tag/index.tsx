import React from 'react';
import ReactDOM from 'react-dom';
import Animate from 'rc-animate';
import classNames from 'classnames';
import omit from 'omit.js';
import assign from 'object-assign';
import Icon from '../icon';
import warning from '../_util/warning';
import CheckableTag from './CheckableTag';

export interface TagProps {
  prefixCls?: string;
  className?: string;
  color?: string;
  /** 标签是否可以关闭 */
  closable?: boolean;
  /** 关闭时的回调 */
  onClose?: Function;
  /** 动画关闭后的回调 */
  afterClose?: Function;
  style?: React.CSSProperties;
}

export default class Tag extends React.Component<TagProps, any> {
  static CheckableTag = CheckableTag;
  static defaultProps = {
    prefixCls: 'ant-tag',
    closable: false,
  };

  constructor(props: TagProps) {
    super(props);
    warning(
      !/blue|red|green|yellow/.test(props.color || ''),
      '`Tag[color=red|green|blue|yellow]` is deprecated, ' +
        'please set color by `#abc` or `rgb(a, b, c)` instead.'
    );

    this.state = {
      closing: false,
      closed: false,
    };
  }

  close = (e) => {
    const onClose = this.props.onClose;
    if (onClose) {
      onClose(e);
    }
    if (e.defaultPrevented) {
      return;
    }
    const dom = ReactDOM.findDOMNode(this) as HTMLElement;
    dom.style.width = `${dom.getBoundingClientRect().width}px`;
    // It's Magic Code, don't know why
    dom.style.width = `${dom.getBoundingClientRect().width}px`;
    this.setState({
      closing: true,
    });
  }

  animationEnd = (_, existed) => {
    if (!existed && !this.state.closed) {
      this.setState({
        closed: true,
        closing: false,
      });

      const afterClose = this.props.afterClose;
      if (afterClose) {
        afterClose();
      }
    }
  }

  render() {
    const { prefixCls, closable, color, className, children, style, ...otherProps } = this.props;
    const closeIcon = closable ? <Icon type="cross" onClick={this.close} /> : '';
    const classString = classNames(prefixCls, {
      [`${prefixCls}-${color}`]: !!color,
      [`${prefixCls}-has-color`]: !!color,
      [`${prefixCls}-close`]: this.state.closing,
    }, className);
    // fix https://fb.me/react-unknown-prop
    const divProps = omit(otherProps, [
      'onClose',
      'afterClose',
    ]);
    const tagStyle = assign({
      backgroundColor: color && /blue|red|green|yellow/.test(color) ? null : color,
    }, style);
    const tag = this.state.closed ? null : (
      <div
        data-show={!this.state.closing}
        {...divProps}
        className={classString}
        style={tagStyle}
      >
        <span className={`${prefixCls}-text`}>{children}</span>
        {closeIcon}
      </div>
    );
    return (
      <Animate
        component=""
        showProp="data-show"
        transitionName={`${prefixCls}-zoom`}
        transitionAppear
        onEnd={this.animationEnd}
      >
        {tag}
      </Animate>
    );
  }
}
