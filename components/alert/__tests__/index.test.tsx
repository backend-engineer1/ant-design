import React from 'react';
import userEvent from '@testing-library/user-event';
import Alert from '..';
import accessibilityTest from '../../../tests/shared/accessibilityTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { render, act, screen } from '../../../tests/utils';
import Button from '../../button';
import Popconfirm from '../../popconfirm';
import Tooltip from '../../tooltip';

const { ErrorBoundary } = Alert;

describe('Alert', () => {
  rtlTest(Alert);
  accessibilityTest(Alert);

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should show close button and could be closed', async () => {
    const onClose = jest.fn();
    render(
      <Alert
        message="Warning Text Warning Text Warning TextW arning Text Warning Text Warning TextWarning Text"
        type="warning"
        closable
        onClose={onClose}
      />,
    );

    await userEvent.click(screen.getByRole('button', { name: /close/i }));

    act(() => {
      jest.runAllTimers();
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('custom action', () => {
    const { container } = render(
      <Alert
        message="Success Tips"
        type="success"
        showIcon
        action={
          <Button size="small" type="text">
            UNDO
          </Button>
        }
        closable
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should sets data attributes on alert when pass attributes to props', () => {
    render(
      <Alert data-test="test-id" data-id="12345" aria-describedby="some-label" message={null} />,
    );
    const alert = screen.getByRole('alert');
    expect(alert).toHaveAttribute('data-test', 'test-id');
    expect(alert).toHaveAttribute('data-id', '12345');
    expect(alert).toHaveAttribute('aria-describedby', 'some-label');
  });

  it('sets role attribute on input', () => {
    render(<Alert role="status" message={null} />);

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('should show error as ErrorBoundary when children have error', () => {
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
    // eslint-disable-next-line no-console
    expect(console.error).toHaveBeenCalledTimes(0);
    // @ts-expect-error
    // eslint-disable-next-line react/jsx-no-undef
    const ThrowError = () => <NotExisted />;
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>,
    );

    expect(screen.getByRole('alert')).toHaveTextContent(
      'ReferenceError: NotExisted is not defined',
    );
    // eslint-disable-next-line no-console
    (console.error as any).mockRestore();
  });

  it('could be used with Tooltip', async () => {
    render(
      <Tooltip title="xxx" mouseEnterDelay={0}>
        <Alert
          message="Warning Text Warning Text Warning TextW arning Text Warning Text Warning TextWarning Text"
          type="warning"
        />
      </Tooltip>,
    );

    await userEvent.hover(screen.getByRole('alert'));

    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });

  it('could be used with Popconfirm', async () => {
    render(
      <Popconfirm title="xxx">
        <Alert
          message="Warning Text Warning Text Warning TextW arning Text Warning Text Warning TextWarning Text"
          type="warning"
        />
      </Popconfirm>,
    );
    await userEvent.click(screen.getByRole('alert'));

    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });

  it('could accept none react element icon', () => {
    render(<Alert message="Success Tips" type="success" showIcon icon="icon" />);

    expect(screen.getByRole('alert')).toHaveTextContent(/success tips/i);
    expect(screen.getByRole('alert')).toHaveTextContent(/icon/i);
  });

  it('should not render message div when no message', () => {
    const { container } = render(<Alert description="description" />);
    expect(!!container.querySelector('.ant-alert-message')).toBe(false);
  });
});
