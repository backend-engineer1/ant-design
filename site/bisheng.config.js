const path = require('path');

module.exports = {
  port: 8001,
  source: [
    './components',
    './docs',
    'CHANGELOG.md', // TODO: fix it in bisheng
  ],
  lazyLoad(nodePath, nodeValue) {
    if (typeof nodeValue === 'string') {
      return true;
    }
    return nodePath.endsWith('/demo');
  },
  pick: {
    components(markdownData) {
      const filename = markdownData.meta.filename;
      if (!/^components/.test(filename) ||
          /\/demo$/.test(path.dirname(filename)) ||
          /\.en-US\.md/.test(filename)) return;

      return {
        meta: markdownData.meta,
      };
    },
  },
  theme: './site/theme',
  htmlTemplate: './site/theme/static/template.html',
  plugins: [
    'bisheng-plugin-description',
    'bisheng-plugin-toc?maxDepth=2&keepElem',
    'bisheng-plugin-react?lang=__react',
    'bisheng-plugin-antd',
  ],
  doraConfig: {
    verbose: true,
    plugins: ['dora-plugin-upload'],
  },
  webpackConfig(config) {
    config.resolve.alias = {
      'antd/lib': path.join(process.cwd(), 'components'),
      antd: process.cwd(),
      site: path.join(process.cwd(), 'site'),
      'react-router': 'react-router/umd/ReactRouter',
    };

    config.babel.plugins.push([
      require.resolve('babel-plugin-antd'),
      {
        style: true,
        libraryName: 'antd',
        libDir: 'components',
      },
    ]);

    return config;
  },
};
