import React, { Component } from 'react';
import { observer } from 'mobx-react';
import TreeContainer from '../TreeContainer/index';

// 数据面板
const prefixCls = 'panels';

@observer
class Panels extends Component {
  render() {
    return (
      <div className={`${prefixCls}`}>
        <div className={`${prefixCls}-hd`}>
          <div className={`${prefixCls}-title`}>
            <p className={`${prefixCls}-title-text`}>对象管理</p>
            <span className={`${prefixCls}-title-info`}>OBJECT MANAGEMENT</span>
          </div>
        </div>
        <div className={`${prefixCls}-bd`}>
          <TreeContainer />
        </div>
      </div>
    );
  }
}

export default Panels;
