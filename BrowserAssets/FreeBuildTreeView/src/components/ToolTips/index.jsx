import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.less';

const prefixCls = 'tooltips';

class ToolTips extends Component {
  static defaultProps = {
    msg: '',
    left: 0,
    top: 0
  };

  static propTypes = {
    msg: PropTypes.string,
    left: PropTypes.number,
    top: PropTypes.number
  };

  get calculateLeft() {
    const { left } = this.props;
    return left - 100;
  }

  get calculateTop() {
    const { top } = this.props;
    return top - 47;
  }

  render() {
    const { msg } = this.props;
    return (
      <div className={`${prefixCls}`} style={{ left: `${this.calculateLeft}px`, top: `${this.calculateTop}px` }}>
        <i className={`${prefixCls}-icon`} />
        <p className={`${prefixCls}-text`}>{msg}</p>
      </div>
    );
  }
}

export default ToolTips;
