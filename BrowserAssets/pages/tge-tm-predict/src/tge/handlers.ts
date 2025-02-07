import eventEmitter from '../utils/event_emitter';

window.unpackDatas = {};

window.AddPythonOutput = function (output: string) {
  eventEmitter.emit('AddPythonOutput', output);
};

window.AddPythonError = function (error: string) {
  eventEmitter.emit('AddPythonError', error);
};

window.AddWebEditorOutput = function (data: any) {
  eventEmitter.emit('AddWebEditorOutput', data);
};

window.SetPythonCode = function (data: { code: string, toolbox: string }) {
  console.error('SetPythonCode', data);
  eventEmitter.emit('SetPythonCode', data.code);
  eventEmitter.emit('UpdateBlockList', JSON.parse(data.toolbox).blocks);
};

window.ClearPythonOutput = function () {
  eventEmitter.emit('ClearPythonOutput');
};

window.TMPredict = function (data: any) {
  eventEmitter.emit('TMPredict', data);
}

window.TMPredictImage = function (data: any, cbKey: string) {
  console.error('TMPredictImage', data, cbKey);
  eventEmitter.emit('TMPredictImage', data, cbKey);
}

window.TMPredictPose = function (data: any, cbKey: string) {
  console.error('TMPredictPose', data, cbKey);
  eventEmitter.emit('TMPredictPose', data, cbKey);
}

window.TMPredictAudio = function (data: any, cbKey: string) {
  console.error('TMPredictAudio', data, cbKey);
  eventEmitter.emit('TMPredictAudio', data, cbKey);
}

window.TMClearLoadedModels = function (data: any) {
  console.error('TMClearLoadedModels', data);
  eventEmitter.emit('TMClearLoadedModels', data);
}


window.Unpack = function (data: any) {
  if (!data) {
    return;
  }
  const {
    key, total, current, content
  } = data;
  if (!window.unpackDatas[key]) {
    window.unpackDatas[key] = "";
  }
  window.unpackDatas[key] += content;
  if (current == total) {
    let content = window.unpackDatas[key];
    window.unpackDatas = {};
    const calldata = { args: [content], ret: 0 };
    window.handleUnityCall(calldata);
  }
}