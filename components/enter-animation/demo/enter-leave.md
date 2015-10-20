# 配置进出场的样式

- order: 2

配置进出场动画样式。


---

````jsx
var EnterAnimation = antd.EnterAnimation;
var Button = antd.Button;

var Test = React.createClass({
  getInitialState() {
    return {
      enter:{
        type: 'right',
        interval: 0.3,
        callback:() => {
          console.log('enter');
        }
      },
      leave:{
        type: 'left',
        interval: .1,
        callback:() => {
          console.log('leave');
        }
      },
      show:true,
    }
  },
  onClick() {
    this.setState({
      show:!this.state.show,

    })
  },
  render() {
    return (
      <div>
        <div style={{marginBottom: 20}}>
          <Button type="primary" onClick={this.onClick}>切换</Button>
        </div>
        <EnterAnimation enter={this.state.enter} leave={this.state.leave}>
          {this.state.show ?
            <div className="demo-content" key='demo'>
              <div className="demo-kp">
                <ul>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </div>
              <div className="demo-listBox">
                <div className="demo-list">
                  <div className="title"></div>
                  <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                  </ul>
                </div>
              </div>
          </div> : null}
        </EnterAnimation>
      </div>
    );
  }
});

ReactDOM.render(<Test />
, document.getElementById('components-enter-animation-demo-enter-leave'));
````

<style>
#components-enter-animation-demo-enter-leave {
  text-align: center;
  overflow: hidden;
  margin: 20px auto;
}
</style>
