import * as React from 'react';
import RcImage from 'rc-image';
import { GroupConsumerProps } from 'rc-image/lib/PreviewGroup';
import { ConfigContext } from '../config-provider';

const InternalPreviewGroup: React.FC<GroupConsumerProps> = ({
  previewPrefixCls: customizePrefixCls,
  ...props
}) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('image-preview', customizePrefixCls);
  return <RcImage.PreviewGroup previewPrefixCls={prefixCls} {...props} />;
};

export default InternalPreviewGroup;
