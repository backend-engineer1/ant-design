import * as React from 'react';
import classNames from 'classnames';

import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import devWarning from '../_util/devWarning';

export interface AvatarProps {
  /** Shape of avatar, options:`circle`, `square` */
  shape?: 'circle' | 'square';
  /*
   * Size of avatar, options: `large`, `small`, `default`
   * or a custom number size
   * */
  size?: 'large' | 'small' | 'default' | number;
  gap?: number;
  /** Src of image avatar */
  src?: string;
  /** Srcset of image avatar */
  srcSet?: string;
  draggable?: boolean;
  /** icon to be used in avatar */
  icon?: React.ReactNode;
  style?: React.CSSProperties;
  prefixCls?: string;
  className?: string;
  children?: React.ReactNode;
  alt?: string;
  /* callback when img load error */
  /* return false to prevent Avatar show default fallback behavior, then you can do fallback by your self */
  onError?: () => boolean;
}

export interface AvatarState {
  scale: number;
  mounted: boolean;
  isImgExist: boolean;
}

export default class Avatar extends React.Component<AvatarProps, AvatarState> {
  static defaultProps = {
    shape: 'circle' as AvatarProps['shape'],
    size: 'default' as AvatarProps['size'],
  };

  state = {
    scale: 1,
    mounted: false,
    isImgExist: true,
  };

  private avatarNode: HTMLElement;

  private avatarChildren: HTMLElement;

  private lastChildrenWidth: number;

  private lastNodeWidth: number;

  componentDidMount() {
    this.setScale();
    this.setState({ mounted: true });
  }

  componentDidUpdate(prevProps: AvatarProps) {
    if (prevProps.src !== this.props.src) {
      this.setState({ isImgExist: true, scale: 1 });
    }
    if (prevProps.children !== this.props.children || prevProps.gap !== this.props.gap) {
      this.setScale();
    }
  }

  setScale = () => {
    if (!this.avatarChildren || !this.avatarNode) {
      return;
    }
    const childrenWidth = this.avatarChildren.offsetWidth; // offsetWidth avoid affecting be transform scale
    const nodeWidth = this.avatarNode.offsetWidth;
    const { gap = 4 } = this.props;
    // denominator is 0 is no meaning
    if (
      childrenWidth !== 0 &&
      nodeWidth !== 0 &&
      (this.lastChildrenWidth !== childrenWidth || this.lastNodeWidth !== nodeWidth)
    ) {
      this.lastChildrenWidth = childrenWidth;
      this.lastNodeWidth = nodeWidth;
    }

    if (gap * 2 < nodeWidth) {
      this.setState({
        scale: nodeWidth - gap * 2 < childrenWidth ? (nodeWidth - gap * 2) / childrenWidth : 1,
      });
    }
  };

  handleImgLoadError = () => {
    const { onError } = this.props;
    const errorFlag = onError ? onError() : undefined;
    if (errorFlag !== false) {
      this.setState({ isImgExist: false });
    }
  };

  renderAvatar = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls: customizePrefixCls,
      shape,
      size,
      src,
      srcSet,
      icon,
      className,
      alt,
      draggable,
      ...others
    } = this.props;

    devWarning(
      !(typeof icon === 'string' && icon.length > 2),
      'Avatar',
      `\`icon\` is using ReactNode instead of string naming in v4. Please check \`${icon}\` at https://ant.design/components/icon`,
    );

    const { isImgExist, scale, mounted } = this.state;

    const prefixCls = getPrefixCls('avatar', customizePrefixCls);

    const sizeCls = classNames({
      [`${prefixCls}-lg`]: size === 'large',
      [`${prefixCls}-sm`]: size === 'small',
    });

    const classString = classNames(prefixCls, className, sizeCls, {
      [`${prefixCls}-${shape}`]: shape,
      [`${prefixCls}-image`]: src && isImgExist,
      [`${prefixCls}-icon`]: icon,
    });

    const sizeStyle: React.CSSProperties =
      typeof size === 'number'
        ? {
            width: size,
            height: size,
            lineHeight: `${size}px`,
            fontSize: icon ? size / 2 : 18,
          }
        : {};

    let { children } = this.props;
    if (src && isImgExist) {
      children = (
        <img
          src={src}
          draggable={draggable}
          srcSet={srcSet}
          onError={this.handleImgLoadError}
          alt={alt}
        />
      );
    } else if (icon) {
      children = icon;
    } else {
      const childrenNode = this.avatarChildren;
      if (childrenNode || scale !== 1) {
        const transformString = `scale(${scale}) translateX(-50%)`;
        const childrenStyle: React.CSSProperties = {
          msTransform: transformString,
          WebkitTransform: transformString,
          transform: transformString,
        };

        const sizeChildrenStyle: React.CSSProperties =
          typeof size === 'number'
            ? {
                lineHeight: `${size}px`,
              }
            : {};
        children = (
          <span
            className={`${prefixCls}-string`}
            ref={(node: HTMLElement) => (this.avatarChildren = node)}
            style={{ ...sizeChildrenStyle, ...childrenStyle }}
          >
            {children}
          </span>
        );
      } else {
        const childrenStyle: React.CSSProperties = {};
        if (!mounted) {
          childrenStyle.opacity = 0;
        }

        children = (
          <span
            className={`${prefixCls}-string`}
            style={{ opacity: 0 }}
            ref={(node: HTMLElement) => (this.avatarChildren = node)}
          >
            {children}
          </span>
        );
      }
    }
    return (
      <span
        style={{ ...sizeStyle, ...others.style }}
        className={classString}
        ref={(node: HTMLElement) => (this.avatarNode = node)}
      >
        {children}
      </span>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderAvatar}</ConfigConsumer>;
  }
}
