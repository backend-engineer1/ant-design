import * as React from 'react';
import Icon, * as AntdIcons from '@ant-design/icons';
import { Radio, Input, Empty } from 'antd';
import type { RadioChangeEvent } from 'antd/es/radio/interface';
import { useIntl } from 'dumi';
import debounce from 'lodash/debounce';
import Category from './Category';
import { FilledIcon, OutlinedIcon, TwoToneIcon } from './themeIcons';
import type { CategoriesKeys } from './fields';
import { categories } from './fields';

export enum ThemeType {
  Filled = 'Filled',
  Outlined = 'Outlined',
  TwoTone = 'TwoTone',
}

const allIcons: { [key: string]: any } = AntdIcons;

interface IconSearchState {
  theme: ThemeType;
  searchKey: string;
}

const IconSearch: React.FC = () => {
  const intl = useIntl();
  const [displayState, setDisplayState] = React.useState<IconSearchState>({
    theme: ThemeType.Outlined,
    searchKey: '',
  });

  const newIconNames: string[] = [];

  const handleSearchIcon = React.useCallback(
    debounce((searchKey: string) => {
      setDisplayState((prevState) => ({ ...prevState, searchKey }));
    }),
    [],
  );

  const handleChangeTheme = React.useCallback((e: RadioChangeEvent) => {
    setDisplayState((prevState) => ({ ...prevState, theme: e.target.value as ThemeType }));
  }, []);

  const renderCategories = React.useMemo<React.ReactNode | React.ReactNode[]>(() => {
    const { searchKey = '', theme } = displayState;

    const categoriesResult = Object.keys(categories)
      .map((key) => {
        let iconList = categories[key as CategoriesKeys];
        if (searchKey) {
          const matchKey = searchKey
            // eslint-disable-next-line prefer-regex-literals
            .replace(new RegExp(`^<([a-zA-Z]*)\\s/>$`, 'gi'), (_, name) => name)
            .replace(/(Filled|Outlined|TwoTone)$/, '')
            .toLowerCase();
          iconList = iconList.filter((iconName) => iconName.toLowerCase().includes(matchKey));
        }

        // CopyrightCircle is same as Copyright, don't show it
        iconList = iconList.filter((icon) => icon !== 'CopyrightCircle');

        return {
          category: key,
          icons: iconList
            .map((iconName) => iconName + theme)
            .filter((iconName) => allIcons[iconName]),
        };
      })
      .filter(({ icons }) => !!icons.length)
      .map(({ category, icons }) => (
        <Category
          key={category}
          title={category as CategoriesKeys}
          theme={theme}
          icons={icons}
          newIcons={newIconNames}
        />
      ));
    return categoriesResult.length === 0 ? <Empty style={{ margin: '2em 0' }} /> : categoriesResult;
  }, [displayState.searchKey, displayState.theme]);
  return (
    <div className="markdown">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Radio.Group
          value={displayState.theme}
          onChange={handleChangeTheme}
          size="large"
          buttonStyle="solid"
        >
          <Radio.Button value={ThemeType.Outlined}>
            <Icon component={OutlinedIcon} />{' '}
            {intl.formatMessage({ id: 'app.docs.components.icon.outlined' })}
          </Radio.Button>
          <Radio.Button value={ThemeType.Filled}>
            <Icon component={FilledIcon} />{' '}
            {intl.formatMessage({ id: 'app.docs.components.icon.filled' })}
          </Radio.Button>
          <Radio.Button value={ThemeType.TwoTone}>
            <Icon component={TwoToneIcon} />{' '}
            {intl.formatMessage({ id: 'app.docs.components.icon.two-tone' })}
          </Radio.Button>
        </Radio.Group>
        <Input.Search
          placeholder={intl.formatMessage({ id: 'app.docs.components.icon.search.placeholder' })}
          style={{ margin: '0 10px', flex: 1 }}
          allowClear
          onChange={(e) => handleSearchIcon(e.currentTarget.value)}
          size="large"
          autoFocus
        />
      </div>
      {renderCategories}
    </div>
  );
};

export default IconSearch;
