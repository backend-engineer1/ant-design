---
order: 4
title: Customize Theme
---

Ant Design allows to customize some basic design aspects in order to meet the needs of UI diversity from business and brand, including primary color, border radius, border color, etc.

![](https://zos.alipayobjects.com/rmsportal/zTFoszBtDODhXfLAazfSpYbSLSEeytoG.png)

## Less variables

We are using [Less](http://lesscss.org/) as the development language of style. A set of less variables are defined for each design aspect that can be customized to your needs.

- [Default Variables](https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less)

Please report an issue if the existing list of variables is not enough for you.

## How to use it

We recommend [modifyVars](http://lesscss.org/usage/#using-less-in-the-browser-modify-variables) to override the default values of the variables. There are two ways to achieve it in practice.

You can use this [example](https://github.com/ant-design/antd-init/tree/master/examples/customize-antd-theme) as a playground.

### 1) Using 'theme' property in package.theme (recommended way)

Specify the `theme` property in `package.json` file, whose value can be either an object or the path to a JS file that contains the custom values of specific variables:
- example of directly specifying the custom values as an object:
```js
"theme": {
  "@primary-color": "#1DA57A",
},
```
- example of specifying a [file path](https://github.com/ant-design/antd-init/blob/master/examples/customize-antd-theme/theme.js) to a JS file:
```js
"theme": "./theme.js",
```

This approach is working only when using [atool-build](https://github.com/ant-tool/atool-build)(built in [antd-init](https://github.com/ant-design/antd-init) and [dva-cli](https://github.com/dvajs/dva-cli)). If you choose other boilerplates, you can write webpack config about [less-loader modifyVars](https://github.com/webpack/less-loader#less-options) like [atool-build ](https://github.com/ant-tool/atool-build/blob/a4b3e3eec4ffc09b0e2352d7f9d279c4c28fdb99/src/getWebpackCommonConfig.js#L131-L138) does.

Note: Importing less style is necessary. Please specify `style` option of `babel-plugin-import` to be `true`.

### 2) Overriding Less variables (alternative way)

Override variables via less definition files.

Create a standalone less file like the one below, and import it in your project.

   ```css
   @import "~antd/dist/antd.less";   // import official less entry file
   @import "your-theme-file.less";   // override variables here
   ```

Note: This way will load the styles of all components, regardless of your demand, which cause `style` option of `babel-plugin-import` not working.
