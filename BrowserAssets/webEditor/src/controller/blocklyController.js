import editorStore from '../store/editorStore';
import EventUtil from '../utils/EventUtil';
import { EDITOR_CALL } from '../runtime/constant/index';
import { compileCode } from '../runtime/Compiler';
import BlockFuncApi from '../runtime/BlockFuncApi';
import { JS_UNITY_CMD } from '../utils/NativeCall';
import FeatureManager from '../blockly/toolbox/FeatureManager';
import { projectStore } from '@/store/index';
import CompileErrorTipController from './compileErrorTipController';

/**
 * Blockly控制器，为对Blockly进行调用操作的逻辑接口层
 *
 * @class BlocklyController
 */
class BlocklyController {
  init = () => {
    this.initEvent();
    this.refreshDebugToolbox();
    FeatureManager.initialize();
    this.compileErrorTipCtrl = new CompileErrorTipController();
    this.compileErrorTipCtrl.init();
    // this.refreshFeaturePermissions();
  };

  initEvent = () => {
    EventUtil.on(EDITOR_CALL.PLAY, this.play);
    EventUtil.on(EDITOR_CALL.UPDATE_TOOLBOX_AND_XML, this.updateToolboxAndXml);
    EventUtil.on(EDITOR_CALL.FORBID_BLOCKLY, this.updateBlocklyCategoriesAndBlocks);
    EventUtil.on(EDITOR_CALL.REFRESH_DEBUG_BLOCKS, this.refreshDebugBlocks);
    EventUtil.on(EDITOR_CALL.REFRESH_FEATURE_PERMISSIONS, this.refreshFeaturePermissions);
    EventUtil.on(EDITOR_CALL.HIDE_EXTENSION_DIALOG, this.hideExtensionDialog);
    EventUtil.on(EDITOR_CALL.DELETE_EXTENSION, this.deleteExtension);
  };

  unInit = () => {
    this.setXml('<xml />');
    this.unInitEvent();
    this.compileErrorTipCtrl.uninit();
  }

  unInitEvent = () => {
    EventUtil.off(EDITOR_CALL.PLAY, this.play);
    EventUtil.off(EDITOR_CALL.UPDATE_TOOLBOX_AND_XML, this.updateToolboxAndXml);
    EventUtil.off(EDITOR_CALL.FORBID_BLOCKLY, this.updateBlocklyCategoriesAndBlocks);
    EventUtil.off(EDITOR_CALL.REFRESH_DEBUG_BLOCKS, this.refreshDebugBlocks);
    EventUtil.off(EDITOR_CALL.REFRESH_FEATURE_PERMISSIONS, this.refreshFeaturePermissions);
    EventUtil.off(EDITOR_CALL.HIDE_EXTENSION_DIALOG, this.hideExtensionDialog);
    EventUtil.off(EDITOR_CALL.DELETE_EXTENSION, this.deleteExtension);
  };

  refreshFeaturePermissions = () => {
    this.updateToolboxAndXml();
  }

  removeDebugCategory(xmlString) {
    const toolboxNode = Blockly.Xml.textToDom(xmlString);

    const categoryNodes = toolboxNode.getElementsByTagName('category');
    for (let i = categoryNodes.length - 1; i >= 0; i--) {
      const categoryNode = categoryNodes[i];
      if (categoryNode.getAttribute('name') === '调试积木') {
        // 删除该节点
        categoryNode.parentNode.removeChild(categoryNode);
      }
    }

    return Blockly.Xml.domToText(toolboxNode);
  }

  refreshDebugToolbox() {
    const editor = editorStore.editorRef.current;
    this.setToolbox(editorStore.toolbox, editor ? editor.getExtensions() : []);
  }

  refreshDebugBlocks = () => {
    const { xml, editorRef } = editorStore;
    if (!xml || !editorRef.current) return;
    const workspace = editorRef.current.getWorkspace();
    if (workspace) {
      const allBlocks = workspace.getAllBlocks();

      // 禁用事件系统
      Blockly.Events.disable();

      for (let i = 0; i < allBlocks.length; i++) {
        const block = allBlocks[i];
        console.log('block instance', block);
        if (block.isDebugBlock) {
          block.setDisabled(!Blockly.Settings.isDebugMode);
        }
      }

      // 启用事件系统
      Blockly.Events.enable();
    }

    const toolbox = Blockly.getMainWorkspace().getToolbox();
    const tree = toolbox.tree_;
    const selectedDebug = tree.getSelectedItem() === tree.children_[0];
    const lastSelectedItem = tree.getSelectedItem();
    const lastSelectedIndex = tree.children_.indexOf(lastSelectedItem);

    this.refreshDebugToolbox();

    if (Blockly.Settings.isDebugMode) {
      tree.setSelectedItem(tree.children_[0]);
      tree.children_[0].element_.classList.add('blocklyDebug');
    } else if (selectedDebug) {
      toolbox.clearSelection();
    } else {
      tree.setSelectedItem(tree.children_[lastSelectedIndex - 1]);
    }
  }

  setXml = (xml = '<xml />', cb = null) => {
    const editor = editorStore.editorRef.current;
    if (editor) {
        editor.setXml(xml);
        cb && cb();
        EventUtil.emit(EDITOR_CALL.UPDATE_DROPDOWN_EXT, xml);
      // editor.setXml('<xml />');
      // setTimeout(() => {
      //   editor.setXml(xml);
      //   cb && cb();
      //   EventUtil.emit(EDITOR_CALL.UPDATE_DROPDOWN_EXT, xml);
      // }, 0);
    }
  };

  setToolbox = (toolbox, extensions) => {
    if (!toolbox) return;
    const editor = editorStore.editorRef.current;
    if (editor) {
      editor.updateToolbox(Blockly.Settings.isDebugMode ? toolbox : this.removeDebugCategory(toolbox), extensions);
    }
  };

  hideExtensionDialog = () => {
    const editor = editorStore.editorRef.current;
    if (editor) {
      editor.hideExtensionDialog();
    }
  };

  deleteExtension = (extensionId) => {
    const editor = editorStore.editorRef.current;
    let extensions = [];
    if (editor) {
      extensions = editor.getExtensions();
      const extensionIndex = extensions.indexOf(extensionId);
      if (extensionIndex != -1) {
        extensions.splice(extensionIndex, 1);
      }
    }
    this.setToolbox(editorStore.toolbox, extensions);
  };

  reset = () => {
    this.setXml('<xml />');
  };

  handleEditorUpdate = (event, xml, workspace) => {
    if (workspace && editorStore.xml !== xml) {
      editorStore.setXml(xml);
      // console.log('handleEditorUpdate: ', event, workspace);

      // 每次移动都会触发这个事件回调去转化为code，调试的时候可以这么干，但是正常会影响性能
      // const code = projectStore.permissionDict.BuildableRobot ? Blockly.FreeBuild.workspaceToCode(workspace) : Blockly.JavaScript.workspaceToCode(workspace);
      // console.log('[EditorUpdate].code = ', code);

      BlockFuncApi.callUnityApi(JS_UNITY_CMD.ModifyBlockXml);

      this.compileErrorTipCtrl.refreshCompileErrorTips();
    }
  };

  play = () => {
    // console.log('[Play]');
    const { xml, editorRef } = editorStore;
    if (!xml || !editorRef.current) return;
    const workspace = editorRef.current.getWorkspace();
    const code = Blockly.JavaScript.workspaceToCode(workspace);
    if (!code) return;
    // console.log('[Play].code = ', code);
    const dCode = compileCode(code);
    // console.log('[Play].dCode = ', dCode);
    BlockFuncApi.runCode(dCode);
  };

  updateBlocklyCategoriesAndBlocks = () => {
    this.updateToolboxAndXml();
  };

  updateToolboxAndXml = () => {
    console.log("[blocklyController].updateToolboxAndXml");
    const combineToolbox = FeatureManager.combineFeatureToolbox();
    editorStore.setToolbox(combineToolbox);
    const extensionsToolbox = FeatureManager.combineFeatureExtensionsToolbox();
    editorStore.setExtensionsToolbox(extensionsToolbox);

    this.setToolbox(combineToolbox, []);
  };
}

export default BlocklyController;
