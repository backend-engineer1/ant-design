import React from 'react';
import ReactDOM from 'react-dom';
import { addLocaleData, IntlProvider } from 'react-intl';
import Header from './Header';
import Footer from './Footer';
import enLocale from '../../en-US.js';
import cnLocale from '../../zh-CN.js';
import '../../static/style';

// Expose to iframe
window.react = React;
window['react-dom'] = ReactDOM;
window.antd = require('antd');

const isZhCN = (typeof localStorage !== 'undefined' && localStorage.getItem('locale') !== 'en-US');
  // (typeof localStorage !== 'undefined' && localStorage.getItem('locale') === 'zh-CN') ||
  // (navigator.language === 'zh-CN');

const appLocale = isZhCN ? cnLocale : enLocale;
addLocaleData(appLocale.data);

export default (props) => {
  return (
    <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
      <div className="page-wrapper">
        <Header {...props} />
        {props.children}
        <Footer />
      </div>
    </IntlProvider>
  );
};
