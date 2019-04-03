import React from 'react';
import { render, mount } from 'enzyme';
import { Col, Row } from '..';

jest.mock('enquire.js', () => {
  let that;
  let unmatchFun;
  return {
    unregister: jest.fn(),
    register: (meidia, options) => {
      if (meidia === '(max-width: 575px)') {
        that = this;
        options.match.call(that);
        unmatchFun = options.unmatch;
      }
    },
    callunmatch() {
      unmatchFun.call(that);
    },
  };
});

describe('Grid', () => {
  it('should render Col', () => {
    const wrapper = render(<Col span={2} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render Row', () => {
    const wrapper = render(<Row />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should work correct when gutter is object', () => {
    // eslint-disable-next-line global-require
    const enquire = require('enquire.js');
    const wrapper = mount(<Row gutter={{ xs: 20 }} />);
    expect(wrapper.find('div').prop('style')).toEqual({
      marginLeft: -10,
      marginRight: -10,
    });
    enquire.callunmatch();
    expect(
      wrapper
        .update()
        .find('div')
        .prop('style'),
    ).toEqual(undefined);
    wrapper.unmount();
    expect(enquire.unregister).toHaveBeenCalledTimes(6);
  });

  it('renders wrapped Col correctly', () => {
    const MyCol = () => <Col span={12} />;
    const wrapper = render(
      <Row gutter={20}>
        <div>
          <Col span={12} />
        </div>
        <MyCol />
      </Row>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('when component has been unmounted, componentWillUnmount should be called', () => {
    const wrapper = mount(<Row />);
    const willUnmount = jest.spyOn(wrapper.instance(), 'componentWillUnmount');
    wrapper.unmount();
    expect(willUnmount).toHaveBeenCalled();
  });

  it('when typeof getGutter is object', () => {
    const wrapper = mount(<Row gutter={{ xs: 8, sm: 16, md: 24 }} />).instance();
    expect(wrapper.getGutter()).toBe(8);
  });
});
