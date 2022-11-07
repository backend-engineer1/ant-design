import React from 'react';
import type { InternalAffixClass } from '..';
import Affix from '..';
import accessibilityTest from '../../../tests/shared/accessibilityTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { render, triggerResize, waitFakeTimer } from '../../../tests/utils';
import Button from '../../button';
import { addObserveTarget, getObserverEntities } from '../utils';

const events: Partial<Record<keyof HTMLElementEventMap, (ev: Partial<Event>) => void>> = {};

class AffixMounter extends React.Component<{
  offsetBottom?: number;
  offsetTop?: number;
  onTestUpdatePosition?(): void;
  onChange?: () => void;
  getInstance?: (inst: InternalAffixClass) => void;
  style?: React.CSSProperties;
}> {
  private container: HTMLDivElement;

  componentDidMount() {
    this.container.addEventListener = jest
      .fn()
      .mockImplementation((event: keyof HTMLElementEventMap, cb: (ev: Partial<Event>) => void) => {
        events[event] = cb;
      });
  }

  getTarget = () => this.container;

  render() {
    const { getInstance, ...restProps } = this.props;
    return (
      <div
        ref={node => {
          this.container = node!;
        }}
        className="container"
      >
        <Affix
          className="fixed"
          target={this.getTarget}
          ref={ele => {
            getInstance?.(ele!);
          }}
          {...restProps}
        >
          <Button type="primary">Fixed at the top of container</Button>
        </Affix>
      </div>
    );
  }
}

describe('Affix Render', () => {
  rtlTest(Affix);
  accessibilityTest(Affix);

  const domMock = jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect');

  const classRect: Record<string, DOMRect> = {
    container: {
      top: 0,
      bottom: 100,
    } as DOMRect,
  };

  beforeEach(() => {
    jest.useFakeTimers();
    const entities = getObserverEntities();
    entities.splice(0, entities.length);
  });

  beforeAll(() => {
    domMock.mockImplementation(function fn(this: HTMLElement) {
      return (
        classRect[this.className] || {
          top: 0,
          bottom: 0,
        }
      );
    });
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllTimers();
  });

  afterAll(() => {
    domMock.mockRestore();
  });

  const movePlaceholder = async (top: number) => {
    classRect.fixed = {
      top,
      bottom: top,
    } as DOMRect;
    if (events.scroll == null) {
      throw new Error('scroll should be set');
    }
    events.scroll({
      type: 'scroll',
    });
    await waitFakeTimer();
  };

  it('Anchor render perfectly', async () => {
    const { container } = render(<AffixMounter />);
    await waitFakeTimer();

    await movePlaceholder(0);
    expect(container.querySelector('.ant-affix')).toBeFalsy();

    await movePlaceholder(-100);
    expect(container.querySelector('.ant-affix')).toBeTruthy();

    await movePlaceholder(0);
    expect(container.querySelector('.ant-affix')).toBeFalsy();
  });

  it('Anchor correct render when target is null', async () => {
    render(<Affix target={() => null}>test</Affix>);
    await waitFakeTimer();
  });

  it('support offsetBottom', async () => {
    const { container } = render(<AffixMounter offsetBottom={0} />);

    await waitFakeTimer();

    await movePlaceholder(300);
    expect(container.querySelector('.ant-affix')).toBeTruthy();

    await movePlaceholder(0);
    expect(container.querySelector('.ant-affix')).toBeFalsy();

    await movePlaceholder(300);
    expect(container.querySelector('.ant-affix')).toBeTruthy();
  });

  it('updatePosition when offsetTop changed', async () => {
    const onChange = jest.fn();

    const { container, rerender } = render(<AffixMounter offsetTop={0} onChange={onChange} />);
    await waitFakeTimer();

    await movePlaceholder(-100);
    expect(onChange).toHaveBeenLastCalledWith(true);
    expect(container.querySelector('.ant-affix')).toHaveStyle({ top: 0 });

    rerender(<AffixMounter offsetTop={10} onChange={onChange} />);
    await waitFakeTimer();
    expect(container.querySelector('.ant-affix')).toHaveStyle({ top: `10px` });
  });

  describe('updatePosition when target changed', () => {
    it('function change', async () => {
      document.body.innerHTML = '<div id="mounter" />';
      const container = document.getElementById('mounter');
      const getTarget = () => container;
      let affixInstance: InternalAffixClass;
      const { rerender } = render(
        <Affix
          ref={node => {
            affixInstance = node as InternalAffixClass;
          }}
          target={getTarget}
        >
          {null}
        </Affix>,
      );
      rerender(
        <Affix
          ref={node => {
            affixInstance = node as InternalAffixClass;
          }}
          target={() => null}
        >
          {null}
        </Affix>,
      );
      expect(affixInstance!.state.status).toBe(0);
      expect(affixInstance!.state.affixStyle).toBe(undefined);
      expect(affixInstance!.state.placeholderStyle).toBe(undefined);
    });

    it('instance change', async () => {
      const container = document.createElement('div');
      document.body.appendChild(container);
      let target: HTMLDivElement | null = container;

      const getTarget = () => target;
      const { rerender } = render(<Affix target={getTarget}>{null}</Affix>);
      await waitFakeTimer();
      expect(getObserverEntities()).toHaveLength(1);
      expect(getObserverEntities()[0].target).toBe(container);

      target = null;
      rerender(<Affix>{null}</Affix>);
      expect(getObserverEntities()).toHaveLength(1);
      expect(getObserverEntities()[0].target).toBe(window);
    });

    it('check position change before measure', async () => {
      const { container } = render(
        <>
          <Affix offsetTop={10}>
            <Button>top</Button>
          </Affix>
          <Affix offsetBottom={10}>
            <Button>bottom</Button>
          </Affix>
        </>,
      );
      await waitFakeTimer();
      await movePlaceholder(1000);
      expect(container.querySelector('.ant-affix')).toBeTruthy();
    });

    it('do not measure when hidden', async () => {
      let affixInstance: InternalAffixClass | null = null;

      const { rerender } = render(
        <AffixMounter
          getInstance={inst => {
            affixInstance = inst;
          }}
          offsetBottom={0}
        />,
      );
      await waitFakeTimer();
      const firstAffixStyle = affixInstance!.state.affixStyle;

      rerender(
        <AffixMounter
          getInstance={inst => {
            affixInstance = inst;
          }}
          offsetBottom={0}
          style={{ display: 'none' }}
        />,
      );
      await waitFakeTimer();
      const secondAffixStyle = affixInstance!.state.affixStyle;

      expect(firstAffixStyle).toEqual(secondAffixStyle);
    });
  });

  describe('updatePosition when size changed', () => {
    it('add class automatically', async () => {
      document.body.innerHTML = '<div id="mounter" />';

      let affixInstance: InternalAffixClass | null = null;
      render(
        <AffixMounter
          getInstance={inst => {
            affixInstance = inst;
          }}
          offsetBottom={0}
        />,
        {
          container: document.getElementById('mounter')!,
        },
      );

      await waitFakeTimer();
      await movePlaceholder(300);
      expect(affixInstance!.state.affixStyle).toBeTruthy();
    });

    // Trigger inner and outer element for the two <ResizeObserver>s.
    [
      '.ant-btn', // inner
      '.fixed', // outer
    ].forEach(selector => {
      it(`trigger listener when size change: ${selector}`, async () => {
        const updateCalled = jest.fn();
        const { container } = render(
          <AffixMounter offsetBottom={0} onTestUpdatePosition={updateCalled} />,
          {
            container: document.getElementById('mounter')!,
          },
        );

        updateCalled.mockReset();
        triggerResize(container.querySelector(selector)!);

        await waitFakeTimer();

        expect(updateCalled).toHaveBeenCalled();
      });
    });

    it('addObserveTarget should not Throw Error when target is null', () => {
      expect(() => {
        addObserveTarget(null);
      }).not.toThrow();
    });
  });
});
