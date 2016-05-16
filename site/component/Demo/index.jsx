import React from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import * as utils from '../utils';

const isLocal = location.port;

export default class Demo extends React.Component {
  static contextTypes = {
    intl: React.PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.state = {
      codeExpand: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.expand === undefined) return;

    this.setState({
      codeExpand: nextProps.expand,
    });
  }

  handleCodeExapnd = () => {
    this.setState({ codeExpand: !this.state.codeExpand });
  }

  render() {
    const { id, className, meta, intro, preview, style, src,
            highlightedCode, highlightedStyle, pathname } = this.props;
    const codeExpand = this.state.codeExpand;
    const codeBoxClass = classNames({
      'code-box': true,
      [className]: className,
      expand: codeExpand,
    });

    const locale = this.context.intl.locale;
    const localizeIntro = intro[locale] || intro;
    const introChildren = utils.jsonmlToComponent(pathname, ['div'].concat(localizeIntro));
    const localizedTitle = typeof meta.title === 'object' ?
            meta.title[locale] : meta.title;
    return (
      <section className={codeBoxClass} id={id}>
        <section className="code-box-demo">
          {
            meta.iframe ?
              <iframe src={isLocal ? src : src.replace('./_site', '')} /> :
              preview
          }
          {
            !!style ?
              <style dangerouslySetInnerHTML={{ __html: style }} /> :
              null
          }
        </section>
        <section className="code-box-meta markdown">
          <div className="code-box-title">
            <Link to={{ pathname, query: { scrollTo: id } }}>
              { localizedTitle }
            </Link>
          </div>
          {introChildren}
          <span className="collapse anticon anticon-circle-o-right"
            onClick={this.handleCodeExapnd}
            unselectable="none" />
        </section>
        <section className={`highlight-wrapper ${codeExpand ? 'highlight-wrapper-expand' : ''}`}
          key="code">
          <div className="highlight">
            <pre>
              <code className="javascript" dangerouslySetInnerHTML={{
                __html: highlightedCode,
              }} />
            </pre>
          </div>
          {
            highlightedStyle ?
              <div key="style" className="highlight">
                <pre>
                  <code className="css" dangerouslySetInnerHTML={{
                    __html: highlightedStyle,
                  }} />
                </pre>
              </div> :
              null
          }
        </section>
      </section>
    );
  }
}
