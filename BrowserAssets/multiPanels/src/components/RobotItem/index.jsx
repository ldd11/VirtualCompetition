import React, { Component } from 'react';
import './index.less';
import SpaceInfo from '../SpaceInfo/index';
import OtherInfo from '../OtherInfo/index';
import { EventMsg } from '@/utils/EventMsg';
import EventUtil from '@/utils/EventUtil';
import TerrainAwareness from '../TerrainAwareness/index';

const prefixCls = 'robot';

const terrainName2Order = {
  '平坦平地': 1,
  '凹凸平地': 2,
  '障碍物': 3,
};

class RobotItem extends Component {
  constructor() {
    super();
    this.state = {
      robotName: '',
      robotImg: '',
      spaceInfos: null,
      motionInfos: null,
      unitInfos: null,
      terrainInfos: null,
    };
  }

  componentDidMount() {
    EventUtil.on(EventMsg.UPDATE_ROBOT_TEXTURE, this.updateRobotTexture);
    EventUtil.on(EventMsg.UPDATE_ROBOT_INFO, this.updateRobotInfo);
  }

  componentWillUnmount() {
    EventUtil.off(EventMsg.UPDATE_ROBOT_TEXTURE, this.updateRobotTexture);
    EventUtil.off(EventMsg.UPDATE_ROBOT_INFO, this.updateRobotInfo);
  }

  updateRobotTexture = (data) => {
    console.log('[RobotPanel].updateRobotTexture, data = ', data);
    this.setState({
      robotImg: data.url
    });
  }

  updateRobotInfo = (data) => {
    let spaceInfos = null;
    let motionInfos = null;
    let unitInfos = null;
    let terrainInfos = null;

    console.log('[RobotPanel].updateRobotInfo, data = ', data);
    const { robotInfo } = data;
    const { robotName, items } = robotInfo || {};

    try {
      items.forEach((element) => {
        const { name, kvs } = element;
        switch (name) {
          case 'spaceInfo':
            spaceInfos = kvs;
            break;
          case 'motionInfo':
            motionInfos = kvs;
            break;
          case 'unitInfo':
            unitInfos = kvs;
            break;
          case 'terrainInfo':
            terrainInfos = this.tranformTerrain(kvs);
            break;
        }
      });
  
      this.setState({
        robotName, spaceInfos, motionInfos, unitInfos, terrainInfos
      });

      console.log('terrain infos', terrainInfos);
  
    } catch (e) {
      console.error(e);
    }
  }

  tranformTerrain(kvs) {
    const result =  kvs.map(item => {
      return terrainName2Order[item.value] || 0;
    });
    console.log('transform terrains', this.tranformTerrain);
    return result;
  }

  showSpaceInfo = (titleName, infos) => (
    <div className={`${prefixCls}-item`}>
      <div className={`${prefixCls}-item-hd`}>{titleName}：</div>
      <div className={`${prefixCls}-item-bd`}>
        <SpaceInfo infos={infos} />
      </div>
    </div>
  )

  showOtherInfo = (titleName, infos) => (
    <div className={`${prefixCls}-item`}>
      <div className={`${prefixCls}-item-hd`}>{titleName}：</div>
      <div className={`${prefixCls}-item-bd`}>
        <OtherInfo infos={infos} />
      </div>
    </div>
  )

  showTerrainAwareness = (titleName, infos, angle) => (
    <div className={`${prefixCls}-item`}>
      <div className={`${prefixCls}-item-hd`}>{titleName}：</div>
      <div className={`${prefixCls}-item-bd`}>
        <TerrainAwareness terrainList={infos} rotateAngle={angle} />
      </div>
    </div>
  )

  getAngle = (infos) => {
    let angle = 0;
    if (!infos) {
      return angle;
    }
    let len = infos.length;
    for (let i = 0; i < len; ++i) {
      const info = infos[i];
      if (info.key === 'direction') {
        angle = info.value;
      }
    }

    if (typeof angle === 'string') {
      angle = parseInt(angle, 10);
    }

    return angle + 90;
  }

  render() {
    const {
      robotName, robotImg, spaceInfos, motionInfos, unitInfos, terrainInfos,
    } = this.state;

    const angle = this.getAngle(motionInfos);

    return (
      <div className={`${prefixCls}`}>
        <div className="panels-line" />
        <div className={`${prefixCls}-imgwrap`}>
          <img className={`${prefixCls}-imgwrap-pic`} src={robotImg} alt="" />
        </div>
        <div className={`${prefixCls}-name`}>
          <div className={`${prefixCls}-name-text`}>{robotName}</div>
          <div className={`${prefixCls}-name-text`}>{robotName}</div>
        </div>
        {/* name2为 自由搭建机器人 */}
        <div className={`${prefixCls}-list`}>
          { this.showSpaceInfo('空间信息', spaceInfos) }
          { this.showOtherInfo('运动信息', motionInfos) }
          { (unitInfos != null && unitInfos.length > 0) && this.showOtherInfo('搭建信息', unitInfos) }
          { (terrainInfos != null && terrainInfos.length > 0) && this.showTerrainAwareness('地形感知', terrainInfos, angle) }
        </div>
      </div>
    );
  }
}

export default RobotItem;
