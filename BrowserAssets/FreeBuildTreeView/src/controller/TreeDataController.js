import { GROUP, SINGLE } from '@/config/TypeConfig';
import { TreeDataStore } from '@/store/index';
import { jsCallNative, JS_UNITY_CMD } from '@/utils/NativeCall';

class TreeDataController {
  constructor() {
    this.lastWidth = null;
  }

  GetMenuOptsFromSelections(selectedItems) {
    const { treeRef } = TreeDataStore;
    let isDelete = false; let isPack = false; let isRename = false; let
      isUnpack = false;
    if (selectedItems.length === 1) {
      // 单选
      const node = treeRef.current.getItem(selectedItems[0]);
      isDelete = node.getLevel() === 0;
      if (node.data.type === SINGLE) {
        isPack = false;
        isUnpack = false;
        isRename = true;
      } else if (node.data.type === GROUP) {
        isPack = false;
        isUnpack = node.getLevel() === 0;
        isRename = true;
      }
    } else {
      // 多选
      const firstLevel = treeRef.current.getItem(selectedItems[0]).getLevel();
      isDelete = firstLevel === 0;
      isRename = false;
      if (this.treeNodesIsLevelEqual(selectedItems, firstLevel)) {
        if (this.treeNodesAllGroup(selectedItems, firstLevel)) {
          isPack = firstLevel === 0;
          isUnpack = firstLevel === 0;
        } else if (this.treeNodesAllSingle(selectedItems)) {
          isPack = firstLevel === 0;
          isUnpack = false;
        } else {
          isPack = firstLevel === 0;
        }
      }
    }

    return {
      isDelete, isPack, isRename, isUnpack
    };
  }

  nameUpdate(data, str, callback) {
    jsCallNative(JS_UNITY_CMD.TreeViewUpdateItemName,
      {
        data: Object.assign({}, data),
        newName: str,
        oldName: data.label
      },
      {
        cbKey: 'jsCallUnityUpdateNameResult',
      });
    window.jsCallUnityUpdateNameResult = function (value) {
      console.log(
        '[TreeDataController][nameUpdate][jsCallUnityUpdateNameResult] value:',
        value
      );
      if (callback) callback(value.retCode === 1);
    };

    // test for
    // setTimeout(() => {
    //     window['jsCallUnityUpdateNameResult']({retCode: 1})
    // }, 25)
  }

  isConnected(ids, callback) {
    const { treeRef } = TreeDataStore;
    const data = [];
    ids.forEach((id) => {
      data.push(Object.assign({}, treeRef.current.getItem(id).data));
    });

    jsCallNative(JS_UNITY_CMD.TreeViewCheckConnected,
      {
        data
      },
      {
        cbKey: 'jsCallUnityIsConnectedResult'
      });

    window.jsCallUnityIsConnectedResult = function (value) {
      console.log(
        '[TreeDataController][isConnected][jsCallUnityIsConnectedResult] value:',
        value
      );
      if (callback) callback(value.retCode === 1);
    };
  }

  removeItems(ids, callback) {
    jsCallNative(JS_UNITY_CMD.TreeViewRemoveItems,
      {
        ids
      });
  }

  selectedItems(ids, multi, callback) {
    const { treeRef } = TreeDataStore;
    const arr = [];
    ids.forEach((id) => {
      arr.push(Object.assign({}, treeRef.current.getItem(id).data));
    });

    jsCallNative(JS_UNITY_CMD.TreeViewSelectUnit, { datas: arr, multiFlag: multi });
  }

  PackItems(ids, callback) {
    const { treeRef } = TreeDataStore;
    const data = [];
    ids.forEach((id) => {
      data.push(Object.assign({}, treeRef.current.getItem(id).data));
    });

    jsCallNative(JS_UNITY_CMD.TreeViewGroup, { data });
  }

  UnpackItems(ids, callback) {
    const { treeRef } = TreeDataStore;
    const data = [];
    ids.forEach((id) => {
      data.push(Object.assign({}, treeRef.current.getItem(id).data));
    });

    jsCallNative(JS_UNITY_CMD.TreeViewUnGroup, { data });
  }

  Resize(width) {
    if (this.lastWidth !== width) {
      this.lastWidth = width;
      jsCallNative(JS_UNITY_CMD.TreeViewResize, { width });
    }
  }

  //* **************** private **************** */
  treeNodesIsLevelEqual = (treeNodes, level) => {
    const { treeRef } = TreeDataStore;
    // every或者some方法.some可以在有不一样level时提前结束遍历
    return !(treeNodes.some((item) => {
      const node = treeRef.current.getItem(item);
      return node.getLevel() !== level;
    }));
  }

  treeNodesAllSingle = (treeNodes) => {
    const { treeRef } = TreeDataStore;
    return !(treeNodes.some((item) => {
      const node = treeRef.current.getItem(item);
      return node.data.type !== SINGLE;
    }));
  }

  treeNodesAllGroup = (treeNodes) => {
    const { treeRef } = TreeDataStore;
    return !treeNodes.some((item) => {
      const node = treeRef.current.getItem(item);
      return node.data.type !== GROUP;
    });
  }
}

export default new TreeDataController();
