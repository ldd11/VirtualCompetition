import EventUtil from './EventUtil';

export const NCAll = {
  UNITY_CALL_JS: 'unityCallJS',
  JS_CALL_UNITY: 'jsCallUntiy'
};

// cmd: unity call js
export const UNITY_JS_CMD = {
  Unpack: 'Unpack', // 拆包
  UpdateTabs: 'UpdateTabs', // 更新tabs
  ShowTab: 'ShowTab', // 显示tab
  StopRunning: 'StopRunning', // 停止运行
  SetTaskConfig: 'SetTaskConfig', // 设置任务配置
  UpdateRunningTime: 'UpdateRunningTime', // 更新运行时间
  UpdateScore: 'UpdateScore', // 更新得分
  UpdateTaskScore: 'UpdateTaskScore', // 更新任务得分
  AddSensor: 'AddSensor', // 添加传感器
  UpdateTakePhotoBtn: 'UpdateTakePhotoBtn', // 更新拍照按钮
  UpdateDevices: 'UpdateDevices', // 更新设备列表
  UpdatePhotoData: 'UpdatePhotoData', // 更新照片信息
  UpdateErrorTips: 'UpdateErrorTips', // 更新错误提示
  UpdateCountdown: 'UpdateCountdown', // 更新倒计时面板
  UpdateCountdownTimer: 'UpdateCountdownTimer', // 更新倒计时时间
  UpdateStreamData: 'UpdateStreamData', // 更新推流图像
  ResetVarAndList: 'ResetVarAndList', // 重置变量/列表数据
  UpdateVarData: 'UpdateVarData', // 更新变量数据
  UpdatePidVarData: 'UpdatePidVarData', // 更新Pid变量数据
  UpdateListData: 'UpdateListData', // 更新列表数据
  SyncAudioSpectrogram: 'SyncAudioSpectrogram', // 同步音频频谱,
  ShowTMAudioPanel: 'ShowTMAudioPanel', // 显示语音识别面板
  SetExerciseConfig: 'SetExerciseConfig', // 设置作业配置
  UpdateRobotTextureData: 'UpdateRobotTextureData', // 更新机器人视图
  UpdateRobotInfoData: 'UpdateRobotInfoData', // 更新机器人信息
  NotifyProjectChanged: 'NotifyProjectChanged', // 通知作品更改
  NotifyNocSaveProject: 'NotifyNocSaveProject', // 通知保存作品
  SetNocUrl: 'SetNocUrl', // 设置Noc链接
  UpdateCompetitionTimeConfig: 'UpdateCompetitionTimeConfig', // 更新赛事时间配置
  UpdateVideoProgress: 'UpdateVideoProgress', // 更新视频进度
  MouseLeaveMultiPanels: 'MouseLeaveMultiPanels', // 鼠标离开多面板
  NotifyHover: 'NotifyHover', // 通知鼠标hover状态切换
};


// cmd: js call unity
export const JS_UNITY_CMD = {
  ExpandMultiPanels: 'ExpandMultiPanels', // 展开多面板
  CollapseMultiPanels: 'CollapseMultiPanels', // 收起多面板
  ClickTakePhotoBtn: 'ClickTakePhotoBtn', // 点击拍照按钮
  SelectDevice: 'SelectDevice', // 选中某设备
  SwitchTab: 'SwitchTab', // 切换tab
  SwitchLargeMultiPanelsWindow: 'SwitchLargeMultiPanelsWindow', // 切换大页面窗口
  SwitchSmallMultiPanelsWindow: 'SwitchSmallMultiPanelsWindow', // 切换小页面窗口
  NocImportProject: 'NocImportProject', // 导入作品
  NocGetUserAnswer: 'NocGetUserAnswer', // 获取用户作品
  NocShowDialog: 'NocShowDialog', // 显示对话框
  NocHideDialog: 'NocHideDialog', // 隐藏对话框
  NocShowToast: 'NocShowToast', // 显示Toast
  NocShowLoading: 'NocShowLoading', // 显示Loading
  NocHideLoading: 'NocHideLoading', // 隐藏Loading
  NocGoHome: 'NocGoHome', // 返回首页
  NocOpenLink: 'NocOpenLink', // 打开链接
  NocDownloadMatchAnswerRecord: 'NocDownloadMatchAnswerRecord', // 客户端下载赛事答题记录
  NocNotifyOnlineAnswerPaperSubmited: 'NocNotifyOnlineAnswerPaperSubmited', // 客户端通知在线答题已提交
  NocRequireSubmitOnlineAnswerPaper: 'NocRequireSubmitOnlineAnswerPaper', // 请求客户端交卷
  NocCheckImport: 'NocCheckImport', // 检查客户端是否可导入
  NocResetContentChange: 'NocResetContentChange', // 重置客户端内容变化状态
  GetNowTime: 'GetNowTime', // 获取当前时间
  ShowVideo: 'ShowVideo', // 显示视频
  HideVideo: 'HideVideo', // 隐藏视频
  ReloadDefaultJobProject:'ReloadDefaultJobProject',// 作业重置到老师配置的默认题目
};

function unityCallJS(...args) {
  const calldata = { args, ret: 0 };
  EventUtil.emit(NCAll.UNITY_CALL_JS, calldata);
  return { value: calldata.ret };
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
  sendMsgToZFBrowser(cmd, args, param);
}

window[NCAll.UNITY_CALL_JS] = unityCallJS;
