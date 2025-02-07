import React, { Component } from 'react';
import PropTypes from 'prop-types';
import planetInfos from './planetInfos';
import Select from '../Select';
import './index.less';

const prefixCls = 'planet';
const optionsData = [
  { label: '太阳', key: 0, value: 0 },
  { label: '水星', key: 1, value: 1 },
  { label: '金星', key: 2, value: 2 },
  { label: '地球', key: 3, value: 3 },
  { label: '火星', key: 4, value: 4 },
  { label: '木星', key: 5, value: 5 },
  { label: '土星', key: 6, value: 6 },
  { label: '天王星', key: 7, value: 7 },
  { label: '海王星', key: 8, value: 8 },
];

class PlanetPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPlanetIndex: 0,
      planetInfos,
    };
  }

  handleChange = (opt) => {
    this.setState({
      currentPlanetIndex: opt.value,
    });
  };

  render() {
    const { planetInfos, currentPlanetIndex } = this.state;
    const { show } = this.props;
    const currentPlanet = planetInfos[currentPlanetIndex];

    return (
      <div className="panels-content" style={{ display: show ? 'block' : 'none' }}>
        <Select options={optionsData} onChange={this.handleChange} placeholder="请选择" value={optionsData[0]} />
        <div className={`${prefixCls}`}>
          <div className={`${prefixCls}-imgwrap`}>
            <img className={`${prefixCls}-imgwrap-pic`} src={currentPlanet.avatar} alt="太阳系" />
          </div>
          <div className={`${prefixCls}-info`}>
            <div className={`${prefixCls}-info-item`}>
              <span className={`${prefixCls}-info-item-label`}>星球半径：</span>
              <p className={`${prefixCls}-info-item-text`}>{ currentPlanet.radius }</p>
            </div>
            <div className={`${prefixCls}-info-item`}>
              <span className={`${prefixCls}-info-item-label`}>星球质量：</span>
              <p className={`${prefixCls}-info-item-text`}>{ currentPlanet.quality }</p>
            </div>
            <div className={`${prefixCls}-info-item`}>
              <span className={`${prefixCls}-info-item-label`}>轨道半长轴：</span>
              <p className={`${prefixCls}-info-item-text`}>{ currentPlanet.orbitLength }</p>
            </div>
            <div className={`${prefixCls}-info-item`}>
              <span className={`${prefixCls}-info-item-label`}>自转周期：</span>
              <p className={`${prefixCls}-info-item-text`}>{ currentPlanet.rotationPeriod }</p>
            </div>
            <div className={`${prefixCls}-info-item`}>
              <span className={`${prefixCls}-info-item-label`}>公转周期：</span>
              <p className={`${prefixCls}-info-item-text`}>{ currentPlanet.revolutionPeriod }</p>
            </div>
            <div className={`${prefixCls}-info-item`}>
              <span className={`${prefixCls}-info-item-label`}>表面重力：</span>
              <p className={`${prefixCls}-info-item-text`}>{ currentPlanet.gravity }</p>
            </div>
            <div className={`${prefixCls}-info-item`}>
              <span className={`${prefixCls}-info-item-label`}>表面温度：</span>
              <p className={`${prefixCls}-info-item-text`}>{ currentPlanet.temperature }</p>
            </div>
            {/* <div className={`${prefixCls}-info-item`}>
              <span className={`${prefixCls}-info-item-label`}>成分：</span>
              <p className={`${prefixCls}-info-item-text`}>{ currentPlanet.component }</p>
            </div> */}
          </div>
        </div>
        <div className={`${prefixCls}-intro`}>
          <span className={`${prefixCls}-intro-title`}>成分：</span>
          <p className={`${prefixCls}-intro-text`}>{ currentPlanet.component }</p>
        </div>
        <div className={`${prefixCls}-intro`}>
          <p className={`${prefixCls}-intro-title`}>简介：</p>
          <div className={`${prefixCls}-intro-text`}>{ currentPlanet.intro }</div>
        </div>
      </div>
    );
  }
}

export default PlanetPanel;
