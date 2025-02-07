import React, { Component } from 'react';
import './index.less';

const prefixCls = 'terrain';

const pics = [
  require('@/assets/images/terrain5.png'),
  require('@/assets/images/terrain1.png'),
  require('@/assets/images/terrain3.png'),
  require('@/assets/images/terrain2.png'),
]
class TerrainAwareness extends Component {

  render() {
    const terrainList = this.props.terrainList || [];
    const rotateAngle = this.props.rotateAngle || 0;
    const list1 = terrainList.slice(0, 4);
    const list2 = terrainList.slice(4, 8);
    return (
      <div className={`${prefixCls}`}>
        <div className={`${prefixCls}-grid`}>
          {
            list1.map((order, index) => {
              return (
                <div className={`${prefixCls}-grid-item`} key={index}>
                  <img className={`${prefixCls}-grid-item-pic`} src={pics[order]} alt="" />
                </div>
              )
            })
          }
          <div className={`${prefixCls}-grid-item`}>
            <img className={`${prefixCls}-grid-item-pic`} src={require('@/assets/images/terrain4.png')} alt="" style={{transform: `rotate(${rotateAngle}deg)`}} />
          </div>
          {
            list2.map((order, index) => {
              return (
                <div className={`${prefixCls}-grid-item`} key={index + 4}>
                  <img className={`${prefixCls}-grid-item-pic`} src={pics[order]} alt="" />
                </div>
              )
            })
          }
        </div>
        <div className={`${prefixCls}-info`}>
          <div className={`${prefixCls}-info-item`}>
            <img className={`${prefixCls}-info-item-pic`} src={require('@/assets/images/terrain1.png')} alt="" />
            <p className={`${prefixCls}-info-item-text`}>平坦平地</p>
          </div>
          <div className={`${prefixCls}-info-item`}>
            <img className={`${prefixCls}-info-item-pic`} src={require('@/assets/images/terrain3.png')} alt="" />
            <p className={`${prefixCls}-info-item-text`}>凹凸平地</p>
          </div>
          <div className={`${prefixCls}-info-item`}>
            <img className={`${prefixCls}-info-item-pic`} src={require('@/assets/images/terrain2.png')} alt="" />
            <p className={`${prefixCls}-info-item-text`}>障碍</p>
          </div>
          <div className={`${prefixCls}-info-item`}>
            <img className={`${prefixCls}-info-item-pic`} src={require('@/assets/images/terrain5.png')} alt="" />
            <p className={`${prefixCls}-info-item-text`}>关闭状态</p>
          </div>
        </div>
      </div>
    );
  }
}

export default TerrainAwareness;
