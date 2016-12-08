import React from 'react';
import { mount } from 'enzyme';
import Table from '../../components/table';

describe('Table.rowSelection', () => {
  const columns = [{
    title: 'Name',
    dataIndex: 'name',
  }];

  const data = [
    { key: 0, name: 'Jack' },
    { key: 1, name: 'Lucy' },
    { key: 2, name: 'Tom' },
    { key: 3, name: 'Jerry' },
  ];

  function createTable(props = {}) {
    return (
      <Table
        columns={columns}
        dataSource={data}
        rowSelection={{}}
        {...props}
      />
    );
  }

  it('select by checkbox', () => {
    const wrapper = mount(createTable());
    const checkboxes = wrapper.find('input');
    const checkboxAll = checkboxes.first();

    checkboxAll.simulate('change', { target: { checked: true } });
    expect(wrapper.instance().store.getState()).toEqual({
      selectedRowKeys: [0, 1, 2, 3],
      selectionDirty: true,
    });

    checkboxes.at(1).simulate('change', { target: { checked: false } });
    expect(wrapper.instance().store.getState()).toEqual({
      selectedRowKeys: [1, 2, 3],
      selectionDirty: true,
    });

    checkboxes.at(1).simulate('change', { target: { checked: true } });
    expect(wrapper.instance().store.getState()).toEqual({
      selectedRowKeys: [1, 2, 3, 0],
      selectionDirty: true,
    });
  });

  it('select by radio', () => {
    const wrapper = mount(createTable({ rowSelection: { type: 'radio' } }));
    const radios = wrapper.find('input');

    expect(radios.length).toBe(4);

    radios.first().simulate('change', { target: { checked: true } });
    expect(wrapper.instance().store.getState()).toEqual({
      selectedRowKeys: [0],
      selectionDirty: true,
    });

    radios.last().simulate('change', { target: { checked: true } });
    expect(wrapper.instance().store.getState()).toEqual({
      selectedRowKeys: [3],
      selectionDirty: true,
    });
  });

  it('pass getCheckboxProps to checkbox', () => {
    const rowSelection = {
      getCheckboxProps: record => ({
        disabled: record.name === 'Lucy',
      }),
    };

    const wrapper = mount(createTable({ rowSelection }));
    const checkboxes = wrapper.find('input');

    expect(checkboxes.at(1).props().disabled).toBe(false);
    expect(checkboxes.at(2).props().disabled).toBe(true);
  });

  it('works with pagination', () => {
    const wrapper = mount(createTable({ pagination: { pageSize: 2 } }));

    const checkboxAll = wrapper.find('SelectionCheckboxAll');
    const pagers = wrapper.find('Pager');

    checkboxAll.find('input').simulate('change', { target: { checked: true } });
    expect(checkboxAll.node.state).toEqual({ checked: true, indeterminate: false });

    pagers.at(1).simulate('click');
    expect(checkboxAll.node.state).toEqual({ checked: false, indeterminate: false });

    pagers.at(0).simulate('click');
    expect(checkboxAll.node.state).toEqual({ checked: true, indeterminate: false });
  });

  // https://github.com/ant-design/ant-design/issues/4020
  it('handles defaultChecked', () => {
    const rowSelection = {
      getCheckboxProps: record => ({
        defaultChecked: record.key === 0,
      }),
    };

    const wrapper = mount(createTable({ rowSelection }));

    const checkboxs = wrapper.find('input');
    expect(checkboxs.at(1).props().checked).toBe(true);
    expect(checkboxs.at(2).props().checked).toBe(false);

    checkboxs.at(2).simulate('change', { target: { checked: true } });
    expect(checkboxs.at(1).props().checked).toBe(true);
    expect(checkboxs.at(2).props().checked).toBe(true);
  });

  it('can be controlled', () => {
    const wrapper = mount(createTable({ rowSelection: { selectedRowKeys: [0] } }));

    expect(wrapper.instance().store.getState()).toEqual({
      selectedRowKeys: [0],
      selectionDirty: false,
    });

    wrapper.setProps({ rowSelection: { selectedRowKeys: [1] } });

    expect(wrapper.instance().store.getState()).toEqual({
      selectedRowKeys: [1],
      selectionDirty: false,
    });
  });

  it('fires change & select events', () => {
    const handleChange = jest.fn();
    const handleSelect = jest.fn();
    const rowSelection = {
      onChange: handleChange,
      onSelect: handleSelect,
    };
    const wrapper = mount(createTable({ rowSelection }));

    wrapper.find('input').last().simulate('change', { target: { checked: true } });

    expect(handleChange).toBeCalledWith([3], [{ key: 3, name: 'Jerry' }]);
    expect(handleSelect).toBeCalledWith(
      { key: 3, name: 'Jerry' },
      true,
      [{ key: 3, name: 'Jerry' }]
    );
  });

  it('fires selectAll event', () => {
    const handleSelectAll = jest.fn();
    const rowSelection = {
      onSelectAll: handleSelectAll,
    };
    const wrapper = mount(createTable({ rowSelection }));

    wrapper.find('input').first().simulate('change', { target: { checked: true } });
    expect(handleSelectAll).toBeCalledWith(true, data, data);
  });
});
