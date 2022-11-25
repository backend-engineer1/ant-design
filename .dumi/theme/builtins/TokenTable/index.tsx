import React, { FC, useMemo } from 'react';
import tokenMeta from 'antd/es/version/token-meta.json';
import { getDesignToken } from 'antd-token-previewer';
import { Table, TableProps, Tag } from 'antd';
import useLocale from '../../../hooks/useLocale';
import useSiteToken from '../../../hooks/useSiteToken';
import { css } from '@emotion/react';

type TokenTableProps = {
  type: 'seed' | 'map' | 'alias';
  lang: 'zh' | 'en';
};

type TokenData = {
  name: string;
  desc: string;
  type: string;
  value: any;
};

const defaultToken = getDesignToken();

const locales = {
  cn: {
    token: 'Token 名称',
    description: '描述',
    type: '类型',
    value: '默认值',
  },
  en: {
    token: 'Token Name',
    description: 'Description',
    type: 'Type',
    value: 'Default Value',
  },
};

const useStyle = () => {
  const { token } = useSiteToken();

  return {
    codeSpan: css`
      margin: 0 1px;
      padding: 0.2em 0.4em;
      font-size: 0.9em;
      background: ${token.siteMarkdownCodeBg};
      border: 1px solid ${token.colorSplit};
      border-radius: 3px;
      font-family: monospace;
    `,
  };
};

const TokenTable: FC<TokenTableProps> = ({ type }) => {
  const styles = useStyle();
  const [locale, lang] = useLocale(locales);
  const columns: Exclude<TableProps<TokenData>['columns'], undefined> = [
    {
      title: locale.token,
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: locale.description,
      key: 'desc',
      dataIndex: 'desc',
      width: 300,
    },
    {
      title: locale.type,
      key: 'type',
      dataIndex: 'type',
      render: (_, record) => <span css={styles.codeSpan}>{record.type}</span>,
    },
    {
      title: locale.value,
      key: 'value',
      render: (_, record) => (
        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
          {typeof record.value === 'string' &&
            (record.value.startsWith('#') || record.value.startsWith('rgb')) && (
              <span
                style={{
                  background: record.value,
                  display: 'inline-block',
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, 0.06)',
                  marginRight: 4,
                }}
              ></span>
            )}
          {typeof record.value !== 'string' ? JSON.stringify(record.value) : record.value}
        </span>
      ),
    },
  ];

  const data = useMemo<TokenData[]>(() => {
    return tokenMeta[type].map((token) => {
      return {
        name: token.name,
        desc: lang === 'cn' ? token.desc : token.descEn,
        type: token.type,
        value: (defaultToken as any)[token.name],
      };
    });
  }, [type, lang]);

  return <Table dataSource={data} columns={columns} pagination={false} bordered />;
};

export default TokenTable;
