import EventUtil from '@/utils/EventUtil';
import { debug } from '@/module/musics/scratch_audio/log';
import { runCode } from './Compiler';
import TimeUtil from '../utils/TimeUtil';
import { jsCallNative, JS_UNITY_CMD } from '../utils/NativeCall';
import { EDITOR_CALL } from './constant/index';
import InputUtil from './InputUtil';

export const BlockFuncApiCmd = {
  SendBroadcast: 'sendBroadcast',
  OnRecvBroadcast: 'onRecvBroadcast',
  OnStart: 'onStart',
  RandomNumber: 'randomNumber',
  Length: 'length',
  Concat: 'concat',
  Substring: 'substring',
  Includes: 'includes',
  MapNumber: 'mapNumber',
  CheckKeyWentDown: 'checkKeyWentDown',
  Print: 'print'
};

class BlockFuncApi {
  constructor() {
    // console.log('[BlockFuncApi].onCreate...');
    this.resetData();
    EventUtil.on(EDITOR_CALL.REPLAY_UNITY_DATA, this.updateUnityData);
    EventUtil.on(
      EDITOR_CALL.SYNC_INFRARED_DEPTH_SENSOR_DATA,
      this.syncInfraredDepthSensorData
    );
  }

  print = (msg) => {
    console.log(msg);
  };

  resetData = () => {
    this.unityData = {};
    this.cbKey2AsyncGetData = {};
    this.broadcastList = [];
    this.eventMap = {};
    this.conditionalInfraredDataCallbackList = [];
  };

  runCode = async (userCode) => {
    this.resetData();
    await runCode(this, userCode);
    this.notifyOnStart();
  };

  notifyOnStart = () => {
    const cbList = this.eventMap[BlockFuncApiCmd.OnStart];
    if (cbList) {
      cbList.forEach((callback) => {
        callback && callback();
      });
    }
  };

  updateUnityData = (data) => {
    if (!data) return;
    let { cbKey, value } = data;
    if (
      cbKey.startsWith('GetInfraredDepthSensorValue')
      || cbKey.startsWith('GetTargetRecognitionValue')
      || cbKey.startsWith('GetLongitudeOrLatitude')
      || cbKey.startsWith('GetPosition')
      || cbKey.startsWith('GetCountTime')
    ) {
      value = parseFloat(value);
    }
    this.unityData[cbKey] = value;

    /*
    console.log(
      `updateUnityData, updateUnityData, ckey = ${cbKey}, value=${value}`
    );
    */

    const promise = this.cbKey2AsyncGetData[cbKey];
    if (promise) {
      promise.resolve(value);
      delete this.cbKey2AsyncGetData[cbKey];
    }
  };

  /** ******************** 全局api **************************** */

  isRunning = () => TimeUtil.isRunning();

  wait = async delayTime => TimeUtil.wait(delayTime, null);

  waitForWhile = async () => TimeUtil.wait(0.01, null);

  callUnityApi = (cmd, ...args) => {
    jsCallNative(cmd, args);
  };

  callUnityApiUntilEnd = async (cmd, ...args) => {
    // 构建cbKey
    const cbKey = args.length === 0 ? cmd : cmd + args.join();
    jsCallNative(cmd, args, { cbKey });

    return new Promise((resolve, reject) => {
      this.cbKey2AsyncGetData[cbKey] = {
        resolve,
        reject
      };
    });
  };

  callJsApi = (cmd, ...args) => {
    let value;
    const apiFn = this[cmd];
    if (apiFn) {
      value = apiFn(...args);
    }
    return value;
  };

  notifyFunMainEnd = () => {
    this.callUnityApi('NotifyFunMainEnd');
  };

  /**
   * event相关api
   */
  sendBroadcast = (msg) => {
    this.broadcastList.forEach((bc) => {
      if (bc.msg === msg) {
        bc.callback();
      }
    });
  };

  onRecvBroadcast = (msg, callback) => {
    this.broadcastList.push({ msg, callback });
  };

  onStart = (callback) => {
    if (!this.eventMap[BlockFuncApiCmd.OnStart]) {
      this.eventMap[BlockFuncApiCmd.OnStart] = [];
    }
    this.eventMap[BlockFuncApiCmd.OnStart].push(callback);
  };

  /**
   * math相关api
   */
  randomNumber = (min, max) => min + Math.floor((max - min + 1) * Math.random());

  length = (s1) => {
    if (typeof s1 !== 'string') {
      s1 = String(s1);
    }
    return s1.length;
  };

  concat(...args) {
    return Array.prototype.slice.call(args).join('');
  }

  substring = (s1, start, count) => {
    if (typeof s1 !== 'string') {
      s1 = String(s1);
    }
    start = isNaN(start) ? 0 : Math.max(0, Number.parseInt(start));
    count = isNaN(count) ? 0 : Math.max(0, Number.parseInt(count));
    return s1.substring(start, start + count);
  };

  includes = (s1, s2) => {
    if (typeof s1 !== 'string') {
      s1 = String(s1);
    }
    return s1.includes(s2);
  };

  mapNumber = (ks, ke, vs, ve, key) => {
    let value = vs + ((ve - vs) * (key - ks)) / (ke - ks);
    if (isNaN(value)) {
      value = 0;
    }
    return value;
  };

  checkKeyWentDown = (btnType) => {
    jsCallNative(JS_UNITY_CMD.CheckKeyWentDown, btnType);
    return InputUtil.checkBoardBtnClick(btnType);
  };

  // // 结束
  // terminate = () => {
  //   console.log('[BlockFuncApi].terminate...');
  //   TimeUtil.stop();
  // };

  // // 重启
  // reboot = () => {
  //   console.log('[BlockFuncApi].reboot...');
  // };

  WhenInfraredDepthSensorValue = (direction, condition, value, callback) => {
    this.conditionalInfraredDataCallbackList.push({
      direction,
      condition,
      value,
      callback
    });
  };

  syncInfraredDepthSensorData = (data) => {
    for (
      let i = 0, len = this.conditionalInfraredDataCallbackList.length;
      i < len;
      i++
    ) {
      this.triggerInfraredDepthSensorDataCallback(
        data,
        this.conditionalInfraredDataCallbackList[i]
      );
    }
  };

  triggerInfraredDepthSensorDataCallback = (data, cbData) => {
    if (!data) return;
    let { direction, value } = data;
    value = parseFloat(value);

    if (!cbData) return;
    if (!cbData.callback) return;
    if (cbData.direction != direction) return;

    if (cbData.condition === '>=' && value >= cbData.value) {
      cbData.callback();
      return;
    }
    if (cbData.condition === '<=' && value <= cbData.value) {
      cbData.callback();
    }
  };
}

export default new BlockFuncApi();
