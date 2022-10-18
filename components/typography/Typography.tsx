import classNames from 'classnames';
import { composeRef } from 'rc-util/lib/ref';
import * as React from 'react';
import type { DirectionType } from '../config-provider';
import { ConfigContext } from '../config-provider';
import warning from '../_util/warning';

export interface TypographyProps<C extends keyof JSX.IntrinsicElements>
  extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  /** @internal */
  component?: C;
  ['aria-label']?: string;
  direction?: DirectionType;
}

interface InternalTypographyProps<C extends keyof JSX.IntrinsicElements>
  extends TypographyProps<C> {
  /** @deprecated Use `ref` directly if using React 16 */
  setContentRef?: (node: HTMLElement) => void;
}

const Typography = React.forwardRef<
  HTMLElement,
  InternalTypographyProps<keyof JSX.IntrinsicElements>
>(
  (
    {
      prefixCls: customizePrefixCls,
      component: Component = 'article',
      className,
      setContentRef,
      children,
      direction: typographyDirection,
      ...restProps
    },
    ref,
  ) => {
    const { getPrefixCls, direction: contextDirection } = React.useContext(ConfigContext);

    const direction = typographyDirection ?? contextDirection;

    let mergedRef = ref;
    if (setContentRef) {
      warning(false, 'Typography', '`setContentRef` is deprecated. Please use `ref` instead.');
      mergedRef = composeRef(ref, setContentRef);
    }

    const prefixCls = getPrefixCls('typography', customizePrefixCls);
    const componentClassName = classNames(
      prefixCls,
      {
        [`${prefixCls}-rtl`]: direction === 'rtl',
      },
      className,
    );

    return (
      // @ts-expect-error: Expression produces a union type that is too complex to represent.
      <Component className={componentClassName} ref={mergedRef} {...restProps}>
        {children}
      </Component>
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  Typography.displayName = 'Typography';
}

// es default export should use const instead of let
export default Typography;
