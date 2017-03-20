import React from 'react';
import { findDOMNode } from 'react-dom';
import Select, { AbstractSelectProps, OptionProps, OptGroupProps } from '../select';
import Input from '../input';
import { Option, OptGroup } from 'rc-select';
import classNames from 'classnames';

export interface SelectedValue {
  key: string;
  label: React.ReactNode;
}

export interface DataSourceItemObject { value: string; text: string; };
export type DataSourceItemType = string | DataSourceItemObject;

export interface InputProps {
  onChange?: React.FormEventHandler<any>;
  value: any;
}

export type ValidInputElement =
  HTMLInputElement |
  HTMLTextAreaElement |
  React.ReactElement<InputProps>;

export interface AutoCompleteProps extends AbstractSelectProps {
  size?: 'large' | 'small' | 'default';
  className?: string;
  notFoundContent?: Element;
  dataSource: DataSourceItemType[];
  defaultValue?: string | Array<any> | SelectedValue | Array<SelectedValue>;
  value?: string | Array<any> | SelectedValue | Array<SelectedValue>;
  onChange?: (value: string | Array<any> | SelectedValue | Array<SelectedValue>) => void;
  onSelect?: (value: string | Array<any> | SelectedValue | Array<SelectedValue>, option: Object) => any;
  disabled?: boolean;
  children?: ValidInputElement |
    React.ReactElement<OptionProps> |
    Array<React.ReactElement<OptionProps>>;
}

class InputElement extends React.Component<any, any> {
  private ele: HTMLInputElement;

  focus = () => {
    this.ele.focus ? this.ele.focus() : (findDOMNode(this.ele) as HTMLInputElement).focus();
  }
  blur = () => {
    this.ele.blur ? this.ele.blur() : (findDOMNode(this.ele) as HTMLInputElement).blur();
  }
  render() {
    return React.cloneElement(this.props.children, {
      ...this.props,
      ref: ele => this.ele = (ele as HTMLInputElement),
    }, null);
  }
}

function isSelectOptionOrSelectOptGroup(child: any): Boolean {
  return child && child.type && (child.type.isSelectOption || child.type.isSelectOptGroup);
}

export default class AutoComplete extends React.Component<AutoCompleteProps, any> {
  static Option = Option as React.ClassicComponentClass<OptionProps>;
  static OptGroup = OptGroup as React.ClassicComponentClass<OptGroupProps>;

  static defaultProps = {
    prefixCls: 'ant-select',
    transitionName: 'slide-up',
    optionLabelProp: 'children',
    choiceTransitionName: 'zoom',
    showSearch: false,
  };

  getInputElement = () => {
    const { children } = this.props;
    const element = children && React.isValidElement(children) && children.type !== Option ?
      React.Children.only(this.props.children) :
      <Input/>;
    return <InputElement className="ant-input">{element}</InputElement>;
  }

  render() {
    let {
      size, className = '', notFoundContent, prefixCls, optionLabelProp, dataSource, children,
    } = this.props;

    const cls = classNames({
      [`${prefixCls}-lg`]: size === 'large',
      [`${prefixCls}-sm`]: size === 'small',
      [className]: !!className,
      [`${prefixCls}-show-search`]: true,
      [`${prefixCls}-auto-complete`]: true,
    });

    let options;
    const childArray = React.Children.toArray(children);
    if (childArray.length &&
        isSelectOptionOrSelectOptGroup(childArray[0])
      ) {
      options = children;
    } else {
      options = dataSource ? dataSource.map((item) => {
        if (React.isValidElement(item)) {
          return item;
        }
        switch (typeof item) {
          case 'string':
            return <Option key={item}>{item}</Option>;
          case 'object':
            return (
              <Option key={(item as DataSourceItemObject).value}>
                {(item as DataSourceItemObject).text}
              </Option>
            );
          default:
            throw new Error('AutoComplete[dataSource] only supports type `string[] | Object[]`.');
        }
      }) : [];
    }

    return (
      <Select
        {...this.props}
        className={cls}
        optionLabelProp={optionLabelProp}
        combobox
        getInputElement={this.getInputElement}
        notFoundContent={notFoundContent}
      >
        {options}
      </Select>
    );
  }
}
