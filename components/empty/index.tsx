import classNames from 'classnames';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import DefaultEmptyImg from './empty';
import SimpleEmptyImg from './simple';

import useStyle from './style';

const defaultEmptyImg = <DefaultEmptyImg />;
const simpleEmptyImg = <SimpleEmptyImg />;

export interface TransferLocale {
  description: string;
}

export interface EmptyProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  /** @since 3.16.0 */
  imageStyle?: React.CSSProperties;
  image?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
}

type CompoundedComponent = React.FC<EmptyProps> & {
  PRESENTED_IMAGE_DEFAULT: React.ReactNode;
  PRESENTED_IMAGE_SIMPLE: React.ReactNode;
};

const Empty: CompoundedComponent = ({
  className,
  prefixCls: customizePrefixCls,
  image = defaultEmptyImg,
  description,
  children,
  imageStyle,
  ...restProps
}) => {
  const { getPrefixCls, direction } = React.useContext(ConfigContext);

  const prefixCls = getPrefixCls('empty', customizePrefixCls);
  const [wrapSSR, hashId] = useStyle(prefixCls);

  return wrapSSR(
    <LocaleReceiver componentName="Empty">
      {(locale: TransferLocale) => {
        const des = typeof description !== 'undefined' ? description : locale.description;
        const alt = typeof des === 'string' ? des : 'empty';

        let imageNode: React.ReactNode = null;

        if (typeof image === 'string') {
          imageNode = <img alt={alt} src={image} />;
        } else {
          imageNode = image;
        }

        return (
          <div
            className={classNames(
              hashId,
              prefixCls,
              {
                [`${prefixCls}-normal`]: image === simpleEmptyImg,
                [`${prefixCls}-rtl`]: direction === 'rtl',
              },
              className,
            )}
            {...restProps}
          >
            <div className={`${prefixCls}-image`} style={imageStyle}>
              {imageNode}
            </div>
            {des && <div className={`${prefixCls}-description`}>{des}</div>}
            {children && <div className={`${prefixCls}-footer`}>{children}</div>}
          </div>
        );
      }}
    </LocaleReceiver>,
  );
};

Empty.PRESENTED_IMAGE_DEFAULT = defaultEmptyImg;
Empty.PRESENTED_IMAGE_SIMPLE = simpleEmptyImg;

export default Empty;
