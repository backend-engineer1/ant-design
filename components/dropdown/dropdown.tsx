import * as React from 'react';
import RcDropdown from 'rc-dropdown';
import classNames from 'classnames';
import DropdownButton from './dropdown-button';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import warning from '../_util/warning';
import Icon from '../icon';

export interface DropDownProps {
  trigger?: ('click' | 'hover' | 'contextMenu')[];
  overlay: React.ReactNode;
  onVisibleChange?: (visible?: boolean) => void;
  visible?: boolean;
  disabled?: boolean;
  align?: Object;
  getPopupContainer?: (triggerNode: Element) => HTMLElement;
  prefixCls?: string;
  className?: string;
  transitionName?: string;
  placement?: 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight';
  forceRender?: boolean;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
}

export default class Dropdown extends React.Component<DropDownProps, any> {
  static Button: typeof DropdownButton;
  static defaultProps = {
    mouseEnterDelay: 0.15,
    mouseLeaveDelay: 0.1,
    placement: 'bottomLeft',
  };

  getTransitionName() {
    const { placement = '', transitionName } = this.props;
    if (transitionName !== undefined) {
      return transitionName;
    }
    if (placement.indexOf('top') >= 0) {
      return 'slide-down';
    }
    return 'slide-up';
  }

  componentDidMount() {
    const { overlay } = this.props;
    if (overlay) {
      const overlayProps = (overlay as React.ReactElement<any>).props;
      warning(
        !overlayProps.mode || overlayProps.mode === 'vertical',
        `mode="${overlayProps.mode}" is not supported for Dropdown\'s Menu.`,
      );
    }
  }

  renderDropDown = ({
    getPopupContainer: getContextPopupContainer,
    getPrefixCls,
  }: ConfigConsumerProps) => {
    const {
      prefixCls: customizePrefixCls,
      children,
      overlay: overlayElements,
      trigger,
      disabled,
      getPopupContainer,
    } = this.props;

    const prefixCls = getPrefixCls('dropdown', customizePrefixCls);
    const child = React.Children.only(children);
    const overlay = React.Children.only(overlayElements);

    const dropdownTrigger = React.cloneElement(child, {
      className: classNames(child.props.className, `${prefixCls}-trigger`),
      disabled,
    });
    // menu cannot be selectable in dropdown defaultly
    // menu should be focusable in dropdown defaultly
    const { selectable = false, focusable = true } = overlay.props;

    const expandIcon = (
      <span className={`${prefixCls}-menu-submenu-arrow`}>
        <Icon type="right" className={`${prefixCls}-menu-submenu-arrow-icon`} />
      </span>
    );

    const fixedModeOverlay =
      typeof overlay.type === 'string'
        ? overlay
        : React.cloneElement(overlay, {
            mode: 'vertical',
            selectable,
            focusable,
            expandIcon,
          });

    const triggerActions = disabled ? [] : trigger;
    let alignPoint;
    if (triggerActions && triggerActions.indexOf('contextMenu') !== -1) {
      alignPoint = true;
    }

    return (
      <RcDropdown
        alignPoint={alignPoint}
        {...this.props}
        prefixCls={prefixCls}
        getPopupContainer={getPopupContainer || getContextPopupContainer}
        transitionName={this.getTransitionName()}
        trigger={triggerActions}
        overlay={fixedModeOverlay}
      >
        {dropdownTrigger}
      </RcDropdown>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderDropDown}</ConfigConsumer>;
  }
}
