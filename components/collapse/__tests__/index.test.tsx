import React from 'react';
import { act } from 'react-dom/test-utils';
import { sleep, render, fireEvent } from '../../../tests/utils';
import { resetWarned } from '../../_util/warning';

describe('Collapse', () => {
  // eslint-disable-next-line global-require
  const Collapse = require('..').default;

  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  // fix React concurrent
  function triggerAllTimer() {
    for (let i = 0; i < 10; i += 1) {
      act(() => {
        jest.runAllTimers();
      });
    }
  }

  beforeEach(() => {
    resetWarned();
  });

  afterEach(() => {
    errorSpy.mockReset();
  });

  afterAll(() => {
    errorSpy.mockRestore();
  });

  it('should support remove expandIcon', () => {
    const { asFragment } = render(
      <Collapse expandIcon={() => null}>
        <Collapse.Panel header="header" />
      </Collapse>,
    );
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('should keep the className of the expandIcon', () => {
    const { container } = render(
      <Collapse
        expandIcon={() => (
          <button type="button" className="custom-expandicon-classname">
            action
          </button>
        )}
      >
        <Collapse.Panel header="header" />
      </Collapse>,
    );

    expect(container.querySelectorAll('.custom-expandicon-classname').length).toBe(1);
  });

  it('should render extra node of panel', () => {
    const { asFragment } = render(
      <Collapse>
        <Collapse.Panel header="header" extra={<button type="button">action</button>} />
        <Collapse.Panel header="header" extra={<button type="button">action</button>} />
      </Collapse>,
    );
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('could be expand and collapse', async () => {
    const { container } = render(
      <Collapse>
        <Collapse.Panel header="This is panel header 1" key="1">
          content
        </Collapse.Panel>
      </Collapse>,
    );
    expect(
      container.querySelector('.ant-collapse-item')?.classList.contains('ant-collapse-item-active'),
    ).toBe(false);
    fireEvent.click(container.querySelector('.ant-collapse-header')!);
    await sleep(400);
    expect(
      container.querySelector('.ant-collapse-item')?.classList.contains('ant-collapse-item-active'),
    ).toBe(true);
  });

  it('could override default openMotion', () => {
    const { container, asFragment } = render(
      <Collapse openMotion={{}}>
        <Collapse.Panel header="This is panel header 1" key="1">
          content
        </Collapse.Panel>
      </Collapse>,
    );
    fireEvent.click(container.querySelector('.ant-collapse-header')!);
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('should trigger warning and keep compatibility when using disabled in Panel', () => {
    const { container } = render(
      <Collapse>
        <Collapse.Panel disabled header="This is panel header 1" key="1">
          content
        </Collapse.Panel>
      </Collapse>,
    );

    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Collapse.Panel] `disabled` is deprecated. Please use `collapsible="disabled"` instead.',
    );

    expect(container.querySelectorAll('.ant-collapse-item-disabled').length).toBe(1);

    fireEvent.click(container.querySelector('.ant-collapse-header')!);
    expect(container.querySelectorAll('.ant-collapse-item-active').length).toBe(0);
  });

  it('should end motion when set activeKey while hiding', async () => {
    jest.useFakeTimers();
    const spiedRAF = jest
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation(cb => setTimeout(cb, 16.66));

    let setActiveKeyOuter: React.Dispatch<React.SetStateAction<React.Key | undefined>>;
    const Test = () => {
      const [activeKey, setActiveKey] = React.useState();
      setActiveKeyOuter = setActiveKey;
      return (
        <div hidden>
          <Collapse activeKey={activeKey}>
            <Collapse.Panel header="header" key="1">
              content
            </Collapse.Panel>
          </Collapse>
        </div>
      );
    };

    const { container } = render(<Test />);

    await act(async () => {
      setActiveKeyOuter('1');
      await Promise.resolve();
    });

    triggerAllTimer();

    expect(container.querySelectorAll('.ant-motion-collapse').length).toBe(0);

    spiedRAF.mockRestore();
    jest.useRealTimers();
  });

  describe('expandIconPosition', () => {
    ['left', 'right'].forEach(pos => {
      it(`warning for legacy '${pos}'`, () => {
        render(
          <Collapse expandIconPosition={pos}>
            <Collapse.Panel header="header" key="1" />
          </Collapse>,
        );

        expect(errorSpy).toHaveBeenCalledWith(
          'Warning: [antd: Collapse] `expandIconPosition` with `left` or `right` is deprecated. Please use `start` or `end` instead.',
        );
      });

      it('position end', () => {
        const { container } = render(
          <Collapse expandIconPosition="end">
            <Collapse.Panel header="header" key="1" />
          </Collapse>,
        );

        expect(container.querySelector('.ant-collapse-icon-position-end')).toBeTruthy();
      });
    });
  });
});
