import './handlers';

window.unpackDatas = {};

// 和unity通讯的基础代码
const NCAll = {
  UNITY_CALL_JS: 'unityCallJS',
  JS_CALL_UNITY: 'jsCallUnity',
};

function unityCallJS(...args: any[]) {
  const calldata = { args, ret: 0 };

  // EventUtil.emit(NCAll.UNITY_CALL_JS, calldata);


  const jsonArg = JSON.parse(args[0]);

  // console.log('unityCallJS:', jsonArg);

  if (jsonArg.cmd) {
    // @ts-ignore
    window[jsonArg.cmd](jsonArg.data, jsonArg.cbKey);
  }

  // if (jsonArg?.data && jsonArg.cbKey) {
  //   // 支持通过cbKey回调
  //   jsCallNative(jsonArg.cbKey, [jsonArg.data.value]);
  // }

  // TODO:
  return { value: calldata.ret };
}

// function sendMsgToZFBrowser(...args) {
//     if (window[NCAll.JS_CALL_UNITY]) {
//         window[NCAll.JS_CALL_UNITY](...args);
//     }
// }

async function sendMsgToZFBrowser(...args: any[]) {
  await waitJSCallUnityInit();
  if (window[NCAll.JS_CALL_UNITY]) {
    window[NCAll.JS_CALL_UNITY](...args);
  }
}

// 页面onload事件会在unity的onload完成后触发，所以这里需要等待
function waitJSCallUnityInit() {
  if (window[NCAll.JS_CALL_UNITY]) {
    return;
  }
  return new Promise((resolve) => {
    const checkJSCallUnityInit = setInterval(() => {
      if (window[NCAll.JS_CALL_UNITY]) {
        clearInterval(checkJSCallUnityInit);
        resolve(null);
      }
    }, 100);
  });
}

export function jsCallNative(cmd: string, args: any, param: any = null) {
  console.log('jsCallNative:', cmd, args, param);
  sendMsgToZFBrowser(cmd, args, param);
}

window[NCAll.UNITY_CALL_JS] = unityCallJS;

window.Unpack = function (data: any) {
  // console.error('Unpack', data);
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

    // console.log(calldata.args);


    const jsonArg = JSON.parse(calldata.args[0]);

    // console.log('unityCallJS after unpack:', jsonArg);

    if (jsonArg.cmd) {
      // @ts-ignore
      window[jsonArg.cmd](jsonArg.data, jsonArg.cbKey);
    }

    // TODO:
    return { value: calldata.ret };
  }
}
