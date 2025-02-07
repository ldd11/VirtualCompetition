import React, { Component } from 'react';
import './index.less';
const prefixCls = 'graphic';

class GraphicItem extends Component {

  // 图文组件
  render() {
    const { datas } = this.props;

    return (
      <div className={`${prefixCls}`}>
        {datas.map((data, index) => 
          <div key={index}>
            <div className={`${prefixCls}-hd`}>{data.title}</div>
            <div className={`${prefixCls}-bd`}>{data.content}</div>
          </div>
        )}
      </div>
    );
  }
}

export default GraphicItem;
