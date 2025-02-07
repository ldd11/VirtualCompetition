import React, { Component } from 'react';
import { defaultDevices } from '@/config/deviceConfig';
import { defaultItemKeys } from '@/config/itemConfig';
import { EventMsg } from '@/utils/EventMsg';
import EventUtil from '@/utils/EventUtil';
import { jsCallNative, JS_UNITY_CMD } from '@/utils/NativeCall';
import Empty from '../Empty/index';
import './index.less';

const prefixCls = 'camera';

// 摄像头组件组件
class Camera extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sensorType: props.type,
      showTakePhotoBtn: false,
      deviceNames: [],
      selectedDeviceName: '',
      streamData: '',
      photoData: '',
      showCountDown: false,
      countDownTimer: 0,
      isExpandDropdown: false,
      showErrorTips: false
    };
  }

  componentDidMount() {
    EventUtil.on(EventMsg.UPDATE_TAKE_PHOTO_BTN, this.updateTakePhotoBtn);
    EventUtil.on(EventMsg.UPDATE_DEVICES, this.updateDevices);
    EventUtil.on(EventMsg.UPDATE_PHOTO_DATA, this.updatePhotoData);
    EventUtil.on(EventMsg.UPDATE_ERROR_TIPS, this.updateErrorTips);
    EventUtil.on(EventMsg.UPDATE_COUNTDOWN, this.updateCountdown);
    EventUtil.on(EventMsg.UPDATE_COUNTDOWN_TIMER, this.updateCountdownTimer);
    EventUtil.on(EventMsg.UPDATE_STREAM_DATA, this.updateStreamData);
  }

  componentWillUnmount() {
    EventUtil.off(EventMsg.UPDATE_TAKE_PHOTO_BTN, this.updateTakePhotoBtn);
    EventUtil.off(EventMsg.UPDATE_DEVICES, this.updateDevices);
    EventUtil.off(EventMsg.UPDATE_PHOTO_DATA, this.updatePhotoData);
    EventUtil.off(EventMsg.UPDATE_ERROR_TIPS, this.updateErrorTips);
    EventUtil.off(EventMsg.UPDATE_COUNTDOWN, this.updateCountdown);
    EventUtil.off(EventMsg.UPDATE_COUNTDOWN_TIMER, this.updateCountdownTimer);
    EventUtil.off(EventMsg.UPDATE_STREAM_DATA, this.updateStreamData);
  }

  updateTakePhotoBtn = (data) => {
    if (!data) {
      return;
    }

    const { sensorType, show } = data;
    if (sensorType != this.state.sensorType) {
      return;
    }

    this.setState({
      showTakePhotoBtn: show
    });
  };

  updateDevices = (data) => {
    if (!data) {
      return;
    }

    const { sensorType, selectedDeviceName, deviceNames } = data;
    if (sensorType != this.state.sensorType) {
      return;
    }

    this.setState({
      selectedDeviceName,
      deviceNames
    });

    const { isExpandDropdown } = this.state;
    if (isExpandDropdown && deviceNames.length < 2)
    {
      this.setState({
        isExpandDropdown: false
      });
    }
  };

  updatePhotoData = (data) => {
    if (!data) {
      return;
    }

    const { sensorType, base64Str } = data;
    if (sensorType != this.state.sensorType) {
      return;
    }

    this.setState({
      photoData: base64Str
    });
  };

  updateErrorTips = (data) => {
    if (!data) {
      return;
    }

    const { sensorType, show } = data;
    if (sensorType != this.state.sensorType) {
      return;
    }

    this.setState({
      showErrorTips: show
    });
  };

  updateCountdown = (data) => {
    if (!data) {
      return;
    }

    const { sensorType, show } = data;
    if (sensorType != this.state.sensorType) {
      return;
    }

    this.setState({
      showCountDown: show
    });
  };

  updateCountdownTimer = (data) => {
    if (!data) {
      return;
    }

    const { sensorType, time } = data;
    if (sensorType != this.state.sensorType) {
      return;
    }

    this.setState({
      countDownTimer: time
    });
  };

  updateStreamData = (data) => {
    if (!data) {
      return;
    }

    const { sensorType, base64Str } = data;
    if (sensorType != this.state.sensorType) {
      return;
    }

    this.setState({
      streamData: base64Str
    });
  };

  clickTakePhotoBtn = () => {
    this.setState({
      showTakePhotoBtn: false
    });

    const { sensorType } = this.state;
    jsCallNative(JS_UNITY_CMD.ClickTakePhotoBtn, { sensorType });
  };

  clickDropDownItem = (deviceName) => {
    this.setState({
      selectedDeviceName: deviceName
    });

    const { sensorType } = this.state;
    jsCallNative(JS_UNITY_CMD.SelectDevice, { sensorType, deviceName });
  };

  getOnesDigit = number => number % 10;

  getTensDigit = number => parseInt(number / 10);

  onMouseEnterSelect = () => {
    const { deviceNames } = this.state;
    if (deviceNames.length > 1) {
      this.setState({
        isExpandDropdown: true
      });
    }
  };

  onMouseLeaveSelect = () => {
    this.setState({
      isExpandDropdown: false
    });
  };

  render() {
    const {
      sensorType, showTakePhotoBtn, selectedDeviceName, deviceNames, streamData, photoData, showCountDown, countDownTimer, isExpandDropdown, showErrorTips
    } = this.state;

    return (
      <div className={`${prefixCls}`}>
        {
          (sensorType == defaultDevices.UsbCamera && !showErrorTips) ? (
            <div className={`${prefixCls}-hd`}>
              <div
                className={`${prefixCls}-select ${isExpandDropdown ? 'expand' : ''}`}
                onMouseEnter={this.onMouseEnterSelect}
                onMouseLeave={this.onMouseLeaveSelect}
              >
                <div className={`${prefixCls}-select-placeholder`}>
                  <p className={`${prefixCls}-select-placeholder-text`}>{selectedDeviceName}</p>
                  {
                    deviceNames.length > 1 ? <i className="icon-spr icon-spr-arrow2" /> : null
                  }
                </div>
                <div className={`${prefixCls}-dropdown`}>
                  <div className={`${prefixCls}-dropdown-hd`} />
                  <div className={`${prefixCls}-dropdown-bd`}>
                    {
                      deviceNames.map((deviceName, index) => (
                        <div className={`${prefixCls}-dropdown-item${deviceName == selectedDeviceName ? ' current' : ''}`} key={index} onClick={this.clickDropDownItem.bind(this, deviceName)}>{deviceName}</div>
                      ))
                    }
                  </div>
                </div>
              </div>
              {
                showTakePhotoBtn ? (
                  <div className={`${prefixCls}-ctrls`} onClick={this.clickTakePhotoBtn}>
                    <div className={`${prefixCls}-ctrls-btn`}>拍照</div>
                  </div>
                ) : null
              }
            </div>
          ) : null
        }
        {
          (sensorType == defaultDevices.VirtualCamera && showTakePhotoBtn) ? (
            <div className={`${prefixCls}-hd`}>
              <div className={`${prefixCls}-hd-zhanwei`} />
              <div className={`${prefixCls}-ctrls`} onClick={this.clickTakePhotoBtn}>
                <div className={`${prefixCls}-ctrls-btn`}>拍照</div>
              </div>
            </div>
          ) : null
        }
        <div className={`${prefixCls}-bd`}>
          <div className={`${prefixCls}-content`}>
            <div className={`${prefixCls}-content-xiushi`} />
            <div className={`${prefixCls}-content-player`}>
              {
                sensorType == defaultDevices.VirtualCamera ? (
                  streamData == '' ? null
                    : <img className={`${prefixCls}-content-player-pic`} src={streamData} />
                ) : (
                  (deviceNames.length > 0 && !showErrorTips) ? (
                    streamData == '' ? null
                      : <img className={`${prefixCls}-content-player-pic`} src={streamData} />
                  ) : (
                    deviceNames.length == 0 ? <Empty title={`未找到${defaultItemKeys[sensorType]}`} des="请检查你的本地设备" />
                     : <Empty title={`${defaultItemKeys[sensorType]}被其他应用占用`} des="请检查并关闭其他应用" />
                  )
                )
              }
            </div>
            {
              showCountDown ? (
                <div className={`${prefixCls}-countdown`}>
                  <p className={`${prefixCls}-countdown-title`}>倒计时后拍照</p>
                  <div className={`${prefixCls}-countdown-item`}>
                    <span className={`${prefixCls}-countdown-item-num num-${this.getTensDigit(countDownTimer)}`} />
                    <span className={`${prefixCls}-countdown-item-num num-${this.getOnesDigit(countDownTimer)}`} />
                  </div>
                </div>
              ) : null
            }
            {
              photoData != '' ? (
                <div className={`${prefixCls}-thumbnail`}>
                  <img className={`${prefixCls}-thumbnail-pic`} src={photoData} alt="" />
                </div>
              ) : null
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Camera;
