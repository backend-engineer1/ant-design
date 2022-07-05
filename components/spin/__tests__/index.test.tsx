import React from 'react';
// eslint-disable-next-line import/no-named-as-default
import { render } from '@testing-library/react';
import Spin from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';

describe('Spin', () => {
  mountTest(Spin);
  rtlTest(Spin);

  it('should only affect the spin element when set style to a nested <Spin>xx</Spin>', () => {
    const { container } = render(
      <Spin style={{ background: 'red' }}>
        <div>content</div>
      </Spin>,
    );
    expect((container.querySelector('.ant-spin-nested-loading')! as HTMLElement).style.length).toBe(
      0,
    );
    expect((container.querySelector('.ant-spin')! as HTMLElement).style.background).toBe('red');
  });

  it("should render custom indicator when it's set", () => {
    const customIndicator = <div className="custom-indicator" />;
    const { asFragment } = render(<Spin indicator={customIndicator} />);
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('should be controlled by spinning', () => {
    const { container, rerender } = render(<Spin spinning={false} />);
    expect(container.querySelector('.ant-spin-spinning')).toBeFalsy();
    rerender(<Spin spinning />);
    expect(container.querySelector('.ant-spin-spinning')).toBeTruthy();
  });

  it('if indicator set null should not be render default indicator', () => {
    const { asFragment } = render(<Spin indicator={null as any} />);
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('should support static method Spin.setDefaultIndicator', () => {
    Spin.setDefaultIndicator(<em className="custom-spinner" />);
    const { asFragment } = render(<Spin />);
    expect(asFragment().firstChild).toMatchSnapshot();
    Spin.setDefaultIndicator(null);
  });

  it('should render 0', () => {
    const { container } = render(<Spin>{0}</Spin>);
    expect(container.querySelector('.ant-spin-container')?.textContent).toBe('0');
  });
});
