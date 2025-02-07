import EventUtil from './EventUtil';

export const NCAll = {
  UNITY_CALL_JS: 'unityCallJS',
  JS_CALL_UNITY: 'jsCallUntiy'
};

// cmd: unity call js
export const UNITY_JS_CMD = {
  Unpack: 'Unpack',
  StartRun: 'StartRun',
  StopRun: 'StopRun',
  ReplyUnityData: 'ReplyUnityData',
  GetBlockXml: 'GetBlockXml',
  SetBlockXml: 'SetBlockXml',
  GetBlockCode: 'GetBlockCode',
  BoardBtnAction: 'BoardBtnAction',
  SetLearnedColorDropdown: 'SetLearnedColorDropdown',
  SyncInfraredDepthSensorData: 'SyncInfraredDepthSensorData',
  SetAudio: 'SetAudio',
  RespFeaturePermissionResult: 'RespFeaturePermissionResult',
  RespConfirmResult: 'RespConfirmResult',
  SetBlockDropdownList: 'SetBlockDropdownList',
  UpdateModelLists: 'UpdateModelLists',
  NotifyRobotType: 'NotifyRobotType',
  ForbidBlockly: 'ForbidBlockly',
  EnableDebug: 'EnableDebug',
  DisableDebug: 'DisableDebug',
  EnableDebug: 'EnableDebug',
  DisableDebug: 'DisableDebug',
  ClearBlockEditor: 'ClearBlockEditor',
  NotifyBlocklyToolboxPermission: 'NotifyBlocklyToolboxPermission',
  GetCompleteXml: 'GetCompleteXml',
  RefreshDataSet: 'RefreshDataSet',
  UpdateCompileErrorInfo: 'UpdateCompileErrorInfo',
  CenterOnErrorBlock: 'CenterOnErrorBlock',
  // insert UNITY_JS_CMD mark
};

// cmd: js call unity
export const JS_UNITY_CMD = {
  // 系统api调用
  QuitApp: 'QuitApp',
  ModifyBlockXml: 'ModifyBlockXml',

  // 积木api调用
  // 运动（motion）
  SetMotionMode: 'SetMotionMode',
  RotateUntilEnd: 'RotateUntilEnd',
  SetRotation: 'SetRotation',
  SetRateInFoot: 'SetRateInFoot',
  SetRateAndTimeInFoot: 'SetRateAndTimeInFoot',
  JumpInFoot: 'JumpInFoot',
  BackflipInFoot: 'BackflipInFoot',
  SetRateInWheel: 'SetRateInWheel',
  SetRateAndTimeInWheel: 'SetRateAndTimeInWheel',
  StopMotion: 'StopMotion',
  GetDirection: 'GetDirection',
  FaceToPosition: 'FaceToPosition',

  // 神态（animation）
  PlaySurPlace: 'PlaySurPlace',
  PlayTumble: 'PlayTumble',
  PlayRedEnvelope: 'PlayRedEnvelope',
  PlayDoubt: 'PlayDoubt',
  PlayNod: 'PlayNod',
  PlayDown: 'PlayDown',
  PlaySit: 'PlaySit',
  PlayRoll: 'PlayRoll',
  PlayHandShake: 'PlayHandShake',
  PlayDance: 'PlayDance',
  PlayFear: 'PlayFear',
  PlayHappy: 'PlayHappy',
  PlayBrake: 'PlayBrake',
  PlayChaseTail: 'PlayChaseTail',

  // 感知（sensor）
  EnableInfraredDepthSensor: 'EnableInfraredDepthSensor',
  GetInfraredDepthSensorValue: 'GetInfraredDepthSensorValue',
  WhenInfraredDepthSensorValue: 'WhenInfraredDepthSensorValue',
  EnableTerrainAwareness: 'EnableTerrainAwareness',
  GetTerrainAwarenessValue: 'GetTerrainAwarenessValue',
  CheckTerrainValue: 'CheckTerrainValue',
  GetLongitudeOrLatitude: 'GetLongitudeOrLatitude',
  CheckIfPassCoordinate: 'CheckIfPassCoordinate',
  GetPosition: 'GetPosition',
  GetCountTime: 'GetCountTime',
  ResetCountTime: 'ResetCountTime',
  TakePhoto: 'TakePhoto',
  RecordVideo: 'RecordVideo',

  // 智能（ai）
  EnableTargetRecognition: 'EnableTargetRecognition',
  GetTargetRecognitionCount: 'GetTargetRecognitionCount',
  GetTargetRecognitionValue: 'GetTargetRecognitionValue',
  CheckTargetRecognized: 'CheckTargetRecognized',
  SetAiMode: 'SetAiMode',
  GetAiTrafficSensorType: 'GetAiTrafficSensorType',
  GetAiRoadOffset: 'GetAiRoadOffset',
  GetAiTagData: 'GetAiTagData',
  GetAiObstacleTopEdgeValue: 'GetAiObstacleTopEdgeValue',

  // 扩展机构（extension）
  ActiveRobotArm: 'ActiveRobotArm',
  CheckRobotArmStatus: 'CheckRobotArmStatus',
  MovePincher: 'MovePincher',
  StoreItemInPincher: 'StoreItemInPincher',
  LoadItemFromPincher: 'LoadItemFromPincher',

  // 权限查询
  QueryFeaturePermission: 'QueryFeaturePermission',

  // 显示弹框
  ShowDialog: 'ShowDialog',

  // 打开Teachable Machine训练页面
  OpenTeachableMachineProjectList: 'OpenTeachableMachineProjectList',
  ExportModelToTGE: 'ExportModelToTGE',


  // dropdown unknown
  NotifyDropdownUnknown: 'NotifyDropdownUnknown', // [block id, hasUnknown]
  NotifyDropdownUnknowns: 'NotifyDropdownUnknowns',
  // insert JS_UNITY_CMD mark

  // dataSetList
  NotifyAddDataSet: 'NotifyAddDataSet',
  NotifyDelDataSet: 'NotifyDelDataSet'
};

function unityCallJS(...args) {
  // console.log('[unityCallJS] called', ...args);
  const calldata = { args, ret: 0 };
  EventUtil.emit(NCAll.UNITY_CALL_JS, calldata);
  return { value: calldata.ret };
}

async function sendMsgToZFBrowser(...args) {
  await waitJSCallUnityInit();
  if (window[NCAll.JS_CALL_UNITY]) {
    console.log('[sendMsgToZFBrowser] called', ...args);
    window[NCAll.JS_CALL_UNITY](...args);
  } else {
    console.error('[sendMsgToZFBrowser] global func not exist');
  }
}

export function jsCallNative(cmd, args, param = null) {
  // console.log(`[jsCallNative] ${cmd}`);
  sendMsgToZFBrowser(cmd, args, param);
}

function waitJSCallUnityInit() {
  if (window[NCAll.JS_CALL_UNITY]) {
    return Promise.resolve();
  }
  return new Promise((resolve) => {
    const checkJSCallUnityInit = setInterval(() => {
      if (window[NCAll.JS_CALL_UNITY]) {
        clearInterval(checkJSCallUnityInit);
        resolve();
      }
    }, 100);
  });
}

window[NCAll.UNITY_CALL_JS] = unityCallJS;
window.disableAudio = false;
window.audioVolume = 1.0;
