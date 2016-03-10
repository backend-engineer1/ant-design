import React from 'react';
import { changeConfirmLocale } from '../modal/confirm';

export default class LocaleProvider extends React.Component {
  getChildContext() {
    return {
      antLocale: this.props.locale,
    };
  }
  componentDidMount() {
    this.componentDidUpdate();
  }
  componentDidUpdate() {
    const { locale } = this.props;
    changeConfirmLocale(locale && locale.Modal);
  }
  componentWillUnMount() {
    changeConfirmLocale();
  }
  render() {
    return React.Children.only(this.props.children);
  }
}

LocaleProvider.childContextTypes = {
  antLocale: React.PropTypes.object,
};

LocaleProvider.propTypes = {
  locale: React.PropTypes.object,
};
