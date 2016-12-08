import React from 'react';
import { mount, render } from 'enzyme';
import { renderToJson } from 'enzyme-to-json';
import RcTimePicker from 'rc-time-picker/lib/TimePicker';
import TimePicker from '../../components/time-picker';

describe('TimePicker', () => {
  it('renders addon correctly', () => {
    const addon = () => (<button>Ok</button>);
    const wrapper = mount(<TimePicker addon={addon} />);
    const rcTimePicker = wrapper.find(RcTimePicker);
    const addonWrapper = render(rcTimePicker.props().addon());

    expect(renderToJson(addonWrapper)).toMatchSnapshot();
  });
});
