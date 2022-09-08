import * as React from 'react';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import ExclamationCircleFilled from '@ant-design/icons/ExclamationCircleFilled';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import InfoCircleFilled from '@ant-design/icons/InfoCircleFilled';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import { Notice } from 'rc-notification';
import classNames from 'classnames';
import type { NoticeProps } from 'rc-notification/lib/Notice';
import useStyle from './style';
import { ConfigContext } from '../config-provider';
import type { IconType } from './interface';

export const TypeIcon = {
  info: <InfoCircleFilled />,
  success: <CheckCircleFilled />,
  error: <CloseCircleFilled />,
  warning: <ExclamationCircleFilled />,
  loading: <LoadingOutlined />,
};

export function getCloseIcon(prefixCls: string, closeIcon?: React.ReactNode) {
  return (
    closeIcon || (
      <span className={`${prefixCls}-close-x`}>
        <CloseOutlined className={`${prefixCls}-close-icon`} />
      </span>
    )
  );
}

export interface PureContentProps {
  prefixCls: string;
  icon?: React.ReactNode;
  message?: React.ReactNode;
  description?: React.ReactNode;
  btn?: React.ReactNode;
  type?: IconType;
}

const typeToIcon = {
  success: CheckCircleFilled,
  info: InfoCircleFilled,
  error: CloseCircleFilled,
  warning: ExclamationCircleFilled,
};

export function PureContent({
  prefixCls,
  icon,
  type,
  message,
  description,
  btn,
}: PureContentProps) {
  let iconNode: React.ReactNode = null;
  if (icon) {
    iconNode = <span className={`${prefixCls}-icon`}>{icon}</span>;
  } else if (type) {
    iconNode = React.createElement(typeToIcon[type] || null, {
      className: classNames(`${prefixCls}-icon`, `${prefixCls}-icon-${type}`),
    });
  }

  return (
    <div
      className={classNames({
        [`${prefixCls}-with-icon`]: iconNode,
      })}
      role="alert"
    >
      {iconNode}
      <div className={`${prefixCls}-message`}>{message}</div>
      <div className={`${prefixCls}-description`}>{description}</div>
      {btn && <div className={`${prefixCls}-btn`}>{btn}</div>}
    </div>
  );
}

export interface PurePanelProps
  extends Omit<NoticeProps, 'prefixCls' | 'eventKey'>,
    Omit<PureContentProps, 'prefixCls' | 'children'> {
  prefixCls?: string;
}

/** @private Internal Component. Do not use in your production. */
export default function PurePanel(props: PurePanelProps) {
  const {
    prefixCls: staticPrefixCls,
    className,
    icon,
    type,
    message,
    description,
    btn,
    closable = true,
    closeIcon,
    ...restProps
  } = props;
  const { getPrefixCls } = React.useContext(ConfigContext);

  const prefixCls = staticPrefixCls || getPrefixCls('notification');
  const noticePrefixCls = `${prefixCls}-notice`;

  const [, hashId] = useStyle(prefixCls);

  return (
    <Notice
      {...restProps}
      prefixCls={prefixCls}
      className={classNames(className, hashId, `${noticePrefixCls}-pure-panel`)}
      eventKey="pure"
      duration={null}
      closable={closable}
      closeIcon={getCloseIcon(prefixCls, closeIcon)}
      content={
        <PureContent
          prefixCls={noticePrefixCls}
          icon={icon}
          type={type}
          message={message}
          description={description}
          btn={btn}
        />
      }
    />
  );
}
