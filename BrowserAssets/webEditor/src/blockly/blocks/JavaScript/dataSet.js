import dataSetStore from '../../../store/blockly/dataSetStore';
import * as common from '../common';

const { Blockly } = window;

Blockly.Blocks.list_dataset_num = {
  init() {
    this.jsonInit({
      message0: Blockly.Msg.DATASET_ROW_OR_COL_NUM,
      args0: [
        {
          type: 'field_dropdown',
          name: 'dateSetData',
          options: common.getListDatasetOptions
        },
        {
          type: 'field_dropdown',
          name: 'coordinate',
          options: [
            ['行数', 'row'],
            ['列数', 'col'],
          ]
        }
      ],
      inputsInline: true,
      output: null,
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_DATASET
    });
  },
  mutationToDom() {
    const container = document.createElement('mutation');
    if (this.getField('dateSetData')) {
      const dataId = this.getFieldValue('dateSetData');// get key
      const dataName = this.getField('dateSetData').getText();// get value
      const dataArr = dataSetStore.dataSetList;
      const dataIdArr = dataArr.map(item => item.dataId);
      if (dataIdArr.indexOf(dataId) !== -1) {
        const dataSaved = dataName.concat(',,,,,').concat(dataId);
        container.setAttribute('data_item', dataSaved);
      }
    }
    return container;
  },
  domToMutation(xmlElement) {
    const dataSaved = xmlElement.getAttribute('data_item') || '';
    // console.log('[dataSetUtil] domToMutation', dataSaved)
    dataSetStore.setDataListFromMutation(dataSaved);
  },
};

Blockly.Blocks.list_dataset_getdata = {
  init() {
    this.jsonInit({
      message0: Blockly.Msg.DATASET_GET_DATA,
      args0: [
        {
          type: 'field_dropdown',
          name: 'dateSetData',
          options: common.getListDatasetOptions
        },
        {
          type: 'input_value',
          name: 'number',
          check: 'Number'
        },
        {
          type: 'field_dropdown',
          name: 'coordinate',
          options: [
            ['行', 'row'],
            ['列', 'col'],
          ]
        }
      ],
      inputsInline: true,
      output: null,
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_DATASET
    });
    // this.appendDummyInput()
    //   .appendField(new Blockly.FieldDropdown(common.getListDatasetOptions, 'dateSetData'))
    // this.appendDummyInput().appendField("第");
    // this.appendValueInput('number').setCheck('Number').appendField('');
    // this.appendDummyInput()
    //   .appendField(new Blockly.FieldDropdown([['行', 'row'],['列', 'col']], 'coordinate'));
    // this.appendDummyInput().appendField("（列表）");
    // this.setOutput(true);
    // this.setColour(Blockly.Msg.VIRTUALHARDWARE_HEX_DATASET);
    // this.setInputsInline(true);
  },
  onchange() {
    // 正整数，暂定方法
    // 本来最优方法是在init里面绑定validator, 但很奇怪在init阶段取不到名为number的积木块
    var targetBlock = this.getInputTargetBlock('number');
    var a = targetBlock?.inputList[0]?.fieldRow[0]
    if (a != null && a.validator_ == null) {
      // 不重复绑定
      a.setValidator(this.validate.bind(this));
    }
  },
  validate: function(newValue) {
    if (newValue <= 0) return 1;
    return parseInt(newValue);
  },
  mutationToDom() {
    const container = document.createElement('mutation');
    if (this.getField('dateSetData')) {
      const dataId = this.getFieldValue('dateSetData');// get key
      const dataName = this.getField('dateSetData').getText();// get value
      const dataArr = dataSetStore.dataSetList;
      const dataIdArr = dataArr.map(item => item.dataId);
      if (dataIdArr.indexOf(dataId) !== -1) {
        const dataSaved = dataName.concat(',,,,,').concat(dataId);
        container.setAttribute('data_item', dataSaved);
      }
    }
    return container;
  },
  domToMutation(xmlElement) {
    const dataSaved = xmlElement.getAttribute('data_item') || '';
    dataSetStore.setDataListFromMutation(dataSaved);
  },
};

Blockly.Blocks.list_dataset_getonedata = {
  init() {
    this.jsonInit({
      message0: Blockly.Msg.DATASET_GET_ONE_DATA,
      args0: [
        {
          type: 'field_dropdown',
          name: 'dateSetData',
          options: common.getListDatasetOptions
        },
        {
          type: 'input_value',
          name: 'row',
          check: 'Number'
        },
        {
          type: 'input_value',
          name: 'col',
          check: 'Number'
        },
      ],
      inputsInline: true,
      output: ['String'],
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_DATASET
    });
  },
  onchange() {
    var targetBlock1 = this.getInputTargetBlock('row');
    var targetBlock2 = this.getInputTargetBlock('col');
    var a = targetBlock1?.inputList[0]?.fieldRow[0];
    var b = targetBlock2?.inputList[0]?.fieldRow[0];
    if (a != null && a.validator_ == null) {
      a.setValidator(this.validate.bind(this));
    }
    if (b != null && b.validator_ == null) {
      b.setValidator(this.validate.bind(this));
    }
  },
  validate: function(newValue) {
    if (newValue <= 0) return 1;
    return parseInt(newValue);
  },
  mutationToDom() {
    const container = document.createElement('mutation');
    if (this.getField('dateSetData')) {
      const dataId = this.getFieldValue('dateSetData');// get key
      const dataName = this.getField('dateSetData').getText();// get value
      const dataArr = dataSetStore.dataSetList;
      const dataIdArr = dataArr.map(item => item.dataId);
      if (dataIdArr.indexOf(dataId) !== -1) {
        const dataSaved = dataName.concat(',,,,,').concat(dataId);
        container.setAttribute('data_item', dataSaved);
      }
    }
    return container;
  },
  domToMutation(xmlElement) {
    const dataSaved = xmlElement.getAttribute('data_item') || '';
    dataSetStore.setDataListFromMutation(dataSaved);
  },
};
