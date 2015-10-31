import React from 'react';
import rcUtil from 'rc-util';

const cx = rcUtil.classSet;

function prefixClsFn(prefixCls, ...args) {
  return args.map((s)=> {
    return prefixCls + '-' + s;
  }).join(' ');
}

class FormItem extends React.Component {
  renderHelp() {
    const prefixCls = this.props.prefixCls;
    return this.props.help ? (
      <div className={prefixClsFn(prefixCls, 'explain')} key="help">
        {this.props.help}
      </div>
    ) : null;
  }

  renderValidateWrapper(children) {
    if (this.props.validateStatus) {
      const classes = cx(
        {
          'has-feedback': this.props.hasFeedback,
          'has-success': this.props.validateStatus === 'success',
          'has-warning': this.props.validateStatus === 'warning',
          'has-error': this.props.validateStatus === 'error',
          'is-validating': this.props.validateStatus === 'validating',
        }
      );
      return (
        <div className={classes}>
          {children}
        </div>
      );
    }
    return children;
  }

  renderWrapper(children) {
    return this.props.wrapperClassName ? (
      <div className={this.props.wrapperClassName} key="wrapper">
        {children}
      </div>
    ) : children;
  }

  renderLabel() {
    const labelClassName = this.props.labelClassName;
    const required = this.props.required ? 'required' : '';

    return this.props.label ? (
      <label htmlFor={this.props.id} className={labelClassName} required={required} key="label">
        {this.props.label}
      </label>
    ) : '';
  }

  renderChildren() {
    return [
      this.renderLabel(),
      this.renderWrapper(
        this.renderValidateWrapper(
          [
            this.props.children,
            this.renderHelp(),
          ]
        )
      ),
    ];
  }

  // 判断是否要 `.ant-form-item-compact` 样式类
  _isCompact(children) {
    const compactControls = ['checkbox', 'radio', 'radio-group', 'static', 'file'];
    let isCompact = false;

    if (!Array.isArray(children)) {
      children = [children];
    }
    children.map((child, i) => {
      const type = child.props && child.props.type;
      let prefixCls = child.props && child.props.prefixCls;
      prefixCls = prefixCls ? prefixCls.substring(prefixCls.indexOf('-') + 1) : '';

      if ((type && compactControls.indexOf(type) > -1) || (prefixCls && compactControls.indexOf(prefixCls) > -1) ) {
        isCompact = true;
      } else if (child.props && typeof child.props.children === 'object') {
        isCompact = this._isCompact(child.props.children);
      }
    });

    return isCompact;
  }

  renderFormItem(children) {
    const props = this.props;
    const prefixCls = props.prefixCls;
    const itemClassName = {
      [`${prefixCls}-item`]: true,
      [`${prefixCls}-item-compact`]:  this._isCompact(props.children),
    };

    return (
      <div className={cx(itemClassName)} key="form-item">
        {children}
      </div>
    );
  }

  render() {
    const children = this.renderChildren();
    return this.renderFormItem(children);
  }
}

FormItem.propTypes = {
  prefixCls: React.PropTypes.string,
  label: React.PropTypes.node,
  labelClassName: React.PropTypes.string,
  help: React.PropTypes.node,
  validateStatus: React.PropTypes.oneOf(['success', 'warning', 'error', 'validating']),
  hasFeedback: React.PropTypes.bool,
  wrapperClassName: React.PropTypes.string,
  className: React.PropTypes.string,
  children: React.PropTypes.any,
};

FormItem.defaultProps = {
  hasFeedback: false,
  required: false,
  prefixCls: 'ant-form',
};

module.exports = FormItem;
