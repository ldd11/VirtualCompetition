import { TreeDataStore } from '@/store/index';
import { EventMsg } from '@/utils/EventMsg';
import EventUtil from '@/utils/EventUtil';
import { NCAll, UNITY_JS_CMD } from '@/utils/NativeCall';

class UnityCallHandler {
  unpackDatas = {};

  init = () => {
    EventUtil.on(NCAll.UNITY_CALL_JS, this.handleUnityCall);
  };

  handleUnityCall = (callData) => {
    const { args } = callData;
    if (args.length == 0) {
      return;
    }

    const jsonArg = JSON.parse(args[0]);
    const { cmd, data, cbKey } = jsonArg;

    console.log('unity call js ' + cmd)
    switch (cmd) {
      case UNITY_JS_CMD.Unpack:
        this.handleUnpack(data);
        break;
      case UNITY_JS_CMD.UpdateTreeDatas:
        this.handleUpdateTreeDatas(data);
        break;
      case UNITY_JS_CMD.NotifyTreeViewSelect:
        this.handleNotifyTreeViewSelect(data);
        break;
      case UNITY_JS_CMD.NotifyTreeViewAddNew:
        this.handleNotifyTreeViewAddNew(data);
        break;
      case UNITY_JS_CMD.NotifyTreeViewRemoveItem:
        this.handleNotifyTreeViewRemoveItem(data);
        break;
      case UNITY_JS_CMD.NotifyTreeViewUpdateItemName:
        this.HandleNotifyTreeViewUpdateItemName(data);
        break;
      case UNITY_JS_CMD.NotifyTreeViewUpdateCtrlStatus:
        this.HandleNotifyTreeViewUpdateCtrlStatus(data);
        break;
      case UNITY_JS_CMD.NotifyPageSceneDragStatus:
        this.handleNotifyPageSceneDragStatus(data);
        break;
      default:
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

  handleUpdateTreeDatas = (data) => {
    if (!data) {
      return;
    }
    data = JSON.parse(data);
    // console.log('[handleUpdateTreeDatas]')
    // console.log(data.length);
    TreeDataStore.setTreeNodes(data);
  }

  handleNotifyTreeViewSelect = (data) => {
    if (!data) {
      return;
    }
    // console.log("[handleNotifyTreeViewSelect]");
    EventUtil.emit(EventMsg.SELECT_ITEM, data);
  }

  handleNotifyTreeViewAddNew = (data) => {
    if (!data) {
      return;
    }
    // console.log('[handleNotifyTreeViewAddNew]');
    data = JSON.parse(data);
    EventUtil.emit(EventMsg.ADD_ITEM, data);
  }

  handleNotifyTreeViewRemoveItem = (data) => {
    if (!data) {
      return;
    }
    // console.log('[handleNotifyTreeViewRemoveItem]');
    EventUtil.emit(EventMsg.REMOVE_ITEM, data);
  }

  HandleNotifyTreeViewUpdateItemName = (data) => {
    if (!data) {
      return;
    }
    // console.log('[HandleNotifyTreeViewUpdateItemName]');
    EventUtil.emit(EventMsg.UPDATE_ITEM_LABEL, data);
  }

  HandleNotifyTreeViewUpdateCtrlStatus = (data) => {
    if (!data) {
      return;
    }
    // console.log('[HandleNotifyTreeViewUpdateCtrlStatus]');
    EventUtil.emit(EventMsg.UPDATE_CTRL_STATUS, data);
  }

  handleNotifyPageSceneDragStatus = (data) => {
    if (!data) {
      return;
    }

    // console.log('[handleNotifyPageSceneDragStatus]', data);
    EventUtil.emit(EventMsg.UPDATE_SCENE_DRAG_STATUS, data);
  }
}

export default UnityCallHandler;
