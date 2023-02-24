import * as React from 'react';
import { ConfigContext } from '../../config-provider';
import defaultLocale from '../../locale/en_US';
import useLocale from '../../locale/useLocale';
import ConfirmDialog from '../ConfirmDialog';
import type { ModalFuncProps } from '../Modal';

export interface HookModalProps {
  afterClose: () => void;
  config: ModalFuncProps;
}

export interface HookModalRef {
  destroy: () => void;
  update: (config: ModalFuncProps) => void;
}

const HookModal: React.ForwardRefRenderFunction<HookModalRef, HookModalProps> = (
  { afterClose, config },
  ref,
) => {
  const [open, setOpen] = React.useState(true);
  const [innerConfig, setInnerConfig] = React.useState(config);
  const { direction, getPrefixCls } = React.useContext(ConfigContext);

  const prefixCls = getPrefixCls('modal');
  const rootPrefixCls = getPrefixCls();

  const close = (...args: any[]) => {
    setOpen(false);
    const triggerCancel = args.some((param) => param && param.triggerCancel);
    if (innerConfig.onCancel && triggerCancel) {
      innerConfig.onCancel(() => {}, ...args.slice(1));
    }
  };

  React.useImperativeHandle(ref, () => ({
    destroy: close,
    update: (newConfig: ModalFuncProps) => {
      setInnerConfig((originConfig) => ({
        ...originConfig,
        ...newConfig,
      }));
    },
  }));

  const mergedOkCancel = innerConfig.okCancel ?? innerConfig.type === 'confirm';

  const [contextLocale] = useLocale('Modal', defaultLocale.Modal);

  return (
    <ConfirmDialog
      prefixCls={prefixCls}
      rootPrefixCls={rootPrefixCls}
      {...innerConfig}
      close={close}
      open={open}
      afterClose={afterClose}
      okText={
        innerConfig.okText || (mergedOkCancel ? contextLocale?.okText : contextLocale?.justOkText)
      }
      direction={direction}
      cancelText={innerConfig.cancelText || contextLocale?.cancelText}
    />
  );
};

export default React.forwardRef(HookModal);
