'use client';

import classNames from 'classnames';
import type { DrawerProps as RcDrawerProps } from 'rc-drawer';
import RcDrawer from 'rc-drawer';
import type { Placement } from 'rc-drawer/lib/Drawer';
import type { CSSMotionProps } from 'rc-motion';
import * as React from 'react';
import { getTransitionName } from '../_util/motion';
import warning from '../_util/warning';
import { ConfigContext } from '../config-provider';
import { NoFormStyle } from '../form/context';
import type { DrawerPanelProps } from './DrawerPanel';
import DrawerPanel from './DrawerPanel';

// CSSINJS
import { NoCompactStyle } from '../space/Compact';
import useStyle from './style';

const SizeTypes = ['default', 'large'] as const;
type sizeType = typeof SizeTypes[number];

export interface PushState {
  distance: string | number;
}

// Drawer diff props: 'open' | 'motion' | 'maskMotion' | 'wrapperClassName'
export interface DrawerProps extends RcDrawerProps, Omit<DrawerPanelProps, 'prefixCls'> {
  size?: sizeType;

  open?: boolean;

  afterOpenChange?: (open: boolean) => void;

  // Deprecated
  /** @deprecated Please use `open` instead */
  visible?: boolean;
  /** @deprecated Please use `afterOpenChange` instead */
  afterVisibleChange?: (open: boolean) => void;
}

const defaultPushState: PushState = { distance: 180 };

const Drawer: React.FC<DrawerProps> & {
  _InternalPanelDoNotUseOrYouWillBeFired: typeof PurePanel;
} = (props) => {
  const {
    rootClassName,
    width,
    height,
    size = 'default',
    mask = true,
    push = defaultPushState,
    open,
    afterOpenChange,
    onClose,
    prefixCls: customizePrefixCls,
    getContainer: customizeGetContainer,
    style,
    className,

    // Deprecated
    visible,
    afterVisibleChange,

    ...rest
  } = props;

  const { getPopupContainer, getPrefixCls, direction, drawer } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('drawer', customizePrefixCls);

  // Style
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const getContainer =
    // 有可能为 false，所以不能直接判断
    customizeGetContainer === undefined && getPopupContainer
      ? () => getPopupContainer(document.body)
      : customizeGetContainer;

  const drawerClassName = classNames(
    {
      'no-mask': !mask,
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    rootClassName,
    hashId,
  );

  // ========================== Warning ===========================
  if (process.env.NODE_ENV !== 'production') {
    [
      ['visible', 'open'],
      ['afterVisibleChange', 'afterOpenChange'],
    ].forEach(([deprecatedName, newName]) => {
      warning(
        !(deprecatedName in props),
        'Drawer',
        `\`${deprecatedName}\` is deprecated, please use \`${newName}\` instead.`,
      );
    });

    if (getContainer !== undefined && props.style?.position === 'absolute') {
      warning(
        false,
        'Drawer',
        '`style` is replaced by `rootStyle` in v5. Please check that `position: absolute` is necessary.',
      );
    }
  }

  // ============================ Size ============================
  const mergedWidth = React.useMemo<string | number>(
    () => width ?? (size === 'large' ? 736 : 378),
    [width, size],
  );

  const mergedHeight = React.useMemo<string | number>(
    () => height ?? (size === 'large' ? 736 : 378),
    [height, size],
  );

  // =========================== Motion ===========================
  const maskMotion: CSSMotionProps = {
    motionName: getTransitionName(prefixCls, 'mask-motion'),
    motionAppear: true,
    motionEnter: true,
    motionLeave: true,
    motionDeadline: 500,
  };

  const panelMotion: RcDrawerProps['motion'] = (motionPlacement) => ({
    motionName: getTransitionName(prefixCls, `panel-motion-${motionPlacement}`),
    motionAppear: true,
    motionEnter: true,
    motionLeave: true,
    motionDeadline: 500,
  });

  // =========================== Render ===========================
  return wrapSSR(
    <NoCompactStyle>
      <NoFormStyle status override>
        <RcDrawer
          prefixCls={prefixCls}
          onClose={onClose}
          maskMotion={maskMotion}
          motion={panelMotion}
          {...rest}
          open={open ?? visible}
          mask={mask}
          push={push}
          width={mergedWidth}
          height={mergedHeight}
          style={{ ...drawer?.style, ...style }}
          className={classNames(drawer?.className, className)}
          rootClassName={drawerClassName}
          getContainer={getContainer}
          afterOpenChange={afterOpenChange ?? afterVisibleChange}
        >
          <DrawerPanel prefixCls={prefixCls} {...rest} onClose={onClose} />
        </RcDrawer>
      </NoFormStyle>
    </NoCompactStyle>,
  );
};

interface PurePanelInterface {
  prefixCls?: string;
  style?: React.CSSProperties;
  className?: string;
  placement?: Placement;
}

/** @private Internal Component. Do not use in your production. */
const PurePanel: React.FC<Omit<DrawerPanelProps, 'prefixCls'> & PurePanelInterface> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    style,
    className,
    placement = 'right',
    ...restProps
  } = props;
  const { getPrefixCls } = React.useContext(ConfigContext);

  const prefixCls = getPrefixCls('drawer', customizePrefixCls);

  // Style
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const cls = classNames(
    prefixCls,
    `${prefixCls}-pure`,
    `${prefixCls}-${placement}`,
    hashId,
    className,
  );

  return wrapSSR(
    <div className={cls} style={style}>
      <DrawerPanel prefixCls={prefixCls} {...restProps} />
    </div>,
  );
};

Drawer._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;

if (process.env.NODE_ENV !== 'production') {
  Drawer.displayName = 'Drawer';
}

export default Drawer;
