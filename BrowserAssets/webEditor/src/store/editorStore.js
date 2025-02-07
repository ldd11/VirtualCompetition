import { observable, action } from 'mobx';
import React from 'react';
import defaultToolbox from '@/blockly/toolbox/defaultToolbox';

/**
 * 用于Blockly编辑器的基础状态存储管理(传入BlockEditor组件的数据属性)
 *
 * @class EditorStore
 */
class EditorStore {
  editorRef = React.createRef();

  @observable toolbox = defaultToolbox;

  @observable xml = '<xml></xml>';

  @observable presetToolbox = '';

  @observable presetUserBlock = '';

  //拓展积木内容
  @observable extensionsToolbox = '';

  @action.bound
  setToolbox(toolbox) {
    this.toolbox = toolbox;
  }

  /**
   * 设置积木区域数据
   *
   * @param {*} xml
   * @memberof EditorStore
   */
  @action.bound
  setXml(xml) {
    this.xml = xml;
  }

  @action
  setPresetToolbox(toolbox) {
    this.presetToolbox = toolbox;
  }

  @action
  setPresetUserBlock(userBlock) {
    this.presetUserBlock = userBlock;
  }

  @action.bound
  setExtensionsToolbox(extensionsToolbox) {
    this.extensionsToolbox = extensionsToolbox;
  }

}

export default new EditorStore();
