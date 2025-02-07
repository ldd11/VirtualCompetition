import axios from 'axios';
import EventUtil from '../utils/EventUtil';
import { jsCallNative, NCAll, UNITY_JS_CMD } from '../utils/NativeCall';
import { EDITOR_CALL } from './constant/index';
import InputUtil from './InputUtil';
import SceneData from './SceneData';
import AIColorPredictUtil from '../utils/AIColorPredictUtil';
import DropdownUtil from '@/utils/DropdownUtil';
import FeatureManager from '@/blockly/toolbox/FeatureManager';
import BlocklyDefinedBlocksXml from '../blockly/toolbox/BlocklyDefinedBlocks.xml';
import { dataSetStore } from '@/store/index';
import { cloneDeep } from 'lodash';
import { updateDataSetDropdown } from '@/blockly/blocks/common';

const { Blockly } = window;

class UnityHandler {
  unpackDatas = {};
  // setBlockXmlParams = [];

  init = () => {
    EventUtil.on(NCAll.UNITY_CALL_JS, this.handleUntiyCall);
  };

  handleUntiyCall = (calldata) => {
    const { args } = calldata;
    if (args.length === 0) return;

    // console.log(`[UnityHandler] args = ${args[0]}`);
    const jsonArg = JSON.parse(args[0]);

    const { cmd, data, cbKey } = jsonArg;
    console.log(`[UnityHandler] cmd = ${cmd}`);
    // console.log(`[UnityHandler] data = ${data ? JSON.stringify(data) : 'null'}`);

    switch (cmd) {
      case UNITY_JS_CMD.Unpack:
        this.handleUnpack(data);
        break;
      case UNITY_JS_CMD.ReplyUnityData:
        this.handleReplyUnityData(data);
        break;
      case UNITY_JS_CMD.ClearBlockEditor:
        EventUtil.emit(EDITOR_CALL.CLEAR_WORKSPACE);
        break;
      case UNITY_JS_CMD.SetBlockXml:
        this.handleSetBlockXml(data, cbKey);
        break;
      case UNITY_JS_CMD.GetBlockXml:
        this.handleGetBlockXml(cbKey);
        break;
      case UNITY_JS_CMD.GetBlockCode:
        this.handleGetBlockCode(cbKey);
        break;
      case UNITY_JS_CMD.BoardBtnAction:
        this.handleBoardBtnAction(data);
        break;
      case UNITY_JS_CMD.SetLearnedColorDropdown:
        this.handleSetLearnedColorDropdown(data);
        break;
      case UNITY_JS_CMD.SyncInfraredDepthSensorData:
        this.handleSyncInfraredDepthSensorData(data);
        break;
      case UNITY_JS_CMD.SetAudio:
        this.handleAudioSetting(data);
        break;
      case UNITY_JS_CMD.RespFeaturePermissionResult:
        this.handleRespFeaturePermissionResult(data);
        break;
      case UNITY_JS_CMD.RespConfirmResult:
        this.handleRespConfirmResult(data);
        break;
      case UNITY_JS_CMD.SetBlockDropdownList:
        this.handleSetBlockDropdownList(data);
        break;
      case UNITY_JS_CMD.UpdateModelLists:
        this.handleUpdateModelLists(data);
        break;
      case UNITY_JS_CMD.NotifyRobotType:
        this.handleNotifyRobotType(data);
        break;
      case UNITY_JS_CMD.ForbidBlockly:
        this.handleForbidBlockly(data);
        break;
      case UNITY_JS_CMD.NotifyBlocklyToolboxPermission:
        this.handleNotifyBlocklyToolboxPermission(data);
        break;
      case UNITY_JS_CMD.EnableDebug:
        this.switchDebugMode(true);
        break;
      case UNITY_JS_CMD.DisableDebug:
        this.switchDebugMode(false);
        break;
      case UNITY_JS_CMD.GetCompleteXml:
        this.handleGetCompleteXml(data);
        break;
      case UNITY_JS_CMD.RefreshDataSet:
        this.refreshDataSet(data);
        break;
      case UNITY_JS_CMD.UpdateCompileErrorInfo:
        this.updateCompileErrorInfo(data);
        break;
      case UNITY_JS_CMD.CenterOnErrorBlock:
        this.centerOnErrorBlock();
        break;
      // insert cmd mark
      default:
        break;
    }
  };

  handleUnpack = (data) => {
    console.log('handle unpack');
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
      this.handleUntiyCall(calldata);
    }
  };

  handleSetBlockDropdownList = (data) => {
    console.log(`[handleSetBlockDropdownList] data = ${JSON.stringify(data)}`);
    if (data.isArray) {
      const { datas } = data;
      const len = datas.length;
      for (let i = 0; i < len; ++i) {
        this.handleSetBlockDropdownList(datas[i]);
      }
      return;
    }
    const items = data.dropdown;
    const len = items.length;
    const list = [];
    for (let i = 0; i < len; i += 1) {
      const item = items[i];
      list.push([item.key, item.value]);
    }
    DropdownUtil.setDropdownList(data.key, list);
  };

  handleUpdateModelLists = (data) => {
    console.log('[tm] [handleUpdateModelLists] data :', data);
    const { model, type } = data.data;

    const len = model.length;

    // construct model-class map
    for (let i = 0; i < len; i += 1) {
      const item = JSON.parse(model[i]);
      console.log('[tm] [handleUpdateModelLists] item :', item);

      const { name, id, metadata } = item;

      const meta = JSON.parse(metadata);
      console.log('[tm] [handleUpdateModelLists] metadata', meta);

      let { labels, wordLabels } = meta;

      const classList = [];
      if (labels === undefined || labels === null || labels.length === 0) {
        if (
          wordLabels === undefined
          || wordLabels === null
          || wordLabels.length === 0
        ) {
          labels = [];
          classList.push(['?', '?']);
        } else {
          labels = wordLabels;
        }
      }

      for (let j = 0; j < labels.length; j += 1) {
        const label = labels[j];
        classList.push([label, j.toString()]);
      }
      console.log(
        `[tm] [handleUpdateModelLists] tm_class_list_${id}, name = ${name}`,
        classList
      );
      DropdownUtil.setDropdownList(`tm_class_list_${id}`, classList, false);
    }

    // construct model list
    const modelList = [];
    for (let i = 0; i < len; i += 1) {
      const item = JSON.parse(model[i]);

      modelList.push([item.name, item.id]);
    }
    console.log(`[tm] [handleUpdateModelLists] tm_model_list_${type}`, modelList);
    DropdownUtil.setDropdownList(`tm_model_list_${type}`, modelList);
  };

  handleRespConfirmResult = (data) => {
    console.log(`[handleRespConfirmResult] data = ${JSON.stringify(data)}`);
    EventUtil.emit(EDITOR_CALL.RESP_CONFIRM, data.confirm);
  };

  handleRespFeaturePermissionResult = (data) => {
    console.log(
      `[handleRespFeaturePermissionResult] data = ${JSON.stringify(data)}`
    );
    EventUtil.emit(EDITOR_CALL.RESP_FEATURE_PEMISSION, data);
  };

  handleSetLearnedColorDropdown = (data) => {
    console.log(
      `[handleSetLearnedColorDropdown] data = ${JSON.stringify(data)}`
    );
    if (data === null || !data.dropdown) return;
    AIColorPredictUtil.setDropdownData(data.dropdown);
  };

  handleGetBlockXml = (cbKey) => {
    const blockData = {};
    EventUtil.emit(EDITOR_CALL.GET_BLOCK_XML, blockData);
    jsCallNative(cbKey, blockData);
  };

  handleGetBlockCode = (cbKey) => {
    const blockCode = { code: '' };
    EventUtil.emit(EDITOR_CALL.GET_BLOCK_CODE, blockCode);
    jsCallNative(cbKey, blockCode.code);
  };

  handleReplyUnityData = (data) => {
    if (!data) return;
    EventUtil.emit(EDITOR_CALL.REPLAY_UNITY_DATA, data);
  };

  handleSetBlockXml = (data, cbKey) => {
    if (!data) return;

    let invalidBlocks = [];

    try {
      invalidBlocks = this.checkBlock(data);
      if (invalidBlocks.length == 0) {
        EventUtil.emit(EDITOR_CALL.SET_BLOCK_XML, data);
        return;
      }
    } catch (e) {
      console.error("handleSetBlockXml error: ", e);
    }
    jsCallNative(cbKey, invalidBlocks);
  };

  handleBoardBtnAction = (data) => {
    if (data == null) return;
    InputUtil.handleBoardBtnAction(data.btnType, data.action);
  };

  handleNewModel = (uuid, name) => {
    SceneData.addModel(uuid, { uuid, name });
  };

  handleDelModel = (uuid) => {
    SceneData.deleteModel(uuid);
  };

  handleSyncInfraredDepthSensorData = (data) => {
    if (!data) return;
    EventUtil.emit(EDITOR_CALL.SYNC_INFRARED_DEPTH_SENSOR_DATA, data);
  };

  handleAudioSetting = (data) => {
    if (!data) return;
    window.disableAudio = data.enable == 0;
    window.audioVolume = data.volume;

    console.warn('data.volume = ', data.volume);
    console.warn('audioVolume = ', window.audioVolume);
  };

  handleNotifyRobotType = (data) => {
    console.log(`[handleNotifyRobotType] data = ${JSON.stringify(data)}`);
    // insert logic here
    FeatureManager.setRobotType(data.type, data.feature_map);
  };

  handleNotifyBlocklyToolboxPermission = (data) => {
    console.log(`[UnityHandler].handleNotifyBlocklyToolboxPermission data = ${JSON.stringify(data)}`);

    Blockly.hideChaff(false);

    EventUtil.emit(EDITOR_CALL.HIDE_EXTENSION_DIALOG);
    EventUtil.emit(EDITOR_CALL.REMOVE_COMPILE_ERROR_TIPS);

    const {robot_type, robot_name, feature_map, blocks, categories, presetToolbox, presetUserBlock} = data;
    // presetToolbox = "<xml xmlns=\"http://www.w3.org/1999/xhtml\" id=\"toolbox\" style=\"display: none;\">\n  <category name=\"调试积木\" icon=\"debugging\" expanded=\"true\" colour=\"#69c12e\">\n    <label text=\"调试积木\"></label>\n    <block type=\"setRobotInitialPos\" disabled=\"true\">\n      <value name=\"x\">\n        <block type=\"posValueOfDebug\">\n          <field name=\"NUM\">0</field>\n        </block>\n      </value>\n      <value name=\"y\">\n        <block type=\"posValueOfDebug\">\n          <field name=\"NUM\">0</field>\n        </block>\n      </value>\n      <value name=\"angle\">\n        <shadow type=\"math_number\">\n          <field name=\"NUM\">0</field>\n        </shadow>\n      </value>\n    </block>\n  </category>\n  <category name=\"事件\" icon=\"microbit\" colour=\"#3bd6ff\">\n    <label text=\"事件\"></label>\n    <block type=\"funcMain\" deletable=\"false\"></block>\n    <block type=\"onRecvBroadcast\">\n      <value name=\"msg\">\n        <shadow type=\"text\">\n          <field name=\"TEXT\">Hi</field>\n        </shadow>\n      </value>\n    </block>\n    <block type=\"sendBroadcast\">\n      <value name=\"msg\">\n        <shadow type=\"text\">\n          <field name=\"TEXT\">Hi</field>\n        </shadow>\n      </value>\n    </block>\n  </category>\n  <category name=\"lovn\" className=\"default\" icon=\"default\" colour=\"#f18657\">\n    <label text=\"lovn\"></label>\n    <block type=\"lesson_user_doSomething\"></block>\n    <block type=\"lesson_user_doSomething2\"></block>\n  </category>\n</xml>";
    // presetUserBlock = "[{\"title\":\"user_block_1700726116226\",\"block\":\"<block type=\\\"lesson_user_doSomething\\\"></block>\",\"srcCode\":\"<block type=\\\"procedures_defnoreturn\\\"><field name=\\\"NAME\\\">doSomething</field><statement name=\\\"STACK\\\"><block type=\\\"setMotionMode\\\"><field name=\\\"mode\\\">Wheel</field><next><block type=\\\"setRateAndTimeInWheel\\\"><value name=\\\"rate\\\"><shadow type=\\\"rateValueInWheel\\\"><field name=\\\"NUM\\\">5</field></shadow></value><value name=\\\"time\\\"><shadow type=\\\"math_number\\\"><field name=\\\"NUM\\\">1</field></shadow></value></block></next></block></statement></block>\",\"functionName\":\"doSomething\",\"isHideCode\":true,\"functionData\":{\"functionBlock\":\"<block type=\\\"lesson_user_doSomething\\\"></block>\",\"functionName\":\"doSomething\",\"argsCount\":0,\"argsList\":[],\"returnValue\":false},\"isSyncFunc\":true},{\"title\":\"user_block_1700726140632\",\"block\":\"<block type=\\\"lesson_user_doSomething2\\\"></block>\",\"srcCode\":\"<block type=\\\"procedures_defnoreturn\\\"><field name=\\\"NAME\\\">doSomething2</field><statement name=\\\"STACK\\\"><block type=\\\"procedures_return\\\"><value name=\\\"VALUE\\\"><shadow type=\\\"math_number\\\"><field name=\\\"NUM\\\">3</field></shadow></value></block></statement></block>\",\"functionName\":\"doSomething2\",\"isHideCode\":true,\"functionData\":{\"functionBlock\":\"<block type=\\\"lesson_user_doSomething2\\\"></block>\",\"functionName\":\"doSomething2\",\"argsCount\":0,\"argsList\":[],\"returnValue\":false},\"isSyncFunc\":true}]";
    FeatureManager.setFeaturePermission(robot_type, robot_name, feature_map, blocks, categories, presetToolbox, presetUserBlock);
  }

  handleForbidBlockly = (data) => {
    if (!data) return;

    const {
      categories,
      blocks
    } = data;

    console.error('handleForbidBlockly data = ',JSON.stringify(data));
    FeatureManager.setForbidCategories(categories);
    FeatureManager.setForbidBlocks(blocks);

    EventUtil.emit(EDITOR_CALL.FORBID_BLOCKLY);
  };

  checkBlock = (data) => {

    function getTypes(strXml, type) {
      const blockTypes = [];
      let matchLeftStr = "";
      switch (type)
      {
        case "block":
          matchLeftStr = '<block type="';
          break;
        case "category":
          matchLeftStr = '<category name="';
          break;
        case "shadow":
          matchLeftStr = '<shadow type="';
          break;
      }
      const matchRightStr = '"';

      let startIndex = 0;
      let endIndex = 0;
      while (true) {
        strXml = strXml.slice(startIndex + endIndex);
        startIndex = strXml.indexOf(matchLeftStr);
        if (startIndex == -1) {
          break;
        }
        startIndex += matchLeftStr.length;
        endIndex = strXml.slice(startIndex).indexOf(matchRightStr);
        if (endIndex == -1) {
          break;
        }
        const blockType = strXml.slice(startIndex, startIndex + endIndex);
        if (blockTypes.indexOf(blockType) == -1) {
          blockTypes.push(strXml.slice(startIndex, startIndex + endIndex));
        }
      }
      return blockTypes;
    }

    const {xml} = data;
    const invalidBlocks = [];

    if (FeatureManager.forbidCategories.length != 0 || FeatureManager.forbidBlocks.length != 0) {
      let toolboxBlocks = [];
      toolboxBlocks = toolboxBlocks.concat(getTypes(FeatureManager.curToolbox, 'block'));
      toolboxBlocks = toolboxBlocks.concat(getTypes(FeatureManager.curToolbox, 'shadow'));

      // Blockly定义积木
      toolboxBlocks = toolboxBlocks.concat(getTypes(BlocklyDefinedBlocksXml, 'block'));
      toolboxBlocks = toolboxBlocks.concat(getTypes(BlocklyDefinedBlocksXml, 'shadow'));

      const toolboxCategories = getTypes(FeatureManager.curToolbox, 'category');
      // 函数积木
      const functionBlocks = ['procedures', 'procedures_defnoreturn', 'procedures_defreturn', 'procedures_mutatorcontainer', 'procedures_mutatorarg', 'procedures_callnoreturn', 'procedures_callreturn', 'procedures_ifreturn', 'procedures_return', 'procedures_argument', 'procedures_callreturn_ori', 'procedures_callnoreturn_ori'];
      if (toolboxCategories.includes('函数')) {
        for (let i = 0; i < functionBlocks.length; i++) {
          if (!FeatureManager.forbidBlocks.includes(functionBlocks[i])) {
            toolboxBlocks.push(functionBlocks[i]);
          }
        }
      }
      // 特殊积木
      if (toolboxCategories.includes('人脸识别')) {
        if (!FeatureManager.forbidBlocks.includes('getFaceDetectResult')) {
          toolboxBlocks.push('getFaceDetectResult');
        }
      }
      if (toolboxCategories.includes('图像智能')) {
        if (!FeatureManager.forbidBlocks.includes('getRecognizedTrafficSignInfo')) {
          toolboxBlocks.push('getRecognizedTrafficSignInfo');
        }
        if (!FeatureManager.forbidBlocks.includes('getRecognizedTrafficLightInfo')) {
          toolboxBlocks.push('getRecognizedTrafficLightInfo');
        }
      }
      console.log('toolboxBlocks: ', toolboxBlocks);
      let xmlBlocks = [];
      xmlBlocks = xmlBlocks.concat(getTypes(xml, 'block'));
      xmlBlocks = xmlBlocks.concat(getTypes(xml, 'shadow'));
      console.log('xmlBlocks: ', xmlBlocks);
      for (let i = 0; i < xmlBlocks.length; i++) {
        if (toolboxBlocks.indexOf(xmlBlocks[i]) == -1) {
          invalidBlocks.push(xmlBlocks[i]);
        }
      }
      console.log('invalidBlocks: ', invalidBlocks);
    }

    return invalidBlocks;
  }

  switchDebugMode = (isEnable) => {
    if (Blockly.Settings.isDebugMode != isEnable) {
      Blockly.Settings.isDebugMode = isEnable;
      EventUtil.emit(EDITOR_CALL.REFRESH_DEBUG_BLOCKS);
      Blockly.ContextMenu.hide();
    }
  }

  handleGetCompleteXml = (data) => {
    // EventUtil.emit('unityCallJS', {args: ['{"cmd":"GetCompleteXml","data":{"robot_type":"RobotMaxSeries","feature_map":{"AIBlocks":true,"IntegratedRobot":true,"BuildableRobot":false,"RobotMaxSeries":true,"RobotGogoSeries":false,"RobotQQCarSeries":false,"RobotPlanetSeries":false,"RobotDroneSeries":false,"None":false},"blocks":"","categories":"","presetToolbox":"","presetUserBlock":""}}']});
    // EventUtil.emit('unityCallJS', {args: ['{"cmd":"GetCompleteXml","data":{"robot_type":"RobotGogoSeries","feature_map":{"AIBlocks":true,"IntegratedRobot":true,"BuildableRobot":false,"RobotMaxSeries":false,"RobotGogoSeries":true,"RobotQQCarSeries":false,"RobotPlanetSeries":false,"RobotDroneSeries":false,"None":false},"blocks":"","categories":"","presetToolbox":"","presetUserBlock":""}}']});
    // EventUtil.emit('unityCallJS', {args: ['{"cmd":"GetCompleteXml","data":{"robot_type":"RobotQQCarSeries","feature_map":{"AIBlocks":true,"IntegratedRobot":true,"BuildableRobot":false,"RobotMaxSeries":false,"RobotGogoSeries":false,"RobotQQCarSeries":true,"RobotPlanetSeries":false,"RobotDroneSeries":false,"None":false},"blocks":"","categories":"","presetToolbox":"","presetUserBlock":""}}']});
    // EventUtil.emit('unityCallJS', {args: ['{"cmd":"GetCompleteXml","data":{"robot_type":"RobotMaxSeries","feature_map":{"AIBlocks":true,"IntegratedRobot":true,"BuildableRobot":false,"RobotMaxSeries":true,"RobotGogoSeries":false,"RobotQQCarSeries":false,"RobotPlanetSeries":false,"RobotDroneSeries":false,"None":false},"blocks":"","categories":"","presetToolbox":"","presetUserBlock":""}}']});
    // EventUtil.emit('unityCallJS', {args: ['{"cmd":"GetCompleteXml","data":{"robot_type":"RobotPlanetSeries","feature_map":{"AIBlocks":true,"IntegratedRobot":true,"BuildableRobot":false,"RobotMaxSeries":false,"RobotGogoSeries":false,"RobotQQCarSeries":false,"RobotPlanetSeries":true,"RobotDroneSeries":false,"None":false},"blocks":"","categories":"","presetToolbox":"","presetUserBlock":""}}']});
    // EventUtil.emit('unityCallJS', {args: ['{"cmd":"GetCompleteXml","data":{"robot_type":"RobotDroneSeries","feature_map":{"AIBlocks":true,"IntegratedRobot":true,"BuildableRobot":false,"RobotMaxSeries":false,"RobotGogoSeries":false,"RobotQQCarSeries":false,"RobotPlanetSeries":false,"RobotDroneSeries":true,"None":false},"blocks":"","categories":"","presetToolbox":"","presetUserBlock":""}}']});
    // EventUtil.emit('unityCallJS', {args: ['{"cmd":"GetCompleteXml","data":{"robot_type":"FreeBuild","feature_map":{"AIBlocks":true,"IntegratedRobot":false,"BuildableRobot":true,"RobotMaxSeries":false,"RobotGogoSeries":false,"RobotQQCarSeries":false,"RobotPlanetSeries":false,"RobotDroneSeries":false,"None":false},"blocks":"","categories":"","presetToolbox":"","presetUserBlock":""}}']});
    
    const {robot_type, feature_map, blocks, categories, presetToolbox, presetUserBlock} = data;
    FeatureManager.setFeaturePermission(robot_type, feature_map, blocks, categories, presetToolbox, presetUserBlock);
    const combineToolbox = FeatureManager.combineFeatureToolbox();
    console.log('combineToolbox: ', combineToolbox);
  };

  refreshDataSet = async (data) => {
    dataSetStore.initDataListStoreTemporaryData();
    let list = [];
    let dataFromCloud = false;
    if (data !== '') {
      try {
        const dic = JSON.parse(data);
        console.log('[UnityHandler] dataset from unity =>', dic)
        list = Object.values(dic);
      } catch (error) {
        console.log('Error [UnityHandler] json.parse ', error);
      }
    }

    if (list.length > 0) {
      const { dataSet, uploadUrl } = list[0];
      if (!dataSet && uploadUrl) {
        dataFromCloud = true;
        console.log('[UnityHandler] downLoad csv...');
        list = await this.downLoadDataSet(cloneDeep(list));
      }
    }

    console.log('[UnityHandler] dataset after handle', list)
    dataSetStore.refreshDatasetList(list);
    EventUtil.emit(EDITOR_CALL.DATESET_LIST_UPDATE, list.length)
    // if (dataFromCloud) {
    //   // 从云端拉取数据的话，setXml执行完后，数据才更新，所以需要主动更新下拉
    //   updateDataSetDropdown([]);
    // }
  };

  downLoadDataSet = async (list) => {
    const promises = list.map(async (item) => {
      try {
        const response = await axios.get(item.uploadUrl);
        const dataSet = response.data;
        // console.log("--------5")
        item.dataSet = dataSet;
        return item;
      } catch (error) {
        console.log(`Error [downLoadDataSet] for item with id ${item.dataId}:`, error);
        return item;
      }
    });
  
    return Promise.all(promises);
  };

  updateCompileErrorInfo = (data) => {
    if (!data) return;

    EventUtil.emit(EDITOR_CALL.UPDATE_COMPILE_ERROR_INFO, data);
  };

  centerOnErrorBlock = () => {
    EventUtil.emit(EDITOR_CALL.CENTER_ON_ERROR_BLOCK);
  };
  // insert handler mark
}

export default UnityHandler;
