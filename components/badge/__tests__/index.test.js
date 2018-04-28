import React from 'react';
import { mount } from 'enzyme';
import Badge from '../index';

describe('Badge', () => {
  test('badge dot not scaling count > 9', () => {
    const badge = mount(<Badge count={10} dot />);
    expect(badge.find('.ant-card-multiple-words').length).toBe(0);
  });

  test('badge dot not showing count == 0', () => {
    const badge = mount(<Badge count={0} dot />);
    expect(badge.find('.ant-badge-dot').length).toBe(0);
  });

  it('should have an overriden title attribute', () => {
    const badge = mount(<Badge count={10} title="Custom title" />);
    expect(badge.find('.ant-scroll-number').getDOMNode().attributes.getNamedItem('title').value).toEqual('Custom title');
  });
});
