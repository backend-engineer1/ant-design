import React from 'react';
import { Link } from 'react-router';
import TweenOne from 'rc-tween-one';
import ScrollOverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import { QueueAnim, Icon, Button } from '../../../';

export default class Page2 extends React.Component {
  render() {
    return (
      <ScrollOverPack scrollName="page2" className="content-wrapper page" playScale={1} replay>
        <QueueAnim className="text-wrapper left-text" delay={300} key="text" duration={550} type="bottom"
          leaveReverse
          hideProps={{ child: null }}>
          <h2 key="h2">设计模式</h2>
          <p key="p" style={{ maxWidth: 260 }}>总结中后台设计中反复出现的问题，并提供相应的解决方案。</p>
          <div key="button">
            <Link to="/pattern">
              <Button type="primary" size="large">
                了解更多
                <Icon type="right" />
              </Button>
            </Link>
          </div>
        </QueueAnim>
        <TweenOne key="image" className="image2 image-wrapper" vars={{ x: 0, opacity: 1, delay: 300, duration: 550 }}
          style={{ transform: 'translateX(100px)', opacity: 0 }} hideProps={{ type: 'reverse' }} />
      </ScrollOverPack>
    );
  }
}
