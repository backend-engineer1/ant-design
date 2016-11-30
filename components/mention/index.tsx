import React from 'react';
import RcMention, { Nav, toString, toEditorState, getMentions } from 'rc-editor-mention';
import classNames from 'classnames';
import Icon from '../icon';

export interface MentionProps {
  prefixCls: string;
  suggestionStyle?: Object;
  suggestions?: Array<any>;
  onSearchChange?: Function;
  onChange?: Function;
  notFoundContent?: any;
  loading?: Boolean;
  style?: Object;
  defaultValue?: any;
  value?: any;
  className?: string;
  multiLines?: Boolean;
  prefix?: string;
  placeholder?: string;
  getSuggestionContainer?: Function;
}

export interface MentionState {
  suggestions?: Array<any>;
  focus?: Boolean;
}

export default class Mention extends React.Component<MentionProps, MentionState> {
  static Nav = Nav;
  static toString = toString;
  static toEditorState = toEditorState;
  static getMentions = getMentions;
  static defaultProps = {
    prefixCls: 'ant-mention',
    notFoundContent: '无匹配结果，轻敲空格完成输入',
    loading: false,
    multiLines: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      suggestions: props.suggestions,
      focus: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      suggestions: nextProps.suggestions,
    });
  }

  onSearchChange = (value) => {
    if (this.props.onSearchChange) {
      return this.props.onSearchChange(value);
    }
    return this.defaultSearchChange(value);
  }

  onChange = (editorState) => {
    if (this.props.onChange) {
      this.props.onChange(editorState);
    }
  }

  defaultSearchChange(value: String): void {
    const searchValue = value.toLowerCase();
    const filteredSuggestions = (this.props.suggestions || []).filter(
      suggestion => suggestion.toLowerCase().indexOf(searchValue) !== -1
    );
    this.setState({
      suggestions: filteredSuggestions,
    });
  }

  render() {
    const { className = '', prefixCls, loading } = this.props;
    const { suggestions, focus } = this.state;
    const cls = classNames(className, {
      [`${prefixCls}-active`]: focus,
    });

    const notFoundContent = loading
      ? <Icon type="loading" />
      : this.props.notFoundContent;

    return (
      <RcMention
        {...this.props}
        className={cls}
        onSearchChange={this.onSearchChange}
        onChange={this.onChange}
        onFocus={() => this.setState({ focus: true })}
        onBlur={() => this.setState({ focus: false })}
        suggestions={suggestions}
        notFoundContent={notFoundContent}
      />
    );
  }
}
