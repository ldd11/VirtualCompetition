import React, { Component } from 'react';
import './index.less';
import EventUtil from '@/utils/EventUtil';
import { EventMsg } from '@/utils/EventMsg';
import { JS_UNITY_CMD, jsCallNative } from '@/utils/NativeCall';

const prefixCls = 'countdown';

class Countdown extends Component {
  constructor() {
    super();

    this.state = {
      nowTime: 0,
      endCreationTime: 0,
      endSubmitTime: 0,
      taskTime: -1,
    };

    this.intervalId = -1;
  }

  componentDidMount() {
    EventUtil.on(EventMsg.UPDATE_COMPETITION_TIME_CONFIG, this.updateCompetitionTimeConfig);
    EventUtil.on(EventMsg.GET_NOW_TIME_RESULT, this.onGetNowTimeResult);
  }

  componentWillUnmount() {
    EventUtil.off(EventMsg.UPDATE_COMPETITION_TIME_CONFIG, this.updateCompetitionTimeConfig);
    EventUtil.off(EventMsg.GET_NOW_TIME_RESULT, this.onGetNowTimeResult);
  }

  updateCompetitionTimeConfig = (data) => {
    if (!data) {
      return;
    }

    const {
      endCreationTime,
      endSubmitTime,
      taskTime,
    } = data;

    this.setState({
      endCreationTime,
      endSubmitTime,
      taskTime
    }, () => {
      this.getNowTime();
    });
  };

  getNowTime = () => {
    jsCallNative(JS_UNITY_CMD.GetNowTime, {}, { cbKey: 'jsCallUnityGetNowTimeResult' });

    window.jsCallUnityGetNowTimeResult = function(value) {
      if (!value) {
        return;
      }

      EventUtil.emit(EventMsg.GET_NOW_TIME_RESULT, value);
    };
  };

  onGetNowTimeResult = (data) => {
    if (!data) {
      return;
    }

    const {
      nowTime
    } = data;
    console.log(`GetTimeResult nowTime: ${nowTime}`);

    this.setState({
      nowTime
    }, () => {
      this.startInterval();
      this.showCountdownToast();
    });
  };

  startInterval = () => {
    if (this.intervalId != -1) {
      clearInterval(this.intervalId);
    }

    this.intervalId = setInterval(this.updateNowTime, 1000);
  };

  updateNowTime = () => {
    const {
      nowTime
    } = this.state;

    this.setState({
      nowTime: nowTime + 1
    }, this.showCountdownToast);
  };

  showCountdownToast = () => {
    const {
      nowTime,
      endSubmitTime,
      taskTime
    } = this.state;

    if (taskTime <= 0 || nowTime <= 0 || endSubmitTime <= 0) {
      return;
    }

    let leftTime = endSubmitTime - nowTime;
    if (leftTime == taskTime || leftTime == 2 * taskTime) {
      jsCallNative(JS_UNITY_CMD.NocShowToast, { content: `距离提交截止还剩 ${Math.floor(leftTime / 60)}分${leftTime % 60}秒`, time: 4 });
    }
  };

  checkIfShowCountdown = () => {
    const {
      nowTime,
      endCreationTime
    } = this.state;

    return nowTime > 0 && (endCreationTime - nowTime >= 0) && (endCreationTime - nowTime <= 86400);
  };

  formatTime = (totalSeconds) => {
    if (totalSeconds <= 0) {
      return '00:00:00';
    }

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  render() {
    const {
      nowTime,
      endCreationTime
    } = this.state;

    return (<div>
      {
        this.checkIfShowCountdown() ? <div className={`${prefixCls}`}>
          <div className={`${prefixCls}-hd`}>
            <i className={`${prefixCls}-hd-icon`} />
            <p className={`${prefixCls}-hd-text`}>倒计时归零后，将无法创作作品</p>
          </div>
          <div className={`${prefixCls}-bd`}>{this.formatTime(endCreationTime - nowTime)}</div>
        </div> : null
      }
    </div>);
  }
}
export default Countdown;
