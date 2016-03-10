import React from 'react';
import { Collapse } from '../../../';
import * as utils from '../utils';
import hljs from 'highlight.js';

export default class Demo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeKey: '',
    };
  }

  handleChange(activeKey) {
    this.setState({
      activeKey: this.state.activeKey === activeKey ?
        '' : activeKey
    });
  }

  render() {
    const { id, preview, title, intro, code, expand } = this.props;
    const introChildren = intro.map(utils.objectToComponent);
    const highlightedCode = hljs.highlight('javascript', code).value;
    return (
      <section className="code-box" id={id}>
        <section className="code-box-demo">
          { preview() }
        </section>
        <section className="code-box-meta markdown">
          <div className="code-box-title">
            <a>{ title }</a>
          </div>
          <Collapse activeKey={expand ? 'code' : this.state.activeKey}
            onChange={this.handleChange.bind(this)}>
            <Collapse.Panel key="code" header={introChildren}>
              <div className="highlight">
                <pre>
                  <code className="javascript" dangerouslySetInnerHTML={{
                    __html: highlightedCode,
                  }} />
                  </pre>
                </div>
              </Collapse.Panel>
            </Collapse>
        </section>
      </section>
    );
  }
}
