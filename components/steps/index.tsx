import * as React from 'react';
import * as PropTypes from 'prop-types';
import RcSteps from 'rc-steps';

export interface StepsProps {
  prefixCls?: string;
  iconPrefix?: string;
  current?: number;
  initial?: number;
  status?: 'wait' | 'process' | 'finish' | 'error';
  size?: 'default' | 'small';
  direction?: 'horizontal' | 'vertical';
  progressDot?: boolean | Function;
  style?: React.CSSProperties;
}

export default class Steps extends React.Component<StepsProps, any> {
  static Step = RcSteps.Step;

  static defaultProps = {
    prefixCls: 'ant-steps',
    iconPrefix: 'ant',
    current: 0,
  };

  static propTypes = {
    prefixCls: PropTypes.string,
    iconPrefix: PropTypes.string,
    current: PropTypes.number,
  };

  render() {
    return (
      <RcSteps {...this.props} />
    );
  }
}
