import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Spin from '../spin';
import Pagination from '../pagination';
import { Row } from '../grid';

import Item from './Item';

export { ListItemProps, ListItemMetaProps } from './Item';

export type ColumnType = 1 | 2 | 3 | 4 | 6 | 8 | 12 | 24;

export interface ListGridType {
  gutter?: number;
  column?: ColumnType;
  xs?: ColumnType;
  sm?: ColumnType;
  md?: ColumnType;
  lg?: ColumnType;
  xl?: ColumnType;
}

export type ListSize = 'small' | 'default' | 'large';

export interface ListProps {
  bordered?: boolean;
  className?: string;
  children?: React.ReactNode;
  dataSource: any;
  extra?: React.ReactNode;
  grid?: ListGridType;
  id?: string;
  itemLayout?: string;
  loading?: boolean;
  loadMore?: React.ReactNode;
  pagination?: any;
  prefixCls?: string;
  rowKey?: any;
  renderItem: any;
  size?: ListSize;
  split?: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export default class List extends Component<ListProps> {
  static Item: typeof Item = Item;

  static childContextTypes = {
    grid: PropTypes.any,
  };

  private keys = {};

  getChildContext() {
    return {
      grid: this.props.grid,
    };
  }

  renderItem = (item, index) => {
    const { dataSource, renderItem, rowKey } = this.props;
    let key;

    if (typeof rowKey === 'function') {
      key = rowKey(dataSource[index]);
    } else if (typeof rowKey === 'string') {
      key = dataSource[rowKey];
    } else {
      key = dataSource.key;
    }

    if (!key) {
      key = `list-item-${index}`;
    }

    this.keys[index] = key;

    return renderItem(item, index);
  }

  render() {
    const {
      bordered = false,
      split = true,
      className,
      children,
      loading = false,
      itemLayout,
      loadMore,
      pagination = false,
      prefixCls = 'ant-list',
      grid,
      dataSource = [],
      size,
      rowKey,
      renderItem,
      header,
      footer,
      ...rest,
    } = this.props;

    // large => lg
    // small => sm
    let sizeCls = '';
    switch (size) {
      case 'large':
        sizeCls = 'lg';
        break;
      case 'small':
        sizeCls = 'sm';
      default:
        break;
    }

    const classString = classNames(prefixCls, className, {
      [`${prefixCls}-vertical`]: itemLayout === 'vertical',
      [`${prefixCls}-${sizeCls}`]: sizeCls,
      [`${prefixCls}-split`]: split,
      [`${prefixCls}-bordered`]: bordered,
      [`${prefixCls}-loading`]: loading,
      [`${prefixCls}-grid`]: grid,
    });

    const paginationContent = (
      <div className={`${prefixCls}-pagination`}>
        <Pagination {...pagination} />
      </div>
    );

    const childrenList = React.Children.map(dataSource.map((item: any, index) => this.renderItem(item, index)),
      (child: any, index) => React.cloneElement(child, {
        key: this.keys[index],
      }),
    );

    const childrenContent = grid ? (
      <Row gutter={grid.gutter}>{childrenList}</Row>
    ) : childrenList;

    const content = loading ? (
      <div>
        <Spin>
          {childrenContent}
        </Spin>
        {loadMore}
        {(!loadMore && pagination) && paginationContent}
     </div>
    ) : (
      <div>
        {childrenContent}
        {loadMore}
        {(!loadMore && pagination) && paginationContent}
      </div>
    );

    return (
      <div className={classString} {...rest}>
        {header && <div className={`${prefixCls}-header`}>{header}</div>}
        {content}
        {children}
        {footer && <div className={`${prefixCls}-footer`}>{footer}</div>}
      </div>
    );
  }
}
