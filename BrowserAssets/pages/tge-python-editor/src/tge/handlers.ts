import { NCAll } from '.';
import eventEmitter from '../utils/event_emitter';

window.unpackDatas = {};

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
    delete window.unpackDatas[key];
    const calldata = [content];
    window[NCAll.UNITY_CALL_JS](calldata);
  }
};

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
