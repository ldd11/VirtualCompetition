import { EDITOR_CALL } from '@/runtime/constant/index';
import DropdownUtil from '@/utils/DropdownUtil';
import EventUtil from '@/utils/EventUtil';
import { defaultOptions } from '../common';

const { Blockly } = window;

Blockly.Blocks.startTMPredictImage = {
  init() {
    this.jsonInit({
      message0: Blockly.Msg.START_TM_PREDICT_IMAGE,
      args0: [
        {
          type: 'input_dummy',
          name: 'model_type'
        },
        {
          type: 'field_dropdown',
          name: 'image_type',
          options: [
            ['USB相机图片', 'Usb'],
            ['虚拟相机图片', 'Virtual'],
            ['本地上传图片', 'Local']
          ]
        }
      ],
      extensions: ['dynamic_tmmodel_image_dropdown'],
      previousStatement: null,
      nextStatement: null,
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_AI
    });
  }
};

Blockly.Blocks.getTMPredictImageResult = {
  init() {
    this.jsonInit({
      message0: Blockly.Msg.CHECK_TM_PREDICT_IMAGE_RESULT,
      args0: [
        {
          type: 'input_dummy',
          name: 'model_type'
        },
        {
          type: 'field_dropdown',
          name: 'image_type',
          options: [
            ['USB相机图片', 'Usb'],
            ['虚拟相机图片', 'Virtual'],
            ['本地上传图片', 'Local']
          ]
        }
      ],
      extensions: ['dynamic_tmmodel_image_dropdown'],
      inputsInline: true,
      output: 'String',
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_AI
    });
  }
};


Blockly.Blocks.checkTMPredictImageResultBool = {
  init() {
    this.jsonInit({
      message0: Blockly.Msg.CHECK_TM_PREDICT_IMAGE_RESULT_BOOL,
      args0: [
        {
          type: 'input_dummy',
          name: 'model_type'
        },
        {
          type: 'field_dropdown',
          name: 'image_type',
          options: [
            [Blockly.Msg.USB_IMAGE, 'Usb'],
            [Blockly.Msg.VIRTUAL_IMAGE, 'Virtual'],
            [Blockly.Msg.LOCAL_IMAGE, 'Local']
          ]
        },
        {
          type: 'input_dummy',
          name: 'class_type'
        }
      ],
      extensions: ['dynamic_tmmodel_image_dropdown'],
      inputsInline: true,
      output: 'Boolean',
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_AI
    });
  },
  onchange(event) {
    if (event instanceof Blockly.Events.Change) {
      if (event.blockId === this.id) {
        const model = this.getFieldValue('model_type');
        const classInput = this.getField('class_type');
        const classOptions = DropdownUtil.getDropdownList(`tm_class_list_${model}`);
        const classValue = classInput.getValue();

        const models = DropdownUtil.getDropdownList('tm_model_list_image');
        console.log('checkTMPredictImageResultBool', models, model);
        // models: [['?', '?']] 或者 [['audio', 'audio'], ['audio2', 'audio2']]
        // model: 'audio' 或者 '?'
        // 只有model在列表中,才能设置class。
        // model不在列表里，说明还没收到导入消息，不需要设置class
        if (models.length >= 1 && models[0][0] !== '?') {
          if (!classOptions || classOptions.length === 0 || model === '?' || classValue > classOptions.length - 1) {
            classInput.setValue('?');
            return;
          }
          classInput.setValue('?');
          classInput.setValue(classValue);
        }
      }
    }
  }
};

Blockly.Blocks.getTMPredictImageResultProbability = {
  init() {
    this.jsonInit({
      message0: Blockly.Msg.GET_TM_PREDICT_IMAGE_RESULT_PROBABILITY,
      args0: [
        {
          type: 'input_dummy',
          name: 'model_type'
        },
        {
          type: 'field_dropdown',
          name: 'image_type',
          options: [
            [Blockly.Msg.USB_IMAGE, 'Usb'],
            [Blockly.Msg.VIRTUAL_IMAGE, 'Virtual'],
            [Blockly.Msg.LOCAL_IMAGE, 'Local']
          ]
        }
      ],
      extensions: ['dynamic_tmmodel_image_dropdown'],
      inputsInline: true,
      output: 'Number',
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_AI
    });
  }
};

Blockly.Extensions.register('dynamic_tmmodel_image_dropdown', function () {
  this.getInput('model_type').appendField(
    new Blockly.FieldDropdown(() => {
      const list = DropdownUtil.getDropdownList('tm_model_list_image');
      if (!list || list.length === 0) {
        return defaultOptions;
      }
      return list;
    }),
    'model_type'
  );

  this.getInput('class_type')
    && this.getInput('class_type').appendField(
      new Blockly.FieldDropdown(() => {
        const model = this.getFieldValue('model_type');
        const list = DropdownUtil.getDropdownList(`tm_class_list_${model}`);
        if (!list || list.length === 0 || model === '?') {
          return defaultOptions;
        }

        return list;
      }),
      'class_type'
    );
});

EventUtil.on(EDITOR_CALL.UPDATE_DROPDOWN_EXT, () => {
  const blocks = window.Blockly.mainWorkspace.getAllBlocks();
  const len = blocks.length;
  const blockNameList = [
    'startTMPredictImage',
    'getTMPredictImageResult',
    'checkTMPredictImageResultBool',
    'getTMPredictImageResultProbability',
    'startTMPredictAudio',
    'getTMPredictAudioResult',
    'checkTMPredictAudioResultBool',
    'getTMPredictAudioResultProbability',
    'startTMPredictPose',
    'getTMPredictPoseResult',
    'checkTMPredictPoseResultBool',
    'getTMPredictPoseResultProbability'
  ];

  for (let i = 0; i < len; i += 1) {
    for (let j = 0; j < blockNameList.length; j += 1) {
      if (blocks[i].type === blockNameList[j]) {
        console.log('[tm] UPDATE_DROPDOWN', blocks[i], blocks[i].type);
        const val = blocks[i].getFieldValue('model_type');
        blocks[i].getField('model_type').setValue('?');
        blocks[i].getField('model_type').setValue(val);
        if (blocks[i].onchange) blocks[i].onchange();
      }
    }
  }
});


Blockly.Blocks.startTMPredictAudio = {
  init() {
    this.jsonInit({
      message0: Blockly.Msg.START_TM_PREDICT_AUDIO,
      args0: [
        {
          type: 'input_dummy',
          name: 'model_type'
        }
      ],
      extensions: ['dynamic_tmmodel_audio_dropdown'],
      previousStatement: null,
      nextStatement: null,
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_AI
    });
  }
};

Blockly.Blocks.getTMPredictAudioResult = {
  init() {
    this.jsonInit({
      message0: Blockly.Msg.CHECK_TM_PREDICT_AUDIO_RESULT,
      args0: [
        {
          type: 'input_dummy',
          name: 'model_type'
        }
      ],
      extensions: ['dynamic_tmmodel_audio_dropdown'],
      inputsInline: true,
      output: 'String',
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_AI
    });
  }
};


Blockly.Blocks.checkTMPredictAudioResultBool = {
  init() {
    this.jsonInit({
      message0: Blockly.Msg.CHECK_TM_PREDICT_AUDIO_RESULT_BOOL,
      args0: [
        {
          type: 'input_dummy',
          name: 'model_type'
        },
        {
          type: 'input_dummy',
          name: 'class_type'
        }
      ],
      extensions: ['dynamic_tmmodel_audio_dropdown'],
      inputsInline: true,
      output: 'Boolean',
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_AI
    });
  },
  onchange(event) {
    if (event instanceof Blockly.Events.Change) {
      if (event.blockId === this.id) {
        const model = this.getFieldValue('model_type');
        const classInput = this.getField('class_type');
        const classOptions = DropdownUtil.getDropdownList(`tm_class_list_${model}`);
        const classValue = classInput.getValue();
        console.log('checkTMPredictAudioResultBool', model, classOptions, classValue);

        const models = DropdownUtil.getDropdownList('tm_model_list_audio');
        console.log('checkTMPredictAudioResultBool', models, model);
        // models: [['?', '?']] 或者 [['audio', 'audio'], ['audio2', 'audio2']]
        // model: 'audio' 或者 '?'
        // 只有model在列表中,才能设置class。
        // model不在列表里，说明还没收到导入消息，不需要设置class
        if (models.length >= 1 && models[0][0] !== '?') {
          if (!classOptions || classOptions.length === 0 || model === '?' || classValue > classOptions.length - 1) {
            classInput.setValue('?');
            return;
          }
          classInput.setValue('?');
          classInput.setValue(classValue);
        }
      }
    }
  }
};

Blockly.Blocks.getTMPredictAudioResultProbability = {
  init() {
    this.jsonInit({
      message0: Blockly.Msg.GET_TM_PREDICT_AUDIO_RESULT_PROBABILITY,
      args0: [
        {
          type: 'input_dummy',
          name: 'model_type'
        }
      ],
      extensions: ['dynamic_tmmodel_audio_dropdown'],
      inputsInline: true,
      output: 'Number',
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_AI
    });
  }
};

Blockly.Extensions.register('dynamic_tmmodel_audio_dropdown', function () {
  this.getInput('model_type').appendField(
    new Blockly.FieldDropdown(() => {
      const list = DropdownUtil.getDropdownList('tm_model_list_audio');
      if (!list || list.length === 0) {
        return defaultOptions;
      }
      return list;
    }),
    'model_type'
  );

  this.getInput('class_type')
  && this.getInput('class_type').appendField(
    new Blockly.FieldDropdown(() => {
      const model = this.getFieldValue('model_type');
      const list = DropdownUtil.getDropdownList(`tm_class_list_${model}`);
      if (!list || list.length === 0 || model === '?') {
        return defaultOptions;
      }

      return list;
    }),
    'class_type'
  );
});


Blockly.Blocks.startTMPredictPose = {
  init() {
    this.jsonInit({
      message0: Blockly.Msg.START_TM_PREDICT_POSE,
      args0: [
        {
          type: 'input_dummy',
          name: 'model_type'
        },
        {
          type: 'field_dropdown',
          name: 'image_type',
          options: [
            [Blockly.Msg.USB_IMAGE, 'Usb'],
            [Blockly.Msg.VIRTUAL_IMAGE, 'Virtual'],
            [Blockly.Msg.LOCAL_IMAGE, 'Local']
          ]
        }
      ],
      extensions: ['dynamic_tmmodel_pose_dropdown'],
      previousStatement: null,
      nextStatement: null,
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_AI
    });
  }
};

Blockly.Blocks.getTMPredictPoseResult = {
  init() {
    this.jsonInit({
      message0: Blockly.Msg.CHECK_TM_PREDICT_POSE_RESULT,
      args0: [
        {
          type: 'input_dummy',
          name: 'model_type'
        },
        {
          type: 'field_dropdown',
          name: 'image_type',
          options: [
            [Blockly.Msg.USB_IMAGE, 'Usb'],
            [Blockly.Msg.VIRTUAL_IMAGE, 'Virtual'],
            [Blockly.Msg.LOCAL_IMAGE, 'Local']
          ]
        }
      ],
      extensions: ['dynamic_tmmodel_pose_dropdown'],
      inputsInline: true,
      output: 'String',
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_AI
    });
  }
};


Blockly.Blocks.checkTMPredictPoseResultBool = {
  init() {
    this.jsonInit({
      message0: Blockly.Msg.CHECK_TM_PREDICT_POSE_RESULT_BOOL,
      args0: [
        {
          type: 'input_dummy',
          name: 'model_type'
        },
        {
          type: 'field_dropdown',
          name: 'image_type',
          options: [
            [Blockly.Msg.USB_IMAGE, 'Usb'],
            [Blockly.Msg.VIRTUAL_IMAGE, 'Virtual'],
            [Blockly.Msg.LOCAL_IMAGE, 'Local']
          ]
        },
        {
          type: 'input_dummy',
          name: 'class_type'
        }
      ],
      extensions: ['dynamic_tmmodel_pose_dropdown'],
      inputsInline: true,
      output: 'Boolean',
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_AI
    });
  },
  onchange(event) {
    if (event instanceof Blockly.Events.Change) {
      if (event.blockId === this.id) {
        const model = this.getFieldValue('model_type');
        const classInput = this.getField('class_type');
        const classOptions = DropdownUtil.getDropdownList(`tm_class_list_${model}`);
        const classValue = classInput.getValue();

        const models = DropdownUtil.getDropdownList('tm_model_list_pose');
        console.log('checkTMPredictPoseResultBool', models, model);
        // models: [['?', '?']] 或者 [['audio', 'audio'], ['audio2', 'audio2']]
        // model: 'audio' 或者 '?'
        // 只有model在列表中,才能设置class。
        // model不在列表里，说明还没收到导入消息，不需要设置class
        if (models.length >= 1 && models[0][0] !== '?') {
          if (!classOptions || classOptions.length === 0 || model === '?' || classValue > classOptions.length - 1) {
            classInput.setValue('?');
            return;
          }
          classInput.setValue('?');
          classInput.setValue(classValue);
        }
      }
    }
  }
};

Blockly.Blocks.getTMPredictPoseResultProbability = {
  init() {
    this.jsonInit({
      message0: Blockly.Msg.GET_TM_PREDICT_POSE_RESULT_PROBABILITY,
      args0: [
        {
          type: 'input_dummy',
          name: 'model_type'
        },
        {
          type: 'field_dropdown',
          name: 'image_type',
          options: [
            [Blockly.Msg.USB_IMAGE, 'Usb'],
            [Blockly.Msg.VIRTUAL_IMAGE, 'Virtual'],
            [Blockly.Msg.LOCAL_IMAGE, 'Local']
          ]
        }
      ],
      extensions: ['dynamic_tmmodel_pose_dropdown'],
      inputsInline: true,
      output: 'Number',
      colour: Blockly.Msg.VIRTUALHARDWARE_HEX_AI
    });
  }
};

Blockly.Extensions.register('dynamic_tmmodel_pose_dropdown', function () {
  console.log('dynamic_tmmodel_pose_dropdown', DropdownUtil.getDropdownList('tm_model_list_pose'));
  this.getInput('model_type').appendField(
    new Blockly.FieldDropdown(() => {
      const list = DropdownUtil.getDropdownList('tm_model_list_pose');
      if (!list || list.length === 0) {
        return defaultOptions;
      }
      return list;
    }),
    'model_type'
  );

  this.getInput('class_type')
    && this.getInput('class_type').appendField(
      new Blockly.FieldDropdown(() => {
        const model = this.getFieldValue('model_type');
        const list = DropdownUtil.getDropdownList(`tm_class_list_${model}`);
        if (!list || list.length === 0 || model === '?') {
          return defaultOptions;
        }

        return list;
      }),
      'class_type'
    );
});
