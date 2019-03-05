import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { SiderProps } from './Sider';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

export interface GeneratorProps {
  suffixCls: string;
  tagName: 'header' | 'footer' | 'main' | 'section';
}
export interface BasicProps extends React.HTMLAttributes<HTMLDivElement> {
  prefixCls?: string;
  hasSider?: boolean;
}

interface BasicPropsWithTagName extends BasicProps {
  tagName: 'header' | 'footer' | 'main' | 'section';
}

function generator({ suffixCls, tagName }: GeneratorProps) {
  return (BasicComponent: React.ComponentClass<BasicPropsWithTagName>): any => {
    return class Adapter extends React.Component<BasicProps, any> {
      static Header: any;
      static Footer: any;
      static Content: any;
      static Sider: any;

      renderComponent = ({ getPrefixCls }: ConfigConsumerProps) => {
        const { prefixCls: customizePrefixCls } = this.props;
        const prefixCls = getPrefixCls(suffixCls, customizePrefixCls);

        return <BasicComponent prefixCls={prefixCls} tagName={tagName} {...this.props} />;
      };

      render() {
        return <ConfigConsumer>{this.renderComponent}</ConfigConsumer>;
      }
    };
  };
}

class Basic extends React.Component<BasicPropsWithTagName, any> {
  render() {
    const { prefixCls, className, children, tagName, ...others } = this.props;
    const classString = classNames(className, prefixCls);
    return React.createElement(tagName, { className: classString, ...others }, children);
  }
}

interface BasicLayoutState {
  siders: string[];
}

class BasicLayout extends React.Component<BasicPropsWithTagName, BasicLayoutState> {
  static childContextTypes = {
    siderHook: PropTypes.object,
  };
  state = { siders: [] };

  getChildContext() {
    return {
      siderHook: {
        addSider: (id: string) => {
          this.setState(state => ({
            siders: [...state.siders, id],
          }));
        },
        removeSider: (id: string) => {
          this.setState(state => ({
            siders: state.siders.filter(currentId => currentId !== id),
          }));
        },
      },
    };
  }

  render() {
    const { prefixCls, className, children, hasSider, tagName, ...others } = this.props;
    const classString = classNames(className, prefixCls, {
      [`${prefixCls}-has-sider`]: hasSider || this.state.siders.length > 0,
    });
    return React.createElement(tagName, { className: classString, ...others }, children);
  }
}

const Layout: React.ComponentClass<BasicProps> & {
  Header: React.ComponentClass<BasicProps>;
  Footer: React.ComponentClass<BasicProps>;
  Content: React.ComponentClass<BasicProps>;
  Sider: React.ComponentClass<SiderProps>;
} = generator({
  suffixCls: 'layout',
  tagName: 'section',
})(BasicLayout);

const Header = generator({
  suffixCls: 'layout-header',
  tagName: 'header',
})(Basic);

const Footer = generator({
  suffixCls: 'layout-footer',
  tagName: 'footer',
})(Basic);

const Content = generator({
  suffixCls: 'layout-content',
  tagName: 'main',
})(Basic);

Layout.Header = Header;
Layout.Footer = Footer;
Layout.Content = Content;

export default Layout;
