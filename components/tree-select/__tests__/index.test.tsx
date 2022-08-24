import React from 'react';
import { render } from '../../../tests/utils';
import TreeSelect, { TreeNode } from '..';
import focusTest from '../../../tests/shared/focusTest';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';

describe('TreeSelect', () => {
  focusTest(TreeSelect, { refFocus: true });
  mountTest(TreeSelect);
  rtlTest(TreeSelect);

  describe('TreeSelect Custom Icons', () => {
    it('should support customized icons', () => {
      const { container } = render(
        <TreeSelect
          showSearch
          clearIcon={<span>clear</span>}
          removeIcon={<span>remove</span>}
          value={['leaf1', 'leaf2']}
          placeholder="Please select"
          multiple
          allowClear
          treeDefaultExpandAll
        >
          <TreeNode value="parent 1" title="parent 1" key="0-1">
            <TreeNode value="parent 1-0" title="parent 1-0" key="0-1-1">
              <TreeNode value="leaf1" title="my leaf" key="random" />
              <TreeNode value="leaf2" title="your leaf" key="random1" />
            </TreeNode>
          </TreeNode>
        </TreeSelect>,
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    it('should `treeIcon` work', () => {
      const { container } = render(
        <TreeSelect treeIcon open>
          <TreeNode value="parent 1" title="parent 1" icon={<span>Bamboo</span>} />
        </TreeSelect>,
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  it('should support notFoundContent', () => {
    const content = 'notFoundContent';
    const { container } = render(<TreeSelect treeIcon open notFoundContent={content} />);
    expect(container.querySelector('.ant-select-empty')?.innerHTML).toBe(content);
  });

  it('should show warning when use dropdownClassName', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<TreeSelect dropdownClassName="myCustomClassName" />);
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: TreeSelect] `dropdownClassName` is deprecated which will be removed in next major version. Please use `popupClassName` instead.',
    );
    errorSpy.mockRestore();
  });
});
