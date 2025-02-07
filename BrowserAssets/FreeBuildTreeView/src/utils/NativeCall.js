import EventUtil from './EventUtil';

export const NCAll = {
  UNITY_CALL_JS: 'unityCallJS',
  JS_CALL_UNITY: 'jsCallUntiy'
};

// cmd: unity call js
export const UNITY_JS_CMD = {
  Unpack: 'Unpack', // 拆包
  UpdateTreeDatas: 'UpdateTreeDatas', // 更新数据
  NotifyTreeViewSelect: 'NotifyTreeViewSelect', // 主动更新选择项
  NotifyTreeViewAddNew: 'NotifyTreeViewAddNew', // 主动增加一个根节点
  NotifyTreeViewRemoveItem: 'NotifyTreeViewRemoveItem',
  NotifyTreeViewUpdateItemName: 'NotifyTreeViewUpdateItemName',
  NotifyTreeViewUpdateCtrlStatus: 'NotifyTreeViewUpdateCtrlStatus',
  NotifyPageSceneDragStatus: 'NotifyPageSceneDragStatus',
};


// cmd: js call unity
export const JS_UNITY_CMD = {
  TreeViewExpand: 'TreeViewExpand', // 展开
  TreeViewCollapse: 'TreeViewCollapse', // 收起
  TreeViewSelectUnit: 'TreeViewSelectUnit',
  TreeViewUpdateItemName: 'TreeViewUpdateItemName',
  TreeViewRemoveItems: 'TreeViewRemoveItems',
  TreeViewCheckConnected: 'TreeViewCheckConnected', // 检查待选内容连贯性
  TreeViewUnGroup: 'TreeViewUnGroup',
  TreeViewGroup: 'TreeViewGroup',
  TreeViewResize: 'TreeViewResize', // 页面大小更新
  TreeViewErrorToast: 'TreeViewErrorToast',
};

function unityCallJS(...args) {
  const calldata = { args, ret: 0 };
  EventUtil.emit(NCAll.UNITY_CALL_JS, calldata);
  const jsonArg = JSON.parse(args[0]);
  if (jsonArg && jsonArg.data && jsonArg.data.cbKey != '') {
    window[jsonArg.data.cbKey](jsonArg.data.value); // 如果jsCallNative有传入cbKey，可以回调到window[cbKey]
  }
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
  console.log('jsCallNative', args, ...param)
  sendMsgToZFBrowser(cmd, args, param);
}

window[NCAll.UNITY_CALL_JS] = unityCallJS;
