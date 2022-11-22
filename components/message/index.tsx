import { render } from 'rc-util/lib/React/render';
import * as React from 'react';
import ConfigProvider, { globalConfig } from '../config-provider';
import type {
  ArgsProps,
  ConfigOptions,
  MessageInstance,
  MessageType,
  NoticeType,
  TypeOpen,
} from './interface';
import PurePanel from './PurePanel';
import useMessage, { useInternalMessage } from './useMessage';
import { wrapPromiseFn } from './util';

export { ArgsProps };

const methods: NoticeType[] = ['success', 'info', 'warning', 'error', 'loading'];

let message: GlobalMessage | null = null;

let act: (callback: VoidFunction) => Promise<void> | void = (callback: VoidFunction) => callback();

interface GlobalMessage {
  fragment: DocumentFragment;
  instance?: MessageInstance | null;
  sync?: VoidFunction;
}

interface OpenTask {
  type: 'open';
  config: ArgsProps;
  resolve: VoidFunction;
  setCloseFn: (closeFn: VoidFunction) => void;
  skipped?: boolean;
}

interface TypeTask {
  type: NoticeType;
  args: Parameters<TypeOpen>;
  resolve: VoidFunction;
  setCloseFn: (closeFn: VoidFunction) => void;
  skipped?: boolean;
}

type Task =
  | OpenTask
  | TypeTask
  | {
      type: 'destroy';
      key: React.Key;
      skipped?: boolean;
    };

let taskQueue: Task[] = [];

let defaultGlobalConfig: ConfigOptions = {};

function getGlobalContext() {
  const {
    prefixCls: globalPrefixCls,
    getContainer: globalGetContainer,
    rtl,
    maxCount,
    top,
  } = defaultGlobalConfig;
  const mergedPrefixCls = globalPrefixCls ?? globalConfig().getPrefixCls('message');
  const mergedContainer = globalGetContainer?.() || document.body;

  return {
    prefixCls: mergedPrefixCls,
    container: mergedContainer,
    rtl,
    maxCount,
    top,
  };
}

interface GlobalHolderRef {
  instance: MessageInstance;
  sync: () => void;
}

const GlobalHolder = React.forwardRef<GlobalHolderRef, {}>((_, ref) => {
  const [prefixCls, setPrefixCls] = React.useState<string>();
  const [container, setContainer] = React.useState<HTMLElement>();
  const [maxCount, setMaxCount] = React.useState<number | undefined>();
  const [rtl, setRTL] = React.useState<boolean | undefined>();
  const [top, setTop] = React.useState<number | undefined>();

  const [api, holder] = useInternalMessage({
    prefixCls,
    getContainer: () => container!,
    maxCount,
    rtl,
    top,
  });

  const global = globalConfig();
  const rootPrefixCls = global.getRootPrefixCls();
  const rootIconPrefixCls = global.getIconPrefixCls();

  const sync = () => {
    const {
      prefixCls: nextGlobalPrefixCls,
      container: nextGlobalContainer,
      maxCount: nextGlobalMaxCount,
      rtl: nextGlobalRTL,
      top: nextTop,
    } = getGlobalContext();

    setPrefixCls(nextGlobalPrefixCls);
    setContainer(nextGlobalContainer);
    setMaxCount(nextGlobalMaxCount);
    setRTL(nextGlobalRTL);
    setTop(nextTop);
  };

  React.useEffect(sync, []);

  React.useImperativeHandle(ref, () => {
    const instance: any = { ...api };

    Object.keys(instance).forEach((method) => {
      instance[method] = (...args: any[]) => {
        sync();
        return (api as any)[method](...args);
      };
    });

    return {
      instance,
      sync,
    };
  });

  return (
    <ConfigProvider prefixCls={rootPrefixCls} iconPrefixCls={rootIconPrefixCls}>
      {holder}
    </ConfigProvider>
  );
});

function flushNotice() {
  if (!message) {
    const holderFragment = document.createDocumentFragment();

    const newMessage: GlobalMessage = {
      fragment: holderFragment,
    };

    message = newMessage;

    // Delay render to avoid sync issue
    act(() => {
      render(
        <GlobalHolder
          ref={(node) => {
            const { instance, sync } = node || {};

            // React 18 test env will throw if call immediately in ref
            Promise.resolve().then(() => {
              if (!newMessage.instance && instance) {
                newMessage.instance = instance;
                newMessage.sync = sync;
                flushNotice();
              }
            });
          }}
        />,
        holderFragment,
      );
    });

    return;
  }

  // Notification not ready
  if (!message.instance) {
    return;
  }

  // >>> Execute task
  taskQueue.forEach((task) => {
    const { type, skipped } = task;

    // Only `skipped` when user call notice but cancel it immediately
    // and instance not ready
    if (!skipped) {
      switch (type) {
        case 'open': {
          act(() => {
            const closeFn = message!.instance!.open({
              ...defaultGlobalConfig,
              ...task.config,
            });

            closeFn?.then(task.resolve);
            task.setCloseFn(closeFn);
          });
          break;
        }

        case 'destroy':
          act(() => {
            message?.instance!.destroy(task.key);
          });
          break;

        // Other type open
        default: {
          act(() => {
            const closeFn = message!.instance![type](...task.args);

            closeFn?.then(task.resolve);
            task.setCloseFn(closeFn);
          });
        }
      }
    }
  });

  // Clean up
  taskQueue = [];
}

// ==============================================================================
// ==                                  Export                                  ==
// ==============================================================================
type MethodType = typeof methods[number];

function setMessageGlobalConfig(config: ConfigOptions) {
  defaultGlobalConfig = {
    ...defaultGlobalConfig,
    ...config,
  };

  // Trigger sync for it
  act(() => {
    message?.sync?.();
  });
}

function open(config: ArgsProps): MessageType {
  const result = wrapPromiseFn((resolve) => {
    let closeFn: VoidFunction;

    const task: OpenTask = {
      type: 'open',
      config,
      resolve,
      setCloseFn: (fn) => {
        closeFn = fn;
      },
    };
    taskQueue.push(task);

    return () => {
      if (closeFn) {
        act(() => {
          closeFn();
        });
      } else {
        task.skipped = true;
      }
    };
  });

  flushNotice();

  return result;
}

function typeOpen(type: NoticeType, args: Parameters<TypeOpen>): MessageType {
  const result = wrapPromiseFn((resolve) => {
    let closeFn: VoidFunction;

    const task: TypeTask = {
      type,
      args,
      resolve,
      setCloseFn: (fn) => {
        closeFn = fn;
      },
    };

    taskQueue.push(task);

    return () => {
      if (closeFn) {
        act(() => {
          closeFn();
        });
      } else {
        task.skipped = true;
      }
    };
  });

  flushNotice();

  return result;
}

function destroy(key: React.Key) {
  taskQueue.push({
    type: 'destroy',
    key,
  });
  flushNotice();
}

const baseStaticMethods: {
  open: (config: ArgsProps) => MessageType;
  destroy: (key?: React.Key) => void;
  config: typeof setMessageGlobalConfig;
  useMessage: typeof useMessage;
  /** @private Internal Component. Do not use in your production. */
  _InternalPanelDoNotUseOrYouWillBeFired: typeof PurePanel;
} = {
  open,
  destroy,
  config: setMessageGlobalConfig,
  useMessage,
  _InternalPanelDoNotUseOrYouWillBeFired: PurePanel,
};

const staticMethods: typeof baseStaticMethods & Record<MethodType, TypeOpen> =
  baseStaticMethods as any;

methods.forEach((type) => {
  staticMethods[type] = (...args: Parameters<TypeOpen>) => typeOpen(type, args);
});

// ==============================================================================
// ==                                   Test                                   ==
// ==============================================================================
const noop = () => {};

/** @private Only Work in test env */
// eslint-disable-next-line import/no-mutable-exports
export let actWrapper: (wrapper: any) => void = noop;

if (process.env.NODE_ENV === 'test') {
  actWrapper = (wrapper) => {
    act = wrapper;
  };
}

/** @private Only Work in test env */
// eslint-disable-next-line import/no-mutable-exports
export let actDestroy = noop;

if (process.env.NODE_ENV === 'test') {
  actDestroy = () => {
    message = null;
  };
}

export default staticMethods;
