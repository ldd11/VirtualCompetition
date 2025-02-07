import React, { Component } from 'react';
import './index.less';

const prefixCls = 'space';
class SpaceInfo extends Component {
  render() {
    const { infos } = this.props;

    return (
      <div className={`${prefixCls}`}>
        {
          (infos == null || infos.length === 0) ? <br /> : infos.map(info => (
            <div className={`${prefixCls}-item`} key={`${info.key}_${info.value}`}>
              <div className={`${prefixCls}-item-hd`}>{ info.key }</div>
              <div className={`${prefixCls}-item-bd`}>{ info.value }</div>
            </div>
          ))
        }
      </div>
    );
  }
}

export default SpaceInfo;
