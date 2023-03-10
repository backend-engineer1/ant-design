import type { ChangeEventHandler } from 'react';
import React, { useState, useEffect, useRef } from 'react';
import scrollIntoView from 'scroll-into-view-if-needed';
import classNames from 'classnames';
import type { ColProps } from 'antd/es/grid';
import type { FormInstance } from '..';
import Form from '..';
import * as Util from '../util';
import Button from '../../button';
import Input from '../../input';
import Select from '../../select';
import Upload from '../../upload';
import Cascader from '../../cascader';
import Checkbox from '../../checkbox';
import DatePicker from '../../date-picker';
import InputNumber from '../../input-number';
import Radio from '../../radio';
import Switch from '../../switch';
import TreeSelect from '../../tree-select';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { fireEvent, pureRender, render, screen, waitFakeTimer } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';
import Drawer from '../../drawer';
import zhCN from '../../locale/zh_CN';
import Modal from '../../modal';
import type { NamePath } from '../interface';

const { RangePicker } = DatePicker;
const { TextArea } = Input;

jest.mock('scroll-into-view-if-needed');

describe('Form', () => {
  mountTest(Form);
  mountTest(Form.Item);

  rtlTest(Form);
  rtlTest(Form.Item);

  (scrollIntoView as any).mockImplementation(() => {});
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

  const changeValue = async (
    input: HTMLElement | null | number,
    value: string,
    advTimer = 1000,
  ) => {
    let element: HTMLElement;

    if (typeof input === 'number') {
      element = document.querySelectorAll('input')[input];
    }

    expect(element!).toBeTruthy();

    fireEvent.change(element!, {
      target: {
        value,
      },
    });

    if (advTimer) {
      await waitFakeTimer(advTimer / 20, 20);
    }
  };

  beforeEach(() => {
    document.body.innerHTML = '';
    jest.useFakeTimers();
    (scrollIntoView as any).mockReset();
  });

  afterEach(() => {
    errorSpy.mockReset();
  });

  afterAll(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    errorSpy.mockRestore();
    warnSpy.mockRestore();
    (scrollIntoView as any).mockRestore();
  });

  describe('noStyle Form.Item', () => {
    it('should show alert when form field is required but empty', async () => {
      const onChange = jest.fn();

      const { container } = render(
        <Form>
          <Form.Item>
            <Form.Item name="test" label="test" initialValue="bamboo" rules={[{ required: true }]}>
              <Input onChange={onChange} />
            </Form.Item>
          </Form.Item>
        </Form>,
      );

      // user type something and clear
      await changeValue(0, 'test');
      await changeValue(0, '');

      // should show alert with correct message and show correct styles
      expect(container.querySelector('.ant-form-item-explain-error')).toHaveTextContent(
        "'test' is required",
      );
      expect(container.querySelector('.ant-input-status-error')).toBeTruthy();
      expect(container.querySelector('.ant-form-item-has-error')).toBeTruthy();

      expect(onChange).toHaveBeenCalled();
    });

    it('should clean up', async () => {
      const Demo: React.FC = () => {
        const [form] = Form.useForm();

        const onChange = async () => {
          // Wait a while and then some logic to validate
          await waitFakeTimer();

          try {
            await form.validateFields();
          } catch (err) {
            // do nothing
          }
        };

        return (
          <Form form={form} initialValues={{ aaa: '2' }}>
            <Form.Item name="aaa">
              <Input onChange={onChange} />
            </Form.Item>
            <Form.Item shouldUpdate noStyle>
              {() => {
                const aaa = form.getFieldValue('aaa');

                if (aaa === '1') {
                  return (
                    <Form.Item name="bbb" rules={[{ required: true, message: 'aaa' }]}>
                      <Input />
                    </Form.Item>
                  );
                }

                return (
                  <Form.Item>
                    <Form.Item name="ccc" rules={[{ required: true, message: 'ccc' }]} noStyle>
                      <Input />
                    </Form.Item>
                  </Form.Item>
                );
              }}
            </Form.Item>
          </Form>
        );
      };

      const { container } = render(<Demo />);

      await changeValue(0, '1');
      await waitFakeTimer(2000, 2000);
      expect(container.querySelector('.ant-form-item-explain-error')).toHaveTextContent('aaa');

      await changeValue(0, '2');
      await waitFakeTimer(2000, 2000);
      expect(container.querySelector('.ant-form-item-explain-error')).toHaveTextContent('ccc');

      await changeValue(0, '1');
      await waitFakeTimer(2000, 2000);
      expect(container.querySelector('.ant-form-item-explain-error')).toHaveTextContent('aaa');
    });
  });

  it('render functions require either `shouldUpdate` or `dependencies`', () => {
    render(
      <Form>
        <Form.Item>{() => null}</Form.Item>
      </Form>,
    );
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Form.Item] A `Form.Item` with a render function must have either `shouldUpdate` or `dependencies`.',
    );
  });

  it("`shouldUpdate` shouldn't work with `dependencies`", () => {
    render(
      <Form>
        <Form.Item shouldUpdate dependencies={[]}>
          {() => null}
        </Form.Item>
      </Form>,
    );
    expect(errorSpy).toHaveBeenCalledWith(
      "Warning: [antd: Form.Item] `shouldUpdate` and `dependencies` shouldn't be used together. See https://u.ant.design/form-deps.",
    );
  });

  it('`name` should not work with render props', () => {
    render(
      <Form>
        <Form.Item name="test" shouldUpdate>
          {() => null}
        </Form.Item>
      </Form>,
    );
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Form.Item] A `Form.Item` with a render function cannot be a field, and thus cannot have a `name` prop.',
    );
  });

  it('multiple children with a name prop', () => {
    render(
      <Form>
        <Form.Item name="test">
          <div>one</div>
          <div>two</div>
        </Form.Item>
      </Form>,
    );
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Form.Item] A `Form.Item` with a `name` prop must have a single child element. For information on how to render more complex form items, see https://u.ant.design/complex-form-item.',
    );
  });

  it('input element should have the prop aria-describedby pointing to the help id when there is a help message', () => {
    const { container } = pureRender(
      <Form>
        <Form.Item name="test" help="This is a help">
          <input />
        </Form.Item>
      </Form>,
    );
    expect(container.querySelector('input')?.getAttribute('aria-describedby')).toBe('test_help');
    expect(container.querySelector('.ant-form-item-explain')?.id).toBe('test_help');
  });

  it('input element should not have the prop aria-describedby pointing to the help id when there is a help message and name is not defined', () => {
    const { container } = render(
      <Form>
        <Form.Item help="This is a help">
          <input />
        </Form.Item>
      </Form>,
    );
    expect(container.querySelector('input')?.getAttribute('aria-describedby')).toBeFalsy();
    expect(container.querySelector('.ant-form-item-explain')?.id).toBeFalsy();
  });

  it('input element should have the prop aria-describedby concatenated with the form name pointing to the help id when there is a help message', () => {
    const { container } = render(
      <Form name="form">
        <Form.Item name="test" help="This is a help">
          <input />
        </Form.Item>
      </Form>,
    );
    expect(container.querySelector('input')?.getAttribute('aria-describedby')).toBe(
      'form_test_help',
    );
    expect(container.querySelector('.ant-form-item-explain')?.id).toBe('form_test_help');
  });

  it('input element should have the prop aria-describedby pointing to the help id when there are errors', async () => {
    const { container } = pureRender(
      <Form>
        <Form.Item name="test" rules={[{ len: 3 }, { type: 'number' }]}>
          <input />
        </Form.Item>
      </Form>,
    );

    await changeValue(0, 'Invalid number');

    expect(container.querySelector('input')?.getAttribute('aria-describedby')).toBe('test_help');
    expect(container.querySelector('.ant-form-item-explain')?.id).toBe('test_help');
  });

  it('input element should have the prop aria-invalid when there are errors', async () => {
    const { container } = render(
      <Form>
        <Form.Item name="test" rules={[{ len: 3 }, { type: 'number' }]}>
          <input />
        </Form.Item>
      </Form>,
    );

    await changeValue(0, 'Invalid number');
    expect(container.querySelector('input')?.getAttribute('aria-invalid')).toBe('true');
  });

  it('input element should have the prop aria-required when the prop `required` is true', () => {
    const { container } = render(
      <Form>
        <Form.Item name="test" required>
          <input />
        </Form.Item>
      </Form>,
    );
    expect(container.querySelector('input')?.getAttribute('aria-required')).toBe('true');
  });

  it('input element should have the prop aria-required when there is a rule with required', () => {
    const { container } = render(
      <Form>
        <Form.Item name="test" rules={[{ required: true }]}>
          <input />
        </Form.Item>
      </Form>,
    );
    expect(container.querySelector('input')?.getAttribute('aria-required')).toBe('true');
  });

  it('input element should have the prop aria-describedby pointing to the extra id when there is a extra message', () => {
    const { container } = render(
      <Form>
        <Form.Item name="test" extra="This is a extra message">
          <input />
        </Form.Item>
      </Form>,
    );
    expect(container.querySelector('input')?.getAttribute('aria-describedby')).toBe('test_extra');
    expect(container.querySelector('.ant-form-item-extra')?.id).toBe('test_extra');
  });

  it('input element should not have the prop aria-describedby pointing to the extra id when there is a extra message and name is not defined', () => {
    const { container } = render(
      <Form>
        <Form.Item extra="This is a extra message">
          <input />
        </Form.Item>
      </Form>,
    );
    expect(container.querySelector('input')?.getAttribute('aria-describedby')).toBeFalsy();
    expect(container.querySelector('.ant-form-item-extra')?.id).toBeFalsy();
  });

  it('input element should have the prop aria-describedby pointing to the help and extra id when there is a help and extra message', () => {
    const { container } = render(
      <Form>
        <Form.Item name="test" help="This is a help" extra="This is a extra message">
          <input />
        </Form.Item>
      </Form>,
    );
    expect(container.querySelector('input')?.getAttribute('aria-describedby')).toBe(
      'test_help test_extra',
    );
  });

  describe('scrollToField', () => {
    const test = (name: string, genForm: () => any) => {
      it(name, () => {
        let callGetForm: any;

        const Demo: React.FC = () => {
          const { props, getForm } = genForm();
          callGetForm = getForm;

          return (
            <Form name="scroll" {...props}>
              <Form.Item name="test">
                <Input />
              </Form.Item>
            </Form>
          );
        };

        render(<Demo />);

        expect(scrollIntoView).not.toHaveBeenCalled();
        const form = callGetForm();
        form.scrollToField('test', {
          block: 'start',
        });

        const inputNode = document.getElementById('scroll_test');
        expect(scrollIntoView).toHaveBeenCalledWith(inputNode, {
          block: 'start',
          scrollMode: 'if-needed',
        });
      });
    };

    // hooks
    test('useForm', () => {
      const [form] = Form.useForm();
      return {
        props: { form },
        getForm: () => form,
      };
    });

    // ref
    test('ref', () => {
      let form: any;
      return {
        props: {
          ref: (instance: any) => {
            form = instance;
          },
        },
        getForm: () => form,
      };
    });
  });

  it('scrollToFirstError', async () => {
    const onFinishFailed = jest.fn();

    const { container } = render(
      <Form scrollToFirstError={{ block: 'center' }} onFinishFailed={onFinishFailed}>
        <Form.Item name="test" rules={[{ required: true }]}>
          <input />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>,
    );

    expect(scrollIntoView).not.toHaveBeenCalled();
    fireEvent.submit(container.querySelector('form')!);
    await waitFakeTimer();

    const inputNode = document.getElementById('test');
    expect(scrollIntoView).toHaveBeenCalledWith(inputNode, {
      block: 'center',
      scrollMode: 'if-needed',
    });
    expect(onFinishFailed).toHaveBeenCalled();
  });

  it('Form.Item should support data-*、aria-* and custom attribute', () => {
    const { container } = render(
      <Form>
        {/* @ts-ignore */}
        <Form.Item data-text="123" aria-hidden="true" cccc="bbbb">
          text
        </Form.Item>
      </Form>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('warning when use `name` but children is not validate element', () => {
    render(
      <Form>
        <Form.Item name="warning">text</Form.Item>
      </Form>,
    );
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Form.Item] `name` is only used for validate React element. If you are using Form.Item as layout display, please remove `name` instead.',
    );
  });

  it('dynamic change required', async () => {
    const { container } = render(
      <Form>
        <Form.Item label="light" name="light" valuePropName="checked">
          <input type="checkbox" />
        </Form.Item>
        <Form.Item
          label="bamboo"
          name="bamboo"
          dependencies={['light']}
          rules={[({ getFieldValue }) => ({ required: getFieldValue('light') })]}
        >
          <input />
        </Form.Item>
      </Form>,
    );

    // should not show alert by default
    expect(container.querySelector('.ant-form-item-explain')).toBeFalsy();

    // click to change the light field value to true
    fireEvent.click(container.querySelector('input')!);
    await waitFakeTimer();

    // user input something and clear
    await changeValue(1, '1');
    await changeValue(1, '');

    // should show alert says that the field is required
    expect(container.querySelector('.ant-form-item-explain-error')).toHaveTextContent(
      "'bamboo' is required",
    );
  });

  describe('should show related className when customize help', () => {
    it('normal', async () => {
      const { container } = render(
        <Form>
          <Form.Item help="good">
            <input />
          </Form.Item>
        </Form>,
      );

      await waitFakeTimer();

      expect(container.querySelector('.ant-form-item-explain')).toHaveTextContent('good');
      expect(container.querySelector('.ant-form-item-with-help')).toBeTruthy();
    });

    it('empty string', async () => {
      const { container } = render(
        <Form>
          <Form.Item help="">
            <input />
          </Form.Item>
        </Form>,
      );

      await waitFakeTimer();

      expect(container.querySelector('.ant-form-item-explain')).toHaveTextContent('');
      expect(container.querySelector('.ant-form-item-with-help')).toBeTruthy();
    });
  });

  it('warning when use v3 function', () => {
    Form.create();
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Form] antd v4 removed `Form.create`. Please remove or use `@ant-design/compatible` instead.',
    );
  });

  // https://github.com/ant-design/ant-design/issues/20706
  it('Error change should work', async () => {
    const { container } = render(
      <Form>
        <Form.Item
          name="name"
          label="test"
          rules={[
            { required: true },
            {
              validator: (_, value) => {
                if (value === 'p') {
                  return Promise.reject(new Error('not a p'));
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>,
    );

    /* eslint-disable no-await-in-loop */
    for (let i = 0; i < 3; i += 1) {
      await changeValue(0, 'bamboo');
      await changeValue(0, '');
      expect(container.querySelector('.ant-form-item-explain')?.textContent).toEqual(
        "'name' is required",
      );

      await changeValue(0, 'p');
      expect(container.querySelector('.ant-form-item-explain')?.textContent).toEqual('not a p');
    }
    /* eslint-enable */
  });

  // https://github.com/ant-design/ant-design/issues/20813
  it('should update help directly when provided', async () => {
    const App: React.FC = () => {
      const [message, updateMessage] = React.useState('');
      return (
        <Form>
          <Form.Item label="hello" help={message}>
            <Input />
          </Form.Item>
          <Button onClick={() => updateMessage('bamboo')} />
        </Form>
      );
    };

    const { container } = render(<App />);

    // should show initial text
    await waitFakeTimer();
    expect(container.querySelector('.ant-form-item-explain')).toHaveTextContent('');

    fireEvent.click(container.querySelector('button')!);

    // should show bamboo alert without opacity and hide first alert with opacity: 0
    await waitFakeTimer();
    expect(container.querySelector('.ant-form-item-explain')).toHaveTextContent('bamboo');
  });

  it('warning when use `dependencies` but `name` is empty & children is not a render props', () => {
    render(
      <Form>
        <Form.Item dependencies={[]}>text</Form.Item>
      </Form>,
    );
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Form.Item] Must set `name` or use a render function when `dependencies` is set.',
    );
  });

  // https://github.com/ant-design/ant-design/issues/20948
  it('not repeat render when Form.Item is not a real Field', async () => {
    const shouldNotRender = jest.fn();
    const StaticInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
      id,
      value = '',
    }) => {
      shouldNotRender();
      return <input id={id} value={value} />;
    };

    const shouldRender = jest.fn();
    const DynamicInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
      value = '',
      id,
    }) => {
      shouldRender(value);
      return <input id={id} value={value} />;
    };

    const Demo = () => {
      const [form] = Form.useForm();

      return (
        <Form form={form}>
          <Form.Item>
            <StaticInput />
          </Form.Item>
          <Form.Item name="light">
            <DynamicInput id="changed" />
          </Form.Item>
          <Button id="fill-btn" onClick={() => form.setFieldValue('light', 'bamboo')}>
            fill
          </Button>
        </Form>
      );
    };

    const { container } = pureRender(<Demo />);

    await waitFakeTimer();

    expect(container.querySelector<HTMLInputElement>('#changed')!.value).toEqual('');
    expect(shouldNotRender).toHaveBeenCalledTimes(1);
    expect(shouldRender).toHaveBeenCalledTimes(1);

    fireEvent.click(container.querySelector('#fill-btn')!);
    await waitFakeTimer();

    expect(shouldNotRender).toHaveBeenCalledTimes(1);
    expect(shouldRender).toHaveBeenLastCalledWith('bamboo');
    expect(shouldRender).toHaveBeenCalledTimes(2);
  });

  it('empty help should also render', () => {
    const { container } = render(
      <Form.Item help="">
        <input />
      </Form.Item>,
    );
    expect(container.querySelectorAll('.ant-form-item-explain').length).toBeTruthy();
  });

  it('Form.Item with `help` should display error style when validate failed', async () => {
    const { container } = render(
      <Form>
        <Form.Item
          name="test"
          label="test"
          help="help"
          initialValue="bamboo"
          rules={[{ required: true, message: 'message' }]}
        >
          <Input />
        </Form.Item>
      </Form>,
    );

    await changeValue(0, '');
    expect(container.querySelector('.ant-form-item')).toHaveClass('ant-form-item-has-error');
    expect(container.querySelector('.ant-form-item-explain')!.textContent).toEqual('help');
  });

  it('clear validation message when', async () => {
    const { container } = render(
      <Form>
        <Form.Item name="test" label="test" rules={[{ required: true, message: 'message' }]}>
          <Input />
        </Form.Item>
      </Form>,
    );

    await changeValue(0, '1');
    expect(container.querySelectorAll('.ant-form-item-explain').length).toBeFalsy();

    await changeValue(0, '');
    expect(container.querySelectorAll('.ant-form-item-explain').length).toBeTruthy();

    await changeValue(0, '123');
    expect(container.querySelectorAll('.ant-form-item-explain').length).toBeFalsy();
  });

  // https://github.com/ant-design/ant-design/issues/21167
  it('`require` without `name`', () => {
    const { container } = render(
      <Form.Item label="test" name="test" required>
        <input />
      </Form.Item>,
    );

    // expect(screen.getByTitle('test')).toHaveClass('ant-form-item-required');
    expect(container.querySelector('.ant-form-item-required')).toBeTruthy();
  });

  it('0 is a validate Field', () => {
    render(
      <Form.Item name={0} label="0">
        <input />
      </Form.Item>,
    );

    // if getByLabelText can get element, then it is a validate field with form control and label
    expect(screen.getByLabelText('0')).toBeInTheDocument();
  });

  it('`null` triggers warning and is treated as `undefined`', () => {
    render(
      <Form.Item name={null as unknown as NamePath} label="test">
        <input />
      </Form.Item>,
    );

    // if getByLabelText can get element, then it is a validate field with form control and label
    expect(screen.queryByLabelText('test')).not.toBeInTheDocument();
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Form.Item] `null` is passed as `name` property',
    );
  });

  // https://github.com/ant-design/ant-design/issues/21415
  it('should not throw error when Component.props.onChange is null', async () => {
    const CustomComponent: React.FC = () => (
      <input onChange={null as unknown as ChangeEventHandler<HTMLInputElement>} />
    );
    render(
      <Form>
        <Form.Item name="custom">
          <CustomComponent />
        </Form.Item>
      </Form>,
    );

    await changeValue(0, 'aaa');
  });

  it('change `help` should not warning', async () => {
    const Demo: React.FC = () => {
      const [error, setError] = React.useState(false);
      return (
        <Form>
          <Form.Item
            help={error ? 'This is an error msg' : undefined}
            validateStatus={error ? 'error' : ''}
            label="Username"
            name="username"
          >
            <input />
          </Form.Item>

          <Form.Item>
            <button type="button" onClick={() => setError(!error)}>
              Trigger
            </button>
          </Form.Item>
        </Form>
      );
    };

    const { container } = render(<Demo />);
    fireEvent.click(container.querySelector('button')!);

    expect(errorSpy).not.toHaveBeenCalled();
  });

  it('`label` support template', async () => {
    const { container } = render(
      // eslint-disable-next-line no-template-curly-in-string
      <Form validateMessages={{ required: '${label} is good!' }}>
        <Form.Item name="test" label="Bamboo" rules={[{ required: true }]}>
          <input />
        </Form.Item>
      </Form>,
    );

    fireEvent.submit(container.querySelector('form')!);
    await waitFakeTimer();

    expect(container.querySelector('.ant-form-item-explain-error')).toHaveTextContent(
      'Bamboo is good!',
    );
  });

  // https://github.com/ant-design/ant-design/issues/33691
  it('should keep upper locale in nested ConfigProvider', async () => {
    const { container } = render(
      <ConfigProvider locale={zhCN}>
        <ConfigProvider>
          <Form>
            <Form.Item name="test" label="Bamboo" rules={[{ required: true }]}>
              <input />
            </Form.Item>
          </Form>
        </ConfigProvider>
      </ConfigProvider>,
    );

    fireEvent.submit(container.querySelector('form')!);
    await waitFakeTimer();

    expect(container.querySelector('.ant-form-item-explain-error')).toHaveTextContent(
      '请输入Bamboo',
    );
  });

  it('`name` support template when label is not provided', async () => {
    const { container } = render(
      // eslint-disable-next-line no-template-curly-in-string
      <Form validateMessages={{ required: '${label} is good!' }}>
        <Form.Item name="Bamboo" rules={[{ required: true }]}>
          <input />
        </Form.Item>
      </Form>,
    );

    fireEvent.submit(container.querySelector('form')!);
    await waitFakeTimer();

    expect(container.querySelector('.ant-form-item-explain-error')).toHaveTextContent(
      'Bamboo is good!',
    );
  });

  it('`messageVariables` support validate', async () => {
    const { container } = render(
      // eslint-disable-next-line no-template-curly-in-string
      <Form validateMessages={{ required: '${label} is good!' }}>
        <Form.Item name="test" messageVariables={{ label: 'Bamboo' }} rules={[{ required: true }]}>
          <input />
        </Form.Item>
      </Form>,
    );

    fireEvent.submit(container.querySelector('form')!);
    await waitFakeTimer();

    expect(container.querySelector('.ant-form-item-explain-error')).toHaveTextContent(
      'Bamboo is good!',
    );
  });

  it('validation message should has alert role', async () => {
    // https://github.com/ant-design/ant-design/issues/25711
    const { container } = render(
      // eslint-disable-next-line no-template-curly-in-string
      <Form validateMessages={{ required: 'name is good!' }}>
        <Form.Item name="test" rules={[{ required: true }]}>
          <input />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>,
    );

    fireEvent.submit(container.querySelector('form')!);
    await waitFakeTimer();

    expect(container.querySelector('.ant-form-item-explain-error')).toHaveTextContent(
      'name is good!',
    );
  });

  it('return same form instance', async () => {
    const instances = new Set();

    const App: React.FC = () => {
      const [form] = Form.useForm();
      instances.add(form);
      const [, forceUpdate] = React.useState({});
      return (
        <button
          type="button"
          onClick={() => {
            forceUpdate({});
          }}
        >
          Refresh
        </button>
      );
    };

    const { container } = pureRender(<App />);

    for (let i = 0; i < 5; i += 1) {
      fireEvent.click(container.querySelector('button')!);
      // eslint-disable-next-line no-await-in-loop
      await waitFakeTimer();
    }

    expect(instances.size).toBe(1);
  });

  it('should avoid re-render', async () => {
    let renderTimes = 0;

    const MyInput: React.FC<{ value?: string }> = ({ value = '', ...props }) => {
      renderTimes += 1;
      return <input value={value} {...props} />;
    };

    const Demo: React.FC = () => (
      <Form>
        <Form.Item name="username" label="username" rules={[{ required: true }]}>
          <MyInput />
        </Form.Item>
      </Form>
    );
    const { container } = pureRender(<Demo />);
    renderTimes = 0;

    await changeValue(0, 'a');

    expect(renderTimes).toEqual(1);
    expect(container.querySelector('input')).toHaveValue('a');
  });

  it('should warning with `defaultValue`', () => {
    render(
      <Form>
        <Form.Item name="light">
          <input defaultValue="should warning" />
        </Form.Item>
      </Form>,
    );

    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Form.Item] `defaultValue` will not work on controlled Field. You should use `initialValues` of Form instead.',
    );
  });

  it('should remove Field and also reset error', async () => {
    const Demo: React.FC<{ showA?: boolean }> = ({ showA }) => (
      <Form>
        {showA ? (
          <Form.Item name="a" help="error">
            <input />
          </Form.Item>
        ) : (
          <Form.Item name="b">
            <input />
          </Form.Item>
        )}
      </Form>
    );

    const { container, rerender } = render(<Demo showA />);

    await waitFakeTimer();
    expect(container.querySelector('.ant-form-item-explain')).toBeTruthy();

    rerender(<Demo showA={false} />);

    await waitFakeTimer();
    expect(container.querySelector('.ant-form-item-explain')).toBeFalsy();
  });

  it('no warning of initialValue & getValueProps & preserve', () => {
    render(
      <Form>
        <Form.Item initialValue="bamboo" getValueProps={() => ({})} preserve={false}>
          <Input />
        </Form.Item>
      </Form>,
    );
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it('should customize id when pass with id', () => {
    const { container } = render(
      <Form>
        <Form.Item name="light">
          <Input id="bamboo" />
        </Form.Item>
      </Form>,
    );

    expect(container.querySelector('input')!.id).toEqual('bamboo');
  });

  it('should trigger validate when onBlur when pass validateTrigger onBlur', async () => {
    const { container } = render(
      <Form validateTrigger="onBlur">
        <Form.Item name="light" label="light" rules={[{ len: 3 }]}>
          <Input />
        </Form.Item>
      </Form>,
    );

    // type a invalidate value, not trigger validation
    await changeValue(0, '7777');
    expect(container.querySelector('.ant-form-item-explain')).toBeFalsy();

    // tab(onBlur) the input field, trigger and see the alert
    fireEvent.blur(container.querySelector('input')!);
    await waitFakeTimer();

    expect(container.querySelector('.ant-form-item-explain')).toBeTruthy();
  });

  describe('Form item hidden', () => {
    it('should work', () => {
      const { container } = render(
        <Form>
          <Form.Item name="light" hidden>
            <Input />
          </Form.Item>
        </Form>,
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('noStyle should not work when hidden', () => {
      const { container } = render(
        <Form>
          <Form.Item name="light" hidden noStyle>
            <Input />
          </Form.Item>
        </Form>,
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  it('legacy hideRequiredMark', () => {
    const { container } = render(
      <Form hideRequiredMark role="form">
        <Form.Item name="light" label="light" required>
          <Input />
        </Form.Item>
      </Form>,
    );

    expect(container.querySelector('form')!).toHaveClass('ant-form-hide-required-mark');
  });

  it('form should support disabled', () => {
    const App: React.FC = () => (
      <Form labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} layout="horizontal" disabled>
        <Form.Item label="Form disabled" name="disabled" valuePropName="checked">
          <Checkbox>disabled</Checkbox>
        </Form.Item>
        <Form.Item label="Radio">
          <Radio.Group>
            <Radio value="apple">Apple</Radio>
            <Radio value="pear">Pear</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Input">
          <Input />
        </Form.Item>
        <Form.Item label="Select">
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="TreeSelect">
          <TreeSelect
            treeData={[
              {
                title: 'Light',
                value: 'light',
                children: [{ title: 'Bamboo', value: 'bamboo' }],
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="Cascader">
          <Cascader
            options={[
              {
                value: 'zhejiang',
                label: 'Zhejiang',
                children: [{ value: 'hangzhou', label: 'Hangzhou' }],
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="DatePicker">
          <DatePicker />
        </Form.Item>
        <Form.Item label="RangePicker">
          <RangePicker />
        </Form.Item>
        <Form.Item label="InputNumber">
          <InputNumber />
        </Form.Item>
        <Form.Item label="TextArea">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Switch" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item label="Upload" valuePropName="fileList">
          <Upload />
        </Form.Item>
        <Form.Item label="Button">
          <Button>Button</Button>
        </Form.Item>
      </Form>
    );
    const { container } = render(<App />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('_internalItemRender api test', () => {
    const { container } = render(
      <Form>
        <Form.Item
          name="light"
          // @ts-ignore
          _internalItemRender={{
            mark: 'pro_table_render',
            render: (_: any, doms: any) => (
              <div>
                <h1>warning title</h1>
                {doms.input}
                {doms.errorList}
                {doms.extra}
              </div>
            ),
          }}
        >
          <input defaultValue="should warning" />
        </Form.Item>
      </Form>,
    );

    expect(container.querySelector('h1')!).toHaveTextContent(/warning title/i);
  });

  it('Form Item element id will auto add form_item prefix if form name is empty and item name is in the black list', async () => {
    const mockFn = jest.spyOn(Util, 'getFieldId');
    const itemName = 'parentNode';
    // mock getFieldId old logic,if form name is empty ,and item name is parentNode,will get parentNode
    mockFn.mockImplementation(() => itemName);
    const { Option } = Select;
    const Demo: React.FC = () => {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Form>
            <Form.Item name={itemName} label={itemName}>
              <Select
                className="form_item_parentNode"
                defaultValue="lucy"
                open={open}
                style={{ width: 120 }}
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </Form.Item>
          </Form>
          <button
            type="button"
            onClick={() => {
              setOpen(true);
            }}
          >
            {open ? 'show' : 'hidden'}
          </button>
        </>
      );
    };

    const { container, rerender } = render(<Demo />);
    expect(mockFn).toHaveBeenCalled();
    expect((Util.getFieldId as () => string)()).toBe(itemName);

    // make sure input id is parentNode
    expect(screen.getByLabelText(itemName)).toHaveAccessibleName(itemName);

    fireEvent.click(container.querySelector('button')!);
    await waitFakeTimer();

    expect(container.querySelector('button')!).toHaveTextContent('show');

    mockFn.mockRestore();

    rerender(<Demo />);
    expect(screen.getByLabelText(itemName)).toBeInTheDocument();
  });

  describe('tooltip', () => {
    it('ReactNode', async () => {
      const { container } = render(
        <Form>
          <Form.Item label="light" tooltip={<span>Bamboo</span>}>
            <Input />
          </Form.Item>
        </Form>,
      );

      fireEvent.mouseEnter(container.querySelector('.anticon-question-circle')!);
      await waitFakeTimer();

      expect(container.querySelector('.ant-tooltip-inner')).toHaveTextContent('Bamboo');
    });

    it('config tooltip should show when hover on icon', async () => {
      const { container } = render(
        <Form>
          <Form.Item label="light" tooltip={{ title: 'Bamboo' }}>
            <Input />
          </Form.Item>
        </Form>,
      );

      fireEvent.mouseEnter(container.querySelector('.anticon-question-circle')!);
      await waitFakeTimer();

      expect(container.querySelector('.ant-tooltip-inner')).toHaveTextContent('Bamboo');
    });
  });

  it('warningOnly validate', async () => {
    const { container } = render(
      <Form>
        <Form.Item>
          <Form.Item
            name="test"
            label="test"
            initialValue="bamboo"
            rules={[{ required: true, warningOnly: true }]}
          >
            <Input />
          </Form.Item>
        </Form.Item>
      </Form>,
    );

    await changeValue(0, 'test');
    await changeValue(0, '');

    expect(container.querySelector('.ant-form-item-with-help')).toBeTruthy();
    expect(container.querySelector('.ant-form-item-has-warning')).toBeTruthy();
  });

  it('not warning when remove on validate', async () => {
    let rejectFn: (reason?: any) => void = jest.fn();

    const { unmount } = render(
      <Form>
        <Form.Item>
          <Form.Item
            noStyle
            name="test"
            initialValue="bamboo"
            rules={[
              {
                validator: () =>
                  new Promise((_, reject) => {
                    rejectFn = reject;
                  }),
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form.Item>
      </Form>,
    );

    await changeValue(0, '');

    unmount();

    // Delay validate failed
    rejectFn(new Error('delay failed'));

    expect(errorSpy).not.toHaveBeenCalled();
  });

  describe('form colon', () => {
    it('default colon', () => {
      render(
        <Form>
          <Form.Item label="姓名" name="姓名">
            <input />
          </Form.Item>
        </Form>,
      );

      expect(screen.getByText('姓名')).not.toHaveClass('ant-form-item-no-colon');
    });

    it('set Form.Item colon false', () => {
      render(
        <Form colon>
          <Form.Item colon={false} label="姓名" name="姓名">
            <Input />
          </Form.Item>
        </Form>,
      );

      expect(screen.getByText('姓名')).toHaveClass('ant-form-item-no-colon');
    });

    it('set Form colon false', () => {
      render(
        <Form colon={false}>
          <Form.Item label="姓名" name="姓名">
            <Input />
          </Form.Item>
        </Form>,
      );

      expect(screen.getByText('姓名')).toHaveClass('ant-form-item-no-colon');
    });
  });

  it('useFormInstance', () => {
    let formInstance;
    let subFormInstance;

    const Sub = () => {
      const formSub = Form.useFormInstance();
      subFormInstance = formSub;

      return null;
    };

    const Demo: React.FC = () => {
      const [form] = Form.useForm();
      formInstance = form;

      return (
        <Form form={form}>
          <Sub />
        </Form>
      );
    };

    render(<Demo />);
    expect(subFormInstance).toBe(formInstance);
  });

  it('noStyle should not affect status', () => {
    const Demo: React.FC = () => (
      <Form>
        <Form.Item validateStatus="error" noStyle>
          <Select className="custom-select" />
        </Form.Item>
        <Form.Item validateStatus="error">
          <Form.Item noStyle>
            <Select className="custom-select-b" />
          </Form.Item>
        </Form.Item>
        <Form.Item validateStatus="error">
          <Form.Item noStyle validateStatus="warning">
            <Select className="custom-select-c" />
          </Form.Item>
        </Form.Item>
        <Form.Item noStyle>
          <Form.Item validateStatus="warning">
            <Select className="custom-select-d" />
          </Form.Item>
        </Form.Item>
      </Form>
    );
    const { container } = render(<Demo />);
    expect(container.querySelector('.custom-select')?.className).not.toContain('status-error');
    expect(container.querySelector('.custom-select')?.className).not.toContain('in-form-item');
    expect(container.querySelector('.custom-select-b')?.className).toContain('status-error');
    expect(container.querySelector('.custom-select-b')?.className).toContain('in-form-item');
    expect(container.querySelector('.custom-select-c')?.className).toContain('status-error');
    expect(container.querySelector('.custom-select-c')?.className).toContain('in-form-item');
    expect(container.querySelector('.custom-select-d')?.className).toContain('status-warning');
    expect(container.querySelector('.custom-select-d')?.className).toContain('in-form-item');
  });

  it('should not affect Popup children style', () => {
    const Demo: React.FC = () => (
      <Form>
        <Form.Item labelCol={4 as ColProps} validateStatus="error">
          <Modal open>
            <Select className="modal-select" />
          </Modal>
        </Form.Item>
        <Form.Item validateStatus="error">
          <Drawer open>
            <Select className="drawer-select" />
          </Drawer>
        </Form.Item>
      </Form>
    );
    const { container } = render(<Demo />, { container: document.body });
    expect(container.querySelector('.modal-select')?.className).not.toContain('in-form-item');
    expect(container.querySelector('.modal-select')?.className).not.toContain('status-error');
    expect(container.querySelector('.drawer-select')?.className).not.toContain('in-form-item');
    expect(container.querySelector('.drawer-select')?.className).not.toContain('status-error');
  });

  it('Form.Item.useStatus should work', async () => {
    const {
      Item: { useStatus },
    } = Form;

    const CustomInput: React.FC<{ className?: string; value?: React.ReactNode }> = ({
      className,
      value,
    }) => {
      const { status } = useStatus();
      return <div className={classNames(className, `custom-input-status-${status}`)}>{value}</div>;
    };

    const Demo: React.FC = () => {
      const [form] = Form.useForm();

      return (
        <Form form={form} name="my-form">
          <Form.Item name="required" rules={[{ required: true }]}>
            <CustomInput className="custom-input-required" value="" />
          </Form.Item>
          <Form.Item name="warning" validateStatus="warning">
            <CustomInput className="custom-input-warning" />
          </Form.Item>
          <Form.Item name="normal">
            <CustomInput className="custom-input" />
          </Form.Item>
          <CustomInput className="custom-input-wrong" />
          <Button onClick={() => form.submit()} className="submit-button">
            Submit
          </Button>
        </Form>
      );
    };

    const { container } = render(<Demo />);

    expect(container.querySelector('.custom-input-required')?.className).toContain(
      'custom-input-status-',
    );
    expect(container.querySelector('.custom-input-warning')?.classList).toContain(
      'custom-input-status-warning',
    );
    expect(container.querySelector('.custom-input')?.className).toContain('custom-input-status-');
    expect(container.querySelector('.custom-input-wrong')?.classList).toContain(
      'custom-input-status-undefined',
    );
    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining('Form.Item.useStatus should be used under Form.Item component.'),
    );

    fireEvent.click(container.querySelector('.submit-button')!);
    await waitFakeTimer();

    expect(container.querySelector('.custom-input-required')?.classList).toContain(
      'custom-input-status-error',
    );
  });

  it('item customize margin', async () => {
    const computeSpy = jest
      .spyOn(window, 'getComputedStyle')
      .mockImplementation(() => ({ marginBottom: 24 }) as unknown as CSSStyleDeclaration);

    const { container } = render(
      <Form>
        <Form.Item name="required" initialValue="bamboo" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>,
    );

    await changeValue(0, '');

    computeSpy.mockRestore();

    expect(container.querySelector('.ant-form-item-margin-offset')).toHaveStyle({
      marginBottom: -24,
    });
  });
  it('form child components should be given priority to own disabled props when it in a disabled form', () => {
    const props = {
      name: 'file',
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      headers: {
        authorization: 'authorization-text',
      },
      capture: true,
    };
    const renderComps = (disabled?: boolean) => [
      <Button key="Button" disabled={disabled} type="primary" htmlType="submit">
        test
      </Button>,
      <Cascader key="Cascader" disabled={disabled} options={[]} />,
      <Checkbox key="Checkbox" disabled={disabled} />,
      <Checkbox.Group
        key="CheckboxGroup"
        disabled={disabled}
        options={[
          { label: 'male', value: 0 },
          { label: 'female', value: 1 },
        ]}
      />,
      <InputNumber key="InputNumber" disabled={disabled} />,
      <Input key="Input" disabled={disabled} />,
      <Select key="Select" disabled={disabled} />,
      <Switch key="Switch" disabled={disabled} />,
      <TreeSelect key="TreeSelect" disabled={disabled} />,
      <Upload key="Upload" {...props} disabled={disabled}>
        <Button disabled={disabled}>Click to Upload</Button>
      </Upload>,
      <DatePicker key="DatePicker" disabled={disabled} />,
      <DatePicker.RangePicker key="DatePicker.RangePicker" disabled={disabled} />,
      <DatePicker.MonthPicker key="DatePicker.MonthPicker" disabled={disabled} />,
      <DatePicker.QuarterPicker key="DatePicker.QuarterPicker" disabled={disabled} />,
      <DatePicker.WeekPicker key="DatePicker.WeekPicker" disabled={disabled} />,
      <DatePicker.YearPicker key="DatePicker.YearPicker" disabled={disabled} />,
      <DatePicker.TimePicker key="DatePicker.TimePicker" disabled={disabled} />,
    ];
    const App = () => <Form disabled>{renderComps(false)}</Form>;

    const wrapper = render(<App />);
    expect(wrapper.container.querySelectorAll('[disabled]').length).toBe(0);
    const App2 = () => <Form disabled>{renderComps()}</Form>;

    const wrapper2 = render(<App2 />);
    // 时间范围组件中会有两个 input 框，因此虽然上述只有 18 个组件，但，实际有 19 个 带有 disabled 属性的表单组件
    expect(wrapper2.container.querySelectorAll('[disabled]').length).toBe(19);

    const App3 = () => <Form disabled>{renderComps(true)}</Form>;

    const wrapper3 = render(<App3 />);

    expect(wrapper3.container.querySelectorAll('[disabled]').length).toBe(19);

    const App4 = () => <Form>{renderComps(true)}</Form>;

    const wrapper4 = render(<App4 />);

    expect(wrapper4.container.querySelectorAll('[disabled]').length).toBe(19);

    const App5 = () => <Form>{renderComps()}</Form>;

    const wrapper5 = render(<App5 />);

    expect(wrapper5.container.querySelectorAll('[disabled]').length).toBe(0);
  });

  it('success feedback should display when pass hasFeedback prop and current value is valid value', async () => {
    const App = ({ trigger = false }: { trigger?: boolean }) => {
      const form = useRef<FormInstance<any>>(null);

      useEffect(() => {
        if (!trigger) return;
        form.current?.validateFields();
      }, [trigger]);

      return (
        <Form ref={form}>
          <Form.Item
            label="Success"
            name="name1"
            hasFeedback
            initialValue="test@qq.com"
            rules={[
              {
                type: 'email',
                message: 'Please input your e-mail',
              },
              {
                required: true,
                message: 'Please input your value',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Success"
            name="name2"
            initialValue="test@qq.com"
            rules={[
              {
                type: 'email',
                message: 'Please input your e-mail',
              },
              {
                required: true,
                message: 'Please input your value',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      );
    };
    const { container, rerender } = render(<App />);

    expect(container.querySelectorAll('.ant-form-item-has-feedback').length).toBe(0);
    expect(container.querySelectorAll('.ant-form-item-has-success').length).toBe(0);

    rerender(<App trigger />);
    await waitFakeTimer();

    expect(container.querySelectorAll('.ant-form-item-has-feedback').length).toBe(1);
    expect(container.querySelectorAll('.ant-form-item-has-success').length).toBe(1);
  });
});
