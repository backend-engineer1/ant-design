import React from 'react';
import { cloneElement } from 'react';
import RcTooltip from 'rc-tooltip';
import classNames from 'classnames';
import getPlacements from './placements';

export type TooltipPlacement =
  'top' | 'left' | 'right' | 'bottom' |
  'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' |
  'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';

export interface AbstractTooltipProps {
  prefixCls?: string;
  overlayClassName?: string;
  style?: React.CSSProperties;
  overlayStyle?: React.CSSProperties;
  placement?: TooltipPlacement;
  builtinPlacements?: Object;
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  transitionName?: string;
  trigger?: 'hover' | 'focus' | 'click';
  openClassName?: string;
  arrowPointAtCenter?: boolean;
  getTooltipContainer?: (triggerNode: Element) => HTMLElement;
  children?: React.ReactElement<any>;
}

export interface TooltipProps extends AbstractTooltipProps {
  title?: React.ReactNode;
  overlay?: React.ReactNode;
}

export default class Tooltip extends React.Component<TooltipProps, any> {
  static defaultProps = {
    prefixCls: 'ant-tooltip',
    placement: 'top',
    transitionName: 'zoom-big-fast',
    mouseEnterDelay: 0.1,
    mouseLeaveDelay: 0.1,
    arrowPointAtCenter: false,
  };

  refs: {
    tooltip: any;
  };

  constructor(props: TooltipProps) {
    super(props);

    this.state = {
      visible: props.visible,
    };
  }

  componentWillReceiveProps(nextProps: TooltipProps) {
    if ('visible' in nextProps) {
      this.setState({ visible: nextProps.visible });
    }
  }

  onVisibleChange = (visible) => {
    const props = this.props;
    if (!('visible' in props)) {
      this.setState({ visible });
    }

    const onVisibleChange = props.onVisibleChange;
    if (onVisibleChange) {
      onVisibleChange(visible);
    }
  }

  getPopupDomNode() {
    return this.refs.tooltip.getPopupDomNode();
  }

  getPlacements() {
    const { builtinPlacements, arrowPointAtCenter } = this.props;
    return builtinPlacements || getPlacements({
      arrowPointAtCenter,
      verticalArrowShift: 8,
    });
  }

  // 动态设置动画点
  onPopupAlign = (domNode, align) => {
    const placements = this.getPlacements();
    // 当前返回的位置
    const placement = Object.keys(placements).filter(
      key => (
        placements[key].points[0] === align.points[0] &&
        placements[key].points[1] === align.points[1]
      )
    )[0];
    if (!placement) {
      return;
    }
    // 根据当前坐标设置动画点
    const rect = domNode.getBoundingClientRect();
    const transformOrigin = {
      top: '50%',
      left: '50%',
    };
    if (placement.indexOf('top') >= 0 || placement.indexOf('Bottom') >= 0) {
      transformOrigin.top = `${rect.height - align.offset[1]}px`;
    } else if (placement.indexOf('Top') >= 0 || placement.indexOf('bottom') >= 0) {
      transformOrigin.top = `${-align.offset[1]}px`;
    }
    if (placement.indexOf('left') >= 0 || placement.indexOf('Right') >= 0) {
      transformOrigin.left = `${rect.width - align.offset[0]}px`;
    } else if (placement.indexOf('right') >= 0 || placement.indexOf('Left') >= 0) {
      transformOrigin.left = `${-align.offset[0]}px`;
    }
    domNode.style.transformOrigin = `${transformOrigin.left} ${transformOrigin.top}`;
  }

  render() {
    const { props, state } = this;
    const { prefixCls, title, overlay, openClassName } = props;
    const children = props.children as React.ReactElement<any>;
    let visible = state.visible;
    // Hide tooltip when there is no title
    if (!('visible' in props) && !title && !overlay) {
      visible = false;
    }

    const child = React.isValidElement(children) ? children : <span>{children}</span>;
    const childProps = child.props;
    const childCls = classNames(childProps.className, {
      [openClassName || `${prefixCls}-open`]: true,
    });

    return (
      <RcTooltip
        {...this.props}
        ref="tooltip"
        builtinPlacements={this.getPlacements()}
        overlay={overlay || title}
        visible={visible}
        onVisibleChange={this.onVisibleChange}
        onPopupAlign={this.onPopupAlign}
      >
        {visible ? cloneElement(child, { className: childCls }) : child}
      </RcTooltip>
    );
  }
}
