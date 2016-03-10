import React from 'react';
import Header from './Header';
import Footer from './Footer';

import './app.less';
export default function App(props) {
  return (
    <div>
      <Header {...props} />
      { props.children }
      <Footer />
    </div>
  );
}
