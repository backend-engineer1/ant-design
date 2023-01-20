import type { TriggerProps } from 'rc-trigger';
import MockTrigger from 'rc-trigger/lib/mock';
import * as React from 'react';
import { TriggerMockContext } from '../shared/demoTestContext';

let OriginTrigger = jest.requireActual('rc-trigger');
OriginTrigger = OriginTrigger.default ?? OriginTrigger;

const ForwardTrigger = React.forwardRef<any, TriggerProps>((props, ref) => {
  const context = React.useContext(TriggerMockContext);

  const mergedPopupVisible = context?.popupVisible ?? props.popupVisible;
  (global as any).triggerProps = props;

  const mergedProps = {
    ...props,
    ref,
    popupVisible: mergedPopupVisible as boolean,
  };

  if (context?.mock === false) {
    return <OriginTrigger {...mergedProps} />;
  }
  return <MockTrigger {...mergedProps} />;
});

export default ForwardTrigger;
