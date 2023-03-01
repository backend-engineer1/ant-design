import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import CheckOutlined from '@ant-design/icons/CheckOutlined';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import classNames from 'classnames';
import omit from 'rc-util/lib/omit';
import * as React from 'react';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigContext } from '../config-provider';
import warning from '../_util/warning';
import Circle from './Circle';
import Line from './Line';
import Steps from './Steps';
import useStyle from './style';
import { getSize, getSuccessPercent, validProgress } from './utils';

export const ProgressTypes = ['line', 'circle', 'dashboard'] as const;
export type ProgressType = typeof ProgressTypes[number];
const ProgressStatuses = ['normal', 'exception', 'active', 'success'] as const;
export type ProgressSize = 'default' | 'small';
export type StringGradients = { [percentage: string]: string };
type FromToGradients = { from: string; to: string };
export type ProgressGradient = { direction?: string } & (StringGradients | FromToGradients);

export interface SuccessProps {
  percent?: number;
  /** @deprecated Use `percent` instead */
  progress?: number;
  strokeColor?: string;
}

export interface ProgressProps {
  prefixCls?: string;
  className?: string;
  rootClassName?: string;
  type?: ProgressType;
  percent?: number;
  format?: (percent?: number, successPercent?: number) => React.ReactNode;
  status?: typeof ProgressStatuses[number];
  showInfo?: boolean;
  strokeWidth?: number;
  strokeLinecap?: 'butt' | 'square' | 'round';
  strokeColor?: string | string[] | ProgressGradient;
  trailColor?: string;
  /** @deprecated Use `size` instead */
  width?: number;
  success?: SuccessProps;
  style?: React.CSSProperties;
  gapDegree?: number;
  gapPosition?: 'top' | 'bottom' | 'left' | 'right';
  size?: number | [number, number] | ProgressSize;
  steps?: number;
  /** @deprecated Use `success` instead */
  successPercent?: number;
  children?: React.ReactNode;
}

const Progress: React.FC<ProgressProps> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    steps,
    strokeColor,
    percent = 0,
    size = 'default',
    showInfo = true,
    type = 'line',
    status,
    format,
    ...restProps
  } = props;

  const percentNumber = React.useMemo<number>(() => {
    const successPercent = getSuccessPercent(props);
    return parseInt(
      successPercent !== undefined ? (successPercent ?? 0)?.toString() : (percent ?? 0)?.toString(),
      10,
    );
  }, [percent, props.success, props.successPercent]);

  const progressStatus = React.useMemo<typeof ProgressStatuses[number]>(() => {
    if (!ProgressStatuses.includes(status!) && percentNumber >= 100) {
      return 'success';
    }
    return status || 'normal';
  }, [status, percentNumber]);

  const { getPrefixCls, direction } = React.useContext<ConfigConsumerProps>(ConfigContext);
  const prefixCls = getPrefixCls('progress', customizePrefixCls);
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const progressInfo = React.useMemo<React.ReactNode>(() => {
    if (!showInfo) {
      return null;
    }
    const successPercent = getSuccessPercent(props);
    let text: React.ReactNode;
    const textFormatter = format || ((number) => `${number}%`);
    const isLineType = type === 'line';
    if (format || (progressStatus !== 'exception' && progressStatus !== 'success')) {
      text = textFormatter(validProgress(percent), validProgress(successPercent));
    } else if (progressStatus === 'exception') {
      text = isLineType ? <CloseCircleFilled /> : <CloseOutlined />;
    } else if (progressStatus === 'success') {
      text = isLineType ? <CheckCircleFilled /> : <CheckOutlined />;
    }

    return (
      <span className={`${prefixCls}-text`} title={typeof text === 'string' ? text : undefined}>
        {text}
      </span>
    );
  }, [showInfo, percent, percentNumber, progressStatus, type, prefixCls, format]);

  if (process.env.NODE_ENV !== 'production') {
    warning(
      !('successPercent' in props),
      'Progress',
      '`successPercent` is deprecated. Please use `success.percent` instead.',
    );
    warning(!('width' in props), 'Progress', '`width` is deprecated. Please use `size` instead.');
  }

  const strokeColorNotArray = Array.isArray(strokeColor) ? strokeColor[0] : strokeColor;
  const strokeColorNotGradient =
    typeof strokeColor === 'string' || Array.isArray(strokeColor) ? strokeColor : undefined;
  let progress: React.ReactNode;
  // Render progress shape
  if (type === 'line') {
    progress = steps ? (
      <Steps {...props} strokeColor={strokeColorNotGradient} prefixCls={prefixCls} steps={steps}>
        {progressInfo}
      </Steps>
    ) : (
      <Line
        {...props}
        strokeColor={strokeColorNotArray}
        prefixCls={prefixCls}
        direction={direction}
      >
        {progressInfo}
      </Line>
    );
  } else if (type === 'circle' || type === 'dashboard') {
    progress = (
      <Circle
        {...props}
        strokeColor={strokeColorNotArray}
        prefixCls={prefixCls}
        progressStatus={progressStatus}
      >
        {progressInfo}
      </Circle>
    );
  }

  const classString = classNames(
    prefixCls,
    {
      [`${prefixCls}-inline-circle`]: type === 'circle' && getSize(size, 'circle')[0] <= 20,
      [`${prefixCls}-${(type === 'dashboard' && 'circle') || (steps && 'steps') || type}`]: true,
      [`${prefixCls}-status-${progressStatus}`]: true,
      [`${prefixCls}-show-info`]: showInfo,
      [`${prefixCls}-${size}`]: typeof size === 'string',
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className,
    rootClassName,
    hashId,
  );

  return wrapSSR(
    <div
      className={classString}
      role="progressbar"
      {...omit(restProps, [
        'trailColor',
        'strokeWidth',
        'width',
        'gapDegree',
        'gapPosition',
        'strokeLinecap',
        'success',
        'successPercent',
      ])}
    >
      {progress}
    </div>,
  );
};

if (process.env.NODE_ENV !== 'production') {
  Progress.displayName = 'Progress';
}

export default Progress;
