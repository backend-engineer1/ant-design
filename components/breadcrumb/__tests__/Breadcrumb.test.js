import React from 'react';
import { mount, render } from 'enzyme';
import { renderToJson } from 'enzyme-to-json';
import Breadcrumb from '../index';

describe('Breadcrumb', () => {
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  afterEach(() => {
    errorSpy.mockReset();
  });

  afterAll(() => {
    errorSpy.mockRestore();
  });

  it('warns on non-Breadcrumb.Item children', () => {
    const MyCom = () => <div>foo</div>;
    mount(
      <Breadcrumb>
        <MyCom />
      </Breadcrumb>
    );
    expect(errorSpy.mock.calls).toHaveLength(1);
    expect(errorSpy.mock.calls[0][0]).toMatch(
      'Breadcrumb only accepts Breadcrumb.Item as it\'s children'
    );
  });

  // https://github.com/ant-design/ant-design/issues/5015
  it('should allow Breadcrumb.Item is null or undefined', () => {
    const wrapper = render(
      <Breadcrumb>
        {null}
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        {undefined}
      </Breadcrumb>
    );
    expect(errorSpy).not.toHaveBeenCalled();
    expect(renderToJson(wrapper)).toMatchSnapshot();
  });
});
