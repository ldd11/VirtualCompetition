import React, { Component } from 'react';
import { render } from 'react-dom';
import { inject, observer } from 'mobx-react';
import Editor from '@tencent/ec-blockly-editor';
import debounce from 'lodash/debounce';
import { EDITOR_CALL } from '@/runtime/constant/index';
import BlockFuncApi from '@/runtime/BlockFuncApi';
import { JS_UNITY_CMD } from '@/utils/NativeCall';
import { generateWorkSpace } from '../../blockly/OverrideBlockly';
import BlocklyController from '../../controller/blocklyController';
import UnityHandler from '../../runtime/UnityHandler';
import EventUtil from '../../utils/EventUtil';
import MainLoop from '../../runtime/MainLoop';

import '../../assets/style/index.less';
import AIColorPredictUtil from '../../utils/AIColorPredictUtil';
import UploadDataFiles from '../UploadDataFiles/UploadDataFiles';
import userBlockController from '@/controller/userBlockController';
import extensions from '@/blockly/toolbox/extensions/index';
import editorStore from '@/store/editorStore';

const { Blockly } = window;

@inject('editorStore', 'projectStore', 'dataSetStore')
@observer
class BlocklyEditor extends Component {
  constructor(props) {
    super(props);
    this.blocklyCtrl = new BlocklyController();
    this.updateDropdownTasks = [];
    this.executeUpdateDropdownValueTasks = debounce(this.executeUpdateDropdownValueTasks_, 1);
    userBlockController.getHiddenWorkspace();
    this.state = {
      showExtension: true
    };
    editorStore.setExtensionsToolbox(extensions);
  }

  componentDidMount() {
    this.initEvent();
    this.unityHandler = new UnityHandler();
    this.mainloop = new MainLoop();
    this.mainloop.init();
    this.unityHandler.init();
    this.blocklyCtrl.init();
    this.initBlocklyEvent();
    AIColorPredictUtil.init();
    this.initForeignObject();
    // 加宽 积木列表宽度
    window.Blockly.Settings.flyoutWidth = 390;
  }

  componentWillUnmount() {
    this.unInitEvent();
    this.blocklyCtrl.unInit();
  }

  initBlocklyEvent = () => {
    const { editorStore } = this.props;
    const { editorRef } = editorStore;
    if (editorRef.current) {
      const workspace = editorRef.current.getWorkspace();
      workspace.addChangeListener(this.onWorkspaceChange);
      workspace.registerButtonCallback(
        'buttonPressedCreateGlobalVar',
        (button) => {
          Blockly.Msg.NEW_VARIABLE_TITLE = '新变量名称：';
          Blockly.Variables.createVariableButtonHandler(
            button.getTargetWorkspace(),
            (text) => {
              // console.log('text = ', text);
            },
            'Variable'
          );
        }
      );

      workspace.registerButtonCallback(
        'buttonPressedCreateGlobalList',
        (button) => {
          Blockly.Msg.NEW_VARIABLE_TITLE = '新列表名称：';
          Blockly.Msg.VARIABLE_ALREADY_EXISTS = '名字叫“%1”的列表已经存在了。';
          Blockly.Msg.VARIABLE_ALREADY_EXISTS_FOR_ANOTHER_TYPE = '名字叫“%1”的列表已经有了另一个类型：“%2”。';
          Blockly.Variables.createVariableButtonHandler(
            button.getTargetWorkspace(),
            (text) => {
              Blockly.Msg.NEW_VARIABLE_TITLE = '新变量名称：';
              Blockly.Msg.VARIABLE_ALREADY_EXISTS = '名字叫“%1”的变量已经存在了。';
              Blockly.Msg.VARIABLE_ALREADY_EXISTS_FOR_ANOTHER_TYPE = '名字叫“%1”的变量已经有了另一个类型：“%2”。';
              // console.log('text = ', text);
            },
            'Array'
          );
        }
      );

      workspace.registerButtonCallback(
        'buttonPressedOpenColorRecognize',
        () => {
          BlockFuncApi.callUnityApi(JS_UNITY_CMD.OpenColorRecognize);
        }
      );

      workspace.registerButtonCallback('buttonPressedOpenFaceLearning', () => {
        BlockFuncApi.callUnityApi(JS_UNITY_CMD.OpenFaceLearning);
      });

      workspace.registerButtonCallback('openTMProjectList', () => {
        BlockFuncApi.callUnityApi(JS_UNITY_CMD.OpenTeachableMachineProjectList, '');
      });
    }
  };

  onWorkspaceChange = (event) => {
    const { editorStore } = this.props;
    const { editorRef } = editorStore;
    const workspace = editorRef.current.getWorkspace();
    const topBlocks = workspace.getTopBlocks();
    for (let i = 0; i < topBlocks.length; i++) {
      const block = topBlocks[i];
      if (block.type === 'funcMain') {
        this.HandleFlyoutFuncMain(true);
        return;
      }
    }
    this.HandleFlyoutFuncMain(false);
  };

  HandleFlyoutFuncMain = (disable) => {
    const { editorStore } = this.props;
    const { editorRef } = editorStore;
    const workspace = editorRef.current.getWorkspace();
    const flyout = workspace.getFlyout_();
    const flyoutWorkspace = flyout.workspace_;
    const blockDB = flyoutWorkspace.blockDB_;
    for (const blockId in blockDB) {
      const block = blockDB[blockId];
      if (block.type === 'funcMain') {
        block.setDisabled(disable);
        return;
      }
    }
  };

  initEvent = () => {
    EventUtil.on(EDITOR_CALL.CLEAR_WORKSPACE, this.clearWorkspace);
    EventUtil.on(EDITOR_CALL.SET_BLOCK_XML, this.setBlockXml);
    EventUtil.on(EDITOR_CALL.GET_BLOCK_XML, this.getBlockXml);
    EventUtil.on(EDITOR_CALL.GET_BLOCK_CODE, this.getBlockCode);
    EventUtil.on(EDITOR_CALL.UPDATE_DROPDOWN_VALUE, this.handleUpdateDropdown);
    EventUtil.on(EDITOR_CALL.UPDATE_SHOW_EXTENSION_PARAMS, this.updateShowExtensionParams);
  };

  initForeignObject = () => {
    const { dataSetStore } = this.props;
    Blockly.Flyout.prototype.foreignObjectHeightMap.listDataset = '45';
    const listlen = dataSetStore.dataSetList && dataSetStore.dataSetList.length;
    const listHeight = 45 + 46 * listlen;
    Blockly.Flyout.prototype.foreignObjectHeightMap.listDataset = `${listHeight}`;
    console.log('[BlocklyEditor] initEvent.dataSetStore.dataSetList', dataSetStore.dataSetList);

    EventUtil.on(EDITOR_CALL.DATESET_LIST_UPDATE, this.dataSetListUpdate);

    Blockly.Flyout.prototype.foreignObjectStartRender = (id) => {
      const element = document.getElementById(id);
      if (element) {
        if (id === 'listDataset') {
          render(this.getFlyoutInjectComponent(id), element);
        }
      }
    };
  }

  dataSetListUpdate = (len) => {
    this.getListHeight(len);
  }

  getFlyoutInjectComponent = (id) => {
    if (id === 'listDataset') {
      const currentHeight = Blockly.Flyout.prototype.foreignObjectHeightMap.listDataset;
      return (
        <UploadDataFiles getListHeight={this.getListHeight} currentHeight={currentHeight} EventUtil={EventUtil} />
      );
    }
  }

  getListHeight = (len) => {
    console.log('[BlocklyEditor] getListHeight =>', len);
    if (len <= 0) {
      Blockly.Flyout.prototype.foreignObjectHeightMap.listDataset = '45';
    } else {
      const varListHeight = 45 + 46 * len;
      Blockly.Flyout.prototype.foreignObjectHeightMap.listDataset = `${varListHeight}`;
    }
    const { editorStore } = this.props;
    const { editorRef } = editorStore;
    const workspace = editorRef.current.getWorkspace();
    workspace.refreshToolboxSelection();
  }

  unInitEvent = () => {
    EventUtil.off(EDITOR_CALL.CLEAR_WORKSPACE, this.clearWorkspace);
    EventUtil.off(EDITOR_CALL.SET_BLOCK_XML, this.setBlockXml);
    EventUtil.off(EDITOR_CALL.GET_BLOCK_XML, this.getBlockXml);
    EventUtil.off(EDITOR_CALL.GET_BLOCK_CODE, this.getBlockCode);
    EventUtil.off(EDITOR_CALL.UPDATE_DROPDOWN_VALUE, this.handleUpdateDropdown);
    EventUtil.off(EDITOR_CALL.DATESET_LIST_UPDATE, this.dataSetListUpdate);
    EventUtil.off(EDITOR_CALL.UPDATE_SHOW_EXTENSION_PARAMS, this.updateShowExtensionParams);
  };

  checkBlockInput(node, blockName, inputName, dropdownList, oldList, emptyValue) {
    const { nodeName } = node;
    const type = node.getAttribute('type');

    if (nodeName === 'block' && type === blockName) {
      // console.log('check block input', node, blockName);
      const { childNodes } = node;
      const len = childNodes.length;
      for (let i = 0; i < len; ++i) {
        const child = childNodes[i];
        if (
          child.nodeName === 'field'
          && child.getAttribute('name') === inputName
        ) {
          // console.log('find target node', child);
          const value = child.childNodes[0].nodeValue;
          const newIndex = dropdownList.find(item => item[1] === value);
          // console.log(
          //   'find target value',
          //   value,
          //   'of dropdown list',
          //   dropdownList,
          //   newIndex
          // );

          // 处理当前下拉值被删除的情况
          // 按照需求 当对应模块发生删除时，积木区内的ID同步发生变更，为【？】
          if (newIndex == undefined) {
            // // 查找当前值在原有下拉的位置
            // console.log('old list', oldList);
            // const oldIndex = oldList.find(item => item[1] === value);
            // console.log('old index', oldIndex);
            // if (oldIndex != undefined && oldIndex < dropdownList.length) {
            //   // 取原有删除值位置下一个选项的值
            //   child.nodeValue = dropdownList[oldIndex][1];
            // } else {
            //   // 默认取第一个值，如果没有下一个选项，且没有下拉供选择，则值为空
            //   // eslint-disable-next-line no-lonely-if
            //   if (dropdownList.length > 0) {
            //     console.log('set node value is dropdownList[0]');
            //     child.childNodes[0].nodeValue = dropdownList[0][1];
            //   } else {
            //     console.log('set node value empty');
            //     child.childNodes[0].nodeValue = '?';
            //   }
            // }
            child.childNodes[0].nodeValue = '?';
          } else {
            console.log('new index is not undefined');
          }
        }
      }
    }
  }

  // handleUpdateDropdown = (obj) => {
  //   console.log('[handleUpdateDropdown] called');
  //   this.updateDropdownTasks.push(obj);
  //   this.executeUpdateDropdownValueTasks();
  // };

  handleUpdateDropdown = (obj) => {
    console.log('[handleUpdateDropdown] called');
    this.updateDropdownTasks.push(obj);
    this.executeUpdateDropdownValueTasks_();
  }

  updateShowExtensionParams = (data) => {
    if (!data) return;

    const { robotType, toolbox } = data;
    this.setState({
      showExtension: (robotType !== "RobotPlanetSeries" && !toolbox)
    });
  };

  executeUpdateDropdownValueTasks_ = () => {
    if (this.updateDropdownTasks && this.updateDropdownTasks.length > 0) {

      console.log(`[BlocklyEditor].executeUpdateDropdownValueTasks, taskCount = ${this.updateDropdownTasks.length}, timestamp=${new Date().getTime()}`);

      const blocks = window.Blockly.mainWorkspace.getAllBlocks();

      const data = {};
      this.getBlockXml(data);
      const { xml } = data;

      console.log('current xml', xml, 'current blocks', blocks);

      if (blocks.length === 0) {
        this.updateDropdownTasks.length = 0;
        console.log('no blocks, no need to refresh, just clear task and return');
        return;
      }

      const blockIndexMap = this.generateBlockMap(blocks);

      var timestamp = new Date().getTime();

      this.updateDropdownTasks.forEach((obj) => {
        this.doUpdateDropdownValue(obj, blockIndexMap);
      });

      console.log(`[BlocklyEditor].executeUpdateDropdownValueTasks, costTime = ${new Date().getTime() - timestamp}`);

      this.updateDropdownTasks.length = 0;
    }
  }

  CovertToUUid2Name = (dropdownValues) => {
    var uuid2Name = {};
    if (dropdownValues !== null) {
      dropdownValues.forEach(element => {
        uuid2Name[element[1]] = element[0];
      });
    }
    return uuid2Name;
  }

  doUpdateDropdownValue = (obj, blockIndexMap) => {
    // 传递过来的参数是对象
    const {
      blockNameList, inputName, list, oldList
    } = obj;

    console.log(`[BlocklyEditor].doUpdateDropdownValue, inputName=${inputName}, list=${list}, oldList=${oldList}`);
    // console.log('[BlocklyEditor].doUpdateDropdownValue, block index map', blockIndexMap);
    // console.log('[BlocklyEditor].doUpdateDropdownValue, all blockNameList', blockNameList);

    var oldValueMap = this.CovertToUUid2Name(oldList);
    var newValueMap = this.CovertToUUid2Name(list);

    console.log('[BlocklyEditor].doUpdateDropdownValue, oldValueMap ', oldValueMap);
    console.log('[BlocklyEditor].doUpdateDropdownValue, newValueMap ', newValueMap);

    /* 更新当前所选分类的flyout中内容
    * refreshSelection：Update the flyout's contents without closing it.  Should be used in response
    * to a change in one of the dynamic categories, such as variables or procedures.
    * */
    const { editorStore } = this.props;
    const { editorRef } = editorStore;
    const workspace = editorRef.current.getWorkspace();
    workspace.toolbox_.refreshSelection();

    const blockNameLen = blockNameList.length;

    for (let i = 0; i < blockNameLen; ++i) {
      const blockType = blockNameList[i];
      const blocks = blockIndexMap[blockType];
      if (blocks) {
        const len = blocks.length;
        for (let j = 0; j < len; ++j) {
          const block = blocks[j];
          // const key = 'check block input2 ' + i + ' ' + j;
          // console.time(key);
          this.updateBlockInput(block, inputName, newValueMap, oldValueMap);
          // console.timeEnd(key);
        }
      }
    }
  }

  updateBlockInput = (block, inputName, newDropdownDict, oldDropdownDict) => {
    console.log('[dropdowndebug] update block input', block, inputName, newDropdownDict, oldDropdownDict);
    const field = block.getField(inputName);
    const fieldUuid = block.getFieldValue(inputName);
    const newValue = newDropdownDict[fieldUuid];
    const oldValue = oldDropdownDict[fieldUuid];

    if (newValue === undefined) {
      console.log('[dropdowndebug] set value ?');
      field.setValue('?');
    } else if (newValue !== oldValue) {
      console.log('[dropdowndebug] set text', newValue);
      field.setText(newValue);
    }

    if (block.onchange) {
      block.onchange();
    }
  }

  // 直接操作block实例对象，不操作xmldom
  // checkBlockInput2 = (block, inputName, dropdownList) => {
  //   // console.log(`check block input 2 ${block.type} ${inputName}`);
  //   const val = block.getFieldValue(inputName);
  //   const field = block.getField(inputName);
  //   const newIndex = dropdownList.find(item => item[1] === val);
  //   // console.log('check block input2 new index', newIndex, 'val', val, 'field', field, 'dropdownList', JSON.stringify(dropdownList), 'type', block.type);

  //   if (newIndex == undefined) {
  //     field.setValue('?');
  //   } else {
  //     // console.log('field set value', val);
  //     field.setValue('?');
  //     field.setValue(val);
  //   }

  //   if (block.onchange) {
  //     block.onchange();
  //   }
  // }

  updateFieldValue = (filed, srcValue, dstValue) => {
    var timestamp = new Date().getTime();
    if (srcValue !== dstValue) {
      filed.setValue(dstValue);
    }
    console.log(`[BlocklyEditor].UpdateFieldValue, srcValue=${srcValue}, dstValue=${dstValue}, costTime=${new Date().getTime() - timestamp}`);
  }

  generateBlockMap = (blocks) => {
    const len = blocks.length;
    const map = {};
    for (let i = 0; i < len; ++i) {
      const block = blocks[i];
      const { type } = block;
      let typeMap = map[type];
      if (!typeMap) {
        typeMap = [];
        map[type] = typeMap;
      }
      typeMap.push(block);
    }
    return map;
  };

  replaceAllString = (str, findTxt, repTxt) => {
    if (!str) return str;
    const regExp = new RegExp(findTxt, 'g');
    return str.replace(regExp, repTxt);
  };

  clearWorkspace = () => {
    console.log('[BlocklyEditor].clearWorkspace');
    const { editorStore } = this.props;
    const { editorRef } = editorStore;
    const workspace = editorRef.current.getWorkspace();

    workspace.clear();
    editorStore.setXml('<xml />');
    this.blocklyCtrl.setXml('<xml />');
  }

  setBlockXml = (data) => {
    const { xml, toolbox, extensions } = data;
    const { editorStore } = this.props;

    editorStore.setXml(xml);
    this.blocklyCtrl.setXml(xml, () => {
      EventUtil.emit(EDITOR_CALL.HANDLE_DROPDOWN_UNKNOWN);
    });

    let toolboxExtensions = [];
    if (extensions) {
      toolboxExtensions = extensions.split(',');
    }
    const allBlocks = Blockly.mainWorkspace.getAllBlocks();
    for (let i = 0; i < allBlocks.length; i++) {
      const category = this.getBlockFromExtensionCategory(allBlocks[i].type);
      if (category != null && toolboxExtensions.indexOf(category) == -1) {
        toolboxExtensions.push(category);
      }
    }
    if (toolbox) {
      editorStore.setToolbox(toolbox);
    }
    this.blocklyCtrl.setToolbox(editorStore.toolbox, toolboxExtensions);

    Blockly.AlreadySetBlockXml = true;
  };

  getCategoryBlockTypes = (xmlString) => {
    // 将XML字符串解析为DOM对象
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "application/xml");

    // 查找所有的block元素
    const blockElements = xmlDoc.querySelectorAll("block");

    // 提取block元素的type属性值
    const blockTypes = Array.from(blockElements).map(block => block.getAttribute("type"));

    return blockTypes;
  };

  // 通过blockType获取扩展类别
  // 若不属于扩展中的类别,则返回null
  getBlockFromExtensionCategory = (blockType) => {
    const { categories } = extensions[0];
    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];
      const blockTypes = this.getCategoryBlockTypes(category.xml);
      if (blockTypes.indexOf(blockType) != -1) {
        return category.id;
      }
    }
    return null;
  };

  getBlockXml = (blockData) => {
    const { editorStore } = this.props;
    const { editorRef, toolbox, xml, presetToolbox, presetUserBlock } = editorStore;
    blockData.xml = xml;
    blockData.toolbox = toolbox;
    blockData.presetToolbox = presetToolbox;
    blockData.presetUserBlock = presetUserBlock;
    blockData.extensions = '';
    if (editorRef && editorRef.current) {
      let extensions = editorRef.current.getExtensions();
      if (extensions) {
        blockData.extensions = extensions.join(',');
      }
    }
  };

  getBlockCode = (blockCode) => {
    const { editorStore, projectStore } = this.props;
    const { editorRef } = editorStore;
    const workspace = editorRef.current.getWorkspace();
    try {
      blockCode.code = projectStore.permissionDict.BuildableRobot
        ? Blockly.FreeBuild.workspaceToCode(workspace)
        : Blockly.JavaScript.workspaceToCode(workspace);
    } catch (e) {
      console.error(e);
    }
  };

  changeRunState = () => {
    // eslint-disable-next-line no-shadow
    const { projectStore } = this.props;
    const { isRunning } = projectStore;
    EventUtil.emit(isRunning ? EDITOR_CALL.STOP : EDITOR_CALL.PLAY);
    projectStore.changeRunningState(!isRunning);
  };

  runCode = () => {
    this.handlePlay();
  };

  render() {
    const { showExtension } = this.state;
    const { editorStore } = this.props;
    return (
      <div id="ide-container">
        {/* <button text='play' onClick={this.runCode} style={{ width: '100px', height: '50px' }}></button> */}
        <Editor
          name="virtualHardwareEditor"
          defaultXml={editorStore.xml}
          defaultToolbox={editorStore.toolbox}
          onChange={this.blocklyCtrl.handleEditorUpdate}
          ref={editorStore.editorRef}
          extensions={showExtension ? editorStore.extensionsToolbox : []}
          blocklyConfig={{
            grid: {
              spacing: 0,
              length: 0,
              snap: true,
              colour: '#EBEEF0',
              backgroundColour: '#FFFFFF'
            },
            media: './static/media/',
            trashcan: false,
            zoom: {
              controls: false,
              wheel: false,
              startScale: 1,
              maxScale: 1.44,
              minScale: 1,
              scaleSpeed: 1.2
            }
          }}
        />
      </div>
    );
  }
}

export default BlocklyEditor;
