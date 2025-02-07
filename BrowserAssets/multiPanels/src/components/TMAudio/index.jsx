import React, { Component } from 'react';
import EventUtil from '@/utils/EventUtil';
import { EventMsg } from '@/utils/EventMsg';

import './index.less';

const prefixCls = 'tmaudio';
export default class TMAudio extends Component {
  constructor() {
    super();

    this.state = {
      name: '默认麦克风',
      isExpandDropDown: false,
      // sensorType: props.type,
    };

    this.pathRef = React.createRef();
    this.svgRef = React.createRef();

    this.datas = [];
  }

  componentDidMount() {
    EventUtil.on(EventMsg.SYNC_AUDIO_SPECTROGRAM, this.syncAudioSpectrogram);
    EventUtil.on(EventMsg.ADD_SENSOR, this.reset);
    EventUtil.on(EventMsg.STOP_RUNNING, this.stopRunning);
  }

  componentWillUnmount() {
    EventUtil.off(EventMsg.SYNC_AUDIO_SPECTROGRAM, this.syncAudioSpectrogram);
    EventUtil.off(EventMsg.ADD_SENSOR, this.reset);
    EventUtil.off(EventMsg.STOP_RUNNING, this.stopRunning);
  }

  syncAudioSpectrogram = (data) => {
    this.setState({
      name: data.device
    });

    // obj to array: data.spectrogram.data = {0: 11, 1: 22, 2: 33} => [11, 22, 33]
    let datas = Object.values(data.spectrogram.data);
    if (this.datas.length > 0) {
      // 重叠了前75%的数据，保留后25%的数据
      datas = datas.slice(datas.length * 0.75);
    } else {
      // 第一次绘制，保留后50%的数据
      datas = datas.slice(datas.length * 0.5);
    }
    this.datas = this.datas.concat(datas);

    // 开始绘制

    const svgWidth = this.svgRef.current.clientWidth;
    const svgHeight = this.svgRef.current.clientHeight;


    const takeEveryN = Math.ceil(this.datas.length / svgWidth);
    const filteredData = takeEveryN === 1 ? this.datas : this.datas.filter((d, i) => i % takeEveryN === 0);
    if (filteredData.length === 1) {
      filteredData.push(filteredData[0]);
    }

    const maxIndex = filteredData.length - 1;
    const points = [
      ...filteredData.map((d, i) => [svgWidth * (i / maxIndex), (svgHeight * d / 1024) / 2]),
      ...filteredData.map((d, i) => [svgWidth * (i / maxIndex), (-svgHeight * d / 1024) / 2]).reverse()
    ];

    const pathComponents = points.map(([x, y], i) => {
      const [nx, ny] = points[i + 1] || points[0];
      // Quadratic curve
      const cx = (x + nx) / 2;
      const cy = (y + ny) / 2;
      return `Q${x} ${y} ${cx} ${cy}`;
    });


    this.pathRef.current.setAttribute('d', `M0 0${pathComponents.join(' ')}Z`);
  };

  reset = (data) => {
    this.datas = [];
    this.pathRef.current.setAttribute('d', 'M0 0Z');
  }

  stopRunning = () => {
    this.datas = [];
    this.pathRef.current.setAttribute('d', 'M0 0Z');
  }

  onMouseEnterSelect = () => {
    this.setState({
      isExpandDropdown: true
    });
  };

  onMouseLeaveSelect = () => {
    this.setState({
      isExpandDropdown: false
    });
  };


  render() {
    const { name, isExpandDropdown } = this.state;
    return (
      <div className={`${prefixCls}`}>
        <div
          className={`${prefixCls}-select ${isExpandDropdown ? 'expand' : ''}`}
          onMouseEnter={this.onMouseEnterSelect}
          onMouseLeave={this.onMouseLeaveSelect}
        >
          {/* 展开追加expand */}
          <div className={`${prefixCls}-select-placeholder`}>
            <p className={`${prefixCls}-select-placeholder-text`}>{name}</p>
            <i className="icon-spr icon-spr-arrow2" />
          </div>
          <div className={`${prefixCls}-dropdown`}>
            <div className={`${prefixCls}-dropdown-hd`} />
            <div className={`${prefixCls}-dropdown-bd`}>
              <div className={`${prefixCls}-dropdown-item current`}>{name}</div>
            </div>
          </div>
        </div>
        <div className={`${prefixCls}-graph`}>
          <svg id="audioGraphSvg" width="294" height="104" viewBox="0 0 294 104" ref={this.svgRef}>
            <g id="audioGraphG" transform="scale(1, -1) translate(0, -52)">
              <path
                id="audioGraphPath"
                d="M0 0Z"
                strokeLinejoin="round"
                strokeWidth="2"
                fill="#66c7ff"
                stroke="#66c7ff"
                fillOpacity="0.55"
                strokeOpacity="0.6"
                ref={this.pathRef}
              />
            </g>
          </svg>
        </div>
      </div>
    );
  }
}
