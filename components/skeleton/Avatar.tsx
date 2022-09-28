import classNames from 'classnames';
import omit from 'rc-util/lib/omit';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import type { SkeletonElementProps } from './Element';
import Element from './Element';

export interface AvatarProps extends Omit<SkeletonElementProps, 'shape'> {
  shape?: 'circle' | 'square';
}

const SkeletonAvatar: React.FC<AvatarProps> = props => {
  const {
    prefixCls: customizePrefixCls,
    className,
    active,
    shape = 'circle',
    size = 'default',
  } = props;
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('skeleton', customizePrefixCls);

  const otherProps = omit(props, ['prefixCls', 'className']);
  const cls = classNames(
    prefixCls,
    `${prefixCls}-element`,
    {
      [`${prefixCls}-active`]: active,
    },
    className,
  );
  return (
    <div className={cls}>
      <Element prefixCls={`${prefixCls}-avatar`} shape={shape} size={size} {...otherProps} />
    </div>
  );
};

export default SkeletonAvatar;
