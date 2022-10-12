import React from 'react';
import type { TableProps } from '..';
import Table from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { fireEvent, render, waitFakeTimer } from '../../../tests/utils';

const { Column, ColumnGroup } = Table;

describe('Table', () => {
  mountTest(Table);
  rtlTest(Table);

  const warnSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  afterAll(() => {
    warnSpy.mockRestore();
  });

  it('renders JSX correctly', () => {
    const data = [
      {
        key: '1',
        firstName: 'John',
        lastName: 'Brown',
        age: 32,
      },
      {
        key: '2',
        firstName: 'Jim',
        lastName: 'Green',
        age: 42,
      },
    ];

    const { asFragment } = render(
      <Table dataSource={data} pagination={false}>
        <ColumnGroup title="Name">
          <Column title="First Name" dataIndex="firstName" key="firstName" />
          <Column title="Last Name" dataIndex="lastName" key="lastName" />
        </ColumnGroup>
        <Column title="Age" dataIndex="age" key="age" />
        {/* eslint-disable-next-line react/jsx-curly-brace-presence */}
        {'invalid child'}
      </Table>,
    );

    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('updates columns when receiving props', () => {
    const columns = [
      {
        title: 'Name',
        key: 'name',
        dataIndex: 'name',
      },
    ];
    const { container, rerender } = render(<Table columns={columns} />);

    const newColumns = [
      {
        title: 'Title',
        key: 'title',
        dataIndex: 'title',
      },
    ];
    rerender(<Table columns={newColumns} />);
    expect(container.querySelector('th')?.textContent).toEqual('Title');
  });

  it('loading with Spin', async () => {
    jest.useFakeTimers();
    const loading = {
      spinning: false,
      delay: 500,
    };
    const { container, rerender } = render(<Table loading={loading} />);
    expect(container.querySelectorAll('.ant-spin')).toHaveLength(0);
    expect(container.querySelector('.ant-table-placeholder')?.textContent).not.toEqual('');

    loading.spinning = true;
    rerender(<Table loading={loading} />);
    expect(container.querySelectorAll('.ant-spin')).toHaveLength(0);
    await waitFakeTimer();
    rerender(<Table loading />);
    expect(container.querySelectorAll('.ant-spin')).toHaveLength(1);
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  // https://github.com/ant-design/ant-design/issues/22733
  it('support loading tip', async () => {
    jest.useFakeTimers();
    const { container, rerender } = render(<Table loading={{ tip: 'loading...' }} />);
    await waitFakeTimer();
    rerender(
      <Table loading={{ tip: 'loading...', loading: true } as TableProps<any>['loading']} />,
    );
    expect(container.querySelectorAll('.ant-spin')).toHaveLength(1);
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('props#columnsPageRange and props#columnsPageSize do not warn anymore', () => {
    const data = [
      { key: '1', age: 32 },
      { key: '2', age: 42 },
    ];

    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const columnsPageRange = jest.fn();
    const columnsPageSize = jest.fn();
    const props = { columnsPageRange, columnsPageSize };
    render(
      <Table dataSource={data} rowKey="key" {...props}>
        <Column title="Age" dataIndex="age" key="age" />
      </Table>,
    );

    expect(errorSpy).not.toHaveBeenCalledWith(
      '`columnsPageRange` and `columnsPageSize` are removed, please use fixed columns instead, see: https://u.ant.design/fixed-columns.',
    );

    expect(columnsPageRange).not.toHaveBeenCalled();
    expect(columnsPageSize).not.toHaveBeenCalled();
  });

  it('support onHeaderCell', () => {
    const onClick = jest.fn();
    const { container } = render(
      <Table columns={[{ title: 'title', onHeaderCell: () => ({ onClick }) }]} />,
    );
    fireEvent.click(container.querySelector('th')!);
    expect(onClick).toHaveBeenCalled();
  });

  it('should not crash when column children is empty', () => {
    render(
      <Table
        columns={[
          {
            dataIndex: 'name',
            children: undefined,
          },
        ]}
        dataSource={[]}
      />,
    );
  });

  it('should not crash when dataSource is array with none-object items', () => {
    render(
      <Table
        columns={[
          {
            title: 'name',
          },
        ]}
        dataSource={['1', 2, undefined, {}, null, true, false, 0] as TableProps<any>['dataSource']}
      />,
    );
  });

  it('prevent touch event', () => {
    // prevent touch event, 原来的用例感觉是少了 touchmove 调用判断
    const touchmove = jest.fn();
    const { container } = render(
      <Table
        columns={[
          {
            dataIndex: 'name',
            children: undefined,
          },
        ]}
        dataSource={[]}
      />,
    );
    fireEvent.touchMove(container.querySelector('.ant-table')!);
    expect(touchmove).not.toHaveBeenCalled();
  });

  it('renders ellipsis by showTitle option', () => {
    const data = [
      {
        id: '1',
        age: 32,
      },
      {
        id: '2',
        age: 42,
      },
    ];
    const columns = [
      { title: 'id', dataKey: 'id', ellipsis: { showTitle: false } },
      { title: 'age', dataKey: 'age', ellipsis: { showTitle: false } },
    ];
    const { container } = render(<Table columns={columns} dataSource={data} />);
    container.querySelectorAll('td').forEach(td => {
      expect(td.className.includes('ant-table-cell-ellipsis')).toBe(true);
    });
  });

  it('not renders ellipsis origin html title', () => {
    const data = [
      {
        id: '1',
        age: 32,
      },
      {
        id: '2',
        age: 42,
      },
    ];
    const columns = [
      { title: 'id', dataKey: 'id', ellipsis: { showTitle: true } },
      { title: 'age', dataKey: 'age', ellipsis: { showTitle: true } },
    ];

    const { container } = render(<Table columns={columns} dataSource={data} />);
    container.querySelectorAll<HTMLTableCellElement>('.ant-table-thead th').forEach(td => {
      expect((td.attributes as any).title).toBeTruthy();
    });
    container.querySelectorAll('.ant-table-tbody td').forEach(td => {
      expect((td.attributes as any).title).toBeFalsy();
    });
  });

  it('warn about rowKey when using index parameter', () => {
    warnSpy.mockReset();
    const columns = [
      {
        title: 'Name',
        key: 'name',
        dataIndex: 'name',
      },
    ];
    render(<Table columns={columns} rowKey={(record, index) => record + index} />);
    expect(warnSpy).toHaveBeenCalledWith(
      'Warning: [antd: Table] `index` parameter of `rowKey` function is deprecated. There is no guarantee that it will work as expected.',
    );
  });
  it('not warn about rowKey', () => {
    warnSpy.mockReset();
    const columns = [
      {
        title: 'Name',
        key: 'name',
        dataIndex: 'name',
      },
    ];
    render(<Table columns={columns} rowKey={record => record.key} />);
    expect(warnSpy).not.toHaveBeenCalled();
  });

  it('should support ref', () => {
    warnSpy.mockReset();
    const columns = [
      {
        title: 'Name',
        key: 'name',
        dataIndex: 'name',
      },
    ];
    const Wrapper: React.FC = () => {
      const ref = React.useRef<HTMLDivElement>(null);
      return <Table ref={ref} columns={columns} />;
    };
    render(<Wrapper />);
    expect(warnSpy).not.toHaveBeenCalled();
  });
});
