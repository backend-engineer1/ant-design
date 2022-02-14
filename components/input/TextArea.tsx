import classNames from 'classnames';
import RcTextArea, { TextAreaProps as RcTextAreaProps } from 'rc-textarea';
import ResizableTextArea from 'rc-textarea/lib/ResizableTextArea';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import omit from 'rc-util/lib/omit';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import SizeContext, { SizeType } from '../config-provider/SizeContext';
import { FormItemStatusContext } from '../form/context';
import { getFeedbackIcon, getStatusClassNames, InputStatus } from '../_util/statusUtils';
import ClearableLabeledInput from './ClearableLabeledInput';
import { fixControlledValue, InputFocusOptions, resolveOnChange, triggerFocus } from './Input';

interface ShowCountProps {
  formatter: (args: { count: number; maxLength?: number }) => string;
}

function fixEmojiLength(value: string, maxLength: number) {
  return [...(value || '')].slice(0, maxLength).join('');
}

export interface TextAreaProps extends RcTextAreaProps {
  allowClear?: boolean;
  bordered?: boolean;
  showCount?: boolean | ShowCountProps;
  size?: SizeType;
  status?: InputStatus;
}

export interface TextAreaRef {
  focus: (options?: InputFocusOptions) => void;
  blur: () => void;
  resizableTextArea?: ResizableTextArea;
}

const TextArea = React.forwardRef<TextAreaRef, TextAreaProps>(
  (
    {
      prefixCls: customizePrefixCls,
      bordered = true,
      showCount = false,
      maxLength,
      className,
      style,
      size: customizeSize,
      onCompositionStart,
      onCompositionEnd,
      onChange,
      status: customStatus,
      ...props
    },
    ref,
  ) => {
    const { getPrefixCls, direction } = React.useContext(ConfigContext);
    const size = React.useContext(SizeContext);

    const { status: contextStatus, hasFeedback } = React.useContext(FormItemStatusContext);
    const mergedStatus = contextStatus || customStatus;

    const innerRef = React.useRef<RcTextArea>(null);
    const clearableInputRef = React.useRef<ClearableLabeledInput>(null);

    const [compositing, setCompositing] = React.useState(false);

    const [value, setValue] = useMergedState(props.defaultValue, {
      value: props.value,
    });
    const { hidden } = props;

    const handleSetValue = (val: string, callback?: () => void) => {
      if (props.value === undefined) {
        setValue(val);
        callback?.();
      }
    };

    // =========================== Value Update ===========================
    // Max length value
    const hasMaxLength = Number(maxLength) > 0;

    const onInternalCompositionStart: React.CompositionEventHandler<HTMLTextAreaElement> = e => {
      setCompositing(true);
      onCompositionStart?.(e);
    };

    const onInternalCompositionEnd: React.CompositionEventHandler<HTMLTextAreaElement> = e => {
      setCompositing(false);

      let triggerValue = e.currentTarget.value;
      if (hasMaxLength) {
        triggerValue = fixEmojiLength(triggerValue, maxLength!);
      }

      // Patch composition onChange when value changed
      if (triggerValue !== value) {
        handleSetValue(triggerValue);
        resolveOnChange(e.currentTarget, e, onChange, triggerValue);
      }

      onCompositionEnd?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      let triggerValue = e.target.value;
      if (!compositing && hasMaxLength) {
        triggerValue = fixEmojiLength(triggerValue, maxLength!);
      }

      handleSetValue(triggerValue);
      resolveOnChange(e.currentTarget, e, onChange, triggerValue);
    };

    // ============================== Reset ===============================
    const handleReset = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      handleSetValue('', () => {
        innerRef.current?.focus();
      });
      resolveOnChange(innerRef.current?.resizableTextArea?.textArea!, e, onChange);
    };

    const prefixCls = getPrefixCls('input', customizePrefixCls);

    React.useImperativeHandle(ref, () => ({
      resizableTextArea: innerRef.current?.resizableTextArea,
      focus: (option?: InputFocusOptions) => {
        triggerFocus(innerRef.current?.resizableTextArea?.textArea, option);
      },
      blur: () => innerRef.current?.blur(),
    }));

    const textArea = (
      <RcTextArea
        {...omit(props, ['allowClear'])}
        className={classNames(
          {
            [`${prefixCls}-borderless`]: !bordered,
            [className!]: className && !showCount,
            [`${prefixCls}-sm`]: size === 'small' || customizeSize === 'small',
            [`${prefixCls}-lg`]: size === 'large' || customizeSize === 'large',
          },
          getStatusClassNames(prefixCls, mergedStatus),
        )}
        style={showCount ? undefined : style}
        prefixCls={prefixCls}
        onCompositionStart={onInternalCompositionStart}
        onChange={handleChange}
        onCompositionEnd={onInternalCompositionEnd}
        ref={innerRef}
      />
    );

    let val = fixControlledValue(value) as string;

    if (!compositing && hasMaxLength && (props.value === null || props.value === undefined)) {
      // fix #27612 将value转为数组进行截取，解决 '😂'.length === 2 等emoji表情导致的截取乱码的问题
      val = fixEmojiLength(val, maxLength!);
    }

    // TextArea
    const textareaNode = (
      <ClearableLabeledInput
        {...props}
        prefixCls={prefixCls}
        direction={direction}
        inputType="text"
        value={val}
        element={textArea}
        handleReset={handleReset}
        ref={clearableInputRef}
        bordered={bordered}
        status={customStatus}
        style={showCount ? undefined : style}
      />
    );

    // Only show text area wrapper when needed
    if (showCount || hasFeedback) {
      const valueLength = [...val].length;

      let dataCount = '';
      if (typeof showCount === 'object') {
        dataCount = showCount.formatter({ count: valueLength, maxLength });
      } else {
        dataCount = `${valueLength}${hasMaxLength ? ` / ${maxLength}` : ''}`;
      }

      return (
        <div
          hidden={hidden}
          className={classNames(
            `${prefixCls}-textarea`,
            {
              [`${prefixCls}-textarea-rtl`]: direction === 'rtl',
              [`${prefixCls}-textarea-show-count`]: showCount,
            },
            getStatusClassNames(`${prefixCls}-textarea`, mergedStatus, hasFeedback),
            className,
          )}
          style={style}
          data-count={dataCount}
        >
          {textareaNode}
          {hasFeedback && getFeedbackIcon(prefixCls, mergedStatus)}
        </div>
      );
    }

    return textareaNode;
  },
);

export default TextArea;
