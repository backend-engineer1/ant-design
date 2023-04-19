const React = require('react');
const { globSync } = require('glob');
const path = require('path');

const styleFiles = globSync(
  path.join(
    process.cwd(),
    'components/!(version|config-provider|icon|auto-complete|col|row|time-picker)/style/index.?(ts|tsx)',
  ),
);

module.exports = {
  generateCssinjs({ key, beforeRender, render }) {
    const EmptyElement = React.createElement('div');

    styleFiles.forEach((file) => {
      const pathArr = file.split('/');
      const styleIndex = pathArr.lastIndexOf('style');
      const componentName = pathArr[styleIndex - 1];
      let useStyle = () => {};
      if (file.includes('grid')) {
        // eslint-disable-next-line global-require,import/no-dynamic-require
        const { useColStyle, useRowStyle } = require(file);
        useStyle = (prefixCls) => {
          useRowStyle(prefixCls);
          useColStyle(prefixCls);
        };
      } else {
        // eslint-disable-next-line global-require,import/no-dynamic-require
        useStyle = require(file).default;
      }
      const Component = () => {
        useStyle(`${key}-${componentName}`);
        return EmptyElement;
      };

      beforeRender?.(componentName);
      render(Component);
    });
  },
  filenames: styleFiles,
};
