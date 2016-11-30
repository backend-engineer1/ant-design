import React from 'react';
import Search from './search';
import classNames from 'classnames';
import Animate from 'rc-animate';
import PureRenderMixin from 'rc-util/lib/PureRenderMixin';
import assign from 'object-assign';
import { TransferItem } from './index';
import Item from './item';

function noop() {
}

export interface TransferListProps {
  prefixCls: string;
  dataSource: TransferItem[];
  filter?: string;
  showSearch?: boolean;
  searchPlaceholder?: string;
  titleText?: string;
  style?: React.CSSProperties;
  handleFilter: (e: any) => void;
  handleSelect: (selectedItem: any, checked: boolean) => void;
  handleSelectAll: (dataSource: any[], checkAll: boolean) => void;
  handleClear: () => void;
  render?: (item: any) => any;
  body?: (props: any) => any;
  footer?: (props: any) => void;
  checkedKeys: string[];
  checkStatus?: boolean;
  position?: string;
  notFoundContent?: React.ReactNode | string;
  filterOption: (filterText: any, item: any) => boolean;
  lazy?: {};
}

export interface TransferListContext {
  antLocale?: {
    Transfer?: any,
  };
}

export default class TransferList extends React.Component<TransferListProps, any> {
  static defaultProps = {
    dataSource: [],
    titleText: '',
    showSearch: false,
    render: noop,
  };

  static contextTypes = {
    antLocale: React.PropTypes.object,
  };

  context: TransferListContext;
  timer: number;

  constructor(props) {
    super(props);
    this.state = {
      mounted: false,
    };
  }

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.setState({
        mounted: true,
      });
    }, 0);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  shouldComponentUpdate(...args) {
    return PureRenderMixin.shouldComponentUpdate.apply(this, args);
  }

  getCheckStatus(filteredDataSource) {
    const { checkedKeys } = this.props;
    if (checkedKeys.length === 0) {
      return 'none';
    } else if (filteredDataSource.every(item => checkedKeys.indexOf(item.key) >= 0)) {
      return 'all';
    }
    return 'part';
  }

  handleSelect = (selectedItem) => {
    const { checkedKeys } = this.props;
    const result = checkedKeys.some((key) => key === selectedItem.key);
    this.props.handleSelect(selectedItem, !result);
  }

  handleFilter = (e) => {
    this.props.handleFilter(e);
  }

  handleClear = () => {
    this.props.handleClear();
  }

  renderCheckbox({ prefixCls, filteredDataSource, checked, checkPart, disabled, checkable }) {
    const checkAll = (!checkPart) && checked;

    const checkboxCls = classNames({
      [`${prefixCls}-checkbox`]: true,
      [`${prefixCls}-checkbox-indeterminate`]: checkPart,
      [`${prefixCls}-checkbox-checked`]: checkAll,
      [`${prefixCls}-checkbox-disabled`]: disabled,
    });

    return (
      <span
        ref="checkbox"
        className={checkboxCls}
        onClick={() => this.props.handleSelectAll(filteredDataSource, checkAll)}
      >
        {(typeof checkable !== 'boolean') ? checkable : null}
      </span>
    );
  }

  render() {
    const { prefixCls, dataSource, titleText, filter, checkedKeys, lazy, filterOption,
            body = noop, footer = noop, showSearch, render = noop, style } = this.props;

    let { searchPlaceholder, notFoundContent } = this.props;

    // Custom Layout
    const footerDom = footer(assign({}, this.props));
    const bodyDom = body(assign({}, this.props));

    const listCls = classNames(prefixCls, {
      [`${prefixCls}-with-footer`]: !!footerDom,
    });

    const filteredDataSource: TransferItem[] = [];

    const showItems = dataSource.map((item) => {
      if (!item.disabled) {
        filteredDataSource.push(item);
      }
      const checked = checkedKeys.indexOf(item.key) >= 0;
      return (
        <Item
          key={item.key}
          item={item}
          lazy={lazy}
          render={render}
          filter={filter}
          filterOption={filterOption}
          checked={checked}
          prefixCls={prefixCls}
          onClick={this.handleSelect}
        />
      );
    });

    let unit = '';
    const antLocale = this.context.antLocale;
    if (antLocale && antLocale.Transfer) {
      const transferLocale = antLocale.Transfer;
      unit = dataSource.length > 1 ? transferLocale.itemsUnit : transferLocale.itemUnit;
      searchPlaceholder = searchPlaceholder || transferLocale.searchPlaceholder;
      notFoundContent = notFoundContent || transferLocale.notFoundContent;
    }

    const checkStatus = this.getCheckStatus(filteredDataSource);
    const outerPrefixCls = prefixCls.replace('-list', '');
    const search = showSearch ? (
      <div className={`${prefixCls}-body-search-wrapper`}>
        <Search
          prefixCls={`${prefixCls}-search`}
          onChange={this.handleFilter}
          handleClear={this.handleClear}
          placeholder={searchPlaceholder || 'Search'}
          value={filter}
        />
      </div>
    ) : null;

    const listBody = bodyDom || (
      <div className={showSearch ? `${prefixCls}-body ${prefixCls}-body-with-search` : `${prefixCls}-body`}>
        {search}
        <Animate
          component="ul"
          className={`${prefixCls}-content`}
          transitionName={this.state.mounted ? `${prefixCls}-content-item-highlight` : ''}
          transitionLeave={false}
        >
          {showItems}
        </Animate>
        <div className={`${prefixCls}-body-not-found`}>
          {notFoundContent || 'Not Found'}
        </div>
      </div>
    );

    const listFooter = footerDom ? (
      <div className={`${prefixCls}-footer`}>
        {footerDom}
      </div>
    ) : null;

    const renderedCheckbox = this.renderCheckbox({
      prefixCls: outerPrefixCls,
      checked: checkStatus === 'all',
      checkPart: checkStatus === 'part',
      checkable: <span className={`${outerPrefixCls}-checkbox-inner`} />,
      filteredDataSource,
      disabled: false,
    });

    return (
      <div className={listCls} style={style}>
        <div className={`${prefixCls}-header`}>
          {renderedCheckbox}
          <span className={`${prefixCls}-header-selected`}>
            <span>
              {(checkedKeys.length > 0 ? `${checkedKeys.length}/` : '') + dataSource.length} {unit}
            </span>
            <span className={`${prefixCls}-header-title`}>
              {titleText}
            </span>
          </span>
        </div>
        {listBody}
        {listFooter}
      </div>
    );
  }
}
