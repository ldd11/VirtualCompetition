import { EDITOR_CALL } from '@/runtime/constant/index';
import EventUtil from './EventUtil';

const KEY2BLOCKNAME = {
  virtual_camera: [
    'takePhotoByVirtualCamera',
    'setSensorOn',
    'getRecognizedTrafficLightCount',
    'getRecognizedTrafficLightInfo',
    'getRecognizedHumanCount',
    'getRecognizedHumanName',
    'getRecognizedHumanInfo',
    'setRoadRecognizeColor',
    'getRecognizedRoadLineCount',
    'isRecognizeRoadLineType',
    'getRecognizedRoadLineInfo',
    'getRecognizedTrafficSignCount',
    'getRecognizedTrafficSignInfo',
    'getRecognizedItemCount',
    'getRecognizedItemName',
    'getRecognizedItemInfo',

  ],
  LIGHTSDISPLAY: [
    'LEDSetColor',
    'LEDSetColorWithSecond',
    'LEDSetRgb',
    'LEDSetRgbWithSecond',
    'LEDAddBrightness',
    'LEDSetBrightness',
    'LEDGetBrightness'
  ],
  DISPLAYSCREEN: [
    'LCDClear',
    'setLCDBackground',
    'setLCDFont',
    'rotateLCDFont',
    'LCDPrint',
    'LCDPrintln',
    'LCDShowStringOnNthLine'
  ],
  DISPLAYSCREENMIDDLE: [
    'LCDClear',
    'setLCDBackground',
    'setLCDFont',
    'rotateLCDFont',
    'LCDPrint',
    'LCDPrintln',
    'LCDShowStringOnNthLine'
  ],
  ENCODINGMOTOR: [
    'MotorRotate',
    'MotorRotateWithSecond',
    'MotorRotateWithAngle'
  ],
  GYROSCOPE: [
    'getGyroscopeValue'
  ],
  TEMPERATURE_SENSOR: [
    'getTemperatureValue'
  ],
  LIGHT_SENSOR: [
    'getLightValue'
  ],
  HUMIDITY_SENSOR: [
    'getHumidityValue'
  ],
  WHEEL_POWER: [
    'WHEEL_POWER'
  ],
  GPS: [
    'getGPSValue'
  ],
  INFRARED_SENSOR: [
    'getInfraredValue'
  ],
  DUCTED_FAN: [
    'DuctedFanOutputPower',
    'DuctedFanSetOutputPowerAngle'
  ],
  FULL_ARM: [
    'moveArmPincher'
  ],
  CO2_SENSOR: [
    'getCO2Value'
  ],
  SO2_SENSOR: [
    'getSO2Value'
  ],
  NOISE_SENSOR: [
    'getNoiseValue'
  ],
  SERVO: [
    'ServoRotateTo',
    'ServoRotate',
    'GetServoRotation'
  ],
  // tm_model_list_image: [
  //   'startTMPredictImage',
  //   'getTMPredictImageResult',
  //   'checkTMPredictImageResultBool',
  //   'getTMPredictImageResultProbability'
  // ],
  // tm_model_list_audio: [
  //   'startTMPredictAudio',
  //   'getTMPredictAudioResult',
  //   'checkTMPredictAudioResultBool',
  //   'getTMPredictAudioResultProbability'
  // ],
  // tm_model_list_pose: [
  //   'startTMPredictPose',
  //   'getTMPredictPoseResult',
  //   'checkTMPredictPoseResultBool',
  //   'getTMPredictPoseResultProbability'
  // ],
};

const KEY2INPUTNAME = {
  virtual_camera: 'camera',
  LIGHTSDISPLAY: 'LED',
  DISPLAYSCREEN: 'LCD',
  DISPLAYSCREENMIDDLE: 'LCD',
  ENCODINGMOTOR: 'MOTOR',
  GYROSCOPE: 'id', // 陀螺仪
  TEMPERATURE_SENSOR: 'id', // 温度模块
  LIGHT_SENSOR: 'id', // 温度感知模块
  HUMIDITY_SENSOR: 'id', // 湿度感知模块
  WHEEL_POWER: 'id', // 动力轮
  GPS: 'id', // GPS传感器
  INFRARED_SENSOR: 'id', // 红外测距传感器
  DUCTED_FAN: 'id', // 涵道风扇
  FULL_ARM: 'id', // 完整机械臂
  CO2_SENSOR: 'id',
  SO2_SENSOR: 'id',
  NOISE_SENSOR: 'id', // 噪声传感器
  SERVO: 'id',
  // tm_model_list_image: 'model_type',
  // tm_model_list_audio: 'model_type',
  // tm_model_list_pose: 'model_type',
};

class DropdownUtil {
  dropdownMap = {};

  setDropdownList(key, list, check = true) {
    let oldList = this.dropdownMap[key] || [['?', '?']];
    this.dropdownMap[key] = list.length === 0 ? [['?', '?']] : list;

    const blockNameList = KEY2BLOCKNAME[key];
    const inputName = KEY2INPUTNAME[key];

   console.log(`[DropdownUtil].update dropdown list ${key} ${blockNameList} ${inputName}`, check);

    if (check) {
      if (blockNameList && inputName) {
        if (key == 'DISPLAYSCREEN') {
          const anotherList = this.dropdownMap.DISPLAYSCREENMIDDLE || [];
          oldList = oldList.concat(anotherList);
          list = list.concat(anotherList);
        }

        if (key == 'DISPLAYSCREENMIDDLE') {
          const anotherList = this.dropdownMap.DISPLAYSCREEN || [];
          oldList = oldList.concat(anotherList);
          list = list.concat(anotherList);
        }

        console.log('[DropdownUtil] update dropdown for key: ', key);
        EventUtil.emit(EDITOR_CALL.UPDATE_DROPDOWN_VALUE, {
          blockNameList,
          inputName,
          list,
          oldList
        });
      } else {
        console.warn(`[DropdownUtil] no blockNameList or inputName for key: ${key}`);
        EventUtil.emit(EDITOR_CALL.UPDATE_DROPDOWN_EXT);
      }
    }

    console.log(`[DropdownUtil].update dropdown list done, key = ${key}; list = ${list}`);
  }

  getDropdownList(key) {
    // console.log("[DropdownUtil].getDropdownList key = "+key +"; value = " + this.dropdownMap[key]+"; timestamp = " + new Date().getTime());
    return this.dropdownMap[key] || null;
  }
}

export default new DropdownUtil();
