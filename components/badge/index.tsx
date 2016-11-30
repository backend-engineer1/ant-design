import React from 'react';
import Animate from 'rc-animate';
import ScrollNumber from './ScrollNumber';
import classNames from 'classnames';
import warning from '../_util/warning';
import splitObject from '../_util/splitObject';

export interface BadgeProps {
  /** Number to show in badge */
  count: number | string;
  /** Max count to show */
  overflowCount?: number;
  /** whether to show red dot without number */
  dot?: boolean;
  style?: React.CSSProperties;
  prefixCls?: string;
  className?: string;
  status?: 'success' | 'processing' | 'default' | 'error' | 'warning';
  text?: string;
}

export default class Badge extends React.Component<BadgeProps, any> {
  static defaultProps = {
    prefixCls: 'ant-badge',
    count: null,
    dot: false,
    overflowCount: 99,
  };

  static propTypes = {
    count: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
    ]),
    dot: React.PropTypes.bool,
    overflowCount: React.PropTypes.number,
  };

  render() {
    let [{
      count, prefixCls, overflowCount, className, style, children, dot, status, text,
    }, restProps] = splitObject(
      this.props,
      ['count', 'prefixCls', 'overflowCount', 'className', 'style', 'children', 'dot', 'status', 'text']
    );
    const isDot = dot || status;
    const realCount = count;
    count = count > overflowCount ? `${overflowCount}+` : count;

    // dot mode don't need count
    if (isDot) {
      count = '';
    }

    // null undefined "" "0" 0
    const hidden = (!count || count === '0') && !isDot;
    const scrollNumberCls = classNames({
      [`${prefixCls}-dot`]: isDot,
      [`${prefixCls}-count`]: !isDot,
    });
    const badgeCls = classNames(className, prefixCls, {
      [`${prefixCls}-status`]: !!status,
      [`${prefixCls}-not-a-wrapper`]: !children,
    });

    warning(
      !(children && status),
      '`Badge[children]` and `Badge[status]` cannot be used at the same time.'
    );
    // <Badge status="success" />
    if (!children && status) {
      const statusCls = classNames({
        [`${prefixCls}-status-dot`]: !!status,
        [`${prefixCls}-status-${status}`]: true,
      });
      return (
        <span className={badgeCls}>
          <span className={statusCls} />
          <span className={`${prefixCls}-status-text`}>{text}</span>
        </span>
      );
    }

    const scrollNumber = hidden ? null : (
      <ScrollNumber
        data-show={!hidden}
        className={scrollNumberCls}
        count={count}
        style={style}
      />
    );

    const statusText = (hidden || !text) ? null : (
      <span className={`${prefixCls}-status-text`}>{text}</span>
    );

    return (
      <span {...restProps} className={badgeCls} title={realCount}>
        {children}
        <Animate
          component=""
          showProp="data-show"
          transitionName={children ? `${prefixCls}-zoom` : ''}
          transitionAppear
        >
          {scrollNumber}
        </Animate>
        {statusText}
      </span>
    );
  }
}
