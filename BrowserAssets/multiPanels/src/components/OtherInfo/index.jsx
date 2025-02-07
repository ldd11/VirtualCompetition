import { number } from 'prop-types';
import React, { Component } from 'react';
import './index.less';

const prefixCls = 'other';
class OtherInfo extends Component {
  getMeasureUnit = (name) => {
    let unit = '';
    switch (name) {
      case 'speed':
        unit = 'm/s';
        break;
      case 'direction':
        unit = '°';
        break;
      default:
        break;
    }

    return unit;
  }

  getIcon = (name) => {
    let iconName = '';
    switch (name) {
      case 'speed':
        iconName = 'speed';
        break;
      case 'direction':
        iconName = 'direction';
        break;
      case 'unitNum':
        iconName = 'group';
        break;
      case 'unitMass':
        iconName = 'quality';
        break;
      default:
        break;
    }

    return iconName;
  }

  getChineseDescription = (name) => {
    let cDesc = '';
    switch (name) {
      case 'speed':
        cDesc = '速度';
        break;
      case 'direction':
        cDesc = '方向';
        break;
      case 'unitNum':
        cDesc = '模块总数';
        break;
      case 'unitMass':
        cDesc = '总质量';
        break;
      default:
        break;
    }

    return cDesc;
  }

  getEnglishDescription = (name) => {
    let eDesc = '';
    switch (name) {
      case 'speed':
        eDesc = '/SPEED';
        break;
      case 'direction':
        eDesc = '/DIRECTION';
        break;
      case 'unitNum':
        eDesc = '/NUMBER';
        break;
      case 'unitMass':
        eDesc = '/NUMBER';
        break;
      default:
        break;
    }

    return eDesc;
  }

  getFraction = (number) => {
    var value = Math.floor(number * 100 - Math.floor(number) * 100);
    return `.${value < 10 ? '0' : ''}${value}`;
  }

  showFraction = (key, value) => ((key !== 'speed' && key !== 'direction')
    ? (<span />)
    : (
      <span className={`${prefixCls}-item-num-label`}>
        {`${this.getFraction(Math.abs(value))} ${this.getMeasureUnit(key)}`}
      </span>
    ))

  render() {
    const { infos } = this.props;
    return (
      <div className={`${prefixCls}`}>
        {
          (infos == null || infos.length == 0) ? <br /> : infos.map(info => (
            <div className={`${prefixCls}-item`} key={`${info.key}_${info.value}`}>
              <i className={`iconfont icon-${this.getIcon(info.key)}`} />
              <div className={`${prefixCls}-item-bd`}>
                <p className={`${prefixCls}-item-num`}>
                  <span className={`${prefixCls}-item-num-label`}>
                    {Math.trunc(info.value)}
                  </span>
                  {
                    this.showFraction(info.key, info.value)
                  }
                </p>
                <p className={`${prefixCls}-item-info`}>
                  <span className={`${prefixCls}-item-info-label`}>
                    {this.getChineseDescription(info.key)}
                  </span>
                  <span className={`${prefixCls}-item-info-label`}>
                    {this.getEnglishDescription(info.key)}
                  </span>
                </p>
              </div>
            </div>
          ))
        }
      </div>
    );
  }
}

export default OtherInfo;
