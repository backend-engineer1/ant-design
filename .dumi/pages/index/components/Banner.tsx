import * as React from 'react';
import { Button, Space, Typography } from 'antd';
import useLocale from '../../../hooks/useLocale';
import useSiteToken from '../../../hooks/useSiteToken';
import { GroupMask } from './Group';
import { Link, useLocation } from 'dumi';
import * as utils from '../../../theme/utils';

const locales = {
  cn: {
    slogan: '助力设计开发者「更灵活」地搭建出「更美」的产品，让用户「快乐工作」～',
    start: '开始使用',
    designLanguage: '设计语言',
  },
  en: {
    slogan:
      'Help designers/developers building beautiful products more flexible and working with happiness',
    start: 'Getting Started',
    designLanguage: 'Design Language',
  },
};

export interface BannerProps {
  children?: React.ReactNode;
}

export default function Banner({ children }: BannerProps) {
  const [locale, lang] = useLocale(locales);
  const { pathname, search } = useLocation();
  const { token } = useSiteToken();

  const isZhCN = utils.isZhCN(pathname);

  return (
    <>
      {/* Banner Placeholder Motion */}
      <div
        style={{
          height: 320,
          background: '#77C6FF',
          display: 'flex',
          flexWrap: 'nowrap',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            backgroundImage: `url(https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*6d50SboraPIAAAAAAAAAAAAAARQnAQ)`,
            flex: 'auto',
            backgroundRepeat: 'repeat-x',
            backgroundPosition: '100% 0',
            backgroundSize: 'auto 100%',
          }}
        />

        <video style={{ height: '100%', objectFit: 'contain' }} autoPlay muted loop>
          <source
            src="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/file/A*uYT7SZwhJnUAAAAAAAAAAAAADgCCAQ"
            type="video/webm"
          />
          <source
            src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/file/A*XYYNQJ3NbmMAAAAAAAAAAAAAARQnAQ"
            type="video/mp4"
          />
        </video>

        <div
          style={{
            backgroundImage: `url(https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*8ILtRrQlVDMAAAAAAAAAAAAAARQnAQ)`,
            flex: 'auto',
            backgroundRepeat: 'repeat-x',
            backgroundPosition: '0 0',
            backgroundSize: 'auto 100%',
            marginLeft: -1,
          }}
        />
      </div>

      {/* Logo */}
      <div style={{ position: 'relative', background: '#fff' }}>
        {/* Image Bottom Right */}
        <img
          style={{ position: 'absolute', right: 0, top: 240, width: 240 }}
          src="https://gw.alipayobjects.com/zos/bmw-prod/b3b8dc41-dce8-471f-9d81-9a0204f27d03.svg"
        />

        <GroupMask
          style={{
            textAlign: 'center',
            paddingTop: token.marginFar - 16,
            paddingBottom: token.marginFarSM,
          }}
        >
          {/* Image Left Top */}
          <img
            style={{ position: 'absolute', left: 0, top: 0, width: 240 }}
            src="https://gw.alipayobjects.com/zos/bmw-prod/49f963db-b2a8-4f15-857a-270d771a1204.svg"
          />
          {/* Image Left Top */}
          <img
            style={{ position: 'absolute', right: 120, top: 0, width: 240 }}
            src="https://gw.alipayobjects.com/zos/bmw-prod/e152223c-bcae-4913-8938-54fda9efe330.svg"
          />

          <Typography.Title
            level={1}
            style={{
              fontFamily: `AliPuHui, ${token.fontFamily}`,
              fontSize: token.fontSizes[9],
              lineHeight: token.lineHeights[9],
              fontWeight: 900,
              marginBottom: token.marginMD,
            }}
          >
            Ant Design 5.0
          </Typography.Title>
          <Typography.Paragraph
            style={{
              fontSize: token.fontSizeHeading5,
              lineHeight: token.lineHeightHeading5,
              marginBottom: token.marginMD * 2,
            }}
          >
            <div>{locale.slogan}</div>
          </Typography.Paragraph>

          <Space size="middle" style={{ marginBottom: token.marginFar }}>
            <Link to={utils.getLocalizedPathname('/components/overview/', isZhCN, search)}>
              <Button size="large" type="primary">
                {locale.start}
              </Button>
            </Link>
            <Link to={utils.getLocalizedPathname('/docs/spec/introduce/', isZhCN, search)}>
              <Button size="large">{locale.designLanguage}</Button>
            </Link>
          </Space>

          {children}
        </GroupMask>
      </div>
    </>
  );
}
