import { EventMsg } from '@/utils/EventMsg';
import EventUtil from '@/utils/EventUtil';
import { NCAll, UNITY_JS_CMD } from '@/utils/NativeCall';
import { throttle } from 'loadsh';

class UnityCallHandler {
  unpackDatas = {};

  listData = {};

  init = () => {
    EventUtil.on(NCAll.UNITY_CALL_JS, this.handleUnityCall);
  };

  handleUnityCall = (callData) => {
    const { args } = callData;
    if (args.length == 0) {
      return;
    }

    console.log("handleUnityCall args[0]: " + args[0]);

    const jsonArg = JSON.parse(args[0]);
    const { cmd, data, cbKey } = jsonArg;

    if (data && data.cbKey && data.cbKey != '') {
      console.log("handleUnityCall callback: " + data.cbKey);
      window[data.cbKey](data.value);
      return;
    }

    switch (cmd) {
      case UNITY_JS_CMD.Unpack:
        this.handleUnpack(data);
        break;
      case UNITY_JS_CMD.UpdateTabs:
        this.handleUpdateTabs(data);
        break;
      case UNITY_JS_CMD.ShowTab:
        this.handleShowTab(data);
        break;
      case UNITY_JS_CMD.StopRunning:
        this.handleStopRunning();
        break;
      case UNITY_JS_CMD.SetTaskConfig:
        this.handleSetTaskConfig(data);
        break;
      case UNITY_JS_CMD.UpdateRunningTime:
        this.handleUpdateRunningTime(data);
        break;
      case UNITY_JS_CMD.UpdateScore:
        this.handleUpdateScore(data);
        break;
      case UNITY_JS_CMD.UpdateTaskScore:
        this.handleUpdateTaskScore(data);
        break;
      case UNITY_JS_CMD.AddSensor:
        this.handleAddSensor(data);
        break;
      case UNITY_JS_CMD.UpdateTakePhotoBtn:
        this.handleUpdateTakePhotoBtn(data);
        break;
      case UNITY_JS_CMD.UpdateDevices:
        this.handleUpdateDevices(data);
        break;
      case UNITY_JS_CMD.UpdatePhotoData:
        this.handleUpdatePhotoData(data);
        break;
      case UNITY_JS_CMD.UpdateErrorTips:
        this.handleUpdateErrorTips(data);
        break;
      case UNITY_JS_CMD.UpdateCountdown:
        this.handleUpdateCountdown(data);
        break;
      case UNITY_JS_CMD.UpdateCountdownTimer:
        this.handleUpdateCountdownTimer(data);
        break;
      case UNITY_JS_CMD.UpdateStreamData:
        this.handleUpdateStreamData(data);
        break;
      case UNITY_JS_CMD.ResetVarAndList:
        this.handleResetVarAndList();
        break;
      case UNITY_JS_CMD.UpdateVarData:
        this.handleUpdateVarData(data);
        break;
      case UNITY_JS_CMD.UpdatePidVarData:
        this.handleUpdatePidVarData(data);
        break;
      case UNITY_JS_CMD.UpdateListData:
        this.handleUpdateListData(data);
        break;
      case UNITY_JS_CMD.SyncAudioSpectrogram:
        this.handleSyncAudioSpectrogram(data);
        break;
      case UNITY_JS_CMD.ShowTMAudioPanel:
        this.handleShowTMAudioPanel(data);
        break;
      case UNITY_JS_CMD.SetExerciseConfig:
        this.handleSetExerciseConfig(data);
        break;
      case UNITY_JS_CMD.UpdateRobotTextureData:
        this.handleRobotTextureData(data);
        break;
      case UNITY_JS_CMD.UpdateRobotInfoData:
        this.handleRobotInfoData(data);
        break;
      case UNITY_JS_CMD.NotifyProjectChanged:
        this.handleNotifyProjectChanged();
        break;
      case UNITY_JS_CMD.NotifyNocSaveProject:
        this.handleNotifyNocSaveProject(data, cbKey);
        break;
      case UNITY_JS_CMD.SetNocUrl:
        this.handleSetNocUrl(data);
        break;
      case UNITY_JS_CMD.UpdateCompetitionTimeConfig:
        this.handleUpdateCompetitionTimeConfig(data);
        break;
      case UNITY_JS_CMD.UpdateVideoProgress:
        this.handleUpdateVideoProgress(data);
        break;
      case UNITY_JS_CMD.MouseLeaveMultiPanels:
        this.handleMouseLeaveMultiPanels();
        break;
      case UNITY_JS_CMD.NotifyHover:
        this.handleNotifyHover(data);
        break;
      default:
        console.warn("unsupport cmd: " + cmd);
        break;
    }
  };

  handleUnpack = (data) => {
    if (!data) {
      return;
    }
    const {
      key, total, current, content
    } = data;
    if (!this.unpackDatas[key]) {
      this.unpackDatas[key] = '';
    }
    this.unpackDatas[key] += content;
    if (current == total) {
      const content = this.unpackDatas[key];
      delete this.unpackDatas[key];
      const calldata = { args: [content], ret: 0 };
      this.handleUnityCall(calldata);
    }
  };

  handleUpdateTabs = (data) => {
    if (!data) {
      return;
    }
    EventUtil.emit(EventMsg.UPDATE_TABS, data);
  };

  handleShowTab = (data) => {
    if (!data) {
      return;
    }
    EventUtil.emit(EventMsg.SHOW_TAB, data);
  };

  handleStopRunning = () => {
    EventUtil.emit(EventMsg.STOP_RUNNING);
  };

  handleSetTaskConfig = (data) => {
    if (!data) {
      return;
    }
    EventUtil.emit(EventMsg.SET_TASK_CONFIG, data);
  };

  handleUpdateRunningTime = (data) => {
    if (!data) {
      return;
    }
    EventUtil.emit(EventMsg.UPDATE_RUNNING_TIME, data);
  };

  handleUpdateScore = (data) => {
    if (!data) {
      return;
    }
    EventUtil.emit(EventMsg.UPDATE_SCORE, data);
  };

  handleUpdateTaskScore = (data) => {
    if (!data) {
      return;
    }
    EventUtil.emit(EventMsg.UPDATE_TASK_SCORE, data);
  };

  handleAddSensor = (data) => {
    if (!data) {
      return;
    }
    EventUtil.emit(EventMsg.ADD_SENSOR, data);
  };

  handleUpdateTakePhotoBtn = (data) => {
    if (!data) {
      return;
    }
    EventUtil.emit(EventMsg.UPDATE_TAKE_PHOTO_BTN, data);
  };

  handleUpdateDevices = (data) => {
    if (!data) {
      return;
    }
    EventUtil.emit(EventMsg.UPDATE_DEVICES, data);
  };

  handleUpdatePhotoData = (data) => {
    if (!data) {
      return;
    }
    EventUtil.emit(EventMsg.UPDATE_PHOTO_DATA, data);
  };

  handleUpdateErrorTips = (data) => {
    if (!data) {
      return;
    }
    EventUtil.emit(EventMsg.UPDATE_ERROR_TIPS, data);
  };

  handleUpdateCountdown = (data) => {
    if (!data) {
      return;
    }
    EventUtil.emit(EventMsg.UPDATE_COUNTDOWN, data);
  };

  handleUpdateCountdownTimer = (data) => {
    if (!data) {
      return;
    }
    EventUtil.emit(EventMsg.UPDATE_COUNTDOWN_TIMER, data);
  };

  handleUpdateStreamData = (data) => {
    if (!data) {
      return;
    }
    EventUtil.emit(EventMsg.UPDATE_STREAM_DATA, data);
  };

  handleResetVarAndList = () => {
    EventUtil.emit(EventMsg.RESET_VAR_AND_LIST);
  };

  handleUpdateVarData = (data) => {
    if (!data) {
      return;
    }

    EventUtil.emit(EventMsg.UPDATE_VAR_DATA, data);
  };

  handleUpdatePidVarData = (data) => {
    if (!data) {
      return;
    }

    EventUtil.emit(EventMsg.UPDATE_PID_VAR_DATA, data);
  };


  handleUpdateListData = (data) => {
    if (!data) {
      return;
    }
    this.listData = data;

    this.throttleUpdateListData();
  };

  throttleUpdateListData = throttle(() => {
    EventUtil.emit(EventMsg.UPDATE_LIST_DATA, this.listData);
  }, 1000, { leading: true, trailing: true });

  handleSyncAudioSpectrogram = (data) => {
    if (!data) {
      return;
    }
    console.log('handleSyncAudioSpectrogram', data);
    EventUtil.emit(EventMsg.SYNC_AUDIO_SPECTROGRAM, data);
  };

  handleShowTMAudioPanel = (data) => {
    console.log('handleShowTMAudioPanel', data);
    EventUtil.emit(EventMsg.SHOW_TM_AUDIO_PANEL, data);
  };

  handleSetExerciseConfig = (data) => {
    if (!data) {
      return;
    }
    EventUtil.emit(EventMsg.SET_EXERCISE_CONFIG, data);
  };

  handleNotifyProjectChanged = () => {
    EventUtil.emit(EventMsg.NOTIFY_PROJECT_CHANGED);
  };

  handleNotifyNocSaveProject = (data, cbKey) => {
    if (!data) {
      return;
    }
    data['cbKey'] = cbKey;
    EventUtil.emit(EventMsg.NOTIFY_NOC_SAVE_PROJECT, data);
  };

  handleSetNocUrl = (data) => {
    if (!data) {
      return;
    }
    EventUtil.emit(EventMsg.SET_NOC_URL, data);
  };

  handleRobotTextureData = (data) => {
    if (!data) return;
    EventUtil.emit(EventMsg.UPDATE_ROBOT_TEXTURE, data);
  };

  handleRobotInfoData = (data) => {
    if (!data) return;
    EventUtil.emit(EventMsg.UPDATE_ROBOT_INFO, data);
  };

  handleUpdateCompetitionTimeConfig = (data) => {
    if (!data) return;
    EventUtil.emit(EventMsg.UPDATE_COMPETITION_TIME_CONFIG, data);
  };

  handleUpdateVideoProgress = (data) => {
    if (!data) return;
    EventUtil.emit(EventMsg.UPDATE_VIDEO_PROGRESS, data);
  };

  handleMouseLeaveMultiPanels = () => {
    EventUtil.emit(EventMsg.MOUSE_LEAVE_MULTI_PANELS);
  };
  
  handleNotifyHover = (data) => {
    console.log('handle notify hover: ' + data.isHover);
    EventUtil.emit(EventMsg.SWITCH_HOVER, data);
  }
}

export default UnityCallHandler;
