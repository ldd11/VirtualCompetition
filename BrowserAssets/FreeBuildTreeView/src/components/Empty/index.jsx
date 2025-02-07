import React from 'react';
import PropTypes from 'prop-types';

import './index.less';

const prefixCls = 'empty';
class Empty extends React.Component {
  static propTypes ={
    title: PropTypes.string,
    des: PropTypes.string,
  }

  static defaultProps = {
    title: null,
    des: null,
  };

  render() {
    const {
      title, des
    } = this.props;
    return (
      <div className={`${prefixCls}`}>
        <div className={`${prefixCls}-icon`} />
        <p className={`${prefixCls}-title`}>{title}</p>
        <p className={`${prefixCls}-description`}>{des}</p>
      </div>
    );
  }
}
export default Empty;
